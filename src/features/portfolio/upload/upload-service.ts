import { apiClient } from "@/services/api/client";

export interface UploadResponse {
  success: boolean;
  message?: string;
  data: {
    url: string;
    publicId?: string;
    format?: string;
  };
}

export class UploadService {
  /**
   * Upload an image file to the backend (Cloudinary or local server fallback)
   */
  static async uploadImage(file: File): Promise<string> {
    if (!file) {
      throw new Error("Pilih file gambar terlebih dahulu.");
    }

    // Validasi tipe file
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    const isImage = file.type?.startsWith("image/") || validTypes.includes(file.type);
    if (!isImage) {
      throw new Error("File yang dipilih bukan gambar. Format yang didukung: JPG, PNG, WEBP, GIF, SVG.");
    }

    // Validasi ukuran (maksimal 10MB)
    const MAX_SIZE_BYTES = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
      throw new Error("Ukuran file terlalu besar (maksimal 10MB).");
    }

    // Otomatis kompresi gambar jika > 1.5MB agar aman dari batas payload 4.5MB Vercel serverless
    const fileToUpload = await UploadService.compressImageIfNeeded(file);

    const formData = new FormData();
    formData.append("file", fileToUpload);

    const res = await apiClient<UploadResponse>("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.success || !res.data?.url) {
      throw new Error(res.message || "Gagal mengunggah gambar");
    }

    return res.data.url;
  }

  /**
   * Otomatis kompres gambar raster jika > 1.5MB agar tidak timeout atau melebihi limit Vercel (4.5MB).
   */
  private static async compressImageIfNeeded(file: File): Promise<File> {
    if (typeof window === "undefined") return file;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      return file;
    }
    // Jika ukuran sudah di bawah 1.5MB, biarkan file aslinya
    if (file.size <= 1.5 * 1024 * 1024) {
      return file;
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let { width, height } = img;
          const maxDimension = 1920;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            return resolve(file);
          }

          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              if (!blob || blob.size >= file.size) {
                return resolve(file);
              }
              const cleanName = file.name.replace(/\.[^.]+$/, ".jpg");
              const compressedFile = new File([blob], cleanName, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            },
            "image/jpeg",
            0.85
          );
        };
        img.onerror = () => resolve(file);
        img.src = e.target?.result as string;
      };
      reader.onerror = () => resolve(file);
      reader.readAsDataURL(file);
    });
  }
}


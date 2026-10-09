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

    const formData = new FormData();
    formData.append("file", file);

    const res = await apiClient<UploadResponse>("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.success || !res.data?.url) {
      throw new Error(res.message || "Gagal mengunggah gambar");
    }

    return res.data.url;
  }
}


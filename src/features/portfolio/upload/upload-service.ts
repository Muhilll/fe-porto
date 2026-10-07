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

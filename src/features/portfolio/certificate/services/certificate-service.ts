import { apiClient } from "@/services/api/client";
import type { ApiResponse } from "@/services/api/types";
import type { BackendCertificate, CreateCertificatePayload, UpdateCertificatePayload } from "../types";

export class CertificateService {
  static async getAll(): Promise<ApiResponse<BackendCertificate[]>> {
    return apiClient<ApiResponse<BackendCertificate[]>>("/api/certificates", { skipAuth: true });
  }

  static async getById(id: number): Promise<ApiResponse<BackendCertificate>> {
    return apiClient<ApiResponse<BackendCertificate>>(`/api/certificates/${id}`, { skipAuth: true });
  }

  static async create(payload: CreateCertificatePayload): Promise<ApiResponse<BackendCertificate>> {
    return apiClient<ApiResponse<BackendCertificate>>("/api/certificates", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async update(id: number, payload: UpdateCertificatePayload): Promise<ApiResponse<BackendCertificate>> {
    return apiClient<ApiResponse<BackendCertificate>>(`/api/certificates/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  static async delete(id: number): Promise<ApiResponse<{ success: boolean; message: string }>> {
    return apiClient<ApiResponse<{ success: boolean; message: string }>>(`/api/certificates/${id}`, {
      method: "DELETE",
    });
  }
}

import { apiClient } from "@/services/api/client";
import type { ApiResponse } from "@/services/api/types";
import type { BackendService, CreateServicePayload, UpdateServicePayload } from "../types";

export class ServiceService {
  static async getAll(): Promise<ApiResponse<BackendService[]>> {
    return apiClient<ApiResponse<BackendService[]>>("/api/services", { skipAuth: true });
  }

  static async getById(id: number): Promise<ApiResponse<BackendService>> {
    return apiClient<ApiResponse<BackendService>>(`/api/services/${id}`, { skipAuth: true });
  }

  static async create(payload: CreateServicePayload): Promise<ApiResponse<BackendService>> {
    return apiClient<ApiResponse<BackendService>>("/api/services", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async update(id: number, payload: UpdateServicePayload): Promise<ApiResponse<BackendService>> {
    return apiClient<ApiResponse<BackendService>>(`/api/services/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  static async delete(id: number): Promise<ApiResponse<{ success: boolean; message: string }>> {
    return apiClient<ApiResponse<{ success: boolean; message: string }>>(`/api/services/${id}`, {
      method: "DELETE",
    });
  }
}

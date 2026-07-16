import { apiClient } from "@/services/api/client";
import type { ApiResponse, WriteResult } from "@/services/api/types";
import type { Role, CreateRoleRequest, UpdateRoleRequest } from "../types";

export class RoleService {
  static async getAll(): Promise<ApiResponse<Role[]>> {
    return apiClient<ApiResponse<Role[]>>("/api/roles");
  }

  static async getById(id: number): Promise<ApiResponse<Role>> {
    return apiClient<ApiResponse<Role>>(`/api/roles/${id}`);
  }

  static async create(payload: CreateRoleRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>("/api/roles", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async update(id: number, payload: UpdateRoleRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/roles/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  static async delete(id: number): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/roles/${id}`, {
      method: "DELETE",
    });
  }
}

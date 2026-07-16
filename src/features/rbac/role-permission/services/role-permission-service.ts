import { apiClient } from "@/services/api/client";
import type { ApiResponse, WriteResult } from "@/services/api/types";
import type { RolePermission, CreateRolePermissionRequest, UpdateRolePermissionRequest } from "../types";

export class RolePermissionService {
  static async getAll(): Promise<ApiResponse<RolePermission[]>> {
    return apiClient<ApiResponse<RolePermission[]>>("/api/role-permissions");
  }

  static async getById(id: number): Promise<ApiResponse<RolePermission>> {
    return apiClient<ApiResponse<RolePermission>>(`/api/role-permissions/${id}`);
  }

  static async create(payload: CreateRolePermissionRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>("/api/role-permissions", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async update(id: number, payload: UpdateRolePermissionRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/role-permissions/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  static async delete(id: number): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/role-permissions/${id}`, {
      method: "DELETE",
    });
  }
}

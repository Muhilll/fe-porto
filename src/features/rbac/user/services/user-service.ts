import { apiClient } from "@/services/api/client";
import type { ApiResponse, WriteResult } from "@/services/api/types";
import type { User, CreateUserRequest, UpdateUserRequest, NavigationItem } from "../types";

export class UserService {
  static async getAll(): Promise<ApiResponse<User[]>> {
    return apiClient<ApiResponse<User[]>>("/api/users");
  }

  static async getNavigation(): Promise<ApiResponse<NavigationItem[]>> {
    return apiClient<ApiResponse<NavigationItem[]>>("/api/users/me/navigation");
  }

  static async getById(id: number): Promise<ApiResponse<User>> {
    return apiClient<ApiResponse<User>>(`/api/users/${id}`);
  }

  static async create(payload: CreateUserRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>("/api/users", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async update(id: number, payload: UpdateUserRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  static async delete(id: number): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/users/${id}`, {
      method: "DELETE",
    });
  }
}

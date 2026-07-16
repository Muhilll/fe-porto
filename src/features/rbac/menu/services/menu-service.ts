import { apiClient } from "@/services/api/client";
import type { ApiResponse, WriteResult } from "@/services/api/types";
import type { Menu, CreateMenuRequest, UpdateMenuRequest } from "../types";

export class MenuService {
  static async getAll(): Promise<ApiResponse<Menu[]>> {
    return apiClient<ApiResponse<Menu[]>>("/api/menus");
  }

  static async getById(id: number): Promise<ApiResponse<Menu>> {
    return apiClient<ApiResponse<Menu>>(`/api/menus/${id}`);
  }

  static async create(payload: CreateMenuRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>("/api/menus", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async update(id: number, payload: UpdateMenuRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/menus/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  static async delete(id: number): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/menus/${id}`, {
      method: "DELETE",
    });
  }
}

import { apiClient } from "@/services/api/client";
import type { ApiResponse } from "@/services/api/types";
import type { BackendProject, CreateProjectPayload, UpdateProjectPayload } from "../types";

export class ProjectService {
  /**
   * Get all projects (Public)
   */
  static async getAll(params?: { category?: string; featured?: boolean }): Promise<ApiResponse<BackendProject[]>> {
    const query = new URLSearchParams();
    if (params?.category) query.set("category", params.category);
    if (params?.featured !== undefined) query.set("featured", String(params.featured));

    const queryString = query.toString() ? `?${query.toString()}` : "";
    return apiClient<ApiResponse<BackendProject[]>>(`/api/projects${queryString}`, {
      skipAuth: true,
    });
  }

  /**
   * Get single project by id or slug (Public)
   */
  static async getByIdOrSlug(idOrSlug: string | number): Promise<ApiResponse<BackendProject>> {
    return apiClient<ApiResponse<BackendProject>>(`/api/projects/${idOrSlug}`, {
      skipAuth: true,
    });
  }

  /**
   * Create new project (Admin)
   */
  static async create(payload: CreateProjectPayload): Promise<ApiResponse<BackendProject>> {
    return apiClient<ApiResponse<BackendProject>>("/api/projects", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  /**
   * Update existing project (Admin)
   */
  static async update(id: number, payload: UpdateProjectPayload): Promise<ApiResponse<BackendProject>> {
    return apiClient<ApiResponse<BackendProject>>(`/api/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  /**
   * Delete project (Admin)
   */
  static async delete(id: number): Promise<ApiResponse<{ success: boolean; message: string }>> {
    return apiClient<ApiResponse<{ success: boolean; message: string }>>(`/api/projects/${id}`, {
      method: "DELETE",
    });
  }
}

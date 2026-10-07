import { apiClient } from "@/services/api/client";
import type { ApiResponse } from "@/services/api/types";
import type { BackendBlog, CreateBlogPayload, UpdateBlogPayload } from "../types";

export class BlogService {
  static async getAll(options?: { all?: boolean }): Promise<ApiResponse<BackendBlog[]>> {
    const url = options?.all ? "/api/blogs?all=true" : "/api/blogs";
    return apiClient<ApiResponse<BackendBlog[]>>(url, { skipAuth: !options?.all });
  }

  static async getBySlug(slug: string): Promise<ApiResponse<BackendBlog>> {
    return apiClient<ApiResponse<BackendBlog>>(`/api/blogs/${slug}`, { skipAuth: true });
  }

  static async create(payload: CreateBlogPayload): Promise<ApiResponse<BackendBlog>> {
    return apiClient<ApiResponse<BackendBlog>>("/api/blogs", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async update(id: number, payload: UpdateBlogPayload): Promise<ApiResponse<BackendBlog>> {
    return apiClient<ApiResponse<BackendBlog>>(`/api/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  static async delete(id: number): Promise<ApiResponse<{ success: boolean; message: string }>> {
    return apiClient<ApiResponse<{ success: boolean; message: string }>>(`/api/blogs/${id}`, {
      method: "DELETE",
    });
  }
}

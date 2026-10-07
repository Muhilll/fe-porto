import { apiClient } from "@/services/api/client";
import type { ApiResponse } from "@/services/api/types";
import type { BackendProfile, UpdateProfilePayload } from "../types";

export class ProfileService {
  /**
   * Get public profile
   */
  static async get(): Promise<ApiResponse<BackendProfile | null>> {
    return apiClient<ApiResponse<BackendProfile | null>>("/api/profile", {
      skipAuth: true,
    });
  }

  /**
   * Update or upsert profile (Requires JWT)
   */
  static async upsert(payload: UpdateProfilePayload): Promise<ApiResponse<BackendProfile>> {
    return apiClient<ApiResponse<BackendProfile>>("/api/profile", {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }
}

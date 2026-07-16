import { apiClient } from "@/services/api/client";
import type { LoginRequest, LoginResponse } from "../types";

/**
 * Auth API service — handles login call to BE.
 * Login endpoint is PUBLIC (no JWT required, but needs X-App-Token).
 */
export class AuthService {
  static async login(payload: LoginRequest): Promise<LoginResponse> {
    return apiClient<LoginResponse>("/api/users/login", {
      method: "POST",
      body: JSON.stringify(payload),
      skipAuth: true, // login is a public endpoint
    });
  }
}

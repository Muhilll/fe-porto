import { apiClient } from "@/services/api/client";
import type { ApiResponse } from "@/services/api/types";
import type {
  BackendExperience,
  CreateExperiencePayload,
  UpdateExperiencePayload,
  BackendEducation,
  CreateEducationPayload,
  UpdateEducationPayload,
  BackendSkillCategory,
  CreateSkillCategoryPayload,
  UpdateSkillCategoryPayload,
} from "../types";

export class AboutService {
  /* ─── Experiences ─────────────────────────────────────── */
  static async getAllExperiences(): Promise<ApiResponse<BackendExperience[]>> {
    return apiClient<ApiResponse<BackendExperience[]>>("/api/experiences", { skipAuth: true });
  }

  static async createExperience(payload: CreateExperiencePayload): Promise<ApiResponse<BackendExperience>> {
    return apiClient<ApiResponse<BackendExperience>>("/api/experiences", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async updateExperience(id: number, payload: UpdateExperiencePayload): Promise<ApiResponse<BackendExperience>> {
    return apiClient<ApiResponse<BackendExperience>>(`/api/experiences/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  static async deleteExperience(id: number): Promise<ApiResponse<{ success: boolean; message: string }>> {
    return apiClient<ApiResponse<{ success: boolean; message: string }>>(`/api/experiences/${id}`, {
      method: "DELETE",
    });
  }

  /* ─── Educations ──────────────────────────────────────── */
  static async getAllEducations(): Promise<ApiResponse<BackendEducation[]>> {
    return apiClient<ApiResponse<BackendEducation[]>>("/api/educations", { skipAuth: true });
  }

  static async createEducation(payload: CreateEducationPayload): Promise<ApiResponse<BackendEducation>> {
    return apiClient<ApiResponse<BackendEducation>>("/api/educations", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async updateEducation(id: number, payload: UpdateEducationPayload): Promise<ApiResponse<BackendEducation>> {
    return apiClient<ApiResponse<BackendEducation>>(`/api/educations/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  static async deleteEducation(id: number): Promise<ApiResponse<{ success: boolean; message: string }>> {
    return apiClient<ApiResponse<{ success: boolean; message: string }>>(`/api/educations/${id}`, {
      method: "DELETE",
    });
  }

  /* ─── Skill Categories ────────────────────────────────── */
  static async getAllSkills(): Promise<ApiResponse<BackendSkillCategory[]>> {
    return apiClient<ApiResponse<BackendSkillCategory[]>>("/api/skills", { skipAuth: true });
  }

  static async createSkillCategory(payload: CreateSkillCategoryPayload): Promise<ApiResponse<BackendSkillCategory>> {
    return apiClient<ApiResponse<BackendSkillCategory>>("/api/skills", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async updateSkillCategory(id: number, payload: UpdateSkillCategoryPayload): Promise<ApiResponse<BackendSkillCategory>> {
    return apiClient<ApiResponse<BackendSkillCategory>>(`/api/skills/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  static async deleteSkillCategory(id: number): Promise<ApiResponse<{ success: boolean; message: string }>> {
    return apiClient<ApiResponse<{ success: boolean; message: string }>>(`/api/skills/${id}`, {
      method: "DELETE",
    });
  }
}

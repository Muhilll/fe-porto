export interface BackendExperience {
  id: number;
  role: string;
  company: string;
  period: string;
  location?: string;
  company_url?: string | null;
  description?: string;
  skills?: string[];
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export type CreateExperiencePayload = Omit<BackendExperience, "id" | "created_at" | "updated_at">;
export type UpdateExperiencePayload = Partial<CreateExperiencePayload>;

export interface BackendEducation {
  id: number;
  degree: string;
  institution: string;
  period: string;
  description?: string;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export type CreateEducationPayload = Omit<BackendEducation, "id" | "created_at" | "updated_at">;
export type UpdateEducationPayload = Partial<CreateEducationPayload>;

export interface SkillItem {
  name: string;
  level: string; // e.g. "Expert", "Advanced", "Proficient"
  iconName?: string;
}

export interface BackendSkillCategory {
  id: number;
  category: string;
  skills: SkillItem[];
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export type CreateSkillCategoryPayload = Omit<BackendSkillCategory, "id" | "created_at" | "updated_at">;
export type UpdateSkillCategoryPayload = Partial<CreateSkillCategoryPayload>;

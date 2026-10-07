export interface ProjectMetric {
  label: string;
  value: string;
}

export interface BackendProject {
  id: number;
  title: string;
  slug: string;
  category: "Full-Stack" | "Frontend" | "Backend / API" | "System / Tools" | string;
  short_description?: string;
  full_description?: string;
  image_url: string;
  demo_url?: string | null;
  github_url?: string | null;
  year?: string;
  featured?: boolean;
  tags?: string[];
  metrics?: ProjectMetric[];
  architecture_points?: string[];
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export type CreateProjectPayload = Omit<BackendProject, "id" | "created_at" | "updated_at">;
export type UpdateProjectPayload = Partial<CreateProjectPayload>;

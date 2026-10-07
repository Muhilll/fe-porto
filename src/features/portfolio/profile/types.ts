export interface ProfileStat {
  label: string;
  value: string;
  description: string;
}

export interface BackendProfile {
  id?: number;
  name: string;
  short_name: string;
  role: string;
  roles_list?: string[];
  tagline?: string;
  bio?: string;
  location?: string;
  availability?: string;
  availability_text?: string;
  avatar_url?: string;
  resume_url?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  whatsapp?: string;
  stats?: ProfileStat[];
  created_at?: string;
  updated_at?: string;
}

export type UpdateProfilePayload = Partial<BackendProfile>;

export interface BackendService {
  id: number;
  service_code?: string | null;
  number: string;
  title: string;
  description?: string;
  icon?: string;
  features?: string[];
  deliverables?: string;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export type CreateServicePayload = Omit<BackendService, "id" | "created_at" | "updated_at">;
export type UpdateServicePayload = Partial<CreateServicePayload>;

export interface BackendCertificate {
  id: number;
  title: string;
  issuer: string;
  issuer_logo?: string | null;
  issue_date: string;
  expiry_date?: string | null;
  credential_id?: string | null;
  credential_url?: string | null;
  image: string;
  skills?: string[];
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export type CreateCertificatePayload = Omit<BackendCertificate, "id" | "created_at" | "updated_at">;
export type UpdateCertificatePayload = Partial<CreateCertificatePayload>;

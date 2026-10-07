export interface SendMessagePayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

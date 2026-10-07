import { apiClient } from "@/services/api/client";
import type { ApiResponse } from "@/services/api/types";
import type { SendMessagePayload, ContactMessage } from "../types";

export interface ContactMessagesResponse extends ApiResponse<ContactMessage[]> {
  unreadCount?: number;
}

export class ContactService {
  /**
   * Send inquiry from public website (Public)
   */
  static async send(payload: SendMessagePayload): Promise<ApiResponse<ContactMessage>> {
    return apiClient<ApiResponse<ContactMessage>>("/api/contact/send", {
      method: "POST",
      skipAuth: true,
      body: JSON.stringify(payload),
    });
  }

  /**
   * Get all messages for admin inbox (Protected)
   */
  static async getMessages(): Promise<ContactMessagesResponse> {
    return apiClient<ContactMessagesResponse>("/api/contact/messages");
  }

  /**
   * Mark message as read (Protected)
   */
  static async markAsRead(id: number): Promise<ApiResponse<{ success: boolean; message: string }>> {
    return apiClient<ApiResponse<{ success: boolean; message: string }>>(`/api/contact/messages/${id}/read`, {
      method: "PUT",
    });
  }

  /**
   * Delete message (Protected)
   */
  static async delete(id: number): Promise<ApiResponse<{ success: boolean; message: string }>> {
    return apiClient<ApiResponse<{ success: boolean; message: string }>>(`/api/contact/messages/${id}`, {
      method: "DELETE",
    });
  }
}

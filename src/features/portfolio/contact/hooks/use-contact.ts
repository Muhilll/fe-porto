import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ContactService } from "../services/contact-service";
import type { SendMessagePayload } from "../types";

export const CONTACT_KEYS = {
  all: ["portfolio-contact-messages"] as const,
  lists: () => [...CONTACT_KEYS.all, "list"] as const,
};

export function useContactMessages() {
  return useQuery({
    queryKey: CONTACT_KEYS.lists(),
    queryFn: async () => {
      const res = await ContactService.getMessages();
      return {
        messages: res.data || [],
        unreadCount: res.unreadCount || 0,
      };
    },
  });
}

export function useSendMessage() {
  return useMutation({
    mutationFn: (payload: SendMessagePayload) => ContactService.send(payload),
  });
}

export function useMarkMessageAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => ContactService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTACT_KEYS.all });
    },
  });
}

export function useDeleteMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => ContactService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTACT_KEYS.all });
    },
  });
}

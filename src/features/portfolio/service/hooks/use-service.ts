import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ServiceService } from "../services/service-service";
import type { CreateServicePayload, UpdateServicePayload } from "../types";

export const SERVICE_KEYS = {
  all: ["portfolio-services"] as const,
  lists: () => [...SERVICE_KEYS.all, "list"] as const,
};

export function useServices() {
  return useQuery({
    queryKey: SERVICE_KEYS.lists(),
    queryFn: async () => {
      const res = await ServiceService.getAll();
      return res.data || [];
    },
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateServicePayload) => ServiceService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SERVICE_KEYS.all });
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateServicePayload }) =>
      ServiceService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SERVICE_KEYS.all });
    },
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => ServiceService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SERVICE_KEYS.all });
    },
  });
}

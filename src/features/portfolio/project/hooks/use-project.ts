import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectService } from "../services/project-service";
import type { CreateProjectPayload, UpdateProjectPayload } from "../types";

export const PROJECT_KEYS = {
  all: ["portfolio-projects"] as const,
  lists: () => [...PROJECT_KEYS.all, "list"] as const,
  list: (filters?: Record<string, any>) => [...PROJECT_KEYS.lists(), filters] as const,
  details: () => [...PROJECT_KEYS.all, "detail"] as const,
  detail: (idOrSlug: string | number) => [...PROJECT_KEYS.details(), String(idOrSlug)] as const,
};

export function useProjects(params?: { category?: string; featured?: boolean }) {
  return useQuery({
    queryKey: PROJECT_KEYS.list(params),
    queryFn: async () => {
      const res = await ProjectService.getAll(params);
      return res.data || [];
    },
  });
}

export function useProject(idOrSlug: string | number, enabled = true) {
  return useQuery({
    queryKey: PROJECT_KEYS.detail(idOrSlug),
    queryFn: async () => {
      const res = await ProjectService.getByIdOrSlug(idOrSlug);
      return res.data;
    },
    enabled: !!idOrSlug && enabled,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProjectPayload) => ProjectService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.all });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateProjectPayload }) =>
      ProjectService.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.all });
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.detail(variables.id) });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => ProjectService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.all });
    },
  });
}

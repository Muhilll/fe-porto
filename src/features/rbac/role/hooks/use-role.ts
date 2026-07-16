import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RoleService } from "../services/role-service";
import type { CreateRoleRequest, UpdateRoleRequest } from "../types";

export const ROLE_KEYS = {
  all: ["roles"] as const,
  lists: () => [...ROLE_KEYS.all, "list"] as const,
  list: (filters: string) => [...ROLE_KEYS.lists(), { filters }] as const,
  details: () => [...ROLE_KEYS.all, "detail"] as const,
  detail: (id: number) => [...ROLE_KEYS.details(), id] as const,
};

export function useRoles() {
  return useQuery({
    queryKey: ROLE_KEYS.lists(),
    queryFn: async () => {
      const res = await RoleService.getAll();
      return res.data;
    },
  });
}

export function useRole(id: number, enabled = true) {
  return useQuery({
    queryKey: ROLE_KEYS.detail(id),
    queryFn: async () => {
      const res = await RoleService.getById(id);
      return res.data;
    },
    enabled: !!id && enabled,
  });
}

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoleRequest) => RoleService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROLE_KEYS.lists() });
    },
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateRoleRequest }) =>
      RoleService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ROLE_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: ROLE_KEYS.detail(variables.id) });
    },
  });
}

export function useDeleteRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => RoleService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROLE_KEYS.lists() });
    },
  });
}

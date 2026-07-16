import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RolePermissionService } from "../services/role-permission-service";
import type { CreateRolePermissionRequest, UpdateRolePermissionRequest } from "../types";

export const ROLE_PERMISSION_KEYS = {
  all: ["role-permissions"] as const,
  lists: () => [...ROLE_PERMISSION_KEYS.all, "list"] as const,
  list: (filters: string) => [...ROLE_PERMISSION_KEYS.lists(), { filters }] as const,
  details: () => [...ROLE_PERMISSION_KEYS.all, "detail"] as const,
  detail: (id: number) => [...ROLE_PERMISSION_KEYS.details(), id] as const,
};

export function useRolePermissions() {
  return useQuery({
    queryKey: ROLE_PERMISSION_KEYS.lists(),
    queryFn: async () => {
      const res = await RolePermissionService.getAll();
      return res.data;
    },
  });
}

export function useRolePermission(id: number, enabled = true) {
  return useQuery({
    queryKey: ROLE_PERMISSION_KEYS.detail(id),
    queryFn: async () => {
      const res = await RolePermissionService.getById(id);
      return res.data;
    },
    enabled: !!id && enabled,
  });
}

export function useCreateRolePermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRolePermissionRequest) => RolePermissionService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROLE_PERMISSION_KEYS.lists() });
    },
  });
}

export function useUpdateRolePermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateRolePermissionRequest }) =>
      RolePermissionService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ROLE_PERMISSION_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: ROLE_PERMISSION_KEYS.detail(variables.id) });
    },
  });
}

export function useDeleteRolePermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => RolePermissionService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROLE_PERMISSION_KEYS.lists() });
    },
  });
}

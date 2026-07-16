import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { UserService } from "../services/user-service";
import type { CreateUserRequest, UpdateUserRequest, NavigationItem, NavigationPermission } from "../types";

export const USER_KEYS = {
  all: ["users"] as const,
  lists: () => [...USER_KEYS.all, "list"] as const,
  list: (filters: string) => [...USER_KEYS.lists(), { filters }] as const,
  details: () => [...USER_KEYS.all, "detail"] as const,
  detail: (id: number) => [...USER_KEYS.details(), id] as const,
  navigation: () => [...USER_KEYS.all, "navigation"] as const,
};

export function useUsers() {
  return useQuery({
    queryKey: USER_KEYS.lists(),
    queryFn: async () => {
      const res = await UserService.getAll();
      return res.data;
    },
  });
}

export function useUserNavigation() {
  return useQuery({
    queryKey: USER_KEYS.navigation(),
    queryFn: async () => {
      const res = await UserService.getNavigation();
      return res.data;
    },
  });
}

const defaultPermissions: NavigationPermission = {
  can_read: false,
  can_create: false,
  can_update: false,
  can_delete: false,
  can_report: false,
};

function findMenuPermissions(items: NavigationItem[], targetPath: string): NavigationPermission | null {
  for (const item of items) {
    if (item.path && item.path.replace(/\/$/, "") === targetPath) {
      return item.permissions;
    }
    if (item.children && item.children.length > 0) {
      const found = findMenuPermissions(item.children, targetPath);
      if (found) return found;
    }
  }
  return null;
}

export function usePermissions(customPath?: string) {
  const pathname = usePathname();
  const targetPath = (customPath || pathname).replace(/\/$/, "");
  const { data: navItems = [], isLoading } = useUserNavigation();

  if (isLoading) return { ...defaultPermissions, isLoading: true };

  const permissions = findMenuPermissions(navItems, targetPath) || defaultPermissions;
  return { ...permissions, isLoading: false };
}

export function useUser(id: number, enabled = true) {
  return useQuery({
    queryKey: USER_KEYS.detail(id),
    queryFn: async () => {
      const res = await UserService.getById(id);
      return res.data;
    },
    enabled: !!id && enabled,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserRequest) => UserService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.lists() });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserRequest }) =>
      UserService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: USER_KEYS.detail(variables.id) });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => UserService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.lists() });
    },
  });
}

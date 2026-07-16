import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MenuService } from "../services/menu-service";
import type { CreateMenuRequest, UpdateMenuRequest } from "../types";

export const MENU_KEYS = {
  all: ["menus"] as const,
  lists: () => [...MENU_KEYS.all, "list"] as const,
  list: (filters: string) => [...MENU_KEYS.lists(), { filters }] as const,
  details: () => [...MENU_KEYS.all, "detail"] as const,
  detail: (id: number) => [...MENU_KEYS.details(), id] as const,
};

export function useMenus() {
  return useQuery({
    queryKey: MENU_KEYS.lists(),
    queryFn: async () => {
      const res = await MenuService.getAll();
      return res.data;
    },
  });
}

export function useMenu(id: number, enabled = true) {
  return useQuery({
    queryKey: MENU_KEYS.detail(id),
    queryFn: async () => {
      const res = await MenuService.getById(id);
      return res.data;
    },
    enabled: !!id && enabled,
  });
}

export function useCreateMenu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMenuRequest) => MenuService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MENU_KEYS.lists() });
    },
  });
}

export function useUpdateMenu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateMenuRequest }) =>
      MenuService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: MENU_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: MENU_KEYS.detail(variables.id) });
    },
  });
}

export function useDeleteMenu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => MenuService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MENU_KEYS.lists() });
    },
  });
}

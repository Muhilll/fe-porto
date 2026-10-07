import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BlogService } from "../services/blog-service";
import type { CreateBlogPayload, UpdateBlogPayload } from "../types";

export const BLOG_KEYS = {
  all: ["portfolio-blogs"] as const,
  lists: () => [...BLOG_KEYS.all, "list"] as const,
  list: (options?: { all?: boolean }) => [...BLOG_KEYS.lists(), options?.all ? "admin-all" : "public"] as const,
  detail: (slug: string) => [...BLOG_KEYS.all, "detail", slug] as const,
};

export function useBlogs(options?: { all?: boolean }) {
  return useQuery({
    queryKey: BLOG_KEYS.list(options),
    queryFn: async () => {
      const res = await BlogService.getAll(options);
      return res.data || [];
    },
  });
}

export function useBlog(slug: string) {
  return useQuery({
    queryKey: BLOG_KEYS.detail(slug),
    queryFn: async () => {
      if (!slug) return null;
      const res = await BlogService.getBySlug(slug);
      return res.data || null;
    },
    enabled: Boolean(slug),
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateBlogPayload) => BlogService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_KEYS.all });
    },
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateBlogPayload }) =>
      BlogService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_KEYS.all });
    },
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => BlogService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_KEYS.all });
    },
  });
}

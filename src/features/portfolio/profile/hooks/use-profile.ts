import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileService } from "../services/profile-service";
import type { UpdateProfilePayload } from "../types";

export const PROFILE_KEYS = {
  all: ["portfolio-profile"] as const,
  detail: () => [...PROFILE_KEYS.all, "detail"] as const,
};

export function useProfile() {
  return useQuery({
    queryKey: PROFILE_KEYS.detail(),
    queryFn: async () => {
      const res = await ProfileService.get();
      return res.data;
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => ProfileService.upsert(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_KEYS.all });
    },
  });
}

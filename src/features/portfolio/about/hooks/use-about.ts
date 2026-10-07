import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AboutService } from "../services/about-service";
import type {
  CreateExperiencePayload,
  UpdateExperiencePayload,
  CreateEducationPayload,
  UpdateEducationPayload,
  CreateSkillCategoryPayload,
  UpdateSkillCategoryPayload,
} from "../types";

export const ABOUT_KEYS = {
  experiences: ["portfolio-experiences"] as const,
  educations: ["portfolio-educations"] as const,
  skills: ["portfolio-skills"] as const,
};

/* ─── Experiences Hooks ─────────────────────────────────── */
export function useExperiences() {
  return useQuery({
    queryKey: ABOUT_KEYS.experiences,
    queryFn: async () => {
      const res = await AboutService.getAllExperiences();
      return res.data || [];
    },
  });
}

export function useCreateExperience() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateExperiencePayload) => AboutService.createExperience(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ABOUT_KEYS.experiences });
    },
  });
}

export function useUpdateExperience() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateExperiencePayload }) =>
      AboutService.updateExperience(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ABOUT_KEYS.experiences });
    },
  });
}

export function useDeleteExperience() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => AboutService.deleteExperience(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ABOUT_KEYS.experiences });
    },
  });
}

/* ─── Educations Hooks ──────────────────────────────────── */
export function useEducations() {
  return useQuery({
    queryKey: ABOUT_KEYS.educations,
    queryFn: async () => {
      const res = await AboutService.getAllEducations();
      return res.data || [];
    },
  });
}

export function useCreateEducation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateEducationPayload) => AboutService.createEducation(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ABOUT_KEYS.educations });
    },
  });
}

export function useUpdateEducation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateEducationPayload }) =>
      AboutService.updateEducation(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ABOUT_KEYS.educations });
    },
  });
}

export function useDeleteEducation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => AboutService.deleteEducation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ABOUT_KEYS.educations });
    },
  });
}

/* ─── Skills Hooks ──────────────────────────────────────── */
export function useSkills() {
  return useQuery({
    queryKey: ABOUT_KEYS.skills,
    queryFn: async () => {
      const res = await AboutService.getAllSkills();
      return res.data || [];
    },
  });
}

export function useCreateSkillCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateSkillCategoryPayload) => AboutService.createSkillCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ABOUT_KEYS.skills });
    },
  });
}

export function useUpdateSkillCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateSkillCategoryPayload }) =>
      AboutService.updateSkillCategory(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ABOUT_KEYS.skills });
    },
  });
}

export function useDeleteSkillCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => AboutService.deleteSkillCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ABOUT_KEYS.skills });
    },
  });
}

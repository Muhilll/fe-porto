import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CertificateService } from "../services/certificate-service";
import type { CreateCertificatePayload, UpdateCertificatePayload } from "../types";

export const CERTIFICATE_KEYS = {
  all: ["portfolio-certificates"] as const,
  lists: () => [...CERTIFICATE_KEYS.all, "list"] as const,
};

export function useCertificates() {
  return useQuery({
    queryKey: CERTIFICATE_KEYS.lists(),
    queryFn: async () => {
      const res = await CertificateService.getAll();
      return res.data || [];
    },
  });
}

export function useCreateCertificate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateCertificatePayload) => CertificateService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CERTIFICATE_KEYS.all });
    },
  });
}

export function useUpdateCertificate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateCertificatePayload }) =>
      CertificateService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CERTIFICATE_KEYS.all });
    },
  });
}

export function useDeleteCertificate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => CertificateService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CERTIFICATE_KEYS.all });
    },
  });
}

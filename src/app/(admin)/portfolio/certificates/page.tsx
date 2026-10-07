"use client";

import React, { useState } from "react";
import {
  useCertificates,
  useCreateCertificate,
  useUpdateCertificate,
  useDeleteCertificate,
} from "@/features/portfolio/certificate/hooks/use-certificate";
import type { BackendCertificate, CreateCertificatePayload } from "@/features/portfolio/certificate/types";
import { UploadService } from "@/features/portfolio/upload/upload-service";
import { certificatesData } from "@/data/certificates";
import { useNotification } from "@/components/ui/notification";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalClose,
} from "@/components/ui/modal";
import {
  Award,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Upload,
  Calendar,
  RotateCcw,
  AlertTriangle,
  Sparkles,
  Eye,
} from "lucide-react";

const initialFormState: CreateCertificatePayload = {
  title: "",
  issuer: "",
  issuer_logo: "",
  issue_date: "",
  expiry_date: "",
  credential_id: "",
  credential_url: "",
  image: "",
  skills: [],
  sort_order: 0,
};

export default function PortfolioCertificatesManagementPage() {
  const { data: certificates = [], isLoading } = useCertificates();
  const createMutation = useCreateCertificate();
  const updateMutation = useUpdateCertificate();
  const deleteMutation = useDeleteCertificate();
  const notification = useNotification();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<BackendCertificate | null>(null);
  const [formData, setFormData] = useState<CreateCertificatePayload>(initialFormState);
  const [newSkillInput, setNewSkillInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Delete State
  const [certToDelete, setCertToDelete] = useState<BackendCertificate | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);

  const handleOpenCreate = () => {
    setEditingCert(null);
    setFormData({
      ...initialFormState,
      issue_date: new Date().getFullYear().toString(),
    });
    setNewSkillInput("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cert: BackendCertificate) => {
    setEditingCert(cert);
    setFormData({
      title: cert.title,
      issuer: cert.issuer,
      issuer_logo: cert.issuer_logo || "",
      issue_date: cert.issue_date,
      expiry_date: cert.expiry_date || "",
      credential_id: cert.credential_id || "",
      credential_url: cert.credential_url || "",
      image: cert.image,
      skills: cert.skills ? [...cert.skills] : [],
      sort_order: cert.sort_order || 0,
    });
    setNewSkillInput("");
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await UploadService.uploadImage(file);
      setFormData((prev) => ({ ...prev, image: url }));
      notification?.add?.({
        type: "success",
        title: "Gambar Berhasil Diunggah",
        message: "Cover sertifikat berhasil diupload.",
      });
    } catch (err: any) {
      notification?.add?.({
        type: "error",
        title: "Gagal Mengunggah",
        message: err.message || "Gagal mengunggah gambar.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddSkill = () => {
    if (newSkillInput.trim()) {
      if (!formData.skills?.includes(newSkillInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          skills: [...(prev.skills || []), newSkillInput.trim()],
        }));
      }
      setNewSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills?.filter((s) => s !== skillToRemove) || [],
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.issuer || !formData.image) {
      notification?.add?.({
        type: "error",
        title: "Validasi Gagal",
        message: "Judul sertifikat, penerbit, dan gambar wajib diisi.",
      });
      return;
    }

    try {
      if (editingCert) {
        await updateMutation.mutateAsync({ id: editingCert.id, payload: formData });
        notification?.add?.({
          type: "success",
          title: "Sertifikat Diperbarui",
          message: "Data sertifikat berhasil diupdate.",
        });
      } else {
        await createMutation.mutateAsync(formData);
        notification?.add?.({
          type: "success",
          title: "Sertifikat Ditambahkan",
          message: "Sertifikat baru berhasil disimpan.",
        });
      }
      setIsModalOpen(false);
    } catch (err: any) {
      notification?.add?.({
        type: "error",
        title: "Gagal Menyimpan",
        message: err.message || "Terjadi kesalahan.",
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!certToDelete) return;

    try {
      await deleteMutation.mutateAsync(certToDelete.id);
      notification?.add?.({
        type: "success",
        title: "Sertifikat Dihapus",
        message: `Sertifikat "${certToDelete.title}" telah dihapus.`,
      });
      setCertToDelete(null);
    } catch (err: any) {
      notification?.add?.({
        type: "error",
        title: "Gagal Menghapus",
        message: err.message || "Gagal menghapus data.",
      });
    }
  };

  const handleImportInitialData = async () => {
    if (!confirm("Impor 6 template sertifikat awal ke database?")) return;

    try {
      setIsSeeding(true);
      for (const item of certificatesData) {
        await createMutation.mutateAsync({
          title: item.title,
          issuer: item.issuer,
          issuer_logo: item.issuerLogo || null,
          issue_date: item.issueDate,
          expiry_date: item.expiryDate || null,
          credential_id: item.credentialId || null,
          credential_url: item.credentialUrl || null,
          image: item.image,
          skills: item.skills,
          sort_order: 0,
        });
      }
      notification?.add?.({
        type: "success",
        title: "Berhasil Diimpor",
        message: "Data sertifikat template berhasil dimasukkan ke database.",
      });
    } catch (err: any) {
      notification?.add?.({
        type: "error",
        title: "Gagal Impor",
        message: err.message || "Gagal mengimpor data.",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Kelola Sertifikat & Lisensi</h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400">
              <Award className="size-3" /> {certificates.length} Sertifikat
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola sertifikasi profesional, verifikasi kredensial, dan lisensi kompetensi yang tampil di halaman /certificates.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {certificates.length === 0 && (
            <button
              type="button"
              onClick={handleImportInitialData}
              disabled={isSeeding}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <RotateCcw className="size-3.5" />
              <span>{isSeeding ? "Mengimpor..." : "Impor Template Awal"}</span>
            </button>
          )}

          <a
            href="/certificates"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <ExternalLink className="size-3.5" /> Lihat /certificates
          </a>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            <Plus className="size-4" /> Tambah Sertifikat
          </button>
        </div>
      </div>

      {/* Grid List */}
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <span className="size-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
        </div>
      ) : certificates.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center space-y-3">
          <Award className="size-12 mx-auto text-muted-foreground/50 mb-2" />
          <h3 className="text-base font-semibold text-foreground">Belum ada sertifikat dalam database</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Halaman publik saat ini menampilkan data template. Anda dapat mulai menambahkan sertifikat atau mengimpor data awal.
          </p>
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={handleOpenCreate}
              className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
            >
              Tambah Sertifikat
            </button>
            <button
              onClick={handleImportInitialData}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
            >
              Impor Template Awal
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Image Preview */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="rounded-md bg-black/70 backdrop-blur-md px-2 py-0.5 text-[10px] font-medium text-white border border-white/10">
                    {cert.issuer}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <span>{cert.issue_date}</span>
                  <span className="truncate max-w-[120px]">{cert.credential_id}</span>
                </div>

                <h3 className="font-semibold text-foreground text-sm line-clamp-2 leading-tight">
                  {cert.title}
                </h3>

                {/* Skills */}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.map((s, idx) => (
                      <span key={idx} className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer Actions */}
                <div className="mt-auto pt-3 border-t border-border/50 flex items-center justify-between">
                  {cert.credential_url ? (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 font-medium"
                    >
                      <ExternalLink className="size-3" /> Verifikasi
                    </a>
                  ) : <div />}

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(cert)}
                      className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted"
                    >
                      <Edit2 className="size-3" /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setCertToDelete(cert)}
                      className="rounded-md border border-red-200 dark:border-red-900/50 p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                      title="Hapus"
                    >
                      <Trash2 className="size-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE & EDIT MODAL */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} className="max-w-lg">
        <ModalHeader>
          <ModalTitle>{editingCert ? "Sunting Sertifikat" : "Tambah Sertifikat Baru"}</ModalTitle>
          <ModalClose onClose={() => setIsModalOpen(false)} />
        </ModalHeader>

        <form onSubmit={handleSave} className="flex flex-col flex-1 overflow-hidden">
          <ModalBody className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Judul Sertifikat <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="AWS Certified Solutions Architect"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Penerbit (Issuer) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.issuer}
                  onChange={(e) => setFormData((prev) => ({ ...prev, issuer: e.target.value }))}
                  placeholder="Amazon Web Services"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Tanggal Terbit <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.issue_date}
                  onChange={(e) => setFormData((prev) => ({ ...prev, issue_date: e.target.value }))}
                  placeholder="November 2024"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">ID Kredensial / License</label>
                <input
                  type="text"
                  value={formData.credential_id || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, credential_id: e.target.value }))}
                  placeholder="AWS-SAA-8492041"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">URL Verifikasi Kredensial</label>
                <input
                  type="url"
                  value={formData.credential_url || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, credential_url: e.target.value }))}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Foto / Cover Sertifikat <span className="text-red-500">*</span>
              </label>

              {formData.image && (
                <div className="relative aspect-video w-full max-h-32 rounded-lg overflow-hidden border border-border mb-2 bg-muted">
                  <img src={formData.image} alt="Preview" className="size-full object-cover" />
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                  placeholder="https://... atau upload file"
                  className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                />
                <label className="inline-flex items-center gap-1 rounded-lg border border-input bg-secondary px-3 py-2 text-xs font-medium text-secondary-foreground hover:bg-secondary/80 cursor-pointer">
                  <Upload className="size-3.5" />
                  <span>{isUploading ? "..." : "Upload"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Skill & Kompetensi Terkait</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {formData.skills?.map((sk) => (
                  <span
                    key={sk}
                    className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-xs font-medium text-foreground border border-border"
                  >
                    {sk}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(sk)}
                      className="text-muted-foreground hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                  placeholder="Contoh: Cloud Architecture, S3"
                  className="flex-1 rounded-lg border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground"
                >
                  Tambah
                </button>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
            >
              {createMutation.isPending || updateMutation.isPending ? "Menyimpan..." : "Simpan Sertifikat"}
            </button>
          </ModalFooter>
        </form>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal open={!!certToDelete} onClose={() => setCertToDelete(null)} className="max-w-sm">
        <ModalHeader>
          <ModalTitle className="text-red-600 flex items-center gap-2">
            <AlertTriangle className="size-5" /> Hapus Sertifikat
          </ModalTitle>
          <ModalClose onClose={() => setCertToDelete(null)} />
        </ModalHeader>
        <ModalBody>
          <p className="text-xs text-foreground">
            Apakah Anda yakin ingin menghapus <span className="font-semibold text-red-600">{certToDelete?.title}</span>?
          </p>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            onClick={() => setCertToDelete(null)}
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleDeleteConfirm}
            className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
          >
            Ya, Hapus
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

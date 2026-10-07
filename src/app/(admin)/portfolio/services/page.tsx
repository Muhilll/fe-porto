"use client";

import React, { useState } from "react";
import {
  useServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
} from "@/features/portfolio/service/hooks/use-service";
import type { BackendService, CreateServicePayload } from "@/features/portfolio/service/types";
import { servicesData } from "@/data/services";
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
  Wrench,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  RotateCcw,
  AlertTriangle,
  Layout,
  Server,
  Sparkles,
  Zap,
  CheckCircle2,
} from "lucide-react";

const ICONS = ["Layout", "Server", "Sparkles", "Zap"];

const initialFormState: CreateServicePayload = {
  number: "01",
  title: "",
  description: "",
  icon: "Layout",
  features: [],
  deliverables: "",
  sort_order: 0,
};

export default function PortfolioServicesManagementPage() {
  const { data: services = [], isLoading } = useServices();
  const createMutation = useCreateService();
  const updateMutation = useUpdateService();
  const deleteMutation = useDeleteService();
  const notification = useNotification();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<BackendService | null>(null);
  const [formData, setFormData] = useState<CreateServicePayload>(initialFormState);
  const [newFeatureInput, setNewFeatureInput] = useState("");

  // Delete State
  const [serviceToDelete, setServiceToDelete] = useState<BackendService | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);

  const handleOpenCreate = () => {
    setEditingService(null);
    const nextNumber = String(services.length + 1).padStart(2, "0");
    setFormData({
      ...initialFormState,
      number: nextNumber,
    });
    setNewFeatureInput("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (srv: BackendService) => {
    setEditingService(srv);
    setFormData({
      service_code: srv.service_code,
      number: srv.number,
      title: srv.title,
      description: srv.description || "",
      icon: srv.icon || "Layout",
      features: srv.features ? [...srv.features] : [],
      deliverables: srv.deliverables || "",
      sort_order: srv.sort_order || 0,
    });
    setNewFeatureInput("");
    setIsModalOpen(true);
  };

  const handleAddFeature = () => {
    if (newFeatureInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...(prev.features || []), newFeatureInput.trim()],
      }));
      setNewFeatureInput("");
    }
  };

  const handleRemoveFeature = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== idx) || [],
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.number) {
      notification?.add?.({
        type: "error",
        title: "Validasi Gagal",
        message: "Nomor urut dan judul layanan wajib diisi.",
      });
      return;
    }

    try {
      if (editingService) {
        await updateMutation.mutateAsync({ id: editingService.id, payload: formData });
        notification?.add?.({
          type: "success",
          title: "Layanan Diperbarui",
          message: "Layanan berhasil diupdate.",
        });
      } else {
        await createMutation.mutateAsync(formData);
        notification?.add?.({
          type: "success",
          title: "Layanan Ditambahkan",
          message: "Layanan baru berhasil disimpan.",
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
    if (!serviceToDelete) return;

    try {
      await deleteMutation.mutateAsync(serviceToDelete.id);
      notification?.add?.({
        type: "success",
        title: "Layanan Dihapus",
        message: `Layanan "${serviceToDelete.title}" telah dihapus.`,
      });
      setServiceToDelete(null);
    } catch (err: any) {
      notification?.add?.({
        type: "error",
        title: "Gagal Menghapus",
        message: err.message || "Gagal menghapus layanan.",
      });
    }
  };

  const handleImportInitialData = async () => {
    if (!confirm("Impor 4 template layanan awal ke database?")) return;

    try {
      setIsSeeding(true);
      for (const item of servicesData) {
        await createMutation.mutateAsync({
          service_code: item.id,
          number: item.number,
          title: item.title,
          description: item.description,
          icon: item.icon,
          features: item.features,
          deliverables: item.deliverables,
          sort_order: 0,
        });
      }
      notification?.add?.({
        type: "success",
        title: "Berhasil Diimpor",
        message: "Data layanan awal berhasil dimasukkan ke database.",
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

  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case "Server":
        return <Server className="size-4" />;
      case "Sparkles":
        return <Sparkles className="size-4" />;
      case "Zap":
        return <Zap className="size-4" />;
      default:
        return <Layout className="size-4" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Kelola Layanan Rekayasa</h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400">
              <Wrench className="size-3" /> {services.length} Layanan
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola penawaran jasa rekayasa software, arsitektur API, dan kapabilitas teknis yang tampil di halaman /services.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {services.length === 0 && (
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
            href="/services"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <ExternalLink className="size-3.5" /> Lihat /services
          </a>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            <Plus className="size-4" /> Tambah Layanan
          </button>
        </div>
      </div>

      {/* Grid List */}
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <span className="size-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
        </div>
      ) : services.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center space-y-3">
          <Wrench className="size-12 mx-auto text-muted-foreground/50 mb-2" />
          <h3 className="text-base font-semibold text-foreground">Belum ada layanan dalam database</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Website publik saat ini menampilkan data template. Anda dapat mulai menambahkan penawaran layanan atau mengimpor data awal.
          </p>
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={handleOpenCreate}
              className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
            >
              Tambah Layanan
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="rounded-xl border border-border bg-card p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="size-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      {renderIcon(srv.icon)}
                    </div>
                    <div>
                      <span className="text-xs font-mono font-semibold text-muted-foreground">{srv.number}</span>
                      <h3 className="font-semibold text-foreground text-base leading-tight">{srv.title}</h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {srv.description}
                </p>

                {/* Features */}
                {srv.features && srv.features.length > 0 && (
                  <div className="space-y-1 pt-2">
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block mb-1">
                      Fitur & Kapabilitas:
                    </span>
                    <ul className="space-y-1">
                      {srv.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-xs text-foreground/90">
                          <CheckCircle2 className="size-3 text-emerald-500 mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {srv.deliverables && (
                  <div className="pt-2 border-t border-border/50 text-xs">
                    <span className="text-muted-foreground font-mono text-[10px] block">Deliverables:</span>
                    <span className="text-foreground font-medium text-xs">{srv.deliverables}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-border/50 flex items-center justify-end gap-1.5">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(srv)}
                  className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted"
                >
                  <Edit2 className="size-3" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => setServiceToDelete(srv)}
                  className="rounded-md border border-red-200 dark:border-red-900/50 p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                  title="Hapus"
                >
                  <Trash2 className="size-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE & EDIT MODAL */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} className="max-w-lg">
        <ModalHeader>
          <ModalTitle>{editingService ? "Sunting Layanan" : "Tambah Layanan Baru"}</ModalTitle>
          <ModalClose onClose={() => setIsModalOpen(false)} />
        </ModalHeader>

        <form onSubmit={handleSave} className="flex flex-col flex-1 overflow-hidden">
          <ModalBody className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Nomor Urut <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.number}
                  onChange={(e) => setFormData((prev) => ({ ...prev, number: e.target.value }))}
                  placeholder="01"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-medium text-foreground mb-1">
                  Pilihan Ikon
                </label>
                <select
                  value={formData.icon || "Layout"}
                  onChange={(e) => setFormData((prev) => ({ ...prev, icon: e.target.value }))}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                >
                  {ICONS.map((ic) => (
                    <option key={ic} value={ic}>
                      {ic}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Judul Layanan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Full-Stack Web Application Development"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Deskripsi Layanan</label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Penjelasan value layanan, cakupan operasional, dan arsitektur..."
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
              />
            </div>

            {/* Features */}
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Fitur & Kapabilitas yang Disertakan</label>
              <div className="space-y-1.5 mb-2 max-h-36 overflow-y-auto pr-1">
                {formData.features?.map((feat, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded bg-muted/40 px-2.5 py-1 text-xs">
                    <span className="text-foreground">• {feat}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(idx)}
                      className="text-muted-foreground hover:text-red-500"
                    >
                      <Trash2 className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeatureInput}
                  onChange={(e) => setNewFeatureInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddFeature();
                    }
                  }}
                  placeholder="Contoh: Role-Based Access Control (RBAC)"
                  className="flex-1 rounded-lg border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground"
                >
                  Tambah
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Deliverables</label>
              <input
                type="text"
                value={formData.deliverables || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, deliverables: e.target.value }))}
                placeholder="Contoh: Fully deployed production app, Git repository, API documentation"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
              />
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
              {createMutation.isPending || updateMutation.isPending ? "Menyimpan..." : "Simpan Layanan"}
            </button>
          </ModalFooter>
        </form>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal open={!!serviceToDelete} onClose={() => setServiceToDelete(null)} className="max-w-sm">
        <ModalHeader>
          <ModalTitle className="text-red-600 flex items-center gap-2">
            <AlertTriangle className="size-5" /> Hapus Layanan
          </ModalTitle>
          <ModalClose onClose={() => setServiceToDelete(null)} />
        </ModalHeader>
        <ModalBody>
          <p className="text-xs text-foreground">
            Apakah Anda yakin ingin menghapus layanan <span className="font-semibold text-red-600">{serviceToDelete?.title}</span>?
          </p>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            onClick={() => setServiceToDelete(null)}
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

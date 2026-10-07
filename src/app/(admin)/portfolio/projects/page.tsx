"use client";

import React, { useState, useMemo } from "react";
import {
  useProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
} from "@/features/portfolio/project/hooks/use-project";
import type { BackendProject, CreateProjectPayload } from "@/features/portfolio/project/types";
import { UploadService } from "@/features/portfolio/upload/upload-service";
import { projectsData } from "@/data/projects";
import { useNotification } from "@/components/ui/notification";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalClose,
} from "@/components/ui/modal";
import { ProjectRichEditor } from "@/components/portfolio/shared/project-rich-editor";
import {
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Sparkles,
  Upload,
  Star,
  Layers,
  FolderGit2,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Globe,
  Tag,
  BarChart3,
  ListOrdered,
} from "lucide-react";
import { GithubIcon } from "@/components/portfolio/shared/icons";

const CATEGORIES = ["Full-Stack", "Frontend", "Backend / API", "System / Tools"];

const initialFormState: CreateProjectPayload = {
  title: "",
  slug: "",
  category: "Full-Stack",
  short_description: "",
  full_description: "",
  image_url: "",
  demo_url: "",
  github_url: "",
  year: new Date().getFullYear().toString(),
  featured: false,
  tags: [],
  metrics: [],
  architecture_points: [],
  sort_order: 0,
};

export default function PortfolioProjectsPage() {
  const { data: projects = [], isLoading } = useProjects();
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();
  const deleteMutation = useDeleteProject();
  const notification = useNotification();

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<BackendProject | null>(null);
  const [formData, setFormData] = useState<CreateProjectPayload>(initialFormState);
  const [isUploading, setIsUploading] = useState(false);

  // New item inputs inside modal
  const [newTagInput, setNewTagInput] = useState("");
  const [newArchInput, setNewArchInput] = useState("");

  // Delete Confirm Modal State
  const [projectToDelete, setProjectToDelete] = useState<BackendProject | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.short_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat =
        selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [projects, searchQuery, selectedCategory]);

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData({
      ...initialFormState,
      year: new Date().getFullYear().toString(),
    });
    setNewTagInput("");
    setNewArchInput("");
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (project: BackendProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      category: project.category,
      short_description: project.short_description || "",
      full_description: project.full_description || "",
      image_url: project.image_url,
      demo_url: project.demo_url || "",
      github_url: project.github_url || "",
      year: project.year || "2025",
      featured: Boolean(project.featured),
      tags: project.tags ? [...project.tags] : [],
      metrics: project.metrics ? [...project.metrics] : [],
      architecture_points: project.architecture_points ? [...project.architecture_points] : [],
      sort_order: project.sort_order || 0,
    });
    setNewTagInput("");
    setNewArchInput("");
    setIsModalOpen(true);
  };

  // Auto-slug generator
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titleVal = e.target.value;
    const autoSlug = titleVal
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    setFormData((prev) => ({
      ...prev,
      title: titleVal,
      slug: !editingProject ? autoSlug : prev.slug,
    }));
  };

  // Upload image handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await UploadService.uploadImage(file);
      setFormData((prev) => ({ ...prev, image_url: url }));
      notification?.add?.({
        type: "success",
        title: "Gambar Berhasil Diunggah",
        message: "Cover proyek telah diupload ke Cloudinary / server lokal.",
      });
    } catch (err: any) {
      console.error("Upload error:", err);
      notification?.add?.({
        type: "error",
        title: "Upload Gagal",
        message: err.message || "Gagal mengunggah cover proyek.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Tag helper
  const handleAddTag = () => {
    if (newTagInput.trim()) {
      if (!formData.tags?.includes(newTagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...(prev.tags || []), newTagInput.trim()],
        }));
      }
      setNewTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((t) => t !== tagToRemove) || [],
    }));
  };

  // Architecture point helper
  const handleAddArch = () => {
    if (newArchInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        architecture_points: [...(prev.architecture_points || []), newArchInput.trim()],
      }));
      setNewArchInput("");
    }
  };

  const handleRemoveArch = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      architecture_points: prev.architecture_points?.filter((_, i) => i !== idx) || [],
    }));
  };

  // Metrics helper
  const handleAddMetric = () => {
    setFormData((prev) => ({
      ...prev,
      metrics: [...(prev.metrics || []), { label: "Label Metrik", value: "100%" }],
    }));
  };

  const handleMetricChange = (index: number, field: "label" | "value", val: string) => {
    setFormData((prev) => {
      const nextMetrics = [...(prev.metrics || [])];
      nextMetrics[index] = { ...nextMetrics[index], [field]: val };
      return { ...prev, metrics: nextMetrics };
    });
  };

  const handleRemoveMetric = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      metrics: prev.metrics?.filter((_, i) => i !== index) || [],
    }));
  };

  // Save Project (Create / Update)
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.image_url) {
      notification?.add?.({
        type: "error",
        title: "Validasi Gagal",
        message: "Judul proyek dan gambar cover wajib diisi.",
      });
      return;
    }

    try {
      if (editingProject) {
        await updateMutation.mutateAsync({
          id: editingProject.id,
          payload: formData,
        });
        notification?.add?.({
          type: "success",
          title: "Proyek Diperbarui",
          message: `Proyek "${formData.title}" berhasil diupdate.`,
        });
      } else {
        await createMutation.mutateAsync(formData);
        notification?.add?.({
          type: "success",
          title: "Proyek Dibuat",
          message: `Proyek "${formData.title}" berhasil ditambahkan.`,
        });
      }
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Save project error:", err);
      notification?.add?.({
        type: "error",
        title: "Gagal Menyimpan",
        message: err.message || "Terjadi kesalahan saat menyimpan proyek.",
      });
    }
  };

  // Delete project
  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;

    try {
      await deleteMutation.mutateAsync(projectToDelete.id);
      notification?.add?.({
        type: "success",
        title: "Proyek Dihapus",
        message: `Proyek "${projectToDelete.title}" telah dihapus.`,
      });
      setProjectToDelete(null);
    } catch (err: any) {
      console.error("Delete project error:", err);
      notification?.add?.({
        type: "error",
        title: "Gagal Menghapus",
        message: err.message || "Terjadi kesalahan saat menghapus proyek.",
      });
    }
  };

  // Optional: Import static template projects to DB
  const handleImportInitialData = async () => {
    if (!confirm("Impor semua 6 template proyek awal ke database Anda?")) return;

    try {
      setIsSeeding(true);
      for (const item of projectsData) {
        await createMutation.mutateAsync({
          title: item.title,
          slug: item.slug,
          category: item.category,
          short_description: item.shortDescription,
          full_description: item.fullDescription,
          image_url: item.image,
          demo_url: item.demoUrl || null,
          github_url: item.githubUrl || null,
          year: item.year,
          featured: item.featured,
          tags: item.tags,
          metrics: item.metrics || [],
          architecture_points: item.architecturePoints || [],
          sort_order: 0,
        });
      }
      notification?.add?.({
        type: "success",
        title: "Berhasil Diimpor",
        message: "Template proyek berhasil disimpan ke database.",
      });
    } catch (err: any) {
      notification?.add?.({
        type: "error",
        title: "Gagal Impor",
        message: err.message || "Gagal mengimpor data template.",
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
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Kelola Proyek Portofolio</h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400">
              <FolderGit2 className="size-3" /> {projects.length} Proyek
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Tambah, sunting, filter kategori, dan atur proyek showcase yang muncul di beranda dan halaman /projects.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {projects.length === 0 && (
            <button
              type="button"
              onClick={handleImportInitialData}
              disabled={isSeeding}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              {isSeeding ? (
                <>
                  <span className="size-3 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                  Mengimpor...
                </>
              ) : (
                <>
                  <RotateCcw className="size-3.5" /> Impor Template Awal
                </>
              )}
            </button>
          )}

          <a
            href="/projects"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <ExternalLink className="size-3.5" /> Lihat /projects
          </a>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            <Plus className="size-4" /> Tambah Proyek
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari berdasarkan judul, tag, atau deskripsi..."
            className="w-full rounded-lg border border-input bg-card pl-9 pr-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid / List */}
      {isLoading ? (
        <div className="flex h-72 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="size-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            <p className="text-sm text-muted-foreground">Memuat data proyek...</p>
          </div>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
          <FolderGit2 className="size-12 mx-auto text-muted-foreground/50 mb-3" />
          <h3 className="text-base font-semibold text-foreground">Belum ada proyek dalam database</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1 mb-5">
            Website saat ini menampilkan data template lokal. Mulai tambahkan proyek Anda sendiri atau impor data template ke database.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
            >
              <Plus className="size-3.5" /> Tambah Proyek Baru
            </button>
            <button
              onClick={handleImportInitialData}
              disabled={isSeeding}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-xs font-medium text-foreground hover:bg-muted"
            >
              <RotateCcw className="size-3.5" /> Impor Template Awal
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Thumbnail Cover */}
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="rounded-md bg-black/70 backdrop-blur-md px-2 py-0.5 text-[10px] font-medium text-white border border-white/10">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/90 backdrop-blur-md px-2 py-0.5 text-[10px] font-semibold text-white">
                      <Star className="size-2.5 fill-white" /> Featured
                    </span>
                  )}
                </div>

                <div className="absolute top-2.5 right-2.5">
                  <span className="rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-mono text-zinc-300">
                    {project.year || "2025"}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground text-sm line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {project.short_description || "Tidak ada deskripsi singkat."}
                  </p>
                </div>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 4).map((t, idx) => (
                      <span
                        key={idx}
                        className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="rounded bg-muted px-1 py-0.5 text-[10px] text-muted-foreground">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Footer Actions */}
                <div className="mt-auto pt-3 border-t border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-blue-600 transition-colors p-1"
                        title="Demo Live"
                      >
                        <Globe className="size-3.5" />
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors p-1"
                        title="Repository GitHub"
                      >
                        <GithubIcon className="size-3.5" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(project)}
                      className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      <Edit2 className="size-3" /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setProjectToDelete(project)}
                      className="inline-flex items-center rounded-md border border-red-200 dark:border-red-900/50 p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      title="Hapus Proyek"
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
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} className="max-w-4xl max-h-[92vh]">
        <ModalHeader>
          <ModalTitle>{editingProject ? "Sunting Proyek" : "Tambah Proyek Baru"}</ModalTitle>
          <ModalClose onClose={() => setIsModalOpen(false)} />
        </ModalHeader>

        <form onSubmit={handleSaveProject} className="flex flex-col flex-1 overflow-hidden">
          <ModalBody className="space-y-4">
            {/* Title & Slug */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Judul Proyek <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="Apex Logistics Management"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Slug URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="apex-logistics-system"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Category, Year, Featured */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Kategori</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full rounded-lg border border-input bg-background px-2.5 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Tahun Rilis</label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => setFormData((prev) => ({ ...prev, year: e.target.value }))}
                  placeholder="2025"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2 cursor-pointer h-9 px-2 rounded-lg border border-input bg-muted/20">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                    className="size-3.5 rounded text-blue-600 focus:ring-blue-600"
                  />
                  <span className="text-xs font-medium text-foreground flex items-center gap-1">
                    <Star className="size-3 text-amber-500 fill-amber-500" /> Featured
                  </span>
                </label>
              </div>
            </div>

            {/* Cover Image Upload */}
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Cover Image URL <span className="text-red-500">*</span>
              </label>

              {formData.image_url && (
                <div className="relative aspect-video w-full max-h-36 rounded-lg overflow-hidden border border-border mb-2 bg-muted">
                  <img src={formData.image_url} alt="Preview" className="size-full object-cover" />
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="url"
                  required
                  value={formData.image_url}
                  onChange={(e) => setFormData((prev) => ({ ...prev, image_url: e.target.value }))}
                  placeholder="https://images.unsplash.com/... atau upload"
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

            {/* Descriptions */}
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Deskripsi Singkat (Kartu)</label>
              <textarea
                rows={2}
                value={formData.short_description}
                onChange={(e) => setFormData((prev) => ({ ...prev, short_description: e.target.value }))}
                placeholder="Deskripsi ringkas yang tampil pada kartu proyek..."
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-foreground">
                  Deskripsi Lengkap & Studi Kasus (Tiptap Rich-Text Editor)
                </label>
                <span className="text-[11px] text-muted-foreground font-mono">
                  Mendukung formatting, screenshot, list fitur & arsitektur
                </span>
              </div>
              <ProjectRichEditor
                content={formData.full_description || ""}
                onChange={(html) => setFormData((prev) => ({ ...prev, full_description: html }))}
                placeholder="Tulis penjelasan arsitektur, tantangan teknis, fitur, dan sisipkan screenshot..."
                minHeight="260px"
              />
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Demo Live URL</label>
                <input
                  type="url"
                  value={formData.demo_url || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, demo_url: e.target.value }))}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">GitHub Repo URL</label>
                <input
                  type="url"
                  value={formData.github_url || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, github_url: e.target.value }))}
                  placeholder="https://github.com/..."
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Tags Badges Input */}
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Tech Stack & Tags</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {formData.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-xs font-medium text-foreground border border-border"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
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
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Contoh: Next.js, Hono, MySQL"
                  className="flex-1 rounded-lg border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80"
                >
                  Tambah Tag
                </button>
              </div>
            </div>

            {/* Metrics */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-foreground">Metrik Pencapaian Proyek</label>
                <button
                  type="button"
                  onClick={handleAddMetric}
                  className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  <Plus className="size-3" /> Tambah Metrik
                </button>
              </div>

              <div className="space-y-2">
                {formData.metrics?.map((m, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={m.label}
                      onChange={(e) => handleMetricChange(idx, "label", e.target.value)}
                      placeholder="Label (e.g. Daily Active Users)"
                      className="flex-1 rounded-md border border-input bg-background px-2.5 py-1 text-xs text-foreground"
                    />
                    <input
                      type="text"
                      value={m.value}
                      onChange={(e) => handleMetricChange(idx, "value", e.target.value)}
                      placeholder="Nilai (e.g. 5,000+)"
                      className="w-28 rounded-md border border-input bg-background px-2.5 py-1 text-xs text-foreground"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveMetric(idx)}
                      className="text-muted-foreground hover:text-red-500 p-1"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Points */}
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Poin Arsitektur & Rekayasa Teknis
              </label>
              <div className="space-y-1.5 mb-2">
                {formData.architecture_points?.map((pt, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-muted/40 rounded px-2.5 py-1 text-xs">
                    <span className="text-foreground text-[11px]">• {pt}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveArch(idx)}
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
                  value={newArchInput}
                  onChange={(e) => setNewArchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddArch();
                    }
                  }}
                  placeholder="Contoh: Role-Based Access Control dengan JWT & Hono"
                  className="flex-1 rounded-lg border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddArch}
                  className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80"
                >
                  Tambah Poin
                </button>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-lg border border-border bg-background px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {createMutation.isPending || updateMutation.isPending ? "Menyimpan..." : "Simpan Proyek"}
            </button>
          </ModalFooter>
        </form>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal open={!!projectToDelete} onClose={() => setProjectToDelete(null)} className="max-w-md">
        <ModalHeader>
          <ModalTitle className="text-red-600 flex items-center gap-2">
            <AlertTriangle className="size-5" /> Hapus Proyek
          </ModalTitle>
          <ModalClose onClose={() => setProjectToDelete(null)} />
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-foreground">
            Apakah Anda yakin ingin menghapus proyek{" "}
            <span className="font-semibold text-red-600">{projectToDelete?.title}</span>?
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Tindakan ini permanen dan data proyek akan dihapus dari database.
          </p>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            onClick={() => setProjectToDelete(null)}
            className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleDeleteConfirm}
            disabled={deleteMutation.isPending}
            className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
          >
            {deleteMutation.isPending ? "Menghapus..." : "Ya, Hapus"}
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

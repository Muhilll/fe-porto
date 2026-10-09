"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  useBlogs,
  useCreateBlog,
  useUpdateBlog,
  useDeleteBlog,
} from "@/features/portfolio/blog/hooks/use-blog";
import type { BackendBlog, CreateBlogPayload } from "@/features/portfolio/blog/types";
import { blogsData } from "@/data/blogs";
import { UploadService } from "@/features/portfolio/upload/upload-service";
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
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Upload,
  Calendar,
  Clock,
  RotateCcw,
  AlertTriangle,
  Sparkles,
  Eye,
  Search,
  CheckCircle2,
  X,
  Star,
  FileText,
  Code,
  Heading2,
  Heading3,
  Bold,
  List,
  ListOrdered,
  Quote,
} from "lucide-react";

const BLOG_CATEGORIES = [
  "Architecture",
  "Full-Stack",
  "Backend / API",
  "Frontend",
  "Database",
  "DevOps & Cloud",
  "Performance",
  "Security",
  "General",
];

const initialFormState: CreateBlogPayload = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image: "",
  published_at: "",
  read_time: "",
  category: "Architecture",
  tags: [],
  featured: false,
  is_published: true,
};

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function calculateReadingTime(content: string): string {
  if (!content) return "1 min read";
  const clean = content.replace(/<[^>]*>/g, " ").trim();
  const words = clean.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function formatTodayDate(): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());
}

export default function PortfolioBlogsManagementPage() {
  const { data: blogs = [], isLoading } = useBlogs({ all: true });
  const createMutation = useCreateBlog();
  const updateMutation = useUpdateBlog();
  const deleteMutation = useDeleteBlog();
  const notification = useNotification();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BackendBlog | null>(null);
  const [formData, setFormData] = useState<CreateBlogPayload>(initialFormState);
  const [newTagInput, setNewTagInput] = useState("");
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  // Upload State
  const [isUploading, setIsUploading] = useState(false);

  // Delete Confirm State
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  // Seed State
  const [isSeeding, setIsSeeding] = useState(false);

  // Compute Categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    blogs.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return Array.from(set);
  }, [blogs]);

  // Filtered Blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchSearch =
        !searchQuery ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        categoryFilter === "all" || blog.category === categoryFilter;

      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && blog.is_published) ||
        (statusFilter === "draft" && !blog.is_published);

      return matchSearch && matchCategory && matchStatus;
    });
  }, [blogs, searchQuery, categoryFilter, statusFilter]);

  // Open Modal for Create
  const handleOpenCreate = () => {
    setEditingBlog(null);
    setFormData({
      ...initialFormState,
      published_at: formatTodayDate(),
      read_time: "5 min read",
    });
    setActiveTab("write");
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEdit = (blog: BackendBlog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || "",
      content: blog.content,
      cover_image: blog.cover_image || "",
      published_at: blog.published_at || formatTodayDate(),
      read_time: blog.read_time || calculateReadingTime(blog.content),
      category: blog.category || "General",
      tags: blog.tags || [],
      featured: Boolean(blog.featured),
      is_published: blog.is_published !== undefined ? Boolean(blog.is_published) : true,
    });
    setActiveTab("write");
    setIsModalOpen(true);
  };

  // Title change with automatic slug update when creating
  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: !editingBlog ? generateSlug(val) : prev.slug,
    }));
  };

  // Content change with auto read-time calculation
  const handleContentChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      content: val,
      read_time: calculateReadingTime(val),
      excerpt: prev.excerpt ? prev.excerpt : val.slice(0, 160).replace(/\n/g, " ") + "...",
    }));
  };

  // Markdown Toolbar Inserter
  const insertMarkdownSnippet = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById("blog-content-textarea") as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end) || "text";

    const replacement = `${prefix}${selected}${suffix}`;
    const nextContent = text.substring(0, start) + replacement + text.substring(end);

    setFormData((prev) => ({
      ...prev,
      content: nextContent,
      read_time: calculateReadingTime(nextContent),
    }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 50);
  };

  // Handle Cover Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await UploadService.uploadImage(file);
      setFormData((prev) => ({ ...prev, cover_image: url }));
      notification.success({ title: "Cover Berhasil Diupload" });
    } catch (err: any) {
      notification.danger({ title: "Upload Gagal", message: err.message || "Gagal mengupload cover" });
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = "";
    }
  };


  // Tag Management
  const handleAddTag = () => {
    const trimmed = newTagInput.trim();
    if (!trimmed) return;
    if (!formData.tags?.includes(trimmed)) {
      setFormData((prev) => ({ ...prev, tags: [...(prev.tags || []), trimmed] }));
    }
    setNewTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((t) => t !== tagToRemove) || [],
    }));
  };

  // Quick Toggle Published
  const handleTogglePublished = async (blog: BackendBlog) => {
    try {
      await updateMutation.mutateAsync({
        id: blog.id,
        payload: { is_published: !blog.is_published },
      });
      notification.success({
        title: blog.is_published ? "Artikel Diarsipkan (Draft)" : "Artikel Diterbitkan",
      });
    } catch (err: any) {
      notification.danger({ title: "Gagal Update Status", message: err.message });
    }
  };

  // Quick Toggle Featured
  const handleToggleFeatured = async (blog: BackendBlog) => {
    try {
      await updateMutation.mutateAsync({
        id: blog.id,
        payload: { featured: !blog.featured },
      });
      notification.success({
        title: blog.featured ? "Dihapus dari Sorotan" : "Ditandai sebagai Artikel Pilihan",
      });
    } catch (err: any) {
      notification.danger({ title: "Gagal Update", message: err.message });
    }
  };

  // Submit Create or Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      notification.warning({ title: "Field Wajib Kosong", message: "Judul dan konten artikel wajib diisi" });
      return;
    }

    try {
      const payload: CreateBlogPayload = {
        ...formData,
        slug: formData.slug?.trim() || generateSlug(formData.title),
        read_time: formData.read_time || calculateReadingTime(formData.content),
        published_at: formData.published_at || formatTodayDate(),
      };

      if (editingBlog) {
        await updateMutation.mutateAsync({ id: editingBlog.id, payload });
        notification.success({ title: "Artikel Berhasil Diperbarui" });
      } else {
        await createMutation.mutateAsync(payload);
        notification.success({ title: "Artikel Baru Berhasil Dibuat" });
      }

      setIsModalOpen(false);
    } catch (err: any) {
      notification.danger({
        title: "Penyimpanan Gagal",
        message: err.response?.data?.message || err.message || "Terjadi kesalahan",
      });
    }
  };

  // Delete Article
  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
      notification.success({ title: "Artikel Berhasil Dihapus" });
      setDeleteConfirmId(null);
    } catch (err: any) {
      notification.danger({ title: "Gagal Menghapus", message: err.message });
    }
  };

  // Seed Static Blogs
  const handleSeedFromStatic = async () => {
    try {
      setIsSeeding(true);
      for (const item of blogsData) {
        await createMutation.mutateAsync({
          title: item.title,
          slug: item.slug,
          excerpt: item.excerpt,
          content: item.content,
          published_at: item.publishedAt,
          read_time: item.readTime,
          category: item.category,
          tags: item.tags,
          featured: Boolean(item.featured),
          is_published: true,
        });
      }
      notification.success({
        title: "Seeding Berhasil",
        message: `${blogsData.length} artikel bawaan telah disalin ke database`,
      });
    } catch (err: any) {
      notification.danger({ title: "Seeding Gagal", message: err.message });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-foreground text-background">
              <BookOpen className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Manajemen Artikel & Blog
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola publikasi tulisan teknis, catatan arsitektur, dan tutorial dengan editor Markdown.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {blogs.length === 0 && (
            <button
              type="button"
              onClick={handleSeedFromStatic}
              disabled={isSeeding}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border bg-background hover:bg-muted text-xs font-semibold text-foreground transition-colors disabled:opacity-50 cursor-pointer"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isSeeding ? "animate-spin" : ""}`} />
              <span>{isSeeding ? "Menyalin Data..." : "Seed dari Data Statis"}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Tulis Artikel Baru</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl border border-border/80 bg-background/80 space-y-1 shadow-sm">
          <span className="text-xs font-mono text-muted-foreground">Total Tulisan</span>
          <div className="text-2xl font-bold font-mono text-foreground">{blogs.length}</div>
        </div>
        <div className="p-4 rounded-2xl border border-border/80 bg-background/80 space-y-1 shadow-sm">
          <span className="text-xs font-mono text-muted-foreground">Diterbitkan</span>
          <div className="text-2xl font-bold font-mono text-emerald-500">
            {blogs.filter((b) => b.is_published).length}
          </div>
        </div>
        <div className="p-4 rounded-2xl border border-border/80 bg-background/80 space-y-1 shadow-sm">
          <span className="text-xs font-mono text-muted-foreground">Draft / Arsip</span>
          <div className="text-2xl font-bold font-mono text-amber-500">
            {blogs.filter((b) => !b.is_published).length}
          </div>
        </div>
        <div className="p-4 rounded-2xl border border-border/80 bg-background/80 space-y-1 shadow-sm">
          <span className="text-xs font-mono text-muted-foreground">Kategori Aktif</span>
          <div className="text-2xl font-bold font-mono text-foreground">{categories.length}</div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul, slug, atau kata kunci..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-border/80 bg-background text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter berdasarkan kategori"
            className="px-3 py-2 rounded-xl border border-border/80 bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
          >
            <option value="all">Semua Kategori</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter berdasarkan status publikasi"
            className="px-3 py-2 rounded-xl border border-border/80 bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
          >
            <option value="all">Semua Status</option>
            <option value="published">Diterbitkan</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Articles List Table */}
      <div className="rounded-2xl border border-border/80 bg-background overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-muted-foreground">
            Memuat daftar artikel...
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-muted-foreground mx-auto stroke-[1.5]" />
            <h3 className="text-base font-semibold text-foreground">Tidak Ada Artikel</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              {blogs.length === 0
                ? "Database artikel masih kosong. Mulai dengan membuat artikel baru atau salin dari data statis."
                : "Tidak ada artikel yang cocok dengan filter pencarian."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/60">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
              >
                {/* Left: Article Details */}
                <div className="space-y-2 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-full font-mono text-[11px] bg-muted border border-border/60 text-foreground font-medium">
                      {blog.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleTogglePublished(blog)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border transition-colors cursor-pointer ${
                        blog.is_published
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
                      }`}
                      title="Klik untuk ubah status"
                    >
                      {blog.is_published ? "● Published" : "○ Draft"}
                    </button>
                    {blog.featured && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-500">
                        <Star className="w-3 h-3 fill-amber-500" />
                        <span>Pilihan</span>
                      </span>
                    )}
                    <span className="text-muted-foreground flex items-center gap-1 font-mono text-[11px]">
                      <Calendar className="w-3 h-3" />
                      <span>{blog.published_at}</span>
                    </span>
                    <span className="text-muted-foreground flex items-center gap-1 font-mono text-[11px]">
                      <Clock className="w-3 h-3" />
                      <span>{blog.read_time}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-foreground leading-snug line-clamp-1">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-muted-foreground line-clamp-2 max-w-3xl leading-relaxed">
                    {blog.excerpt || blog.content.slice(0, 140)}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] font-mono text-muted-foreground">
                      /blog/{blog.slug}
                    </span>
                    {blog.tags?.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted/60 text-muted-foreground"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1.5 self-end md:self-center shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggleFeatured(blog)}
                    className={`p-2 rounded-xl border border-border/80 transition-colors cursor-pointer ${
                      blog.featured
                        ? "bg-amber-500/10 border-amber-500/40 text-amber-500"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                    title={blog.featured ? "Hapus dari Featured" : "Jadikan Featured"}
                  >
                    <Star className={`w-3.5 h-3.5 ${blog.featured ? "fill-amber-500" : ""}`} />
                  </button>

                  <Link
                    href={`/blog/${blog.slug}`}
                    target="_blank"
                    className="p-2 rounded-xl border border-border/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    title="Lihat di situs publik"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleOpenEdit(blog)}
                    className="p-2 rounded-xl border border-border/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    title="Edit artikel"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(blog.id)}
                    className="p-2 rounded-xl border border-border/80 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                    title="Hapus artikel"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} className="max-w-4xl max-h-[92vh]">
        <ModalHeader>
          <ModalTitle>{editingBlog ? "Sunting Artikel" : "Tambah Artikel Baru"}</ModalTitle>
          <ModalClose onClose={() => setIsModalOpen(false)} />
        </ModalHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <ModalBody className="space-y-4">
            {/* Title & Slug */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Judul Artikel <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Architecting High-Throughput APIs with Hono & Bun"
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
                  placeholder="architecting-high-throughput-apis"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Category, Published Date, Featured, Publish Status */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Kategori</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full rounded-lg border border-input bg-background px-2.5 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                >
                  {BLOG_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Tanggal Terbit</label>
                <input
                  type="text"
                  value={formData.published_at}
                  onChange={(e) => setFormData((prev) => ({ ...prev, published_at: e.target.value }))}
                  placeholder={formatTodayDate()}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2 cursor-pointer h-9 px-3 rounded-lg border border-input bg-muted/20">
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

              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2 cursor-pointer h-9 px-3 rounded-lg border border-input bg-muted/20">
                  <input
                    type="checkbox"
                    checked={formData.is_published}
                    onChange={(e) => setFormData((prev) => ({ ...prev, is_published: e.target.checked }))}
                    className="size-3.5 rounded text-blue-600 focus:ring-blue-600"
                  />
                  <span className="text-xs font-medium text-foreground flex items-center gap-1">
                    <CheckCircle2 className="size-3 text-emerald-500" /> Publikasikan
                  </span>
                </label>
              </div>
            </div>

            {/* Cover Image Upload */}
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Cover Image URL (Opsional)
              </label>

              {formData.cover_image && (
                <div className="relative aspect-video w-full max-h-36 rounded-lg overflow-hidden border border-border mb-2 bg-muted">
                  <img src={formData.cover_image} alt="Cover Preview" className="size-full object-cover" />
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="url"
                  value={formData.cover_image || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, cover_image: e.target.value }))}
                  placeholder="https://images.unsplash.com/... atau upload"
                  className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                />

                <label className="inline-flex items-center gap-1 rounded-lg border border-input bg-secondary px-3 py-2 text-xs font-medium text-secondary-foreground hover:bg-secondary/80 cursor-pointer">
                  <Upload className="size-3.5" />
                  <span>{isUploading ? "..." : "Upload"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Ringkasan Singkat (Excerpt)</label>
              <textarea
                rows={2}
                value={formData.excerpt}
                onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Ringkasan 1-2 kalimat untuk preview di kartu artikel..."
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
              />
            </div>

            {/* Content Editor */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-foreground">
                  Konten Artikel (Tiptap Rich-Text Editor) <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-muted-foreground font-mono">
                    {formData.content?.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length || 0} kata • {formData.read_time || "1 min read"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveTab(activeTab === "write" ? "preview" : "write")}
                    className="text-xs text-blue-600 hover:underline cursor-pointer font-medium"
                  >
                    {activeTab === "write" ? "Lihat Live Preview" : "Kembali ke Editor"}
                  </button>
                </div>
              </div>

              {activeTab === "write" ? (
                <ProjectRichEditor
                  content={formData.content}
                  onChange={(html) => handleContentChange(html)}
                  placeholder="Tulis artikel dengan heading, gambar screenshot, kutipan, dan kode sumber..."
                  minHeight="280px"
                />
              ) : (
                <div className="p-4 rounded-xl border border-border bg-background/50 space-y-4 max-h-[400px] overflow-y-auto">
                  <div className="border-b border-border pb-3">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-muted font-medium text-foreground">
                      {formData.category}
                    </span>
                    <h3 className="text-lg font-bold text-foreground mt-2">{formData.title || "Judul Artikel"}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{formData.excerpt}</p>
                  </div>
                  <div
                    className="prose prose-sm dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: formData.content }}
                  />
                </div>
              )}
            </div>

            {/* Tags Badges Input */}
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Tags Topik</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {formData.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-xs font-medium text-foreground border border-border"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-muted-foreground hover:text-red-500 cursor-pointer ml-0.5"
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
                  placeholder="Contoh: Next.js, Hono, Bun"
                  className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="rounded-lg border border-input bg-secondary px-3 py-2 text-xs font-medium text-secondary-foreground hover:bg-secondary/80 cursor-pointer"
                >
                  Tambah Tag
                </button>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-muted cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer transition-colors shadow-sm"
            >
              {createMutation.isPending || updateMutation.isPending
                ? "Menyimpan..."
                : editingBlog
                ? "Simpan Perubahan"
                : "Terbitkan Artikel"}
            </button>
          </ModalFooter>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={deleteConfirmId !== null} onClose={() => setDeleteConfirmId(null)} className="max-w-md">
        <div className="w-full p-6 space-y-4">
          <div className="flex items-center gap-3 text-destructive">
            <span className="p-2 rounded-xl bg-destructive/10">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <h3 className="text-base font-semibold text-foreground">Hapus Artikel Ini?</h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Artikel yang dihapus tidak dapat dipulihkan kembali. Pengunjung tidak akan dapat mengakses slug URL ini lagi.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setDeleteConfirmId(null)}
              className="px-4 py-2 rounded-xl border border-border bg-background hover:bg-muted text-xs font-semibold text-foreground transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
              disabled={deleteMutation.isPending}
              className="px-4 py-2 rounded-xl bg-destructive text-destructive-foreground text-xs font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity cursor-pointer"
            >
              {deleteMutation.isPending ? "Menghapus..." : "Ya, Hapus Artikel"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

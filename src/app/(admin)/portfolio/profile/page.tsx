"use client";

import React, { useState, useEffect } from "react";
import { useProfile, useUpdateProfile } from "@/features/portfolio/profile/hooks/use-profile";
import { UploadService } from "@/features/portfolio/upload/upload-service";
import { profileData } from "@/data/profile";
import { useNotification } from "@/components/ui/notification";
import {
  User,
  Sparkles,
  Camera,
  Upload,
  Link as LinkIcon,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  FileText,
  BarChart2,
  Globe,
} from "lucide-react";

export default function PortfolioProfilePage() {
  const { data: profileFromApi, isLoading, refetch } = useProfile();
  const updateMutation = useUpdateProfile();
  const notification = useNotification();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    short_name: "",
    role: "",
    roles_list: [] as string[],
    tagline: "",
    bio: "",
    location: "",
    availability: "available",
    availability_text: "",
    avatar_url: "",
    resume_url: "",
    email: "",
    github: "",
    linkedin: "",
    whatsapp: "",
    stats: [] as { label: string; value: string; description: string }[],
  });

  const [newRoleInput, setNewRoleInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "media" | "stats">("general");

  // Sync state when API data loads
  useEffect(() => {
    if (profileFromApi) {
      setFormData({
        name: profileFromApi.name || "",
        short_name: profileFromApi.short_name || "",
        role: profileFromApi.role || "",
        roles_list: profileFromApi.roles_list || [],
        tagline: profileFromApi.tagline || "",
        bio: profileFromApi.bio || "",
        location: profileFromApi.location || "",
        availability: profileFromApi.availability || "available",
        availability_text: profileFromApi.availability_text || "",
        avatar_url: profileFromApi.avatar_url || "",
        resume_url: profileFromApi.resume_url || "",
        email: profileFromApi.email || "",
        github: profileFromApi.github || "",
        linkedin: profileFromApi.linkedin || "",
        whatsapp: profileFromApi.whatsapp || "",
        stats: profileFromApi.stats || [],
      });
    } else if (!isLoading && !profileFromApi) {
      // Pre-fill from static data so form is not blank
      setFormData({
        name: profileData.name,
        short_name: profileData.shortName,
        role: profileData.role,
        roles_list: [...profileData.rolesList],
        tagline: profileData.tagline,
        bio: profileData.bio,
        location: profileData.location,
        availability: profileData.availability,
        availability_text: profileData.availabilityText,
        avatar_url: profileData.avatarUrl,
        resume_url: profileData.resumeUrl,
        email: profileData.email,
        github: profileData.github,
        linkedin: profileData.linkedin,
        whatsapp: profileData.whatsapp,
        stats: [...profileData.stats],
      });
    }
  }, [profileFromApi, isLoading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Roles list management
  const handleAddRole = () => {
    if (newRoleInput.trim()) {
      if (!formData.roles_list.includes(newRoleInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          roles_list: [...prev.roles_list, newRoleInput.trim()],
        }));
      }
      setNewRoleInput("");
    }
  };

  const handleRemoveRole = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      roles_list: prev.roles_list.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  // Stats management
  const handleStatChange = (index: number, field: "label" | "value" | "description", val: string) => {
    setFormData((prev) => {
      const nextStats = [...prev.stats];
      nextStats[index] = { ...nextStats[index], [field]: val };
      return { ...prev, stats: nextStats };
    });
  };

  const handleAddStat = () => {
    setFormData((prev) => ({
      ...prev,
      stats: [...prev.stats, { label: "Statistik Baru", value: "0+", description: "Keterangan singkat" }],
    }));
  };

  const handleRemoveStat = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      stats: prev.stats.filter((_, idx) => idx !== index),
    }));
  };

  // Image Upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const uploadedUrl = await UploadService.uploadImage(file);
      setFormData((prev) => ({ ...prev, avatar_url: uploadedUrl }));
      notification?.add?.({
        type: "success",
        title: "Foto Berhasil Diunggah",
        message: "Foto profil berhasil disimpan ke server Cloudinary / lokal.",
      });
    } catch (err: any) {
      console.error("Upload error:", err);
      notification?.add?.({
        type: "error",
        title: "Upload Gagal",
        message: err.message || "Gagal mengunggah foto. Pastikan ukuran file wajar.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Reset to static defaults
  const handleResetDefaults = () => {
    setFormData({
      name: profileData.name,
      short_name: profileData.shortName,
      role: profileData.role,
      roles_list: [...profileData.rolesList],
      tagline: profileData.tagline,
      bio: profileData.bio,
      location: profileData.location,
      availability: profileData.availability,
      availability_text: profileData.availabilityText,
      avatar_url: profileData.avatarUrl,
      resume_url: profileData.resumeUrl,
      email: profileData.email,
      github: profileData.github,
      linkedin: profileData.linkedin,
      whatsapp: profileData.whatsapp,
      stats: [...profileData.stats],
    });
    notification?.add?.({
      type: "info",
      title: "Data Direset",
      message: "Form diisi kembali dengan template data awal.",
    });
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateMutation.mutateAsync(formData);
      notification?.add?.({
        type: "success",
        title: "Profil Berhasil Disimpan",
        message: "Perubahan profil portofolio Anda telah disimpan ke database.",
      });
    } catch (err: any) {
      console.error("Update profile error:", err);
      notification?.add?.({
        type: "error",
        title: "Gagal Menyimpan",
        message: err.message || "Terjadi kesalahan saat menyimpan data profil.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-sm text-muted-foreground">Memuat data profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Kelola Profil & Hero</h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400">
              <Sparkles className="size-3" /> Portofolio
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Sesuaikan identitas, tagline, status ketersediaan kerja, dan statistik untuk landing page utama.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <RotateCcw className="size-3.5" /> Template Awal
          </button>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <ExternalLink className="size-3.5" /> Lihat Live
          </a>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={updateMutation.isPending}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {updateMutation.isPending ? (
              <>
                <span className="size-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="size-3.5" /> Simpan Perubahan
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-border/50">
        <button
          onClick={() => setActiveTab("general")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
            activeTab === "general"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <User className="size-4" /> Informasi Utama & Hero
        </button>
        <button
          onClick={() => setActiveTab("media")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
            activeTab === "media"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Camera className="size-4" /> Avatar, Media & Kontak
        </button>
        <button
          onClick={() => setActiveTab("stats")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
            activeTab === "stats"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <BarChart2 className="size-4" /> Highlight Statistik ({formData.stats.length})
        </button>
      </div>

      {/* Main Form Content */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {activeTab === "general" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Identity Card */}
            <div className="lg:col-span-2 rounded-xl border border-border/80 bg-card p-6 shadow-sm space-y-5">
              <div className="border-b border-border/50 pb-3">
                <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <User className="size-4 text-blue-600" /> Identitas Diri
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Informasi nama dan title peran yang tampil mencolok di baris pertama Hero.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Contoh: Muhammad Ilham"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Nama Panggilan (Short Name) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="short_name"
                    value={formData.short_name}
                    onChange={handleInputChange}
                    required
                    placeholder="Contoh: Muhil"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Primary Role / Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  placeholder="Contoh: Full-Stack Software Engineer"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              {/* Roles Typing Badges */}
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Dynamic Typing Roles (Efek Berganti di Hero)
                </label>
                <p className="text-xs text-muted-foreground mb-2">
                  Daftar teks yang berputar otomatis dalam animasi ketik di hero section.
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.roles_list.map((r, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-foreground border border-border"
                    >
                      {r}
                      <button
                        type="button"
                        onClick={() => handleRemoveRole(idx)}
                        className="text-muted-foreground hover:text-red-500"
                      >
                        <Trash2 className="size-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newRoleInput}
                    onChange={(e) => setNewRoleInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddRole();
                      }
                    }}
                    placeholder="Tambah title baru, contoh: System Architect"
                    className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  <button
                    type="button"
                    onClick={handleAddRole}
                    className="inline-flex items-center gap-1 rounded-lg bg-secondary px-3 py-2 text-xs font-medium text-secondary-foreground hover:bg-secondary/80"
                  >
                    <Plus className="size-3.5" /> Tambah
                  </button>
                </div>
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Tagline (Sub-Headline Hero)
                </label>
                <textarea
                  name="tagline"
                  rows={2}
                  value={formData.tagline}
                  onChange={handleInputChange}
                  placeholder="Ringkasan visi profesional Anda..."
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Bio Lengkap / Tentang Anda
                </label>
                <textarea
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Ceritakan latar belakang teknis, fokus keahlian, dan value yang Anda bawa..."
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Availability & Location Card */}
            <div className="rounded-xl border border-border/80 bg-card p-6 shadow-sm space-y-5 h-fit">
              <div className="border-b border-border/50 pb-3">
                <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Briefcase className="size-4 text-blue-600" /> Ketersediaan Kerja
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Badge status ketersediaan di navbar dan hero badge.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Status Availability
                </label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  <option value="available">🟢 Available for Work / Hire</option>
                  <option value="open_to_offers">🟡 Open to Discussion / Offers</option>
                  <option value="busy">🔴 Busy / Fully Booked</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Teks Keterangan Availability
                </label>
                <input
                  type="text"
                  name="availability_text"
                  value={formData.availability_text}
                  onChange={handleInputChange}
                  placeholder="Contoh: Available for full-time roles & projects"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Lokasi / Zona Waktu
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Indonesia (UTC+7) · Remote"
                    className="w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 p-3 text-xs text-blue-800 dark:text-blue-300">
                <p className="font-semibold mb-1">Status Live Preview</p>
                <p className="text-[11px] leading-relaxed">
                  Status ini langsung mempengaruhi radar hijau/kuning di header website publik Anda.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "media" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Avatar & Resume Card */}
            <div className="rounded-xl border border-border/80 bg-card p-6 shadow-sm space-y-5">
              <div className="border-b border-border/50 pb-3">
                <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Camera className="size-4 text-blue-600" /> Foto Profil (Avatar)
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Unggah foto ke Cloudinary atau tempel tautan langsung.
                </p>
              </div>

              <div className="flex flex-col items-center gap-4 py-2">
                <div className="relative size-32 rounded-full border-4 border-blue-500/20 overflow-hidden shadow-inner bg-muted">
                  {formData.avatar_url ? (
                    <img
                      src={formData.avatar_url}
                      alt={formData.name || "Avatar"}
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-muted-foreground">
                      <User className="size-12 opacity-50" />
                    </div>
                  )}

                  {isUploading && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="size-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    </div>
                  )}
                </div>

                <div className="w-full">
                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-muted/30 px-4 py-3 text-xs font-medium text-foreground hover:bg-muted/70 transition-colors">
                    <Upload className="size-4 text-blue-600" />
                    <span>{isUploading ? "Mengunggah gambar..." : "Pilih File Foto (PNG, JPG, WebP)"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[10px] text-muted-foreground text-center mt-1">
                    Mendukung upload otomatis via Cloudinary / penyimpanan lokal server.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Atau URL Foto Langsung
                </label>
                <input
                  type="url"
                  name="avatar_url"
                  value={formData.avatar_url}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Link Resume / CV
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    name="resume_url"
                    value={formData.resume_url}
                    onChange={handleInputChange}
                    placeholder="https://drive.google.com/... atau /resume.pdf"
                    className="w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* Social Links & Contact */}
            <div className="lg:col-span-2 rounded-xl border border-border/80 bg-card p-6 shadow-sm space-y-5">
              <div className="border-b border-border/50 pb-3">
                <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Globe className="size-4 text-blue-600" /> Kontak & Sosial Media
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Tautan profil pengembang yang akan diarahkan oleh tombol kontak di website.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Email Kontak
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ilham.kece002@gmail.com"
                      className="w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Nomor WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                    <input
                      type="text"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      placeholder="https://wa.me/6281244795544"
                      className="w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    URL Profil GitHub
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    placeholder="https://github.com/Muhilll"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    URL LinkedIn
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "stats" && (
          <div className="rounded-xl border border-border/80 bg-card p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/50 pb-3">
              <div>
                <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <BarChart2 className="size-4 text-blue-600" /> Highlight Metrik & Statistik
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Angka-angka pencapaian yang tampil di Hero Section dan halaman About (misal: Years Exp, Projects, Client Sat).
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddStat}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-3 py-1.5 text-xs font-medium hover:bg-blue-100 transition-colors"
              >
                <Plus className="size-3.5" /> Tambah Metrik
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-border bg-background p-4 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-muted-foreground">
                      Metrik #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveStat(idx)}
                      className="text-muted-foreground hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-foreground mb-1">
                        Angka / Nilai
                      </label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => handleStatChange(idx, "value", e.target.value)}
                        placeholder="Contoh: 4+ atau 28+"
                        className="w-full rounded-md border border-input bg-card px-2.5 py-1.5 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-foreground mb-1">
                        Label Metrik
                      </label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => handleStatChange(idx, "label", e.target.value)}
                        placeholder="Contoh: Years Experience"
                        className="w-full rounded-md border border-input bg-card px-2.5 py-1.5 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-foreground mb-1">
                      Deskripsi Singkat
                    </label>
                    <input
                      type="text"
                      value={stat.description}
                      onChange={(e) => handleStatChange(idx, "description", e.target.value)}
                      placeholder="Contoh: Building scalable web applications..."
                      className="w-full rounded-md border border-input bg-card px-2.5 py-1.5 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/50">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="rounded-lg border border-border bg-background px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            Reset Template
          </button>
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-blue-700 disabled:opacity-50"
          >
            {updateMutation.isPending ? (
              <>
                <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="size-4" /> Simpan Semua Perubahan
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

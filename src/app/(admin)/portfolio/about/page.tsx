"use client";

import React, { useState } from "react";
import {
  useExperiences,
  useCreateExperience,
  useUpdateExperience,
  useDeleteExperience,
  useEducations,
  useCreateEducation,
  useUpdateEducation,
  useDeleteEducation,
  useSkills,
  useCreateSkillCategory,
  useUpdateSkillCategory,
  useDeleteSkillCategory,
} from "@/features/portfolio/about/hooks/use-about";
import type {
  BackendExperience,
  CreateExperiencePayload,
  BackendEducation,
  CreateEducationPayload,
  BackendSkillCategory,
  CreateSkillCategoryPayload,
  SkillItem,
} from "@/features/portfolio/about/types";
import { experienceData, educationData, skillCategoriesData } from "@/data/about";
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
  Briefcase,
  GraduationCap,
  Code2,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  MapPin,
  Calendar,
  Building,
  RotateCcw,
  AlertTriangle,
  Layers,
  Sparkles,
} from "lucide-react";

export default function PortfolioAboutManagementPage() {
  const [activeTab, setActiveTab] = useState<"experiences" | "educations" | "skills">("experiences");
  const notification = useNotification();

  /* ─── Queries & Mutations ───────────────────────────────── */
  const { data: experiences = [], isLoading: isLoadingExp } = useExperiences();
  const createExpMutation = useCreateExperience();
  const updateExpMutation = useUpdateExperience();
  const deleteExpMutation = useDeleteExperience();

  const { data: educations = [], isLoading: isLoadingEdu } = useEducations();
  const createEduMutation = useCreateEducation();
  const updateEduMutation = useUpdateEducation();
  const deleteEduMutation = useDeleteEducation();

  const { data: skills = [], isLoading: isLoadingSkills } = useSkills();
  const createSkillMutation = useCreateSkillCategory();
  const updateSkillMutation = useUpdateSkillCategory();
  const deleteSkillMutation = useDeleteSkillCategory();

  /* ─── Experience Modal State ────────────────────────────── */
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<BackendExperience | null>(null);
  const [expFormData, setExpFormData] = useState<CreateExperiencePayload>({
    role: "",
    company: "",
    period: "",
    location: "",
    company_url: "",
    description: "",
    skills: [],
    sort_order: 0,
  });
  const [newExpSkillInput, setNewExpSkillInput] = useState("");

  /* ─── Education Modal State ─────────────────────────────── */
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<BackendEducation | null>(null);
  const [eduFormData, setEduFormData] = useState<CreateEducationPayload>({
    degree: "",
    institution: "",
    period: "",
    description: "",
    sort_order: 0,
  });

  /* ─── Skill Category Modal State ────────────────────────── */
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<BackendSkillCategory | null>(null);
  const [skillFormData, setSkillFormData] = useState<CreateSkillCategoryPayload>({
    category: "",
    skills: [],
    sort_order: 0,
  });
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState("Advanced");

  /* ─── Delete Confirmation Modal State ───────────────────── */
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "experience" | "education" | "skill";
    id: number;
    title: string;
  } | null>(null);

  /* ─────────────────────────────────────────────────────────────
   * EXPERIENCE HANDLERS
   * ───────────────────────────────────────────────────────────── */
  const handleOpenCreateExp = () => {
    setEditingExp(null);
    setExpFormData({
      role: "",
      company: "",
      period: "",
      location: "",
      company_url: "",
      description: "",
      skills: [],
      sort_order: 0,
    });
    setNewExpSkillInput("");
    setIsExpModalOpen(true);
  };

  const handleOpenEditExp = (item: BackendExperience) => {
    setEditingExp(item);
    setExpFormData({
      role: item.role,
      company: item.company,
      period: item.period,
      location: item.location || "",
      company_url: item.company_url || "",
      description: item.description || "",
      skills: item.skills ? [...item.skills] : [],
      sort_order: item.sort_order || 0,
    });
    setNewExpSkillInput("");
    setIsExpModalOpen(true);
  };

  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingExp) {
        await updateExpMutation.mutateAsync({ id: editingExp.id, payload: expFormData });
        notification?.add?.({ type: "success", title: "Berhasil Diperbarui", message: "Pengalaman kerja berhasil diupdate." });
      } else {
        await createExpMutation.mutateAsync(expFormData);
        notification?.add?.({ type: "success", title: "Berhasil Ditambahkan", message: "Pengalaman kerja baru berhasil disimpan." });
      }
      setIsExpModalOpen(false);
    } catch (err: any) {
      notification?.add?.({ type: "error", title: "Gagal Menyimpan", message: err.message || "Terjadi kesalahan." });
    }
  };

  const handleImportInitialExperiences = async () => {
    if (!confirm("Impor semua template pengalaman kerja ke database?")) return;
    try {
      for (const item of experienceData) {
        await createExpMutation.mutateAsync({
          role: item.role,
          company: item.company,
          period: item.period,
          location: item.location,
          company_url: item.companyUrl || null,
          description: item.description,
          skills: item.skills,
          sort_order: 0,
        });
      }
      notification?.add?.({ type: "success", title: "Berhasil Diimpor", message: "Template pengalaman kerja berhasil disimpan." });
    } catch (err: any) {
      notification?.add?.({ type: "error", title: "Gagal Impor", message: err.message });
    }
  };

  /* ─────────────────────────────────────────────────────────────
   * EDUCATION HANDLERS
   * ───────────────────────────────────────────────────────────── */
  const handleOpenCreateEdu = () => {
    setEditingEdu(null);
    setEduFormData({
      degree: "",
      institution: "",
      period: "",
      description: "",
      sort_order: 0,
    });
    setIsEduModalOpen(true);
  };

  const handleOpenEditEdu = (item: BackendEducation) => {
    setEditingEdu(item);
    setEduFormData({
      degree: item.degree,
      institution: item.institution,
      period: item.period,
      description: item.description || "",
      sort_order: item.sort_order || 0,
    });
    setIsEduModalOpen(true);
  };

  const handleSaveEdu = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingEdu) {
        await updateEduMutation.mutateAsync({ id: editingEdu.id, payload: eduFormData });
        notification?.add?.({ type: "success", title: "Berhasil Diperbarui", message: "Pendidikan berhasil diupdate." });
      } else {
        await createEduMutation.mutateAsync(eduFormData);
        notification?.add?.({ type: "success", title: "Berhasil Ditambahkan", message: "Pendidikan berhasil disimpan." });
      }
      setIsEduModalOpen(false);
    } catch (err: any) {
      notification?.add?.({ type: "error", title: "Gagal Menyimpan", message: err.message || "Terjadi kesalahan." });
    }
  };

  const handleImportInitialEducations = async () => {
    if (!confirm("Impor template pendidikan awal ke database?")) return;
    try {
      for (const item of educationData) {
        await createEduMutation.mutateAsync({
          degree: item.degree,
          institution: item.institution,
          period: item.period,
          description: item.description,
          sort_order: 0,
        });
      }
      notification?.add?.({ type: "success", title: "Berhasil Diimpor", message: "Template pendidikan berhasil disimpan." });
    } catch (err: any) {
      notification?.add?.({ type: "error", title: "Gagal Impor", message: err.message });
    }
  };

  /* ─────────────────────────────────────────────────────────────
   * SKILLS HANDLERS
   * ───────────────────────────────────────────────────────────── */
  const handleOpenCreateSkill = () => {
    setEditingSkill(null);
    setSkillFormData({
      category: "",
      skills: [],
      sort_order: 0,
    });
    setNewSkillName("");
    setNewSkillLevel("Advanced");
    setIsSkillModalOpen(true);
  };

  const handleOpenEditSkill = (item: BackendSkillCategory) => {
    setEditingSkill(item);
    setSkillFormData({
      category: item.category,
      skills: item.skills ? [...item.skills] : [],
      sort_order: item.sort_order || 0,
    });
    setNewSkillName("");
    setNewSkillLevel("Advanced");
    setIsSkillModalOpen(true);
  };

  const handleAddSkillItem = () => {
    if (newSkillName.trim()) {
      setSkillFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, { name: newSkillName.trim(), level: newSkillLevel }],
      }));
      setNewSkillName("");
    }
  };

  const handleRemoveSkillItem = (index: number) => {
    setSkillFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, idx) => idx !== index),
    }));
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await updateSkillMutation.mutateAsync({ id: editingSkill.id, payload: skillFormData });
        notification?.add?.({ type: "success", title: "Berhasil Diperbarui", message: "Kategori skill berhasil diupdate." });
      } else {
        await createSkillMutation.mutateAsync(skillFormData);
        notification?.add?.({ type: "success", title: "Berhasil Ditambahkan", message: "Kategori skill baru berhasil disimpan." });
      }
      setIsSkillModalOpen(false);
    } catch (err: any) {
      notification?.add?.({ type: "error", title: "Gagal Menyimpan", message: err.message || "Terjadi kesalahan." });
    }
  };

  const handleImportInitialSkills = async () => {
    if (!confirm("Impor semua 4 kategori skill awal ke database?")) return;
    try {
      for (const item of skillCategoriesData) {
        await createSkillMutation.mutateAsync({
          category: item.category,
          skills: item.skills,
          sort_order: 0,
        });
      }
      notification?.add?.({ type: "success", title: "Berhasil Diimpor", message: "Template skill berhasil disimpan." });
    } catch (err: any) {
      notification?.add?.({ type: "error", title: "Gagal Impor", message: err.message });
    }
  };

  /* ─────────────────────────────────────────────────────────────
   * DELETE HANDLER
   * ───────────────────────────────────────────────────────────── */
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      if (deleteTarget.type === "experience") {
        await deleteExpMutation.mutateAsync(deleteTarget.id);
      } else if (deleteTarget.type === "education") {
        await deleteEduMutation.mutateAsync(deleteTarget.id);
      } else if (deleteTarget.type === "skill") {
        await deleteSkillMutation.mutateAsync(deleteTarget.id);
      }

      notification?.add?.({
        type: "success",
        title: "Berhasil Dihapus",
        message: `${deleteTarget.title} berhasil dihapus dari database.`,
      });
      setDeleteTarget(null);
    } catch (err: any) {
      notification?.add?.({
        type: "error",
        title: "Gagal Menghapus",
        message: err.message || "Gagal menghapus data.",
      });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Pengalaman, Pendidikan & Skills
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400">
              <Sparkles className="size-3" /> Halaman /about
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola jejak karir profesional, riwayat pendidikan, dan daftar keahlian teknologi secara modular.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <a
            href="/about"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <ExternalLink className="size-3.5" /> Lihat /about
          </a>

          {activeTab === "experiences" && (
            <button
              type="button"
              onClick={handleOpenCreateExp}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              <Plus className="size-4" /> Tambah Pengalaman
            </button>
          )}

          {activeTab === "educations" && (
            <button
              type="button"
              onClick={handleOpenCreateEdu}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              <Plus className="size-4" /> Tambah Pendidikan
            </button>
          )}

          {activeTab === "skills" && (
            <button
              type="button"
              onClick={handleOpenCreateSkill}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              <Plus className="size-4" /> Tambah Kategori Skill
            </button>
          )}
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-border/50">
        <button
          onClick={() => setActiveTab("experiences")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
            activeTab === "experiences"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Briefcase className="size-4" /> Pengalaman Kerja ({experiences.length})
        </button>

        <button
          onClick={() => setActiveTab("educations")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
            activeTab === "educations"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <GraduationCap className="size-4" /> Riwayat Pendidikan ({educations.length})
        </button>

        <button
          onClick={() => setActiveTab("skills")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
            activeTab === "skills"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Code2 className="size-4" /> Kategori & Skills ({skills.length})
        </button>
      </div>

      {/* TAB 1: EXPERIENCES */}
      {activeTab === "experiences" && (
        <div className="space-y-4">
          {isLoadingExp ? (
            <div className="flex h-64 items-center justify-center">
              <span className="size-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            </div>
          ) : experiences.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-card/50 p-10 text-center space-y-3">
              <Briefcase className="size-10 mx-auto text-muted-foreground/50" />
              <h3 className="text-sm font-semibold text-foreground">Belum ada data pengalaman kerja di database</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Website publik saat ini menampilkan data template. Anda dapat mulai menambahkan pengalaman baru atau mengimpor template awal.
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={handleOpenCreateExp}
                  className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
                >
                  Tambah Pengalaman
                </button>
                <button
                  onClick={handleImportInitialExperiences}
                  className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
                >
                  <RotateCcw className="size-3 inline mr-1" /> Impor Template Awal
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="rounded-xl border border-border bg-card p-5 space-y-3 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground text-sm leading-tight">{exp.role}</h3>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-0.5">{exp.company}</p>
                    </div>
                    <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-mono text-muted-foreground whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>

                  {exp.location && (
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <MapPin className="size-3" />
                      <span>{exp.location}</span>
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed flex-1">
                    {exp.description}
                  </p>

                  {/* Skills tags */}
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {exp.skills.map((s, idx) => (
                        <span key={idx} className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-foreground">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="pt-3 border-t border-border/50 flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => handleOpenEditExp(exp)}
                      className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted"
                    >
                      <Edit2 className="size-3" /> Edit
                    </button>
                    <button
                      onClick={() => setDeleteTarget({ type: "experience", id: exp.id, title: `${exp.role} (${exp.company})` })}
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
        </div>
      )}

      {/* TAB 2: EDUCATIONS */}
      {activeTab === "educations" && (
        <div className="space-y-4">
          {isLoadingEdu ? (
            <div className="flex h-64 items-center justify-center">
              <span className="size-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            </div>
          ) : educations.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-card/50 p-10 text-center space-y-3">
              <GraduationCap className="size-10 mx-auto text-muted-foreground/50" />
              <h3 className="text-sm font-semibold text-foreground">Belum ada data riwayat pendidikan di database</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Website publik saat ini menampilkan data template. Anda dapat mulai menambahkan pendidikan baru atau mengimpor template awal.
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={handleOpenCreateEdu}
                  className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
                >
                  Tambah Pendidikan
                </button>
                <button
                  onClick={handleImportInitialEducations}
                  className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
                >
                  <RotateCcw className="size-3 inline mr-1" /> Impor Template Awal
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {educations.map((edu) => (
                <div
                  key={edu.id}
                  className="rounded-xl border border-border bg-card p-5 space-y-3 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground text-sm leading-tight">{edu.degree}</h3>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-0.5">{edu.institution}</p>
                    </div>
                    <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-mono text-muted-foreground whitespace-nowrap">
                      {edu.period}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                    {edu.description || "Tidak ada rincian tambahan."}
                  </p>

                  <div className="pt-3 border-t border-border/50 flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => handleOpenEditEdu(edu)}
                      className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted"
                    >
                      <Edit2 className="size-3" /> Edit
                    </button>
                    <button
                      onClick={() => setDeleteTarget({ type: "education", id: edu.id, title: `${edu.degree}` })}
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
        </div>
      )}

      {/* TAB 3: SKILLS */}
      {activeTab === "skills" && (
        <div className="space-y-4">
          {isLoadingSkills ? (
            <div className="flex h-64 items-center justify-center">
              <span className="size-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            </div>
          ) : skills.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-card/50 p-10 text-center space-y-3">
              <Code2 className="size-10 mx-auto text-muted-foreground/50" />
              <h3 className="text-sm font-semibold text-foreground">Belum ada kategori skill di database</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Website publik saat ini menampilkan 4 kategori skill template. Anda dapat mulai menambahkan kategori sendiri atau mengimpor template awal.
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={handleOpenCreateSkill}
                  className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
                >
                  Tambah Kategori Skill
                </button>
                <button
                  onClick={handleImportInitialSkills}
                  className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
                >
                  <RotateCcw className="size-3 inline mr-1" /> Impor Template Awal
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {skills.map((category) => (
                <div
                  key={category.id}
                  className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Layers className="size-4 text-blue-600" />
                      <h3 className="font-semibold text-foreground text-sm">{category.category}</h3>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground font-mono">
                        {category.skills?.length || 0} items
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditSkill(category)}
                        className="rounded-md border border-border p-1 text-foreground hover:bg-muted"
                        title="Edit Kategori"
                      >
                        <Edit2 className="size-3" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget({ type: "skill", id: category.id, title: category.category })}
                        className="rounded-md border border-red-200 dark:border-red-900/50 p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                        title="Hapus Kategori"
                      >
                        <Trash2 className="size-3" />
                      </button>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                    {category.skills?.map((sk, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-xs"
                      >
                        <span className="font-medium text-foreground">{sk.name}</span>
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-mono font-medium ${
                            sk.level === "Expert"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : sk.level === "Advanced"
                              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {sk.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* EXPERIENCE MODAL */}
      <Modal open={isExpModalOpen} onClose={() => setIsExpModalOpen(false)} className="max-w-lg">
        <ModalHeader>
          <ModalTitle>{editingExp ? "Sunting Pengalaman" : "Tambah Pengalaman Kerja"}</ModalTitle>
          <ModalClose onClose={() => setIsExpModalOpen(false)} />
        </ModalHeader>
        <form onSubmit={handleSaveExp} className="flex flex-col flex-1 overflow-hidden">
          <ModalBody className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Jabatan / Role <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={expFormData.role}
                  onChange={(e) => setExpFormData((prev) => ({ ...prev, role: e.target.value }))}
                  placeholder="Senior Full-Stack Engineer"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Perusahaan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={expFormData.company}
                  onChange={(e) => setExpFormData((prev) => ({ ...prev, company: e.target.value }))}
                  placeholder="Apex Digital Solutions"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Periode Waktu <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={expFormData.period}
                  onChange={(e) => setExpFormData((prev) => ({ ...prev, period: e.target.value }))}
                  placeholder="2023 — Present"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Lokasi</label>
                <input
                  type="text"
                  value={expFormData.location || ""}
                  onChange={(e) => setExpFormData((prev) => ({ ...prev, location: e.target.value }))}
                  placeholder="Remote / Jakarta"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">URL Website Perusahaan</label>
              <input
                type="url"
                value={expFormData.company_url || ""}
                onChange={(e) => setExpFormData((prev) => ({ ...prev, company_url: e.target.value }))}
                placeholder="https://..."
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Rincian Tanggung Jawab & Pencapaian</label>
              <textarea
                rows={3}
                value={expFormData.description}
                onChange={(e) => setExpFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Penjelasan arsitektur yang dibangun, perbaikan performa, dan skala sistem..."
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Tech Stack Terkait</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {expFormData.skills?.map((sk, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-xs font-medium text-foreground border border-border"
                  >
                    {sk}
                    <button
                      type="button"
                      onClick={() =>
                        setExpFormData((prev) => ({
                          ...prev,
                          skills: prev.skills?.filter((_, i) => i !== idx),
                        }))
                      }
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
                  value={newExpSkillInput}
                  onChange={(e) => setNewExpSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (newExpSkillInput.trim()) {
                        setExpFormData((prev) => ({
                          ...prev,
                          skills: [...(prev.skills || []), newExpSkillInput.trim()],
                        }));
                        setNewExpSkillInput("");
                      }
                    }
                  }}
                  placeholder="Tambah tag, contoh: Next.js"
                  className="flex-1 rounded-lg border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newExpSkillInput.trim()) {
                      setExpFormData((prev) => ({
                        ...prev,
                        skills: [...(prev.skills || []), newExpSkillInput.trim()],
                      }));
                      setNewExpSkillInput("");
                    }
                  }}
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
              onClick={() => setIsExpModalOpen(false)}
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={createExpMutation.isPending || updateExpMutation.isPending}
              className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
            >
              {createExpMutation.isPending || updateExpMutation.isPending ? "Menyimpan..." : "Simpan Pengalaman"}
            </button>
          </ModalFooter>
        </form>
      </Modal>

      {/* EDUCATION MODAL */}
      <Modal open={isEduModalOpen} onClose={() => setIsEduModalOpen(false)} className="max-w-md">
        <ModalHeader>
          <ModalTitle>{editingEdu ? "Sunting Pendidikan" : "Tambah Riwayat Pendidikan"}</ModalTitle>
          <ModalClose onClose={() => setIsEduModalOpen(false)} />
        </ModalHeader>
        <form onSubmit={handleSaveEdu} className="flex flex-col flex-1 overflow-hidden">
          <ModalBody className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Gelar / Jurusan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={eduFormData.degree}
                onChange={(e) => setEduFormData((prev) => ({ ...prev, degree: e.target.value }))}
                placeholder="Bachelor of Computer Science (B.Comp.Sc.)"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Institusi / Universitas <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={eduFormData.institution}
                onChange={(e) => setEduFormData((prev) => ({ ...prev, institution: e.target.value }))}
                placeholder="Universitas ..."
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Tahun / Periode <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={eduFormData.period}
                onChange={(e) => setEduFormData((prev) => ({ ...prev, period: e.target.value }))}
                placeholder="2017 — 2021"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Keterangan / Fokus Studi</label>
              <textarea
                rows={3}
                value={eduFormData.description}
                onChange={(e) => setEduFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Fokus pada Software Engineering, Basis Data, dan Arsitektur Komputer..."
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              onClick={() => setIsEduModalOpen(false)}
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={createEduMutation.isPending || updateEduMutation.isPending}
              className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
            >
              {createEduMutation.isPending || updateEduMutation.isPending ? "Menyimpan..." : "Simpan Pendidikan"}
            </button>
          </ModalFooter>
        </form>
      </Modal>

      {/* SKILL CATEGORY MODAL */}
      <Modal open={isSkillModalOpen} onClose={() => setIsSkillModalOpen(false)} className="max-w-lg">
        <ModalHeader>
          <ModalTitle>{editingSkill ? "Sunting Kategori Skill" : "Tambah Kategori Skill Baru"}</ModalTitle>
          <ModalClose onClose={() => setIsSkillModalOpen(false)} />
        </ModalHeader>
        <form onSubmit={handleSaveSkill} className="flex flex-col flex-1 overflow-hidden">
          <ModalBody className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Nama Kategori <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={skillFormData.category}
                onChange={(e) => setSkillFormData((prev) => ({ ...prev, category: e.target.value }))}
                placeholder="Contoh: Frontend Architecture, Backend & Systems"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
              />
            </div>

            {/* Skill Items List */}
            <div>
              <label className="block text-xs font-medium text-foreground mb-1.5">
                Daftar Skill dalam Kategori Ini
              </label>

              <div className="space-y-1.5 mb-3 max-h-48 overflow-y-auto pr-1">
                {skillFormData.skills.map((sk, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-1.5 text-xs border border-border/50">
                    <span className="font-medium text-foreground">{sk.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-mono text-muted-foreground">{sk.level}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkillItem(idx)}
                        className="text-muted-foreground hover:text-red-500"
                      >
                        <Trash2 className="size-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSkillItem();
                    }
                  }}
                  placeholder="Nama skill, contoh: React 19 / Next.js 15"
                  className="flex-1 rounded-lg border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                />
                <select
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(e.target.value)}
                  className="rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs text-foreground focus:border-blue-600 focus:outline-none"
                >
                  <option value="Expert">Expert</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Proficient">Proficient</option>
                </select>
                <button
                  type="button"
                  onClick={handleAddSkillItem}
                  className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80"
                >
                  Tambah
                </button>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              onClick={() => setIsSkillModalOpen(false)}
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={createSkillMutation.isPending || updateSkillMutation.isPending}
              className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
            >
              {createSkillMutation.isPending || updateSkillMutation.isPending ? "Menyimpan..." : "Simpan Kategori"}
            </button>
          </ModalFooter>
        </form>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} className="max-w-sm">
        <ModalHeader>
          <ModalTitle className="text-red-600 flex items-center gap-2">
            <AlertTriangle className="size-5" /> Konfirmasi Hapus
          </ModalTitle>
          <ModalClose onClose={() => setDeleteTarget(null)} />
        </ModalHeader>
        <ModalBody>
          <p className="text-xs text-foreground">
            Apakah Anda yakin ingin menghapus data <span className="font-semibold text-red-600">{deleteTarget?.title}</span>?
          </p>
          <p className="text-[11px] text-muted-foreground mt-2">
            Tindakan ini tidak dapat dibatalkan dan akan terhapus permanen dari database.
          </p>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            onClick={() => setDeleteTarget(null)}
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

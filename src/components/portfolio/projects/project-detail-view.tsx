"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  CheckCircle2,
  Layers,
  Calendar,
  Share2,
  Check,
  Tag,
  Star,
  Activity,
  FolderGit2,
} from "lucide-react";
import { GithubIcon } from "@/components/portfolio/shared/icons";
import { FadeIn } from "@/components/portfolio/shared/motion-wrapper";
import { useProject, useProjects } from "@/features/portfolio/project/hooks/use-project";
import { getNormalizedProjects, normalizeProject } from "@/features/portfolio/adapters";
import { projectsData } from "@/data/projects";
import type { ProjectItem } from "@/types/portfolio";

interface ProjectDetailViewProps {
  slugOrId: string;
}

export function ProjectDetailView({ slugOrId }: ProjectDetailViewProps) {
  const [copied, setCopied] = useState(false);

  // Fetch project from API
  const { data: apiProject, isLoading: isProjectLoading } = useProject(slugOrId);
  const { data: apiProjectsList } = useProjects();

  const allProjects = getNormalizedProjects(apiProjectsList);

  // Determine current project (API first, then fallback to static projectsData)
  const project: ProjectItem | undefined = apiProject
    ? normalizeProject(apiProject)
    : allProjects.find((p) => p.slug === slugOrId || p.id === slugOrId) ||
      projectsData.find((p) => p.slug === slugOrId || p.id === slugOrId);

  // Other related projects for the bottom section
  const relatedProjects = allProjects
    .filter((p) => p.id !== project?.id && p.slug !== project?.slug)
    .slice(0, 2);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Check if fullDescription is HTML
  const isHtmlContent = project?.fullDescription && /<[a-z][\s\S]*>/i.test(project.fullDescription);

  if (isProjectLoading && !project) {
    return (
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-8 max-w-4xl mx-auto">
          <div className="h-6 w-36 bg-muted rounded-full" />
          <div className="h-12 w-3/4 bg-muted rounded-2xl" />
          <div className="h-4 w-1/2 bg-muted rounded-lg" />
          <div className="aspect-[16/9] w-full bg-muted rounded-3xl" />
          <div className="space-y-4">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
            <div className="h-4 w-4/6 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="py-24 max-w-4xl mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-muted/60 border border-border flex items-center justify-center mx-auto text-muted-foreground">
          <FolderGit2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Proyek Tidak Ditemukan</h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Proyek dengan identifier &ldquo;{slugOrId}&rdquo; tidak dapat ditemukan atau telah diperbarui.
          </p>
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-foreground text-background hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog Proyek</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation Breadcrumb & Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Kembali ke Katalog Proyek</span>
          </Link>

          {/* Breadcrumbs */}
          <nav aria-label="breadcrumb" className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-foreground font-semibold truncate max-w-[220px]">{project.title}</span>
          </nav>
        </div>

        {/* Hero Header Area (Full Horizontal Width) */}
        <FadeIn>
          <header className="space-y-6 w-full">
            {/* Meta Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-foreground text-background">
                {project.category}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-muted/80 text-muted-foreground border border-border/60">
                <Calendar className="w-3.5 h-3.5" />
                <span>Rilis {project.year}</span>
              </span>
              {project.featured && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>Featured Case Study</span>
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.12]">
              {project.title}
            </h1>

            {/* Short Description Lead */}
            {project.shortDescription && (
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-4xl">
                {project.shortDescription}
              </p>
            )}

            {/* Action Buttons Row (Full Width spanning) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-foreground text-background hover:opacity-90 transition-opacity shadow-sm"
                >
                  <span>Visit Live Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold border border-border/80 bg-background hover:bg-muted text-foreground transition-colors shadow-xs"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
              )}

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono border border-border/80 bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors ml-auto cursor-pointer"
                title="Bagikan Tautan Proyek"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? "Tersalin!" : "Bagikan"}</span>
              </button>
            </div>
          </header>
        </FadeIn>

        {/* Featured Cover Media (Full Horizontal Width) */}
        <FadeIn delay={0.1}>
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-border/80 bg-muted shadow-xl">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </FadeIn>

        {/* Key Specifications & Metadata Highlights Grid (Full Width) */}
        <FadeIn delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Tech Stack & Tools */}
            {project.tags && project.tags.length > 0 && (
              <div className="p-6 sm:p-7 rounded-3xl border border-border/80 bg-background/90 shadow-sm space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
                    <Tag className="w-4 h-4 text-foreground" />
                    <span>Tech Stack & Tools</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-muted/60 text-foreground border border-border/60 hover:border-foreground/40 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-3 text-[11px] font-mono text-muted-foreground border-t border-border/40">
                  {project.tags.length} teknologi & pustaka utama
                </div>
              </div>
            )}

            {/* Card 2: Key Architecture Points */}
            {project.architecturePoints && project.architecturePoints.length > 0 && (
              <div className="p-6 sm:p-7 rounded-3xl border border-border/80 bg-background/90 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Key Architecture Points</span>
                </div>
                <ul className="space-y-2.5">
                  {project.architecturePoints.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-xs text-foreground/90 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Card 3: Project Actions & Metrics */}
            <div className="p-6 sm:p-7 rounded-3xl border border-border/80 bg-background/90 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
                  <Activity className="w-4 h-4 text-foreground" />
                  <span>Aksi & Tautan Proyek</span>
                </div>

                {/* Metrics display if present */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="p-3 rounded-2xl bg-muted/40 border border-border/60 space-y-0.5"
                      >
                        <div className="text-[10px] font-mono text-muted-foreground truncate">{m.label}</div>
                        <div className="text-sm font-bold font-mono text-foreground">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-2.5">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-foreground text-background hover:opacity-90 transition-opacity shadow-xs"
                    >
                      <span>Kunjungi Demo Langsung</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border border-border bg-background hover:bg-muted text-foreground transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>Lihat Source Code</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="pt-3 text-[11px] font-mono text-muted-foreground flex items-center justify-between border-t border-border/40">
                <span>Kategori: {project.category}</span>
                <span>Tahun: {project.year}</span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Main Case Study Article (Full Horizontal Canvas) */}
        <FadeIn delay={0.2}>
          <article className="w-full p-8 sm:p-12 lg:p-16 rounded-3xl border border-border/80 bg-background/90 shadow-sm space-y-10">
            {/* Header bar of Case Study */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/60">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-muted/80 text-foreground border border-border/60">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">Studi Kasus & Detail Implementasi</h2>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">Dokumentasi teknis, arsitektur, dan ringkasan implementasi sistem</p>
                </div>
              </div>

              {/* Quick Jump Action Chips */}
              <div className="flex items-center gap-2">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-foreground text-background hover:opacity-90 transition-opacity"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-border bg-background hover:bg-muted text-foreground transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Repo</span>
                  </a>
                )}
              </div>
            </div>

            {/* Rich Content Renderer (Full Width) */}
            {isHtmlContent ? (
              <div
                className="prose prose-base sm:prose-lg lg:prose-xl dark:prose-invert max-w-none 
                  prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                  prose-h2:text-2xl sm:prose-h2:3xl prose-h2:border-b prose-h2:border-border/60 prose-h2:pb-3 prose-h2:mt-10
                  prose-h3:text-xl sm:prose-h3:2xl prose-h3:mt-8
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-a:text-foreground prose-a:underline hover:prose-a:opacity-80 prose-a:font-medium
                  prose-blockquote:border-l-4 prose-blockquote:border-foreground prose-blockquote:bg-muted/40 prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-foreground/90
                  prose-code:font-mono prose-code:text-foreground prose-code:bg-muted/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-xs sm:prose-code:text-sm
                  prose-pre:bg-[#181825] prose-pre:border prose-pre:border-border/80 prose-pre:p-6 prose-pre:rounded-2xl prose-pre:overflow-x-auto
                  prose-img:rounded-2xl prose-img:border prose-img:border-border/80 prose-img:shadow-lg prose-img:mx-auto prose-img:my-10
                  prose-hr:border-border/60 prose-hr:my-10
                  prose-ul:list-disc prose-ul:list-inside prose-ul:text-muted-foreground
                  prose-ol:list-decimal prose-ol:list-inside prose-ol:text-muted-foreground
                  leading-relaxed text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: project.fullDescription }}
              />
            ) : (
              <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                {project.fullDescription || project.shortDescription || "Tidak ada rincian tambahan untuk proyek ini."}
              </div>
            )}

            {/* Bottom Footer Actions */}
            <div className="pt-8 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-mono text-muted-foreground">
                Studi Kasus Proyek · {project.category} ({project.year})
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-mono border border-border/80 bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? "Tautan Tersalin!" : "Bagikan"}</span>
                </button>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-medium border border-border/80 bg-muted/40 hover:bg-muted text-foreground transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Semua Proyek</span>
                </Link>
              </div>
            </div>
          </article>
        </FadeIn>


        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <div className="pt-12 border-t border-border/60 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-foreground">Proyek Rekayasa Lainnya</h3>
                <p className="text-xs text-muted-foreground font-mono mt-1">
                  Karya dan studi kasus pengembangan software lainnya yang terpilih.
                </p>
              </div>
              <Link
                href="/projects"
                className="text-xs font-semibold text-foreground hover:underline inline-flex items-center gap-1"
              >
                <span>Lihat Semua</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/projects/${rel.slug}`}
                  className="group flex flex-col rounded-3xl border border-border/80 bg-background/90 overflow-hidden hover:border-foreground/40 transition-colors shadow-sm"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-background/95 backdrop-blur-md text-foreground border border-border/60">
                        {rel.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h4 className="text-lg font-semibold text-foreground group-hover:underline underline-offset-4">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {rel.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

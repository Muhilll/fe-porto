"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Layers, BookOpen } from "lucide-react";
import { GithubIcon } from "@/components/portfolio/shared/icons";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "@/data/projects";
import { useProjects } from "@/features/portfolio/project/hooks/use-project";
import { getNormalizedProjects } from "@/features/portfolio/adapters";
import { SectionHeader } from "@/components/portfolio/shared/section-header";

const categories = ["All", "Full-Stack", "Frontend", "Backend / API", "System / Tools"] as const;

export function ProjectsShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const { data: apiProjects } = useProjects();
  const allProjects = getNormalizedProjects(apiProjects);

  const filteredProjects =
    activeCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  return (
    <section className="py-16 sm:py-24 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="space-y-8">
          <SectionHeader
            badge="Portfolio Catalog"
            title="Projects & Engineering Case Studies"
            description="Production web applications, microservices, developer tools, and analytics dashboards built with modern toolchains."
          />

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {categories.map((category) => {
              const count =
                category === "All"
                  ? allProjects.length
                  : allProjects.filter((p) => p.category === category).length;

              const isActive = activeCategory === category;

              return (
                <motion.button
                  key={category}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-4 py-2 rounded-full text-xs font-mono font-medium transition-colors ${
                    isActive
                      ? "text-background font-semibold"
                      : "text-muted-foreground hover:text-foreground bg-muted/40 hover:bg-muted"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span>{category}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono transition-colors ${
                        isActive
                          ? "bg-background/25 text-background"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {count}
                    </span>
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="activeProjectCategory"
                      className="absolute inset-0 rounded-full bg-foreground z-0 shadow-sm"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid with Smooth popLayout Physics */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                layout="position"
                key={project.id}
                id={project.slug}
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 12 }}
                transition={{
                  layout: { type: "spring", stiffness: 320, damping: 28 },
                  opacity: { duration: 0.22, ease: "easeOut" },
                  scale: { duration: 0.22, ease: "easeOut" },
                }}
                className="group flex flex-col rounded-3xl border border-border/80 bg-background/90 overflow-hidden hover:border-foreground/40 transition-colors shadow-sm hover:shadow-md"
              >
                {/* Media Container */}
                <Link
                  href={`/projects/${project.slug}`}
                  className="relative aspect-[16/9] w-full overflow-hidden bg-muted block"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-background/95 backdrop-blur-md text-foreground border border-border/60">
                      {project.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-background/80 backdrop-blur-md text-muted-foreground border border-border/60">
                      {project.year}
                    </span>
                  </div>
                </Link>

                {/* Details Container */}
                <div className="p-8 flex flex-col flex-1 space-y-6">
                  <div className="space-y-2">
                    <Link href={`/projects/${project.slug}`} className="block">
                      <h3 className="text-xl font-semibold text-foreground group-hover:underline underline-offset-4">
                        {project.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {project.shortDescription || project.fullDescription}
                    </p>
                  </div>

                  {/* Architecture & Highlights */}
                  {project.architecturePoints && project.architecturePoints.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Key Architecture Points</span>
                      </div>
                      <ul className="space-y-1.5">
                        {project.architecturePoints.map((point) => (
                          <li key={point} className="flex items-start gap-2 text-xs text-foreground/90">
                            <CheckCircle2 className="w-3.5 h-3.5 text-foreground mt-0.5 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Metrics Badge Row */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-muted/30 border border-border/60">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="space-y-0.5">
                          <div className="text-[10px] font-mono text-muted-foreground">{m.label}</div>
                          <div className="text-xs font-bold font-mono text-foreground">{m.value}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-muted/60 text-muted-foreground border border-border/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 mt-auto">
                    {/* Live Demo & Source Code */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-foreground text-background hover:opacity-90 transition-opacity shadow-xs"
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border border-border/80 bg-background hover:bg-muted text-foreground transition-colors shadow-xs"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Source Code</span>
                        </a>
                      )}
                    </div>

                    {/* Detail Proyek Link */}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:underline underline-offset-4 group/detail ml-auto"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-muted-foreground group-hover/detail:text-foreground transition-colors" />
                      <span>Detail Proyek</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/detail:translate-x-0.5 group-hover/detail:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="col-span-full py-20 text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-muted/60 flex items-center justify-center mx-auto text-muted-foreground">
                  <Layers className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-semibold text-foreground">No projects found</h4>
                  <p className="text-xs text-muted-foreground font-mono max-w-sm mx-auto">
                    No engineering works cataloged under &ldquo;{activeCategory}&rdquo; at this moment.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveCategory("All")}
                  className="px-4 py-2 rounded-full text-xs font-semibold bg-foreground text-background hover:opacity-90 transition-opacity"
                >
                  Reset Filter
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

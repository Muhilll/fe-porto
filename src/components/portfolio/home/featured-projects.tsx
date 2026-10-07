"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/portfolio/shared/icons";
import { useProjects } from "@/features/portfolio/project/hooks/use-project";
import { getNormalizedProjects } from "@/features/portfolio/adapters";
import { SectionHeader } from "@/components/portfolio/shared/section-header";
import { FadeIn } from "@/components/portfolio/shared/motion-wrapper";

export function FeaturedProjects() {
  const { data: apiProjects } = useProjects();
  const allProjects = getNormalizedProjects(apiProjects);

  const featured = allProjects.filter((p) => p.featured);
  const displayProjects = (featured.length > 0 ? featured : allProjects).slice(0, 3);

  return (
    <section id="projects" className="py-20 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <SectionHeader
            badge="Selected Works"
            title="Featured Projects"
            description="A curated selection of web systems, high-throughput applications, and digital tools built with clean architecture."
          />
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:opacity-80 transition-opacity self-start sm:self-end group"
          >
            <span>View All Projects ({allProjects.length})</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayProjects.map((project, idx) => (
            <FadeIn key={project.id} delay={idx * 0.1} className="h-full">
              <div className="group flex flex-col h-full rounded-2xl border border-border/80 bg-background/80 hover:border-foreground/40 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md">
                {/* Image Media Preview */}
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-background/90 backdrop-blur-md text-foreground border border-border/60">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 space-y-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="text-xs font-mono text-muted-foreground">{project.year}</div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:underline underline-offset-4">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted/60 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono text-muted-foreground">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                    <Link
                      href={`/projects#${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:opacity-80"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg border border-border/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="View source code on GitHub"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg border border-border/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Visit live demo"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

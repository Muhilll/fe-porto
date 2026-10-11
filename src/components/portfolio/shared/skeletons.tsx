import React from "react";

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-muted/70 rounded-lg ${className}`}
    />
  );
}

/**
 * Skeleton for Project Cards (Used in FeaturedProjects & ProjectsShowcase)
 */
export function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col h-full rounded-2xl border border-border/80 bg-background/80 overflow-hidden shadow-sm">
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] bg-muted/60 animate-pulse">
        <div className="absolute top-3 left-3 w-20 h-6 bg-muted rounded-full" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 space-y-4">
        <div className="space-y-2 flex-1">
          <Skeleton className="w-12 h-3" />
          <Skeleton className="w-3/4 h-5" />
          <Skeleton className="w-full h-3.5 mt-2" />
          <Skeleton className="w-5/6 h-3.5" />
        </div>

        {/* Tag pills */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          <Skeleton className="w-14 h-5 rounded" />
          <Skeleton className="w-16 h-5 rounded" />
          <Skeleton className="w-12 h-5 rounded" />
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-border/60 flex items-center justify-between">
          <Skeleton className="w-28 h-4" />
          <div className="flex items-center gap-2">
            <Skeleton className="w-20 h-7 rounded-full" />
            <Skeleton className="w-24 h-7 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectsGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <ProjectCardSkeleton key={idx} />
      ))}
    </div>
  );
}

/**
 * Skeleton for Blog Cards (Used in BlogList)
 */
export function BlogCardSkeleton() {
  return (
    <div className="flex flex-col h-full rounded-2xl border border-border/80 bg-background/80 overflow-hidden shadow-sm">
      <div className="aspect-[16/10] bg-muted/60 animate-pulse" />
      <div className="p-6 flex flex-col flex-1 space-y-3.5">
        <div className="flex items-center gap-3">
          <Skeleton className="w-16 h-5 rounded-full" />
          <Skeleton className="w-20 h-3" />
        </div>
        <Skeleton className="w-4/5 h-5" />
        <Skeleton className="w-full h-3.5" />
        <Skeleton className="w-3/4 h-3.5" />
        <div className="pt-3 border-t border-border/60 flex items-center justify-between">
          <Skeleton className="w-16 h-3" />
          <Skeleton className="w-24 h-4" />
        </div>
      </div>
    </div>
  );
}

export function BlogsGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <BlogCardSkeleton key={idx} />
      ))}
    </div>
  );
}

/**
 * Skeleton for Services List
 */
export function ServicesGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col justify-between p-8 rounded-3xl border border-border/80 bg-background/90 space-y-8"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="w-10 h-10 rounded-xl" />
              <Skeleton className="w-8 h-4" />
            </div>
            <Skeleton className="w-2/3 h-6" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-5/6 h-4" />
          </div>

          <div className="space-y-3 pt-6 border-t border-border/60">
            <Skeleton className="w-24 h-3" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-4/5 h-4" />
            <Skeleton className="w-3/4 h-4" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton for Experience & Education Timeline
 */
export function TimelineSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Experience */}
      <div className="lg:col-span-7 space-y-8">
        <div className="flex items-center gap-2.5 pb-2 border-b border-border/60">
          <Skeleton className="w-5 h-5 rounded" />
          <Skeleton className="w-48 h-5" />
        </div>
        <div className="space-y-6 relative pl-6 border-l border-border/80">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 rounded-2xl border border-border/80 bg-background/90 space-y-3">
              <div className="flex justify-between items-center">
                <Skeleton className="w-28 h-5 rounded-full" />
                <Skeleton className="w-20 h-4" />
              </div>
              <Skeleton className="w-1/2 h-5" />
              <Skeleton className="w-1/3 h-4" />
              <Skeleton className="w-full h-3.5" />
              <Skeleton className="w-4/5 h-3.5" />
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="lg:col-span-5 space-y-8">
        <div className="flex items-center gap-2.5 pb-2 border-b border-border/60">
          <Skeleton className="w-5 h-5 rounded" />
          <Skeleton className="w-40 h-5" />
        </div>
        <div className="space-y-6 relative pl-6 border-l border-border/80">
          {[1, 2].map((i) => (
            <div key={i} className="p-6 rounded-2xl border border-border/80 bg-background/90 space-y-3">
              <Skeleton className="w-24 h-5 rounded-full" />
              <Skeleton className="w-2/3 h-5" />
              <Skeleton className="w-1/2 h-4" />
              <Skeleton className="w-full h-3.5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for Skills Grid
 */
export function SkillsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="p-6 rounded-2xl border border-border/80 bg-background/90 space-y-4">
          <div className="space-y-1 pb-3 border-b border-border/60">
            <Skeleton className="w-16 h-3" />
            <Skeleton className="w-28 h-5" />
          </div>
          <div className="space-y-2.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex justify-between items-center py-1">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-12 h-3.5 rounded" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton for Certificates Grid
 */
export function CertificatesGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-3xl border border-border/80 bg-background/90 overflow-hidden shadow-sm"
        >
          <div className="aspect-[16/10] bg-muted/60 animate-pulse" />
          <div className="p-6 space-y-3">
            <div className="flex justify-between items-center">
              <Skeleton className="w-20 h-3.5" />
              <Skeleton className="w-16 h-4" />
            </div>
            <Skeleton className="w-4/5 h-5" />
            <Skeleton className="w-1/2 h-3.5" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton for GitHub Contribution Stats Cards
 */
export function ContributionStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div
          key={idx}
          className="p-6 rounded-2xl border border-border/80 bg-background/90 space-y-2.5 shadow-sm"
        >
          <div className="flex items-center justify-between text-muted-foreground">
            <Skeleton className="w-20 h-3.5" />
            <Skeleton className="w-4 h-4 rounded" />
          </div>
          <Skeleton className="w-28 h-8 rounded-lg" />
          <Skeleton className="w-24 h-3" />
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton for Contribution Calendar Heatmap
 */
export function ContributionCalendarSkeleton() {
  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-background/90 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Skeleton className="w-5 h-5 rounded" />
          <div className="space-y-1.5">
            <Skeleton className="w-56 h-5" />
            <Skeleton className="w-40 h-3" />
          </div>
        </div>
        <Skeleton className="w-32 h-5 hidden sm:block" />
      </div>

      {/* Heatmap Grid Loading Block */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[720px] space-y-3">
          <div className="flex justify-between pl-8 pr-2">
            {Array.from({ length: 12 }).map((_, idx) => (
              <Skeleton key={idx} className="w-6 h-3" />
            ))}
          </div>
          <div className="flex gap-1">
            <div className="flex flex-col justify-between py-1 w-7 pr-1">
              <Skeleton className="w-5 h-2.5" />
              <Skeleton className="w-5 h-2.5" />
              <Skeleton className="w-5 h-2.5" />
            </div>
            <div className="flex-1 grid grid-flow-col grid-rows-7 gap-1 h-[105px]">
              {Array.from({ length: 52 * 7 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-full h-full rounded-[2px] bg-muted/40 animate-pulse"
                  style={{ animationDelay: `${(idx % 15) * 60}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-border/60 text-xs">
        <Skeleton className="w-40 h-3" />
        <div className="flex items-center gap-2">
          <Skeleton className="w-8 h-3" />
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Skeleton key={idx} className="w-3 h-3 rounded-[2px]" />
            ))}
          </div>
          <Skeleton className="w-8 h-3" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for Languages Chart
 */
export function LanguagesChartSkeleton() {
  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-background/90 space-y-6 shadow-sm h-full">
      <div className="flex items-center gap-2.5">
        <Skeleton className="w-5 h-5 rounded" />
        <div className="space-y-1">
          <Skeleton className="w-32 h-5" />
          <Skeleton className="w-44 h-3" />
        </div>
      </div>

      <Skeleton className="h-3 w-full rounded-full" />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-muted/40">
            <div className="flex items-center gap-2">
              <Skeleton className="w-2.5 h-2.5 rounded-full" />
              <Skeleton className="w-14 h-3" />
            </div>
            <Skeleton className="w-8 h-3" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton for Pinned Repositories
 */
export function PinnedReposSkeleton({ count = 2 }: { count?: number }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Skeleton className="w-5 h-5 rounded" />
          <Skeleton className="w-48 h-5" />
        </div>
        <Skeleton className="w-28 h-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl border border-border/80 bg-background/90 space-y-4 shadow-sm h-full"
          >
            <div className="flex items-start justify-between gap-3">
              <Skeleton className="w-36 h-5" />
              <Skeleton className="w-4 h-4 rounded" />
            </div>
            <div className="space-y-2">
              <Skeleton className="w-full h-3.5" />
              <Skeleton className="w-3/4 h-3.5" />
            </div>
            <div className="pt-3 border-t border-border/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="w-2.5 h-2.5 rounded-full" />
                <Skeleton className="w-16 h-3" />
              </div>
              <Skeleton className="w-12 h-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton for Full Contribution Container
 */
export function ContributionContainerSkeleton() {
  return (
    <div className="space-y-10">
      {/* Live GitHub Status Card Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border border-border/80 bg-background/80 shadow-sm">
        <div className="flex items-center gap-3.5">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Skeleton className="w-28 h-5" />
              <Skeleton className="w-20 h-5 rounded-full" />
            </div>
            <Skeleton className="w-56 h-3" />
          </div>
        </div>
        <Skeleton className="w-36 h-8 rounded-full" />
      </div>

      {/* 4 Stats */}
      <ContributionStatsSkeleton />

      {/* 52-Week Matrix */}
      <ContributionCalendarSkeleton />

      {/* Languages & Pinned Repos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <LanguagesChartSkeleton />
        </div>
        <div className="lg:col-span-7">
          <PinnedReposSkeleton count={2} />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for Home Contribution Preview
 */
export function HomeContributionPreviewSkeleton() {
  return (
    <div className="space-y-6">
      <ContributionStatsSkeleton />
      <div className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-muted/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded" />
            <Skeleton className="w-36 h-5" />
          </div>
          <Skeleton className="w-64 h-3.5" />
        </div>
        <Skeleton className="w-32 h-8 rounded-full" />
      </div>
    </div>
  );
}

/**
 * Skeleton for Hero Section (Home page)
 */
export function HeroSkeleton() {
  return (
    <section id="hero" className="relative overflow-hidden py-16 sm:py-24 md:py-32 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-8">
          {/* Status Badge */}
          <Skeleton className="w-56 h-7 rounded-full" />

          {/* Heading & Role */}
          <div className="space-y-4">
            <Skeleton className="w-3/4 sm:w-2/3 h-12 sm:h-14 rounded-2xl" />
            <Skeleton className="w-1/2 h-8 sm:h-10 rounded-xl" />
          </div>

          {/* Bio text */}
          <div className="space-y-2.5 max-w-2xl">
            <Skeleton className="w-full h-4 rounded" />
            <Skeleton className="w-5/6 h-4 rounded" />
            <Skeleton className="w-4/6 h-4 rounded" />
          </div>

          {/* Action buttons & Socials */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Skeleton className="w-36 h-11 rounded-full" />
            <Skeleton className="w-36 h-11 rounded-full" />
            <div className="flex items-center gap-2 pl-2">
              <Skeleton className="w-9 h-9 rounded-full" />
              <Skeleton className="w-9 h-9 rounded-full" />
              <Skeleton className="w-9 h-9 rounded-full" />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="pt-8 border-t border-border/60 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="space-y-2">
                <Skeleton className="w-16 h-8 rounded-lg" />
                <Skeleton className="w-24 h-3 rounded" />
                <Skeleton className="w-28 h-2.5 rounded hidden sm:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Skeleton for About Hero Section
 */
export function AboutHeroSkeleton() {
  return (
    <section id="about-hero" className="py-12 sm:py-20 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Avatar Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-64 sm:w-80 aspect-square rounded-2xl overflow-hidden border border-border/80 bg-muted/60 animate-pulse">
              <div className="absolute -bottom-4 right-4 w-36 h-7 rounded-full bg-muted border border-border/80" />
            </div>
          </div>

          {/* Right Bio & Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <Skeleton className="w-24 h-6 rounded-full" />
              <Skeleton className="w-3/4 h-10 sm:h-12 rounded-xl" />
              <div className="space-y-2 max-w-2xl">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-4/5 h-4" />
              </div>

              {/* Chips */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Skeleton className="w-36 h-7 rounded-full" />
                <Skeleton className="w-40 h-7 rounded-full" />
                <Skeleton className="w-44 h-7 rounded-full" />
              </div>

              {/* Actions */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Skeleton className="w-44 h-9 rounded-full" />
                <Skeleton className="w-36 h-9 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Skeleton for Contact Panel
 */
export function ContactPanelSkeleton() {
  return (
    <div className="p-8 sm:p-10 rounded-3xl border border-border/80 bg-background/90 space-y-8 shadow-sm h-full flex flex-col justify-between">
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="w-36 h-3 rounded" />
          <Skeleton className="w-44 h-7 rounded-lg" />
          <Skeleton className="w-full h-4 rounded" />
        </div>

        {/* Communication Channels */}
        <div className="space-y-3">
          <div className="p-4 rounded-2xl border border-border/60 bg-muted/30 flex items-center gap-4">
            <Skeleton className="w-10 h-10 rounded-xl" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="w-20 h-2.5" />
              <Skeleton className="w-40 h-4" />
            </div>
          </div>
          <div className="p-4 rounded-2xl border border-border/60 bg-muted/30 flex items-center gap-4">
            <Skeleton className="w-10 h-10 rounded-xl" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="w-24 h-2.5" />
              <Skeleton className="w-36 h-4" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-2.5 pt-4 border-t border-border/60">
          <Skeleton className="w-48 h-3.5" />
          <Skeleton className="w-56 h-3.5" />
        </div>
      </div>

      <div className="pt-6 border-t border-border/60 space-y-4">
        <Skeleton className="w-36 h-3.5" />
        <div className="flex gap-2">
          <Skeleton className="flex-1 h-9 rounded-xl" />
          <Skeleton className="flex-1 h-9 rounded-xl" />
        </div>
      </div>
    </div>
  );
}


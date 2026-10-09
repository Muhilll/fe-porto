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

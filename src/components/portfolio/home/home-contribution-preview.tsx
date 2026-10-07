"use client";

import Link from "next/link";
import { GitCommit, GitPullRequest, Star, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/portfolio/shared/icons";
import { contributionData } from "@/data/contributions";
import { SectionHeader } from "@/components/portfolio/shared/section-header";
import { FadeIn } from "@/components/portfolio/shared/motion-wrapper";

export function HomeContributionPreview() {
  return (
    <section className="py-20 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <SectionHeader
            badge="Open Source & Git Activity"
            title="Consistent Contributions"
            description="Regular open-source engagement, clean repository commits, and active code maintenance."
          />
          <Link
            href="/contribution"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:opacity-80 transition-opacity self-start sm:self-end group"
          >
            <span>View Full Contribution Graph</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Highlight Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <FadeIn delay={0.05}>
            <div className="p-6 rounded-2xl border border-border/80 bg-background/80 space-y-2">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-mono">Total Commits</span>
                <GitCommit className="w-4 h-4 text-foreground" />
              </div>
              <div className="text-3xl font-bold font-mono text-foreground">
                {contributionData.totalContributionsLastYear}
              </div>
              <p className="text-xs text-muted-foreground">In the past 12 months</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="p-6 rounded-2xl border border-border/80 bg-background/80 space-y-2">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-mono">Current Streak</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="text-3xl font-bold font-mono text-foreground">
                {contributionData.currentStreakDays} Days
              </div>
              <p className="text-xs text-muted-foreground">Longest streak: {contributionData.longestStreakDays} days</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="p-6 rounded-2xl border border-border/80 bg-background/80 space-y-2">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-mono">Pull Requests</span>
                <GitPullRequest className="w-4 h-4 text-foreground" />
              </div>
              <div className="text-3xl font-bold font-mono text-foreground">
                {contributionData.totalPullRequests}+
              </div>
              <p className="text-xs text-muted-foreground">Reviewed & merged</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="p-6 rounded-2xl border border-border/80 bg-background/80 space-y-2">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-mono">Repository Stars</span>
                <Star className="w-4 h-4 text-foreground" />
              </div>
              <div className="text-3xl font-bold font-mono text-foreground">
                {contributionData.totalStarsEarned}
              </div>
              <p className="text-xs text-muted-foreground">Community recognition</p>
            </div>
          </FadeIn>
        </div>

        {/* Featured Repo Snippet */}
        <div className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-muted/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <GithubIcon className="w-4 h-4 text-foreground" />
              <h4 className="font-semibold text-base text-foreground font-mono">
                {contributionData.repositories[0].name}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {contributionData.repositories[0].description}
            </p>
          </div>
          <a
            href={contributionData.repositories[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border border-border/80 bg-background hover:bg-muted text-foreground transition-colors shrink-0"
          >
            <span>Star on GitHub</span>
            <Star className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

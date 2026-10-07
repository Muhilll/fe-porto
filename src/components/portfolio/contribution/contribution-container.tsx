"use client";

import { useGithubContributions } from "@/hooks/use-github-contributions";
import { GithubStats } from "@/components/portfolio/contribution/github-stats";
import { ContributionCalendar } from "@/components/portfolio/contribution/contribution-calendar";
import { LanguagesChart } from "@/components/portfolio/contribution/languages-chart";
import { PinnedRepos } from "@/components/portfolio/contribution/pinned-repos";
import { GithubIcon } from "@/components/portfolio/shared/icons";
import { ArrowUpRight } from "lucide-react";

export function ContributionContainer() {
  const { data, weeks, isLive, isLoading } = useGithubContributions();

  return (
    <div className="space-y-10">
      {/* Live GitHub Status Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border border-border/80 bg-background/80 dark:bg-card/70 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-foreground text-background flex items-center justify-center shrink-0">
            <GithubIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm sm:text-base text-foreground font-mono">
                @{data.githubUsername}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium ${
                  isLive
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : "bg-muted text-muted-foreground border border-border"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isLive ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground"
                  }`}
                />
                {isLive ? "Live Synced" : isLoading ? "Connecting..." : "Synced"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Live statistics, commit activity, and public repositories directly from GitHub.
            </p>
          </div>
        </div>

        <a
          href={data.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-foreground text-background hover:opacity-90 transition-opacity self-start sm:self-auto shrink-0"
        >
          <span>View GitHub Profile</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* 4 Highlights Stats */}
      <GithubStats data={data} isLive={isLive} />

      {/* 52-Week Contribution Matrix */}
      <ContributionCalendar data={data} weeks={weeks} isLive={isLive} />

      {/* Languages & Pinned Repos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <LanguagesChart data={data} isLive={isLive} />
        </div>
        <div className="lg:col-span-7">
          <PinnedRepos data={data} isLive={isLive} />
        </div>
      </div>
    </div>
  );
}

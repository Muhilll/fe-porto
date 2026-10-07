"use client";

import { GitCommit, GitPullRequest, Star, Flame } from "lucide-react";
import { contributionData } from "@/data/contributions";
import { FadeIn } from "@/components/portfolio/shared/motion-wrapper";

export function GithubStats() {
  const stats = [
    {
      label: "Total Contributions",
      value: contributionData.totalContributionsLastYear.toLocaleString(),
      subtext: "Past 12 months activity",
      icon: GitCommit,
    },
    {
      label: "Current Streak",
      value: `${contributionData.currentStreakDays} Days`,
      subtext: `Longest: ${contributionData.longestStreakDays} days`,
      icon: Flame,
    },
    {
      label: "Pull Requests",
      value: `${contributionData.totalPullRequests}+`,
      subtext: "Reviewed & merged code",
      icon: GitPullRequest,
    },
    {
      label: "GitHub Stars",
      value: `${contributionData.totalStarsEarned}`,
      subtext: "Earned across public repos",
      icon: Star,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((s, idx) => {
        const Icon = s.icon;
        return (
          <FadeIn key={s.label} delay={idx * 0.08}>
            <div className="p-6 rounded-2xl border border-border/80 bg-background/90 space-y-2.5 shadow-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-mono">{s.label}</span>
                <Icon className="w-4 h-4 text-foreground" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-foreground">
                {s.value}
              </div>
              <p className="text-[11px] text-muted-foreground">{s.subtext}</p>
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}

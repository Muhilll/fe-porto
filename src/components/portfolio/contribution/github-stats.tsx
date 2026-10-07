"use client";

import { GitCommit, GitPullRequest, Star, Flame } from "lucide-react";
import { ContributionData } from "@/types/portfolio";
import { useGithubContributions } from "@/hooks/use-github-contributions";
import { FadeIn } from "@/components/portfolio/shared/motion-wrapper";

interface GithubStatsProps {
  data?: ContributionData;
  isLive?: boolean;
}

// Consistent locale formatting to eliminate server/client hydration mismatch
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US").format(num);
};

export function GithubStats({ data: propData }: GithubStatsProps) {
  const hookResult = useGithubContributions();
  const data = propData || hookResult.data;

  const stats = [
    {
      label: "Total Contributions",
      value: formatNumber(data.totalContributionsLastYear),
      subtext: "Past 12 months activity",
      icon: GitCommit,
    },
    {
      label: "Current Streak",
      value: `${data.currentStreakDays} Days`,
      subtext: `Longest: ${data.longestStreakDays} days`,
      icon: Flame,
    },
    {
      label: "Pull Requests",
      value: `${data.totalPullRequests}+`,
      subtext: "Reviewed & merged code",
      icon: GitPullRequest,
    },
    {
      label: "GitHub Stars",
      value: `${data.totalStarsEarned}`,
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
            <div className="p-6 rounded-2xl border border-border/80 bg-background/90 space-y-2.5 shadow-sm hover:border-foreground/30 transition-colors">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-mono">{s.label}</span>
                <Icon className="w-4 h-4 text-foreground" />
              </div>
              <div
                suppressHydrationWarning
                className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-foreground"
              >
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

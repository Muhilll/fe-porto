"use client";

import { Star, GitFork, ArrowUpRight, FolderGit2 } from "lucide-react";
import { ContributionData } from "@/types/portfolio";
import { useGithubContributions } from "@/hooks/use-github-contributions";
import { FadeIn } from "@/components/portfolio/shared/motion-wrapper";

interface PinnedReposProps {
  data?: ContributionData;
  isLive?: boolean;
}

export function PinnedRepos({ data: propData }: PinnedReposProps) {
  const hookResult = useGithubContributions();
  const data = propData || hookResult.data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <FolderGit2 className="w-5 h-5 text-foreground" />
          <h3 className="text-base font-semibold text-foreground">Featured Open Source Repositories</h3>
        </div>
        <a
          href={data.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:opacity-80 transition-opacity"
        >
          <span>View all on GitHub</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.repositories.map((repo, idx) => (
          <FadeIn key={repo.name} delay={idx * 0.08}>
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 rounded-2xl border border-border/80 bg-background/90 hover:border-foreground/40 transition-all duration-300 space-y-4 shadow-sm h-full"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono font-semibold text-sm sm:text-base text-foreground group-hover:underline underline-offset-4 flex items-center gap-2">
                  <span>{repo.name}</span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {repo.description}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-border/60 text-xs text-muted-foreground font-mono">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: repo.languageColor }}
                  />
                  <span>{repo.language}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5" />
                    <span>{repo.stars}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5" />
                    <span>{repo.forks}</span>
                  </span>
                </div>
              </div>
            </a>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { ContributionData } from "@/types/portfolio";
import { CalendarDay } from "@/services/github";
import { useGithubContributions } from "@/hooks/use-github-contributions";
import { FadeIn } from "@/components/portfolio/shared/motion-wrapper";
import { Calendar, Info } from "lucide-react";

interface ContributionCalendarProps {
  data?: ContributionData;
  weeks?: CalendarDay[][];
  isLive?: boolean;
}

export function ContributionCalendar({
  data: propData,
  weeks: propWeeks,
  isLive: propIsLive,
}: ContributionCalendarProps) {
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

  const hookResult = useGithubContributions();
  const data = propData || hookResult.data;
  const weeks = propWeeks && propWeeks.length > 0 ? propWeeks : hookResult.weeks;
  const isLive = propIsLive !== undefined ? propIsLive : hookResult.isLive;

  // Format date readable
  const formatReadableDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return dateStr;
    }
  };

  return (
    <FadeIn>
      <div className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-background/90 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-foreground" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-foreground">
                  Commit Activity Grid (Past 12 Months)
                </h3>
                {isLive && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE
                  </span>
                )}
              </div>
              <p
                suppressHydrationWarning
                className="text-xs text-muted-foreground font-mono mt-0.5"
              >
                {new Intl.NumberFormat("en-US").format(data.totalContributionsLastYear)} total contributions in the last year
              </p>
            </div>
          </div>

          {/* Active tooltip indicator */}
          <div className="h-6 flex items-center">
            {hoveredDay ? (
              <span className="text-xs font-mono text-foreground px-2.5 py-1 rounded-full bg-muted border border-border/60 animate-in fade-in duration-150">
                {hoveredDay.count === 0 ? "No contributions" : `${hoveredDay.count} contributions`} on {formatReadableDate(hoveredDay.date)}
              </span>
            ) : (
              <span className="text-xs text-muted-foreground font-mono flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>Hover over squares for details</span>
              </span>
            )}
          </div>
        </div>

        {/* Heatmap Grid (Scrollable on small mobile screens) */}
        <div className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
          <div className="min-w-[720px] flex gap-[3px]">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[3px]">
                {week.map((day) => {
                  // Monochrome shades adapting to dark & light mode
                  let levelClass = "bg-muted/40 hover:ring-1 hover:ring-foreground/40";
                  if (day.level === 1) levelClass = "bg-neutral-300 dark:bg-neutral-700 hover:ring-1 hover:ring-foreground";
                  if (day.level === 2) levelClass = "bg-neutral-500 dark:bg-neutral-500 hover:ring-1 hover:ring-foreground";
                  if (day.level === 3) levelClass = "bg-neutral-700 dark:bg-neutral-300 hover:ring-1 hover:ring-foreground";
                  if (day.level === 4) levelClass = "bg-neutral-900 dark:bg-neutral-100 hover:ring-1 hover:ring-foreground";

                  return (
                    <div
                      key={day.date}
                      onMouseEnter={() => setHoveredDay({ date: day.date, count: day.count })}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`w-[11px] h-[11px] rounded-[2.5px] transition-colors cursor-pointer ${levelClass}`}
                      title={`${day.count} contributions on ${day.date}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Footer legend */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/60 text-xs text-muted-foreground font-mono">
          <div className="flex items-center gap-2">
            <span>Data synced with GitHub</span>
            <a
              href={data.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline font-semibold"
            >
              @{data.githubUsername}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span>Less</span>
            <div className="flex items-center gap-1">
              <span className="w-[10px] h-[10px] rounded-[2px] bg-muted/40" />
              <span className="w-[10px] h-[10px] rounded-[2px] bg-neutral-300 dark:bg-neutral-700" />
              <span className="w-[10px] h-[10px] rounded-[2px] bg-neutral-500 dark:bg-neutral-500" />
              <span className="w-[10px] h-[10px] rounded-[2px] bg-neutral-700 dark:bg-neutral-300" />
              <span className="w-[10px] h-[10px] rounded-[2px] bg-neutral-900 dark:bg-neutral-100" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

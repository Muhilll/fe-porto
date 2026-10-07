"use client";

import { useState, useMemo } from "react";
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

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

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

  // Compute month positions mapped to week index
  const monthMap = useMemo(() => {
    const map = new Map<number, string>();
    if (!weeks || weeks.length === 0) return map;

    const rawLabels: { name: string; weekIndex: number }[] = [];
    let prevMonth = -1;

    weeks.forEach((week, wIdx) => {
      for (const day of week) {
        if (!day.date) continue;
        const parts = day.date.split("-");
        if (parts.length >= 2) {
          const monthNum = parseInt(parts[1], 10);
          if (monthNum !== prevMonth) {
            rawLabels.push({
              name: MONTH_NAMES[monthNum - 1] || "",
              weekIndex: wIdx,
            });
            prevMonth = monthNum;
            break;
          }
        }
      }
    });

    // Filter to ensure no overlapping text
    const filtered: { name: string; weekIndex: number }[] = [];
    for (let i = 0; i < rawLabels.length; i++) {
      const current = rawLabels[i];
      const next = rawLabels[i + 1];

      // If next label is < 3 weeks away, skip current label to avoid crowding
      if (next && next.weekIndex - current.weekIndex < 3) {
        continue;
      }

      // If label is too close to grid end (< 2 weeks from right edge), skip
      if (weeks.length - current.weekIndex < 2) {
        continue;
      }

      // Ensure minimum 3 weeks distance from previously placed label
      const lastPlaced = filtered[filtered.length - 1];
      if (lastPlaced && current.weekIndex - lastPlaced.weekIndex < 3) {
        continue;
      }

      filtered.push(current);
    }

    for (const item of filtered) {
      map.set(item.weekIndex, item.name);
    }

    return map;
  }, [weeks]);

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

        {/* Heatmap Grid (Scrollable on small mobile screens, full width on tablet/desktop) */}
        <div className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
          <div className="min-w-[728px] w-full space-y-2.5">
            {/* Month labels header */}
            <div className="flex gap-[3px] w-full h-4 text-[10px] sm:text-xs font-mono text-muted-foreground select-none">
              {weeks.map((_, wIdx) => {
                const monthName = monthMap.get(wIdx);
                return (
                  <div key={wIdx} className="flex-1 relative">
                    {monthName && (
                      <span className="absolute left-0 top-0 leading-none whitespace-nowrap">
                        {monthName}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Weeks columns */}
            <div className="flex gap-[3px] w-full">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex-1 flex flex-col gap-[3px]">
                  {week.map((day) => {
                    // GitHub authentic Emerald green shades adapting to dark & light mode
                    let levelClass = "bg-slate-200/80 dark:bg-white/[0.07] border border-slate-300/60 dark:border-white/[0.09] hover:ring-1 hover:ring-foreground/40";
                    if (day.level === 1) levelClass = "bg-emerald-200 dark:bg-emerald-950 hover:ring-1 hover:ring-emerald-400 border border-emerald-300/30 dark:border-emerald-800/50";
                    if (day.level === 2) levelClass = "bg-emerald-400 dark:bg-emerald-700 hover:ring-1 hover:ring-emerald-300 border border-emerald-400/30 dark:border-emerald-600/50";
                    if (day.level === 3) levelClass = "bg-emerald-500 dark:bg-emerald-500 hover:ring-1 hover:ring-emerald-200 border border-emerald-500/30 dark:border-emerald-400/50";
                    if (day.level === 4) levelClass = "bg-emerald-600 dark:bg-emerald-400 hover:ring-1 hover:ring-emerald-100 border border-emerald-600/30 dark:border-emerald-300/50 shadow-[0_0_6px_rgba(16,185,129,0.35)]";

                    return (
                      <div
                        key={day.date}
                        onMouseEnter={() => setHoveredDay({ date: day.date, count: day.count })}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`w-full aspect-square rounded-[2px] sm:rounded-[3px] transition-all cursor-pointer ${levelClass}`}
                        title={`${day.count} contributions on ${day.date}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
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
              <span className="w-[10px] h-[10px] rounded-[2px] bg-slate-200/80 dark:bg-white/[0.07] border border-slate-300/60 dark:border-white/[0.09]" />
              <span className="w-[10px] h-[10px] rounded-[2px] bg-emerald-200 dark:bg-emerald-950 border border-emerald-300/30 dark:border-emerald-800/50" />
              <span className="w-[10px] h-[10px] rounded-[2px] bg-emerald-400 dark:bg-emerald-700" />
              <span className="w-[10px] h-[10px] rounded-[2px] bg-emerald-500 dark:bg-emerald-500" />
              <span className="w-[10px] h-[10px] rounded-[2px] bg-emerald-600 dark:bg-emerald-400 shadow-[0_0_4px_rgba(16,185,129,0.35)]" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

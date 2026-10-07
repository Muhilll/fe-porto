"use client";

import { contributionData } from "@/data/contributions";
import { FadeIn } from "@/components/portfolio/shared/motion-wrapper";
import { Code2 } from "lucide-react";

export function LanguagesChart() {
  return (
    <FadeIn>
      <div className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-background/90 space-y-6 shadow-sm">
        <div className="flex items-center gap-2.5">
          <Code2 className="w-5 h-5 text-foreground" />
          <div>
            <h3 className="text-base font-semibold text-foreground">Top Languages</h3>
            <p className="text-xs text-muted-foreground font-mono">
              Calculated across authored repositories
            </p>
          </div>
        </div>

        {/* Multi-segment Progress Bar */}
        <div className="h-3 rounded-full overflow-hidden flex bg-muted gap-[2px]">
          {contributionData.topLanguages.map((lang) => (
            <div
              key={lang.name}
              style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
              title={`${lang.name}: ${lang.percentage}%`}
              className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-500"
            />
          ))}
        </div>

        {/* Legend List */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          {contributionData.topLanguages.map((lang) => (
            <div key={lang.name} className="flex items-center justify-between text-xs p-2 rounded-xl bg-muted/40">
              <span className="flex items-center gap-2 font-medium text-foreground">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: lang.color }}
                />
                <span>{lang.name}</span>
              </span>
              <span className="font-mono text-muted-foreground">{lang.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

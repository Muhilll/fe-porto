"use client";

import { skillCategoriesData } from "@/data/about";
import { SectionHeader } from "@/components/portfolio/shared/section-header";
import { FadeIn } from "@/components/portfolio/shared/motion-wrapper";
import { Check } from "lucide-react";

export function SkillsGrid() {
  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeader
          badge="Toolkit"
          title="Skills & Competencies"
          description="Technologies and frameworks I utilize regularly to build resilient, maintainable software."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategoriesData.map((cat, idx) => (
            <FadeIn key={cat.category} delay={idx * 0.1}>
              <div className="p-6 rounded-2xl border border-border/80 bg-background/90 space-y-4 h-full shadow-sm">
                <div className="space-y-1 pb-3 border-b border-border/60">
                  <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                    Domain 0{idx + 1}
                  </span>
                  <h3 className="text-base font-semibold text-foreground">{cat.category}</h3>
                </div>

                <ul className="space-y-2.5">
                  {cat.skills.map((skill) => (
                    <li key={skill.name} className="flex items-center justify-between text-xs py-1">
                      <span className="flex items-center gap-2 text-foreground font-medium">
                        <Check className="w-3.5 h-3.5 text-foreground shrink-0" />
                        <span>{skill.name}</span>
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground px-1.5 py-0.5 rounded bg-muted">
                        {skill.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

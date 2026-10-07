"use client";

import { useExperiences, useEducations } from "@/features/portfolio/about/hooks/use-about";
import { getNormalizedExperiences, getNormalizedEducations } from "@/features/portfolio/adapters";
import { SectionHeader } from "@/components/portfolio/shared/section-header";
import { FadeIn } from "@/components/portfolio/shared/motion-wrapper";
import { Briefcase, GraduationCap } from "lucide-react";

export function ExperienceTimeline() {
  const { data: apiExperiences } = useExperiences();
  const { data: apiEducations } = useEducations();

  const experiences = getNormalizedExperiences(apiExperiences);
  const educations = getNormalizedEducations(apiEducations);

  return (
    <section id="experience" className="py-20 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeader
          badge="Track Record"
          title="Experience & Education"
          description="Chronological journey of software engineering roles, team contributions, and academic foundation."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Work Experience Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-2.5 pb-2 border-b border-border/60">
              <Briefcase className="w-4 h-4 text-foreground" />
              <h3 className="text-lg font-semibold text-foreground">Professional Experience</h3>
            </div>

            <div className="space-y-8 relative pl-6 border-l border-border/80">
              {experiences.map((exp, idx) => (
                <FadeIn key={exp.id} delay={idx * 0.1} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full border-2 border-background bg-foreground group-hover:scale-125 transition-transform" />

                  <div className="space-y-3 p-6 rounded-2xl border border-border/80 bg-background/90 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border/60">
                        {exp.period}
                      </span>
                      {exp.location && (
                        <span className="text-xs text-muted-foreground">{exp.location}</span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-base font-semibold text-foreground">{exp.role}</h4>
                      <p className="text-sm font-medium text-muted-foreground">{exp.company}</p>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>

                    {exp.skills && exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted/60 text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-2.5 pb-2 border-b border-border/60">
              <GraduationCap className="w-4 h-4 text-foreground" />
              <h3 className="text-lg font-semibold text-foreground">Education & Degrees</h3>
            </div>

            <div className="space-y-8 relative pl-6 border-l border-border/80">
              {educations.map((edu, idx) => (
                <FadeIn key={edu.id} delay={idx * 0.1} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full border-2 border-background bg-foreground group-hover:scale-125 transition-transform" />

                  <div className="space-y-3 p-6 rounded-2xl border border-border/80 bg-background/90 shadow-sm">
                    <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border/60">
                      {edu.period}
                    </span>

                    <div>
                      <h4 className="text-base font-semibold text-foreground">{edu.degree}</h4>
                      <p className="text-sm font-medium text-muted-foreground">{edu.institution}</p>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

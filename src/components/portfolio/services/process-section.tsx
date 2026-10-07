"use client";

import { processSteps } from "@/data/services";
import { SectionHeader } from "@/components/portfolio/shared/section-header";
import { FadeIn } from "@/components/portfolio/shared/motion-wrapper";

export function ProcessSection() {
  return (
    <section id="process" className="py-20 border-b border-border/40 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeader
          badge="Execution Model"
          title="How We Collaborate"
          description="A structured, predictable 4-phase methodology that ensures rapid turnaround without sacrificing code quality."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, idx) => (
            <FadeIn key={step.step} delay={idx * 0.1}>
              <div className="p-8 rounded-2xl border border-border/80 bg-background/90 space-y-4 h-full flex flex-col justify-between shadow-sm">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-muted border border-border/80 flex items-center justify-center font-mono font-bold text-sm text-foreground">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

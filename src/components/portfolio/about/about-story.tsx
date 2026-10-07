"use client";

import { aboutNarrative } from "@/data/about";
import { SectionHeader } from "@/components/portfolio/shared/section-header";
import { FadeIn } from "@/components/portfolio/shared/motion-wrapper";

export function AboutStory() {
  return (
    <section id="story" className="py-20 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-3xl space-y-6">
          <SectionHeader
            badge="Background"
            title="Engineering Philosophy"
            description="How I approach building durable digital tools and collaborative software."
          />
          <p className="text-base text-muted-foreground leading-relaxed">
            {aboutNarrative.intro}
          </p>
        </div>

        {/* Philosophy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aboutNarrative.philosophy.map((item, idx) => (
            <FadeIn key={item.title} delay={idx * 0.1} className="h-full">
              <div className="p-8 rounded-2xl border border-border/80 bg-background/80 h-full flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="text-xs font-mono text-muted-foreground">0{idx + 1}</div>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
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

import type { Metadata } from "next";
import { AboutHero } from "@/components/portfolio/about/about-hero";
import { AboutStory } from "@/components/portfolio/about/about-story";
import { ExperienceTimeline } from "@/components/portfolio/about/experience-timeline";
import { SkillsGrid } from "@/components/portfolio/about/skills-grid";
import { HomeCta } from "@/components/portfolio/home/home-cta";

export const metadata: Metadata = {
  title: "About — Zail Yan Zali",
  description: "Background, technical philosophy, professional timeline, and core engineering toolkit.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <AboutHero />
      <AboutStory />
      <ExperienceTimeline />
      <SkillsGrid />
      <HomeCta />
    </div>
  );
}

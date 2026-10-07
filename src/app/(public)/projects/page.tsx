import type { Metadata } from "next";
import { ProjectsShowcase } from "@/components/portfolio/projects/projects-showcase";
import { HomeCta } from "@/components/portfolio/home/home-cta";

export const metadata: Metadata = {
  title: "Projects — Zail Yan Zali",
  description: "Explore selected software engineering projects, web applications, and technical architectures.",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col">
      <ProjectsShowcase />
      <HomeCta />
    </div>
  );
}

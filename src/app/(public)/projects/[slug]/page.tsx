import type { Metadata } from "next";
import { ProjectDetailView } from "@/components/portfolio/projects/project-detail-view";
import { HomeCta } from "@/components/portfolio/home/home-cta";
import { projectsData } from "@/data/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  // Try to find in fallback static projects first for SSR metadata
  const project = projectsData.find((p) => p.slug === slug || p.id === slug);

  const title = project ? `${project.title} — Case Study` : "Project Detail — Zail Yan Zali";
  const description =
    project?.shortDescription ||
    "Detailed engineering case study, software architecture, technical highlights, and system metrics.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: project?.image ? [{ url: project.image }] : undefined,
    },
  };
}

export default async function SingleProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  return (
    <div className="flex flex-col">
      <ProjectDetailView slugOrId={slug} />
      <HomeCta />
    </div>
  );
}

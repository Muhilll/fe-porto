import type { Metadata } from "next";
import { BlogList } from "@/components/portfolio/blog/blog-list";
import { SectionHeader } from "@/components/portfolio/shared/section-header";
import { HomeCta } from "@/components/portfolio/home/home-cta";

export const metadata: Metadata = {
  title: "Engineering Blog & Notes — Zail Yan Zali",
  description: "Technical writings, architectural breakdowns, database strategies, and software development insights.",
};

export default function BlogPage() {
  return (
    <div className="py-16 sm:py-24 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge="Writings & Thoughts"
          title="Engineering Blog & Architecture Notes"
          description="In-depth explorations of full-stack engineering, performance optimizations, API design patterns, and modern web paradigms."
        />

        <BlogList />
      </div>

      <HomeCta />
    </div>
  );
}

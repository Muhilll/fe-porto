import type { Metadata } from "next";
import { ContributionContainer } from "@/components/portfolio/contribution/contribution-container";
import { SectionHeader } from "@/components/portfolio/shared/section-header";
import { HomeCta } from "@/components/portfolio/home/home-cta";

export const metadata: Metadata = {
  title: "Contributions & Open Source — Muhammad Ilham",
  description: "Public GitHub contributions, 52-week activity heatmap, open source repositories, and programming language metrics.",
};

export default function ContributionPage() {
  return (
    <div className="py-16 sm:py-24 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge="Open Source & Git Metrics"
          title="Contributions & Developer Activity"
          description="A transparent record of public code contributions, open-source repositories, and continuous software shipping."
        />

        <ContributionContainer />
      </div>

      <HomeCta />
    </div>
  );
}


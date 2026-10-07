import type { Metadata } from "next";
import { GithubStats } from "@/components/portfolio/contribution/github-stats";
import { ContributionCalendar } from "@/components/portfolio/contribution/contribution-calendar";
import { LanguagesChart } from "@/components/portfolio/contribution/languages-chart";
import { PinnedRepos } from "@/components/portfolio/contribution/pinned-repos";
import { SectionHeader } from "@/components/portfolio/shared/section-header";
import { HomeCta } from "@/components/portfolio/home/home-cta";

export const metadata: Metadata = {
  title: "Contributions & Open Source — Zail Yan Zali",
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

        <GithubStats />
        <ContributionCalendar />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <LanguagesChart />
          </div>
          <div className="lg:col-span-7">
            <PinnedRepos />
          </div>
        </div>
      </div>

      <HomeCta />
    </div>
  );
}

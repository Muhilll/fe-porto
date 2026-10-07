import { HeroSection } from "@/components/portfolio/home/hero-section";
import { FeaturedProjects } from "@/components/portfolio/home/featured-projects";
import { ServicesPreview } from "@/components/portfolio/home/services-preview";
import { HomeContributionPreview } from "@/components/portfolio/home/home-contribution-preview";
import { HomeCta } from "@/components/portfolio/home/home-cta";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedProjects />
      <ServicesPreview />
      <HomeContributionPreview />
      <HomeCta />
    </div>
  );
}

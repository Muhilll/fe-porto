import type { Metadata } from "next";
import { ServicesList } from "@/components/portfolio/services/services-list";
import { ProcessSection } from "@/components/portfolio/services/process-section";
import { HomeCta } from "@/components/portfolio/home/home-cta";

export const metadata: Metadata = {
  title: "Services — Zail Yan Zali",
  description: "Full-stack web application development, edge APIs, systems architecture, and UI/UX engineering.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      <ServicesList />
      <ProcessSection />
      <HomeCta />
    </div>
  );
}

import type { Metadata } from "next";
import { CertificatesGrid } from "@/components/portfolio/certificates/certificates-grid";
import { SectionHeader } from "@/components/portfolio/shared/section-header";
import { HomeCta } from "@/components/portfolio/home/home-cta";

export const metadata: Metadata = {
  title: "Certificates & Licenses — Muhammad Ilham",
  description: "Verified professional certifications, cloud licenses, and engineering qualifications.",
};

export default function CertificatesPage() {
  return (
    <div className="py-16 sm:py-24 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge="Verified Credentials"
          title="Licenses & Certifications"
          description="Industry-recognized certifications validating technical competency across cloud computing, databases, frontend architecture, and accessibility."
        />

        <CertificatesGrid />
      </div>

      <HomeCta />
    </div>
  );
}

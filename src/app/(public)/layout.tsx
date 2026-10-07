import type { Metadata } from "next";
import { PortfolioNavbar } from "@/components/portfolio/layout/navbar";
import { PortfolioFooter } from "@/components/portfolio/layout/footer";
import { AmbientBackground } from "@/components/portfolio/shared/ambient-background";
import { profileData } from "@/data/profile";

export const metadata: Metadata = {
  title: `${profileData.name} — ${profileData.role}`,
  description: profileData.tagline,
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground selection:bg-foreground selection:text-background font-sans antialiased">
      {/* 1. Atmospheric non-flat background (grid mesh, glowing orbs & interactive spotlight) */}
      <AmbientBackground />

      {/* 2. Fixed Navbar */}
      <PortfolioNavbar />

      {/* 3. Main Content Layer */}
      <main className="flex-1 pt-16 relative z-10">
        {children}
      </main>

      {/* 4. Footer Layer */}
      <div className="relative z-10">
        <PortfolioFooter />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { PortfolioNavbar } from "@/components/portfolio/layout/navbar";
import { PortfolioFooter } from "@/components/portfolio/layout/footer";
import { profileData } from "@/data/profile";

export const metadata: Metadata = {
  title: `${profileData.name} — ${profileData.role}`,
  description: profileData.tagline,
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-foreground selection:text-background font-sans antialiased">
      <PortfolioNavbar />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <PortfolioFooter />
    </div>
  );
}

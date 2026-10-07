"use client";

import Link from "next/link";
import { ArrowUp, ArrowUpRight, Mail, MessageSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/portfolio/shared/icons";
import { navigationItems } from "@/data/navigation";
import { useProfile } from "@/features/portfolio/profile/hooks/use-profile";
import { getNormalizedProfile } from "@/features/portfolio/adapters";

export function PortfolioFooter() {
  const { data: apiProfile } = useProfile();
  const profile = getNormalizedProfile(apiProfile);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();
  const firstLetter = (profile.shortName || profile.name || "Z").charAt(0).toUpperCase();

  const whatsappHref = profile.whatsapp.startsWith("http")
    ? profile.whatsapp
    : `https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, "")}`;

  return (
    <footer className="border-t border-border/80 bg-background/50 backdrop-blur-sm mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand & Statement */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-foreground text-background flex items-center justify-center font-mono font-bold text-sm tracking-tight">
                {firstLetter}
              </div>
              <span className="font-semibold text-base tracking-tight text-foreground">
                {profile.name}
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              {profile.tagline}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-border/80 bg-muted/40 text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{profile.availabilityText}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Map */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Connect */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Connect
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            © {currentYear} {profile.name}. All rights reserved. Clean monochrome engineering.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-border/80 bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

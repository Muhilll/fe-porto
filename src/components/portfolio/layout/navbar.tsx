"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navigationItems } from "@/data/navigation";
import { useProfile } from "@/features/portfolio/profile/hooks/use-profile";
import { getNormalizedProfile } from "@/features/portfolio/adapters";
import { ThemeToggle } from "@/components/portfolio/shared/theme-toggle";

export function PortfolioNavbar() {
  const { data: apiProfile } = useProfile();
  const profile = getNormalizedProfile(apiProfile);
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          scrolled || mobileMenuOpen
            ? "bg-background border-b border-border shadow-sm"
            : "bg-background/80 backdrop-blur-md border-b border-border/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-lg"
            >
              <div className="w-8 h-8 rounded-lg bg-foreground text-background flex items-center justify-center font-mono font-bold text-sm tracking-tight transition-transform group-hover:scale-105 uppercase">
                {profile.shortName?.charAt(0) || "Z"}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm sm:text-base tracking-tight text-foreground leading-none">
                  {profile.shortName}
                </span>
                <span className="text-[11px] font-mono text-muted-foreground leading-tight mt-0.5">
                  portfolio
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigationItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-3.5 py-1.5 text-xs font-medium tracking-wide rounded-full transition-colors ${
                      isActive
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 rounded-full bg-muted border border-border/80 -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Controls: Theme Toggle & Contact Button (Desktop) */}
            <div className="hidden sm:flex items-center gap-2.5">
              <ThemeToggle />
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-foreground text-background hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-foreground/20"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Menu & Theme Buttons */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border/80 bg-background hover:bg-muted text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop & Drawer Navigation (Solid, high-contrast, perfectly opaque) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* 1. Darkened Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-16 bg-black/75 backdrop-blur-sm z-40 lg:hidden"
              aria-hidden="true"
            />

            {/* 2. Solid Mobile Drawer */}
            <motion.nav
              aria-label="Mobile Navigation"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed top-16 left-0 right-0 z-50 lg:hidden border-b border-border bg-background dark:bg-card shadow-2xl max-h-[calc(100dvh-4.5rem)] overflow-y-auto px-4 py-4 space-y-2"
            >
              <div className="space-y-1.5">
                {navigationItems.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname === item.href || pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`group flex items-center justify-between p-3 rounded-xl border transition-all ${
                        isActive
                          ? "bg-foreground text-background border-foreground shadow-sm"
                          : "bg-muted/40 hover:bg-muted text-foreground border-border/60 hover:border-border"
                      }`}
                    >
                      <div className="flex flex-col pr-2">
                        <span
                          className={`text-sm font-semibold tracking-tight ${
                            isActive ? "text-background" : "text-foreground"
                          }`}
                        >
                          {item.name}
                        </span>
                        <span
                          className={`text-xs mt-0.5 leading-snug ${
                            isActive ? "text-background/80" : "text-muted-foreground"
                          }`}
                        >
                          {item.description}
                        </span>
                      </div>

                      {isActive ? (
                        <span className="w-2 h-2 rounded-full bg-background shrink-0" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Bottom Quick Action */}
              <div className="pt-3 pb-2 border-t border-border/60 mt-3">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-foreground text-background hover:opacity-90 transition-opacity shadow-sm"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

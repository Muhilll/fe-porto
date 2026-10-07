"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navigationItems } from "@/data/navigation";
import { profileData } from "@/data/profile";
import { ThemeToggle } from "@/components/portfolio/shared/theme-toggle";

export function PortfolioNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/80 shadow-sm"
          : "bg-background/50 backdrop-blur-sm border-b border-border/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-lg"
          >
            <div className="w-8 h-8 rounded-lg bg-foreground text-background flex items-center justify-center font-mono font-bold text-sm tracking-tight transition-transform group-hover:scale-105">
              Z
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm sm:text-base tracking-tight text-foreground leading-none">
                {profileData.shortName}
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

          {/* Right Controls: Theme Toggle & Contact Button */}
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
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border/80 bg-background/80 hover:bg-muted text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden border-b border-border/80 bg-background/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-1 overflow-hidden"
          >
            {navigationItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-colors ${
                    isActive
                      ? "bg-muted text-foreground font-semibold border border-border/60"
                      : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                  }`}
                >
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground font-normal">
                      {item.description}
                    </div>
                  </div>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-foreground" />}
                </Link>
              );
            })}
            <div className="pt-3 mt-2 border-t border-border/60">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-foreground text-background"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

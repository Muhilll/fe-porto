"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/portfolio/shared/icons";
import { motion } from "framer-motion";
import { useProfile } from "@/features/portfolio/profile/hooks/use-profile";
import { getNormalizedProfile } from "@/features/portfolio/adapters";

export function HeroSection() {
  const { data: apiProfile } = useProfile();
  const profile = getNormalizedProfile(apiProfile);

  // Kinetic typing effect
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const rolesList = profile.rolesList && profile.rolesList.length > 0 ? profile.rolesList : ["Full-Stack Engineer"];

  useEffect(() => {
    const currentFullRole = rolesList[roleIndex % rolesList.length] || "";
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentFullRole.length) {
          setDisplayedText(currentFullRole.slice(0, displayedText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentFullRole.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % rolesList.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, rolesList]);

  // Color for availability ping
  const isAvailable = profile.availability === "available";
  const isBusy = profile.availability === "busy";

  return (
    <section id="hero" className="relative overflow-hidden py-16 sm:py-24 md:py-32 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-8">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono border border-border/80 bg-muted/40 text-muted-foreground backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isBusy ? "bg-red-400" : isAvailable ? "bg-emerald-400" : "bg-amber-400"
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isBusy ? "bg-red-500" : isAvailable ? "bg-emerald-500" : "bg-amber-500"
                }`}
              />
            </span>
            <span className="font-medium">{profile.availabilityText}</span>
          </motion.div>

          {/* Headline & Typing Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.1]">
              Hi, I&apos;m{" "}
              <span className="underline decoration-border/80 underline-offset-8">
                {profile.shortName}
              </span>
              .
              <br />
              <span className="text-muted-foreground font-normal">I engineer </span>
              <span className="inline-block min-h-[1.2em] font-mono font-medium text-foreground">
                {displayedText}
                <span className="animate-pulse ml-0.5 text-foreground font-light">|</span>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl pt-2">
              {profile.tagline}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-foreground text-background hover:opacity-90 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-border/80 bg-background hover:bg-muted text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-foreground/20"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            {profile.resumeUrl && profile.resumeUrl !== "#" && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Resume</span>
              </a>
            )}
          </motion.div>

          {/* Social Links Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4 pt-4 border-t border-border/50 text-muted-foreground"
          >
            <span className="text-xs font-mono uppercase tracking-wider">Connect:</span>
            <div className="flex items-center gap-3">
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-muted hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-muted hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="p-2 rounded-full hover:bg-muted hover:text-foreground transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Stats Ribbon */}
          {profile.stats && profile.stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8"
            >
              {profile.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-border/80 bg-background/60 backdrop-blur-sm space-y-1"
                >
                  <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-foreground">{stat.label}</div>
                  <p className="text-[11px] text-muted-foreground leading-snug">{stat.description}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

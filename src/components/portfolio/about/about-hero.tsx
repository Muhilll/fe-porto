"use client";

import Image from "next/image";
import { MapPin, Briefcase, CheckCircle2, FileText, ArrowUpRight } from "lucide-react";
import { profileData } from "@/data/profile";
import { FadeIn } from "@/components/portfolio/shared/motion-wrapper";

export function AboutHero() {
  return (
    <section id="about-hero" className="py-12 sm:py-20 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Avatar Frame (Crafted with modern monochrome framing) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <FadeIn delay={0.1}>
              <div className="relative group">
                {/* Architectural border offset */}
                <div className="absolute -inset-3 rounded-3xl border border-border/80 bg-muted/30 -z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
                
                {/* Photo container */}
                <div className="relative w-64 sm:w-80 aspect-square rounded-2xl overflow-hidden border border-border/80 bg-muted shadow-md">
                  <Image
                    src={profileData.avatarUrl}
                    alt={profileData.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 grayscale hover:grayscale-0"
                    priority
                  />
                </div>

                {/* Status Float Badge */}
                <div className="absolute -bottom-4 right-4 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium border border-border/80 bg-background/95 backdrop-blur-md text-foreground flex items-center gap-2 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available to Hire</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: Bio and Quick Chips */}
          <div className="lg:col-span-7 space-y-6">
            <FadeIn delay={0.2} className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-border/80 bg-muted/40 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                <span>About Me</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight">
                Software Engineer with an eye for architecture and clean code.
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {profileData.bio}
              </p>

              {/* Quick Info Chips */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border border-border/80 bg-background text-foreground">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>{profileData.location}</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border border-border/80 bg-background text-foreground">
                  <Briefcase className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>{profileData.experienceYears}+ Years Engineering</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border border-border/80 bg-background text-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>TypeScript & Node Specialist</span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href={profileData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-foreground text-background hover:opacity-90 transition-opacity"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download Curriculum Vitae</span>
                </a>

                <a
                  href={`mailto:${profileData.email}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold border border-border/80 bg-background hover:bg-muted text-foreground transition-colors"
                >
                  <span>Inquire via Email</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

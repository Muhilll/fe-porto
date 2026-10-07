"use client";

import Link from "next/link";
import { ArrowUpRight, MessageSquare, Mail } from "lucide-react";
import { profileData } from "@/data/profile";
import { FadeIn } from "@/components/portfolio/shared/motion-wrapper";

export function HomeCta() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-foreground text-background p-8 sm:p-14 md:p-16">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-background/5 blur-3xl pointer-events-none" />

            <div className="relative max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-background/20 bg-background/10 text-background/80">
                <span>Direct Collaboration</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-background leading-tight">
                Have a project in mind? Let&apos;s build it with clarity.
              </h2>

              <p className="text-base sm:text-lg text-background/80 leading-relaxed">
                I am currently open to engineering contracts, full-stack development projects, and architectural advisory.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-background text-foreground hover:opacity-90 transition-opacity"
                >
                  <span>Start a Conversation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <a
                  href={profileData.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border border-background/30 text-background hover:bg-background/10 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>

                <a
                  href={`mailto:${profileData.email}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border border-background/30 text-background hover:bg-background/10 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Me</span>
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

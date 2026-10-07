"use client";

import { Mail, MessageSquare, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/portfolio/shared/icons";
import { contactData } from "@/data/contact";
import { profileData } from "@/data/profile";
import { FadeIn } from "@/components/portfolio/shared/motion-wrapper";

export function ContactPanel() {
  return (
    <FadeIn delay={0.1}>
      <div className="p-8 sm:p-10 rounded-3xl border border-border/80 bg-background/90 space-y-8 shadow-sm h-full flex flex-col justify-between">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Communication Channels
            </span>
            <h3 className="text-2xl font-semibold text-foreground">
              Direct Inquiries
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Feel free to connect directly via email or message for consulting, full-stack projects, or developer inquiries.
            </p>
          </div>

          {/* Channels List */}
          <div className="space-y-3">
            <a
              href={`mailto:${contactData.email}`}
              className="flex items-center gap-4 p-4 rounded-2xl border border-border/60 bg-muted/30 hover:bg-muted/70 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-foreground text-background flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-mono text-muted-foreground">Email Address</div>
                <div className="text-sm font-semibold text-foreground truncate group-hover:underline">
                  {contactData.email}
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
            </a>

            <a
              href={contactData.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl border border-border/60 bg-muted/30 hover:bg-muted/70 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-foreground text-background flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-mono text-muted-foreground">WhatsApp Instant</div>
                <div className="text-sm font-semibold text-foreground truncate group-hover:underline">
                  {contactData.whatsapp}
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
            </a>
          </div>

          {/* Logistics / Availability Info */}
          <div className="space-y-2.5 pt-4 border-t border-border/60 text-xs">
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <MapPin className="w-4 h-4 text-foreground shrink-0" />
              <span>{contactData.location}</span>
            </div>
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <Clock className="w-4 h-4 text-foreground shrink-0" />
              <span>{contactData.workingHours}</span>
            </div>
          </div>
        </div>

        {/* Socials & Status */}
        <div className="pt-6 border-t border-border/60 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-muted-foreground">Response Speed:</span>
            <span className="font-medium text-foreground">{contactData.responseRate}</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-border/80 bg-background hover:bg-muted text-xs font-semibold text-foreground transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-border/80 bg-background hover:bg-muted text-xs font-semibold text-foreground transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

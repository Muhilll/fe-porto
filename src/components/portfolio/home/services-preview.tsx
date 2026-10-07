"use client";

import Link from "next/link";
import {
  Layout,
  Server,
  Sparkles,
  Zap,
  ArrowRight,
  CheckCircle2,
  Code,
  Database,
  Smartphone,
  Cloud,
  Shield,
  Cpu,
  Globe,
  Terminal,
  Bot,
} from "lucide-react";
import { SectionHeader } from "@/components/portfolio/shared/section-header";
import { FadeIn } from "@/components/portfolio/shared/motion-wrapper";
import { useServices } from "@/features/portfolio/service/hooks/use-service";
import { getNormalizedServices } from "@/features/portfolio/adapters";

export function ServicesPreview() {
  const { data: apiServices } = useServices();
  const services = getNormalizedServices(apiServices);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Server":
        return <Server className="w-5 h-5" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5" />;
      case "Zap":
        return <Zap className="w-5 h-5" />;
      case "Code":
        return <Code className="w-5 h-5" />;
      case "Database":
        return <Database className="w-5 h-5" />;
      case "Smartphone":
        return <Smartphone className="w-5 h-5" />;
      case "Cloud":
        return <Cloud className="w-5 h-5" />;
      case "Shield":
        return <Shield className="w-5 h-5" />;
      case "Cpu":
        return <Cpu className="w-5 h-5" />;
      case "Globe":
        return <Globe className="w-5 h-5" />;
      case "Terminal":
        return <Terminal className="w-5 h-5" />;
      case "Bot":
        return <Bot className="w-5 h-5" />;
      case "Layout":
      default:
        return <Layout className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-20 border-b border-border/40 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <SectionHeader
            badge="Capabilities"
            title="Services & Architecture"
            description="Engineering solutions focused on developer ergonomics, rock-solid stability, and user delight."
          />
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:opacity-80 transition-opacity self-start sm:self-end group"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, idx) => (
            <FadeIn key={service.id} delay={idx * 0.1}>
              <div className="p-8 rounded-2xl border border-border/80 bg-background/90 hover:border-foreground/30 transition-all duration-300 space-y-6 flex flex-col justify-between h-full shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-foreground text-background flex items-center justify-center">
                      {getIcon(service.icon)}
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground">
                    {service.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-border/60">
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    Key Highlights
                  </div>
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-xs text-foreground/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-foreground mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

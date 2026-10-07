"use client";

import {
  Layout,
  Server,
  Sparkles,
  Zap,
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

export function ServicesList() {
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
    <section id="services-list" className="py-16 sm:py-24 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeader
          badge="Specialized Offerings"
          title="Engineering Services & Architecture"
          description="High-standard development solutions engineered for reliability, security, and developer ergonomics."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <FadeIn key={service.id} delay={idx * 0.1}>
              <div className="p-8 sm:p-10 rounded-3xl border border-border/80 bg-background/90 hover:border-foreground/30 transition-all duration-300 space-y-8 flex flex-col justify-between h-full shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-foreground text-background flex items-center justify-center">
                      {getIcon(service.icon)}
                    </div>
                    <span className="font-mono text-sm text-muted-foreground font-semibold">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold text-foreground tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-4 pt-6 border-t border-border/60">
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    Capabilities Included
                  </div>
                  <ul className="space-y-2.5">
                    {service.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-sm text-foreground/90">
                        <CheckCircle2 className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 pt-4 border-t border-dashed border-border/60">
                    <span className="text-xs font-mono text-muted-foreground block mb-1">
                      Deliverables:
                    </span>
                    <p className="text-xs text-foreground font-medium">
                      {service.deliverables}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

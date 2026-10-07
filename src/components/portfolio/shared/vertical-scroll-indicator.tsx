"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

interface SectionWaypoint {
  id: string;
  label: string;
  shortLabel: string;
  number: string;
}

// Preset sections per known public routes
const ROUTE_SECTIONS: Record<string, SectionWaypoint[]> = {
  "/": [
    { id: "hero", label: "Overview", shortLabel: "Hero", number: "01" },
    { id: "projects", label: "Selected Works", shortLabel: "Works", number: "02" },
    { id: "services", label: "Capabilities", shortLabel: "Services", number: "03" },
    { id: "contributions", label: "Git & Activity", shortLabel: "Activity", number: "04" },
    { id: "contact", label: "Collaboration", shortLabel: "Contact", number: "05" },
  ],
  "/about": [
    { id: "about-hero", label: "Profile", shortLabel: "Profile", number: "01" },
    { id: "story", label: "Philosophy", shortLabel: "Story", number: "02" },
    { id: "experience", label: "Timeline", shortLabel: "Career", number: "03" },
    { id: "skills", label: "Toolkit", shortLabel: "Skills", number: "04" },
    { id: "contact", label: "Collaboration", shortLabel: "Contact", number: "05" },
  ],
  "/services": [
    { id: "services-list", label: "Offerings", shortLabel: "Offerings", number: "01" },
    { id: "process", label: "Workflow", shortLabel: "Process", number: "02" },
    { id: "contact", label: "Collaboration", shortLabel: "Contact", number: "03" },
  ],
};

export function VerticalScrollIndicator() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 30,
    restDelta: 0.001,
  });

  const [percent, setPercent] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [sections, setSections] = useState<SectionWaypoint[]>([]);

  // Update dynamic sections according to route or DOM inspection
  useEffect(() => {
    const predefined = ROUTE_SECTIONS[pathname];
    if (predefined && predefined.length > 0) {
      setSections(predefined);
      setActiveSection(predefined[0].id);
      return;
    }

    // Fallback: discover sections with id inside main
    const foundSections: SectionWaypoint[] = [];
    const elements = document.querySelectorAll<HTMLElement>("main section[id]");
    elements.forEach((el, index) => {
      const id = el.id;
      const heading = el.querySelector("h1, h2, h3")?.textContent?.trim() || id;
      foundSections.push({
        id,
        label: heading,
        shortLabel: heading.slice(0, 10),
        number: String(index + 1).padStart(2, "0"),
      });
    });

    if (foundSections.length > 0) {
      setSections(foundSections);
      setActiveSection(foundSections[0].id);
    } else {
      setSections([]);
    }
  }, [pathname]);

  // Track live percentage and active section on scroll
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1200);

      // Percentage calculation
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = Math.min(
          100,
          Math.max(0, Math.round((window.scrollY / totalScroll) * 100))
        );
        setPercent(currentProgress);
      }

      // Detect active section based on proximity to center of viewport
      if (sections.length > 0) {
        const scrollPosition = window.scrollY + 120;
        let currentActive = sections[0].id;

        for (const sec of sections) {
          const el = document.getElementById(sec.id);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top - 80 && scrollPosition < top + height - 80) {
              currentActive = sec.id;
              break;
            } else if (scrollPosition >= top - 80) {
              currentActive = sec.id;
            }
          }
        }
        setActiveSection(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [sections]);

  // Smooth scroll to section
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const navbarOffset = 70; // 64px navbar + breathing room
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }, []);

  // Smooth scroll to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const activeSectionInfo = useMemo(() => {
    return sections.find((s) => s.id === activeSection) || sections[0];
  }, [sections, activeSection]);

  const hasWaypoints = sections.length > 0;

  return (
    <>
      {/* ── 1. Desktop & Tablet Floating Vertical HUD Indicator ── */}
      <aside
        aria-label="Page scroll progress navigation"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed right-3 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center transition-all duration-300 ${
          isHovered || isScrolling ? "opacity-100 scale-100" : "opacity-60 hover:opacity-100"
        }`}
      >
        <div className="relative flex flex-col items-center py-3 px-2 rounded-full border border-border/80 bg-background/80 dark:bg-card/80 backdrop-blur-xl shadow-lg transition-shadow hover:shadow-2xl hover:border-foreground/30">
          {/* A. Top: Percentage Monospace Display */}
          <div className="mb-2 flex flex-col items-center">
            <span className="font-mono text-[10px] font-bold text-foreground tracking-tighter">
              {percent}
              <span className="text-[8px] text-muted-foreground">%</span>
            </span>
          </div>

          {/* B. Center: Continuous Vertical Track & Waypoint Nodes */}
          <div className="relative flex flex-col items-center justify-between py-2 min-h-[160px]">
            {/* The background groove */}
            <div className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-[2px] bg-border/60 dark:bg-muted/50 rounded-full" />

            {/* The active progress spring fill bar */}
            <motion.div
              style={{ scaleY: smoothProgress, transformOrigin: "top" }}
              className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-[2px] bg-foreground dark:bg-foreground rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            />

            {/* Waypoint Nodes (when section waypoints exist) */}
            {hasWaypoints ? (
              sections.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <div key={sec.id} className="relative group py-1.5 my-0.5 z-10 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      className="relative p-1 flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                      aria-label={`Scroll to ${sec.label}`}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="activeVerticalIndicator"
                          className="w-2 h-4 rounded-full bg-foreground shadow-[0_0_10px_rgba(0,0,0,0.3)] dark:shadow-[0_0_12px_rgba(255,255,255,0.6)] ring-2 ring-background transition-all"
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 group-hover:bg-foreground group-hover:scale-150 transition-all duration-200" />
                      )}
                    </button>

                    {/* Left Flying Tooltip / Label */}
                    <div className="absolute right-full mr-3.5 pointer-events-none opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out z-50">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono bg-foreground text-background shadow-xl border border-border/40 whitespace-nowrap">
                        <span className="font-bold opacity-75">{sec.number}</span>
                        <span className="w-1 h-1 rounded-full bg-background/50" />
                        <span className="font-medium tracking-tight uppercase">{sec.label}</span>
                        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-foreground rotate-45 border-t border-r border-border/40" />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-28 w-1" />
            )}
          </div>

          {/* C. Bottom: Scroll to Top Quick Button */}
          <AnimatePresence>
            {percent > 8 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.6, y: 6 }}
                transition={{ duration: 0.2 }}
                className="mt-2 group relative"
              >
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="w-6 h-6 rounded-full bg-muted/80 hover:bg-foreground hover:text-background text-muted-foreground flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                  aria-label="Back to top"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>

                {/* Tooltip */}
                <div className="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out z-50">
                  <div className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-foreground text-background shadow-lg whitespace-nowrap">
                    Back to Top
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>

      {/* ── 2. Mobile Minimal Edge Progress Strip (Right Edge) ── */}
      <div
        aria-hidden="true"
        className="fixed top-0 right-0 bottom-0 w-[3px] z-50 pointer-events-none md:hidden bg-border/20"
      >
        <motion.div
          style={{ scaleY: smoothProgress, transformOrigin: "top" }}
          className="w-full h-full bg-foreground"
        />
      </div>

      {/* ── 3. Mobile Floating Mini Pill (Bottom Right when scrolling) ── */}
      <AnimatePresence>
        {percent > 10 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-5 right-4 z-40 md:hidden flex items-center gap-1.5 pl-3 pr-1.5 py-1.5 rounded-full border border-border/80 bg-background/90 backdrop-blur-md shadow-lg text-[11px] font-mono text-foreground"
          >
            {activeSectionInfo && (
              <span className="font-semibold text-muted-foreground">
                {activeSectionInfo.number}
              </span>
            )}
            <span className="text-muted-foreground">•</span>
            <span className="font-bold">{percent}%</span>

            <button
              type="button"
              onClick={scrollToTop}
              className="ml-1 p-1 rounded-full bg-muted text-foreground hover:bg-foreground hover:text-background transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

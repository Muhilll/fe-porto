"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

export function AmbientBackground() {
  const [mounted, setMounted] = useState(false);

  // Smooth mouse coordinates for cursor illumination
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springConfig = { damping: 25, stiffness: 180, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Dark mode luminescent spotlight
  const darkSpotlight = useMotionTemplate`radial-gradient(650px circle at ${smoothX}px ${smoothY}px, rgba(120, 119, 198, 0.16), rgba(99, 102, 241, 0.08) 40%, transparent 80%)`;

  // Light mode iridescent luminescent spotlight (NO bleached white, provides colorful subtle glass refraction)
  const lightSpotlight = useMotionTemplate`radial-gradient(650px circle at ${smoothX}px ${smoothY}px, rgba(99, 102, 241, 0.11), rgba(14, 165, 233, 0.07) 35%, transparent 75%)`;

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Base Subtle Soft Slate-Porcelain Ambient Wash (Light Mode Only) */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100/70 via-background/40 to-slate-100/60 dark:from-transparent dark:to-transparent" />

      {/* 2. Top Multi-Stop Aurora Mesh (Vibrant yet Soft Atmosphere) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[1100px] h-[650px] rounded-full bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(99,102,241,0.18)_0%,rgba(56,189,248,0.14)_35%,rgba(168,85,247,0.08)_65%,transparent_90%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(120,119,198,0.26)_0%,rgba(99,102,241,0.16)_35%,rgba(56,189,248,0.09)_65%,transparent_90%)] blur-[110px]" />

      {/* 3. Floating Aurora Side Orbs */}
      {/* Top Left: Lavender / Violet */}
      <div className="absolute -top-24 -left-24 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.13)_0%,rgba(99,102,241,0.06)_50%,transparent_75%)] dark:bg-[radial-gradient(circle,rgba(99,102,241,0.18)_0%,transparent_70%)] blur-[100px]" />

      {/* Top Right: Sky Blue / Cyan */}
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.14)_0%,rgba(6,182,212,0.07)_50%,transparent_75%)] dark:bg-[radial-gradient(circle,rgba(56,189,248,0.15)_0%,transparent_70%)] blur-[100px]" />

      {/* 4. Architectural Tech Blueprint Grid (Major 112px Grid Lines) */}
      <div
        className="absolute inset-0 bg-[size:112px_112px] bg-[linear-gradient(to_right,rgba(51,65,85,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(51,65,85,0.055)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(160,170,210,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(160,170,210,0.12)_1px,transparent_1px)]"
        style={{
          maskImage: "radial-gradient(ellipse 90% 80% at 50% 30%, black 25%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 30%, black 25%, transparent 85%)",
        }}
      />

      {/* 5. Architectural Dot Matrix Overlay (Precision 28px Tech Dots) */}
      <div
        className="absolute inset-0 bg-[radial-gradient(rgba(51,65,85,0.13)_1.2px,transparent_1.2px)] bg-[size:28px_28px] dark:bg-[radial-gradient(rgba(148,163,184,0.15)_1px,transparent_1px)]"
        style={{
          maskImage: "radial-gradient(ellipse 85% 75% at 50% 28%, black 35%, transparent 92%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 75% at 50% 28%, black 35%, transparent 92%)",
        }}
      />

      {/* 6. Soft Side Vignette Masking (Prevents harsh edges on ultra-wide screens) */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent opacity-80" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent opacity-80" />

      {/* 7. Interactive Iridescent Luminescent Cursor Spotlight */}
      {mounted && (
        <>
          <motion.div
            className="hidden md:block absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-300"
            style={{ background: darkSpotlight }}
          />
          <motion.div
            className="hidden md:block absolute inset-0 opacity-100 dark:opacity-0 transition-opacity duration-300"
            style={{ background: lightSpotlight }}
          />
        </>
      )}

      {/* 8. Bottom Atmospheric Anchor Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[850px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.09)_0%,rgba(99,102,241,0.06)_50%,transparent_75%)] dark:bg-[radial-gradient(circle,rgba(99,102,241,0.14)_0%,transparent_70%)] blur-[105px]" />
    </div>
  );
}

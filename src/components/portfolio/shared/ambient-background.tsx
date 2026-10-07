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

  const darkSpotlight = useMotionTemplate`radial-gradient(650px circle at ${smoothX}px ${smoothY}px, rgba(120, 119, 198, 0.12), transparent 80%)`;
  const lightSpotlight = useMotionTemplate`radial-gradient(550px circle at ${smoothX}px ${smoothY}px, rgba(0, 0, 0, 0.04), transparent 80%)`;

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
      {/* 1. Top Radiant Ambient Glow (Inspired by modern dark mode spotlights) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.18)_0%,rgba(147,130,255,0.1)_35%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.22)_0%,rgba(99,102,241,0.12)_40%,transparent_70%)] blur-[90px]" />

      {/* 2. Side Ambient Aura Fades (Direct from luluuu.vercel.app reference) */}
      <div className="absolute left-0 top-0 bottom-0 w-[45%] bg-gradient-to-r from-muted/40 via-muted/15 to-transparent dark:from-indigo-950/25 dark:via-gray-900/40 dark:to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-[45%] bg-gradient-to-l from-muted/40 via-muted/15 to-transparent dark:from-indigo-950/25 dark:via-gray-900/40 dark:to-transparent" />
      <div className="absolute inset-0 w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-muted/10 to-transparent dark:via-indigo-950/15" />

      {/* 3. Left Wing Grid Overlay (100px x 100px with smooth directional mask) */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[45%] bg-[size:100px_100px] bg-[linear-gradient(to_right,rgba(140,150,170,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(140,150,170,0.15)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(160,170,210,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(160,170,210,0.22)_1px,transparent_1px)]"
        style={{
          maskImage: "linear-gradient(to right, black 50%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to right, black 50%, transparent 95%)",
        }}
      />

      {/* 4. Right Wing Grid Overlay (100px x 100px with smooth directional mask) */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[45%] bg-[size:100px_100px] bg-[linear-gradient(to_right,rgba(140,150,170,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(140,150,170,0.15)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(160,170,210,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(160,170,210,0.22)_1px,transparent_1px)]"
        style={{
          maskImage: "linear-gradient(to left, black 50%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to left, black 50%, transparent 95%)",
        }}
      />

      {/* 5. Center Subtle Continuous Grid Overlay (Ensures middle is not empty) */}
      <div
        className="absolute inset-0 bg-[size:80px_80px] bg-[linear-gradient(to_right,rgba(120,130,150,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,130,150,0.08)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(200,210,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(200,210,255,0.1)_1px,transparent_1px)]"
        style={{
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 85%)",
        }}
      />

      {/* 6. Interactive Cursor Spotlight on Desktop */}
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

      {/* 7. Bottom Ambient Light Depth */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[700px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.1)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(99,102,241,0.12)_0%,transparent_70%)] blur-[90px]" />
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

function Chart({ options = {}, series = [], type = "line", height = 320, width = "100%", className = "" }) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? (theme === 'system' ? systemTheme : theme) === 'dark' ? 'dark' : 'light' : 'light';

  const defaultOptions = {
    ...options,
    chart: {
      toolbar: { show: true },
      fontFamily: "var(--font-sans), Inter, sans-serif",
      background: "transparent",
      animations: { enabled: true, speed: 600 },
      foreColor: currentTheme === 'dark' ? '#94a3b8' : '#64748b',
      ...(options.chart || {}),
    },
    theme: { mode: currentTheme, ...(options.theme || {}) },
    grid: { 
      borderColor: currentTheme === 'dark' ? 'oklch(0.35 0.03 260)' : '#f1f5f9', 
      strokeDashArray: 4,
      ...(options.grid || {})
    },
    tooltip: { theme: currentTheme, ...(options.tooltip || {}) },
  };

  return (
    <div className={className}>
      <ApexChart
        options={defaultOptions}
        series={series}
        type={type}
        height={height}
        width={width}
      />
    </div>
  );
}

export { Chart };

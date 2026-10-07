"use client";

import { useState, useEffect } from "react";
import { ContributionData } from "@/types/portfolio";
import { contributionData as fallbackData, generateMockCalendarWeeks } from "@/data/contributions";
import { CalendarDay, LiveGithubResult } from "@/services/github";

export function useGithubContributions(initialUsername?: string) {
  const [data, setData] = useState<ContributionData>({
    ...fallbackData,
    githubUsername: initialUsername || process.env.NEXT_PUBLIC_GITHUB_USERNAME || "Muhilll",
    githubUrl: `https://github.com/${initialUsername || process.env.NEXT_PUBLIC_GITHUB_USERNAME || "Muhilll"}`,
  });
  const [weeks, setWeeks] = useState<CalendarDay[][]>([]);
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Generate initial weeks for instantaneous UI rendering
    setWeeks(generateMockCalendarWeeks());

    let isMounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const url = initialUsername
          ? `/api/github/contributions?username=${encodeURIComponent(initialUsername)}`
          : "/api/github/contributions";

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Failed to load GitHub data (${res.status})`);
        }

        const json: LiveGithubResult = await res.json();
        if (isMounted) {
          setData(json.data);
          if (json.weeks && json.weeks.length > 0) {
            setWeeks(json.weeks);
          }
          setIsLive(json.isLive);
          setError(null);
        }
      } catch (err: any) {
        console.warn("Using fallback contribution data:", err.message);
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [initialUsername]);

  return {
    data,
    weeks,
    isLive,
    isLoading,
    error,
  };
}

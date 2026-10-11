"use client";

import { useState, useEffect } from "react";
import { ContributionData } from "@/types/portfolio";
import { contributionData as fallbackData, generateMockCalendarWeeks } from "@/data/contributions";
import { CalendarDay, LiveGithubResult } from "@/services/github";
import { useProfile } from "@/features/portfolio/profile/hooks/use-profile";

export function useGithubContributions(initialUsername?: string) {
  const { data: profile, isLoading: isProfileLoading } = useProfile();

  const profileGithub = profile?.github;
  const profileUsername = profileGithub
    ? profileGithub.replace(/^https?:\/\/(www\.)?github\.com\//i, "").replace(/\/+$/, "").trim()
    : undefined;

  const targetUsername =
    initialUsername ||
    profileUsername ||
    process.env.NEXT_PUBLIC_GITHUB_USERNAME ||
    "Muhilll";

  const [data, setData] = useState<ContributionData>({
    ...fallbackData,
    githubUsername: targetUsername,
    githubUrl: `https://github.com/${targetUsername}`,
  });
  const [weeks, setWeeks] = useState<CalendarDay[][]>([]);
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If waiting for profile to resolve targetUsername without initialUsername provided
    if (!initialUsername && isProfileLoading) {
      return;
    }

    let isMounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const url = `/api/github/contributions?username=${encodeURIComponent(targetUsername)}`;

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Failed to load GitHub data (${res.status})`);
        }

        const json: LiveGithubResult = await res.json();
        if (isMounted) {
          setData(json.data);
          if (json.weeks && json.weeks.length > 0) {
            setWeeks(json.weeks);
          } else {
            setWeeks(generateMockCalendarWeeks());
          }
          setIsLive(json.isLive);
          setError(null);
        }
      } catch (err: any) {
        console.warn("Using fallback contribution data:", err.message);
        if (isMounted) {
          setData({
            ...fallbackData,
            githubUsername: targetUsername,
            githubUrl: `https://github.com/${targetUsername}`,
          });
          setWeeks(generateMockCalendarWeeks());
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
  }, [targetUsername, initialUsername, isProfileLoading]);

  return {
    data,
    weeks,
    isLive,
    isLoading,
    error,
  };
}

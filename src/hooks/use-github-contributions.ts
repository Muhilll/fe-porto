"use client";

import { useState, useEffect } from "react";
import { ContributionData } from "@/types/portfolio";
import { contributionData as fallbackData, generateMockCalendarWeeks } from "@/data/contributions";
import { CalendarDay, LiveGithubResult } from "@/services/github";
import { useProfile } from "@/features/portfolio/profile/hooks/use-profile";

// In-flight promise & cached response deduplication to avoid multiple simultaneous requests
let cachedGithubResult: Record<string, LiveGithubResult> = {};
let inFlightGithubPromises: Record<string, Promise<LiveGithubResult>> = {};

async function fetchDedupedGithubContributions(username: string): Promise<LiveGithubResult> {
  if (cachedGithubResult[username]) {
    return cachedGithubResult[username];
  }
  if (!inFlightGithubPromises[username]) {
    inFlightGithubPromises[username] = fetch(`/api/github/contributions?username=${encodeURIComponent(username)}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to load GitHub data (${res.status})`);
        }
        return res.json();
      })
      .then((json: LiveGithubResult) => {
        cachedGithubResult[username] = json;
        delete inFlightGithubPromises[username];
        return json;
      })
      .catch((err) => {
        delete inFlightGithubPromises[username];
        throw err;
      });
  }
  return inFlightGithubPromises[username];
}

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

  const [data, setData] = useState<ContributionData>(() => {
    if (cachedGithubResult[targetUsername]) {
      return cachedGithubResult[targetUsername].data;
    }
    return {
      ...fallbackData,
      githubUsername: targetUsername,
      githubUrl: `https://github.com/${targetUsername}`,
    };
  });

  const [weeks, setWeeks] = useState<CalendarDay[][]>(() => {
    if (cachedGithubResult[targetUsername]?.weeks) {
      return cachedGithubResult[targetUsername].weeks;
    }
    return [];
  });

  const [isLive, setIsLive] = useState<boolean>(() => {
    return Boolean(cachedGithubResult[targetUsername]?.isLive);
  });

  const [isLoading, setIsLoading] = useState<boolean>(() => {
    return !cachedGithubResult[targetUsername];
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedGithubResult[targetUsername]) {
      setData(cachedGithubResult[targetUsername].data);
      if (cachedGithubResult[targetUsername].weeks?.length) {
        setWeeks(cachedGithubResult[targetUsername].weeks);
      }
      setIsLive(cachedGithubResult[targetUsername].isLive);
      setIsLoading(false);
      return;
    }

    // If waiting for profile to resolve targetUsername without initialUsername provided
    if (!initialUsername && isProfileLoading) {
      return;
    }

    let isMounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const json = await fetchDedupedGithubContributions(targetUsername);

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

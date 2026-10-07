import { ContributionData } from "@/types/portfolio";

export const contributionData: ContributionData = {
  githubUsername: "zailyanzali",
  githubUrl: "https://github.com",
  totalContributionsLastYear: 1428,
  currentStreakDays: 34,
  longestStreakDays: 92,
  totalPullRequests: 186,
  totalStarsEarned: 460,
  topLanguages: [
    { name: "TypeScript", percentage: 56.4, color: "#3178c6" },
    { name: "JavaScript", percentage: 21.8, color: "#f7df1e" },
    { name: "HTML / CSS", percentage: 12.5, color: "#e34c26" },
    { name: "SQL", percentage: 5.8, color: "#e38c00" },
    { name: "Shell / Dockerfile", percentage: 3.5, color: "#89e051" },
  ],
  repositories: [
    {
      name: "porto-monorepo-starter",
      description: "Clean enterprise-grade starter with Next.js 15, Hono Bun backend, RBAC, and Drizzle ORM.",
      language: "TypeScript",
      languageColor: "#3178c6",
      stars: 184,
      forks: 39,
      url: "https://github.com",
      updatedAt: "Updated 2 days ago",
    },
    {
      name: "hono-drizzle-auth-kit",
      description: "Lightweight JWT authentication and role-based middleware for Hono on edge runtimes.",
      language: "TypeScript",
      languageColor: "#3178c6",
      stars: 128,
      forks: 24,
      url: "https://github.com",
      updatedAt: "Updated last week",
    },
    {
      name: "hyper-motion-primitives",
      description: "Reusable Framer Motion components designed for minimal architectural web designs.",
      language: "TypeScript",
      languageColor: "#3178c6",
      stars: 87,
      forks: 15,
      url: "https://github.com",
      updatedAt: "Updated 3 weeks ago",
    },
    {
      name: "mysql-migration-toolkit",
      description: "CLI utility for safe schema diffing, automated seeds, and rollback verification.",
      language: "JavaScript",
      languageColor: "#f7df1e",
      stars: 61,
      forks: 8,
      url: "https://github.com",
      updatedAt: "Updated last month",
    },
  ],
};

// Generates 52 weeks x 7 days realistic commit matrix
export function generateMockCalendarWeeks(): { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[][] {
  const weeks: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[][] = [];
  const today = new Date();
  
  // Total 52 weeks
  for (let w = 51; w >= 0; w--) {
    const days: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[] = [];
    for (let d = 6; d >= 0; d--) {
      const date = new Date(today);
      date.setDate(today.getDate() - (w * 7 + d));
      
      const dayOfWeek = date.getDay(); // 0 is Sunday
      // Realistic distribution: more active on weekdays, lighter on weekends
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const seed = Math.sin((w * 7 + d) * 0.45) * 10000;
      const rand = Math.abs(seed - Math.floor(seed));
      
      let count = 0;
      let level: 0 | 1 | 2 | 3 | 4 = 0;

      if (isWeekend) {
        if (rand > 0.6) {
          count = Math.floor(rand * 3) + 1;
          level = 1;
        }
      } else {
        if (rand > 0.15) {
          count = Math.floor(rand * 9) + 1;
          if (count <= 2) level = 1;
          else if (count <= 4) level = 2;
          else if (count <= 7) level = 3;
          else level = 4;
        }
      }

      days.push({
        date: date.toISOString().split("T")[0],
        count,
        level,
      });
    }
    weeks.push(days);
  }

  return weeks;
}

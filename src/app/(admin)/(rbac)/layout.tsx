"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserNavigation } from "@/features/rbac/user/hooks/use-user";
import type { NavigationItem } from "@/features/rbac/user/types";

function extractPaths(items: NavigationItem[]): string[] {
  let paths: string[] = [];
  for (const item of items) {
    if (item.path && item.permissions?.can_read) {
      paths.push(item.path);
    }
    if (item.children && item.children.length > 0) {
      paths.push(...extractPaths(item.children));
    }
  }
  return paths;
}

export default function RbacLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: navItems = [], isLoading } = useUserNavigation();

  useEffect(() => {
    if (!isLoading) {
      const allowedPaths = extractPaths(navItems);
      // Remove trailing slashes for comparison if any
      const normalizedPathname = pathname.replace(/\/$/, "");
      const isAllowed = allowedPaths.some(
        (p) => normalizedPathname === p.replace(/\/$/, "")
      );

      if (!isAllowed) {
        router.replace("/dashboard");
      }
    }
  }, [isLoading, navItems, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <span className="size-8 border-[3px] border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const allowedPaths = extractPaths(navItems);
  const normalizedPathname = pathname.replace(/\/$/, "");
  const isAllowed = allowedPaths.some(
    (p) => normalizedPathname === p.replace(/\/$/, "")
  );

  if (!isAllowed) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <span className="size-8 border-[3px] border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

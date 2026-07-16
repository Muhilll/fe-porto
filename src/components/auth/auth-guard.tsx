"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/use-auth";

/**
 * Auth guard wrapper — protects routes that require authentication.
 * - On mount: hydrates auth state from localStorage
 * - If no token found: redirects to /auth/login
 * - While checking: shows a loading spinner
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [mounted, isAuthenticated, router]);

  // To prevent hydration mismatch, return null on initial render (server)
  if (!mounted) {
    return null;
  }

  // If client is mounted but not authenticated, wait for router redirect
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-3">
          <span className="size-8 border-[3px] border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

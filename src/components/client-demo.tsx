"use client";

import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/stores/use-store";
import { Button } from "@/components/ui/button";

export function ClientDemo() {
  const { count, increment, decrement, reset } = useStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://api.github.com/repos/shadcn-ui/ui").then((res) =>
        res.json()
      ),
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-8 bg-background text-foreground">
      <div className="flex flex-col items-center gap-4 p-8 border rounded-xl shadow-sm bg-card w-full max-w-md">
        <h2 className="text-2xl font-bold">Zustand Counter</h2>
        <div className="text-4xl font-mono">{count}</div>
        <div className="flex gap-2">
          <Button onClick={decrement} variant="outline">-</Button>
          <Button onClick={reset} variant="secondary">Reset</Button>
          <Button onClick={increment}>+</Button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-8 border rounded-xl shadow-sm bg-card w-full max-w-md">
        <h2 className="text-2xl font-bold">TanStack Query</h2>
        {isLoading ? (
          <div>Loading Shadcn-UI repo data...</div>
        ) : isError ? (
          <div className="text-destructive">Error loading data</div>
        ) : (
          <div className="text-center">
            <p className="font-semibold text-lg">{data?.full_name}</p>
            <p className="text-muted-foreground">{data?.description}</p>
            <div className="mt-4 flex gap-4 justify-center">
              <span className="flex items-center gap-1">⭐ {data?.stargazers_count}</span>
              <span className="flex items-center gap-1">🍴 {data?.forks_count}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Placeholder,
  PlaceholderShimmer,
  SkeletonText,
  SkeletonCard,
  SkeletonAvatar,
  SkeletonListItem,
} from "@/components/ui/placeholder";
import { Spinner } from "@/components/ui/spinner";

function DemoCard({ title, description, children, span2 = false }) {
  return (
    <div className={`p-6 bg-card border border-border rounded-xl shadow-sm ${span2 ? "lg:col-span-2" : ""}`}>
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}
      {children}
    </div>
  );
}

/* Simulated loading toggle */
function LoadingToggle({ children, skeleton }) {
  const [loading, setLoading] = useState(true);
  return (
    <div className="space-y-3">
      <button
        onClick={() => setLoading((p) => !p)}
        className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-muted transition-colors"
      >
        {loading ? "Show Loaded Content" : "Show Skeleton"}
      </button>
      {loading ? skeleton : children}
    </div>
  );
}

export default function PlaceholderPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Placeholders</h1>
        <p className="text-muted-foreground">
          Skeleton loading screens to represent content before it finishes loading — reduces perceived load time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Basic Placeholders */}
        <DemoCard title="Basic Placeholders" description="Simple block placeholders in various sizes.">
          <div className="space-y-3">
            <Placeholder size="xs" className="w-full" />
            <Placeholder size="sm" className="w-5/6" />
            <Placeholder size="default" className="w-4/5" />
            <Placeholder size="lg" className="w-3/4" />
            <Placeholder size="xl" className="w-2/3" />
          </div>
        </DemoCard>

        {/* Color Variants */}
        <DemoCard title="Color Variants" description="Placeholders in different color shades.">
          <div className="space-y-3">
            {[
              ["default", "Default (gray-200)"],
              ["light",   "Light"],
              ["dark",    "Dark (gray-400)"],
              ["blue",    "Blue"],
              ["green",   "Green"],
              ["red",     "Red"],
              ["yellow",  "Yellow"],
              ["purple",  "Purple"],
            ].map(([color, label]) => (
              <div key={color} className="flex items-center gap-3">
                <Placeholder color={color} className="flex-1" />
                <span className="text-xs text-muted-foreground w-28 shrink-0">{label}</span>
              </div>
            ))}
          </div>
        </DemoCard>

        {/* Shimmer Effect */}
        <DemoCard title="Shimmer Effect" description="Gradient sweep animation for a more dynamic skeleton.">
          <div className="space-y-3">
            <PlaceholderShimmer height="h-5" width="w-3/4" />
            <PlaceholderShimmer height="h-4" width="w-full" />
            <PlaceholderShimmer height="h-4" width="w-5/6" />
            <PlaceholderShimmer height="h-4" width="w-4/6" />
            <PlaceholderShimmer height="h-8" width="w-24" rounded="rounded-lg" />
          </div>
        </DemoCard>

        {/* Rounded / Pill Placeholders */}
        <DemoCard title="Rounded & Pill Shapes" description="Circular and pill-shaped placeholders.">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {[
                ["size-8",  "XS"],
                ["size-10", "SM"],
                ["size-12", "MD"],
                ["size-16", "LG"],
                ["size-20", "XL"],
              ].map(([sz, label]) => (
                <div key={sz} className="flex flex-col items-center gap-1.5">
                  <Placeholder className={sz} rounded="full" />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 pt-2 border-t border-border">
              <Placeholder className="w-24 h-6 rounded-full" />
              <Placeholder className="w-32 h-6 rounded-full" color="blue" />
              <Placeholder className="w-20 h-6 rounded-full" color="green" />
            </div>
          </div>
        </DemoCard>

        {/* Skeleton Text */}
        <DemoCard title="Skeleton Text" description="Multi-line text skeleton with natural width variation.">
          <div className="space-y-5">
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">3 Lines</p>
              <SkeletonText lines={3} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">5 Lines</p>
              <SkeletonText lines={5} />
            </div>
          </div>
        </DemoCard>

        {/* Skeleton List */}
        <DemoCard title="Skeleton List" description="Avatar + text skeleton for activity or message lists.">
          <div className="divide-y divide-border">
            {[...Array(5)].map((_, i) => (
              <SkeletonListItem key={i} />
            ))}
          </div>
        </DemoCard>

        {/* Skeleton Cards */}
        <DemoCard title="Skeleton Cards" description="Full card skeleton with image, title, body, and buttons.">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SkeletonCard showImage lines={2} />
            <SkeletonCard showImage={false} lines={4} />
          </div>
        </DemoCard>

        {/* Skeleton Profile */}
        <DemoCard title="Skeleton Profile" description="A composite profile card skeleton.">
          <div className="border border-border rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-4">
              <SkeletonAvatar size="size-16" />
              <div className="flex-1 space-y-2">
                <Placeholder className="w-1/2 h-4" />
                <Placeholder className="w-1/3 h-3" />
                <Placeholder className="w-20 h-5 rounded-full" />
              </div>
            </div>
            <SkeletonText lines={3} />
            <div className="grid grid-cols-3 gap-3 pt-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <Placeholder className="w-10 h-5 mx-auto" />
                  <Placeholder className="w-full h-3" />
                </div>
              ))}
            </div>
          </div>
        </DemoCard>

        {/* Skeleton Table */}
        <DemoCard span2 title="Skeleton Table" description="Table skeleton for data-heavy admin views.">
          <div className="border border-border rounded-xl overflow-hidden">
            {/* Header */}
            <div className="bg-muted px-4 py-3 grid grid-cols-5 gap-4 border-b border-border">
              {["w-12", "w-20", "w-24", "w-16", "w-14"].map((w, i) => (
                <Placeholder key={i} className={`${w} h-3`} color="dark" />
              ))}
            </div>
            {/* Rows */}
            {[...Array(6)].map((_, row) => (
              <div key={row} className="px-4 py-3.5 grid grid-cols-5 gap-4 items-center border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <SkeletonAvatar size="size-7" />
                </div>
                <Placeholder className="w-full h-3" />
                <Placeholder className={`${row % 2 === 0 ? "w-20" : "w-16"} h-5 rounded-full`} />
                <Placeholder className="w-12 h-3" />
                <div className="flex gap-1.5">
                  <Placeholder className="w-8 h-6 rounded-md" />
                  <Placeholder className="w-8 h-6 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </DemoCard>

        {/* Loading Toggle Demo */}
        <DemoCard span2 title="Skeleton → Content Toggle" description="Simulate loading state. Click to toggle between skeleton and real content.">
          <LoadingToggle
            skeleton={
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border border-border rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <SkeletonAvatar size="size-10" />
                      <div className="flex-1 space-y-1.5">
                        <Placeholder className="w-1/2 h-3.5" />
                        <Placeholder className="w-2/3 h-3" />
                      </div>
                    </div>
                    <SkeletonText lines={2} />
                    <Placeholder className="w-20 h-7 rounded-lg" />
                  </div>
                ))}
              </div>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: "Alex Johnson", role: "UI Designer", msg: "Sent you a new design file.", color: "b6e3f4" },
                { name: "Jane Doe", role: "Backend Dev", msg: "API is ready for integration.", color: "c0aede" },
                { name: "Bob Smith", role: "PM", msg: "Meeting moved to 4pm today.", color: "d1d4f9" },
              ].map(({ name, role, msg, color }) => (
                <div key={name} className="border border-border rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}&backgroundColor=${color}`} className="size-10 rounded-full bg-muted" alt={name} />
                    <div>
                      <p className="text-sm font-semibold">{name}</p>
                      <p className="text-xs text-muted-foreground">{role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{msg}</p>
                  <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-primary-foreground">Reply</button>
                </div>
              ))}
            </div>
          </LoadingToggle>
        </DemoCard>

      </div>
    </div>
  );
}

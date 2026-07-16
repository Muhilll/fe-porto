"use client";

import { Tooltip } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Info, Copy, Trash2, Edit, Share2, Download, Star,
  Heart, Bell, Settings, User, Plus, Check,
} from "lucide-react";

function DemoCard({ title, description, children, span2 = false }) {
  return (
    <div className={`p-6 bg-card border border-border rounded-xl shadow-sm ${span2 ? "lg:col-span-2" : ""}`}>
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}
      {children}
    </div>
  );
}

export default function TooltipsPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Tooltips</h1>
        <p className="text-muted-foreground">
          Contextual text hints that appear on hover to provide additional information about an element.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Placement */}
        <DemoCard title="Placement Variants" description="Tooltips can appear on top, bottom, left, or right.">
          <div className="flex flex-wrap items-center justify-center gap-6 py-8">
            {[
              ["top",    "Tooltip on Top"],
              ["bottom", "Tooltip on Bottom"],
              ["left",   "Tooltip on Left"],
              ["right",  "Tooltip on Right"],
            ].map(([placement, content]) => (
              <Tooltip key={placement} content={content} placement={placement}>
                <button className="px-4 py-2 rounded-lg border border-border text-sm font-medium bg-card hover:bg-muted capitalize transition-colors">
                  {placement}
                </button>
              </Tooltip>
            ))}
          </div>
        </DemoCard>

        {/* Color Variants */}
        <DemoCard title="Color Variants" description="7 color themes for different contexts and emphasis.">
          <div className="flex flex-wrap items-center gap-3 py-4">
            {[
              ["dark",    "Dark tooltip",    "bg-gray-800 text-white"],
              ["light",   "Light tooltip",   "bg-card border border-border text-foreground"],
              ["primary", "Primary tooltip", "bg-blue-600 text-white"],
              ["success", "Success tooltip", "bg-green-600 text-white"],
              ["danger",  "Danger tooltip",  "bg-red-600 text-white"],
              ["warning", "Warning tooltip", "bg-yellow-500 text-white"],
              ["purple",  "Purple tooltip",  "bg-purple-600 text-white"],
            ].map(([color, content, cls]) => (
              <Tooltip key={color} content={content} color={color} placement="top">
                <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-default ${cls}`}>
                  {color}
                </span>
              </Tooltip>
            ))}
          </div>
        </DemoCard>

        {/* On Buttons */}
        <DemoCard title="Tooltips on Buttons" description="Common usage — add context to icon-only or action buttons.">
          <div className="flex flex-wrap items-center gap-3">
            <Tooltip content="Edit this item" placement="top">
              <button className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground transition-colors">
                <Edit className="size-4" />
              </button>
            </Tooltip>
            <Tooltip content="Delete permanently" color="danger" placement="top">
              <button className="p-2 rounded-lg border border-border hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors">
                <Trash2 className="size-4" />
              </button>
            </Tooltip>
            <Tooltip content="Copy to clipboard" color="dark" placement="top">
              <button className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground transition-colors">
                <Copy className="size-4" />
              </button>
            </Tooltip>
            <Tooltip content="Share with team" color="primary" placement="top">
              <button className="p-2 rounded-lg border border-border hover:bg-blue-50 text-muted-foreground transition-colors">
                <Share2 className="size-4" />
              </button>
            </Tooltip>
            <Tooltip content="Download file" color="success" placement="top">
              <button className="p-2 rounded-lg border border-border hover:bg-green-50 text-muted-foreground transition-colors">
                <Download className="size-4" />
              </button>
            </Tooltip>
            <Tooltip content="Mark as favorite" color="warning" placement="top">
              <button className="p-2 rounded-lg border border-border hover:bg-yellow-50 text-muted-foreground transition-colors">
                <Star className="size-4" />
              </button>
            </Tooltip>
          </div>
        </DemoCard>

        {/* On Text / Links */}
        <DemoCard title="Tooltips on Text & Links" description="Inline usage on text, abbreviations, and links.">
          <div className="space-y-4 text-sm text-foreground leading-loose">
            <p>
              Hover over this{" "}
              <Tooltip content="This is a tooltip on inline text" placement="top">
                <span className="underline decoration-dotted cursor-help text-blue-600">underlined text</span>
              </Tooltip>{" "}
              to see a tooltip.
            </p>
            <p>
              <Tooltip content="Application Programming Interface — a way for two apps to communicate." placement="top" color="dark">
                <abbr title="" className="cursor-help no-underline border-b border-dotted border-gray-400 font-medium">API</abbr>
              </Tooltip>{" "}
              stands for Application Programming Interface.{" "}
              <Tooltip content="Representational State Transfer — an architectural style for APIs." placement="top" color="dark">
                <abbr title="" className="cursor-help no-underline border-b border-dotted border-gray-400 font-medium">REST</abbr>
              </Tooltip>{" "}
              is one of the most widely used API styles.
            </p>
            <p>
              Click the{" "}
              <Tooltip content="Opens help documentation in a new tab" placement="right" color="primary">
                <button className="inline-flex items-center gap-1 text-blue-600 hover:underline">
                  <Info className="size-3.5" /> help icon
                </button>
              </Tooltip>{" "}
              for more information.
            </p>
          </div>
        </DemoCard>

        {/* Disabled Tooltip */}
        <DemoCard title="Disabled Tooltip" description="Tooltip can be disabled conditionally.">
          <div className="flex flex-wrap items-center gap-3">
            <Tooltip content="This tooltip is enabled" placement="top">
              <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
                Enabled
              </button>
            </Tooltip>
            <Tooltip content="This will not show" placement="top" disabled>
              <button className="px-4 py-2 rounded-lg border border-border text-sm font-medium opacity-50 cursor-not-allowed bg-card">
                Disabled
              </button>
            </Tooltip>
          </div>
        </DemoCard>

        {/* With Icon in Tooltip */}
        <DemoCard title="Rich Tooltip Content" description="Tooltips can contain longer descriptive text.">
          <div className="flex flex-wrap gap-4 py-4">
            <Tooltip content="Save your current progress. Unsaved changes will be lost." placement="top" color="dark">
              <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
                Save Draft
              </button>
            </Tooltip>
            <Tooltip content="This action cannot be undone. All data will be permanently removed." placement="top" color="danger">
              <button className="px-4 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors">
                Delete Account
              </button>
            </Tooltip>
            <Tooltip content="Your plan includes up to 10 users. Upgrade to add more." placement="top" color="warning">
              <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
                <Plus className="size-4" /> Add User
              </button>
            </Tooltip>
          </div>
        </DemoCard>

        {/* Toolbar Demo */}
        <DemoCard span2 title="Tooltip Toolbar" description="A realistic toolbar with tooltips on every icon button.">
          <div className="flex items-center gap-1 p-2 border border-border rounded-xl bg-muted w-fit flex-wrap">
            {[
              { icon: Edit, label: "Edit",  color: "dark" },
              { icon: Copy, label: "Duplicate", color: "dark" },
              { icon: Share2, label: "Share", color: "primary" },
              { icon: Download, label: "Export", color: "success" },
              { icon: Heart, label: "Favourite", color: "danger" },
              { icon: Star, label: "Star", color: "warning" },
              { icon: Bell, label: "Subscribe", color: "purple" },
              { icon: User, label: "Assign", color: "dark" },
              { icon: Settings, label: "Settings", color: "dark" },
              { icon: Trash2, label: "Delete", color: "danger" },
            ].map(({ icon: Icon, label, color }) => (
              <Tooltip key={label} content={label} placement="top" color={color}>
                <button className="p-2 rounded-lg hover:bg-card hover:shadow-sm text-muted-foreground hover:text-foreground transition-all">
                  <Icon className="size-4" />
                </button>
              </Tooltip>
            ))}
            <div className="w-px h-6 bg-border mx-1" />
            <Tooltip content="All changes saved" placement="top" color="success">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-100 text-green-700 text-xs font-medium">
                <Check className="size-3.5" /> Saved
              </button>
            </Tooltip>
          </div>
        </DemoCard>

      </div>
    </div>
  );
}

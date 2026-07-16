import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Bell, Check, Star, Zap, ShieldCheck, X } from "lucide-react";

const SOLID_COLORS = [
  ["default", "Primary"],
  ["secondary", "Secondary"],
  ["success", "Success"],
  ["danger", "Danger"],
  ["warning", "Warning"],
  ["info", "Info"],
  ["purple", "Purple"],
  ["dark", "Dark"],
];

const SEMANTIC_COLORS = ["default", "success", "danger", "warning", "info", "purple"];

function DemoCard({ title, description, children }) {
  return (
    <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}
      {children}
    </div>
  );
}

export default function BadgesPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Badges</h1>
        <p className="text-muted-foreground">
          Small count and labeling components used to highlight statuses, categories, or counts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Solid Badges */}
        <DemoCard title="Default Badges" description="Solid filled badges in all color variants.">
          <div className="flex flex-wrap gap-2">
            {SOLID_COLORS.map(([variant, label]) => (
              <Badge key={variant} variant={variant}>{label}</Badge>
            ))}
          </div>
        </DemoCard>

        {/* Rounded / Pill Badges */}
        <DemoCard title="Pill Badges" description="Rounded-full pill-shaped badges.">
          <div className="flex flex-wrap gap-2">
            {SOLID_COLORS.map(([variant, label]) => (
              <Badge key={variant} variant={variant} rounded="full">{label}</Badge>
            ))}
          </div>
        </DemoCard>

        {/* Soft Badges */}
        <DemoCard title="Soft Badges" description="Light background with colored text.">
          <div className="flex flex-wrap gap-2">
            {SEMANTIC_COLORS.map((color) => (
              <Badge key={color} variant={`soft-${color}`} className="capitalize">{color}</Badge>
            ))}
            <Badge variant="soft-secondary">Secondary</Badge>
          </div>
        </DemoCard>

        {/* Soft Pill Badges */}
        <DemoCard title="Soft Pill Badges" description="Soft color + pill shape combined.">
          <div className="flex flex-wrap gap-2">
            {SEMANTIC_COLORS.map((color) => (
              <Badge key={color} variant={`soft-${color}`} rounded="full" className="capitalize">{color}</Badge>
            ))}
            <Badge variant="soft-secondary" rounded="full">Secondary</Badge>
          </div>
        </DemoCard>

        {/* Outline Badges */}
        <DemoCard title="Outline Badges" description="Border-only badges with no background.">
          <div className="flex flex-wrap gap-2">
            {SEMANTIC_COLORS.map((color) => (
              <Badge key={color} variant={`outline-${color}`} className="capitalize">{color}</Badge>
            ))}
            <Badge variant="outline-secondary">Secondary</Badge>
          </div>
        </DemoCard>

        {/* Outline Pill Badges */}
        <DemoCard title="Outline Pill Badges" description="Outline style with rounded-full shape.">
          <div className="flex flex-wrap gap-2">
            {SEMANTIC_COLORS.map((color) => (
              <Badge key={color} variant={`outline-${color}`} rounded="full" className="capitalize">{color}</Badge>
            ))}
            <Badge variant="outline-secondary" rounded="full">Secondary</Badge>
          </div>
        </DemoCard>

        {/* Badge Sizes */}
        <DemoCard title="Badge Sizes" description="Small, default, and large size variants.">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="default" size="sm">Small</Badge>
            <Badge variant="default" size="default">Default</Badge>
            <Badge variant="default" size="lg">Large</Badge>
            <Badge variant="soft-success" size="sm" rounded="full">Small Pill</Badge>
            <Badge variant="soft-success" size="default" rounded="full">Default Pill</Badge>
            <Badge variant="soft-success" size="lg" rounded="full">Large Pill</Badge>
          </div>
        </DemoCard>

        {/* Badges with Dot */}
        <DemoCard title="Badges with Dot Indicator" description="A small dot prefix for status indication.">
          <div className="flex flex-wrap gap-2">
            <Badge variant="soft-success" rounded="full" dot>Online</Badge>
            <Badge variant="soft-danger" rounded="full" dot>Offline</Badge>
            <Badge variant="soft-warning" rounded="full" dot>Away</Badge>
            <Badge variant="soft-info" rounded="full" dot>In Meeting</Badge>
            <Badge variant="soft-secondary" rounded="full" dot>Inactive</Badge>
          </div>
        </DemoCard>

        {/* Badges with Icons */}
        <DemoCard title="Badges with Icons" description="Badges with a leading icon for richer context.">
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" size="default"><Zap className="size-3" /> Featured</Badge>
            <Badge variant="soft-success" size="default" rounded="full"><Check className="size-3" /> Verified</Badge>
            <Badge variant="soft-warning" size="default"><Star className="size-3" /> Popular</Badge>
            <Badge variant="soft-purple" size="default" rounded="full"><ShieldCheck className="size-3" /> Pro</Badge>
            <Badge variant="soft-danger" size="default"><X className="size-3" /> Rejected</Badge>
          </div>
        </DemoCard>

        {/* Badge on Avatar */}
        <DemoCard title="Badge on Button / Element" description="Notification count badges overlaid on elements.">
          <div className="flex flex-wrap items-start gap-6">
            <div className="relative inline-flex">
              <button className="p-2 rounded-xl border border-border hover:bg-muted text-muted-foreground transition-colors">
                <Bell className="size-5" />
              </button>
              <Badge variant="danger" rounded="full" size="sm" className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] text-[10px] px-1 flex items-center justify-center">3</Badge>
            </div>
            <div className="relative inline-flex">
              <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4" size="lg" />
              <Badge variant="success" rounded="full" size="sm" className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px]">✓</Badge>
            </div>
            <div className="relative inline-flex">
              <button className="px-4 py-2 rounded-lg bg-muted text-sm font-medium text-foreground hover:bg-gray-200 transition-colors">
                Messages
              </button>
              <Badge variant="danger" rounded="full" size="sm" className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px]">9+</Badge>
            </div>
          </div>
        </DemoCard>

        {/* Badges in Context */}
        <DemoCard title="Badges in Context" description="How badges look within other UI elements.">
          <div className="space-y-3">
            {[
              { label: "New Feature", badge: { text: "New", variant: "soft-info", rounded: "full" } },
              { label: "Enterprise Plan", badge: { text: "Pro", variant: "soft-purple", rounded: "full" } },
              { label: "Security Update", badge: { text: "Critical", variant: "danger", rounded: "md" } },
              { label: "API v2 Release", badge: { text: "Stable", variant: "soft-success", rounded: "full" } },
              { label: "Beta Program", badge: { text: "Beta", variant: "soft-warning", rounded: "md" } },
            ].map(({ label, badge }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-foreground">{label}</span>
                <Badge variant={badge.variant} rounded={badge.rounded}>{badge.text}</Badge>
              </div>
            ))}
          </div>
        </DemoCard>

        {/* Status Badges */}
        <DemoCard title="Status Badges" description="Common status labels for orders, tasks, and users." >
          <div className="space-y-3">
            {[
              { label: "Order #1042", status: "Completed", variant: "soft-success" },
              { label: "Order #1043", status: "Pending", variant: "soft-warning" },
              { label: "Order #1044", status: "Processing", variant: "soft-info" },
              { label: "Order #1045", status: "Cancelled", variant: "soft-danger" },
              { label: "Order #1046", status: "Refunded", variant: "soft-secondary" },
            ].map(({ label, status, variant }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-foreground font-medium">{label}</span>
                <Badge variant={variant} rounded="full" dot>{status}</Badge>
              </div>
            ))}
          </div>
        </DemoCard>

      </div>
    </div>
  );
}

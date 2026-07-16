import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center gap-1 font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        // Solid
        default:   "bg-primary text-primary-foreground",
        secondary: "bg-gray-500 text-white",
        success:   "bg-green-600 text-white",
        danger:    "bg-red-600 text-white",
        warning:   "bg-yellow-500 text-white",
        info:      "bg-cyan-500 text-white",
        purple:    "bg-purple-600 text-white",
        dark:      "bg-gray-800 text-white",
        // Soft
        "soft-default":   "bg-blue-100 text-blue-700",
        "soft-secondary": "bg-muted text-foreground",
        "soft-success":   "bg-green-100 text-green-700",
        "soft-danger":    "bg-red-100 text-red-700",
        "soft-warning":   "bg-yellow-100 text-yellow-700",
        "soft-info":      "bg-cyan-100 text-cyan-700",
        "soft-purple":    "bg-purple-100 text-purple-700",
        // Outline
        "outline-default":   "border border-blue-600 text-blue-600",
        "outline-secondary": "border border-gray-500 text-muted-foreground",
        "outline-success":   "border border-green-600 text-green-600",
        "outline-danger":    "border border-red-600 text-red-600",
        "outline-warning":   "border border-yellow-500 text-yellow-600",
        "outline-info":      "border border-cyan-500 text-cyan-600",
        "outline-purple":    "border border-purple-600 text-purple-600",
      },
      size: {
        sm:      "text-[10px] px-1.5 py-0.5",
        default: "text-xs px-2 py-0.5",
        lg:      "text-sm px-2.5 py-1",
      },
      rounded: {
        md:   "rounded-md",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "md",
    },
  }
);

function Badge({ className = undefined, variant = undefined, size = undefined, rounded = undefined, dot = undefined, children, ...props }) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, rounded }), className)}
      {...props}
    >
      {dot && (
        <span className="size-1.5 rounded-full bg-current opacity-80 shrink-0" />
      )}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };

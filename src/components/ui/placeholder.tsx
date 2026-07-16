import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const placeholderVariants = cva(
  "block rounded",
  {
    variants: {
      animation: {
        pulse: "animate-pulse",
        wave:  "animate-pulse", // shimmer handled via gradient
        none:  "",
      },
      color: {
        default: "bg-gray-200",
        dark:    "bg-gray-400",
        light:   "bg-muted",
        blue:    "bg-blue-200",
        green:   "bg-green-200",
        red:     "bg-red-200",
        yellow:  "bg-yellow-200",
        purple:  "bg-purple-200",
      },
      size: {
        xs:  "h-2",
        sm:  "h-3",
        default: "h-4",
        lg:  "h-5",
        xl:  "h-6",
      },
    },
    defaultVariants: {
      animation: "pulse",
      color: "default",
      size: "default",
    },
  }
);

function Placeholder({ className, animation, color, size, style, rounded, ...props }) {
  return (
    <span
      data-slot="placeholder"
      aria-hidden="true"
      className={cn(
        placeholderVariants({ animation, color, size }),
        rounded === "full" ? "rounded-full" : "",
        className
      )}
      style={style}
      {...props}
    />
  );
}

/* Shimmer effect variant using gradient */
function PlaceholderShimmer({ className, height = "h-4", width = "w-full", rounded = "rounded" }) {
  return (
    <span
      data-slot="placeholder-shimmer"
      aria-hidden="true"
      className={cn(
        "block overflow-hidden relative",
        "bg-gray-200",
        height, width, rounded
      )}
    >
      <span className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </span>
  );
}

/* Pre-built skeleton blocks */
function SkeletonText({ lines = 3, className }) {
  const widths = ["w-full", "w-5/6", "w-4/6", "w-3/4", "w-full", "w-2/3"];
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Placeholder key={i} className={widths[i % widths.length]} />
      ))}
    </div>
  );
}

function SkeletonCard({ showImage = true, lines = 3, className }) {
  return (
    <div className={cn("border border-border rounded-xl overflow-hidden", className)}>
      {showImage && <Placeholder className="w-full h-40 rounded-none" />}
      <div className="p-4 space-y-3">
        <Placeholder className="w-3/4 h-5" />
        <SkeletonText lines={lines} />
        <div className="flex gap-2 pt-1">
          <Placeholder className="w-20 h-8 rounded-lg" />
          <Placeholder className="w-20 h-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function SkeletonAvatar({ size = "size-10", rounded = "rounded-full", className }) {
  return (
    <Placeholder
      className={cn(size, rounded, "shrink-0", className)}
    />
  );
}

function SkeletonListItem({ hasAvatar = true, className }) {
  return (
    <div className={cn("flex items-center gap-3 py-3", className)}>
      {hasAvatar && <SkeletonAvatar />}
      <div className="flex-1 space-y-2">
        <Placeholder className="w-1/3 h-3.5" />
        <Placeholder className="w-2/3 h-3" />
      </div>
    </div>
  );
}

export {
  Placeholder,
  PlaceholderShimmer,
  SkeletonText,
  SkeletonCard,
  SkeletonAvatar,
  SkeletonListItem,
};

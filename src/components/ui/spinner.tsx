import { cn } from "@/lib/utils";

const colorMap = {
  default: "text-primary",
  blue: "text-blue-600",
  green: "text-green-500",
  red: "text-red-500",
  yellow: "text-yellow-500",
  purple: "text-purple-500",
  cyan: "text-cyan-500",
  orange: "text-orange-500",
  pink: "text-pink-500",
  gray: "text-muted-foreground",
  white: "text-white",
};

const sizeMap = {
  xs: "size-4",
  sm: "size-5",
  default: "size-8",
  lg: "size-12",
  xl: "size-16",
};

/**
 * Border Spinner — classic circular spinning border
 */
function Spinner({ size = "default", color = "default", className }) {
  return (
    <div
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block rounded-full border-2 border-current border-t-transparent animate-spin",
        sizeMap[size] || sizeMap.default,
        colorMap[color] || colorMap.default,
        className
      )}
    />
  );
}

/**
 * Grow Spinner — pulsing/scaling circle
 */
function SpinnerGrow({ size = "default", color = "default", className }) {
  return (
    <div
      data-slot="spinner-grow"
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block rounded-full animate-ping opacity-75",
        sizeMap[size] || sizeMap.default,
        "bg-current",
        colorMap[color] || colorMap.default,
        className
      )}
    />
  );
}

/**
 * Dots Spinner — three bouncing dots
 */
function SpinnerDots({ size = "default", color = "default", className }) {
  const dotSize = {
    xs: "size-1",
    sm: "size-1.5",
    default: "size-2.5",
    lg: "size-4",
    xl: "size-5",
  };

  return (
    <div
      data-slot="spinner-dots"
      role="status"
      aria-label="Loading"
      className={cn("inline-flex items-center gap-1.5", colorMap[color] || colorMap.default, className)}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "rounded-full bg-current animate-bounce",
            dotSize[size] || dotSize.default
          )}
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}

/**
 * Bars Spinner — vertical bars with wave animation
 */
function SpinnerBars({ size = "default", color = "default", className }) {
  const barHeight = {
    xs: "h-3 w-0.5",
    sm: "h-4 w-0.5",
    default: "h-6 w-1",
    lg: "h-9 w-1.5",
    xl: "h-12 w-2",
  };

  return (
    <div
      data-slot="spinner-bars"
      role="status"
      aria-label="Loading"
      className={cn("inline-flex items-end gap-0.5", colorMap[color] || colorMap.default, className)}
    >
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={cn(
            "bg-current rounded-sm animate-pulse",
            barHeight[size] || barHeight.default
          )}
          style={{ animationDelay: `${i * 100}ms`, animationDuration: "0.8s" }}
        />
      ))}
    </div>
  );
}

export { Spinner, SpinnerGrow, SpinnerDots, SpinnerBars };

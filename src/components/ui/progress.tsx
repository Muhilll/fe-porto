import { cn } from "@/lib/utils";

const colorMap = {
  default: "bg-primary",
  blue: "bg-blue-600",
  green: "bg-green-500",
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  purple: "bg-purple-500",
  cyan: "bg-cyan-500",
  orange: "bg-orange-500",
  pink: "bg-pink-500",
};

const trackMap = {
  default: "bg-muted",
  blue: "bg-blue-100",
  green: "bg-green-100",
  red: "bg-red-100",
  yellow: "bg-yellow-100",
  purple: "bg-purple-100",
  cyan: "bg-cyan-100",
};

const sizeMap = {
  xs: "h-1",
  sm: "h-1.5",
  default: "h-2.5",
  lg: "h-4",
  xl: "h-6",
};

function Progress({
  value = 0,
  max = 100,
  color = "default",
  size = "default",
  rounded = false,
  striped = false,
  animated = false,
  showLabel = false,
  label,
  className,
  barClassName,
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="w-full space-y-1">
      {(label || showLabel) && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          {label && <span>{label}</span>}
          {showLabel && <span className="font-medium">{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        data-slot="progress-track"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn(
          "w-full overflow-hidden",
          trackMap[color] || trackMap.default,
          sizeMap[size] || sizeMap.default,
          rounded ? "rounded-full" : "rounded-md",
          className
        )}
      >
        <div
          data-slot="progress-bar"
          style={{ width: `${pct}%` }}
          className={cn(
            "h-full transition-all duration-500 ease-out",
            colorMap[color] || colorMap.default,
            rounded ? "rounded-full" : "rounded-md",
            striped && "bg-stripes",
            animated && striped && "animate-stripes",
            barClassName
          )}
        />
      </div>
    </div>
  );
}

function ProgressMulti({ segments = [], size = "default", rounded = false, className }) {
  const total = segments.reduce((sum, s) => sum + (s.value || 0), 0);

  return (
    <div
      data-slot="progress-multi"
      role="progressbar"
      className={cn(
        "w-full flex overflow-hidden",
        "bg-muted",
        sizeMap[size] || sizeMap.default,
        rounded ? "rounded-full" : "rounded-md",
        className
      )}
    >
      {segments.map((seg, i) => {
        const pct = Math.min(100, Math.max(0, ((seg.value || 0) / 100) * 100));
        return (
          <div
            key={i}
            style={{ width: `${pct}%` }}
            className={cn(
              "h-full transition-all duration-500",
              colorMap[seg.color] || colorMap.default,
              i === 0 && (rounded ? "rounded-l-full" : "rounded-l-md"),
              i === segments.length - 1 && (rounded ? "rounded-r-full" : "rounded-r-md")
            )}
          />
        );
      })}
    </div>
  );
}

export { Progress, ProgressMulti };

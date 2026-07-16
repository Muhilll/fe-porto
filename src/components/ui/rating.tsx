"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Star, Heart, Zap, ThumbsUp } from "lucide-react";

/* ─── Core Rating Component ──────────────────────── */
function Rating({
  value = 0,
  max = 5,
  onChange,
  readOnly = false,
  size = "default",
  icon: Icon = Star,
  activeClass = "text-yellow-400 fill-yellow-400",
  inactiveClass = "text-gray-200 fill-gray-200",
  hoverClass,
  className,
}) {
  const [hovered, setHovered] = useState(0);

  const sizeMap = { xs: "size-3.5", sm: "size-4", default: "size-6", lg: "size-8", xl: "size-10" };
  const sz = sizeMap[size] || sizeMap.default;
  const displayValue = readOnly ? value : (hovered || value);

  return (
    <div
      data-slot="rating"
      className={cn("inline-flex items-center gap-0.5", className)}
      role={readOnly ? "img" : "radiogroup"}
      aria-label={`Rating: ${value} of ${max}`}
    >
      {Array.from({ length: max }).map((_, i) => {
        const num = i + 1;
        const isActive = num <= displayValue;
        const isHalf = !Number.isInteger(displayValue) && num === Math.ceil(displayValue);

        return (
          <button
            key={num}
            type="button"
            role={readOnly ? undefined : "radio"}
            aria-checked={num === value}
            disabled={readOnly}
            onClick={() => !readOnly && onChange?.(num === value ? 0 : num)}
            onMouseEnter={() => !readOnly && setHovered(num)}
            onMouseLeave={() => !readOnly && setHovered(0)}
            className={cn(
              "transition-transform focus:outline-none",
              !readOnly && "hover:scale-110 cursor-pointer",
              readOnly && "cursor-default"
            )}
          >
            <Icon
              className={cn(
                sz,
                isActive
                  ? (hovered && hoverClass ? hoverClass : activeClass)
                  : inactiveClass
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

/* ─── Rating with Label ───────────────────────────── */
function RatingWithLabel({ value, max = 5, label, count, ...props }) {
  return (
    <div className="flex items-center gap-2">
      <Rating value={value} max={max} readOnly {...props} />
      <span className="text-sm font-semibold text-foreground">{value.toFixed(1)}</span>
      {label && <span className="text-sm text-muted-foreground">{label}</span>}
      {count && <span className="text-xs text-muted-foreground">({count})</span>}
    </div>
  );
}

export { Rating, RatingWithLabel };

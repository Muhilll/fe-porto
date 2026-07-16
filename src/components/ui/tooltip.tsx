"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

const placementStyles = {
  top:    { tooltip: "bottom-full left-1/2 -translate-x-1/2 mb-2", arrow: "top-full left-1/2 -translate-x-1/2 border-t-[6px] border-x-[5px] border-x-transparent border-b-0" },
  bottom: { tooltip: "top-full left-1/2 -translate-x-1/2 mt-2",    arrow: "bottom-full left-1/2 -translate-x-1/2 border-b-[6px] border-x-[5px] border-x-transparent border-t-0" },
  left:   { tooltip: "right-full top-1/2 -translate-y-1/2 mr-2",   arrow: "left-full top-1/2 -translate-y-1/2 border-l-[6px] border-y-[5px] border-y-transparent border-r-0" },
  right:  { tooltip: "left-full top-1/2 -translate-y-1/2 ml-2",    arrow: "right-full top-1/2 -translate-y-1/2 border-r-[6px] border-y-[5px] border-y-transparent border-l-0" },
};

const colorMap = {
  dark:    { bg: "bg-gray-900 text-white",          arrow: "border-t-gray-900 border-b-gray-900 border-l-gray-900 border-r-gray-900" },
  light:   { bg: "bg-card text-foreground border border-border shadow-md", arrow: "border-t-white border-b-white border-l-white border-r-white" },
  primary: { bg: "bg-blue-600 text-white",           arrow: "border-t-blue-600 border-b-blue-600 border-l-blue-600 border-r-blue-600" },
  success: { bg: "bg-green-600 text-white",          arrow: "border-t-green-600 border-b-green-600 border-l-green-600 border-r-green-600" },
  danger:  { bg: "bg-red-600 text-white",            arrow: "border-t-red-600 border-b-red-600 border-l-red-600 border-r-red-600" },
  warning: { bg: "bg-yellow-500 text-white",         arrow: "border-t-yellow-500 border-b-yellow-500 border-l-yellow-500 border-r-yellow-500" },
  purple:  { bg: "bg-purple-600 text-white",         arrow: "border-t-purple-600 border-b-purple-600 border-l-purple-600 border-r-purple-600" },
};

function Tooltip({
  children,
  content,
  placement = "top",
  color = "dark",
  delay = 100,
  disabled = false,
  className,
}) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);
  const cfg = placementStyles[placement] || placementStyles.top;
  const clr = colorMap[color] || colorMap.dark;

  const show = useCallback(() => {
    timerRef.current = setTimeout(() => setVisible(true), delay);
  }, [delay]);

  const hide = useCallback(() => {
    clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  if (disabled) return children;

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && content && (
        <span
          role="tooltip"
          className={cn(
            "absolute z-50 whitespace-nowrap px-2.5 py-1.5 text-xs font-medium rounded-lg pointer-events-none",
            "animate-in fade-in-0 zoom-in-95 duration-150",
            cfg.tooltip,
            clr.bg,
            className
          )}
        >
          {content}
          {/* Arrow */}
          <span
            aria-hidden="true"
            className={cn("absolute w-0 h-0 border-solid", cfg.arrow, clr.arrow)}
          />
        </span>
      )}
    </span>
  );
}

export { Tooltip };

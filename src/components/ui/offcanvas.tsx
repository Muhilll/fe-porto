"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const placements = {
  left:   { panel: "inset-y-0 left-0 h-full", enter: "translate-x-0", exit: "-translate-x-full" },
  right:  { panel: "inset-y-0 right-0 h-full", enter: "translate-x-0", exit: "translate-x-full" },
  top:    { panel: "inset-x-0 top-0 w-full", enter: "translate-y-0", exit: "-translate-y-full" },
  bottom: { panel: "inset-x-0 bottom-0 w-full", enter: "translate-y-0", exit: "translate-y-full" },
};

const defaultWidth  = { left: "w-80", right: "w-80", top: "w-full", bottom: "w-full" };
const defaultHeight = { top: "max-h-[60vh]", bottom: "max-h-[60vh]", left: "", right: "" };

function Offcanvas({
  open = false,
  onClose,
  placement = "right",
  title,
  children,
  footer,
  className,
  size,
  showBackdrop = true,
}) {
  const cfg = placements[placement] || placements.right;
  const backdropRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => { if (e.key === "Escape") onClose?.(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      {showBackdrop && (
        <div
          ref={backdropRef}
          aria-hidden="true"
          onClick={() => onClose?.()}
          className={cn(
            "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        />
      )}

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "fixed z-50 bg-card shadow-2xl flex flex-col",
          "transition-transform duration-300 ease-in-out",
          cfg.panel,
          size || defaultWidth[placement],
          defaultHeight[placement],
          open ? cfg.enter : cfg.exit,
          className
        )}
      >
        {/* Header */}
        {title !== false && (
          <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
            <h2 className="text-base font-semibold">{title ?? "Panel"}</h2>
            <button
              onClick={() => onClose?.()}
              aria-label="Close"
              className="p-1.5 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-border shrink-0">
            {footer}
          </div>
        )}
      </div>
    </>
  );
}

export { Offcanvas };

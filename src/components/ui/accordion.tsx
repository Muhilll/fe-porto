"use client";

import { useState, useRef, useEffect, createContext, useContext } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Plus, Minus } from "lucide-react";

/* ─── Context ─────────────────────────────────────── */
const AccordionContext = createContext(null);

/* ─── Root ────────────────────────────────────────── */
function Accordion({
  children,
  type = "single",      // "single" | "multiple"
  defaultValue,         // string | string[]
  className,
  flush = false,
  iconType = "chevron", // "chevron" | "plus"
}) {
  const [openItems, setOpenItems] = useState(() => {
    if (!defaultValue) return new Set();
    return new Set(Array.isArray(defaultValue) ? defaultValue : [defaultValue]);
  });

  const toggle = (value) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        if (type === "single") next.clear();
        next.add(value);
      }
      return next;
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggle, flush, iconType }}>
      <div
        data-slot="accordion"
        className={cn(
          !flush && "border border-border rounded-xl overflow-hidden divide-y divide-border",
          flush && "divide-y divide-border",
          className
        )}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

/* ─── Item ────────────────────────────────────────── */
function AccordionItem({ value, children, className }) {
  return (
    <div data-slot="accordion-item" data-value={value} className={cn("", className)}>
      {children}
    </div>
  );
}

/* ─── Trigger ─────────────────────────────────────── */
function AccordionTrigger({ value, children, className, icon: CustomIcon }) {
  const { openItems, toggle, iconType } = useContext(AccordionContext);
  const isOpen = openItems.has(value);

  const Icon = CustomIcon || (iconType === "plus"
    ? (isOpen ? Minus : Plus)
    : ChevronDown);

  return (
    <button
      data-slot="accordion-trigger"
      onClick={() => toggle(value)}
      aria-expanded={isOpen}
      className={cn(
        "w-full flex items-center justify-between px-4 py-4 text-sm font-medium text-left",
        "bg-card hover:bg-muted transition-colors focus:outline-none",
        className
      )}
    >
      <span className="flex-1">{children}</span>
      <Icon
        className={cn(
          "size-4 text-muted-foreground shrink-0 transition-transform duration-300",
          iconType === "chevron" && isOpen && "rotate-180"
        )}
      />
    </button>
  );
}

/* ─── Content (animated) ──────────────────────────── */
function AccordionContent({ value, children, className }) {
  const { openItems } = useContext(AccordionContext);
  const isOpen = openItems.has(value);
  const ref = useRef(null);
  const [height, setHeight] = useState(isOpen ? "auto" : "0px");
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      requestAnimationFrame(() => {
        if (ref.current) {
          setHeight(`${ref.current.scrollHeight}px`);
          const t = setTimeout(() => setHeight("auto"), 300);
          return () => clearTimeout(t);
        }
      });
    } else {
      if (ref.current) {
        setHeight(`${ref.current.scrollHeight}px`);
        requestAnimationFrame(() => requestAnimationFrame(() => setHeight("0px")));
      }
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  return (
    <div
      ref={ref}
      aria-hidden={!isOpen}
      style={{ height, overflow: "hidden", transition: "height 300ms ease" }}
    >
      {visible && (
        <div
          data-slot="accordion-content"
          className={cn(
            "px-4 pb-4 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border",
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

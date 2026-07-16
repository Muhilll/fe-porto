"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

function Collapse({ open = false, children, className }) {
  const ref = useRef(null);
  const [height, setHeight] = useState(open ? "auto" : "0px");
  const [isVisible, setIsVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      // tiny delay so the element is in the DOM before we measure
      requestAnimationFrame(() => {
        if (ref.current) {
          setHeight(`${ref.current.scrollHeight}px`);
          // after transition ends, set to auto to allow resize
          const timer = setTimeout(() => setHeight("auto"), 300);
          return () => clearTimeout(timer);
        }
      });
    } else {
      if (ref.current) {
        // snapshot current height before collapsing
        setHeight(`${ref.current.scrollHeight}px`);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setHeight("0px"));
        });
      }
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <div
      ref={ref}
      data-slot="collapse"
      aria-hidden={!open}
      style={{ height, overflow: "hidden", transition: "height 300ms ease" }}
      className={cn(className)}
    >
      {isVisible && children}
    </div>
  );
}

function useCollapse(defaultOpen = false) {
  const [open, setOpen] = useState(defaultOpen);
  const toggle = () => setOpen((p) => !p);
  return { open, toggle, setOpen };
}

export { Collapse, useCollapse };

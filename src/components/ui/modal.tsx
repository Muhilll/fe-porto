"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

function Modal({ open, onClose, className = undefined, children }) {
  const overlayRef = useRef(null);

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

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      data-slot="modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose?.(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      {/* Panel */}
      <div
        data-slot="modal"
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative z-10 bg-card rounded-xl shadow-xl w-full flex flex-col",
          "animate-in fade-in-0 zoom-in-95 duration-200",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

function ModalHeader({ className = undefined, children }) {
  return (
    <div
      data-slot="modal-header"
      className={cn("flex items-center justify-between px-6 py-4 border-b border-border shrink-0", className)}
    >
      {children}
    </div>
  );
}

function ModalTitle({ className = undefined, children }) {
  return (
    <h2 data-slot="modal-title" className={cn("text-base font-semibold leading-tight", className)}>
      {children}
    </h2>
  );
}

function ModalBody({ className = undefined, children }) {
  return (
    <div data-slot="modal-body" className={cn("px-6 py-4 flex-1 overflow-y-auto", className)}>
      {children}
    </div>
  );
}

function ModalFooter({ className = undefined, children }) {
  return (
    <div
      data-slot="modal-footer"
      className={cn("flex items-center justify-end gap-2 px-6 py-4 border-t border-border shrink-0", className)}
    >
      {children}
    </div>
  );
}

function ModalClose({ onClose, className = undefined }) {
  return (
    <button
      data-slot="modal-close"
      onClick={onClose}
      aria-label="Close modal"
      className={cn(
        "p-1.5 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
        className
      )}
    >
      <X className="size-4" />
    </button>
  );
}

export { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, ModalClose };

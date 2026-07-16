import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react";

function Pagination({ className, ...props }) {
  return (
    <nav
      data-slot="pagination"
      role="navigation"
      aria-label="Pagination"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ className, ...props }) {
  return (
    <div data-slot="pagination-item" className={cn("", className)} {...props} />
  );
}

function PaginationButton({
  className,
  isActive = false,
  disabled = false,
  size = "default",
  variant = "default",
  children,
  ...props
}) {
  const sizes = {
    default: "h-9 w-9 text-sm",
    sm: "h-7 w-7 text-xs",
    lg: "h-10 w-10 text-base",
  };

  const variants = {
    default: isActive
      ? "bg-primary text-primary-foreground font-semibold shadow-sm"
      : "text-muted-foreground hover:bg-muted hover:text-foreground",
    outline: isActive
      ? "border border-primary bg-primary text-primary-foreground font-semibold"
      : "border border-border text-muted-foreground hover:bg-muted hover:text-foreground",
    rounded: isActive
      ? "rounded-full bg-primary text-primary-foreground font-semibold shadow-sm"
      : "rounded-full text-muted-foreground hover:bg-muted hover:text-foreground",
    "outline-rounded": isActive
      ? "rounded-full border border-primary bg-primary text-primary-foreground font-semibold"
      : "rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground",
    ghost: isActive
      ? "text-primary font-bold underline underline-offset-4"
      : "text-muted-foreground hover:text-foreground",
    soft: isActive
      ? "rounded-lg bg-blue-100 text-blue-700 font-semibold"
      : "rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground",
  };

  return (
    <button
      data-slot="pagination-button"
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
        "disabled:pointer-events-none disabled:opacity-40",
        "focus:outline-none",
        sizes[size] || sizes.default,
        variants[variant] || variants.default,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function PaginationEllipsis({ className }) {
  return (
    <span
      data-slot="pagination-ellipsis"
      className={cn("inline-flex h-9 w-9 items-center justify-center text-muted-foreground", className)}
    >
      <MoreHorizontal className="size-4" />
    </span>
  );
}

function PaginationPrev({ disabled, variant, size, className, ...props }) {
  return (
    <PaginationButton disabled={disabled} variant={variant} size={size} aria-label="Previous page" className={className} {...props}>
      <ChevronLeft className="size-4" />
    </PaginationButton>
  );
}

function PaginationNext({ disabled, variant, size, className, ...props }) {
  return (
    <PaginationButton disabled={disabled} variant={variant} size={size} aria-label="Next page" className={className} {...props}>
      <ChevronRight className="size-4" />
    </PaginationButton>
  );
}

function PaginationFirst({ disabled, variant, size, className, ...props }) {
  return (
    <PaginationButton disabled={disabled} variant={variant} size={size} aria-label="First page" className={className} {...props}>
      <ChevronsLeft className="size-4" />
    </PaginationButton>
  );
}

function PaginationLast({ disabled, variant, size, className, ...props }) {
  return (
    <PaginationButton disabled={disabled} variant={variant} size={size} aria-label="Last page" className={className} {...props}>
      <ChevronsRight className="size-4" />
    </PaginationButton>
  );
}

export {
  Pagination,
  PaginationItem,
  PaginationButton,
  PaginationEllipsis,
  PaginationPrev,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
};

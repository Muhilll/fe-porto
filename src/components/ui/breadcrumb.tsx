import { cn } from "@/lib/utils";
import { ChevronRight, Slash, ChevronLast, ArrowRight } from "lucide-react";

function Breadcrumb({ className = undefined, children, separator = "chevron", ...props }) {
  const separators = {
    chevron: <ChevronRight className="size-3.5 text-muted-foreground shrink-0" />,
    slash:   <Slash className="size-3 text-muted-foreground shrink-0 rotate-[-20deg]" />,
    arrow:   <ArrowRight className="size-3.5 text-muted-foreground shrink-0" />,
    dot:     <span className="size-1 rounded-full bg-muted-foreground/50 shrink-0" />,
    dash:    <span className="w-3 h-px bg-muted-foreground/50 shrink-0" />,
    text:    <span className="text-muted-foreground text-xs shrink-0">›</span>,
  };

  const items = Array.isArray(children) ? children.flat().filter(Boolean) : [children];

  return (
    <nav
      data-slot="breadcrumb"
      aria-label="Breadcrumb"
      className={cn("", className)}
      {...props}
    >
      <ol className="flex items-center flex-wrap gap-1.5">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            {index > 0 && separators[separator]}
            {item}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function BreadcrumbItem({ href, active = false, children, className = undefined }) {
  if (active || !href) {
    return (
      <span
        data-slot="breadcrumb-item"
        aria-current="page"
        className={cn(
          "text-sm font-medium text-foreground truncate max-w-[180px]",
          className
        )}
      >
        {children}
      </span>
    );
  }

  return (
    <a
      data-slot="breadcrumb-item"
      href={href}
      className={cn(
        "text-sm text-muted-foreground hover:text-foreground transition-colors truncate max-w-[180px]",
        className
      )}
    >
      {children}
    </a>
  );
}

function BreadcrumbEllipsis({ className = undefined }) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      aria-hidden
      className={cn("text-sm text-muted-foreground px-1", className)}
    >
      …
    </span>
  );
}

export { Breadcrumb, BreadcrumbItem, BreadcrumbEllipsis };

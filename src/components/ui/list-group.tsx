import { cn } from "@/lib/utils";

function ListGroup({ className, flush = false, horizontal = false, ...props }) {
  return (
    <ul
      data-slot="list-group"
      className={cn(
        "flex",
        horizontal ? "flex-row" : "flex-col",
        !flush && "rounded-xl border border-border overflow-hidden",
        className
      )}
      {...props}
    />
  );
}

function ListGroupItem({
  className,
  active = false,
  disabled = false,
  as: Tag = "li",
  ...props
}) {
  return (
    <Tag
      data-slot="list-group-item"
      aria-disabled={disabled || undefined}
      className={cn(
        "relative px-4 py-3 text-sm border-b border-border last:border-b-0",
        "flex items-center gap-3",
        active
          ? "bg-primary text-primary-foreground font-medium z-10"
          : "bg-card text-foreground",
        disabled
          ? "opacity-50 pointer-events-none text-muted-foreground"
          : !active && "hover:bg-muted transition-colors",
        Tag === "a" || Tag === "button"
          ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary/30"
          : "",
        className
      )}
      {...props}
    />
  );
}

function ListGroupItemAction({ className, ...props }) {
  return (
    <ListGroupItem
      as="a"
      className={cn("cursor-pointer", className)}
      {...props}
    />
  );
}

export { ListGroup, ListGroupItem, ListGroupItemAction };

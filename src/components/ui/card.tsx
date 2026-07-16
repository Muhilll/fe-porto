import { cn } from "@/lib/utils";

function Card({ className = undefined, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card rounded-xl border border-border shadow-sm flex flex-col",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className = undefined, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1 px-6 py-4 border-b border-border", className)}
      {...props}
    />
  );
}

function CardTitle({ className = undefined, ...props }) {
  return (
    <h3
      data-slot="card-title"
      className={cn("font-semibold text-base leading-tight", className)}
      {...props}
    />
  );
}

function CardDescription({ className = undefined, ...props }) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardContent({ className = undefined, ...props }) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 py-4 flex-1", className)}
      {...props}
    />
  );
}

function CardFooter({ className = undefined, ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center px-6 py-4 border-t border-border",
        className
      )}
      {...props}
    />
  );
}

function CardImage({ src, alt = "", className = undefined, ...props }) {
  return (
    <img
      data-slot="card-image"
      src={src}
      alt={alt}
      className={cn("w-full object-cover", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
};

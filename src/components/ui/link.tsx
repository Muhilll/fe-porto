import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import NextLink from "next/link";

const linkVariants = cva(
  "inline-flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:underline focus-visible:underline-offset-4",
  {
    variants: {
      variant: {
        default:   "text-primary hover:text-primary/80 underline underline-offset-4",
        subtle:    "text-muted-foreground hover:text-foreground",
        plain:     "text-foreground hover:text-primary",
        // Color variants
        blue:      "text-blue-600 hover:text-blue-800 underline underline-offset-4",
        green:     "text-green-600 hover:text-green-800 underline underline-offset-4",
        red:       "text-red-600 hover:text-red-800 underline underline-offset-4",
        yellow:    "text-yellow-600 hover:text-yellow-800 underline underline-offset-4",
        purple:    "text-purple-600 hover:text-purple-800 underline underline-offset-4",
        gray:      "text-muted-foreground hover:text-foreground underline underline-offset-4",
        // Decoration styles
        "no-underline":  "text-primary hover:underline hover:underline-offset-4",
        dashed:    "text-primary underline decoration-dashed underline-offset-4 hover:decoration-solid",
        dotted:    "text-primary underline decoration-dotted underline-offset-4",
        wavy:      "text-primary underline decoration-wavy underline-offset-4",
        double:    "text-primary underline decoration-double underline-offset-4",
      },
      size: {
        sm:      "text-xs",
        default: "text-sm",
        lg:      "text-base",
        xl:      "text-lg",
      },
      weight: {
        normal:    "font-normal",
        medium:    "font-medium",
        semibold:  "font-semibold",
        bold:      "font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      weight: "normal",
    },
  }
);

function Link({ href = "#", variant, size, weight, external, className, children, ...props }) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(linkVariants({ variant, size, weight }), className)}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink
      href={href}
      className={cn(linkVariants({ variant, size, weight }), className)}
      {...props}
    >
      {children}
    </NextLink>
  );
}

export { Link, linkVariants };

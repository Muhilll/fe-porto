import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative flex items-start gap-3 rounded-lg px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        default: "bg-blue-50 text-blue-800 border border-blue-200",
        success: "bg-green-50 text-green-800 border border-green-200",
        warning: "bg-yellow-50 text-yellow-800 border border-yellow-200",
        danger: "bg-red-50 text-red-800 border border-red-200",
        // Filled
        "filled-default": "bg-blue-600 text-white",
        "filled-success": "bg-green-600 text-white",
        "filled-warning": "bg-yellow-500 text-white",
        "filled-danger": "bg-red-600 text-white",
        // Border accent (left)
        "accent-default": "bg-blue-50 text-blue-800 border-l-4 border-l-blue-500 rounded-l-none",
        "accent-success": "bg-green-50 text-green-800 border-l-4 border-l-green-500 rounded-l-none",
        "accent-warning": "bg-yellow-50 text-yellow-800 border-l-4 border-l-yellow-500 rounded-l-none",
        "accent-danger": "bg-red-50 text-red-800 border-l-4 border-l-red-500 rounded-l-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const iconColorMap = {
  default: "text-blue-500",
  success: "text-green-500",
  warning: "text-yellow-500",
  danger: "text-red-500",
  "filled-default": "text-white/90",
  "filled-success": "text-white/90",
  "filled-warning": "text-white/90",
  "filled-danger": "text-white/90",
  "accent-default": "text-blue-500",
  "accent-success": "text-green-500",
  "accent-warning": "text-yellow-500",
  "accent-danger": "text-red-500",
};

function Alert({ className, variant = "default", children, ...props }) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

function AlertIcon({ variant = "default", icon: Icon, className }) {
  return (
    <Icon
      data-slot="alert-icon"
      className={cn("size-5 shrink-0 mt-0.5", iconColorMap[variant], className)}
    />
  );
}

function AlertContent({ children, className }) {
  return (
    <div data-slot="alert-content" className={cn("flex-1", className)}>
      {children}
    </div>
  );
}

function AlertTitle({ children, className }) {
  return (
    <p data-slot="alert-title" className={cn("font-semibold mb-0.5", className)}>
      {children}
    </p>
  );
}

function AlertDescription({ children, className }) {
  return (
    <p data-slot="alert-description" className={cn("text-sm opacity-80", className)}>
      {children}
    </p>
  );
}

function AlertDismiss({ onClick, className }) {
  return (
    <button
      data-slot="alert-dismiss"
      onClick={onClick}
      aria-label="Dismiss alert"
      className={cn(
        "absolute top-2.5 right-3 opacity-60 hover:opacity-100 transition-opacity",
        className
      )}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18M6 6l12 12"/>
      </svg>
    </button>
  );
}

export {
  Alert,
  AlertIcon,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertDismiss,
  alertVariants,
};

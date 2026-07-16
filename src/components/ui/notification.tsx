"use client";

import { useState, useCallback, createContext, useContext } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, Info, TriangleAlert } from "lucide-react";
import {
  Alert,
  AlertIcon,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertDismiss,
} from "@/components/ui/alert";

/* ─── Context ─────────────────────────────────────────── */
const NotificationContext = createContext<any>(null);

function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<any[]>([]);

  const add = useCallback((notif: any) => {
    const id = Date.now() + Math.random();
    setNotifications((prev) => [...prev, { id, ...notif }]);
    if (notif.duration !== 0) {
      setTimeout(() => remove(id), notif.duration ?? 4000);
    }
    return id;
  }, []);

  const remove = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ add, remove }}>
      {children}
      <NotificationContainer notifications={notifications} onRemove={remove} />
    </NotificationContext.Provider>
  );
}

function useNotification() {
  return useContext(NotificationContext);
}

/* ─── Container ───────────────────────────────────────── */
function NotificationContainer({ notifications, onRemove, position = "top-right" }: any) {
  const positionClass: Record<string, string> = {
    "top-right": "top-4 right-4 items-end",
    "top-left": "top-4 left-4 items-start",
    "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
    "bottom-right": "bottom-4 right-4 items-end",
    "bottom-left": "bottom-4 left-4 items-start",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  };

  return (
    <div className={cn("fixed z-[100] flex flex-col gap-2 w-[340px] pointer-events-none", positionClass[position] || "top-4 right-4 items-end")}>
      {notifications.map((n: any) => (
        <NotificationToast key={n.id} {...n} onClose={() => onRemove(n.id)} />
      ))}
    </div>
  );
}

/* ─── Toast ───────────────────────────────────────────── */
const iconMap: Record<string, any> = {
  default: Info,
  success: CheckCircle2,
  danger: AlertCircle,
  warning: TriangleAlert,
  "filled-default": Info,
  "filled-success": CheckCircle2,
  "filled-danger": AlertCircle,
  "filled-warning": TriangleAlert,
  "accent-default": Info,
  "accent-success": CheckCircle2,
  "accent-danger": AlertCircle,
  "accent-warning": TriangleAlert,
};

function NotificationToast({ title, message, variant = "default", onClose, showIcon = true, action }: any) {
  const Icon = iconMap[variant] || Info;

  return (
    <Alert
      variant={variant}
      className={cn(
        "pointer-events-auto w-full shadow-lg",
        "animate-in slide-in-from-right-5 fade-in duration-300"
      )}
    >
      {showIcon && <AlertIcon variant={variant} icon={Icon} />}
      <AlertContent>
        {title && <AlertTitle>{title}</AlertTitle>}
        {message && <AlertDescription>{message}</AlertDescription>}
        {action && (
          <button
            onClick={action.onClick}
            className="text-xs font-semibold mt-1.5 hover:underline opacity-90 hover:opacity-100"
          >
            {action.label}
          </button>
        )}
      </AlertContent>
      {onClose && <AlertDismiss onClick={onClose} />}
    </Alert>
  );
}

/* ─── Static inline notification (no portal) ─────────── */
function Notification({ title, message, variant = "default", onClose, showIcon = true, action, className }: any) {
  const Icon = iconMap[variant] || Info;

  return (
    <Alert variant={variant} className={cn("w-full", className)}>
      {showIcon && <AlertIcon variant={variant} icon={Icon} />}
      <AlertContent>
        {title && <AlertTitle>{title}</AlertTitle>}
        {message && <AlertDescription>{message}</AlertDescription>}
        {action && (
          <button
            onClick={action.onClick}
            className="text-xs font-semibold mt-1.5 hover:underline opacity-90 hover:opacity-100"
          >
            {action.label}
          </button>
        )}
      </AlertContent>
      {onClose && <AlertDismiss onClick={onClose} />}
    </Alert>
  );
}

export { NotificationProvider, useNotification, Notification, NotificationToast, NotificationContainer };

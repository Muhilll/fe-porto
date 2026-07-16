"use client";

import { useState } from "react";
import { Notification, NotificationContainer } from "@/components/ui/notification";
import {
  Bell, CheckCircle2, AlertCircle, Info, TriangleAlert,
  Download, MessageSquare, UserPlus, Star, ShoppingCart,
} from "lucide-react";

/* Live toast demo — local state, no context needed for showcase */
function LiveToastDemo() {
  const [toasts, setToasts] = useState([]);

  const add = (variant, title, message) => {
    const id = Date.now();
    setToasts((p) => [...p, { id, variant, title, message }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4000);
  };

  const triggerBtns = [
    { label: "Default", variant: "default", title: "Notification", message: "This is a default notification." },
    { label: "Success", variant: "success", title: "Success!", message: "Your changes have been saved.", cls: "bg-green-600 hover:bg-green-700 text-white" },
    { label: "Warning", variant: "warning", title: "Warning", message: "Please review before continuing.", cls: "bg-yellow-500 hover:bg-yellow-600 text-white" },
    { label: "Danger", variant: "danger", title: "Error!", message: "Something went wrong. Try again.", cls: "bg-red-600 hover:bg-red-700 text-white" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {triggerBtns.map(({ label, variant, title, message, cls = "bg-primary text-primary-foreground hover:bg-primary/90" }) => (
          <button key={variant} onClick={() => add(variant, title, message)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${cls}`}>
            Show {label}
          </button>
        ))}
      </div>
      <NotificationContainer notifications={toasts} onRemove={(id) => setToasts((p) => p.filter((t) => t.id !== id))} position="top-right" />
    </div>
  );
}

function DemoCard({ title, description, children, span2 = false }) {
  return (
    <div className={`p-6 bg-card border border-border rounded-xl shadow-sm ${span2 ? "lg:col-span-2" : ""}`}>
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}
      {children}
    </div>
  );
}

export default function NotificationsPage() {
  const [dismissed, setDismissed] = useState({});
  const dismiss = (key) => setDismissed((p) => ({ ...p, [key]: true }));

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">
          In-app notification components — static inline banners and live toast messages for user feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Live Toasts */}
        <DemoCard span2 title="Live Toast Notifications" description="Click a button to fire a real toast notification in the top-right corner.">
          <LiveToastDemo />
        </DemoCard>

        {/* Default Notifications */}
        <DemoCard title="Default Notifications" description="Standard inline notifications with icon and message.">
          <div className="space-y-3">
            <Notification variant="default" title="Information" message="Your account has been updated successfully." />
            <Notification variant="success" title="Success" message="Your changes have been saved." />
            <Notification variant="warning" title="Warning" message="Your subscription expires in 3 days." />
            <Notification variant="danger" title="Error" message="Failed to connect to the server." />
          </div>
        </DemoCard>

        {/* Filled Notifications */}
        <DemoCard title="Filled Notifications" description="Solid color background for more prominent alerts.">
          <div className="space-y-3">
            <Notification variant="filled-default" title="Information" message="A new system update is available." />
            <Notification variant="filled-success" title="Success" message="Payment processed successfully." />
            <Notification variant="filled-warning" title="Warning" message="Your storage is almost full." />
            <Notification variant="filled-danger" title="Error" message="Authentication failed. Please log in again." />
          </div>
        </DemoCard>

        {/* Dismissible Notifications */}
        <DemoCard title="Dismissible Notifications" description="Notifications the user can manually close.">
          <div className="space-y-3">
            {!dismissed["d1"] && <Notification variant="default" title="Welcome back!" message="You have 3 unread messages." onClose={() => dismiss("d1")} />}
            {!dismissed["d2"] && <Notification variant="success" title="Backup completed" message="Your data has been backed up to the cloud." onClose={() => dismiss("d2")} />}
            {!dismissed["d3"] && <Notification variant="warning" title="Account expiry" message="Your trial ends in 2 days. Upgrade now." onClose={() => dismiss("d3")} />}
            {!dismissed["d4"] && <Notification variant="danger" title="Login attempt" message="Suspicious login detected from a new device." onClose={() => dismiss("d4")} />}
            {Object.keys(dismissed).length === 4 && (
              <p className="text-sm text-muted-foreground text-center py-3">All dismissed. Refresh to reset.</p>
            )}
          </div>
        </DemoCard>

        {/* With Action */}
        <DemoCard title="Notifications with Action" description="Notifications with a clickable action link.">
          <div className="space-y-3">
            <Notification
              variant="default"
              title="New update available"
              message="Version 2.4.0 is ready to install."
              action={{ label: "Update now →", onClick: () => {} }}
            />
            <Notification
              variant="success"
              title="File exported"
              message="Your report has been generated successfully."
              action={{ label: "Download →", onClick: () => {} }}
            />
            <Notification
              variant="filled-danger"
              title="Action required"
              message="Your payment method is about to expire."
              action={{ label: "Update payment →", onClick: () => {} }}
            />
          </div>
        </DemoCard>

        {/* No Icon */}
        <DemoCard title="Without Icon" description="Clean notifications without the status icon.">
          <div className="space-y-3">
            <Notification variant="default" showIcon={false} title="System maintenance" message="Scheduled maintenance on Sunday 2am–4am UTC." />
            <Notification variant="success" showIcon={false} title="Deployment successful" message="Version 3.1.2 is now live in production." />
            <Notification variant="warning" showIcon={false} title="API rate limit" message="You're approaching 80% of your API quota." />
          </div>
        </DemoCard>

        {/* Activity-style Notifications */}
        <DemoCard span2 title="Activity Notifications" description="Rich notification cards showing user activity, similar to an in-app notification center.">
          <div className="space-y-2">
            {[
              { icon: UserPlus, iconCls: "bg-blue-100 text-blue-600", title: "New team member", msg: "Alex Johnson joined the workspace.", time: "2 min ago", unread: true },
              { icon: CheckCircle2, iconCls: "bg-green-100 text-green-600", title: "Task completed", msg: "\"Redesign onboarding flow\" has been marked done.", time: "15 min ago", unread: true },
              { icon: MessageSquare, iconCls: "bg-purple-100 text-purple-600", title: "New comment", msg: "Jane left a comment on your dashboard design.", time: "1 hr ago", unread: false },
              { icon: Download, iconCls: "bg-cyan-100 text-cyan-600", title: "Export ready", msg: "Your monthly report is ready to download.", time: "2 hr ago", unread: false },
              { icon: Star, iconCls: "bg-yellow-100 text-yellow-600", title: "New review", msg: "You received a 5-star review from a client.", time: "Yesterday", unread: false },
              { icon: ShoppingCart, iconCls: "bg-orange-100 text-orange-600", title: "New order", msg: "Order #1092 has been placed and is pending.", time: "Yesterday", unread: false },
            ].map(({ icon: Icon, iconCls, title, msg, time, unread }) => (
              <div key={title} className={`flex items-start gap-3 p-3.5 rounded-xl border transition-colors cursor-pointer hover:bg-muted ${unread ? "bg-blue-50/50 border-blue-100" : "border-border"}`}>
                <div className={`size-9 rounded-full shrink-0 flex items-center justify-center ${iconCls}`}>
                  <Icon className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${unread ? "font-semibold text-foreground" : "font-medium text-foreground"}`}>{title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{msg}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="text-xs text-muted-foreground">{time}</span>
                  {unread && <span className="size-2 rounded-full bg-blue-600" />}
                </div>
              </div>
            ))}
          </div>
        </DemoCard>

      </div>
    </div>
  );
}

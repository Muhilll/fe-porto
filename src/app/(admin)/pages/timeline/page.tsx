"use client";

import { CheckCircle2, MessageSquare, AlertCircle, MapPin, Download } from "lucide-react";

export default function TimelinePage() {
  const events = [
    {
      id: 1,
      title: "System Update Completed",
      time: "Just now",
      description: "Successfully updated database schemas and deployed new UI components to production.",
      icon: CheckCircle2,
      color: "text-green-500",
      bg: "bg-green-50",
      border: "border-green-100"
    },
    {
      id: 2,
      title: "New Comment on Project Alpha",
      time: "2 hours ago",
      description: "Sarah Jenkins left a comment on the latest design prototype: 'Looking great! Can we adjust the padding on the hero section?'",
      icon: MessageSquare,
      color: "text-blue-500",
      bg: "bg-blue-50",
      border: "border-blue-100"
    },
    {
      id: 3,
      title: "Server Load Warning",
      time: "Yesterday, 14:20",
      description: "Node-1 reached 85% CPU utilization for 5 consecutive minutes. Auto-scaling policy triggered.",
      icon: AlertCircle,
      color: "text-orange-500",
      bg: "bg-orange-50",
      border: "border-orange-100"
    },
    {
      id: 4,
      title: "User Location Updated",
      time: "Oct 12, 09:15",
      description: "Mark Ruffalo updated their primary office location to New York Branch.",
      icon: MapPin,
      color: "text-purple-500",
      bg: "bg-purple-50",
      border: "border-purple-100"
    },
    {
      id: 5,
      title: "Monthly Report Exported",
      time: "Oct 10, 16:45",
      description: "Financial summary for Q3 2025 was successfully exported by Admin.",
      icon: Download,
      color: "text-muted-foreground",
      bg: "bg-muted",
      border: "border-border"
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Activity Timeline</h1>
        <p className="text-muted-foreground mt-1">Track system events and user activities.</p>
      </div>

      <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
        <div className="relative border-l border-border ml-5 space-y-8 pb-4">
          {events.map((e, idx) => {
            const Icon = e.icon;
            return (
              <div key={e.id} className="relative pl-10">
                {/* Timeline dot/icon */}
                <div className={`absolute left-0 -translate-x-1/2 flex items-center justify-center size-10 rounded-full border-4 border-white ${e.bg}`}>
                  <Icon className={`size-4 ${e.color}`} />
                </div>
                
                {/* Content */}
                <div className={`bg-card border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow ${e.border}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">{e.title}</h3>
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md border border-border/50 whitespace-nowrap">{e.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {e.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

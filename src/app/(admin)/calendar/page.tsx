"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Dummy events for demonstration
const initialEvents = [
  { id: 1, title: "Product Launch Sync", date: 15, type: "primary", time: "10:00 AM", location: "Google Meet" },
  { id: 2, title: "Design Review", date: 18, type: "success", time: "02:00 PM", location: "Conference Room B" },
  { id: 3, title: "Client Workshop", date: 22, type: "warning", time: "09:30 AM", location: "HQ Office" },
  { id: 4, title: "Team Lunch", date: 25, type: "info", time: "12:30 PM", location: "Downtown Cafe" }
];

export default function CalendarPage() {
  const [currentDate] = useState(new Date()); // Using static current date for demo
  const [events] = useState(initialEvents);

  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();
  
  // Calculate days in month and starting day offset
  const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate();
  const startDay = new Date(currentYear, currentDate.getMonth(), 1).getDay();
  
  // Generate calendar grid
  const blanks = Array.from({ length: startDay }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Helper to get color classes based on event type
  const getEventColors = (type) => {
    switch (type) {
      case "primary": return "bg-blue-100 text-blue-700 border-blue-200";
      case "success": return "bg-green-100 text-green-700 border-green-200";
      case "warning": return "bg-orange-100 text-orange-700 border-orange-200";
      case "info":    return "bg-purple-100 text-purple-700 border-purple-200";
      default:        return "bg-muted text-foreground border-border";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
          <p className="text-muted-foreground mt-1">Manage your team's schedule and upcoming events.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm">
          <Plus className="size-4" /> Add Event
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Side - Calendar Grid */}
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          {/* Calendar Toolbar */}
          <div className="flex items-center justify-between p-6 border-b border-border/50">
            <h2 className="text-xl font-bold text-foreground">{currentMonth} {currentYear}</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors border border-border shadow-sm">
                <ChevronLeft className="size-4" />
              </button>
              <button className="px-4 py-1.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors border border-border shadow-sm">
                Today
              </button>
              <button className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors border border-border shadow-sm">
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 border-b border-border/50 bg-muted/50">
            {daysOfWeek.map(day => (
              <div key={day} className="py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 flex-1 auto-rows-[minmax(120px,1fr)]">
            {/* Empty slots before month start */}
            {blanks.map(blank => (
              <div key={`blank-${blank}`} className="border-r border-b border-border/50 bg-muted/30 p-2" />
            ))}
            
            {/* Actual days */}
            {days.map(day => {
              const dayEvents = events.filter(e => e.date === day);
              const isToday = day === currentDate.getDate();
              
              return (
                <div key={day} className={`border-r border-b border-border/50 p-2 transition-colors hover:bg-muted ${isToday ? "bg-blue-50/30" : ""}`}>
                  <div className={`flex items-center justify-center size-7 text-sm font-medium rounded-full mb-1 ${isToday ? "bg-blue-600 text-white" : "text-foreground"}`}>
                    {day}
                  </div>
                  
                  {/* Events for this day */}
                  <div className="space-y-1">
                    {dayEvents.map(evt => (
                      <div key={evt.id} className={`px-2 py-1 text-xs font-medium rounded border truncate ${getEventColors(evt.type)}`}>
                        {evt.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side - Upcoming Events */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-6">
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <CalendarIcon className="size-5" />
              </div>
              <h3 className="font-bold text-foreground">Upcoming Events</h3>
            </div>

            <div className="space-y-4">
              {events.map((evt, i) => (
                <div key={evt.id} className="relative pl-4 pb-4 border-l-2 border-border/50 last:border-transparent last:pb-0">
                  {/* Dot indicator */}
                  <div className={`absolute left-0 top-1 -translate-x-[5px] size-2.5 rounded-full border-2 border-white ${evt.type === 'primary' ? 'bg-blue-500' : evt.type === 'success' ? 'bg-green-500' : evt.type === 'warning' ? 'bg-orange-500' : 'bg-purple-500'}`} />
                  
                  <div className="bg-muted border border-border/50 rounded-xl p-3 hover:border-border hover:shadow-sm transition-all">
                    <h4 className="text-sm font-semibold text-foreground">{evt.title}</h4>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="size-3.5" /> {evt.time} - {currentMonth} {evt.date}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="size-3.5" /> {evt.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

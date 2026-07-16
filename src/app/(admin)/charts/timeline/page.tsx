"use client";
import { Chart } from "@/components/ui/chart";

function ChartCard({ title, description, children, span2 = false }) {
  return (
    <div className={`p-6 bg-card border border-border rounded-xl shadow-sm ${span2 ? "lg:col-span-2" : ""}`}>
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}
      {children}
    </div>
  );
}

export default function TimelinePage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Timeline Charts</h1>
        <p className="text-muted-foreground">Timeline (Gantt-style) charts visualize tasks, events, and schedules over time ranges.</p>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <ChartCard title="Project Timeline" description="Gantt-style chart showing project phases.">
          <Chart type="rangeBar" height={300}
            options={{
              plotOptions: { bar: { horizontal: true, barHeight: "60%", rangeBarGroupRows: true } },
              colors: ["#3b82f6","#10b981","#f59e0b","#8b5cf6","#ef4444"],
              xaxis: { type: "datetime" },
              tooltip: { x: { format: "dd MMM yyyy" } },
              legend: { position: "top" },
              dataLabels: { enabled: true, formatter: (v, opts) => opts.w.globals.labels[opts.dataPointIndex], style: { colors: ["#fff"], fontSize: "10px" } },
            }}
            series={[
              { name: "Planning",     data: [{ x: "Phase", y: [new Date("2024-01-01").getTime(), new Date("2024-01-20").getTime()] }] },
              { name: "Design",       data: [{ x: "Phase", y: [new Date("2024-01-18").getTime(), new Date("2024-02-10").getTime()] }] },
              { name: "Development",  data: [{ x: "Phase", y: [new Date("2024-02-05").getTime(), new Date("2024-04-01").getTime()] }] },
              { name: "Testing",      data: [{ x: "Phase", y: [new Date("2024-03-20").getTime(), new Date("2024-04-20").getTime()] }] },
              { name: "Deployment",   data: [{ x: "Phase", y: [new Date("2024-04-15").getTime(), new Date("2024-05-01").getTime()] }] },
            ]}
          />
        </ChartCard>
        <ChartCard title="Team Task Timeline" description="Tasks assigned to team members.">
          <Chart type="rangeBar" height={320}
            options={{
              plotOptions: { bar: { horizontal: true, barHeight: "55%", borderRadius: 4 } },
              colors: ["#3b82f6","#10b981","#f59e0b","#8b5cf6"],
              xaxis: { type: "datetime" },
              tooltip: { x: { format: "dd MMM" } },
              dataLabels: { enabled: false },
            }}
            series={[
              { name: "Alex",  data: [
                { x: "Frontend",  y: [new Date("2024-02-01").getTime(), new Date("2024-02-15").getTime()] },
                { x: "API Work",  y: [new Date("2024-02-18").getTime(), new Date("2024-03-05").getTime()] },
              ] },
              { name: "Jane",  data: [
                { x: "Design",    y: [new Date("2024-02-03").getTime(), new Date("2024-02-20").getTime()] },
                { x: "Prototype", y: [new Date("2024-02-22").getTime(), new Date("2024-03-10").getTime()] },
              ] },
              { name: "Bob",   data: [
                { x: "Backend",   y: [new Date("2024-02-05").getTime(), new Date("2024-03-01").getTime()] },
                { x: "DevOps",    y: [new Date("2024-03-03").getTime(), new Date("2024-03-20").getTime()] },
              ] },
              { name: "Sara",  data: [
                { x: "QA",        y: [new Date("2024-03-01").getTime(), new Date("2024-03-25").getTime()] },
              ] },
            ]}
          />
        </ChartCard>
      </div>
    </div>
  );
}

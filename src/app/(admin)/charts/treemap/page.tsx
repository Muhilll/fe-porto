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

export default function TreemapPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Treemap Charts</h1>
        <p className="text-muted-foreground">Treemaps display hierarchical data as nested rectangles — size represents the data value.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard span2 title="Revenue by Category" description="Market share visualized as a treemap.">
          <Chart type="treemap" height={320}
            options={{
              colors: ["#3b82f6"],
              plotOptions: { treemap: { enableShades: true, shadeIntensity: 0.5, colorScale: { ranges: [
                { from: 0,  to: 30,  color: "#93c5fd" },
                { from: 31, to: 60,  color: "#3b82f6" },
                { from: 61, to: 100, color: "#1d4ed8" },
              ] } } },
              dataLabels: { enabled: true, style: { fontSize: "12px" } },
            }}
            series={[{ data: [
              { x: "E-Commerce",   y: 90 },
              { x: "SaaS",         y: 75 },
              { x: "Mobile Apps",  y: 60 },
              { x: "Consulting",   y: 45 },
              { x: "Advertising",  y: 35 },
              { x: "Hardware",     y: 28 },
              { x: "Marketplace",  y: 22 },
              { x: "API Services", y: 18 },
              { x: "Other",        y: 12 },
            ] }]}
          />
        </ChartCard>
        <ChartCard title="Multi-color Treemap" description="Each segment with a distinct color.">
          <Chart type="treemap" height={300}
            options={{
              colors: ["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899","#06b6d4","#84cc16"],
              plotOptions: { treemap: { distributed: true, enableShades: false } },
              dataLabels: { style: { fontSize: "11px" } },
              legend: { show: false },
            }}
            series={[{ data: [
              { x: "USA",    y: 80 },
              { x: "UK",     y: 45 },
              { x: "Germany",y: 38 },
              { x: "France", y: 30 },
              { x: "Japan",  y: 25 },
              { x: "Canada", y: 20 },
              { x: "India",  y: 18 },
              { x: "Brazil", y: 14 },
            ] }]}
          />
        </ChartCard>
        <ChartCard title="Technology Stack" description="Time spent per technology in a sprint.">
          <Chart type="treemap" height={300}
            options={{
              colors: ["#8b5cf6"],
              plotOptions: { treemap: { enableShades: true, shadeIntensity: 0.6 } },
              dataLabels: { style: { fontSize: "11px" } },
            }}
            series={[{ data: [
              { x: "React",      y: 45 },
              { x: "Node.js",    y: 30 },
              { x: "PostgreSQL", y: 20 },
              { x: "Redis",      y: 12 },
              { x: "Docker",     y: 18 },
              { x: "Nginx",      y: 8 },
              { x: "TypeScript", y: 25 },
              { x: "GraphQL",    y: 10 },
            ] }]}
          />
        </ChartCard>
      </div>
    </div>
  );
}

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

const skills = ["JavaScript","TypeScript","React","Node.js","CSS","SQL","DevOps"];

export default function RadarChartPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Radar Charts</h1>
        <p className="text-muted-foreground">Radar (spider) charts display multivariate data on a two-dimensional chart with multiple axes.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Basic Radar Chart" description="Single-series skill assessment.">
          <Chart type="radar" height={300}
            options={{ xaxis: { categories: skills }, colors: ["#3b82f6"], fill: { opacity: 0.25 }, stroke: { width: 2 }, markers: { size: 4 }, yaxis: { show: false } }}
            series={[{ name: "Score", data: [80, 70, 90, 75, 85, 65, 60] }]}
          />
        </ChartCard>
        <ChartCard title="Multi-series Radar" description="Comparing two candidates across skills.">
          <Chart type="radar" height={300}
            options={{ xaxis: { categories: skills }, colors: ["#3b82f6","#10b981"], fill: { opacity: 0.2 }, stroke: { width: 2 }, markers: { size: 4 }, yaxis: { show: false }, legend: { position: "top" } }}
            series={[{ name: "Candidate A", data: [80, 70, 90, 75, 85, 65, 60] }, { name: "Candidate B", data: [65, 85, 70, 80, 60, 90, 75] }]}
          />
        </ChartCard>
        <ChartCard title="Polygonal Radar" description="Radar chart with straight lines between points.">
          <Chart type="radar" height={300}
            options={{ xaxis: { categories: ["Speed","Reliability","Ease of Use","Features","Support","Price"] }, colors: ["#8b5cf6"], fill: { opacity: 0.3 }, stroke: { width: 2 }, plotOptions: { radar: { polygons: { strokeColors: "#e5e7eb", fill: { colors: ["#f9fafb","#fff"] } } } }, yaxis: { show: false } }}
            series={[{ name: "Product Rating", data: [88, 72, 90, 78, 65, 80] }]}
          />
        </ChartCard>
        <ChartCard title="Team Performance" description="Five teams rated across six dimensions.">
          <Chart type="radar" height={300}
            options={{ xaxis: { categories: ["Delivery","Quality","Communication","Innovation","Teamwork","Speed"] }, colors: ["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6"], fill: { opacity: 0.1 }, stroke: { width: 2 }, markers: { size: 3 }, yaxis: { show: false }, legend: { position: "bottom" } }}
            series={[
              { name: "Alpha",   data: [80, 85, 70, 90, 75, 88] },
              { name: "Beta",    data: [65, 70, 80, 60, 85, 72] },
              { name: "Gamma",   data: [90, 75, 85, 70, 80, 78] },
            ]}
          />
        </ChartCard>
      </div>
    </div>
  );
}

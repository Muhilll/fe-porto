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

const COLORS = ["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899","#06b6d4","#84cc16"];

export default function PolarAreaPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Polar Area Charts</h1>
        <p className="text-muted-foreground">Polar area charts are similar to pie charts but each segment has the same angle — only the radius changes.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Basic Polar Area" description="Simple polar area with equal-angle segments.">
          <Chart type="polarArea" height={320}
            options={{ labels: ["React","Vue","Angular","Svelte","Next.js"], colors: COLORS, legend: { position: "bottom" }, fill: { opacity: 0.8 }, stroke: { colors: ["#fff"], width: 2 }, yaxis: { show: false } }}
            series={[42, 27, 18, 8, 55]}
          />
        </ChartCard>
        <ChartCard title="Market Distribution" description="Market share across different channels.">
          <Chart type="polarArea" height={320}
            options={{ labels: ["Organic","Paid Search","Social","Referral","Email","Direct"], colors: COLORS, legend: { position: "bottom" }, fill: { opacity: 0.85 }, stroke: { colors: ["#fff"], width: 2 }, yaxis: { show: false } }}
            series={[35, 25, 18, 12, 6, 4]}
          />
        </ChartCard>
        <ChartCard title="Performance Metrics" description="Six KPIs displayed as polar area segments.">
          <Chart type="polarArea" height={320}
            options={{ labels: ["Speed","Accuracy","Coverage","Uptime","Security","Support"], colors: ["#8b5cf6","#ec4899","#06b6d4","#10b981","#f59e0b","#3b82f6"], legend: { position: "bottom" }, fill: { opacity: 0.75, type: "gradient" }, stroke: { width: 2 }, yaxis: { show: false } }}
            series={[88, 75, 91, 99, 82, 70]}
          />
        </ChartCard>
        <ChartCard title="Budget Allocation" description="Department budget as a polar area chart.">
          <Chart type="polarArea" height={320}
            options={{ labels: ["Engineering","Sales","Marketing","HR","Operations","R&D"], colors: COLORS, legend: { position: "bottom" }, fill: { opacity: 0.8 }, stroke: { colors: ["#fff"], width: 2 }, yaxis: { show: false }, tooltip: { y: { formatter: (v) => "$" + v + "K" } } }}
            series={[320, 180, 140, 80, 120, 220]}
          />
        </ChartCard>
      </div>
    </div>
  );
}

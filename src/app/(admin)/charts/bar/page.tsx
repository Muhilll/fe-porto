"use client";
import { Chart } from "@/components/ui/chart";

function ChartCard({ title, description, children }) {
  return (
    <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}
      {children}
    </div>
  );
}

export default function BarChartPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Bar Charts</h1>
        <p className="text-muted-foreground">Horizontal bar charts for comparing values across categories.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Basic Bar Chart" description="Simple horizontal bar chart.">
          <Chart type="bar" height={280}
            options={{ xaxis: { categories: ["Team Alpha","Team Beta","Team Gamma","Team Delta","Team Epsilon","Team Zeta"] }, colors: ["#3b82f6"], plotOptions: { bar: { horizontal: true, borderRadius: 4 } }, dataLabels: { enabled: false } }}
            series={[{ name: "Performance", data: [44, 55, 57, 56, 61, 58] }]}
          />
        </ChartCard>
        <ChartCard title="Grouped Bar Chart" description="Multiple series side by side.">
          <Chart type="bar" height={280}
            options={{ xaxis: { categories: ["Q1","Q2","Q3","Q4"] }, colors: ["#3b82f6","#10b981"], plotOptions: { bar: { horizontal: true, borderRadius: 4, barHeight: "60%" } }, dataLabels: { enabled: false } }}
            series={[{ name: "2024", data: [44, 55, 41, 67] }, { name: "2025", data: [13, 23, 20, 8] }]}
          />
        </ChartCard>
        <ChartCard title="Stacked Bar Chart" description="Bars stacked to show part-to-whole relationships.">
          <Chart type="bar" height={280}
            options={{ xaxis: { categories: ["Mon","Tue","Wed","Thu","Fri"] }, colors: ["#3b82f6","#10b981","#f59e0b"], plotOptions: { bar: { horizontal: true, borderRadius: 4, stacked: true } }, chart: { stacked: true }, dataLabels: { enabled: false } }}
            series={[{ name: "Bug Fixes", data: [20, 30, 25, 18, 22] }, { name: "Features", data: [15, 12, 18, 25, 15] }, { name: "Refactor", data: [10, 8, 12, 10, 14] }]}
          />
        </ChartCard>
        <ChartCard title="Negative Bar Chart" description="Bar chart with positive and negative values.">
          <Chart type="bar" height={280}
            options={{ xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun"] }, colors: ["#8b5cf6"], plotOptions: { bar: { horizontal: true, borderRadius: 4 } }, dataLabels: { enabled: false } }}
            series={[{ name: "Net Change", data: [45, -30, 28, -51, 42, -19] }]}
          />
        </ChartCard>
      </div>
    </div>
  );
}

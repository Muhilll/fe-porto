"use client";
import { Chart } from "@/components/ui/chart";

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function ChartCard({ title, description, children }) {
  return (
    <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}
      {children}
    </div>
  );
}

export default function AreaChartPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Area Charts</h1>
        <p className="text-muted-foreground">Area charts emphasize the magnitude of change over time and the total value across a trend.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Basic Area Chart" description="Simple area chart with gradient fill.">
          <Chart type="area" height={280}
            options={{ xaxis: { categories: months }, colors: ["#3b82f6"], fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.05 } }, stroke: { curve: "smooth", width: 2 }, dataLabels: { enabled: false } }}
            series={[{ name: "Revenue", data: [31,40,28,51,42,109,100,87,65,92,74,111] }]}
          />
        </ChartCard>
        <ChartCard title="Spline Area Chart" description="Smooth curved area chart.">
          <Chart type="area" height={280}
            options={{ xaxis: { categories: months }, colors: ["#10b981"], fill: { type: "gradient", gradient: { opacityFrom: 0.45, opacityTo: 0.05 } }, stroke: { curve: "smooth", width: 2 }, dataLabels: { enabled: false } }}
            series={[{ name: "Users", data: [11,32,45,32,34,52,41,78,55,90,70,88] }]}
          />
        </ChartCard>
        <ChartCard title="Stacked Area Chart" description="Multiple series stacked on top of each other.">
          <Chart type="area" height={280}
            options={{ xaxis: { categories: months }, colors: ["#3b82f6","#10b981","#f59e0b"], fill: { type: "gradient", gradient: { opacityFrom: 0.5, opacityTo: 0.1 } }, stroke: { curve: "smooth", width: 2 }, dataLabels: { enabled: false }, chart: { stacked: true } }}
            series={[{ name: "Product A", data: [31,40,28,51,42,89,66,51,49,72,55,85] }, { name: "Product B", data: [11,32,45,32,34,52,41,31,31,39,29,45] }, { name: "Product C", data: [20,12,18,15,12,20,15,22,18,25,20,30] }]}
          />
        </ChartCard>
        <ChartCard title="Negative Area Chart" description="Area chart showing positive and negative values.">
          <Chart type="area" height={280}
            options={{ xaxis: { categories: months }, colors: ["#8b5cf6"], fill: { type: "gradient", gradient: { opacityFrom: 0.45, opacityTo: 0.05 } }, stroke: { curve: "smooth", width: 2 }, dataLabels: { enabled: false } }}
            series={[{ name: "Profit", data: [31,-40,28,-51,42,-109,100,-87,65,-92,74,111] }]}
          />
        </ChartCard>
      </div>
    </div>
  );
}

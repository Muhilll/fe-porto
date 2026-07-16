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

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function LineChartPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Line Charts</h1>
        <p className="text-muted-foreground">Line charts display data as a series of points connected by lines, ideal for showing trends over time.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Basic Line Chart" description="Simple line chart with markers.">
          <Chart type="line" height={280}
            options={{ xaxis: { categories: months }, colors: ["#3b82f6"], stroke: { curve: "smooth", width: 2 }, markers: { size: 4 }, dataLabels: { enabled: false } }}
            series={[{ name: "Revenue", data: [31, 40, 28, 51, 42, 109, 100, 87, 65, 92, 74, 111] }]}
          />
        </ChartCard>
        <ChartCard title="Multi-line Chart" description="Multiple lines for comparing trends.">
          <Chart type="line" height={280}
            options={{ xaxis: { categories: months }, colors: ["#3b82f6","#10b981","#f59e0b"], stroke: { curve: "smooth", width: 2 }, markers: { size: 3 }, dataLabels: { enabled: false }, legend: { position: "top" } }}
            series={[
              { name: "2023", data: [31, 40, 28, 51, 42, 89, 66, 51, 49, 72, 55, 85] },
              { name: "2024", data: [50, 60, 55, 70, 65, 98, 88, 75, 80, 100, 90, 120] },
              { name: "2025", data: [65, 75, 68, 82, 79, 110, 100, 90, 95, 118, 105, 135] },
            ]}
          />
        </ChartCard>
        <ChartCard title="Straight Line Chart" description="Line chart without curve smoothing.">
          <Chart type="line" height={280}
            options={{ xaxis: { categories: months }, colors: ["#8b5cf6","#ec4899"], stroke: { curve: "straight", width: 2, dashArray: [0, 5] }, markers: { size: 4 }, dataLabels: { enabled: false } }}
            series={[{ name: "Actual", data: [40, 50, 45, 60, 55, 70, 65, 75, 70, 85, 80, 95] }, { name: "Forecast", data: [38, 48, 47, 62, 57, 72, 67, 77, 72, 87, 82, 97] }]}
          />
        </ChartCard>
        <ChartCard title="Step Line Chart" description="Data connected with a step function.">
          <Chart type="line" height={280}
            options={{ xaxis: { categories: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"] }, colors: ["#10b981"], stroke: { curve: "stepline", width: 3 }, markers: { size: 5 }, dataLabels: { enabled: false } }}
            series={[{ name: "Server Status", data: [100, 98, 100, 95, 100, 97, 100] }]}
          />
        </ChartCard>
        <ChartCard span2 title="Gradient Line Chart" description="Line with gradient color effect and area fill.">
          <Chart type="line" height={280}
            options={{
              xaxis: { categories: months },
              colors: ["#3b82f6"],
              stroke: { curve: "smooth", width: 3 },
              markers: { size: 5, hover: { sizeOffset: 3 } },
              fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.2, opacityTo: 0, stops: [0, 100] } },
              dataLabels: { enabled: false },
            }}
            series={[{ name: "Monthly Active Users", data: [12000, 15000, 13000, 18000, 16000, 22000, 20000, 24000, 21000, 28000, 25000, 32000] }]}
          />
        </ChartCard>
      </div>
    </div>
  );
}

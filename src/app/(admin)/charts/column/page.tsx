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

export default function ColumnChartPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Column Charts</h1>
        <p className="text-muted-foreground">Vertical bar (column) charts for comparing values across categories over time.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Basic Column Chart" description="Single-series vertical bar chart.">
          <Chart type="bar" height={280}
            options={{ xaxis: { categories: months }, colors: ["#3b82f6"], plotOptions: { bar: { borderRadius: 6, columnWidth: "55%" } }, dataLabels: { enabled: false } }}
            series={[{ name: "Sales", data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 75, 68, 85] }]}
          />
        </ChartCard>
        <ChartCard title="Grouped Column Chart" description="Multiple series displayed side by side.">
          <Chart type="bar" height={280}
            options={{ xaxis: { categories: ["Q1","Q2","Q3","Q4"] }, colors: ["#3b82f6","#10b981","#f59e0b"], plotOptions: { bar: { borderRadius: 5, columnWidth: "65%" } }, dataLabels: { enabled: false } }}
            series={[{ name: "2023", data: [44, 55, 57, 56] }, { name: "2024", data: [76, 85, 101, 98] }, { name: "2025", data: [35, 41, 36, 26] }]}
          />
        </ChartCard>
        <ChartCard title="Stacked Column Chart" description="Bars stacked to show component breakdown.">
          <Chart type="bar" height={280}
            options={{ xaxis: { categories: months.slice(0,6) }, colors: ["#3b82f6","#10b981","#f59e0b"], plotOptions: { bar: { borderRadius: 4, columnWidth: "60%", stacked: true } }, chart: { stacked: true }, dataLabels: { enabled: false } }}
            series={[{ name: "Direct", data: [44, 55, 57, 56, 61, 58] }, { name: "Referral", data: [13, 23, 20, 8, 13, 27] }, { name: "Social", data: [11, 17, 15, 15, 21, 14] }]}
          />
        </ChartCard>
        <ChartCard title="Gradient Column Chart" description="Columns with a gradient fill effect.">
          <Chart type="bar" height={280}
            options={{ xaxis: { categories: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"] }, colors: ["#8b5cf6"], fill: { type: "gradient", gradient: { shade: "light", type: "vertical", gradientToColors: ["#ec4899"], opacityFrom: 1, opacityTo: 0.7 } }, plotOptions: { bar: { borderRadius: 8, columnWidth: "50%" } }, dataLabels: { enabled: false } }}
            series={[{ name: "Visitors", data: [1200, 1800, 900, 2100, 1700, 2500, 1400] }]}
          />
        </ChartCard>
        <ChartCard span2 title="Data Labels Column Chart" description="Columns with value labels displayed on top.">
          <Chart type="bar" height={280}
            options={{ xaxis: { categories: months }, colors: ["#3b82f6"], plotOptions: { bar: { borderRadius: 5, columnWidth: "50%", dataLabels: { position: "top" } } }, dataLabels: { enabled: true, offsetY: -20, style: { fontSize: "10px", colors: ["#374151"] } } }}
            series={[{ name: "Orders", data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 75, 68, 85] }]}
          />
        </ChartCard>
      </div>
    </div>
  );
}

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

export default function MixedChartPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Mixed Charts</h1>
        <p className="text-muted-foreground">Combine multiple chart types in a single chart for richer data storytelling.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard span2 title="Bar + Line (Revenue & Growth)" description="Column bars for revenue with a line showing growth rate.">
          <Chart type="bar" height={300}
            options={{
              xaxis: { categories: months },
              colors: ["#3b82f6","#10b981"],
              plotOptions: { bar: { borderRadius: 5, columnWidth: "50%" } },
              dataLabels: { enabled: false },
              yaxis: [
                { title: { text: "Revenue ($K)" } },
                { opposite: true, title: { text: "Growth (%)" }, labels: { formatter: (v) => v + "%" } },
              ],
              stroke: { width: [0, 3], curve: "smooth" },
              legend: { position: "top" },
            }}
            series={[
              { name: "Revenue", type: "bar",  data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 75, 68, 85] },
              { name: "Growth",  type: "line", data: [5, 8, 3, 6, 9, 4, 7, 6, 10, 12, 8, 15] },
            ]}
          />
        </ChartCard>
        <ChartCard title="Area + Line" description="Area chart combined with a trend line.">
          <Chart type="area" height={280}
            options={{
              xaxis: { categories: months.slice(0, 6) },
              colors: ["#8b5cf6","#f59e0b"],
              stroke: { width: [2, 3], curve: "smooth" },
              fill: { opacity: [0.2, 1] },
              dataLabels: { enabled: false },
            }}
            series={[
              { name: "Actual",   type: "area", data: [31, 40, 28, 51, 42, 68] },
              { name: "Target",   type: "line", data: [35, 38, 42, 48, 52, 58] },
            ]}
          />
        </ChartCard>
        <ChartCard title="Bar + Area + Line" description="Three chart types in one view.">
          <Chart type="bar" height={280}
            options={{
              xaxis: { categories: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"] },
              colors: ["#3b82f6","#10b981","#f59e0b"],
              plotOptions: { bar: { columnWidth: "40%", borderRadius: 4 } },
              dataLabels: { enabled: false },
              stroke: { width: [0, 2, 3], curve: "smooth" },
              fill: { opacity: [1, 0.3, 1] },
              yaxis: [
                { title: { text: "Sessions" } },
                { opposite: true, title: { text: "Users" } },
                { opposite: true, show: false },
              ],
            }}
            series={[
              { name: "Sessions", type: "bar",  data: [1200, 1800, 900, 2100, 1700, 2500, 1400] },
              { name: "Users",    type: "area", data: [800, 1200, 700, 1500, 1200, 1800, 1000] },
              { name: "Bounce %", type: "line", data: [40, 38, 45, 36, 39, 35, 42] },
            ]}
          />
        </ChartCard>
      </div>
    </div>
  );
}

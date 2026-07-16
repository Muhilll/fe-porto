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

const COLORS = ["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899","#06b6d4"];

export default function PieChartPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Pie Charts</h1>
        <p className="text-muted-foreground">Pie and donut charts show the proportional breakdown of a dataset.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Basic Pie Chart" description="Simple proportional pie chart.">
          <Chart type="pie" height={300}
            options={{ labels: ["Direct","Social","Referral","Email","Organic"], colors: COLORS, legend: { position: "bottom" }, dataLabels: { style: { fontSize: "11px" } } }}
            series={[44, 22, 15, 12, 7]}
          />
        </ChartCard>
        <ChartCard title="Donut Chart" description="Pie chart with an empty center (donut style).">
          <Chart type="donut" height={300}
            options={{ labels: ["Product A","Product B","Product C","Product D"], colors: COLORS, legend: { position: "bottom" }, plotOptions: { pie: { donut: { size: "65%", labels: { show: true, total: { show: true, label: "Total", formatter: () => "100%" } } } } } }}
            series={[40, 25, 20, 15]}
          />
        </ChartCard>
        <ChartCard title="Semi-Donut Chart" description="Half-circle donut showing percentage.">
          <Chart type="donut" height={250}
            options={{ labels: ["Completed","Remaining"], colors: ["#3b82f6","#e5e7eb"], legend: { show: false }, plotOptions: { pie: { startAngle: -90, endAngle: 90, offsetY: 10, donut: { size: "75%", labels: { show: true, total: { show: true, label: "Progress", formatter: () => "67%" } } } } }, stroke: { show: false } }}
            series={[67, 33]}
          />
        </ChartCard>
        <ChartCard title="Exploded Pie Chart" description="Exploded slices for emphasis.">
          <Chart type="pie" height={300}
            options={{ labels: ["Chrome","Firefox","Safari","Edge","Other"], colors: COLORS, legend: { position: "bottom" }, plotOptions: { pie: { expandOnClick: true } }, dataLabels: { formatter: (v, opts) => opts.w.globals.labels[opts.seriesIndex] + ": " + v.toFixed(0) + "%" } }}
            series={[61.4, 4.5, 19.3, 4.1, 10.7]}
          />
        </ChartCard>
        <ChartCard span2 title="Donut with Custom Label" description="Donut chart with center text displaying dynamic total.">
          <Chart type="donut" height={300}
            options={{
              labels: ["Employees","Contractors","Interns","Partners"],
              colors: ["#3b82f6","#10b981","#f59e0b","#8b5cf6"],
              legend: { position: "right", offsetY: 40 },
              plotOptions: { pie: { donut: { size: "70%", labels: { show: true, name: { show: true, fontSize: "16px" }, value: { show: true, fontSize: "22px", fontWeight: 700 }, total: { show: true, label: "Total Staff", formatter: () => "248" } } } } },
            }}
            series={[142, 58, 28, 20]}
          />
        </ChartCard>
      </div>
    </div>
  );
}

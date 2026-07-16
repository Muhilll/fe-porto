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

export default function RadialBarPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Radial Bar Charts</h1>
        <p className="text-muted-foreground">Radial bar charts display data as circular arcs — great for showing progress and KPI completion.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Single Radial Bar" description="Single gauge showing a percentage completion.">
          <Chart type="radialBar" height={300}
            options={{
              colors: ["#3b82f6"],
              plotOptions: { radialBar: { hollow: { size: "65%" }, dataLabels: { name: { show: true, fontSize: "14px" }, value: { show: true, fontSize: "28px", fontWeight: 700, formatter: (v) => v + "%" } } } },
              labels: ["Progress"],
            }}
            series={[76]}
          />
        </ChartCard>
        <ChartCard title="Multiple Radial Bars" description="Multiple concentric arcs for comparison.">
          <Chart type="radialBar" height={300}
            options={{
              colors: ["#3b82f6","#10b981","#f59e0b","#ef4444"],
              plotOptions: { radialBar: { dataLabels: { name: { fontSize: "12px" }, value: { fontSize: "14px" }, total: { show: true, label: "Average", formatter: () => "71%" } } } },
              labels: ["Design","Development","Marketing","Support"],
            }}
            series={[90, 75, 60, 58]}
          />
        </ChartCard>
        <ChartCard title="Semi-circle Gauge" description="Half-circle gauge for speedometer-style display.">
          <Chart type="radialBar" height={280}
            options={{
              colors: ["#10b981"],
              plotOptions: { radialBar: { startAngle: -90, endAngle: 90, hollow: { size: "60%" }, dataLabels: { name: { show: true, fontSize: "14px", offsetY: 60 }, value: { offsetY: 20, fontSize: "32px", fontWeight: 700 } }, track: { background: "#e5e7eb", startAngle: -90, endAngle: 90 } } },
              labels: ["Score"],
              stroke: { lineCap: "round" },
            }}
            series={[83]}
          />
        </ChartCard>
        <ChartCard title="Custom Style Gauge" description="Gradient fill with custom label styling.">
          <Chart type="radialBar" height={280}
            options={{
              colors: ["#8b5cf6"],
              plotOptions: { radialBar: { hollow: { size: "55%", background: "#faf5ff" }, track: { background: "#ede9fe" }, dataLabels: { name: { color: "#6d28d9", fontSize: "14px" }, value: { color: "#7c3aed", fontSize: "30px", fontWeight: 800 } } } },
              fill: { type: "gradient", gradient: { shade: "dark", type: "horizontal", gradientToColors: ["#ec4899"], stops: [0, 100] } },
              stroke: { lineCap: "round" },
              labels: ["Efficiency"],
            }}
            series={[91]}
          />
        </ChartCard>
        <ChartCard span2 title="KPI Dashboard" description="Four radial bars for key performance indicators.">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Revenue", value: 88, color: "#3b82f6" },
              { label: "Customers", value: 73, color: "#10b981" },
              { label: "Satisfaction", value: 95, color: "#f59e0b" },
              { label: "Retention", value: 67, color: "#8b5cf6" },
            ].map(({ label, value, color }) => (
              <div key={label}>
                <Chart type="radialBar" height={180}
                  options={{
                    colors: [color],
                    plotOptions: { radialBar: { hollow: { size: "55%" }, dataLabels: { name: { fontSize: "11px" }, value: { fontSize: "18px", fontWeight: 700, formatter: (v) => v + "%" } } } },
                    labels: [label],
                    stroke: { lineCap: "round" },
                  }}
                  series={[value]}
                />
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}

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

const sparkOpts = {
  chart: { sparkline: { enabled: true } },
  stroke: { curve: "smooth", width: 2 },
  tooltip: { fixed: { enabled: false }, x: { show: false }, marker: { show: false } },
};

const kpis = [
  { label: "Total Revenue", value: "$84,240", change: "+12.5%", up: true, color: "#3b82f6", data: [31,40,28,51,42,109,100,87,65,92,74,111] },
  { label: "New Customers", value: "3,842",   change: "+8.2%",  up: true, color: "#10b981", data: [11,32,45,32,34,52,41,31,31,39,29,45] },
  { label: "Bounce Rate",   value: "24.8%",   change: "-3.1%",  up: true, color: "#8b5cf6", data: [40,35,38,30,28,32,25,27,30,24,26,22] },
  { label: "Support Tickets",value: "128",    change: "+4.0%",  up: false,color: "#ef4444", data: [20,25,18,30,22,28,24,32,20,26,30,35] },
];

export default function SparklinesPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Sparklines</h1>
        <p className="text-muted-foreground">Sparklines are small, lightweight charts that fit inside a table cell or stat card to show a trend at a glance.</p>
      </div>

      {/* KPI Cards with Sparklines */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(({ label, value, change, up, color, data }) => (
          <div key={label} className="p-4 bg-card border border-border rounded-xl shadow-sm space-y-2">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-xl font-bold">{value}</p>
            <Chart type="line" height={50}
              options={{ ...sparkOpts, colors: [color], fill: { type: "gradient", gradient: { opacityFrom: 0.3, opacityTo: 0 } } }}
              series={[{ data }]}
            />
            <span className={`text-xs font-semibold ${up ? "text-green-600" : "text-red-500"}`}>{change} vs last month</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Sparkline Types */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Sparkline Types</h2>
          <div className="space-y-5">
            {[
              { label: "Line Sparkline", type: "line", color: "#3b82f6",  data: [31,40,28,51,42,89,66,51,49,72] },
              { label: "Bar Sparkline",  type: "bar",  color: "#10b981",  data: [44,55,41,67,22,43,21,41,56,27] },
              { label: "Area Sparkline", type: "area", color: "#8b5cf6",  data: [20,35,25,48,36,60,45,52,38,70] },
            ].map(({ label, type, color, data }) => (
              <div key={label} className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground w-32 shrink-0">{label}</span>
                <div className="flex-1">
                  <Chart type={type} height={40}
                    options={{ ...sparkOpts, colors: [color], plotOptions: { bar: { columnWidth: "80%" } }, fill: { opacity: type === "area" ? 0.3 : 1 } }}
                    series={[{ data }]}
                  />
                </div>
                <span className="text-sm font-bold text-foreground w-10 text-right">{data[data.length - 1]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sparklines in Table */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Sparklines in Table</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-2 font-semibold text-xs text-muted-foreground uppercase">Product</th>
                <th className="pb-2 font-semibold text-xs text-muted-foreground uppercase">Trend</th>
                <th className="pb-2 font-semibold text-xs text-muted-foreground uppercase text-right">Sales</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { name: "Headphones",  data: [30,40,35,50,45,60,55], val: 2840, color: "#3b82f6" },
                { name: "Keyboard",    data: [20,25,18,30,22,28,35], val: 1620, color: "#10b981" },
                { name: "Monitor",     data: [50,45,55,48,60,52,65], val: 4210, color: "#8b5cf6" },
                { name: "Webcam",      data: [15,18,12,20,16,22,19], val: 980,  color: "#f59e0b" },
                { name: "USB Hub",     data: [40,35,42,38,45,40,48], val: 1750, color: "#ef4444" },
              ].map(({ name, data, val, color }) => (
                <tr key={name}>
                  <td className="py-2 font-medium">{name}</td>
                  <td className="py-1 w-28">
                    <Chart type="line" height={32}
                      options={{ ...sparkOpts, colors: [color], stroke: { width: 2, curve: "smooth" } }}
                      series={[{ data }]}
                    />
                  </td>
                  <td className="py-2 text-right font-semibold">${val.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Win/Loss Sparklines */}
        <ChartCard span2 title="Win / Loss Sparklines" description="Bar sparklines showing wins (+) and losses (−) at a glance.">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Team Alpha", data: [1,-1,1,1,-1,1,1,1,-1,1] },
              { name: "Team Beta",  data: [-1,1,-1,1,1,-1,1,-1,1,1] },
              { name: "Team Gamma", data: [1,1,1,-1,1,1,-1,1,1,-1] },
              { name: "Team Delta", data: [-1,-1,1,1,-1,1,1,-1,1,1] },
            ].map(({ name, data }) => {
              const wins = data.filter((d) => d > 0).length;
              return (
                <div key={name} className="space-y-1">
                  <p className="text-sm font-medium">{name}</p>
                  <Chart type="bar" height={50}
                    options={{ ...sparkOpts, colors: ["#10b981"], plotOptions: { bar: { columnWidth: "80%", colors: { ranges: [{ from: -1, to: 0, color: "#ef4444" }] } } } }}
                    series={[{ data }]}
                  />
                  <p className="text-xs text-muted-foreground">{wins}W – {10-wins}L</p>
                </div>
              );
            })}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}

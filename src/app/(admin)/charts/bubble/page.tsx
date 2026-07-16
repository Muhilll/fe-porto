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

export default function BubbleChartPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Bubble Charts</h1>
        <p className="text-muted-foreground">Bubble charts display three dimensions of data — x, y, and bubble size.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Basic Bubble Chart" description="Three-dimensional data visualization.">
          <Chart type="bubble" height={300}
            options={{ xaxis: { min: 0, max: 100, tickAmount: 5 }, yaxis: { min: 0, max: 100 }, colors: ["#3b82f6","#10b981","#f59e0b"], dataLabels: { enabled: false }, fill: { opacity: 0.7 } }}
            series={[
              { name: "Product A", data: [[20,30,40],[40,60,25],[60,20,35],[80,50,55]] },
              { name: "Product B", data: [[15,50,30],[35,70,45],[55,40,60],[75,60,20]] },
              { name: "Product C", data: [[25,40,50],[45,55,35],[65,30,25],[85,70,40]] },
            ]}
          />
        </ChartCard>
        <ChartCard title="3D Bubble Chart" description="Larger bubbles with 3D-style gradient fill.">
          <Chart type="bubble" height={300}
            options={{ xaxis: { min: 0, max: 120 }, yaxis: { min: 0, max: 120 }, colors: ["#8b5cf6","#ec4899"], dataLabels: { enabled: false }, fill: { type: "gradient", gradient: { gradientToColors: ["#d946ef","#f43f5e"], opacityFrom: 0.9, opacityTo: 0.6 } } }}
            series={[
              { name: "Group 1", data: [[10,30,50],[30,50,30],[50,20,70],[70,80,40],[90,60,60]] },
              { name: "Group 2", data: [[20,60,35],[40,30,45],[60,70,55],[80,40,30],[100,80,50]] },
            ]}
          />
        </ChartCard>
        <ChartCard title="Market Share Bubble" description="Market share across segments by size." className="lg:col-span-2">
          <Chart type="bubble" height={300}
            options={{ xaxis: { title: { text: "Growth Rate (%)" }, min: -20, max: 60 }, yaxis: { title: { text: "Market Share (%)" }, min: 0, max: 80 }, colors: ["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6"], dataLabels: { enabled: true, formatter: (v, opts) => opts.w.config.series[opts.seriesIndex].name }, fill: { opacity: 0.65 } }}
            series={[
              { name: "Cloud", data: [[45,65,80]] },
              { name: "Mobile", data: [[30,50,60]] },
              { name: "Desktop", data: [[-5,35,90]] },
              { name: "IoT", data: [[55,20,40]] },
              { name: "AI/ML", data: [[58,45,70]] },
            ]}
          />
        </ChartCard>
      </div>
    </div>
  );
}

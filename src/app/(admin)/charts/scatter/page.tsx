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

export default function ScatterPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Scatter Charts</h1>
        <p className="text-muted-foreground">Scatter plots show the relationship and distribution between two numeric variables.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Basic Scatter Plot" description="Simple two-variable scatter chart.">
          <Chart type="scatter" height={300}
            options={{ xaxis: { title: { text: "Hours Studied" }, min: 0, max: 10 }, yaxis: { title: { text: "Exam Score" }, min: 40, max: 100 }, colors: ["#3b82f6"], markers: { size: 6 }, dataLabels: { enabled: false } }}
            series={[{ name: "Students", data: [[1,52],[2,58],[2.5,61],[3,65],[4,70],[4.5,72],[5,74],[5.5,78],[6,82],[7,85],[7.5,88],[8,90],[9,93],[9.5,96]] }]}
          />
        </ChartCard>
        <ChartCard title="Multi-group Scatter" description="Multiple groups of data points.">
          <Chart type="scatter" height={300}
            options={{ xaxis: { min: 0, max: 100 }, yaxis: { min: 0, max: 100 }, colors: ["#3b82f6","#10b981","#f59e0b"], markers: { size: 7 }, dataLabels: { enabled: false }, legend: { position: "top" } }}
            series={[
              { name: "Group A", data: [[15,20],[25,35],[35,15],[45,45],[55,30],[65,50]] },
              { name: "Group B", data: [[20,60],[30,70],[40,55],[50,75],[60,65],[70,80]] },
              { name: "Group C", data: [[25,90],[35,80],[45,85],[55,92],[65,88],[75,95]] },
            ]}
          />
        </ChartCard>
        <ChartCard title="Scatter with Regression" description="Scatter plot with a trend line overlay.">
          <Chart type="scatter" height={300}
            options={{ xaxis: { min: 0, max: 120, title: { text: "Marketing Spend ($K)" } }, yaxis: { min: 0, max: 100, title: { text: "Sales ($K)" } }, colors: ["#8b5cf6","#ef4444"], markers: { size: [6, 0] }, dataLabels: { enabled: false }, stroke: { width: [0, 2], curve: "straight", dashArray: [0, 5] } }}
            series={[
              { name: "Data Points", type: "scatter", data: [[10,12],[20,22],[30,28],[40,38],[50,44],[60,55],[70,61],[80,70],[90,78],[100,85],[110,90]] },
              { name: "Trend",       type: "line",    data: [[0,2],[120,97]] },
            ]}
          />
        </ChartCard>
        <ChartCard title="Customer Segmentation" description="Customers clustered by spend and frequency.">
          <Chart type="scatter" height={300}
            options={{ xaxis: { title: { text: "Purchase Frequency" }, min: 0, max: 30 }, yaxis: { title: { text: "Avg Order Value ($)" }, min: 0, max: 500 }, colors: ["#ef4444","#f59e0b","#10b981"], markers: { size: 8 }, dataLabels: { enabled: false }, legend: { position: "top" } }}
            series={[
              { name: "Occasional", data: [[2,50],[3,80],[1,40],[4,100],[2,70],[3,60]] },
              { name: "Regular",    data: [[8,120],[10,180],[12,150],[9,160],[11,140],[10,200]] },
              { name: "Loyal",      data: [[20,350],[22,400],[18,320],[25,450],[21,380],[24,420]] },
            ]}
          />
        </ChartCard>
      </div>
    </div>
  );
}

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

export default function BoxplotPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Boxplot Charts</h1>
        <p className="text-muted-foreground">Boxplots display the distribution of a dataset — minimum, Q1, median, Q3, and maximum.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Basic Boxplot" description="Distribution of values across categories.">
          <Chart type="boxPlot" height={300}
            options={{
              colors: ["#3b82f6","#ef4444"],
              xaxis: { type: "category" },
              plotOptions: { boxPlot: { colors: { upper: "#3b82f6", lower: "#93c5fd" } } },
            }}
            series={[{
              type: "boxPlot",
              data: [
                { x: "Team A", y: [54, 66, 69, 75, 88] },
                { x: "Team B", y: [43, 65, 69, 76, 81] },
                { x: "Team C", y: [31, 39, 45, 51, 59] },
                { x: "Team D", y: [39, 46, 55, 65, 71] },
                { x: "Team E", y: [29, 31, 35, 39, 44] },
              ],
            }]}
          />
        </ChartCard>
        <ChartCard title="Boxplot with Scatter" description="Boxplot overlaid with individual data points.">
          <Chart type="boxPlot" height={300}
            options={{
              colors: ["#10b981","#10b981"],
              plotOptions: { boxPlot: { colors: { upper: "#10b981", lower: "#86efac" } } },
              xaxis: { type: "category" },
            }}
            series={[
              {
                type: "boxPlot",
                data: [
                  { x: "Jan", y: [54, 66, 69, 75, 88] },
                  { x: "Feb", y: [43, 65, 69, 76, 81] },
                  { x: "Mar", y: [31, 39, 45, 51, 59] },
                  { x: "Apr", y: [39, 46, 55, 65, 71] },
                ],
              },
              {
                type: "scatter",
                data: [
                  { x: "Jan", y: [70, 82, 58] },
                  { x: "Feb", y: [60, 77, 48] },
                  { x: "Mar", y: [42, 56, 33] },
                  { x: "Apr", y: [50, 68, 45] },
                ],
              },
            ]}
          />
        </ChartCard>
        <ChartCard span2 title="Multi-group Boxplot" description="Comparing distributions across multiple groups.">
          <Chart type="boxPlot" height={300}
            options={{
              plotOptions: { boxPlot: { colors: { upper: "#8b5cf6", lower: "#c4b5fd" } } },
              xaxis: { type: "category" },
              colors: ["#8b5cf6"],
            }}
            series={[{
              type: "boxPlot",
              data: [
                { x: "Product A", y: [20, 40, 55, 70, 90] },
                { x: "Product B", y: [30, 45, 60, 72, 85] },
                { x: "Product C", y: [15, 35, 50, 65, 80] },
                { x: "Product D", y: [25, 42, 58, 68, 88] },
                { x: "Product E", y: [35, 50, 62, 74, 92] },
                { x: "Product F", y: [10, 28, 45, 60, 75] },
              ],
            }]}
          />
        </ChartCard>
      </div>
    </div>
  );
}

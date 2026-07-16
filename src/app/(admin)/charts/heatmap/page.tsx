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

const hours = ["12am","1am","2am","3am","4am","5am","6am","7am","8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm","6pm","7pm","8pm","9pm","10pm","11pm"];
const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function makeHeatData(min, max) {
  return days.map((day) => ({
    name: day,
    data: hours.map((h) => ({ x: h, y: Math.floor(Math.random() * (max - min) + min) })),
  }));
}

export default function HeatmapPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Heatmap Charts</h1>
        <p className="text-muted-foreground">Heatmaps use color intensity to represent data values across two dimensions.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard span2 title="Website Traffic Heatmap" description="Hourly traffic by day of the week.">
          <Chart type="heatmap" height={280}
            options={{
              dataLabels: { enabled: false },
              colors: ["#3b82f6"],
              xaxis: { type: "category" },
              plotOptions: { heatmap: { shadeIntensity: 0.8, radius: 2, colorScale: { ranges: [
                { from: 0,  to: 20,  color: "#dbeafe", name: "low" },
                { from: 21, to: 50,  color: "#93c5fd", name: "medium" },
                { from: 51, to: 75,  color: "#3b82f6", name: "high" },
                { from: 76, to: 100, color: "#1d4ed8", name: "extreme" },
              ] } } },
            }}
            series={makeHeatData(0, 100)}
          />
        </ChartCard>
        <ChartCard title="Sales Intensity" description="Monthly sales intensity by product category.">
          <Chart type="heatmap" height={280}
            options={{
              dataLabels: { enabled: false },
              colors: ["#10b981"],
              plotOptions: { heatmap: { shadeIntensity: 0.9, radius: 3 } },
            }}
            series={[
              { name: "Electronics", data: [{ x: "Jan", y: 80 }, { x: "Feb", y: 60 }, { x: "Mar", y: 90 }, { x: "Apr", y: 45 }, { x: "May", y: 75 }, { x: "Jun", y: 95 }] },
              { name: "Clothing",    data: [{ x: "Jan", y: 40 }, { x: "Feb", y: 70 }, { x: "Mar", y: 55 }, { x: "Apr", y: 80 }, { x: "May", y: 50 }, { x: "Jun", y: 65 }] },
              { name: "Sports",      data: [{ x: "Jan", y: 30 }, { x: "Feb", y: 45 }, { x: "Mar", y: 70 }, { x: "Apr", y: 60 }, { x: "May", y: 85 }, { x: "Jun", y: 40 }] },
              { name: "Home",        data: [{ x: "Jan", y: 55 }, { x: "Feb", y: 35 }, { x: "Mar", y: 65 }, { x: "Apr", y: 75 }, { x: "May", y: 45 }, { x: "Jun", y: 80 }] },
            ]}
          />
        </ChartCard>
        <ChartCard title="Multi-color Heatmap" description="Heatmap with a custom color range palette.">
          <Chart type="heatmap" height={280}
            options={{
              dataLabels: { enabled: false },
              plotOptions: { heatmap: { radius: 3, colorScale: { ranges: [
                { from: -30, to: 5,  color: "#ef4444", name: "Negative" },
                { from: 6,  to: 20,  color: "#f59e0b", name: "Low" },
                { from: 21, to: 45,  color: "#10b981", name: "Good" },
                { from: 46, to: 80,  color: "#3b82f6", name: "High" },
              ] } } },
            }}
            series={[
              { name: "Metric A", data: [{ x: "W1", y: 10 }, { x: "W2", y: -20 }, { x: "W3", y: 35 }, { x: "W4", y: 55 }] },
              { name: "Metric B", data: [{ x: "W1", y: 40 }, { x: "W2", y: 15 }, { x: "W3", y: -10 }, { x: "W4", y: 70 }] },
              { name: "Metric C", data: [{ x: "W1", y: 25 }, { x: "W2", y: 50 }, { x: "W3", y: 45 }, { x: "W4", y: -5 }] },
            ]}
          />
        </ChartCard>
      </div>
    </div>
  );
}

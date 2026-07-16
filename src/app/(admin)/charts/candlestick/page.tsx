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

// OHLC: [Open, High, Low, Close]
const btcData = [
  { x: new Date("2024-01-01"), y: [42000, 44500, 41200, 43800] },
  { x: new Date("2024-01-02"), y: [43800, 45200, 43100, 44900] },
  { x: new Date("2024-01-03"), y: [44900, 46000, 44200, 45500] },
  { x: new Date("2024-01-04"), y: [45500, 45800, 43500, 43900] },
  { x: new Date("2024-01-05"), y: [43900, 44200, 42800, 43200] },
  { x: new Date("2024-01-06"), y: [43200, 44800, 43000, 44600] },
  { x: new Date("2024-01-07"), y: [44600, 47200, 44400, 46900] },
  { x: new Date("2024-01-08"), y: [46900, 47500, 45800, 46200] },
  { x: new Date("2024-01-09"), y: [46200, 46800, 44800, 45000] },
  { x: new Date("2024-01-10"), y: [45000, 45500, 43200, 43800] },
  { x: new Date("2024-01-11"), y: [43800, 44600, 43200, 44200] },
  { x: new Date("2024-01-12"), y: [44200, 46500, 44000, 46100] },
];

export default function CandlestickPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Candlestick Charts</h1>
        <p className="text-muted-foreground">Financial candlestick charts showing open, high, low, and close (OHLC) prices over time.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard span2 title="BTC/USD Candlestick" description="Bitcoin price chart — Jan 2024.">
          <Chart type="candlestick" height={320}
            options={{
              xaxis: { type: "datetime" },
              yaxis: { tooltip: { enabled: true }, labels: { formatter: (v) => `$${v.toLocaleString()}` } },
              plotOptions: { candlestick: { colors: { upward: "#10b981", downward: "#ef4444" }, wick: { useFillColor: true } } },
              tooltip: { x: { format: "dd MMM yyyy" } },
            }}
            series={[{ data: btcData }]}
          />
        </ChartCard>
        <ChartCard title="Stock Chart (AAPL)" description="Apple Inc. simulated daily OHLC.">
          <Chart type="candlestick" height={280}
            options={{
              xaxis: { type: "datetime" },
              yaxis: { labels: { formatter: (v) => `$${v}` } },
              plotOptions: { candlestick: { colors: { upward: "#3b82f6", downward: "#f59e0b" }, wick: { useFillColor: true } } },
            }}
            series={[{ data: btcData.map(d => ({ x: d.x, y: [d.y[0] / 130, d.y[1] / 130, d.y[2] / 130, d.y[3] / 130].map(v => +v.toFixed(2)) })) }]}
          />
        </ChartCard>
        <ChartCard title="Candlestick + Volume" description="Price action paired with volume bars.">
          <Chart type="candlestick" height={280}
            options={{
              xaxis: { type: "datetime" },
              yaxis: { labels: { formatter: (v) => `$${v.toLocaleString()}` } },
              plotOptions: { candlestick: { colors: { upward: "#10b981", downward: "#ef4444" }, wick: { useFillColor: true } } },
              annotations: { yaxis: [{ y: 45000, borderColor: "#8b5cf6", label: { text: "Resistance", style: { color: "#fff", background: "#8b5cf6" } } }] },
            }}
            series={[{ data: btcData.slice(0, 8) }]}
          />
        </ChartCard>
      </div>
    </div>
  );
}

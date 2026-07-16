"use client";

import { useState, useEffect } from "react";
import { Progress, ProgressMulti } from "@/components/ui/progress";

function AnimatedProgress({ targetValue, ...props }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setValue(targetValue), 300);
    return () => clearTimeout(timer);
  }, [targetValue]);

  return <Progress value={value} {...props} />;
}

export default function ProgressPage() {
  const [dynamicValue, setDynamicValue] = useState(45);

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Progress</h1>
        <p className="text-muted-foreground">
          Visual indicators for displaying the completion status of tasks or processes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Default Progress */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">Default Progress</h2>
          <AnimatedProgress targetValue={25} label="25% Complete" showLabel />
          <AnimatedProgress targetValue={50} label="50% Complete" showLabel />
          <AnimatedProgress targetValue={75} label="75% Complete" showLabel />
          <AnimatedProgress targetValue={100} label="Completed" showLabel />
        </div>

        {/* Colored Progress */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">Colored Progress</h2>
          <AnimatedProgress targetValue={65} color="blue" label="Primary" showLabel />
          <AnimatedProgress targetValue={48} color="green" label="Success" showLabel />
          <AnimatedProgress targetValue={72} color="yellow" label="Warning" showLabel />
          <AnimatedProgress targetValue={33} color="red" label="Danger" showLabel />
          <AnimatedProgress targetValue={88} color="purple" label="Purple" showLabel />
          <AnimatedProgress targetValue={55} color="cyan" label="Cyan" showLabel />
        </div>

        {/* Progress Sizes */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-5">
          <h2 className="text-lg font-semibold">Progress Sizes</h2>
          <AnimatedProgress targetValue={60} size="xs" label="Extra Small (xs)" showLabel />
          <AnimatedProgress targetValue={60} size="sm" label="Small (sm)" showLabel />
          <AnimatedProgress targetValue={60} size="default" label="Default" showLabel />
          <AnimatedProgress targetValue={60} size="lg" label="Large (lg)" showLabel />
          <AnimatedProgress targetValue={60} size="xl" label="Extra Large (xl)" showLabel />
        </div>

        {/* Rounded Progress */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">Rounded Progress</h2>
          <AnimatedProgress targetValue={40} color="blue" rounded label="Primary" showLabel />
          <AnimatedProgress targetValue={65} color="green" rounded label="Success" showLabel />
          <AnimatedProgress targetValue={80} color="purple" rounded label="Purple" showLabel />
          <AnimatedProgress targetValue={55} size="lg" color="orange" rounded label="Large Rounded" showLabel />
          <AnimatedProgress targetValue={90} size="xl" color="cyan" rounded label="XL Rounded" showLabel />
        </div>

        {/* Progress with Label Inside */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">Progress with Inside Label</h2>
          <div className="space-y-3">
            {[
              { value: 30, color: "blue", label: "Design" },
              { value: 55, color: "green", label: "Development" },
              { value: 78, color: "orange", label: "Testing" },
              { value: 92, color: "purple", label: "Deployment" },
            ].map(({ value, color, label }) => (
              <div key={label} className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{label}</span>
                  <span className="font-medium">{value}%</span>
                </div>
                <AnimatedProgress targetValue={value} color={color} size="lg" rounded />
              </div>
            ))}
          </div>
        </div>

        {/* Multi-segment Progress */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">Multi-segment Progress</h2>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Storage usage</p>
            <ProgressMulti
              size="lg"
              segments={[
                { value: 32, color: "blue" },
                { value: 18, color: "green" },
                { value: 12, color: "yellow" },
              ]}
            />
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-blue-600 inline-block" /> Documents 32%</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-green-500 inline-block" /> Media 18%</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-yellow-500 inline-block" /> Other 12%</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Sales breakdown (rounded)</p>
            <ProgressMulti
              size="xl"
              rounded
              segments={[
                { value: 45, color: "purple" },
                { value: 30, color: "cyan" },
                { value: 15, color: "orange" },
              ]}
            />
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-purple-500 inline-block" /> Online 45%</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-cyan-500 inline-block" /> In-store 30%</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-orange-500 inline-block" /> Reseller 15%</span>
            </div>
          </div>
        </div>

        {/* Dynamic / Interactive Progress */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-4 lg:col-span-2">
          <h2 className="text-lg font-semibold">Interactive Progress</h2>
          <p className="text-sm text-muted-foreground">Control the progress value using the slider below.</p>
          <div className="max-w-xl space-y-4">
            <Progress value={dynamicValue} color="blue" size="lg" rounded showLabel label="Task Progress" />
            <input
              type="range"
              min={0}
              max={100}
              value={dynamicValue}
              onChange={(e) => setDynamicValue(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span className="font-semibold text-blue-600">{dynamicValue}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Project Progress Cards */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Progress in Cards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "Website Redesign", value: 78, color: "blue", team: "4 members", due: "May 20" },
              { name: "Mobile App Dev", value: 52, color: "purple", team: "6 members", due: "Jun 5" },
              { name: "API Integration", value: 91, color: "green", team: "2 members", due: "May 15" },
              { name: "Marketing Campaign", value: 35, color: "orange", team: "3 members", due: "Jun 30" },
              { name: "Data Migration", value: 64, color: "cyan", team: "2 members", due: "May 28" },
              { name: "Security Audit", value: 20, color: "red", team: "1 member", due: "Jul 10" },
            ].map(({ name, value, color, team, due }) => (
              <div key={name} className="border border-border rounded-xl p-4 space-y-3 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <p className="font-medium text-sm">{name}</p>
                  <span className="text-xs font-semibold text-muted-foreground">{value}%</span>
                </div>
                <AnimatedProgress targetValue={value} color={color} size="sm" rounded />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{team}</span>
                  <span>Due: {due}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

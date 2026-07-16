"use client";

import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const sliderStyles = {
  trackStyle: { backgroundColor: "#3b82f6", height: 6 },
  railStyle: { backgroundColor: "#e5e7eb", height: 6 },
  handleStyle: { backgroundColor: "#fff", borderColor: "#3b82f6", borderWidth: 2, width: 18, height: 18, marginTop: -6, boxShadow: "0 2px 6px rgba(59,130,246,0.3)", opacity: 1 },
};

const colorVariants = [
  { color: "#3b82f6", track: "#3b82f6", label: "Primary Blue" },
  { color: "#10b981", track: "#10b981", label: "Success Green" },
  { color: "#f59e0b", track: "#f59e0b", label: "Warning Yellow" },
  { color: "#ef4444", track: "#ef4444", label: "Danger Red" },
  { color: "#8b5cf6", track: "#8b5cf6", label: "Purple" },
];

function Section({ title, description, children, span2 = false }) {
  return (
    <div className={`p-6 bg-card border border-border rounded-xl shadow-sm space-y-5 ${span2 ? "lg:col-span-2" : ""}`}>
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  );
}

export default function RangeSliderPage() {
  const [basic, setBasic]           = useState(40);
  const [range, setRange]           = useState([20, 70]);
  const [step10, setStep10]         = useState(50);
  const [temp, setTemp]             = useState(22);
  const [price, setPrice]           = useState([100, 800]);
  const [volume, setVolume]         = useState(65);
  const [marks, setMarks]           = useState(3);
  const [vertical, setVertical]     = useState(60);
  const [vertRange, setVertRange]   = useState([20, 80]);

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Range Slider</h1>
        <p className="text-muted-foreground">Interactive range slider components for numeric input, price filters, and configuration settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <Section title="Basic Slider">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Value</span>
              <span className="font-semibold text-primary">{basic}</span>
            </div>
            <Slider value={basic} onChange={setBasic} min={0} max={100} {...sliderStyles} />
            <div className="flex justify-between text-xs text-muted-foreground"><span>0</span><span>100</span></div>
          </div>
        </Section>

        <Section title="Range Slider" description="Select a min and max value.">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Range</span>
              <span className="font-semibold text-primary">{range[0]} – {range[1]}</span>
            </div>
            <Slider range value={range} onChange={setRange} min={0} max={100} {...sliderStyles} />
            <div className="flex justify-between text-xs text-muted-foreground"><span>0</span><span>100</span></div>
          </div>
        </Section>

        <Section title="Step Intervals" description="Snap to fixed step values.">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Step 10</span><span className="font-semibold">{step10}</span></div>
              <Slider value={step10} onChange={setStep10} min={0} max={100} step={10} {...sliderStyles} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Step 25</span><span className="font-semibold">{Math.round(step10 / 25) * 25}</span></div>
              <Slider value={Math.round(step10 / 25) * 25} onChange={(v) => setStep10(Math.round(v / 25) * 25)} min={0} max={100} step={25} {...sliderStyles} />
            </div>
          </div>
        </Section>

        <Section title="Slider with Marks" description="Visual tick marks along the track.">
          <div className="space-y-2 pt-2">
            <Slider value={marks} onChange={setMarks} min={1} max={5} step={1}
              marks={{ 1: "1", 2: "2", 3: "3", 4: "4", 5: "5" }}
              {...sliderStyles}
              dotStyle={{ borderColor: "#e5e7eb", width: 12, height: 12, bottom: -3 }}
              activeDotStyle={{ borderColor: "#3b82f6" }}
            />
          </div>
          <p className="text-sm text-muted-foreground pt-4">Selected: <strong>{marks}</strong> out of 5</p>
        </Section>

        <Section title="Temperature Control" description="Real-world slider for temperature setting.">
          <div className="space-y-3">
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-primary">{temp}°</span>
              <span className="text-lg text-muted-foreground mb-1">C</span>
            </div>
            <Slider value={temp} onChange={setTemp} min={16} max={30} step={0.5}
              trackStyle={{ backgroundColor: temp > 24 ? "#ef4444" : temp > 20 ? "#f59e0b" : "#3b82f6", height: 8 }}
              railStyle={{ backgroundColor: "#e5e7eb", height: 8 }}
              handleStyle={{ ...sliderStyles.handleStyle, borderColor: temp > 24 ? "#ef4444" : temp > 20 ? "#f59e0b" : "#3b82f6" }}
            />
            <div className="flex justify-between text-xs text-muted-foreground"><span>16° Cold</span><span>23° Comfort</span><span>30° Hot</span></div>
          </div>
        </Section>

        <Section title="Price Range Filter" description="E-commerce price filter with range slider.">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price Range</span>
              <span className="font-semibold">${price[0]} – ${price[1]}</span>
            </div>
            <Slider range value={price} onChange={setPrice} min={0} max={2000} step={50}
              trackStyle={{ backgroundColor: "#10b981", height: 6 }}
              railStyle={{ backgroundColor: "#e5e7eb", height: 6 }}
              handleStyle={{ ...sliderStyles.handleStyle, borderColor: "#10b981" }}
            />
            <div className="flex gap-2 mt-2">
              <div className="flex-1 border border-border rounded-lg px-3 py-2 text-sm text-center font-medium">${price[0]}</div>
              <div className="flex items-center text-muted-foreground text-sm">to</div>
              <div className="flex-1 border border-border rounded-lg px-3 py-2 text-sm text-center font-medium">${price[1]}</div>
            </div>
          </div>
        </Section>

        <Section title="Volume Control" description="Speaker / audio volume slider.">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-2xl">{volume === 0 ? "🔇" : volume < 40 ? "🔉" : "🔊"}</span>
              <div className="flex-1">
                <Slider value={volume} onChange={setVolume} min={0} max={100}
                  trackStyle={{ background: `linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)`, height: 8 }}
                  railStyle={{ backgroundColor: "#e5e7eb", height: 8 }}
                  handleStyle={{ ...sliderStyles.handleStyle, width: 22, height: 22, marginTop: -7 }}
                />
              </div>
              <span className="text-sm font-bold w-8 text-right">{volume}</span>
            </div>
          </div>
        </Section>

        <Section title="Color Variants" description="Sliders in different brand colors.">
          {colorVariants.map(({ track, label }, i) => (
            <div key={label} className="space-y-1.5">
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">{label}</span><span className="font-medium">{[40,65,30,75,55][i]}</span></div>
              <Slider value={[40,65,30,75,55][i]} min={0} max={100}
                trackStyle={{ backgroundColor: track, height: 5 }}
                railStyle={{ backgroundColor: "#e5e7eb", height: 5 }}
                handleStyle={{ backgroundColor: "#fff", borderColor: track, borderWidth: 2, width: 16, height: 16, marginTop: -5.5, opacity: 1 }}
              />
            </div>
          ))}
        </Section>

        <Section title="Vertical Sliders" description="Vertically oriented range sliders.">
          <div className="flex items-end gap-10 h-48 px-4">
            <div className="flex flex-col items-center gap-2 h-full">
              <span className="text-xs text-muted-foreground">{vertical}%</span>
              <Slider vertical value={vertical} onChange={setVertical} min={0} max={100}
                {...sliderStyles} style={{ height: "100%" }} />
              <span className="text-xs text-muted-foreground">Bass</span>
            </div>
            <div className="flex flex-col items-center gap-2 h-full">
              <span className="text-xs text-muted-foreground">{vertRange[1]}%</span>
              <Slider vertical range value={vertRange} onChange={setVertRange} min={0} max={100}
                trackStyle={{ backgroundColor: "#10b981", width: 6 }}
                railStyle={{ backgroundColor: "#e5e7eb", width: 6 }}
                handleStyle={[
                  { ...sliderStyles.handleStyle, borderColor: "#10b981" },
                  { ...sliderStyles.handleStyle, borderColor: "#10b981" },
                ]}
                style={{ height: "100%" }} />
              <span className="text-xs text-muted-foreground">Range</span>
            </div>
          </div>
        </Section>

        <Section title="Disabled Slider" description="Non-interactive disabled state.">
          <div className="space-y-3">
            <Slider value={60} min={0} max={100} disabled
              trackStyle={{ backgroundColor: "#d1d5db", height: 6 }}
              railStyle={{ backgroundColor: "#f3f4f6", height: 6 }}
              handleStyle={{ backgroundColor: "#e5e7eb", borderColor: "#d1d5db", width: 18, height: 18, marginTop: -6, opacity: 1, cursor: "not-allowed" }}
            />
            <p className="text-xs text-muted-foreground">Slider is disabled</p>
          </div>
        </Section>

      </div>
    </div>
  );
}

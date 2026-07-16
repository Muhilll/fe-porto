"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const inputCls = "w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card";

function Section({ title, description, children, span2 = false }) {
  return (
    <div className={`p-6 bg-card border border-border rounded-xl shadow-sm space-y-4 ${span2 ? "lg:col-span-2" : ""}`}>
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-foreground">{label}</label>}
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export default function PickerPage() {
  const [date, setDate]           = useState(new Date());
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate]      = dateRange;
  const [dateTime, setDateTime]   = useState(new Date());
  const [time, setTime]           = useState(new Date());
  const [monthYear, setMonthYear] = useState(new Date());
  const [yearOnly, setYearOnly]   = useState(new Date());
  const [inline, setInline]       = useState(new Date());
  const [multi, setMulti]         = useState([]);

  return (
    <div className="w-full space-y-6">
      <style>{`
        .react-datepicker { font-family: inherit; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
        .react-datepicker__header { background: #f8f9fa; border-bottom: 1px solid #e5e7eb; padding: 12px; }
        .react-datepicker__day--selected, .react-datepicker__day--in-range { background-color: #3b82f6 !important; color: white !important; border-radius: 6px; }
        .react-datepicker__day--keyboard-selected { background-color: #93c5fd !important; border-radius: 6px; }
        .react-datepicker__day:hover { background-color: #eff6ff; border-radius: 6px; }
        .react-datepicker__day--in-selecting-range { background-color: #bfdbfe !important; }
        .react-datepicker__input-container input { width: 100%; }
        .react-datepicker__time-list-item--selected { background-color: #3b82f6 !important; }
      `}</style>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Picker</h1>
        <p className="text-muted-foreground">Date and time pickers with various configuration options using react-datepicker.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <Section title="Date Picker" description="Standard single-date picker.">
          <Field label="Select Date">
            <DatePicker selected={date} onChange={setDate} className={inputCls} dateFormat="MMMM d, yyyy" />
          </Field>
          <Field label="Date with Portal (avoids clipping)">
            <DatePicker selected={date} onChange={setDate} className={inputCls} dateFormat="dd/MM/yyyy" withPortal />
          </Field>
        </Section>

        <Section title="Date Range Picker" description="Select a start and end date range.">
          <Field label="Date Range">
            <DatePicker
              selectsRange startDate={startDate} endDate={endDate}
              onChange={(update) => setDateRange(update)}
              className={inputCls} placeholderText="Select date range"
              dateFormat="MMM d, yyyy" isClearable
            />
          </Field>
          <Field label="Min / Max Dates">
            <DatePicker
              selected={date} onChange={setDate} className={inputCls}
              minDate={new Date()} maxDate={new Date(Date.now() + 30 * 86400000)}
              placeholderText="Within next 30 days only"
            />
          </Field>
        </Section>

        <Section title="Date & Time Picker" description="Combined date and time selection.">
          <Field label="Date and Time">
            <DatePicker selected={dateTime} onChange={setDateTime} showTimeSelect className={inputCls} dateFormat="MMMM d, yyyy h:mm aa" />
          </Field>
          <Field label="Time Only">
            <DatePicker selected={time} onChange={setTime} showTimeSelect showTimeSelectOnly timeIntervals={15} className={inputCls} dateFormat="h:mm aa" placeholderText="Select time" />
          </Field>
        </Section>

        <Section title="Month & Year Pickers" description="Constrained pickers for month or year level.">
          <Field label="Month Picker">
            <DatePicker selected={monthYear} onChange={setMonthYear} showMonthYearPicker className={inputCls} dateFormat="MMMM yyyy" />
          </Field>
          <Field label="Quarter Picker">
            <DatePicker selected={monthYear} onChange={setMonthYear} showQuarterYearPicker className={inputCls} dateFormat="yyyy, QQQ" />
          </Field>
          <Field label="Year Picker">
            <DatePicker selected={yearOnly} onChange={setYearOnly} showYearPicker className={inputCls} dateFormat="yyyy" />
          </Field>
        </Section>

        <Section title="Inline Calendar" description="Always-visible inline calendar without input field.">
          <DatePicker selected={inline} onChange={setInline} inline />
          <p className="text-sm text-muted-foreground">Selected: <strong>{inline?.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</strong></p>
        </Section>

        <Section title="Multi-date & Holidays" description="Select multiple individual dates.">
          <Field label="Multi-select Dates" hint="Click multiple dates to select them">
            <DatePicker selected={null} onChange={(d) => setMulti((p) => p.some(x => x.toDateString() === d.toDateString()) ? p.filter(x => x.toDateString() !== d.toDateString()) : [...p, d])} highlightDates={multi} className={inputCls} placeholderText="Click to add dates" inline />
          </Field>
          <p className="text-sm text-muted-foreground">{multi.length} date{multi.length !== 1 ? "s" : ""} selected</p>
        </Section>

        <Section title="Disabled Dates" description="Mark specific dates as unavailable.">
          <Field label="Exclude Weekends">
            <DatePicker
              selected={date} onChange={setDate} className={inputCls}
              filterDate={(d) => d.getDay() !== 0 && d.getDay() !== 6}
              placeholderText="Weekdays only"
            />
          </Field>
          <Field label="Exclude Specific Dates">
            <DatePicker
              selected={date} onChange={setDate} className={inputCls}
              excludeDates={[new Date(), new Date(Date.now() + 2 * 86400000), new Date(Date.now() + 5 * 86400000)]}
              placeholderText="Some dates are blocked"
            />
          </Field>
        </Section>

        <Section title="Localization" description="Customize placeholder, format, and locale.">
          <Field label="Custom Placeholder">
            <DatePicker selected={null} onChange={() => {}} className={inputCls} placeholderText="📅 Choose a date…" dateFormat="dd MMMM yyyy" />
          </Field>
          <Field label="ISO Format (YYYY-MM-DD)">
            <DatePicker selected={date} onChange={setDate} className={inputCls} dateFormat="yyyy-MM-dd" />
          </Field>
          <Field label="With Clear Button">
            <DatePicker selected={date} onChange={setDate} className={inputCls} isClearable placeholderText="Clearable date picker" dateFormat="MMMM d, yyyy" />
          </Field>
        </Section>

      </div>
    </div>
  );
}

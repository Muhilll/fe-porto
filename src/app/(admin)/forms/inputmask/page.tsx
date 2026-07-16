"use client";

import { IMaskInput } from "react-imask";

const inputCls = "w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-card font-mono";

function Section({ title, description, children }) {
  return (
    <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-4">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  );
}

function MaskField({ label, hint, ...maskProps }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <IMaskInput {...maskProps} className={inputCls} />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export default function InputmaskPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Inputmask</h1>
        <p className="text-muted-foreground">Input masking enforces a specific format while the user types, preventing invalid data entry.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <Section title="Phone Numbers">
          <MaskField label="US Phone" mask="+{1} (000) 000-0000" placeholder="+1 (___) ___-____" hint="Format: +1 (555) 123-4567" />
          <MaskField label="International" mask="+00 000 000 0000" placeholder="+__ ___ ___ ____" hint="Format: +44 123 456 7890" />
          <MaskField label="Local (no country)" mask="(000) 000-0000" placeholder="(___) ___-____" />
        </Section>

        <Section title="Date & Time">
          <MaskField label="Date (MM/DD/YYYY)" mask="00/00/0000" placeholder="MM/DD/YYYY" hint="Use / as separator" />
          <MaskField label="Date (DD-MM-YYYY)" mask="00-00-0000" placeholder="DD-MM-YYYY" />
          <MaskField label="Time (HH:MM)" mask="00:00" placeholder="HH:MM" />
          <MaskField label="Date & Time" mask="00/00/0000 00:00" placeholder="MM/DD/YYYY HH:MM" />
        </Section>

        <Section title="Credit & Finance">
          <MaskField label="Credit Card Number" mask="0000 0000 0000 0000" placeholder="**** **** **** ****" hint="Spaces added automatically" />
          <MaskField label="Card Expiry (MM/YY)" mask="00/00" placeholder="MM/YY" />
          <MaskField label="CVV" mask="000[0]" placeholder="___" hint="3 or 4 digits" />
          <MaskField label="Amount (USD)" mask="$num" blocks={{ num: { mask: Number, thousandsSeparator: ",", scale: 2, radix: "." } }} placeholder="$0.00" hint="Currency with 2 decimal places" />
        </Section>

        <Section title="Identification">
          <MaskField label="US SSN" mask="000-00-0000" placeholder="___-__-____" hint="Social Security Number" />
          <MaskField label="ZIP Code" mask="00000[-0000]" placeholder="12345 or 12345-6789" />
          <MaskField label="IP Address" mask="0[00].0[00].0[00].0[00]" placeholder="192.168.0.1" />
          <MaskField label="License Plate" mask="aa-0000-aa" placeholder="AB-0000-CD" hint="Format varies by region" />
        </Section>

        <Section title="Custom Patterns">
          <MaskField label="Product Code" mask="aaa-00000" placeholder="ABC-12345" hint="3 letters + 5 digits" />
          <MaskField label="Order ID" mask="#ORD-{00000000}" placeholder="#ORD-________" lazy={false} />
          <MaskField label="Hex Color" mask="{#}HHHHHH" definitions={{ H: /[0-9a-fA-F]/ }} placeholder="#RRGGBB" hint="Hexadecimal color code" />
          <MaskField label="Serial Number" mask="00-aa-000000" placeholder="00-XX-000000" hint="Device serial format" />
        </Section>

        <Section title="Numeric Masks">
          <MaskField label="Integer only" mask={Number} min={0} max={999} placeholder="0 – 999" hint="Whole numbers only" />
          <MaskField label="Decimal (2 places)" mask={Number} scale={2} radix="." placeholder="0.00" />
          <MaskField label="Percentage" mask="num %" blocks={{ num: { mask: Number, min: 0, max: 100 } }} placeholder="50 %" hint="0 – 100%" />
          <MaskField label="Thousands separator" mask={Number} thousandsSeparator="," scale={0} placeholder="1,000,000" />
        </Section>

      </div>
    </div>
  );
}

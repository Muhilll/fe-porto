"use client";

function Section({ title, children }) {
  return (
    <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function FormGroup({ label, htmlFor, hint, children }) {
  return (
    <div className="space-y-1.5">
      {label && <label htmlFor={htmlFor} className="block text-sm font-medium text-foreground">{label}</label>}
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

const inputCls = "w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-card disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed";
const labelCls = "block text-sm font-medium text-foreground";

export default function BasicElementsPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Basic Form Elements</h1>
        <p className="text-muted-foreground">Standard HTML form controls styled for the admin dashboard.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Text Inputs */}
        <Section title="Text Inputs">
          <FormGroup label="Default Input" htmlFor="txt-default">
            <input id="txt-default" type="text" placeholder="Enter text..." className={inputCls} />
          </FormGroup>
          <FormGroup label="With Value" htmlFor="txt-val">
            <input id="txt-val" type="text" defaultValue="John Doe" className={inputCls} />
          </FormGroup>
          <FormGroup label="Disabled" htmlFor="txt-disabled">
            <input id="txt-disabled" type="text" placeholder="Disabled input" disabled className={inputCls} />
          </FormGroup>
          <FormGroup label="Read Only" htmlFor="txt-readonly">
            <input id="txt-readonly" type="text" defaultValue="Read only value" readOnly className={inputCls + " bg-muted"} />
          </FormGroup>
          <FormGroup label="With Hint" htmlFor="txt-hint" hint="We'll never share your email with anyone.">
            <input id="txt-hint" type="email" placeholder="you@example.com" className={inputCls} />
          </FormGroup>
        </Section>

        {/* Input Types */}
        <Section title="Input Types">
          {[
            ["email",    "Email",    "Email Address", "user@example.com"],
            ["password", "password", "Password",      "••••••••"],
            ["number",   "number",   "Number",        "42"],
            ["tel",      "tel",      "Phone",         "+1 234 567 8900"],
            ["url",      "url",      "URL",           "https://example.com"],
            ["search",   "search",   "Search",        "Search..."],
          ].map(([id, type, label, ph]) => (
            <FormGroup key={id} label={label} htmlFor={id}>
              <input id={id} type={type} placeholder={ph} className={inputCls} />
            </FormGroup>
          ))}
        </Section>

        {/* Input Sizes */}
        <Section title="Input Sizes">
          <FormGroup label="Small">
            <input type="text" placeholder="Small input" className="w-full border border-border rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </FormGroup>
          <FormGroup label="Default">
            <input type="text" placeholder="Default input" className={inputCls} />
          </FormGroup>
          <FormGroup label="Large">
            <input type="text" placeholder="Large input" className="w-full border border-border rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </FormGroup>
        </Section>

        {/* Input States */}
        <Section title="Input States">
          <FormGroup label="Success State">
            <input type="text" defaultValue="Valid value" className="w-full border border-green-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 bg-green-50" />
            <p className="text-xs text-green-600 mt-1">✓ Looks good!</p>
          </FormGroup>
          <FormGroup label="Error State">
            <input type="text" defaultValue="invalid@" className="w-full border border-red-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-200 bg-red-50" />
            <p className="text-xs text-red-600 mt-1">✗ Please enter a valid email address.</p>
          </FormGroup>
          <FormGroup label="Warning State">
            <input type="text" defaultValue="maybe@" className="w-full border border-yellow-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-200 bg-yellow-50" />
            <p className="text-xs text-yellow-600 mt-1">⚠ Double-check this field.</p>
          </FormGroup>
        </Section>

        {/* Input with Addons */}
        <Section title="Input with Addons">
          <FormGroup label="Leading Addon">
            <div className="flex">
              <span className="inline-flex items-center px-3 border border-r-0 border-border rounded-l-lg bg-muted text-sm text-muted-foreground">https://</span>
              <input type="text" placeholder="yoursite.com" className="flex-1 border border-border rounded-r-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
          </FormGroup>
          <FormGroup label="Trailing Addon">
            <div className="flex">
              <input type="text" placeholder="Username" className="flex-1 border border-border rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              <span className="inline-flex items-center px-3 border border-l-0 border-border rounded-r-lg bg-muted text-sm text-muted-foreground">@mail.com</span>
            </div>
          </FormGroup>
          <FormGroup label="Both Addons">
            <div className="flex">
              <span className="inline-flex items-center px-3 border border-r-0 border-border rounded-l-lg bg-muted text-sm text-muted-foreground">$</span>
              <input type="number" placeholder="0.00" className="flex-1 border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              <span className="inline-flex items-center px-3 border border-l-0 border-border rounded-r-lg bg-muted text-sm text-muted-foreground">USD</span>
            </div>
          </FormGroup>
          <FormGroup label="Button Addon">
            <div className="flex gap-2">
              <input type="text" placeholder="Search..." className={inputCls} />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 shrink-0">Search</button>
            </div>
          </FormGroup>
        </Section>

        {/* Textarea */}
        <Section title="Textarea">
          <FormGroup label="Default Textarea" htmlFor="ta-default">
            <textarea id="ta-default" rows={3} placeholder="Write something..." className={inputCls + " resize-y"} />
          </FormGroup>
          <FormGroup label="Auto-grow (fixed rows)" htmlFor="ta-fixed">
            <textarea id="ta-fixed" rows={5} defaultValue="This textarea has a fixed height. You can adjust rows via the rows attribute." className={inputCls + " resize-none"} />
          </FormGroup>
        </Section>

        {/* Checkboxes */}
        <Section title="Checkboxes">
          <div className="space-y-2">
            {["Notify me of new posts","Subscribe to newsletter","Accept terms and conditions","Receive promotional emails"].map((lbl, i) => (
              <label key={i} className="flex items-center gap-2.5 text-sm cursor-pointer">
                <input type="checkbox" defaultChecked={i < 2} className="rounded border-border accent-primary size-4" />
                {lbl}
              </label>
            ))}
            <label className="flex items-center gap-2.5 text-sm cursor-pointer opacity-50">
              <input type="checkbox" disabled className="rounded border-border size-4" />
              Disabled checkbox
            </label>
          </div>
        </Section>

        {/* Radios */}
        <Section title="Radio Buttons">
          <div className="space-y-2">
            {["Free Plan — $0/mo","Pro Plan — $9/mo","Enterprise Plan — $49/mo"].map((lbl, i) => (
              <label key={i} className="flex items-center gap-2.5 text-sm cursor-pointer">
                <input type="radio" name="plan" defaultChecked={i === 1} className="accent-primary size-4" />
                {lbl}
              </label>
            ))}
            <label className="flex items-center gap-2.5 text-sm cursor-pointer opacity-50">
              <input type="radio" name="plan" disabled className="size-4" />
              Custom Plan (disabled)
            </label>
          </div>
        </Section>

        {/* Toggle Switch */}
        <Section title="Toggle Switches">
          <div className="space-y-3">
            {[
              ["Notifications", true],
              ["Dark Mode", false],
              ["Auto-save", true],
              ["Two-factor auth", false],
            ].map(([label, checked]) => (
              <label key={label} className="flex items-center justify-between text-sm cursor-pointer">
                <span>{label}</span>
                <div className="relative">
                  <input type="checkbox" defaultChecked={checked} className="sr-only peer" id={`toggle-${label}`} />
                  <label htmlFor={`toggle-${label}`} className="relative inline-flex h-5 w-9 items-center rounded-full bg-gray-200 peer-checked:bg-primary transition-colors cursor-pointer after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-card after:transition-transform peer-checked:after:translate-x-4" />
                </div>
              </label>
            ))}
          </div>
        </Section>

        {/* Select */}
        <Section title="Native Select">
          <FormGroup label="Default Select" htmlFor="sel-default">
            <select id="sel-default" className={inputCls}>
              <option>Select an option...</option>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </FormGroup>
          <FormGroup label="Multi Select" htmlFor="sel-multi">
            <select id="sel-multi" multiple size={4} defaultValue={["TypeScript", "React"]} className={inputCls + " h-auto"}>
              <option>JavaScript</option>
              <option>TypeScript</option>
              <option>React</option>
              <option>Vue</option>
              <option>Svelte</option>
            </select>
            <p className="text-xs text-muted-foreground mt-1">Hold Ctrl/Cmd to select multiple</p>
          </FormGroup>
          <FormGroup label="Disabled Select">
            <select disabled className={inputCls}>
              <option>Disabled option</option>
            </select>
          </FormGroup>
        </Section>

        {/* Range & Color */}
        <Section title="Range & Color">
          <FormGroup label="Range Input" htmlFor="range-basic">
            <input id="range-basic" type="range" min={0} max={100} defaultValue={60} className="w-full accent-primary" />
          </FormGroup>
          <FormGroup label="Color Picker" htmlFor="color-input">
            <div className="flex items-center gap-3">
              <input id="color-input" type="color" defaultValue="#3b82f6" className="h-10 w-16 rounded border border-border cursor-pointer p-0.5" />
              <span className="text-sm text-muted-foreground">Pick a color</span>
            </div>
          </FormGroup>
          <FormGroup label="Date" htmlFor="date-input">
            <input id="date-input" type="date" className={inputCls} defaultValue="2025-05-14" />
          </FormGroup>
          <FormGroup label="Time" htmlFor="time-input">
            <input id="time-input" type="time" className={inputCls} defaultValue="09:00" />
          </FormGroup>
        </Section>

      </div>
    </div>
  );
}

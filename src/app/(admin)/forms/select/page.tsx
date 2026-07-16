"use client";

import Select from "react-select";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const getSelectStyles = (isDark) => ({
  control: (base, state) => ({
    ...base,
    backgroundColor: isDark ? "oklch(0.27 0.03 260)" : "white",
    borderColor: state.isFocused ? "#3b82f6" : isDark ? "oklch(0.35 0.03 260)" : "#e5e7eb",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(59,130,246,0.15)" : "none",
    borderRadius: "8px",
    fontSize: "14px",
    minHeight: "38px",
    "&:hover": { borderColor: "#3b82f6" },
  }),
  singleValue: (base) => ({
    ...base,
    color: isDark ? "oklch(0.985 0 0)" : "#111827",
  }),
  input: (base) => ({
    ...base,
    color: isDark ? "oklch(0.985 0 0)" : "#111827",
  }),
  option: (base, state) => ({
    ...base,
    fontSize: "14px",
    backgroundColor: state.isSelected 
      ? "#3b82f6" 
      : state.isFocused 
        ? isDark ? "oklch(0.35 0.03 260)" : "#eff6ff" 
        : "transparent",
    color: state.isSelected 
      ? "white" 
      : isDark ? "oklch(0.985 0 0)" : "#374151",
    borderRadius: "6px",
    margin: "2px 4px",
    width: "calc(100% - 8px)",
    cursor: "pointer",
  }),
  menu: (base) => ({ 
    ...base, 
    backgroundColor: isDark ? "oklch(0.27 0.03 260)" : "white",
    borderRadius: "10px", 
    boxShadow: "0 4px 20px -2px rgba(0,0,0,0.12)", 
    border: `1px solid ${isDark ? "oklch(0.35 0.03 260)" : "#e5e7eb"}`, 
    overflow: "hidden" 
  }),
  multiValue: (base) => ({ 
    ...base, 
    backgroundColor: isDark ? "oklch(0.35 0.03 260)" : "#eff6ff", 
    borderRadius: "6px" 
  }),
  multiValueLabel: (base) => ({ 
    ...base, 
    color: isDark ? "oklch(0.985 0 0)" : "#1d4ed8", 
    fontSize: "12px" 
  }),
  multiValueRemove: (base) => ({ 
    ...base, 
    color: isDark ? "#94a3b8" : "#3b82f6", 
    "&:hover": { 
      backgroundColor: isDark ? "oklch(0.6 0.15 260)" : "#bfdbfe", 
      color: isDark ? "white" : "#1d4ed8" 
    } 
  }),
});

const countries = [
  { value: "us", label: "🇺🇸 United States" }, { value: "uk", label: "🇬🇧 United Kingdom" },
  { value: "ca", label: "🇨🇦 Canada" },         { value: "au", label: "🇦🇺 Australia" },
  { value: "de", label: "🇩🇪 Germany" },         { value: "fr", label: "🇫🇷 France" },
  { value: "jp", label: "🇯🇵 Japan" },           { value: "in", label: "🇮🇳 India" },
  { value: "br", label: "🇧🇷 Brazil" },          { value: "cn", label: "🇨🇳 China" },
];

const skills = [
  { value: "react",    label: "React",    color: "#61dafb" },
  { value: "vue",      label: "Vue",      color: "#42b883" },
  { value: "angular",  label: "Angular",  color: "#dd0031" },
  { value: "node",     label: "Node.js",  color: "#339933" },
  { value: "python",   label: "Python",   color: "#3572a5" },
  { value: "ts",       label: "TypeScript",color: "#3178c6" },
  { value: "graphql",  label: "GraphQL",  color: "#e535ab" },
  { value: "docker",   label: "Docker",   color: "#2496ed" },
];

const grouped = [
  { label: "Frontend", options: [{ value: "react", label: "React" }, { value: "vue", label: "Vue" }, { value: "svelte", label: "Svelte" }] },
  { label: "Backend",  options: [{ value: "node", label: "Node.js" }, { value: "django", label: "Django" }, { value: "rails", label: "Rails" }] },
  { label: "Database", options: [{ value: "pg", label: "PostgreSQL" }, { value: "mysql", label: "MySQL" }, { value: "mongo", label: "MongoDB" }] },
];

const colorDot = ({ data }, styles) => ({
  alignItems: "center",
  display: "flex",
  "::before": { backgroundColor: data.color, borderRadius: "50%", content: '" "', display: "block", marginRight: 8, height: 10, width: 10 },
});

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

export default function SelectPage() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? (theme === 'system' ? systemTheme : theme) === 'dark' : false;
  const selectStyles = getSelectStyles(isDark);

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Select</h1>
        <p className="text-muted-foreground">Enhanced select components with search, multi-select, async loading, and custom rendering via react-select.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <Section title="Basic Select" description="Single-value select with search.">
          <Field label="Country">
            <Select options={countries} styles={selectStyles} placeholder="Select a country..." />
          </Field>
          <Field label="Default Value">
            <Select options={countries} defaultValue={countries[0]} styles={selectStyles} />
          </Field>
          <Field label="Clearable">
            <Select options={countries} isClearable styles={selectStyles} placeholder="Select and clear..." />
          </Field>
        </Section>

        <Section title="Multi Select" description="Select multiple options with tags.">
          <Field label="Skills" hint="You can search and select multiple">
            <Select options={skills} isMulti styles={selectStyles} placeholder="Choose skills..." defaultValue={[skills[0], skills[5]]} />
          </Field>
          <Field label="Limit: 3 max">
            <Select options={skills} isMulti styles={selectStyles} placeholder="Max 3 items" isOptionDisabled={(_, selected) => selected.length >= 3} />
          </Field>
        </Section>

        <Section title="Grouped Options" description="Options organized into labeled groups.">
          <Field label="Tech Stack">
            <Select options={grouped} styles={selectStyles} placeholder="Choose technology..." />
          </Field>
          <Field label="Multi with Groups">
            <Select options={grouped} isMulti styles={selectStyles} placeholder="Multiple from groups..." />
          </Field>
        </Section>

        <Section title="Custom Rendering" description="Custom option formatting with colored dots.">
          <Field label="Language (with color dot)">
            <Select
              options={skills}
              styles={{ ...selectStyles, option: (base, s) => ({ ...selectStyles.option(base, s), ...colorDot(s) }), singleValue: (base, s) => ({ ...selectStyles.singleValue(base, s), ...colorDot(s) }) }}
              placeholder="Select language..."
            />
          </Field>
          <Field label="With Avatar">
            <Select
              options={[
                { value: "alex", label: "Alex Johnson",  sub: "UI Designer",  img: "Alex" },
                { value: "jane", label: "Jane Doe",      sub: "Backend Dev",  img: "Jane" },
                { value: "bob",  label: "Bob Smith",     sub: "Product Manager", img: "Bob" },
              ]}
              styles={selectStyles}
              placeholder="Assign to..."
              formatOptionLabel={(opt) => (
                <div className="flex items-center gap-2">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${opt.img}&backgroundColor=b6e3f4`} className="size-6 rounded-full bg-muted" alt={opt.label} />
                  <div>
                    <div className="text-sm font-medium">{opt.label}</div>
                    <div className="text-xs text-muted-foreground">{opt.sub}</div>
                  </div>
                </div>
              )}
            />
          </Field>
        </Section>

        <Section title="States" description="Disabled, loading, and searchable states.">
          <Field label="Disabled">
            <Select options={countries} isDisabled defaultValue={countries[2]} styles={selectStyles} />
          </Field>
          <Field label="Loading">
            <Select options={[]} isLoading styles={selectStyles} placeholder="Loading options..." />
          </Field>
          <Field label="Search Disabled">
            <Select options={countries} isSearchable={false} styles={selectStyles} placeholder="Not searchable..." />
          </Field>
          <Field label="Menu always open">
            <Select options={countries.slice(0, 4)} menuIsOpen styles={selectStyles} />
          </Field>
        </Section>

        <Section title="Creatable" description="Allow users to create new options on the fly.">
          <Field label="Create Tags" hint="Type and press Enter to create a new tag">
            <Select
              options={[{ value: "design", label: "design" }, { value: "ux", label: "ux" }, { value: "frontend", label: "frontend" }]}
              isMulti styles={selectStyles} placeholder="Type to create tags..."
            />
          </Field>
        </Section>

      </div>
    </div>
  );
}

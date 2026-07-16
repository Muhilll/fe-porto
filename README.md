# Cafe Frontend App

Aplikasi frontend untuk manajemen cafe, dibangun dengan **Next.js 16** (App Router).

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Package Manager**: Bun
- **Styling**: Tailwind CSS v3 + CSS Variables (oklch)
- **UI Kit**: Shadcn/UI (base-nova)
- **State**: Zustand + TanStack React Query
- **Forms**: React Hook Form + Zod
- **Charts**: ApexCharts
- **Icons**: Lucide React

## Getting Started

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun run build

# Lint
bun run lint
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Documentation

- **[AGENTS.md](./AGENTS.md)** — Panduan lengkap arsitektur, konvensi, dan aturan proyek
- **[STRUCTURE.md](./STRUCTURE.md)** — Referensi detail struktur folder

## Project Status

- ✅ Admin dashboard layout (sidebar + header)
- ✅ Theme switching (light/dark)
- ✅ 23 komponen UI (Shadcn/UI base-nova)
- ✅ Showcase: base-ui, extended-ui, charts, forms, tables, icons
- ✅ Halaman auth, error, dan standalone
- 🏗️ Landing page cafe (dalam pengembangan)
- 🏗️ Feature modules, API layer, authentication

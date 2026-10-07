# Project Structure — Portfolio & Admin CMS Frontend

## Overview
Aplikasi frontend personal portfolio developer dan Content Management System (CMS) modern yang dibangun menggunakan **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v3**, **shadcn/ui**, dan **Tiptap WYSIWYG Editor**.

- **Runtime & PM**: Bun
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **State Management**: TanStack React Query v5 + Zustand
- **Styling**: Tailwind CSS v3 + CSS Variables (`oklch`) + `next-themes`
- **Rich Editor**: Tiptap 3.x (`ProjectRichEditor`)
- **Backend API**: Hono.js on Bun (`http://localhost:7000`)

---

## 📁 Struktur Direktori Utama

```
fe-starter-next/
├── public/                              # Aset statis publik (gambar, favicon, logo)
├── src/
│   ├── app/                             # Next.js App Router
│   │   ├── (public)/                    # Route Group: Halaman Publik Portfolio
│   │   │   ├── layout.tsx               # Layout publik (Navbar, AmbientBackground, Footer)
│   │   │   ├── page.tsx                 # Beranda (Hero, Roles, Stats, Projects Showcase, CTA)
│   │   │   ├── projects/                # Katalog proyek & studi kasus
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx      # Detail studi kasus (ProjectDetailView)
│   │   │   ├── blog/                    # Feed artikel & blog
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx      # Detail artikel (BlogDetailView)
│   │   │   ├── blogs/                   # Alias kompatibilitas plural (/blogs -> /blog)
│   │   │   ├── project/                 # Alias kompatibilitas singular (/project -> /projects)
│   │   │   ├── projekdetail/            # Alias kompatibilitas referensi (/projekdetail/[slug])
│   │   │   ├── about/page.tsx           # Halaman tentang saya & linimasa karier
│   │   │   ├── certificates/page.tsx    # Halaman sertifikasi & lisensi
│   │   │   ├── services/page.tsx        # Halaman layanan & deliverables
│   │   │   ├── contact/page.tsx         # Formulir kontak & kanal langsung
│   │   │   └── contribution/page.tsx    # Kalender aktivitas commit GitHub
│   │   ├── (admin)/                     # Route Group: Dashboard Admin CMS
│   │   │   ├── layout.tsx               # Layout admin (AdminSidebar, AdminHeader)
│   │   │   ├── dashboard/page.tsx       # Ringkasan analitik admin
│   │   │   └── portfolio/               # Modul manajemen konten portfolio
│   │   │       ├── projects/page.tsx    # CRUD Proyek (Tiptap Editor, metrics, upload)
│   │   │       ├── blogs/page.tsx       # CRUD Blog (Tiptap Editor, preview, auto-read-time)
│   │   │       ├── profile/page.tsx     # Manajemen bio, stats, dan info developer
│   │   │       ├── about/page.tsx       # Manajemen pengalaman kerja & pendidikan
│   │   │       ├── certificates/page.tsx# Manajemen sertifikat & lisensi
│   │   │       ├── services/page.tsx    # Manajemen layanan rekayasa
│   │   │       └── inbox/page.tsx       # Kotak masuk pesan dari form kontak
│   │   ├── layout.tsx                   # Root HTML layout & ThemeProvider
│   │   └── globals.css                  # Variabel tema CSS, token warna, typography
│   ├── components/
│   │   ├── portfolio/                   # Komponen khusus antarmuka portfolio
│   │   │   ├── home/                    # HeroSection, FeaturedProjects, HomeCta
│   │   │   ├── projects/                # ProjectsShowcase, ProjectDetailView
│   │   │   ├── blog/                    # BlogList, BlogDetailView
│   │   │   ├── about/                   # AboutHero, ExperienceTimeline, EducationSection
│   │   │   ├── contact/                 # ContactForm, ContactPanel
│   │   │   ├── layout/                  # Navbar, Footer
│   │   │   └── shared/                  # ProjectRichEditor, ThemeToggle, MotionWrapper
│   │   ├── layout/                      # Komponen layout admin (AdminSidebar, AdminHeader)
│   │   └── ui/                          # Komponen atomic shadcn/ui (Button, Modal, Input, dll)
│   ├── features/                        # Logika API & State per domain
│   │   └── portfolio/
│   │       ├── adapters.ts              # Normalisasi data API dengan fallback offline
│   │       ├── project/                 # Hooks (useProjects, useProject) & Service
│   │       ├── blog/                    # Hooks (useBlogs, useBlog) & Service
│   │       ├── profile/                 # Hooks (useProfile) & Service
│   │       ├── certificate/             # Hooks & Service
│   │       ├── service/                 # Hooks & Service
│   │       ├── about/                   # Hooks & Service
│   │       └── upload/                  # UploadService (Cloudinary signed uploads)
│   ├── data/                            # Dataset fallback statis (offline resilience)
│   │   ├── projects.ts                  # Data cadangan katalog proyek
│   │   ├── blogs.ts                     # Data cadangan artikel teknik
│   │   ├── profile.ts                   # Data cadangan profil & bio
│   │   ├── certificates.ts              # Data cadangan sertifikat
│   │   ├── services.ts                  # Data cadangan layanan
│   │   ├── experience.ts                # Data cadangan riwayat kerja
│   │   └── navigation.ts                # Struktur navigasi
│   ├── services/
│   │   └── api/
│   │       ├── client.ts                # HTTP fetch client dengan error handling
│   │       └── types.ts                 # Definisi ApiResponse envelope
│   └── types/
│       └── portfolio.ts                 # Tipe data utama domain portfolio
├── tailwind.config.js                   # Konfigurasi Tailwind & plugin typography
├── components.json                      # Konfigurasi shadcn/ui
├── next.config.mjs                      # Konfigurasi Next.js
└── package.json                         # Dependencies & run scripts
```

---

## 🔄 Alur Data & Pola Arsitektur

```
┌────────────────────────────────────────────────────────┐
│                      Next.js Page                      │
│        (Server Component / Client Component View)      │
└───────────────────────────┬────────────────────────────┘
                            │
               ┌────────────┴────────────┐
               ▼                         ▼
      TanStack React Query        Static Fallback
      (useProjects, useBlog)      (src/data/*.ts)
               │                         │
               ▼                         │
        Hono Backend API                 │
     (http://localhost:7000)             │
               │                         │
               └────────────┬────────────┘
                            ▼
              ┌───────────────────────────┐
              │      Adapter Layer        │
              │(src/features/.../adapters)│
              └─────────────┬─────────────┘
                            ▼
              ┌───────────────────────────┐
              │    UI Presentation Layer  │
              │(ProjectDetailView, Blog...)│
              └───────────────────────────┘
```

1. **Komponen Presentasi Bersih**: Komponen UI tidak melakukan query manual secara ad-hoc, melainkan mengonsumsi data yang telah dinormalisasi oleh adapter.
2. **Adapter Layer (`adapters.ts`)**: Berfungsi sebagai penerjemah antara model backend (snake_case) dan frontend (camelCase), sekaligus menyuntikkan data fallback statis secara transparan jika backend API tidak merespons.
3. **Editor WYSIWYG Terintegrasi**: [`ProjectRichEditor`](file:///c:/project/porto/fe-starter-next/src/components/portfolio/shared/project-rich-editor.tsx) digunakan baik pada admin Project maupun admin Blog untuk menjaga keseragaman toolbar, format HTML semantik, dan fitur upload gambar.
4. **Perenderan Semantik**: Halaman publik detail menggunakan container Tailwind Typography `prose prose-base sm:prose-lg dark:prose-invert max-w-none` untuk menyajikan konten HTML semantik dengan styling kode dan gambar yang estetik.
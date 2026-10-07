# Personal Portfolio & Admin CMS — Next.js 16

Aplikasi web modern berstandar tinggi untuk personal portfolio rekayasa piranti lunak dan dashboard Content Management System (CMS), dibangun dengan **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **Tiptap WYSIWYG Editor**, dan **Bun**.

---

## 🌟 Fitur & Halaman Utama

### 1. Halaman Publik Portfolio (`src/app/(public)`)
- **Beranda (`/`)**: Hero section interaktif dengan animasi ketik peran (*roles typing*), bio ringkas, highlight statistik rekayasa, linimasa pengalaman, proyek unggulan, dan CTA kontak.
- **Katalog & Detail Proyek (`/projects`, `/projects/[slug]`)**:
  - Filter kategori (*Full-Stack, Frontend, Backend, Tools*) dan pencarian instan.
  - Halaman studi kasus rekayasa ([`ProjectDetailView`](file:///c:/project/porto/fe-starter-next/src/components/portfolio/projects/project-detail-view.tsx)) dengan perenderan semantik HTML/WYSIWYG, poin arsitektur sistem, metrik dampak, tombol Live Demo, dan Source Code GitHub.
- **Blog & Catatan Arsitektur (`/blog`, `/blog/[slug]`)**:
  - Feed artikel dengan pencarian topik, filter kategori, badge artikel unggulan (*featured*), dan estimasi waktu baca.
  - Halaman detail artikel ([`BlogDetailView`](file:///c:/project/porto/fe-starter-next/src/components/portfolio/blog/blog-detail-view.tsx)) dengan Tailwind Typography `prose dark:prose-invert`, kartu profil penulis, tombol berbagi WhatsApp & salin tautan, serta rekomendasi artikel terkait.
- **Tentang Saya (`/about`)**: Cerita perjalanan karier, prinsip rekayasa piranti lunak, linimasa kerja (*work experiences*), dan riwayat pendidikan.
- **Sertifikasi (`/certificates`)**: Katalog lisensi dan sertifikasi profesional terverifikasi dengan logo penerbit dan tautan kredensial eksternal.
- **Layanan Rekayasa (`/services`)**: Penawaran kapabilitas arsitektur sistem, pengembangan full-stack, deliverables teknis, dan konsultasi.
- **Formulir Kontak (`/contact`)**: Formulir pengiriman pesan langsung terintegrasi dengan notifikasi status, email, dan WhatsApp.
- **Aktivitas Kontribusi (`/contribution`)**: Kalender heatmap kontribusi GitHub dengan visibilitas bulan dan commit yang dioptimalkan untuk Dark & Light mode.

### 2. Dashboard Admin CMS (`src/app/(admin)/portfolio`)
- **Manajemen Proyek (`/portfolio/projects`)**: CRUD proyek dengan **Tiptap Rich-Text WYSIWYG Editor** (headings, kode sumber, screenshot, list), upload cover gambar, manajemen metrik, dan poin arsitektur.
- **Manajemen Blog (`/portfolio/blogs`)**: CRUD artikel teknis dengan Tiptap Rich Editor, tab *Live Preview*, auto-slug dari judul, kalkulasi waktu baca otomatis, dropdown kategori, dan upload cover.
- **Manajemen Profil (`/portfolio/profile`)**: Pengaturan bio, tagline, status ketersediaan (*availability*), ringkasan statistik, dan tautan sosial.
- **Manajemen Pengalaman & Pendidikan (`/portfolio/about`)**: Pengelolaan riwayat karier dan jenjang akademis.
- **Manajemen Sertifikat (`/portfolio/certificates`)**: Pengelolaan lisensi dan sertifikat.
- **Manajemen Layanan (`/portfolio/services`)**: Pengaturan daftar penawaran jasa rekayasa.
- **Kotak Masuk (`/portfolio/inbox`)**: Pemantauan pesan masuk yang dikirim pengunjung dari form `/contact`.

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Library UI** | React 19 |
| **Runtime & Package Manager** | Bun |
| **Styling** | Vanilla Tailwind CSS v3 + CSS Variables (`oklch`) |
| **Tema** | `next-themes` (Dark & Light Mode otomatis) |
| **State Management** | TanStack React Query v5 + Zustand |
| **Form & Validasi** | React Hook Form + Zod |
| **WYSIWYG Editor** | Tiptap 3.x (`ProjectRichEditor`) |
| **Komponen UI** | shadcn/ui (base-nova) |
| **Animasi** | Framer Motion & Ambient CSS glows |
| **Ikon** | Lucide React + Custom SVG Icons |

---

## 📦 Instalasi & Menjalankan Project

### 1. Install Dependencies
```bash
bun install
```

### 2. Konfigurasi Environment Variable
Salin `.env.example` ke `.env`:
```bash
cp .env.example .env
# Atau di PowerShell:
Copy-Item .env.example .env
```

Pastikan variabel terisi:
```env
NEXT_PUBLIC_API_URL=http://localhost:7000
NEXT_PUBLIC_APP_TOKEN=your-app-token
```

### 3. Jalankan Server Development
```bash
bun dev
```

Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

---

## 🛡️ Arsitektur Ketahanan & Fallback Data

Aplikasi ini menggunakan pola **Smart Fallback Architecture** melalui [`src/features/portfolio/adapters.ts`](file:///c:/project/porto/fe-starter-next/src/features/portfolio/adapters.ts):
- Setiap halaman publik memanggil data dari backend Hono API secara asynchronous.
- Jika backend sedang offline atau dalam proses deployment, aplikasi **secara otomatis dan mulus beralih ke data fallback statis** ([`src/data/`](file:///c:/project/porto/fe-starter-next/src/data/)).
- Tidak ada error hidrasi, blank screen, atau kegagalan SSR saat koneksi ke backend terputus.

---

## 📜 Perintah yang Tersedia (Scripts)

| Perintah | Deskripsi |
|---|---|
| `bun dev` | Menjalankan server development Next.js |
| `bun run build` | Melakukan build bundle production |
| `bun run start` | Menjalankan build production |
| `bun run lint` | Menjalankan linter ESLint |

---

Untuk detail struktur direktori lengkap dan panduan agen AI, silakan lihat [STRUCTURE.md](./STRUCTURE.md) dan [AGENTS.md](./AGENTS.md).

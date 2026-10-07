# AGENTS.md — Panduan AI Agent untuk Frontend Portfolio & Admin CMS

> File ini adalah sumber kebenaran untuk seluruh konvensi kode, arsitektur, dan aturan pengembangan frontend. Wajib dipatuhi oleh seluruh AI Agent sebelum memodifikasi kode.

---

## 1. Identitas Proyek & Tech Stack

| Kunci | Nilai |
|---|---|
| **Nama Proyek** | Personal Portfolio & Admin CMS Frontend |
| **Framework** | Next.js 16 (App Router) · React 19 · TypeScript |
| **Runtime & PM** | Bun (gunakan `bun dev`, `bun install`, `bun run build`) |
| **Styling** | Tailwind CSS v3 + CSS Variables (`oklch`) + shadcn/ui (base-nova) |
| **Tema** | `next-themes` (Dark Mode & Light Mode harmonis) |
| **Server State** | TanStack React Query v5 |
| **Client State** | Zustand |
| **Rich-Text Editor** | Tiptap 3.x (`ProjectRichEditor`) |
| **Ikon** | Lucide React + Custom SVG Icons (`@/components/portfolio/shared/icons`) |
| **Backend API** | Hono.js di port `7000` (`http://localhost:7000`) |

---

## 2. Struktur Route Groups & Halaman

Aplikasi menggunakan Next.js **Route Groups** dengan pemisahan yang jelas:

### A. Route Group `(public)` — Antarmuka Pengunjung
- `/` — Halaman Beranda (Hero, Roles, Stats, Featured Projects, Experience, CTA)
- `/projects` (dan alias `/project`) — Katalog proyek dengan live filter & search
- `/projects/[slug]` (dan alias `/project/[slug]`, `/projekdetail/[slug]`) — Studi kasus proyek mendalam ([`ProjectDetailView`](file:///c:/project/porto/fe-starter-next/src/components/portfolio/projects/project-detail-view.tsx))
- `/blog` (dan alias `/blogs`) — Feed artikel & catatan arsitektur
- `/blog/[slug]` (dan alias `/blogs/[slug]`) — Pembaca artikel semantik ([`BlogDetailView`](file:///c:/project/porto/fe-starter-next/src/components/portfolio/blog/blog-detail-view.tsx))
- `/about` — Linimasa karier, biografi, dan pendidikan
- `/certificates` — Sertifikasi & lisensi terverifikasi
- `/services` — Penawaran jasa rekayasa perangkat lunak
- `/contact` — Formulir kontak interaktif
- `/contribution` — Heatmap kalender kontribusi commit GitHub

### B. Route Group `(admin)` — Panel Manajemen Konten (`/portfolio/*`)
- `/portfolio/projects` — CRUD Proyek (Tiptap Rich-Text Editor, upload cover, metrik, arsitektur, tags)
- `/portfolio/blogs` — CRUD Artikel Blog (Tiptap Rich-Text Editor, Live Preview, auto-read-time, tags)
- `/portfolio/profile` — Manajemen bio developer, status availability, stats, dan sosial media
- `/portfolio/about` — Manajemen linimasa pengalaman & pendidikan
- `/portfolio/certificates` — Manajemen sertifikat & lisensi
- `/portfolio/services` — Manajemen penawaran layanan
- `/portfolio/inbox` — Kotak masuk pesan dari form kontak

---

## 3. Konvensi Komponen & Styling

### Aturan Form & Modal Admin:
Untuk menjaga konsistensi antara manajemen Proyek dan Blog:
1. **Modal Header**: Gunakan `<ModalHeader>` dengan `<ModalTitle>` dan tombol close `<ModalClose onClose={...} />`.
2. **Form Input**: Gunakan kelas input standar:
   ```tsx
   <label className="block text-xs font-medium text-foreground mb-1">
     Judul Field <span className="text-red-500">*</span>
   </label>
   <input
     type="text"
     className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-blue-600 focus:outline-none"
   />
   ```
3. **Modal Footer**: Tombol batal border standar dan tombol simpan biru:
   ```tsx
   <ModalFooter>
     <button type="button" className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-muted">
       Batal
     </button>
     <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700">
       Simpan Perubahan
     </button>
   </ModalFooter>
   ```

### Aturan Rich-Text & Perenderan Konten:
1. **Editor**: Selalu gunakan [`ProjectRichEditor`](file:///c:/project/porto/fe-starter-next/src/components/portfolio/shared/project-rich-editor.tsx) untuk form input konten panjang (studi kasus proyek & artikel blog).
2. **Perenderan Publik**:
   - Gunakan container Tailwind Typography:
     ```tsx
     <div
       className="prose prose-base sm:prose-lg dark:prose-invert max-w-none"
       dangerouslySetInnerHTML={{ __html: content }}
     />
     ```
   - Sediakan fallback parser paragraf/markdown sederhana untuk data teks lama agar kompatibilitas tetap terjaga.

---

## 4. Aturan Pencegahan Hydration Mismatch

> **PENTING**: Jangan pernah melakukan percabangan nilai atribut HTML pada fase render menggunakan `typeof window !== 'undefined'`.

**Contoh yang SALAH (Memicu Hydration Error):**
```tsx
// SALAH: Server menghasilkan URL fallback, klien menghasilkan window.location.href
const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://example.com';
return <a href={shareUrl}>Bagikan</a>;
```

**Contoh yang BENAR:**
```tsx
// BENAR: Pindahkan pembacaan window ke dalam event handler (onClick)
const handleShare = () => {
  if (typeof window !== 'undefined') {
    const url = window.location.href;
    window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, '_blank');
  }
};
return <button type="button" onClick={handleShare}>Bagikan</button>;
```

---

## 5. Arsitektur Fallback Data (`adapters.ts`)

- Seluruh data yang ditampilkan di halaman publik wajib melalui fungsi adapter di [`src/features/portfolio/adapters.ts`](file:///c:/project/porto/fe-starter-next/src/features/portfolio/adapters.ts) (`getNormalizedProjects`, `getNormalizedBlogs`, `getNormalizedProfile`, dll).
- Fungsi adapter menjamin jika respon API backend kosong atau server backend mati, antarmuka publik akan **otomatis menampilkan data cadangan statis** dari [`src/data/`](file:///c:/project/porto/fe-starter-next/src/data/) tanpa mengalami error.

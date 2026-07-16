<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Cafe FE App — Agent Rules & Conventions

> Baca file ini SEBELUM menulis kode apa pun di project ini.
> File ini adalah sumber kebenaran untuk semua konvensi, arsitektur, dan pattern yang berlaku.

## 1. Project Identity

| Key              | Value                                            |
| ---------------- | ------------------------------------------------ |
| **Nama**         | Cafe FE App (Amar Cafe Frontend)                 |
| **Stack**        | Next.js 16 (App Router) · React 19 · TypeScript 6 |
| **Styling**      | Tailwind CSS v3 + CSS Variables (oklch) + shadcn/ui (base-nova style) |
| **State**        | Zustand v5 (global) · TanStack React Query v5 (server state) |
| **Forms**        | React Hook Form v7 + Zod v4 (validation)         |
| **Tables**       | TanStack React Table v8                          |
| **Icons**        | Lucide React                                     |
| **Rich Text**    | TipTap v3                                        |
| **Charts**       | ApexCharts (via react-apexcharts)                |
| **Date Picker**  | react-datepicker                                 |
| **File Upload**  | react-dropzone + Cloudinary (via custom hook)    |
| **Select**       | react-select (untuk multi-select / searchable)   |
| **Theme**        | next-themes (light/dark via class strategy)      |
| **Package Mgr**  | Bun                                              |
| **Backend API**  | REST API di `cafe-be-app` (default: http://localhost:4000) |
| **Bahasa UI**    | **Bahasa Indonesia** untuk semua label, placeholder, notifikasi, dan pesan error |

## 2. Architecture Overview

```
Architecture: Feature-Sliced Design (Modular)
Rendering: Client-side heavy (most pages use "use client")
Auth: JWT token via localStorage + Zustand store
RBAC: Backend-driven navigation & permission per route
API Layer: Custom fetch wrapper (apiClient) → Service classes → React Query hooks
Payment: Midtrans Snap integration (via backend snap_token)
```

### Provider Hierarchy (Root Layout)

```
<html> → <body>
  └─ ThemeProvider (next-themes)
     └─ NotificationProvider (custom toast system)
        └─ QueryProvider (TanStack React Query, staleTime: 60s)
           └─ {children}
```

### Route Group Strategy

Project menggunakan Next.js **route groups** `(groupName)` untuk memisahkan layout:

| Group          | Path Prefix   | Layout Behavior                              | Auth Required |
| -------------- | ------------- | -------------------------------------------- | ------------- |
| `(admin)`      | `/dashboard`, `/cafe/*`, `/billiard/*`, dll | Sidebar + Header + AuthGuard | ✅ Ya |
| `(admin)/(rbac)` | `/master-data/*`, `/web-management/*`, `/transaction/*`, `/billiard/schedules` (rbac) | RBAC permission check per route | ✅ Ya |
| `(admin)/cafe` | `/cafe/*` | Cafe pages (di luar RBAC group) | ✅ Ya |
| `(admin)/billiard` | `/billiard/*` | Billiard pages (di luar RBAC group) | ✅ Ya |
| `(auth)`       | `/auth/*`     | Minimal layout (bg #F8F9FD)                  | ❌ Tidak |
| `(public)`     | `/`           | No layout wrapper                            | ❌ Tidak |
| `(standalone)` | `/pages/maintenance`, `/pages/coming-soon` | Centered layout | ❌ Tidak |
| `(error)`      | `/error/400`, `/error/401`, dst | Centered + text-center | ❌ Tidak |

## 3. Directory & File Conventions

### Path Alias

```
@/* → ./src/*   (dikonfigurasi di tsconfig.json)
```

### Feature Module Structure

Setiap domain bisnis diorganisir sebagai feature module di `src/features/`:

```
src/features/<domain>/
├── types/           # TypeScript types & interfaces (index.ts)
├── services/        # Service class (static methods, uses apiClient)
├── hooks/           # React Query hooks (useXxx, useCreateXxx, dst)
├── constants/       # Konstanta & dummy data (opsional)
├── utils/           # Helper functions khusus feature (opsional)
├── store.ts         # Zustand CRUD store (createCrudStore atau custom) (opsional)
└── components/      # (opsional) Komponen khusus feature
```

> **Catatan:** Minimum yang WAJIB ada di setiap feature module: `types/`, `services/`, `hooks/`.
> Folder `constants/`, `utils/`, `store.ts` dibuat sesuai kebutuhan.
> Jika feature membutuhkan CRUD modal state, buat `store.ts` menggunakan `createCrudStore<T>()`.

### Global Hooks & Utils

Selain hooks dan utils di dalam feature module, project juga memiliki folder global:

```
src/hooks/           # Global reusable custom hooks (lintas feature)
src/utils/           # Global utility/helper functions (lintas feature)
```

**Aturan:**
- Jika hook/util hanya relevan untuk satu feature → taruh di `features/<domain>/hooks/` atau `features/<domain>/utils/`
- Jika hook/util dipakai oleh **lebih dari satu feature** → taruh di `src/hooks/` atau `src/utils/`

**Feature modules yang sudah ada:**

| Domain | Module | Deskripsi |
|---|---|---|
| **Auth** | `features/auth/` | Login service & auth types |
| **RBAC** | `features/rbac/user/` | CRUD user, navigation, permissions |
| **RBAC** | `features/rbac/role/` | CRUD role |
| **RBAC** | `features/rbac/menu/` | CRUD menu (sidebar items) |
| **RBAC** | `features/rbac/role-permission/` | CRUD role-permission mapping |
| **Cafe** | `features/cafe/dish-category/` | CRUD kategori makanan |
| **Cafe** | `features/cafe/dish/` | CRUD menu makanan |
| **Cafe** | `features/cafe/dish-image/` | CRUD galeri gambar makanan |
| **Cafe** | `features/cafe/dish-order/` | CRUD pesanan + detail + payment |
| **Billiard** | `features/billiard/table-type/` | CRUD tipe meja billiard |
| **Billiard** | `features/billiard/table/` | CRUD meja billiard |
| **Billiard** | `features/billiard/table-image/` | CRUD galeri gambar meja |
| **Billiard** | `features/billiard/schedule/` | CRUD slot waktu reservasi |
| **Billiard** | `features/billiard/reservation/` | CRUD reservasi + payment |
| **Payment** | `features/payment/` | Service untuk create/list payment |
| **Upload** | `features/upload/` | Cloudinary upload hook |

### Component Organization

```
src/components/
├── ui/              # shadcn/ui components (DO NOT edit manually, use `npx shadcn add`)
├── shared/          # Reusable business components (DataTable, PageHeader, DeleteConfirmModal)
├── layout/          # Layout components (AdminSidebar, AdminHeader)
├── auth/            # Auth-related components (AuthGuard)
├── forms/           # (future) Reusable form components
└── theme-provider.tsx
```

### Store Organization

```
src/stores/
├── use-auth.ts          # Auth state (token, user, isAuthenticated, setAuth, clearAuth, hydrate)
├── use-store.ts         # UI state (isSidebarOpen, toggleSidebar, dll)
└── create-crud-store.ts # Generic factory for CRUD modal state management
```

**Feature stores** (di dalam masing-masing feature module):
```
src/features/cafe/dish-category/store.ts
src/features/cafe/dish/store.ts
src/features/cafe/dish-image/store.ts
src/features/cafe/dish-order/store.ts       # Custom: detail modal + payment modal
src/features/billiard/table-type/store.ts
src/features/billiard/table/store.ts
src/features/billiard/table-image/store.ts
src/features/billiard/schedule/store.ts
src/features/billiard/reservation/store.ts  # Custom: payment modal
src/features/rbac/user/store.ts
```

## 4. Coding Patterns & Rules

### 4.1 Service Class Pattern

Setiap service WAJIB menggunakan pattern **static class** yang memanggil `apiClient`:

```typescript
// src/features/<domain>/services/<domain>-service.ts
import { apiClient } from "@/services/api/client";
import type { ApiResponse, WriteResult } from "@/services/api/types";
import type { MyEntity, CreateRequest, UpdateRequest } from "../types";

export class MyEntityService {
  static async getAll(): Promise<ApiResponse<MyEntity[]>> {
    return apiClient<ApiResponse<MyEntity[]>>("/api/my-entities");
  }

  static async create(payload: CreateRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>("/api/my-entities", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }
  // ... getById, update, delete
}
```

**Rules:**
- Semua method HARUS `static async`
- Return type HARUS eksplisit `Promise<ApiResponse<T>>`
- Gunakan `WriteResult` untuk operasi create/update/delete
- Untuk endpoint publik (tanpa JWT), tambahkan `skipAuth: true`
- JANGAN buat instance dari service class
- JANGAN install library baru tanpa izin user
- JANGAN buat store Zustand baru kecuali benar-benar perlu state global

### 4.2 React Query Hook Pattern

Setiap feature WAJIB memiliki hooks file yang membungkus service calls:

```typescript
// src/features/<domain>/hooks/use-<domain>.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Query Key Factory — WAJIB digunakan untuk konsistensi cache invalidation
export const ENTITY_KEYS = {
  all: ["entities"] as const,
  lists: () => [...ENTITY_KEYS.all, "list"] as const,
  list: (filters: string) => [...ENTITY_KEYS.lists(), { filters }] as const,
  details: () => [...ENTITY_KEYS.all, "detail"] as const,
  detail: (id: number) => [...ENTITY_KEYS.details(), id] as const,
};

// Query hook — untuk GET
export function useEntities() {
  return useQuery({
    queryKey: ENTITY_KEYS.lists(),
    queryFn: async () => {
      const res = await EntityService.getAll();
      return res.data; // ← unwrap ApiResponse.data
    },
  });
}

// Mutation hook — untuk POST/PUT/DELETE
export function useCreateEntity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateRequest) => EntityService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ENTITY_KEYS.lists() });
    },
  });
}
```

**Rules:**
- Selalu definisikan `ENTITY_KEYS` factory untuk query keys
- Query hooks HARUS unwrap `res.data` dari `ApiResponse`
- Mutation hooks HARUS invalidate queries terkait di `onSuccess`
- Nama hook: `use<Entity>s` (list), `use<Entity>` (detail), `useCreate<Entity>`, `useUpdate<Entity>`, `useDelete<Entity>`

### 4.3 API Response Contract

Backend selalu mengembalikan format:

```typescript
// Success response
{ success: true, data: T, message: "..." }

// Error response (thrown by apiClient)
{ success: false, message: "..." }

// Write operations return
{ success: true, data: { id: number | string }, message: "..." }

// Payment create response (Midtrans)
{ success: true, data: { id: number, snap_token: string, url: string, transaction_id: string }, message: "..." }
```

### 4.4 Auth & RBAC Pattern

**Auth Flow:**
1. Login → `AuthService.login()` → response berisi `{ token, user }`
2. Token & user disimpan di `localStorage` + Zustand (`useAuthStore.setAuth()`)
3. `apiClient` otomatis attach `Authorization: Bearer <token>` header
4. Semua request juga attach `X-App-Token` header

**RBAC Flow:**
1. Setelah login, sidebar memanggil `useUserNavigation()` → `GET /api/users/me/navigation`
2. Navigation response berisi tree of menu items dengan `permissions` per item
3. `(rbac)` layout mengecek apakah current pathname ada di allowed paths
4. `usePermissions()` hook memberikan `can_read/can_create/can_update/can_delete/can_report`
5. UI buttons/actions dikontrol berdasarkan permissions

**PENTING:**
- JANGAN hardcode permission checks — selalu gunakan `usePermissions()`
- Sidebar menu dirender dari API response, BUKAN dari static config
- Static `overviewLinks` dan `componentLinks` di sidebar adalah untuk demo/showcase pages

### 4.5 Page Pattern (Admin CRUD Pages)

Setiap halaman admin CRUD WAJIB dipisah menjadi beberapa file modular untuk menghindari *monolithic components* dan memisahkan *concern*:

```
src/app/(admin)/cafe/entities/
├── page.tsx                      # Orchestrator: Fetch data, render header, table & modals
└── _components/                  # Komponen khusus halaman ini
    ├── entity-columns.tsx        # Definisi kolom tabel (memanggil Zustand store untuk action)
    ├── entity-form-modal.tsx     # Form Create/Edit (memanggil Zustand store & mutations)
    ├── entity-image-gallery-modal.tsx  # (opsional) Galeri gambar
    ├── entity-image-form-modal.tsx     # (opsional) Form upload gambar
    └── entity-payment-modal.tsx        # (opsional) Modal payment (untuk orders/reservations)
```

**Zustand CRUD Store Pattern:**
Setiap fitur CRUD harus memiliki file `store.ts` di dalam `features/<domain>/store.ts` menggunakan factory `createCrudStore`:

```typescript
import { createCrudStore } from "@/stores/create-crud-store";
import type { Entity } from "./types";

export const useEntityStore = createCrudStore<Entity>();
```

**Custom Store (untuk nested modals):**
```typescript
// Contoh: dish-order store dengan detail + payment modal
import { createCrudStore } from "@/stores/create-crud-store";
import type { DishOrder } from "./types";
import { create } from "zustand";

export const useDishOrderStore = createCrudStore<DishOrder>();

// Tambahan state untuk detail/payment modals
export const useDishOrderDetailStore = create<{
  viewingOrder: DishOrder | null;
  paymentOrder: DishOrder | null;
  openDetail: (order: DishOrder) => void;
  closeDetail: () => void;
  openPayment: (order: DishOrder) => void;
  closePayment: () => void;
}>((set) => ({
  viewingOrder: null,
  paymentOrder: null,
  openDetail: (order) => set({ viewingOrder: order }),
  closeDetail: () => set({ viewingOrder: null }),
  openPayment: (order) => set({ paymentOrder: order }),
  closePayment: () => set({ paymentOrder: null }),
}));
```

**Struktur `page.tsx`:**
```tsx
"use client";

import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeleteConfirmModal } from "@/components/shared/delete-confirm-modal";
import { usePermissions } from "@/features/rbac/user/hooks/use-user";
import { useEntityStore } from "@/features/rbac/entity/store";
import { useEntityColumns } from "./_components/entity-columns";
import { EntityFormModal } from "./_components/entity-form-modal";

export default function EntityPage() {
  const { data, isLoading } = useEntities();
  const permissions = usePermissions();
  const { openCreate, deleteId, closeDelete } = useEntityStore();
  const columns = useEntityColumns({ permissions });

  return (
    <div className="space-y-6">
      <PageHeader title="Judul" breadcrumbs={[{ label: "Parent", href: "#" }]} />
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Daftar Entity</CardTitle>
          {permissions.can_create && <Button onClick={openCreate}>Tambah</Button>}
        </CardHeader>
        <CardContent className="p-0">
          <DataTable data={data} columns={columns} isLoading={isLoading} />
        </CardContent>
      </Card>
      
      <EntityFormModal />
      <DeleteConfirmModal
        open={deleteId !== null}
        onOpenChange={(open) => !open && closeDelete()}
        onConfirm={handleDelete}
      />
    </div>
  );
}
```

### 4.6 Payment Integration Pattern

Untuk halaman yang memiliki fitur pembayaran (dish-orders, reservations):

```tsx
// _components/entity-payment-modal.tsx atau order-section.tsx
import { PaymentService } from "@/features/payment/services/payment-service";

// Cash payment → langsung complete, struk WA otomatis dari backend
const handleCashPayment = async () => {
  await PaymentService.create({
    type: "dish_order", // atau "reservation"
    dish_order_id: order.id,
    method: "cash",
    provider: "cashier",
    gross_amount: order.nett_price,
  });
};

// Midtrans payment → get snap_token → open Snap widget
// Setelah sukses, webhook backend akan memproses notifikasi WA via Fonnte
const handleMidtransPayment = async () => {
  const result = await PaymentService.create({
    type: "dish_order",
    dish_order_id: order.id,
    method: "qris",
    provider: "midtrans",
    gross_amount: order.nett_price,
  });
  if (result.data?.snap_token) {
    window.snap.pay(result.data.snap_token, { /* callbacks */ });
  }
};
```

### 4.7 UI Component Rules

- **shadcn/ui components** di `src/components/ui/` — JANGAN edit manual, gunakan `npx shadcn add <component>`
- shadcn style: **base-nova**, base color: **neutral**, CSS variables: **enabled**
- `cn()` helper dari `@/lib/utils` untuk merging Tailwind classes
- Icons: selalu gunakan **Lucide React** (`lucide-react`)
- Notifications/Toast: gunakan `useNotification()` hook dari `@/components/ui/notification`
  - Variants: `"success"`, `"danger"`, `"warning"`, `"info"`
  - Format: `add({ title: "...", message: "...", variant: "success" })`

### 4.8 Styling Rules

- **Tailwind CSS v3** dengan PostCSS + Autoprefixer
- Dark mode: `class` strategy (dikontrol oleh next-themes)
- Color tokens menggunakan **oklch** CSS variables (lihat `globals.css`)
- Selalu gunakan design tokens: `bg-background`, `text-foreground`, `bg-card`, `border-border`, dll
- JANGAN hardcode warna kecuali untuk branding tertentu (misal: `bg-blue-600` untuk brand accent)
- Border radius: gunakan `rounded-lg` / `rounded-xl` (sesuai `--radius` token)
- Scrollbar hide: gunakan class `no-scrollbar`

### 4.9 TypeScript Rules

- `strict: false` di tsconfig (project ini tidak strict mode)
- Semua types HARUS didefinisikan di `types/index.ts` dalam feature folder
- Gunakan `type` keyword (bukan `interface`) untuk consistency
- Path alias `@/*` WAJIB digunakan untuk semua imports (jangan relative `../../`)
- Global shared types di `src/services/api/types.ts`: `ApiResponse<T>`, `WriteResult`

### 4.10 Naming Conventions

| Item              | Convention                    | Example                      |
| ----------------- | ----------------------------- | ---------------------------- |
| Feature folder    | kebab-case                    | `role-permission/`           |
| Service file      | kebab-case + `-service.ts`    | `user-service.ts`            |
| Hook file         | kebab-case + `use-` prefix    | `use-user.ts`                |
| Service class     | PascalCase + `Service`        | `UserService`                |
| Hook function     | camelCase + `use` prefix      | `useUsers`, `useCreateUser`  |
| Query key factory | SCREAMING_SNAKE + `_KEYS`     | `USER_KEYS`                  |
| Type              | PascalCase                    | `CreateUserRequest`          |
| Component         | PascalCase                    | `PageHeader`, `DataTable`    |
| Route page        | `page.tsx` (Next.js convention)| -                           |
| Layout            | `layout.tsx`                  | -                            |
| Store (global)    | `use-<name>.ts`               | `use-auth.ts`, `use-store.ts`|
| Store (feature)   | `store.ts`                    | `features/cafe/dish/store.ts`|
| Constants         | SCREAMING_SNAKE_CASE          | `DUMMY_USERS`, `API_BASE_URL`|

## 5. Environment Variables

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000     # Base URL backend API
NEXT_PUBLIC_APP_TOKEN=<token>                 # X-App-Token header value
```

- Semua env vars yang diakses di client HARUS prefix `NEXT_PUBLIC_`
- Config terpusat di `src/services/api/config.ts`

## 6. Checklist Sebelum Menulis Kode

- [ ] Sudah baca `node_modules/next/dist/docs/` untuk Next.js 16 APIs?
- [ ] Feature baru → buat folder di `src/features/<domain>/` dengan minimum **3 folder wajib** (types, services, hooks)?
- [ ] Types sudah didefinisikan di `types/index.ts`?
- [ ] Service class menggunakan `apiClient` dan pattern static methods?
- [ ] Hooks menggunakan `useQuery`/`useMutation` dengan query key factory?
- [ ] Page menggunakan `"use client"` directive?
- [ ] Permission check via `usePermissions()` untuk RBAC pages?
- [ ] Notification menggunakan `useNotification().add()`?
- [ ] Labels dan pesan dalam **Bahasa Indonesia**?
- [ ] Import menggunakan `@/` alias?
- [ ] CRUD store menggunakan `createCrudStore<T>()` dari `@/stores/create-crud-store`?
- [ ] Page components dipisah ke `_components/` (columns, form-modal, dll)?

## 7. File Reference Quick Links

| Concern              | File                                          |
| -------------------- | --------------------------------------------- |
| API Client           | `src/services/api/client.ts`                  |
| API Config           | `src/services/api/config.ts`                  |
| API Types            | `src/services/api/types.ts`                   |
| Auth Store           | `src/stores/use-auth.ts`                      |
| UI Store             | `src/stores/use-store.ts`                     |
| CRUD Store Factory   | `src/stores/create-crud-store.ts`             |
| Auth Guard           | `src/components/auth/auth-guard.tsx`          |
| Theme Provider       | `src/components/theme-provider.tsx`           |
| Query Provider       | `src/providers/query-provider.tsx`            |
| Root Layout          | `src/app/layout.tsx`                          |
| Admin Layout         | `src/app/(admin)/layout.tsx`                  |
| RBAC Guard Layout    | `src/app/(admin)/(rbac)/layout.tsx`           |
| Sidebar              | `src/components/layout/admin-sidebar.tsx`     |
| Header               | `src/components/layout/admin-header.tsx`      |
| DataTable            | `src/components/shared/data-table.tsx`        |
| PageHeader           | `src/components/shared/page-header.tsx`       |
| DeleteConfirmModal   | `src/components/shared/delete-confirm-modal.tsx` |
| Cloudinary Upload    | `src/features/upload/hooks/use-cloudinary-upload.ts` |
| Payment Service      | `src/features/payment/services/payment-service.ts` |
| Global CSS           | `src/app/globals.css`                         |
| Tailwind Config      | `tailwind.config.js`                          |
| shadcn Config        | `components.json`                             |
| Utils (cn)           | `src/lib/utils.ts`                            |

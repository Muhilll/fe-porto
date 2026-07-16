# Project Structure

## Overview

Aplikasi **Cafe FE App** — Admin dashboard untuk manajemen cafe (Amar Cafe Moncongloe).
Dibangun dengan **Next.js 16 App Router**, **React 19**, **TypeScript**, **Tailwind CSS v3**, dan **shadcn/ui**.

## Tech Stack

| Layer            | Technology                                |
| ---------------- | ----------------------------------------- |
| Framework        | Next.js 16.2.6 (App Router)               |
| UI Library       | React 19.2.4                              |
| Language         | TypeScript 6.0.3                          |
| Styling          | Tailwind CSS 3.4 + CSS Variables (oklch)  |
| Component Lib    | shadcn/ui v4 (base-nova style)            |
| State (Client)   | Zustand 5.0                               |
| State (Server)   | TanStack React Query 5.x                  |
| Tables           | TanStack React Table 8.x                  |
| Forms            | React Hook Form 7.x + Zod 4.x            |
| Charts           | ApexCharts (react-apexcharts)             |
| Rich Text Editor | TipTap 3.x                               |
| Icons            | Lucide React                              |
| Theme            | next-themes (light/dark)                  |
| HTTP Client      | Custom fetch wrapper (`apiClient`)        |
| Date Picker      | react-datepicker                          |
| File Upload      | react-dropzone + Cloudinary               |
| Select           | react-select                              |
| Package Manager  | Bun                                       |

## Environment Variables

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000     # Backend API base URL
NEXT_PUBLIC_APP_TOKEN=<token>                 # X-App-Token for API auth
```

## Root Files

```
cafe-fe-app/
├── AGENTS.md             # Agent rules & coding conventions
├── STRUCTURE.md          # This file — project structure docs
├── package.json          # Dependencies & scripts (dev/build/start/lint)
├── tsconfig.json         # TypeScript config (paths: @/* → ./src/*)
├── tailwind.config.js    # Tailwind CSS v3 config (dark mode: class, CSS vars)
├── postcss.config.js     # PostCSS (tailwindcss + autoprefixer)
├── eslint.config.mjs     # ESLint (flat config, next core-web-vitals)
├── components.json       # shadcn/ui config (style: base-nova, baseColor: neutral)
├── next.config.mjs       # Next.js config (ignoreBuildErrors: true)
├── .env / .env.example   # Environment variables
└── bun.lock              # Bun lockfile
```

## Source Code Structure

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (providers: Theme → Notification → Query)
│   ├── globals.css             # Global styles + Tailwind + CSS variable tokens (oklch)
│   │
│   ├── (admin)/                # ✅ Auth required — Admin dashboard area
│   │   ├── layout.tsx          # AdminLayout: AuthGuard → Sidebar + Header + Content
│   │   ├── dashboard/          # Dashboard page
│   │   │
│   │   ├── (rbac)/             # ✅ RBAC permission check per route
│   │   │   ├── layout.tsx      # RbacLayout: checks user navigation permissions
│   │   │   ├── master-data/
│   │   │   │   ├── roles/      # CRUD Roles
│   │   │   │   │   ├── _components/
│   │   │   │   │   │   ├── role-columns.tsx
│   │   │   │   │   │   └── role-form-modal.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   └── users/      # CRUD Users page
│   │   │   ├── web-management/
│   │   │   │   ├── menus/      # CRUD Menu items page
│   │   │   │   └── role-permissions/  # CRUD Role-Permission mapping
│   │   │   ├── billiard/
│   │   │   │   └── schedules/  # CRUD Schedules (slot waktu reservasi)
│   │   │   │       ├── _components/
│   │   │   │       │   ├── schedule-columns.tsx
│   │   │   │       │   └── schedule-form-modal.tsx
│   │   │   │       └── page.tsx
│   │   │   └── transaction/
│   │   │       └── payments/   # Daftar Payments (read-only view)
│   │   │           ├── _components/
│   │   │           │   └── payment-columns.tsx
│   │   │           └── page.tsx
│   │   │
│   │   ├── cafe/               # Cafe Management pages (di luar RBAC group)
│   │   │   ├── dish-categories/ # CRUD Dish Categories
│   │   │   │   ├── _components/
│   │   │   │   │   ├── dish-category-columns.tsx
│   │   │   │   │   └── dish-category-form-modal.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── dishes/          # CRUD Dishes + Image Gallery
│   │   │   │   ├── _components/
│   │   │   │   │   ├── dish-columns.tsx
│   │   │   │   │   ├── dish-form-modal.tsx
│   │   │   │   │   ├── dish-image-gallery-modal.tsx
│   │   │   │   │   └── dish-image-form-modal.tsx
│   │   │   │   └── page.tsx
│   │   │   └── dish-orders/     # CRUD Dish Orders + Order Details + Payment
│   │   │       ├── _components/
│   │   │       │   ├── dish-order-columns.tsx
│   │   │       │   ├── dish-order-form-modal.tsx
│   │   │       │   ├── dish-order-detail-modal.tsx
│   │   │       │   ├── dish-order-detail-form-modal.tsx
│   │   │       │   └── dish-order-payment-modal.tsx
│   │   │       └── page.tsx
│   │   │
│   │   ├── billiard/            # Billiard Management pages (di luar RBAC group)
│   │   │   ├── table-types/     # CRUD Billiard Table Types
│   │   │   │   ├── _components/
│   │   │   │   │   ├── table-type-columns.tsx
│   │   │   │   │   └── table-type-form-modal.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── tables/          # CRUD Billiard Tables + Image Gallery
│   │   │   │   ├── _components/
│   │   │   │   │   ├── table-columns.tsx
│   │   │   │   │   ├── table-form-modal.tsx
│   │   │   │   │   ├── table-image-gallery-modal.tsx
│   │   │   │   │   └── table-image-form-modal.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── schedules/       # CRUD Schedules page (standalone, tanpa RBAC check)
│   │   │   │   ├── _components/ # (kosong, UI di-handle di page langsung)
│   │   │   │   └── (tanpa page.tsx, route mengarah ke (rbac)/billiard/schedules)
│   │   │   └── reservations/    # CRUD Reservations + Payment
│   │   │       ├── _components/
│   │   │       │   ├── reservation-columns.tsx
│   │   │       │   ├── reservation-form-modal.tsx
│   │   │       │   └── reservation-payment-modal.tsx
│   │   │       └── page.tsx
│   │   │
│   │   ├── base-ui/            # UI component showcase pages (accordion, alert, etc)
│   │   ├── extended-ui/        # Extended UI demos (drag-drop, ratings)
│   │   ├── charts/             # ApexCharts demo pages (area, bar, pie, etc)
│   │   ├── forms/              # Form element demos (validation, wizard, etc)
│   │   ├── tables/             # Table demos (basic, datatable)
│   │   ├── icons/              # Icons showcase page
│   │   ├── calendar/           # Calendar page
│   │   └── pages/              # Misc pages (blank, pricing, timeline)
│   │
│   ├── (auth)/                 # ❌ No auth — Authentication pages
│   │   ├── layout.tsx          # Minimal layout (bg #F8F9FD)
│   │   └── auth/
│   │       ├── login/          # Login page (with branding panel)
│   │       ├── register/       # Register page
│   │       ├── recover-password/
│   │       ├── confirm-mail/
│   │       └── login-pin/
│   │
│   ├── (public)/               # ❌ No auth — Public pages (Landing Page & Customer Facing)
│   │   ├── _components/        # Shared components for public pages (Footer, Navbar, etc.)
│   │   ├── menu/               # Halaman menu makanan statis & dinamis
│   │   ├── order/              # Halaman checkout pesanan + Midtrans Snap integration
│   │   ├── reservation/        # Halaman reservasi meja billiard + Midtrans Snap integration
│   │   └── page.tsx            # Homepage (Landing Page Amar Cafe)
│   │
│   ├── (standalone)/           # ❌ No auth — Full-page standalone pages
│   │   ├── layout.tsx          # Centered layout
│   │   └── pages/
│   │       ├── coming-soon/
│   │       └── maintenance/
│   │
│   └── (error)/                # ❌ No auth — Error pages
│       ├── layout.tsx          # Centered + text-center layout
│       └── error/
│           ├── 400/
│           ├── 401/
│           ├── 403/
│           ├── 404/
│           ├── 500/
│           └── 503/
│
├── components/                 # Reusable components (global)
│   ├── ui/                     # shadcn/ui components (23 components)
│   │   ├── accordion.tsx
│   │   ├── alert.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── button.tsx          # Button with variants (CVA)
│   │   ├── card.tsx
│   │   ├── carousel.tsx
│   │   ├── chart.tsx
│   │   ├── collapse.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── link.tsx
│   │   ├── list-group.tsx
│   │   ├── modal.tsx           # Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, ModalClose
│   │   ├── notification.tsx    # NotificationProvider + useNotification hook (toast system)
│   │   ├── offcanvas.tsx
│   │   ├── pagination.tsx
│   │   ├── placeholder.tsx
│   │   ├── progress.tsx
│   │   ├── rating.tsx
│   │   ├── spinner.tsx
│   │   ├── tabs.tsx
│   │   └── tooltip.tsx
│   │
│   ├── shared/                 # Reusable business components
│   │   ├── data-table.tsx      # Generic DataTable (search, sort, paginate, export CSV, col toggle)
│   │   ├── delete-confirm-modal.tsx  # Reusable delete confirmation modal
│   │   └── page-header.tsx     # PageHeader with breadcrumbs
│   │
│   ├── layout/                 # Layout components
│   │   ├── admin-sidebar.tsx   # Admin sidebar (dynamic menu from API, filters by is_visible)
│   │   └── admin-header.tsx    # Admin header (search, theme toggle, user dropdown, logout)
│   │
│   ├── auth/                   # Auth-related components
│   │   └── auth-guard.tsx      # AuthGuard wrapper (redirects to /auth/login if not authenticated)
│   │
│   ├── theme-provider.tsx      # next-themes ThemeProvider wrapper
│   └── client-demo.tsx         # Demo component (Zustand counter + React Query)
│
├── features/                   # Feature modules (domain-driven)
│   ├── auth/                   # Authentication feature
│   │   ├── types/
│   │   │   └── index.ts        # LoginRequest, AuthUser, LoginResponse
│   │   └── services/
│   │       └── auth-service.ts # AuthService.login() (skipAuth: true)
│   │
│   ├── rbac/                   # Role-Based Access Control feature
│   │   ├── user/               # User management
│   │   │   ├── types/
│   │   │   │   └── index.ts    # User, CreateUserRequest, UpdateUserRequest, NavigationItem, NavigationPermission
│   │   │   ├── services/
│   │   │   │   └── user-service.ts  # UserService (CRUD + getNavigation)
│   │   │   ├── hooks/
│   │   │   │   └── use-user.ts      # useUsers, useUser, useCreateUser, useUpdateUser, useDeleteUser, useUserNavigation, usePermissions
│   │   │   ├── constants/
│   │   │   │   └── dummy-data.ts    # DUMMY_USERS (sample data)
│   │   │   ├── store.ts             # Zustand store for user CRUD state
│   │   │   └── utils/               # (kosong, disiapkan untuk helper functions)
│   │   │
│   │   ├── role/               # Role management
│   │   │   ├── types/          # Role, CreateRoleRequest, UpdateRoleRequest
│   │   │   ├── services/       # RoleService (CRUD)
│   │   │   ├── hooks/          # useRoles, useRole, useCreateRole, etc.
│   │   │   ├── constants/      # DUMMY_ROLES
│   │   │   └── utils/          # (kosong)
│   │   │
│   │   ├── menu/               # Menu/navigation management
│   │   │   ├── types/          # Menu types
│   │   │   ├── services/       # MenuService (CRUD)
│   │   │   ├── hooks/          # useMenus, useCreateMenu, etc.
│   │   │   ├── constants/      # DUMMY_MENUS
│   │   │   └── utils/          # (kosong)
│   │   │
│   │   └── role-permission/    # Role-Permission mapping
│   │       ├── types/          # RolePermission types
│   │       ├── services/       # RolePermissionService (CRUD)
│   │       ├── hooks/          # useRolePermissions, etc.
│   │       ├── constants/      # DUMMY_ROLE_PERMISSIONS
│   │       └── utils/          # (kosong)
│   │
│   ├── cafe/                   # Cafe domain features
│   │   ├── dish-category/      # Dish category feature module
│   │   │   ├── types/          # DishCategory types
│   │   │   ├── services/       # DishCategoryService (CRUD)
│   │   │   ├── hooks/          # useDishCategories, useCreateDishCategory, etc.
│   │   │   ├── constants/      # Dummy data
│   │   │   ├── store.ts        # Zustand CRUD store
│   │   │   └── utils/
│   │   │
│   │   ├── dish/               # Dish feature module
│   │   │   ├── types/          # Dish types
│   │   │   ├── services/       # DishService (CRUD)
│   │   │   ├── hooks/          # useDishes, useCreateDish, etc.
│   │   │   └── store.ts        # Zustand CRUD store
│   │   │
│   │   ├── dish-image/         # Dish image feature module
│   │   │   ├── types/          # DishImage types
│   │   │   ├── services/       # DishImageService (CRUD)
│   │   │   ├── hooks/          # useDishImages, useCreateDishImage, etc.
│   │   │   └── store.ts        # Zustand CRUD store (custom: galeri modal state)
│   │   │
│   │   └── dish-order/         # Dish order feature module
│   │       ├── types/          # DishOrder, DishOrderDetail types
│   │       ├── services/       # DishOrderService, DishOrderDetailService
│   │       ├── hooks/          # useDishOrders, useCreateDishOrder, etc.
│   │       └── store.ts        # Zustand CRUD store (custom: detail modal + payment modal state)
│   │
│   ├── billiard/               # Billiard domain features
│   │   ├── table-type/         # Billiard table type feature module
│   │   │   ├── types/          # BilliardTableType types
│   │   │   ├── services/       # BilliardTableTypeService (CRUD)
│   │   │   ├── hooks/          # useTableTypes, useCreateTableType, etc.
│   │   │   ├── constants/      # Dummy data
│   │   │   ├── store.ts        # Zustand CRUD store
│   │   │   └── utils/
│   │   │
│   │   ├── table/              # Billiard table feature module
│   │   │   ├── types/          # BilliardTable types
│   │   │   ├── services/       # BilliardTableService (CRUD)
│   │   │   ├── hooks/          # useTables, useCreateTable, etc.
│   │   │   ├── constants/      # Dummy data
│   │   │   ├── store.ts        # Zustand CRUD store
│   │   │   └── utils/
│   │   │
│   │   ├── table-image/        # Billiard table image feature module
│   │   │   ├── types/          # BilliardTableImage types
│   │   │   ├── services/       # BilliardTableImageService (CRUD)
│   │   │   ├── hooks/          # useTableImages, useCreateTableImage, etc.
│   │   │   ├── constants/      # Dummy data
│   │   │   ├── store.ts        # Zustand CRUD store
│   │   │   └── utils/
│   │   │
│   │   ├── schedule/           # Schedule/time slot feature module
│   │   │   ├── types/          # Schedule types
│   │   │   ├── services/       # ScheduleService (CRUD)
│   │   │   ├── hooks/          # useSchedules, useCreateSchedule, etc.
│   │   │   ├── constants/      # Dummy data
│   │   │   ├── store.ts        # Zustand CRUD store
│   │   │   └── utils/
│   │   │
│   │   └── reservation/        # Reservation feature module
│   │       ├── types/          # Reservation types
│   │       ├── services/       # ReservationService (CRUD)
│   │       ├── hooks/          # useReservations, useCreateReservation, etc.
│   │       ├── constants/      # Dummy data
│   │       ├── store.ts        # Zustand CRUD store (custom: payment modal state)
│   │       └── utils/
│   │
│   ├── payment/                # Payment feature module
│   │   ├── types/
│   │   │   └── index.ts        # Payment, CreatePaymentRequest, UpdatePaymentRequest, PaymentResponse
│   │   ├── services/
│   │   │   └── payment-service.ts  # PaymentService (getAll, create, update)
│   │   └── hooks/              # usePayments, useCreatePayment, etc.
│   │
│   └── upload/                 # Upload/Cloudinary feature module
│       └── hooks/
│           └── use-cloudinary-upload.ts  # useCloudinaryUpload hook (signature + direct upload)
│
├── services/                   # Global service layer
│   └── api/
│       ├── client.ts           # apiClient<T>() — fetch wrapper (auto Bearer token + X-App-Token)
│       ├── config.ts           # API_BASE_URL, APP_TOKEN (from env vars)
│       └── types.ts            # ApiResponse<T>, WriteResult
│
├── stores/                     # Zustand stores (global state)
│   ├── use-auth.ts             # Auth state: token, user, isAuthenticated, setAuth, clearAuth, hydrate
│   ├── use-store.ts            # UI state: isSidebarOpen, toggleSidebar, cart management (addCart, removeCart, clearCart)
│   └── create-crud-store.ts    # Generic factory function for feature CRUD modal state
│
├── hooks/                      # Global reusable custom hooks (lintas feature)
│   └── .gitkeep                # (kosong — disiapkan untuk hooks yang dipakai lebih dari satu feature)
│
├── utils/                      # Global utility/helper functions (lintas feature)
│   └── .gitkeep                # (kosong — disiapkan untuk utils yang dipakai lebih dari satu feature)
│
├── providers/                  # React context providers
│   └── query-provider.tsx      # TanStack QueryClient provider ("use client", staleTime: 60s)
│
└── lib/                        # Core utilities
    └── utils.ts                # cn() — clsx + tailwind-merge
```

## Key Architectural Patterns

### 1. Feature Module Pattern

Setiap domain bisnis terisolasi di `src/features/<domain>/` dengan sub-folder wajib:
```
types/ → services/ → hooks/ → (constants/ → utils/ → store.ts opsional)
```

> Minimum yang WAJIB ada: `types/`, `services/`, `hooks/`.
> `constants/`, `utils/`, `store.ts` dibuat sesuai kebutuhan.
> Folder `components/` bersifat opsional, hanya dibuat jika feature membutuhkan komponen khusus.

Data flow: **Service** → **React Query Hook** → **Page Component**

### 2. API Layer Pattern

```
apiClient (fetch wrapper)
  ↓ auto-attaches headers: Content-Type, X-App-Token, Authorization
  ↓ handles error responses → throws Error with status & data
Feature Service (static class)
  ↓ calls apiClient with typed generics
React Query Hook
  ↓ wraps service calls, manages cache keys & invalidation
Page Component
  ↓ consumes hooks, renders UI
```

### 3. Auth Pattern

```
Login Page → AuthService.login() → useAuthStore.setAuth(token, user)
                                      ↓ saves to localStorage
Every API call → apiClient reads token from localStorage → attaches Bearer header
Admin Layout → AuthGuard checks useAuthStore.isAuthenticated → redirect if not
```

### 4. RBAC Pattern

```
After login → Sidebar calls useUserNavigation() → GET /api/users/me/navigation
                ↓ returns menu tree with permissions per item
(rbac) Layout → checks if current pathname is in allowed paths → redirect if not
usePermissions() → returns { can_read, can_create, can_update, can_delete, can_report }
                     ↓ used in pages to conditionally show/hide buttons
```

### 5. Admin Page Pattern (CRUD)

Setiap halaman admin CRUD dipisah ke dalam beberapa komponen modular:
1. `"use client"` directive di entry page (`page.tsx`)
2. Menggunakan `createCrudStore<T>()` untuk global modal state (`openEdit`, `closeModal`, dll).
3. `page.tsx`: Bertugas sebagai orchestrator (fetch data via React Query, render header & table).
4. `_components/*-columns.tsx`: Definisi kolom tabel, menggunakan Zustand store untuk trigger modal edit/delete tanpa prop drilling. Beberapa kolom memiliki custom actions (seperti Ikon Galeri Gambar yang memicu Modal khusus).
5. `_components/*-form-modal.tsx`: Modal form, membaca `editingItem` dari store dan menembak mutasi. Dapat di-nest (seperti Modal Form di atas Modal Galeri).
6. `DeleteConfirmModal` dari shared components, dikontrol via store `deleteId`.
7. Permission-gated actions diatur otomatis via `usePermissions()`. Khusus untuk menu tersembunyi (seperti `dish-images`), permission dibaca dari `permissions` prop di nested component yang bersumber langsung dari hooks tanpa harus ada route tersendiri.
8. Toast notifications menempel di mutation success/error via `useNotification().add()`.

**Pola Khusus — Nested Modals:**
- **Dish Orders**: `page.tsx` → `dish-order-detail-modal.tsx` → `dish-order-detail-form-modal.tsx` + `dish-order-payment-modal.tsx`
- **Reservations**: `page.tsx` → `reservation-form-modal.tsx` + `reservation-payment-modal.tsx`
- **Dishes/Tables**: `page.tsx` → `*-image-gallery-modal.tsx` → `*-image-form-modal.tsx`

### 6. Payment Integration Pattern (Frontend)

```
Order/Reservation Page (Admin & Public)
  → Click "Bayar" (atau "Selesaikan Pesanan")
  → Tentukan metode pembayaran (cash/qris)
  → If cash: PaymentService.create() → auto-complete order
  → If qris (midtrans): PaymentService.create() → receive snap_token
    → window.snap.pay(snap_token) → Midtrans Snap popup
    → On success: otomatis dikonfirmasi, dan notifikasi struk WhatsApp (Fonnte) dikirim dari backend.
```

### 7. Provider Stack (Root → Leaf)

```
RootLayout
  → ThemeProvider (class-based dark mode, default: light)
    → NotificationProvider (global toast system)
      → QueryProvider (React Query, staleTime: 60s)
        → Route Group Layout
          → Page Component
```

## Route Group Strategy

Project menggunakan Next.js **route groups** `(groupName)` untuk memisahkan layout:

| Group          | Path Prefix   | Layout Behavior                              | Auth Required |
| -------------- | ------------- | -------------------------------------------- | ------------- |
| `(admin)`      | `/dashboard`, `/cafe/*`, `/billiard/*`, dll | Sidebar + Header + AuthGuard | ✅ Ya |
| `(admin)/(rbac)` | `/master-data/*`, `/web-management/*`, `/transaction/*`, `/billiard/schedules` (via rbac) | RBAC permission check per route | ✅ Ya |
| `(admin)/cafe` | `/cafe/*` | Cafe pages (dish-categories, dishes, dish-orders) — di luar RBAC group | ✅ Ya |
| `(admin)/billiard` | `/billiard/*` | Billiard pages (table-types, tables, reservations, schedules) — di luar RBAC group | ✅ Ya |
| `(auth)`       | `/auth/*`     | Minimal layout (bg #F8F9FD)                  | ❌ Tidak |
| `(public)`     | `/`           | No layout wrapper                            | ❌ Tidak |
| `(standalone)` | `/pages/maintenance`, `/pages/coming-soon` | Centered layout | ❌ Tidak |
| `(error)`      | `/error/400`, `/error/401`, dst | Centered + text-center | ❌ Tidak |

## Folder Responsibilities (Quick Reference)

| Folder              | Tanggung Jawab                                         |
| ------------------- | ------------------------------------------------------ |
| `src/app/`          | Routing & layouts (Next.js App Router)                 |
| `src/components/ui/`| Primitive UI components (shadcn/ui, don't edit manually)|
| `src/components/shared/` | Reusable business components (DataTable, PageHeader, DeleteConfirmModal) |
| `src/components/layout/` | App shell components (Sidebar, Header)              |
| `src/components/auth/`   | Auth guard wrapper                                  |
| `src/hooks/`         | Global reusable hooks (lintas feature)                 |
| `src/utils/`         | Global utility functions (lintas feature)              |
| `src/features/`     | Domain-specific modules (types, services, hooks, store, constants, utils) |
| `src/services/api/` | Global HTTP client & API configuration                 |
| `src/stores/`       | Zustand global state stores + CRUD store factory       |
| `src/providers/`    | React context providers                                |
| `src/lib/`          | Core utility functions (`cn()`)                        |

## Feature Modules Summary

| Domain | Feature Module | Key Files |
|---|---|---|
| **Auth** | `features/auth/` | `auth-service.ts` (login, skipAuth) |
| **RBAC** | `features/rbac/user/` | `user-service.ts`, `use-user.ts` (navigation, permissions) |
| **RBAC** | `features/rbac/role/` | `role-service.ts`, `use-role.ts` |
| **RBAC** | `features/rbac/menu/` | `menu-service.ts`, `use-menu.ts` |
| **RBAC** | `features/rbac/role-permission/` | `role-permission-service.ts`, `use-role-permission.ts` |
| **Cafe** | `features/cafe/dish-category/` | `store.ts`, service, hooks, types |
| **Cafe** | `features/cafe/dish/` | `store.ts`, service, hooks, types |
| **Cafe** | `features/cafe/dish-image/` | `store.ts`, service, hooks, types |
| **Cafe** | `features/cafe/dish-order/` | `store.ts` (custom: detail + payment modals), service, hooks, types |
| **Billiard** | `features/billiard/table-type/` | `store.ts`, service, hooks, types, constants |
| **Billiard** | `features/billiard/table/` | `store.ts`, service, hooks, types, constants |
| **Billiard** | `features/billiard/table-image/` | `store.ts`, service, hooks, types, constants |
| **Billiard** | `features/billiard/schedule/` | `store.ts`, service, hooks, types, constants |
| **Billiard** | `features/billiard/reservation/` | `store.ts` (custom: payment modal), service, hooks, types, constants |
| **Payment** | `features/payment/` | `payment-service.ts` (getAll, create, update), types |
| **Upload** | `features/upload/` | `use-cloudinary-upload.ts` (signature + upload hook) |
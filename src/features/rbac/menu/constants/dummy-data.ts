import type { Menu } from "../types";

export const DUMMY_MENUS: Menu[] = [
  // ── Standalone (no parent, has path) ──
  { id: 1, name: "Dashboard", path: "/dashboard", permission_path: "/api/dashboard", icon: "LayoutDashboard", parent_id: null, parent_name: null, created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 2, name: "Calendar", path: "/calendar", permission_path: "/api/calendar", icon: "Calendar", parent_id: null, parent_name: null, created_at: "2025-02-01T08:00:00Z", updated_at: "2025-02-01T08:00:00Z" },
  { id: 20, name: "Reservasi", path: "/reservasi", permission_path: "/api/reservations", icon: "CalendarCheck", parent_id: null, parent_name: null, created_at: "2025-03-01T08:00:00Z", updated_at: "2025-03-01T08:00:00Z" },

  // ── Master Data (parent, path null) ──
  { id: 3, name: "Master Data", path: null, permission_path: null, icon: "Database", parent_id: null, parent_name: null, created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 4, name: "Role", path: "/master-data/roles", permission_path: "/api/roles", icon: null, parent_id: 3, parent_name: "Master Data", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 5, name: "User", path: "/master-data/users", permission_path: "/api/users", icon: null, parent_id: 3, parent_name: "Master Data", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },

  // ── Web Management (parent, path null) ──
  { id: 6, name: "Web Management", path: null, permission_path: null, icon: "Settings", parent_id: null, parent_name: null, created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 7, name: "Menu", path: "/web-management/menus", permission_path: "/api/menus", icon: null, parent_id: 6, parent_name: "Web Management", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 8, name: "Role Permission", path: "/web-management/role-permissions", permission_path: "/api/role-permissions", icon: null, parent_id: 6, parent_name: "Web Management", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },

  // ── Transaksi (parent, path null) ──
  { id: 9, name: "Transaksi", path: null, permission_path: null, icon: "ShoppingCart", parent_id: null, parent_name: null, created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 10, name: "Pesanan", path: "/transaksi/pesanan", permission_path: "/api/orders", icon: null, parent_id: 9, parent_name: "Transaksi", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 11, name: "Pembayaran", path: "/transaksi/pembayaran", permission_path: "/api/payments", icon: null, parent_id: 9, parent_name: "Transaksi", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 12, name: "Meja", path: "/transaksi/meja", permission_path: "/api/tables", icon: null, parent_id: 9, parent_name: "Transaksi", created_at: "2025-02-10T08:00:00Z", updated_at: "2025-02-10T08:00:00Z" },

  // ── Katalog (parent, path null) ──
  { id: 13, name: "Katalog", path: null, permission_path: null, icon: "UtensilsCrossed", parent_id: null, parent_name: null, created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 14, name: "Kategori Menu", path: "/katalog/kategori", permission_path: "/api/categories", icon: null, parent_id: 13, parent_name: "Katalog", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 15, name: "Daftar Menu", path: "/katalog/daftar-menu", permission_path: "/api/products", icon: null, parent_id: 13, parent_name: "Katalog", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 16, name: "Stok Bahan", path: "/katalog/stok", permission_path: "/api/stocks", icon: null, parent_id: 13, parent_name: "Katalog", created_at: "2025-02-15T08:00:00Z", updated_at: "2025-02-15T08:00:00Z" },

  // ── Laporan (parent, path null) ──
  { id: 17, name: "Laporan", path: null, permission_path: null, icon: "BarChart3", parent_id: null, parent_name: null, created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 18, name: "Laporan Penjualan", path: "/laporan/penjualan", permission_path: "/api/reports/sales", icon: null, parent_id: 17, parent_name: "Laporan", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 19, name: "Laporan Stok", path: "/laporan/stok", permission_path: "/api/reports/stock", icon: null, parent_id: 17, parent_name: "Laporan", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
];

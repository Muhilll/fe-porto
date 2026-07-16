import type { RolePermission } from "../types";

export const DUMMY_ROLE_PERMISSIONS: RolePermission[] = [
  // ── ADMIN (id:1) — Full access to everything ──
  { id: 1,  role_id: 1, role_name: "Administrator", menu_id: 1,  menu_name: "Dashboard",         can_read: true,  can_create: true,  can_update: true,  can_delete: true,  can_report: true,  created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 2,  role_id: 1, role_name: "Administrator", menu_id: 2,  menu_name: "Calendar",           can_read: true,  can_create: true,  can_update: true,  can_delete: true,  can_report: true,  created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 3,  role_id: 1, role_name: "Administrator", menu_id: 4,  menu_name: "Role",               can_read: true,  can_create: true,  can_update: true,  can_delete: true,  can_report: true,  created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 4,  role_id: 1, role_name: "Administrator", menu_id: 5,  menu_name: "User",               can_read: true,  can_create: true,  can_update: true,  can_delete: true,  can_report: true,  created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 5,  role_id: 1, role_name: "Administrator", menu_id: 7,  menu_name: "Menu",               can_read: true,  can_create: true,  can_update: true,  can_delete: true,  can_report: true,  created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 6,  role_id: 1, role_name: "Administrator", menu_id: 8,  menu_name: "Role Permission",    can_read: true,  can_create: true,  can_update: true,  can_delete: true,  can_report: true,  created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 7,  role_id: 1, role_name: "Administrator", menu_id: 10, menu_name: "Pesanan",            can_read: true,  can_create: true,  can_update: true,  can_delete: true,  can_report: true,  created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 8,  role_id: 1, role_name: "Administrator", menu_id: 11, menu_name: "Pembayaran",         can_read: true,  can_create: true,  can_update: true,  can_delete: true,  can_report: true,  created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 9,  role_id: 1, role_name: "Administrator", menu_id: 12, menu_name: "Meja",               can_read: true,  can_create: true,  can_update: true,  can_delete: true,  can_report: true,  created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 10, role_id: 1, role_name: "Administrator", menu_id: 14, menu_name: "Kategori Menu",      can_read: true,  can_create: true,  can_update: true,  can_delete: true,  can_report: true,  created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 11, role_id: 1, role_name: "Administrator", menu_id: 15, menu_name: "Daftar Menu",        can_read: true,  can_create: true,  can_update: true,  can_delete: true,  can_report: true,  created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 12, role_id: 1, role_name: "Administrator", menu_id: 16, menu_name: "Stok Bahan",         can_read: true,  can_create: true,  can_update: true,  can_delete: true,  can_report: true,  created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 13, role_id: 1, role_name: "Administrator", menu_id: 18, menu_name: "Laporan Penjualan",  can_read: true,  can_create: true,  can_update: true,  can_delete: true,  can_report: true,  created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 14, role_id: 1, role_name: "Administrator", menu_id: 19, menu_name: "Laporan Stok",       can_read: true,  can_create: true,  can_update: true,  can_delete: true,  can_report: true,  created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },

  // ── USER (id:2) — Read-only on limited menus ──
  { id: 15, role_id: 2, role_name: "User", menu_id: 1,  menu_name: "Dashboard",         can_read: true,  can_create: false, can_update: false, can_delete: false, can_report: false, created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 16, role_id: 2, role_name: "User", menu_id: 4,  menu_name: "Role",               can_read: true,  can_create: false, can_update: false, can_delete: false, can_report: false, created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 17, role_id: 2, role_name: "User", menu_id: 5,  menu_name: "User",               can_read: true,  can_create: false, can_update: false, can_delete: false, can_report: false, created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },

  // ── CASHIER (id:3) — Orders, payments, catalog read, reports ──
  { id: 18, role_id: 3, role_name: "Kasir", menu_id: 1,  menu_name: "Dashboard",         can_read: true,  can_create: false, can_update: false, can_delete: false, can_report: true,  created_at: "2025-02-10T10:30:00Z", updated_at: "2025-02-10T10:30:00Z" },
  { id: 19, role_id: 3, role_name: "Kasir", menu_id: 10, menu_name: "Pesanan",            can_read: true,  can_create: true,  can_update: true,  can_delete: false, can_report: true,  created_at: "2025-02-10T10:30:00Z", updated_at: "2025-02-10T10:30:00Z" },
  { id: 20, role_id: 3, role_name: "Kasir", menu_id: 11, menu_name: "Pembayaran",         can_read: true,  can_create: true,  can_update: false, can_delete: false, can_report: true,  created_at: "2025-02-10T10:30:00Z", updated_at: "2025-02-10T10:30:00Z" },
  { id: 21, role_id: 3, role_name: "Kasir", menu_id: 12, menu_name: "Meja",               can_read: true,  can_create: false, can_update: true,  can_delete: false, can_report: false, created_at: "2025-02-10T10:30:00Z", updated_at: "2025-02-10T10:30:00Z" },
  { id: 22, role_id: 3, role_name: "Kasir", menu_id: 15, menu_name: "Daftar Menu",        can_read: true,  can_create: false, can_update: false, can_delete: false, can_report: false, created_at: "2025-02-10T10:30:00Z", updated_at: "2025-02-10T10:30:00Z" },
  { id: 23, role_id: 3, role_name: "Kasir", menu_id: 18, menu_name: "Laporan Penjualan",  can_read: true,  can_create: false, can_update: false, can_delete: false, can_report: true,  created_at: "2025-02-10T10:30:00Z", updated_at: "2025-02-10T10:30:00Z" },

  // ── MANAGER (id:4) — Wide access, no web management ──
  { id: 24, role_id: 4, role_name: "Manajer", menu_id: 1,  menu_name: "Dashboard",         can_read: true,  can_create: false, can_update: false, can_delete: false, can_report: true,  created_at: "2025-03-05T14:00:00Z", updated_at: "2025-03-05T14:00:00Z" },
  { id: 25, role_id: 4, role_name: "Manajer", menu_id: 4,  menu_name: "Role",               can_read: true,  can_create: true,  can_update: true,  can_delete: false, can_report: true,  created_at: "2025-03-05T14:00:00Z", updated_at: "2025-03-05T14:00:00Z" },
  { id: 26, role_id: 4, role_name: "Manajer", menu_id: 5,  menu_name: "User",               can_read: true,  can_create: true,  can_update: true,  can_delete: true,  can_report: true,  created_at: "2025-03-05T14:00:00Z", updated_at: "2025-03-05T14:00:00Z" },
  { id: 27, role_id: 4, role_name: "Manajer", menu_id: 10, menu_name: "Pesanan",            can_read: true,  can_create: true,  can_update: true,  can_delete: true,  can_report: true,  created_at: "2025-03-05T14:00:00Z", updated_at: "2025-03-05T14:00:00Z" },
  { id: 28, role_id: 4, role_name: "Manajer", menu_id: 11, menu_name: "Pembayaran",         can_read: true,  can_create: true,  can_update: true,  can_delete: false, can_report: true,  created_at: "2025-03-05T14:00:00Z", updated_at: "2025-03-05T14:00:00Z" },
  { id: 29, role_id: 4, role_name: "Manajer", menu_id: 12, menu_name: "Meja",               can_read: true,  can_create: true,  can_update: true,  can_delete: true,  can_report: false, created_at: "2025-03-05T14:00:00Z", updated_at: "2025-03-05T14:00:00Z" },
  { id: 30, role_id: 4, role_name: "Manajer", menu_id: 14, menu_name: "Kategori Menu",      can_read: true,  can_create: true,  can_update: true,  can_delete: false, can_report: false, created_at: "2025-03-05T14:00:00Z", updated_at: "2025-03-05T14:00:00Z" },
  { id: 31, role_id: 4, role_name: "Manajer", menu_id: 15, menu_name: "Daftar Menu",        can_read: true,  can_create: true,  can_update: true,  can_delete: true,  can_report: true,  created_at: "2025-03-05T14:00:00Z", updated_at: "2025-03-05T14:00:00Z" },
  { id: 32, role_id: 4, role_name: "Manajer", menu_id: 16, menu_name: "Stok Bahan",         can_read: true,  can_create: true,  can_update: true,  can_delete: false, can_report: true,  created_at: "2025-03-05T14:00:00Z", updated_at: "2025-03-05T14:00:00Z" },
  { id: 33, role_id: 4, role_name: "Manajer", menu_id: 18, menu_name: "Laporan Penjualan",  can_read: true,  can_create: false, can_update: false, can_delete: false, can_report: true,  created_at: "2025-03-05T14:00:00Z", updated_at: "2025-03-05T14:00:00Z" },
  { id: 34, role_id: 4, role_name: "Manajer", menu_id: 19, menu_name: "Laporan Stok",       can_read: true,  can_create: false, can_update: false, can_delete: false, can_report: true,  created_at: "2025-03-05T14:00:00Z", updated_at: "2025-03-05T14:00:00Z" },

  // ── WAITER (id:5) — Orders and tables only ──
  { id: 35, role_id: 5, role_name: "Pelayan", menu_id: 1,  menu_name: "Dashboard",   can_read: true,  can_create: false, can_update: false, can_delete: false, can_report: false, created_at: "2025-03-20T09:15:00Z", updated_at: "2025-03-20T09:15:00Z" },
  { id: 36, role_id: 5, role_name: "Pelayan", menu_id: 10, menu_name: "Pesanan",      can_read: true,  can_create: true,  can_update: true,  can_delete: false, can_report: false, created_at: "2025-03-20T09:15:00Z", updated_at: "2025-03-20T09:15:00Z" },
  { id: 37, role_id: 5, role_name: "Pelayan", menu_id: 12, menu_name: "Meja",         can_read: true,  can_create: false, can_update: true,  can_delete: false, can_report: false, created_at: "2025-03-20T09:15:00Z", updated_at: "2025-03-20T09:15:00Z" },
  { id: 38, role_id: 5, role_name: "Pelayan", menu_id: 15, menu_name: "Daftar Menu",  can_read: true,  can_create: false, can_update: false, can_delete: false, can_report: false, created_at: "2025-03-20T09:15:00Z", updated_at: "2025-03-20T09:15:00Z" },

  // ── CHEF (id:6) — Kitchen: orders read, stock management ──
  { id: 39, role_id: 6, role_name: "Koki", menu_id: 1,  menu_name: "Dashboard",   can_read: true,  can_create: false, can_update: false, can_delete: false, can_report: false, created_at: "2025-04-01T11:00:00Z", updated_at: "2025-04-01T11:00:00Z" },
  { id: 40, role_id: 6, role_name: "Koki", menu_id: 10, menu_name: "Pesanan",      can_read: true,  can_create: false, can_update: true,  can_delete: false, can_report: false, created_at: "2025-04-01T11:00:00Z", updated_at: "2025-04-01T11:00:00Z" },
  { id: 41, role_id: 6, role_name: "Koki", menu_id: 15, menu_name: "Daftar Menu",  can_read: true,  can_create: false, can_update: false, can_delete: false, can_report: false, created_at: "2025-04-01T11:00:00Z", updated_at: "2025-04-01T11:00:00Z" },
  { id: 42, role_id: 6, role_name: "Koki", menu_id: 16, menu_name: "Stok Bahan",   can_read: true,  can_create: true,  can_update: true,  can_delete: false, can_report: true,  created_at: "2025-04-01T11:00:00Z", updated_at: "2025-04-01T11:00:00Z" },
];

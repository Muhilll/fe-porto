"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import type { User } from "@/features/rbac/user/types";
import { useUserStore } from "@/features/rbac/user/store";

const roleColors: Record<string, string> = {
  Administrator: "bg-blue-100 text-blue-700",
  User: "bg-muted text-muted-foreground",
  Kasir: "bg-green-100 text-green-700",
  Manajer: "bg-purple-100 text-purple-700",
  Pelayan: "bg-orange-100 text-orange-700",
  Koki: "bg-cyan-100 text-cyan-700",
};

type UseUserColumnsProps = {
  permissions: {
    can_update: boolean;
    can_delete: boolean;
  };
};

export function useUserColumns({ permissions }: UseUserColumnsProps) {
  const { openEdit, openDelete } = useUserStore();

  return useMemo<ColumnDef<User, any>[]>(
    () => [
      {
        id: "no",
        header: "No",
        cell: ({ row, table }) => {
          const { pageIndex, pageSize } = table.getState().pagination;
          const idx = table
            .getRowModel()
            .rows.findIndex((r) => r.id === row.id);
          return (
            <span className="text-muted-foreground text-sm">
              {pageIndex * pageSize + idx + 1}
            </span>
          );
        },
        size: 50,
        enableSorting: false,
      },
      {
        accessorKey: "name",
        header: "Nama",
        cell: (info) => (
          <div className="flex items-center gap-2.5">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${info.getValue()}&backgroundColor=b6e3f4`}
              className="size-8 rounded-full bg-muted shrink-0 border border-border"
              alt=""
            />
            <div className="min-w-0">
              <p className="font-medium text-foreground truncate">
                {info.getValue() as string}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {info.row.original.email}
              </p>
            </div>
          </div>
        ),
        size: 240,
      },
      {
        accessorKey: "role_name",
        header: "Role",
        cell: (info) => {
          const r =
            info.row.original.role?.name ||
            info.row.original.role_name ||
            "-";
          return (
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                roleColors[r] || "bg-muted text-muted-foreground"
              }`}
            >
              {r}
            </span>
          );
        },
        size: 140,
      },
      {
        accessorKey: "created_at",
        header: "Dibuat",
        cell: (info) => (
          <span className="text-muted-foreground whitespace-nowrap">
            {new Date(info.getValue() as string).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        ),
        size: 140,
      },
      {
        id: "actions",
        header: "Aksi",
        cell: ({ row }) => {
          if (!permissions.can_update && !permissions.can_delete)
            return (
              <span className="text-muted-foreground text-xs">-</span>
            );
          return (
            <div className="flex items-center gap-1">
              {permissions.can_update && (
                <button
                  onClick={() => openEdit(row.original)}
                  className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  title="Edit"
                >
                  <Edit className="size-3.5" />
                </button>
              )}
              {permissions.can_delete && (
                <button
                  onClick={() => openDelete(row.original.id)}
                  className="p-1.5 rounded-md hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors"
                  title="Hapus"
                >
                  <Trash2 className="size-3.5" />
                </button>
              )}
            </div>
          );
        },
        enableSorting: false,
        size: 90,
      },
    ],
    [permissions, openEdit, openDelete]
  );
}

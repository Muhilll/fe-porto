"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Menu } from "@/features/rbac/menu/types";
import { useMenuStore } from "@/features/rbac/menu/store";

type UseMenuColumnsProps = {
  permissions: {
    can_update: boolean;
    can_delete: boolean;
  };
};

export function useMenuColumns({ permissions }: UseMenuColumnsProps) {
  const { openEdit, openDelete } = useMenuStore();

  return useMemo<ColumnDef<Menu, any>[]>(
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
        header: "Nama Menu",
        cell: (info) => (
          <span className="font-medium text-foreground">
            {info.getValue() as string}
          </span>
        ),
        size: 180,
      },
      {
        accessorKey: "path",
        header: "Path",
        cell: (info) => {
          const v = info.getValue() as string | null;
          return v ? (
            <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
              {v}
            </code>
          ) : (
            <span className="text-muted-foreground">—</span>
          );
        },
        size: 200,
      },
      {
        accessorKey: "permission_path",
        header: "Permission Path",
        cell: (info) => {
          const v = info.getValue() as string | null;
          return v ? (
            <Badge variant="soft-info" rounded="full" size="sm">
              {v}
            </Badge>
          ) : (
            <span className="text-muted-foreground">—</span>
          );
        },
        size: 180,
      },
      {
        accessorKey: "parent_name",
        header: "Parent",
        cell: (info) => {
          const v = info.row.original.parent_name;
          return v ? (
            <Badge variant="outline-secondary" rounded="full" size="sm">
              {v}
            </Badge>
          ) : (
            <span className="text-muted-foreground">—</span>
          );
        },
        size: 140,
      },
      {
        accessorKey: "icon",
        header: "Icon",
        cell: (info) => {
          const v = info.getValue() as string | null;
          return v ? (
            <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
              {v}
            </code>
          ) : (
            <span className="text-muted-foreground">—</span>
          );
        },
        size: 130,
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

"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Role } from "@/features/rbac/role/types";
import type { RolePermission } from "@/features/rbac/role-permission/types";
import { useRolePermissionStore } from "@/features/rbac/role-permission/store";

type UseRolePermissionColumnsProps = {
  permissions: {
    can_update: boolean;
  };
  allPerms: RolePermission[];
};

export function useRolePermissionColumns({
  permissions,
  allPerms,
}: UseRolePermissionColumnsProps) {
  const { openEdit: openManage } = useRolePermissionStore();

  const getPermCount = (roleId: number) => {
    return allPerms.filter((p) => p.role_id === roleId).length;
  };

  return useMemo<ColumnDef<Role, any>[]>(
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
        accessorKey: "code",
        header: "Kode",
        cell: (info) => (
          <Badge variant="soft-default" rounded="full" size="sm">
            {info.getValue() as string}
          </Badge>
        ),
        size: 120,
      },
      {
        accessorKey: "name",
        header: "Nama Role",
        cell: (info) => (
          <span className="font-medium text-foreground">
            {info.getValue() as string}
          </span>
        ),
        size: 200,
      },
      {
        id: "perm_count",
        header: "Menu Terdaftar",
        cell: ({ row }) => {
          const count = getPermCount(row.original.id);
          return (
            <Badge
              variant={count > 0 ? "soft-success" : "soft-secondary"}
              rounded="full"
              size="sm"
            >
              {count} menu
            </Badge>
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
          if (!permissions.can_update)
            return (
              <span className="text-muted-foreground text-xs">-</span>
            );
          return (
            <button
              onClick={() => openManage(row.original)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors border border-blue-200"
              title="Atur Permission"
            >
              <Shield className="size-3.5" />
              Permission
            </button>
          );
        },
        enableSorting: false,
        size: 140,
      },
    ],
    [allPerms, permissions, openManage]
  );
}

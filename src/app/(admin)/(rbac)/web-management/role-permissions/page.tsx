"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { useRoles } from "@/features/rbac/role/hooks/use-role";
import { useMenus } from "@/features/rbac/menu/hooks/use-menu";
import { useRolePermissions } from "@/features/rbac/role-permission/hooks/use-role-permission";
import { usePermissions } from "@/features/rbac/user/hooks/use-user";

import { useRolePermissionColumns } from "./_components/role-permission-columns";
import { PermissionMatrixModal } from "./_components/permission-matrix-modal";

export default function RolePermissionsPage() {
  const { data: roles = [], isLoading: loadingRoles } = useRoles();
  const { data: menus = [], isLoading: loadingMenus } = useMenus();
  const { data: perms = [], isLoading: loadingPerms } = useRolePermissions();
  const permissions = usePermissions();

  const columns = useRolePermissionColumns({
    permissions,
    allPerms: perms,
  });

  const isDataLoading = loadingRoles || loadingMenus || loadingPerms;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manajemen Role Permission"
        description="Atur hak akses setiap role terhadap menu yang tersedia."
        breadcrumbs={[
          { label: "Web Management", href: "#" },
          { label: "Role Permission" },
        ]}
      />

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Daftar Role</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            data={roles}
            columns={columns}
            searchPlaceholder="Cari role..."
            exportFilename="role-permissions"
            isLoading={isDataLoading}
            canExport={permissions.can_report}
          />
        </CardContent>
      </Card>

      <PermissionMatrixModal menus={menus} perms={perms} />
    </div>
  );
}

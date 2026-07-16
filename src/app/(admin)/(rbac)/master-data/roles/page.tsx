"use client";

import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { useNotification } from "@/components/ui/notification";
import {
  useRoles,
  useDeleteRole,
} from "@/features/rbac/role/hooks/use-role";
import { usePermissions } from "@/features/rbac/user/hooks/use-user";
import { useRoleStore } from "@/features/rbac/role/store";

import { useRoleColumns } from "./_components/role-columns";
import { RoleFormModal } from "./_components/role-form-modal";
import { DeleteConfirmModal } from "@/components/shared/delete-confirm-modal";

export default function RolesPage() {
  const { data: roles = [], isLoading } = useRoles();
  const { add } = useNotification();
  const deleteRole = useDeleteRole();
  const permissions = usePermissions();

  const { openCreate, deleteId, closeDelete } = useRoleStore();

  const columns = useRoleColumns({ permissions });

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteRole.mutateAsync(deleteId);
      add({
        title: "Berhasil",
        message: "Role berhasil dihapus.",
        variant: "success",
      });
      closeDelete();
    } catch (error: any) {
      add({
        title: "Gagal",
        message: error.message || "Gagal menghapus role.",
        variant: "danger",
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manajemen Role"
        description="Kelola role yang tersedia di sistem."
        breadcrumbs={[
          { label: "Master Data", href: "#" },
          { label: "Role" },
        ]}
      />

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Daftar Role</CardTitle>
          {permissions.can_create && (
            <Button
              onClick={openCreate}
              size="sm"
              disabled={permissions.isLoading}
            >
              <Plus className="size-4 mr-1.5" />
              Tambah Role
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            data={roles}
            columns={columns}
            searchPlaceholder="Cari role..."
            isLoading={isLoading}
            canExport={permissions.can_report}
            exportFilename="roles"
          />
        </CardContent>
      </Card>

      <RoleFormModal />

      <DeleteConfirmModal
        open={deleteId !== null}
        onOpenChange={(open) => !open && closeDelete()}
        onConfirm={handleDelete}
        isPending={deleteRole.isPending}
        description="Apakah kamu yakin ingin menghapus role ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
}

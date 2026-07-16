"use client";

import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { useNotification } from "@/components/ui/notification";
import {
  useUsers,
  useDeleteUser,
  usePermissions,
} from "@/features/rbac/user/hooks/use-user";
import { useRoles } from "@/features/rbac/role/hooks/use-role";
import { useUserStore } from "@/features/rbac/user/store";

import { useUserColumns } from "./_components/user-columns";
import { UserFormModal } from "./_components/user-form-modal";
import { DeleteConfirmModal } from "@/components/shared/delete-confirm-modal";

export default function UsersPage() {
  const { data: users = [], isLoading: isLoadingUsers } = useUsers();
  const { data: roles = [], isLoading: isLoadingRoles } = useRoles();
  const { add } = useNotification();
  const deleteUser = useDeleteUser();
  const permissions = usePermissions();

  const { openCreate, deleteId, closeDelete } = useUserStore();

  const columns = useUserColumns({ permissions });

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteUser.mutateAsync(deleteId);
      add({
        title: "Berhasil",
        message: "Data user berhasil dihapus.",
        variant: "success",
      });
      closeDelete();
    } catch (error: any) {
      add({
        title: "Gagal",
        message: error.message || "Gagal menghapus data.",
        variant: "danger",
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manajemen User"
        description="Kelola data pengguna dan akses mereka ke sistem."
        breadcrumbs={[
          { label: "Master Data", href: "#" },
          { label: "User" },
        ]}
      />

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Daftar User</CardTitle>
          {permissions.can_create && (
            <Button
              onClick={openCreate}
              size="sm"
              disabled={isLoadingRoles || permissions.isLoading}
            >
              <Plus className="size-4 mr-1.5" />
              Tambah User
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            data={users}
            columns={columns}
            searchPlaceholder="Cari user..."
            isLoading={isLoadingUsers}
            canExport={permissions.can_report}
            exportFilename="users"
          />
        </CardContent>
      </Card>

      <UserFormModal roles={roles} />

      <DeleteConfirmModal
        open={deleteId !== null}
        onOpenChange={(open) => !open && closeDelete()}
        onConfirm={handleDelete}
        isPending={deleteUser.isPending}
        description="Apakah kamu yakin ingin menghapus user ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
}

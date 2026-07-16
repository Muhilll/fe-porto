"use client";

import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { useNotification } from "@/components/ui/notification";
import {
  useMenus,
  useDeleteMenu,
} from "@/features/rbac/menu/hooks/use-menu";
import { usePermissions } from "@/features/rbac/user/hooks/use-user";
import { useMenuStore } from "@/features/rbac/menu/store";

import { useMenuColumns } from "./_components/menu-columns";
import { MenuFormModal } from "./_components/menu-form-modal";
import { DeleteConfirmModal } from "@/components/shared/delete-confirm-modal";

export default function MenusPage() {
  const { data: menus = [], isLoading } = useMenus();
  const { add } = useNotification();
  const deleteMenu = useDeleteMenu();
  const permissions = usePermissions();

  const { openCreate, deleteId, closeDelete } = useMenuStore();

  const columns = useMenuColumns({ permissions });

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMenu.mutateAsync(deleteId);
      add({
        title: "Berhasil",
        message: "Menu berhasil dihapus.",
        variant: "success",
      });
      closeDelete();
    } catch (error: any) {
      add({
        title: "Gagal",
        message: error.message || "Gagal menghapus menu.",
        variant: "danger",
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manajemen Menu"
        description="Kelola menu navigasi dan permission path yang tersedia."
        breadcrumbs={[
          { label: "Web Management", href: "#" },
          { label: "Menu" },
        ]}
      />

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Daftar Menu</CardTitle>
          {permissions.can_create && (
            <Button
              onClick={openCreate}
              size="sm"
              disabled={permissions.isLoading}
            >
              <Plus className="size-4 mr-1.5" />
              Tambah Menu
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            data={menus}
            columns={columns}
            searchPlaceholder="Cari menu..."
            isLoading={isLoading}
            canExport={permissions.can_report}
            exportFilename="menus"
          />
        </CardContent>
      </Card>

      <MenuFormModal menus={menus} />

      <DeleteConfirmModal
        open={deleteId !== null}
        onOpenChange={(open) => !open && closeDelete()}
        onConfirm={handleDelete}
        isPending={deleteMenu.isPending}
        description="Apakah kamu yakin ingin menghapus menu ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
}

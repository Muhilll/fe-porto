"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalClose,
} from "@/components/ui/modal";
import { useNotification } from "@/components/ui/notification";
import type { Menu } from "@/features/rbac/menu/types";
import {
  useCreateMenu,
  useUpdateMenu,
} from "@/features/rbac/menu/hooks/use-menu";
import { useMenuStore } from "@/features/rbac/menu/store";

const inputCls =
  "w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-card";

type MenuFormModalProps = {
  menus: Menu[];
};

export function MenuFormModal({ menus }: MenuFormModalProps) {
  const { isModalOpen, editingItem: editingMenu, closeModal } = useMenuStore();
  const { add } = useNotification();
  const createMenu = useCreateMenu();
  const updateMenu = useUpdateMenu();

  const [formName, setFormName] = useState("");
  const [formPath, setFormPath] = useState("");
  const [formPermissionPath, setFormPermissionPath] = useState("");
  const [formIcon, setFormIcon] = useState("");
  const [formIsVisible, setFormIsVisible] = useState(false);
  const [formParentId, setFormParentId] = useState<number | "">("");

  const parentMenus = useMemo(
    () => menus.filter((m) => m.parent_id === null),
    [menus]
  );

  useEffect(() => {
    if (isModalOpen) {
      if (editingMenu) {
        setFormName(editingMenu.name);
        setFormPath(editingMenu.path || "");
        setFormPermissionPath(editingMenu.permission_path || "");
        setFormIcon(editingMenu.icon || "");
        setFormIsVisible(editingMenu.is_visible ?? false);
        setFormParentId(editingMenu.parent_id ?? "");
      } else {
        setFormName("");
        setFormPath("");
        setFormPermissionPath("");
        setFormIcon("");
        setFormIsVisible(false);
        setFormParentId("");
      }
    }
  }, [isModalOpen, editingMenu]);

  const handleSave = async () => {
    if (!formName.trim()) return;
    const parentId = formParentId === "" ? null : Number(formParentId);

    const payload = {
      name: formName,
      path: formPath || null,
      permission_path: formPermissionPath || null,
      icon: formIcon || null,
      is_visible: formIsVisible,
      parent_id: parentId,
    };

    try {
      if (editingMenu) {
        await updateMenu.mutateAsync({
          id: editingMenu.id,
          data: payload,
        });
        add({
          title: "Berhasil",
          message: "Menu berhasil diperbarui.",
          variant: "success",
        });
      } else {
        await createMenu.mutateAsync(payload);
        add({
          title: "Berhasil",
          message: "Menu berhasil ditambahkan.",
          variant: "success",
        });
      }
      closeModal();
    } catch (error: any) {
      add({
        title: "Gagal",
        message: error.message || "Terjadi kesalahan sistem.",
        variant: "danger",
      });
    }
  };

  const isSaving = createMenu.isPending || updateMenu.isPending;

  return (
    <Modal
      open={isModalOpen}
      onClose={() => !isSaving && closeModal()}
      className="max-w-md"
    >
      <ModalHeader>
        <ModalTitle>
          {editingMenu ? "Edit Menu" : "Tambah Menu"}
        </ModalTitle>
        <ModalClose onClose={() => !isSaving && closeModal()} />
      </ModalHeader>
      <ModalBody className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Nama Menu <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="Contoh: Dashboard"
            className={inputCls}
            disabled={isSaving}
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Path
          </label>
          <input
            type="text"
            value={formPath}
            onChange={(e) => setFormPath(e.target.value)}
            placeholder="/dashboard"
            className={inputCls}
            disabled={isSaving}
          />
          <p className="text-xs text-muted-foreground">
            URL navigasi di frontend.
          </p>
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Permission Path
          </label>
          <input
            type="text"
            value={formPermissionPath}
            onChange={(e) => setFormPermissionPath(e.target.value)}
            placeholder="/api/menus"
            className={inputCls}
            disabled={isSaving}
          />
          <p className="text-xs text-muted-foreground">
            Path API untuk pengecekan RBAC.
          </p>
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Icon
          </label>
          <input
            type="text"
            value={formIcon}
            onChange={(e) => setFormIcon(e.target.value)}
            placeholder="LayoutDashboard"
            className={inputCls}
            disabled={isSaving}
          />
          <p className="text-xs text-muted-foreground">
            Nama icon dari Lucide React.
          </p>
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Parent Menu
          </label>
          <select
            value={formParentId}
            onChange={(e) =>
              setFormParentId(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
            className={inputCls}
            disabled={isSaving}
          >
            <option value="">— Tanpa Parent (Root) —</option>
            {parentMenus
              .filter((pm) => pm.id !== editingMenu?.id)
              .map((pm) => (
                <option key={pm.id} value={pm.id}>
                  {pm.name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            id="is_visible"
            checked={formIsVisible}
            onChange={(e) => setFormIsVisible(e.target.checked)}
            className="rounded border-border text-primary focus:ring-primary/20"
            disabled={isSaving}
          />
          <label htmlFor="is_visible" className="text-sm font-medium text-foreground cursor-pointer">
            Tampilkan di Sidebar (Menu Navigasi)
          </label>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          variant="outline"
          onClick={() => closeModal()}
          disabled={isSaving}
        >
          Batal
        </Button>
        <Button
          onClick={handleSave}
          disabled={!formName.trim() || isSaving}
        >
          {isSaving
            ? "Menyimpan..."
            : editingMenu
            ? "Simpan Perubahan"
            : "Tambah"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

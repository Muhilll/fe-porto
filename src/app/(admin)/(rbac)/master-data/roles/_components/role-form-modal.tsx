"use client";

import { useState, useEffect } from "react";
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
import {
  useCreateRole,
  useUpdateRole,
} from "@/features/rbac/role/hooks/use-role";
import { useRoleStore } from "@/features/rbac/role/store";

const inputCls =
  "w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-card";

export function RoleFormModal() {
  const { isModalOpen, editingItem: editingRole, closeModal } = useRoleStore();
  const { add } = useNotification();
  const createRole = useCreateRole();
  const updateRole = useUpdateRole();

  const [formCode, setFormCode] = useState("");
  const [formName, setFormName] = useState("");

  useEffect(() => {
    if (isModalOpen) {
      if (editingRole) {
        setFormCode(editingRole.code);
        setFormName(editingRole.name);
      } else {
        setFormCode("");
        setFormName("");
      }
    }
  }, [isModalOpen, editingRole]);

  const handleSave = async () => {
    if (!formCode.trim() || !formName.trim()) return;
    try {
      if (editingRole) {
        await updateRole.mutateAsync({
          id: editingRole.id,
          data: { code: formCode, name: formName },
        });
        add({
          title: "Berhasil",
          message: "Role berhasil diperbarui.",
          variant: "success",
        });
      } else {
        await createRole.mutateAsync({
          code: formCode.toUpperCase(),
          name: formName,
        });
        add({
          title: "Berhasil",
          message: "Role berhasil ditambahkan.",
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

  const isSaving = createRole.isPending || updateRole.isPending;

  return (
    <Modal
      open={isModalOpen}
      onClose={() => !isSaving && closeModal()}
      className="max-w-md"
    >
      <ModalHeader>
        <ModalTitle>
          {editingRole ? "Edit Role" : "Tambah Role"}
        </ModalTitle>
        <ModalClose onClose={() => !isSaving && closeModal()} />
      </ModalHeader>
      <ModalBody className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Kode <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formCode}
            onChange={(e) => setFormCode(e.target.value.toUpperCase())}
            placeholder="Contoh: ADMIN"
            className={inputCls}
            disabled={isSaving}
          />
          <p className="text-xs text-muted-foreground">
            Kode unik untuk identifikasi role (uppercase).
          </p>
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Nama Role <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="Contoh: Administrator"
            className={inputCls}
            disabled={isSaving}
          />
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
          disabled={!formCode.trim() || !formName.trim() || isSaving}
        >
          {isSaving
            ? "Menyimpan..."
            : editingRole
            ? "Simpan Perubahan"
            : "Tambah"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

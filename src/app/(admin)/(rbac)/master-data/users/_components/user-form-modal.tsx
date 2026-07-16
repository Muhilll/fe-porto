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
import type { Role } from "@/features/rbac/role/types";
import {
  useCreateUser,
  useUpdateUser,
} from "@/features/rbac/user/hooks/use-user";
import { useUserStore } from "@/features/rbac/user/store";

const inputCls =
  "w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-card";

type UserFormModalProps = {
  roles: Role[];
};

export function UserFormModal({ roles }: UserFormModalProps) {
  const { isModalOpen, editingItem: editingUser, closeModal } = useUserStore();
  const { add } = useNotification();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formRoleId, setFormRoleId] = useState<number>(0);

  useEffect(() => {
    if (isModalOpen) {
      if (editingUser) {
        setFormName(editingUser.name);
        setFormEmail(editingUser.email);
        setFormPassword("");
        setFormRoleId(editingUser.role_id);
      } else {
        setFormName("");
        setFormEmail("");
        setFormPassword("");
        setFormRoleId(roles[0]?.id || 0);
      }
    }
  }, [isModalOpen, editingUser, roles]);

  const handleSave = async () => {
    if (!formName.trim() || !formEmail.trim() || formRoleId === 0) return;
    if (!editingUser && !formPassword.trim()) return;

    try {
      if (editingUser) {
        const payload: any = {
          name: formName,
          email: formEmail,
          role_id: formRoleId,
        };
        if (formPassword.trim()) {
          payload.password = formPassword;
        }
        await updateUser.mutateAsync({
          id: editingUser.id,
          data: payload,
        });
        add({
          title: "Berhasil",
          message: "Data user berhasil diperbarui.",
          variant: "success",
        });
      } else {
        await createUser.mutateAsync({
          name: formName,
          email: formEmail,
          password: formPassword,
          role_id: formRoleId,
        });
        add({
          title: "Berhasil",
          message: "Data user berhasil ditambahkan.",
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

  const isSaving = createUser.isPending || updateUser.isPending;

  return (
    <Modal
      open={isModalOpen}
      onClose={() => !isSaving && closeModal()}
      className="max-w-md"
    >
      <ModalHeader>
        <ModalTitle>{editingUser ? "Edit User" : "Tambah User"}</ModalTitle>
        <ModalClose onClose={() => !isSaving && closeModal()} />
      </ModalHeader>
      <ModalBody className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Nama <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="Nama lengkap"
            className={inputCls}
            disabled={isSaving}
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
            placeholder="email@domain.com"
            className={inputCls}
            disabled={isSaving}
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Password{" "}
            {!editingUser && <span className="text-red-500">*</span>}
          </label>
          <input
            type="password"
            value={formPassword}
            onChange={(e) => setFormPassword(e.target.value)}
            placeholder={
              editingUser
                ? "Kosongkan jika tidak diubah"
                : "Masukkan password"
            }
            className={inputCls}
            disabled={isSaving}
          />
          {editingUser && (
            <p className="text-xs text-muted-foreground">
              Kosongkan jika tidak ingin mengubah password.
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Role <span className="text-red-500">*</span>
          </label>
          <select
            value={formRoleId}
            onChange={(e) => setFormRoleId(Number(e.target.value))}
            className={inputCls}
            disabled={isSaving}
          >
            <option value={0} disabled>
              Pilih Role
            </option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name} ({role.code})
              </option>
            ))}
          </select>
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
          disabled={
            !formName.trim() ||
            !formEmail.trim() ||
            (!editingUser && !formPassword.trim()) ||
            formRoleId === 0 ||
            isSaving
          }
        >
          {isSaving
            ? "Menyimpan..."
            : editingUser
            ? "Simpan Perubahan"
            : "Tambah"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

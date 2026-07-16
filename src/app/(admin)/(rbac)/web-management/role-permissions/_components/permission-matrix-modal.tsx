"use client";

import { useState, useEffect, useMemo, Fragment } from "react";
import {
  Shield,
  Check,
  X,
  CheckCheck,
  XCircle,
  CornerDownRight,
  Settings,
  LayoutDashboard,
  Calendar as CalendarIcon,
  CalendarCheck,
  type LucideIcon,
} from "lucide-react";
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
import type { RolePermission } from "@/features/rbac/role-permission/types";
import {
  useCreateRolePermission,
  useUpdateRolePermission,
  useDeleteRolePermission,
} from "@/features/rbac/role-permission/hooks/use-role-permission";
import { useRolePermissionStore } from "@/features/rbac/role-permission/store";

/* ── Constants ── */
const PERM_KEYS = [
  "can_read",
  "can_create",
  "can_update",
  "can_delete",
  "can_report",
] as const;

const PERM_LABELS: Record<string, string> = {
  can_read: "Baca",
  can_create: "Tambah",
  can_update: "Ubah",
  can_delete: "Hapus",
  can_report: "Laporan",
};

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  Calendar: CalendarIcon,
  CalendarCheck,
  Settings,
};

/* ── Permission Checkbox ── */
function PermCheck({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`inline-flex items-center justify-center size-7 rounded-full transition-all ${
        checked
          ? "bg-green-500 text-white shadow-sm shadow-green-200"
          : "bg-muted text-muted-foreground hover:bg-muted/80"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {checked ? (
        <Check className="size-4" />
      ) : (
        <X className="size-3.5" />
      )}
    </button>
  );
}

/* ── Types ── */
type MenuPermState = Record<
  number,
  {
    id?: number;
    can_read: boolean;
    can_create: boolean;
    can_update: boolean;
    can_delete: boolean;
    can_report: boolean;
  }
>;

type MenuGroup = {
  parent: Menu | null;
  children: Menu[];
};

/* ── Helpers ── */
function buildPermState(
  roleId: number,
  perms: RolePermission[],
  menus: Menu[]
): MenuPermState {
  const state: MenuPermState = {};
  for (const menu of menus) {
    if (!menu.path) continue;
    state[menu.id] = {
      can_read: false,
      can_create: false,
      can_update: false,
      can_delete: false,
      can_report: false,
    };
  }
  for (const p of perms) {
    if (p.role_id === roleId && state[p.menu_id]) {
      state[p.menu_id] = {
        id: p.id,
        can_read: p.can_read,
        can_create: p.can_create,
        can_update: p.can_update,
        can_delete: p.can_delete,
        can_report: p.can_report,
      };
    }
  }
  return state;
}

function groupMenus(menus: Menu[]): MenuGroup[] {
  const groups: MenuGroup[] = [];
  const standalones = menus.filter((m) => m.path && m.parent_id === null);
  if (standalones.length > 0) {
    groups.push({ parent: null, children: standalones });
  }
  const parents = menus.filter((m) => !m.path && m.parent_id === null);
  for (const parent of parents) {
    const children = menus.filter(
      (m) => m.parent_id === parent.id && m.path
    );
    if (children.length > 0) {
      groups.push({ parent, children });
    }
  }
  return groups;
}

/* ── Component ── */
type PermissionMatrixModalProps = {
  menus: Menu[];
  perms: RolePermission[];
};

export function PermissionMatrixModal({
  menus,
  perms,
}: PermissionMatrixModalProps) {
  const { isModalOpen, editingItem: selectedRole, closeModal } = useRolePermissionStore();
  const { add } = useNotification();
  const createPerm = useCreateRolePermission();
  const updatePerm = useUpdateRolePermission();
  const deletePerm = useDeleteRolePermission();

  const [permState, setPermState] = useState<MenuPermState>({});
  const [isSaving, setIsSaving] = useState(false);

  const menuGroups = useMemo(() => groupMenus(menus), [menus]);

  useEffect(() => {
    if (isModalOpen && selectedRole) {
      setPermState(buildPermState(selectedRole.id, perms, menus));
    }
  }, [isModalOpen, selectedRole, perms, menus]);

  const togglePerm = (menuId: number, key: string) => {
    if (isSaving) return;
    setPermState((prev) => ({
      ...prev,
      [menuId]: { ...prev[menuId], [key]: !prev[menuId]?.[key] },
    }));
  };

  const setAll = (val: boolean) => {
    if (isSaving) return;
    setPermState((prev) => {
      const next = { ...prev };
      for (const menuId of Object.keys(next)) {
        const mid = Number(menuId);
        next[mid] = {
          ...next[mid],
          can_read: val,
          can_create: val,
          can_update: val,
          can_delete: val,
          can_report: val,
        };
      }
      return next;
    });
  };

  const handleSave = async () => {
    if (!selectedRole || isSaving) return;
    setIsSaving(true);

    try {
      const roleId = selectedRole.id;
      const promises: Promise<any>[] = [];

      for (const [menuIdStr, state] of Object.entries(permState)) {
        const menuId = Number(menuIdStr);
        const hasAny =
          state.can_read ||
          state.can_create ||
          state.can_update ||
          state.can_delete ||
          state.can_report;

        if (state.id) {
          if (hasAny) {
            promises.push(
              updatePerm.mutateAsync({
                id: state.id,
                data: {
                  role_id: roleId,
                  menu_id: menuId,
                  can_read: state.can_read,
                  can_create: state.can_create,
                  can_update: state.can_update,
                  can_delete: state.can_delete,
                  can_report: state.can_report,
                },
              })
            );
          } else {
            promises.push(deletePerm.mutateAsync(state.id));
          }
        } else if (hasAny) {
          promises.push(
            createPerm.mutateAsync({
              role_id: roleId,
              menu_id: menuId,
              can_read: state.can_read,
              can_create: state.can_create,
              can_update: state.can_update,
              can_delete: state.can_delete,
              can_report: state.can_report,
            })
          );
        }
      }

      await Promise.all(promises);
      add({
        title: "Berhasil",
        message: "Hak akses role berhasil diperbarui.",
        variant: "success",
      });
      closeModal();
    } catch (error: any) {
      add({
        title: "Gagal",
        message:
          error.message ||
          "Terjadi kesalahan sistem saat memperbarui role permission.",
        variant: "danger",
      });
      console.error("Failed to save permissions", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={() => !isSaving && closeModal()}
      className="max-w-4xl max-h-[85vh] flex flex-col"
    >
      <ModalHeader>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-full bg-blue-100 text-blue-600">
            <Shield className="size-5" />
          </div>
          <div>
            <ModalTitle>Roles & Permissions</ModalTitle>
            <p className="text-sm text-muted-foreground mt-0.5">
              Mengatur hak akses untuk role:{" "}
              <strong className="text-foreground">
                {selectedRole?.code} — {selectedRole?.name}
              </strong>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAll(true)}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-green-50 text-green-700 hover:bg-green-100 disabled:opacity-50 transition-colors border border-green-200"
          >
            <CheckCheck className="size-3.5" />
            CENTANG SEMUA
          </button>
          <button
            onClick={() => setAll(false)}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 disabled:opacity-50 transition-colors border border-border"
          >
            <XCircle className="size-3.5" />
            HAPUS SEMUA
          </button>
          <ModalClose
            onClose={() => !isSaving && closeModal()}
          />
        </div>
      </ModalHeader>

      <ModalBody className="p-0 overflow-y-auto">
        <table className="w-full">
          <thead className="bg-card border-b border-border sticky top-0 z-10">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide w-[40%]">
                Menu
              </th>
              {PERM_KEYS.map((key) => (
                <th
                  key={key}
                  className="px-3 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                >
                  {PERM_LABELS[key]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {menuGroups.map((group, gi) => (
              <Fragment key={`group-${gi}`}>
                {group.parent && (
                  <tr key={`g-${gi}`} className="bg-muted/50">
                    <td colSpan={6} className="px-5 py-2.5">
                      <div className="flex items-center gap-2">
                        <Settings className="size-4 text-muted-foreground" />
                        <span className="text-sm font-semibold text-foreground">
                          {group.parent.name}
                        </span>
                      </div>
                    </td>
                  </tr>
                )}

                {group.children.map((menu) => (
                  <tr
                    key={menu.id}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <div
                        className={`flex items-start gap-2 ${
                          menu.parent_id ? "pl-2" : ""
                        }`}
                      >
                        {menu.parent_id ? (
                          <CornerDownRight className="size-4 text-muted-foreground/50 mt-0.5 shrink-0" />
                        ) : menu.icon && ICON_MAP[menu.icon] ? (
                          (() => {
                            const Icon = ICON_MAP[menu.icon];
                            return (
                              <Icon className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                            );
                          })()
                        ) : null}
                        <div>
                          <span className="text-sm font-medium text-foreground">
                            {menu.name}
                          </span>
                          <p className="text-xs text-rose-500 font-mono mt-0.5">
                            {menu.permission_path || menu.path}
                          </p>
                        </div>
                      </div>
                    </td>
                    {PERM_KEYS.map((key) => (
                      <td key={key} className="px-3 py-3 text-center">
                        <PermCheck
                          disabled={isSaving}
                          checked={permState[menu.id]?.[key] ?? false}
                          onChange={() => togglePerm(menu.id, key)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </ModalBody>

      <ModalFooter>
        <Button
          variant="outline"
          onClick={() => closeModal()}
          disabled={isSaving}
        >
          Batal
        </Button>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1.5" />
              Menyimpan...
            </>
          ) : (
            <>
              <Check className="size-4 mr-1.5" />
              Simpan Perubahan
            </>
          )}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

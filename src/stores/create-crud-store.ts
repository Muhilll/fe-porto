import { create } from "zustand";

type CrudModalState<T> = {
  /** Whether the create/edit modal is open */
  isModalOpen: boolean;
  /** The entity being edited, or null for create mode */
  editingItem: T | null;
  /** The ID of the entity pending delete confirmation, or null */
  deleteId: number | null;

  /** Open modal in create mode */
  openCreate: () => void;
  /** Open modal in edit mode with the given entity */
  openEdit: (item: T) => void;
  /** Close the create/edit modal */
  closeModal: () => void;
  /** Open delete confirmation for the given ID */
  openDelete: (id: number) => void;
  /** Close delete confirmation */
  closeDelete: () => void;
};

export function createCrudStore<T>() {
  return create<CrudModalState<T>>((set) => ({
    isModalOpen: false,
    editingItem: null,
    deleteId: null,

    openCreate: () => set({ isModalOpen: true, editingItem: null }),
    openEdit: (item: T) => set({ isModalOpen: true, editingItem: item }),
    closeModal: () => set({ isModalOpen: false, editingItem: null }),
    openDelete: (id: number) => set({ deleteId: id }),
    closeDelete: () => set({ deleteId: null }),
  }));
}

export type { CrudModalState };

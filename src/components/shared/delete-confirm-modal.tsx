"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalClose,
} from "@/components/ui/modal";

type DeleteConfirmModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending: boolean;
  title?: string;
  description?: string;
};

export function DeleteConfirmModal({
  open,
  onOpenChange,
  onConfirm,
  isPending,
  title = "Konfirmasi Hapus",
  description = "Apakah kamu yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.",
}: DeleteConfirmModalProps) {
  return (
    <Modal
      open={open}
      onClose={() => !isPending && onOpenChange(false)}
      className="max-w-sm"
    >
      <ModalHeader>
        <ModalTitle>{title}</ModalTitle>
        <ModalClose onClose={() => !isPending && onOpenChange(false)} />
      </ModalHeader>
      <ModalBody>
        <p className="text-sm text-muted-foreground">{description}</p>
      </ModalBody>
      <ModalFooter>
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          disabled={isPending}
        >
          Batal
        </Button>
        <Button variant="destructive" onClick={onConfirm} disabled={isPending}>
          <Trash2 className="size-3.5 mr-1.5" />
          {isPending ? "Menghapus..." : "Hapus"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

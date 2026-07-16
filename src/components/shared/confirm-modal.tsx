"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalClose,
} from "@/components/ui/modal";

type ConfirmModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending?: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
};

export function ConfirmModal({
  open,
  onOpenChange,
  onConfirm,
  isPending = false,
  title = "Konfirmasi Aksi",
  description = "Apakah kamu yakin ingin melanjutkan?",
  confirmText = "Lanjutkan",
  cancelText = "Batal",
}: ConfirmModalProps) {
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
          {cancelText}
        </Button>
        <Button onClick={onConfirm} disabled={isPending}>
          <CheckCircle2 className="size-3.5 mr-1.5" />
          {isPending ? "Memproses..." : confirmText}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

"use client";

import React, { useState } from "react";
import {
  useContactMessages,
  useMarkMessageAsRead,
  useDeleteMessage,
} from "@/features/portfolio/contact/hooks/use-contact";
import type { ContactMessage } from "@/features/portfolio/contact/types";
import { useNotification } from "@/components/ui/notification";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalClose,
} from "@/components/ui/modal";
import {
  Mail,
  MailOpen,
  MessageSquare,
  Trash2,
  CheckCircle,
  ExternalLink,
  Reply,
  Clock,
  User,
  Inbox,
  AlertTriangle,
} from "lucide-react";

export default function PortfolioInboxManagementPage() {
  const { data, isLoading } = useContactMessages();
  const messages = data?.messages || [];
  const unreadCount = data?.unreadCount || 0;

  const markAsReadMutation = useMarkMessageAsRead();
  const deleteMutation = useDeleteMessage();
  const notification = useNotification();

  // Active message modal
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [messageToDelete, setMessageToDelete] = useState<ContactMessage | null>(null);

  const handleOpenMessage = async (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.is_read) {
      try {
        await markAsReadMutation.mutateAsync(msg.id);
      } catch (e) {
        console.error("Error marking as read:", e);
      }
    }
  };

  const handleDelete = async () => {
    if (!messageToDelete) return;

    try {
      await deleteMutation.mutateAsync(messageToDelete.id);
      notification?.add?.({
        type: "success",
        title: "Pesan Dihapus",
        message: "Pesan telah dihapus dari kotak masuk.",
      });
      if (selectedMessage?.id === messageToDelete.id) {
        setSelectedMessage(null);
      }
      setMessageToDelete(null);
    } catch (err: any) {
      notification?.add?.({
        type: "error",
        title: "Gagal Menghapus",
        message: err.message || "Gagal menghapus pesan.",
      });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Kotak Masuk Pesan Pengunjung</h1>
            {unreadCount > 0 ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                <Mail className="size-3" /> {unreadCount} Belum Dibaca
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                <MailOpen className="size-3" /> Semua Terbaca
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Daftar pesan, pertanyaan, dan tawaran kerja yang dikirimkan oleh pengunjung melalui formulir kontak publik.
          </p>
        </div>

        <a
          href="/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors self-start sm:self-auto"
        >
          <ExternalLink className="size-3.5" /> Buka Halaman /contact
        </a>
      </div>

      {/* Messages List */}
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <span className="size-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
        </div>
      ) : messages.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center space-y-3">
          <Inbox className="size-12 mx-auto text-muted-foreground/50 mb-2" />
          <h3 className="text-base font-semibold text-foreground">Kotak Masuk Kosong</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Belum ada pesan yang masuk dari formulir kontak. Setiap pengunjung yang mengirim pesan akan otomatis muncul di sini.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm divide-y divide-border/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => handleOpenMessage(msg)}
              className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3 cursor-pointer transition-colors ${
                !msg.is_read
                  ? "bg-blue-50/50 dark:bg-blue-950/20 font-medium"
                  : "hover:bg-muted/40"
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`size-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    !msg.is_read
                      ? "bg-blue-600 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <User className="size-4" />
                </div>

                <div className="min-w-0 flex-1 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground truncate">{msg.name}</span>
                    <span className="text-xs text-muted-foreground font-mono">&lt;{msg.email}&gt;</span>
                    {!msg.is_read && (
                      <span className="size-2 rounded-full bg-blue-600 inline-block" />
                    )}
                  </div>
                  <h4 className="text-xs text-foreground font-medium truncate">{msg.subject}</h4>
                  <p className="text-xs text-muted-foreground truncate">{msg.message}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-border/40">
                <span className="text-[11px] font-mono text-muted-foreground">
                  {new Date(msg.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMessageToDelete(msg);
                  }}
                  className="rounded-md p-1 text-muted-foreground hover:text-red-600 hover:bg-muted transition-colors"
                  title="Hapus Pesan"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MESSAGE DETAIL MODAL */}
      <Modal open={!!selectedMessage} onClose={() => setSelectedMessage(null)} className="max-w-lg">
        <ModalHeader>
          <ModalTitle className="flex items-center gap-2">
            <Mail className="size-4 text-blue-600" />
            <span>Rincian Pesan Masuk</span>
          </ModalTitle>
          <ModalClose onClose={() => setSelectedMessage(null)} />
        </ModalHeader>

        {selectedMessage && (
          <>
            <ModalBody className="space-y-4">
              <div className="rounded-lg bg-muted/40 p-3.5 space-y-1.5 border border-border/60">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">{selectedMessage.name}</span>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    {new Date(selectedMessage.created_at).toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400 font-mono">
                  {selectedMessage.email}
                </div>
                <div className="text-xs font-medium text-foreground pt-1 border-t border-border/50">
                  Subjek: <span className="font-normal">{selectedMessage.subject}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-muted-foreground tracking-wider mb-1.5">
                  Isi Pesan:
                </label>
                <div className="rounded-lg border border-border bg-background p-4 text-xs text-foreground leading-relaxed whitespace-pre-wrap min-h-32">
                  {selectedMessage.message}
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <div className="flex items-center justify-between w-full">
                <button
                  type="button"
                  onClick={() => setMessageToDelete(selectedMessage)}
                  className="rounded-lg border border-red-200 dark:border-red-900/50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <Trash2 className="size-3 inline mr-1" /> Hapus
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
                  >
                    <Reply className="size-3.5" /> Balas Email
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedMessage(null)}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </ModalFooter>
          </>
        )}
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal open={!!messageToDelete} onClose={() => setMessageToDelete(null)} className="max-w-sm">
        <ModalHeader>
          <ModalTitle className="text-red-600 flex items-center gap-2">
            <AlertTriangle className="size-5" /> Hapus Pesan
          </ModalTitle>
          <ModalClose onClose={() => setMessageToDelete(null)} />
        </ModalHeader>
        <ModalBody>
          <p className="text-xs text-foreground">
            Apakah Anda yakin ingin menghapus pesan dari{" "}
            <span className="font-semibold text-red-600">{messageToDelete?.name}</span>?
          </p>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            onClick={() => setMessageToDelete(null)}
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
          >
            Ya, Hapus
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

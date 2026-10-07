"use client";

import Image from "next/image";
import { X, ExternalLink, Award, Calendar, Hash } from "lucide-react";
import { CertificateItem } from "@/types/portfolio";
import { motion, AnimatePresence } from "framer-motion";

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  if (!certificate) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/80 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-2xl rounded-3xl border border-border/80 bg-background p-6 sm:p-8 shadow-2xl z-10 space-y-6 overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full border border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Certificate Image Preview */}
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-border/60 bg-muted">
            <Image
              src={certificate.image}
              alt={certificate.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <Award className="w-3.5 h-3.5 text-foreground" />
                <span>{certificate.issuer}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground">
                {certificate.title}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-muted/30 border border-border/60 text-xs">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="font-mono text-muted-foreground">Issued:</span>
                <span className="font-medium text-foreground">{certificate.issueDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Hash className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="font-mono text-muted-foreground">ID:</span>
                <span className="font-mono font-medium text-foreground truncate">
                  {certificate.credentialId}
                </span>
              </div>
            </div>

            {/* Skills Validated */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">
                Skills Validated
              </span>
              <div className="flex flex-wrap gap-1.5">
                {certificate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-muted/60 text-muted-foreground border border-border/40"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Verification Link */}
            <div className="pt-4 border-t border-border/60 flex justify-end">
              <a
                href={certificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                <span>Verify Credential Online</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

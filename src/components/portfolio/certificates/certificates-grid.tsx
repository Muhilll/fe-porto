"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, Eye, ExternalLink } from "lucide-react";
import { certificatesData } from "@/data/certificates";
import { CertificateItem } from "@/types/portfolio";
import { CertificateModal } from "@/components/portfolio/certificates/certificate-modal";
import { FadeIn } from "@/components/portfolio/shared/motion-wrapper";

export function CertificatesGrid() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificatesData.map((cert, idx) => (
          <FadeIn key={cert.id} delay={idx * 0.08} className="h-full">
            <div className="group flex flex-col justify-between h-full rounded-3xl border border-border/80 bg-background/90 overflow-hidden hover:border-foreground/40 transition-all duration-300 shadow-sm hover:shadow-md">
              <div>
                {/* Certificate Image Thumbnail */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-background/95 backdrop-blur-md text-foreground border border-border/60">
                      {cert.issuer}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-foreground" />
                      <span>{cert.issueDate}</span>
                    </span>
                    <span className="truncate max-w-[120px]">{cert.credentialId}</span>
                  </div>

                  <h3 className="text-base font-semibold text-foreground line-clamp-2">
                    {cert.title}
                  </h3>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {cert.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted/60 text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono text-muted-foreground">
                        +{cert.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-6 pt-0 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedCert(cert)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-semibold bg-foreground text-background hover:opacity-90 transition-opacity"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>

                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-border/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Verify credential"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Modal */}
      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </>
  );
}

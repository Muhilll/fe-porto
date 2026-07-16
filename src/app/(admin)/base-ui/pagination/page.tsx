"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationButton,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";

function DemoPagination({ variant = "default", size = "default", label }) {
  const [page, setPage] = useState(3);
  const total = 10;

  const pages = [1, 2, page === 3 ? null : "ellipsis-start", ...( page > 3 && page < total - 1 ? [page - 1, page, page + 1] : [3, 4, 5] ), page === total - 2 ? null : "ellipsis-end", total - 1, total].filter(Boolean);

  const pagesToShow = [1, "...", page - 1 > 2 ? page - 1 : null, page > 1 && page < total ? page : null, page + 1 < total - 1 ? page + 1 : null, "...", total].filter(Boolean);

  return (
    <div className="space-y-2">
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
      <Pagination>
        <PaginationPrev disabled={page === 1} variant={variant} size={size} onClick={() => setPage((p) => Math.max(1, p - 1))} />
        {[1, 2, 3, "...", 8, 9, 10].map((p, i) =>
          p === "..." ? (
            <PaginationEllipsis key={`demo-ellipsis-${i}`} />
          ) : (
            <PaginationButton
              key={`demo-${p}`}
              isActive={p === page}
              variant={variant}
              size={size}
              onClick={() => setPage(p)}
            >
              {p}
            </PaginationButton>
          )
        )}
        <PaginationNext disabled={page === 10} variant={variant} size={size} onClick={() => setPage((p) => Math.min(10, p + 1))} />
      </Pagination>
    </div>
  );
}

export default function PaginationPage() {
  const [page1, setPage1] = useState(1);

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Pagination</h1>
        <p className="text-muted-foreground">
          Navigation components for moving through paged data. Multiple styles and sizes available.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">

        {/* Default Pagination */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-6">
          <h2 className="text-lg font-semibold">Default Pagination</h2>
          <DemoPagination variant="default" />
        </div>

        {/* Outline Pagination */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-6">
          <h2 className="text-lg font-semibold">Outline Pagination</h2>
          <DemoPagination variant="outline" />
        </div>

        {/* Rounded Pagination */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-6">
          <h2 className="text-lg font-semibold">Rounded Pagination</h2>
          <DemoPagination variant="rounded" />
        </div>

        {/* Rounded Outline Pagination */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-6">
          <h2 className="text-lg font-semibold">Rounded Outline Pagination</h2>
          <DemoPagination variant="outline-rounded" />
        </div>

        {/* Soft Pagination */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-6">
          <h2 className="text-lg font-semibold">Soft Pagination</h2>
          <DemoPagination variant="soft" />
        </div>

        {/* Ghost (Text-only) Pagination */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-6">
          <h2 className="text-lg font-semibold">Ghost Pagination</h2>
          <DemoPagination variant="ghost" />
        </div>

        {/* Sizes */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-6">
          <h2 className="text-lg font-semibold">Pagination Sizes</h2>
          <DemoPagination variant="outline" size="sm" label="Small" />
          <DemoPagination variant="outline" size="default" label="Default" />
          <DemoPagination variant="outline" size="lg" label="Large" />
        </div>

        {/* With First/Last Buttons */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">With First & Last</h2>
          <p className="text-sm text-muted-foreground">Pagination with jump-to-first and jump-to-last navigation.</p>
          <Pagination>
            <PaginationFirst disabled={page1 === 1} variant="outline" onClick={() => setPage1(1)} />
            <PaginationPrev disabled={page1 === 1} variant="outline" onClick={() => setPage1((p) => Math.max(1, p - 1))} />
            {[1, 2, 3, "...", 8, 9, 10].map((p, i) =>
              p === "..." ? (
                <PaginationEllipsis key={`fl-ellipsis-${i}`} />
              ) : (
                <PaginationButton
                  key={`fl-${p}`}
                  isActive={p === page1}
                  variant="outline"
                  onClick={() => setPage1(p)}
                >
                  {p}
                </PaginationButton>
              )
            )}
            <PaginationNext disabled={page1 === 10} variant="outline" onClick={() => setPage1((p) => Math.min(10, p + 1))} />
            <PaginationLast disabled={page1 === 10} variant="outline" onClick={() => setPage1(10)} />
          </Pagination>
        </div>

        {/* Disabled State */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">Disabled State</h2>
          <p className="text-sm text-muted-foreground">Showing how the pagination looks on the first and last page.</p>
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">First page (prev disabled)</p>
            <Pagination>
              <PaginationPrev disabled variant="outline" />
              {[1, 2, 3, "...", 10].map((p, i) =>
                p === "..." ? <PaginationEllipsis key={`df-ellipsis-${i}`} /> : (
                  <PaginationButton key={`df-${p}`} isActive={p === 1} variant="outline">{p}</PaginationButton>
                )
              )}
              <PaginationNext variant="outline" />
            </Pagination>

            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mt-4">Last page (next disabled)</p>
            <Pagination>
              <PaginationPrev variant="outline" />
              {[1, "...", 8, 9, 10].map((p, i) =>
                p === "..." ? <PaginationEllipsis key={`dl-ellipsis-${i}`} /> : (
                  <PaginationButton key={`dl-${p}`} isActive={p === 10} variant="outline">{p}</PaginationButton>
                )
              )}
              <PaginationNext disabled variant="outline" />
            </Pagination>
          </div>
        </div>

      </div>
    </div>
  );
}

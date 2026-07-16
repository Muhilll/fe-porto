"use client";

import { useState, useRef, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef, SortingState, VisibilityState } from "@tanstack/react-table";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  SlidersHorizontal,
  Download,
} from "lucide-react";

/* ── Checkbox ── */
function Checkbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div
      onClick={onChange}
      className="relative size-4 rounded cursor-pointer shrink-0 flex items-center justify-center border-2 transition-colors"
      style={{
        backgroundColor: checked ? "#3b82f6" : "transparent",
        borderColor: checked ? "#3b82f6" : "var(--color-border)",
      }}
    >
      {checked && (
        <svg className="size-2.5" viewBox="0 0 12 10" fill="none">
          <path d="M1 5l3.5 3.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

/* ── Sort Icon ── */
function SortIcon({ column }: { column: any }) {
  if (!column.getCanSort()) return null;
  const sorted = column.getIsSorted();
  if (!sorted)
    return <ChevronsUpDown className="size-3 text-muted-foreground/40 ml-1" />;
  return sorted === "asc" ? (
    <ChevronUp className="size-3 text-primary ml-1" />
  ) : (
    <ChevronDown className="size-3 text-primary ml-1" />
  );
}

/* ── Props ── */
interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  searchPlaceholder?: string;
  /** Columns to exclude from the visibility toggle (e.g. "actions") */
  excludeFromToggle?: string[];
  /** Filename for CSV export (without extension) */
  exportFilename?: string;
  /** Whether the data is currently loading */
  isLoading?: boolean;
  /** Whether the export button is visible (defaults to true) */
  canExport?: boolean;
}

export function DataTable<TData>({
  data,
  columns,
  searchPlaceholder = "Cari...",
  excludeFromToggle = ["actions"],
  exportFilename = "export",
  isLoading = false,
  canExport = true,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [showColMenu, setShowColMenu] = useState(false);
  const colMenuRef = useRef<HTMLDivElement>(null);

  // Close column menu when clicking outside
  useEffect(() => {
    if (!showColMenu) return;
    const handleClick = (e: MouseEvent) => {
      if (colMenuRef.current && !colMenuRef.current.contains(e.target as Node)) {
        setShowColMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showColMenu]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, columnVisibility },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  /* ── Export to CSV ── */
  const handleExport = () => {
    const visibleColumns = table.getVisibleLeafColumns().filter((c) => c.id !== "actions" && c.id !== "select");
    const headerRow = visibleColumns.map((c) => {
      const header = c.columnDef.header;
      return typeof header === "string" ? header : c.id;
    });

    const rows = table.getFilteredRowModel().rows.map((row) =>
      visibleColumns.map((col) => {
        const cell = row.getValue(col.id);
        const val = cell === null || cell === undefined ? "" : String(cell);
        // Escape CSV values containing commas or quotes
        return val.includes(",") || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val;
      })
    );

    const csv = [headerRow.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${exportFilename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleableColumns = table
    .getAllLeafColumns()
    .filter((c) => !excludeFromToggle.includes(c.id) && c.id !== "select");

  return (
    <div className="overflow-hidden">
      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-border">
        {/* Search */}
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-3 py-2 text-sm text-foreground bg-card border border-border rounded-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Column Visibility */}
          <div className="relative" ref={colMenuRef}>
            <button
              onClick={() => setShowColMenu((p) => !p)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <SlidersHorizontal className="size-4" /> Columns
            </button>
            {showColMenu && (
              <div className="absolute right-0 top-10 z-20 bg-card border border-border rounded-xl shadow-lg p-3 space-y-1 min-w-[160px]">
                {toggleableColumns.map((col) => (
                  <div
                    key={col.id}
                    onClick={col.getToggleVisibilityHandler()}
                    className="flex items-center gap-2.5 text-sm cursor-pointer py-1 px-1 rounded hover:bg-muted transition-colors"
                  >
                    <Checkbox checked={col.getIsVisible()} onChange={() => {}} />
                    <span className="capitalize text-foreground">{col.id.replace(/_/g, " ")}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Export */}
          {canExport && (
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <Download className="size-4" /> Export
            </button>
          )}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/80 border-b border-border">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: header.getSize() }}
                    onClick={header.column.getToggleSortingHandler()}
                    className={`px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap ${
                      header.column.getCanSort()
                        ? "cursor-pointer hover:bg-muted select-none"
                        : ""
                    }`}
                  >
                    <div className="flex items-center">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <SortIcon column={header.column} />
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-sm text-muted-foreground">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="size-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <span>Memuat data...</span>
                  </div>
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-sm text-muted-foreground"
                >
                  {globalFilter ? (
                    <>
                      Tidak ada hasil untuk &quot;<strong>{globalFilter}</strong>&quot;
                    </>
                  ) : (
                    "Belum ada data."
                  )}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-muted/80 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination Footer ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-t border-border bg-muted/50">
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">
            Menampilkan{" "}
            <strong>
              {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
            </strong>{" "}
            –{" "}
            <strong>
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}
            </strong>{" "}
            dari <strong>{table.getFilteredRowModel().rows.length}</strong> data
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="text-xs border border-border rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-card"
          >
            {[5, 10, 20, 50].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="p-1.5 rounded-lg border border-border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronsLeft className="size-4" />
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-1.5 rounded-lg border border-border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="flex items-center gap-0.5">
            {Array.from({ length: Math.min(table.getPageCount(), 7) }, (_, i) => {
              const totalPages = table.getPageCount();
              const current = table.getState().pagination.pageIndex;
              let page: number;
              if (totalPages <= 7) page = i;
              else if (current < 4) page = i;
              else if (current > totalPages - 5) page = totalPages - 7 + i;
              else page = current - 3 + i;
              return (
                <button
                  key={page}
                  onClick={() => table.setPageIndex(page)}
                  className={`w-8 h-8 text-xs rounded-lg border transition-colors ${
                    page === current
                      ? "bg-primary text-white border-primary"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  {page + 1}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-1.5 rounded-lg border border-border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="size-4" />
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="p-1.5 rounded-lg border border-border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronsRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

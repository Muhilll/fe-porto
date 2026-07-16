"use client";

import { useState, useMemo } from "react";

/* Custom checkbox that is immune to --primary CSS variable issues */
function Checkbox({ checked, onChange, indeterminate = false }) {
  return (
    <div
      onClick={onChange}
      className="relative size-4 rounded cursor-pointer shrink-0 flex items-center justify-center border-2 transition-colors"
      style={{
        backgroundColor: checked ? "#3b82f6" : "white",
        borderColor: checked ? "#3b82f6" : "#d1d5db",
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

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  ChevronUp, ChevronDown, ChevronsUpDown, Search,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  ArrowUpDown, SlidersHorizontal, Download, Trash2, Edit, Eye,
} from "lucide-react";

/* ── Data ── */
function genData(count) {
  const names = ["Alex Johnson","Jane Doe","Bob Smith","Sara Connor","Mike Chen","Emily Davis","Tom Brown","Lisa Wang","Chris Lee","Amy Park","David Kim","Rachel Green","James White","Mia Black","Noah Hill"];
  const roles = ["Admin","Editor","Viewer","Manager","Developer"];
  const statuses = ["Active","Inactive","Pending"];
  const depts = ["Engineering","Design","Marketing","Sales","Support","HR","Finance"];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length] + (i >= names.length ? ` ${Math.floor(i / names.length) + 1}` : ""),
    email: names[i % names.length].toLowerCase().replace(" ", ".") + (i >= names.length ? i : "") + "@company.com",
    role: roles[i % roles.length],
    status: statuses[i % 3],
    dept: depts[i % depts.length],
    salary: Math.floor(Math.random() * 80000 + 40000),
    joined: new Date(2023, (i * 2) % 12, (i * 7 % 28) + 1).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  }));
}

const DATA = genData(50);

const statusColors = {
  Active:   "bg-green-100 text-green-700",
  Inactive: "bg-muted  text-muted-foreground",
  Pending:  "bg-yellow-100 text-yellow-700",
};

const roleColors = {
  Admin:     "bg-blue-100   text-blue-700",
  Editor:    "bg-purple-100 text-purple-700",
  Viewer:    "bg-muted   text-muted-foreground",
  Manager:   "bg-orange-100 text-orange-700",
  Developer: "bg-cyan-100   text-cyan-700",
};

function Badge({ label, colorMap }) {
  const cls = (colorMap || {})[label] || "bg-muted text-muted-foreground";
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${cls}`}>{label}</span>;
}

/* ── Columns ── */
const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    enableSorting: false,
    size: 40,
  },
  {
    accessorKey: "id",
    header: "#",
    cell: info => <span className="font-mono text-muted-foreground text-xs">{String(info.getValue()).padStart(3, "0")}</span>,
    size: 55,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: info => (
      <div className="flex items-center gap-2.5">
        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${info.getValue()}&backgroundColor=b6e3f4`} className="size-7 rounded-full bg-muted shrink-0" alt="" />
        <div className="min-w-0">
          <p className="font-medium text-foreground truncate">{info.getValue()}</p>
          <p className="text-xs text-muted-foreground truncate">{info.row.original.email}</p>
        </div>
      </div>
    ),
    size: 220,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: info => <Badge label={info.getValue()} colorMap={roleColors} />,
    size: 110,
  },
  {
    accessorKey: "dept",
    header: "Department",
    size: 130,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: info => <Badge label={info.getValue()} colorMap={statusColors} />,
    size: 100,
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: info => <span className="font-semibold">${info.getValue().toLocaleString()}</span>,
    size: 110,
  },
  {
    accessorKey: "joined",
    header: "Joined",
    cell: info => <span className="text-muted-foreground whitespace-nowrap">{info.getValue()}</span>,
    size: 130,
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex items-center gap-1">
        <button className="p-1.5 rounded-md hover:bg-blue-50 text-muted-foreground hover:text-blue-600 transition-colors"><Eye className="size-3.5" /></button>
        <button className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"><Edit className="size-3.5" /></button>
        <button className="p-1.5 rounded-md hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors"><Trash2 className="size-3.5" /></button>
      </div>
    ),
    enableSorting: false,
    size: 100,
  },
];

function SortIcon({ column }) {
  if (!column.getCanSort()) return null;
  const sorted = column.getIsSorted();
  if (!sorted) return <ChevronsUpDown className="size-3 text-muted-foreground/40 ml-1" />;
  return sorted === "asc"
    ? <ChevronUp className="size-3 text-primary ml-1" />
    : <ChevronDown className="size-3 text-primary ml-1" />;
}

export default function DatatablePage() {
  const [sorting, setSorting]       = useState([]);
  const [rowSelection, setRowSel]   = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColVis] = useState({});
  const [showColMenu, setShowColMenu] = useState(false);

  const table = useReactTable({
    data: DATA,
    columns,
    state: { sorting, rowSelection, globalFilter, columnVisibility },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSel,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColVis,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div className="w-full space-y-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Datatable</h1>
        <p className="text-muted-foreground">
          Advanced data table powered by <strong>TanStack Table v8</strong> — with sorting, global search, pagination, row selection, and column visibility.
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {/* Search */}
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                value={globalFilter}
                onChange={e => setGlobalFilter(e.target.value)}
                placeholder="Search all columns…"
                className="w-full pl-9 pr-3 py-2 text-sm text-foreground bg-card border border-border rounded-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            {/* Selected count */}
            {selectedCount > 0 && (
              <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1.5 rounded-lg font-medium">
                {selectedCount} selected
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {/* Column Visibility */}
            <div className="relative">
              <button
                onClick={() => setShowColMenu(p => !p)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <SlidersHorizontal className="size-4" /> Columns
              </button>
              {showColMenu && (
                <div className="absolute right-0 top-10 z-20 bg-card border border-border rounded-xl shadow-lg p-3 space-y-1 min-w-[160px]">
                  {table.getAllLeafColumns().filter(c => c.id !== "select" && c.id !== "actions").map(col => (
                    <div
                      key={col.id}
                      onClick={col.getToggleVisibilityHandler()}
                      className="flex items-center gap-2.5 text-sm cursor-pointer py-1 px-1 rounded hover:bg-muted transition-colors"
                    >
                      <Checkbox checked={col.getIsVisible()} onChange={() => {}} />
                      <span className="capitalize text-foreground">{col.id}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Export */}
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors">
              <Download className="size-4" /> Export
            </button>
            {/* Delete selected */}
            {selectedCount > 0 && (
              <button onClick={() => setRowSel({})} className="flex items-center gap-1.5 px-3 py-2 text-sm bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                <Trash2 className="size-4" /> Delete ({selectedCount})
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/80 border-b border-border">
              {table.getHeaderGroups().map(hg => (
                <tr key={hg.id}>
                  {hg.headers.map(header => (
                    <th
                      key={header.id}
                      style={{ width: header.getSize() }}
                      onClick={header.column.getToggleSortingHandler()}
                      className={`px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap ${header.column.getCanSort() ? "cursor-pointer hover:bg-muted select-none" : ""}`}
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
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-12 text-center text-sm text-muted-foreground">
                    No results found for "<strong>{globalFilter}</strong>"
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map(row => (
                  <tr
                    key={row.id}
                    className={`hover:bg-muted/80 transition-colors ${row.getIsSelected() ? "bg-blue-50/50" : ""}`}
                  >
                    {row.getVisibleCells().map(cell => (
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

        {/* Footer / Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-t border-border bg-muted/50">
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              Showing{" "}
              <strong>{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</strong>
              {" "}–{" "}
              <strong>{Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)}</strong>
              {" "}of{" "}
              <strong>{table.getFilteredRowModel().rows.length}</strong> rows
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={e => table.setPageSize(Number(e.target.value))}
              className="text-xs border border-border rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-card"
            >
              {[5, 10, 20, 50].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}
              className="p-1.5 rounded-lg border border-border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <ChevronsLeft className="size-4" />
            </button>
            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}
              className="p-1.5 rounded-lg border border-border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <ChevronLeft className="size-4" />
            </button>

            {/* Page numbers */}
            <div className="flex items-center gap-0.5">
              {Array.from({ length: Math.min(table.getPageCount(), 7) }, (_, i) => {
                const totalPages = table.getPageCount();
                const current = table.getState().pagination.pageIndex;
                let page;
                if (totalPages <= 7) page = i;
                else if (current < 4) page = i;
                else if (current > totalPages - 5) page = totalPages - 7 + i;
                else page = current - 3 + i;
                return (
                  <button key={page} onClick={() => table.setPageIndex(page)}
                    className={`w-8 h-8 text-xs rounded-lg border transition-colors ${page === current ? "bg-primary text-white border-primary" : "border-border hover:bg-muted"}`}>
                    {page + 1}
                  </button>
                );
              })}
            </div>

            <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}
              className="p-1.5 rounded-lg border border-border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <ChevronRight className="size-4" />
            </button>
            <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}
              className="p-1.5 rounded-lg border border-border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <ChevronsRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Feature Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          ["50 Rows", "Paginated 5/10/20/50 per page"],
          ["Sort", "Click any column header"],
          ["Search", "Global filter across all columns"],
          ["Select", "Checkbox multi-row selection"],
        ].map(([title, desc]) => (
          <div key={title} className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm font-semibold">{title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

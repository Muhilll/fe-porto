"use client";

import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  GripVertical, GripHorizontal, Trash2, Plus,
  Image, FileText, Music, Video, Archive,
  CheckCircle2, Clock, AlertCircle, User,
} from "lucide-react";

/* ─── helpers ─────────────────────────────────────── */
function uid() {
  return Math.random().toString(36).slice(2);
}

/* ═══════════════════════════════════════════════════
   1. Sortable List (vertical)
═══════════════════════════════════════════════════ */
const INITIAL_LIST = [
  { id: uid(), label: "Design system overhaul", priority: "high" },
  { id: uid(), label: "Implement dark mode", priority: "medium" },
  { id: uid(), label: "Write unit tests", priority: "low" },
  { id: uid(), label: "Set up CI/CD pipeline", priority: "high" },
  { id: uid(), label: "Update documentation", priority: "low" },
];

const priorityClr = { high: "bg-red-100 text-red-700", medium: "bg-yellow-100 text-yellow-700", low: "bg-green-100 text-green-700" };

function SortableList() {
  const [items, setItems] = useState(INITIAL_LIST);
  const dragIndex = useRef(null);
  const overIndex  = useRef(null);

  const onDragStart = (i) => { dragIndex.current = i; };
  const onDragOver  = (e, i) => { e.preventDefault(); overIndex.current = i; };
  const onDrop      = () => {
    if (dragIndex.current === null || overIndex.current === null) return;
    const next = [...items];
    const [moved] = next.splice(dragIndex.current, 1);
    next.splice(overIndex.current, 0, moved);
    setItems(next);
    dragIndex.current = null;
    overIndex.current = null;
  };

  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li
          key={item.id}
          draggable
          onDragStart={() => onDragStart(i)}
          onDragOver={(e) => onDragOver(e, i)}
          onDrop={onDrop}
          className="flex items-center gap-3 px-4 py-3 border border-border rounded-xl bg-card hover:shadow-sm transition-shadow cursor-grab active:cursor-grabbing active:opacity-60 active:scale-[0.98]"
        >
          <GripVertical className="size-4 text-muted-foreground shrink-0" />
          <span className="flex-1 text-sm font-medium">{item.label}</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${priorityClr[item.priority]}`}>{item.priority}</span>
        </li>
      ))}
    </ul>
  );
}

/* ═══════════════════════════════════════════════════
   2. Kanban Board
═══════════════════════════════════════════════════ */
const KANBAN_INIT = {
  todo: [
    { id: uid(), title: "Research competitors", tag: "Research", color: "bg-purple-100 text-purple-700" },
    { id: uid(), title: "Write project brief", tag: "Docs", color: "bg-blue-100 text-blue-700" },
    { id: uid(), title: "User interviews", tag: "UX", color: "bg-pink-100 text-pink-700" },
  ],
  inProgress: [
    { id: uid(), title: "Wireframe homepage", tag: "Design", color: "bg-blue-100 text-blue-700" },
    { id: uid(), title: "API integration", tag: "Dev", color: "bg-green-100 text-green-700" },
  ],
  done: [
    { id: uid(), title: "Project kickoff", tag: "Planning", color: "bg-muted text-foreground" },
    { id: uid(), title: "Set up repo", tag: "Dev", color: "bg-green-100 text-green-700" },
  ],
};

const colMeta = {
  todo:       { label: "To Do",       icon: AlertCircle,   dot: "bg-gray-400" },
  inProgress: { label: "In Progress", icon: Clock,         dot: "bg-yellow-400" },
  done:       { label: "Done",        icon: CheckCircle2,  dot: "bg-green-500" },
};

function KanbanBoard() {
  const [cols, setCols] = useState(KANBAN_INIT);
  const dragging = useRef({ colId: null, cardId: null });

  const onDragStart = (colId, cardId) => { dragging.current = { colId, cardId }; };

  const onDrop = (targetColId) => {
    const { colId: srcCol, cardId } = dragging.current;
    if (!srcCol || srcCol === targetColId) return;
    const card = cols[srcCol].find((c) => c.id === cardId);
    if (!card) return;
    setCols((prev) => ({
      ...prev,
      [srcCol]: prev[srcCol].filter((c) => c.id !== cardId),
      [targetColId]: [...prev[targetColId], card],
    }));
    dragging.current = { colId: null, cardId: null };
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {Object.entries(cols).map(([colId, cards]) => {
        const meta = colMeta[colId];
        const Icon = meta.icon;
        return (
          <div
            key={colId}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(colId)}
            className="flex flex-col gap-2 bg-muted rounded-xl p-3 min-h-[200px] border border-border"
          >
            {/* Column Header */}
            <div className="flex items-center gap-2 mb-1">
              <span className={`size-2 rounded-full ${meta.dot}`} />
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{meta.label}</span>
              <span className="ml-auto text-xs font-bold text-muted-foreground">{cards.length}</span>
            </div>
            {/* Cards */}
            {cards.map((card) => (
              <div
                key={card.id}
                draggable
                onDragStart={() => onDragStart(colId, card.id)}
                className="bg-card border border-border rounded-lg p-3 cursor-grab active:cursor-grabbing active:opacity-60 active:scale-[0.98] transition-all hover:shadow-sm"
              >
                <p className="text-xs font-medium text-foreground mb-1.5">{card.title}</p>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${card.color}`}>{card.tag}</span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   3. File Drop Zone
═══════════════════════════════════════════════════ */
const fileIcons = { image: Image, audio: Music, video: Video, application: Archive, text: FileText };

function FileDropZone() {
  const [files, setFiles] = useState([]);
  const [over, setOver] = useState(false);

  const addFiles = (fileList) => {
    const newFiles = Array.from(fileList).map((f) => ({
      id: uid(),
      name: f.name,
      size: (f.size / 1024).toFixed(1) + " KB",
      type: f.type.split("/")[0],
    }));
    setFiles((p) => [...p, ...newFiles]);
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); addFiles(e.dataTransfer.files); }}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer",
          over ? "border-primary bg-blue-50" : "border-border hover:border-primary/50 hover:bg-muted"
        )}
        onClick={() => document.getElementById("file-input").click()}
      >
        <input id="file-input" type="file" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
        <div className={cn("mx-auto size-12 rounded-full flex items-center justify-center mb-3", over ? "bg-blue-100" : "bg-muted")}>
          <Plus className={cn("size-6", over ? "text-primary" : "text-muted-foreground")} />
        </div>
        <p className="text-sm font-medium">{over ? "Drop files here" : "Drag & drop files here"}</p>
        <p className="text-xs text-muted-foreground mt-1">or <span className="text-primary">browse</span> to choose files</p>
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((f) => {
            const Icon = fileIcons[f.type] || FileText;
            return (
              <li key={f.id} className="flex items-center gap-3 px-3 py-2.5 border border-border rounded-lg bg-muted">
                <Icon className="size-4 text-muted-foreground shrink-0" />
                <span className="flex-1 text-sm truncate">{f.name}</span>
                <span className="text-xs text-muted-foreground">{f.size}</span>
                <button onClick={() => setFiles((p) => p.filter((x) => x.id !== f.id))} className="p-1 hover:text-red-600 text-muted-foreground transition-colors">
                  <Trash2 className="size-3.5" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   4. Sortable columns (horizontal)
═══════════════════════════════════════════════════ */
const COLS_INIT = [
  { id: uid(), label: "Name",   key: "name" },
  { id: uid(), label: "Email",  key: "email" },
  { id: uid(), label: "Role",   key: "role" },
  { id: uid(), label: "Status", key: "status" },
  { id: uid(), label: "Joined", key: "joined" },
];

const COL_DATA = [
  { name: "Alex Johnson", email: "alex@example.com", role: "Admin",    status: "Active",   joined: "Jan 2024" },
  { name: "Jane Doe",     email: "jane@example.com", role: "Editor",   status: "Active",   joined: "Feb 2024" },
  { name: "Bob Smith",    email: "bob@example.com",  role: "Viewer",   status: "Inactive", joined: "Mar 2024" },
];

function SortableColumns() {
  const [cols, setCols] = useState(COLS_INIT);
  const dragIdx = useRef(null);

  const onDragStart = (i) => { dragIdx.current = i; };
  const onDrop      = (i) => {
    if (dragIdx.current === null || dragIdx.current === i) return;
    const next = [...cols];
    const [c] = next.splice(dragIdx.current, 1);
    next.splice(i, 0, c);
    setCols(next);
    dragIdx.current = null;
  };

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted border-b border-border">
          <tr>
            {cols.map((col, i) => (
              <th
                key={col.id}
                draggable
                onDragStart={() => onDragStart(i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(i)}
                className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide cursor-grab active:cursor-grabbing select-none"
              >
                <div className="flex items-center gap-1.5">
                  <GripHorizontal className="size-3 text-muted-foreground/50" />
                  {col.label}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {COL_DATA.map((row, ri) => (
            <tr key={ri} className="hover:bg-muted">
              {cols.map((col) => (
                <td key={col.key} className="px-4 py-2.5 text-foreground">
                  {col.key === "status" ? (
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${row.status === "Active" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                      {row[col.key]}
                    </span>
                  ) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-4 py-2 text-xs text-muted-foreground bg-muted border-t border-border">
        ↔ Drag column headers to reorder
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Page
═══════════════════════════════════════════════════ */
function DemoCard({ title, description, children, span2 = false }) {
  return (
    <div className={`p-6 bg-card border border-border rounded-xl shadow-sm ${span2 ? "lg:col-span-2" : ""}`}>
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}
      {children}
    </div>
  );
}

export default function DragDropPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Drag & Drop</h1>
        <p className="text-muted-foreground">
          Native HTML5 drag-and-drop interactions — sortable lists, kanban boards, file drop zones, and reorderable columns.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <DemoCard title="Sortable List" description="Drag items by the grip handle to reorder them.">
          <SortableList />
        </DemoCard>

        <DemoCard title="File Drop Zone" description="Drag files from your desktop or click to browse.">
          <FileDropZone />
        </DemoCard>

        <DemoCard span2 title="Kanban Board" description="Drag cards between columns to change their status.">
          <KanbanBoard />
        </DemoCard>

        <DemoCard span2 title="Reorderable Table Columns" description="Drag column headers to change their order.">
          <SortableColumns />
        </DemoCard>

      </div>
    </div>
  );
}

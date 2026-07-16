"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

/* ── Sample data ── */
const users = [
  { id: 1,  name: "Alex Johnson",   email: "alex@example.com",   role: "Admin",   status: "Active",   joined: "Jan 12, 2024",  sales: 12400 },
  { id: 2,  name: "Jane Doe",       email: "jane@example.com",   role: "Editor",  status: "Active",   joined: "Feb 3, 2024",   sales: 8750  },
  { id: 3,  name: "Bob Smith",      email: "bob@example.com",    role: "Viewer",  status: "Inactive", joined: "Mar 22, 2024",  sales: 3200  },
  { id: 4,  name: "Sara Connor",    email: "sara@example.com",   role: "Editor",  status: "Active",   joined: "Apr 7, 2024",   sales: 9820  },
  { id: 5,  name: "Mike Chen",      email: "mike@example.com",   role: "Admin",   status: "Active",   joined: "Apr 18, 2024",  sales: 15600 },
  { id: 6,  name: "Emily Davis",    email: "emily@example.com",  role: "Viewer",  status: "Pending",  joined: "May 1, 2024",   sales: 0     },
];

const orders = [
  { id: "#ORD-0012", customer: "Alex Johnson",  product: "Wireless Headphones", qty: 2, price: 59.99, total: 119.98, status: "Delivered" },
  { id: "#ORD-0013", customer: "Jane Doe",       product: "Mechanical Keyboard",  qty: 1, price: 79.99, total: 79.99,  status: "Shipped"   },
  { id: "#ORD-0014", customer: "Bob Smith",      product: "USB-C Hub 7-in-1",     qty: 3, price: 29.99, total: 89.97,  status: "Pending"   },
  { id: "#ORD-0015", customer: "Sara Connor",    product: "4K Webcam",            qty: 1, price: 89.99, total: 89.99,  status: "Processing"},
  { id: "#ORD-0016", customer: "Mike Chen",      product: "Laptop Stand",         qty: 2, price: 45.00, total: 90.00,  status: "Delivered" },
  { id: "#ORD-0017", customer: "Emily Davis",    product: "Desk Lamp LED",        qty: 1, price: 34.99, total: 34.99,  status: "Cancelled" },
];

const statusColors = {
  Active:     "bg-green-100 text-green-700",
  Inactive:   "bg-muted  text-muted-foreground",
  Pending:    "bg-yellow-100 text-yellow-700",
  Delivered:  "bg-green-100 text-green-700",
  Shipped:    "bg-blue-100  text-blue-700",
  Processing: "bg-purple-100 text-purple-700",
  Cancelled:  "bg-red-100   text-red-700",
};

const roleColors = {
  Admin:  "bg-blue-100  text-blue-700",
  Editor: "bg-purple-100 text-purple-700",
  Viewer: "bg-muted  text-muted-foreground",
};

function Badge({ label }) {
  const cls = statusColors[label] || roleColors[label] || "bg-muted text-muted-foreground";
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${cls}`}>{label}</span>;
}

function Th({ children, className = "" }) {
  return <th className={`px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide ${className}`}>{children}</th>;
}

function Td({ children, className = "" }) {
  return <td className={`px-4 py-3 text-sm ${className}`}>{children}</td>;
}

function Section({ title, description, children, span2 = false }) {
  return (
    <div className={`bg-card border border-border rounded-xl shadow-sm overflow-hidden ${span2 ? "lg:col-span-2" : ""}`}>
      <div className="px-6 py-4 border-b border-border">
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  );
}

/* ── Sortable basic table ── */
function SortableTable() {
  const [sortKey, setSortKey] = useState("id");
  const [sortDir, setSortDir] = useState("asc");

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const sorted = [...users].sort((a, b) => {
    const va = a[sortKey], vb = b[sortKey];
    const cmp = typeof va === "number" ? va - vb : String(va).localeCompare(String(vb));
    return sortDir === "asc" ? cmp : -cmp;
  });

  const SortIcon = ({ k }) => {
    if (sortKey !== k) return <ChevronsUpDown className="size-3.5 text-muted-foreground/40" />;
    return sortDir === "asc" ? <ChevronUp className="size-3.5 text-primary" /> : <ChevronDown className="size-3.5 text-primary" />;
  };

  const SortTh = ({ k, children }) => (
    <th onClick={() => toggleSort(k)} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide cursor-pointer select-none hover:bg-muted transition-colors">
      <div className="flex items-center gap-1">{children}<SortIcon k={k} /></div>
    </th>
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-muted border-b border-border">
          <tr>
            <SortTh k="id">#</SortTh>
            <SortTh k="name">Name</SortTh>
            <SortTh k="role">Role</SortTh>
            <SortTh k="status">Status</SortTh>
            <SortTh k="joined">Joined</SortTh>
            <SortTh k="sales">Sales</SortTh>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {sorted.map(u => (
            <tr key={u.id} className="hover:bg-muted transition-colors">
              <Td className="font-mono text-muted-foreground">{u.id.toString().padStart(3, "0")}</Td>
              <Td>
                <div className="flex items-center gap-2.5">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}&backgroundColor=b6e3f4`} className="size-7 rounded-full bg-muted" alt={u.name} />
                  <div>
                    <p className="font-medium text-foreground">{u.name}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </div>
                </div>
              </Td>
              <Td><Badge label={u.role} /></Td>
              <Td><Badge label={u.status} /></Td>
              <Td className="text-muted-foreground">{u.joined}</Td>
              <Td className="font-semibold">${u.sales.toLocaleString()}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function BasicTablesPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Basic Tables</h1>
        <p className="text-muted-foreground">Standard HTML tables with various styles — striped, bordered, hover, compact, and sortable.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Simple table */}
        <Section title="Simple Table" description="Clean minimal table with header and rows.">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr><Th>Name</Th><Th>Role</Th><Th>Status</Th><Th>Joined</Th></tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-muted">
                    <Td className="font-medium">{u.name}</Td>
                    <Td><Badge label={u.role} /></Td>
                    <Td><Badge label={u.status} /></Td>
                    <Td className="text-muted-foreground">{u.joined}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Striped table */}
        <Section title="Striped Rows" description="Alternating row backgrounds for readability.">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr><Th>Name</Th><Th>Email</Th><Th>Role</Th></tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u.id} className={i % 2 === 0 ? "bg-card" : "bg-muted/60"}>
                    <Td className="font-medium">{u.name}</Td>
                    <Td className="text-muted-foreground">{u.email}</Td>
                    <Td><Badge label={u.role} /></Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Bordered */}
        <Section title="Bordered Table" description="Full borders on all cells.">
          <div className="overflow-x-auto p-4">
            <table className="w-full border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted">
                  {["#", "Name", "Role", "Status"].map(h => (
                    <th key={h} className="border border-border px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u.id}>
                    <td className="border border-border px-3 py-2.5 text-sm text-muted-foreground">{i + 1}</td>
                    <td className="border border-border px-3 py-2.5 text-sm font-medium">{u.name}</td>
                    <td className="border border-border px-3 py-2.5 text-sm"><Badge label={u.role} /></td>
                    <td className="border border-border px-3 py-2.5 text-sm"><Badge label={u.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Compact */}
        <Section title="Compact / Dense Table" description="Reduced padding for information-dense layouts.">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-muted border-b border-border">
                <tr>
                  {["Order", "Customer", "Product", "Total", "Status"].map(h => (
                    <th key={h} className="px-3 py-2 text-left font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-muted">
                    <td className="px-3 py-1.5 font-mono text-muted-foreground">{o.id}</td>
                    <td className="px-3 py-1.5 font-medium">{o.customer}</td>
                    <td className="px-3 py-1.5 text-muted-foreground">{o.product}</td>
                    <td className="px-3 py-1.5 font-semibold">${o.total.toFixed(2)}</td>
                    <td className="px-3 py-1.5"><Badge label={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Sortable */}
        <Section span2 title="Sortable Table" description="Click column headers to sort ascending/descending.">
          <SortableTable />
        </Section>

        {/* Colored header */}
        <Section title="Colored Header" description="Table with a branded header background.">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary text-white">
                <tr>
                  {["Order ID", "Product", "Qty", "Status"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide opacity-90">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-blue-50 transition-colors">
                    <Td className="font-mono text-muted-foreground">{o.id}</Td>
                    <Td className="font-medium">{o.product}</Td>
                    <Td>{o.qty}</Td>
                    <Td><Badge label={o.status} /></Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* With footer */}
        <Section title="Table with Footer" description="Summary row in the table footer.">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr><Th>Order</Th><Th>Product</Th><Th>Qty</Th><Th>Price</Th><Th>Total</Th></tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-muted">
                    <Td className="font-mono text-muted-foreground">{o.id}</Td>
                    <Td className="font-medium">{o.product}</Td>
                    <Td>{o.qty}</Td>
                    <Td>${o.price.toFixed(2)}</Td>
                    <Td className="font-semibold">${o.total.toFixed(2)}</Td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-muted border-t-2 border-border">
                <tr>
                  <td colSpan={4} className="px-4 py-3 text-sm font-semibold text-right">Grand Total</td>
                  <td className="px-4 py-3 text-sm font-bold text-primary">
                    ${orders.reduce((s, o) => s + o.total, 0).toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Section>

      </div>
    </div>
  );
}

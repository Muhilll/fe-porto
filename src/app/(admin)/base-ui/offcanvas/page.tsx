"use client";

import { useState } from "react";
import { Offcanvas } from "@/components/ui/offcanvas";
import { Button } from "@/components/ui/button";
import {
  Home, LayoutDashboard, Users, Settings, Bell, FileText,
  ShoppingCart, BarChart2, LogOut, ChevronRight, Search, User,
  Mail, Phone, MapPin, Star, Package,
} from "lucide-react";

function TriggerBtn({ label, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 ${className}`}
    >
      {label}
    </button>
  );
}

function DemoCard({ title, description, children, span2 = false }) {
  return (
    <div className={`p-6 bg-card border border-border rounded-xl shadow-sm ${span2 ? "lg:col-span-2" : ""}`}>
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}
      {children}
    </div>
  );
}

const navLinks = [
  { icon: Home, label: "Dashboard" },
  { icon: LayoutDashboard, label: "Overview" },
  { icon: Users, label: "Users" },
  { icon: ShoppingCart, label: "Orders" },
  { icon: Package, label: "Products" },
  { icon: BarChart2, label: "Analytics" },
  { icon: FileText, label: "Reports" },
  { icon: Bell, label: "Notifications" },
  { icon: Settings, label: "Settings" },
];

export default function OffcanvasPage() {
  const [open, setOpen] = useState({});
  const toggle = (key) => setOpen((p) => ({ ...p, [key]: !p[key] }));
  const close  = (key) => setOpen((p) => ({ ...p, [key]: false }));

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Offcanvas</h1>
        <p className="text-muted-foreground">
          Slide-in panel components that overlay the page from any direction — great for navigation drawers, filters, and detail panels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Placement */}
        <DemoCard title="Placement Variants" description="Offcanvas can slide in from left, right, top, or bottom.">
          <div className="flex flex-wrap gap-2">
            {["left", "right", "top", "bottom"].map((placement) => (
              <div key={placement}>
                <TriggerBtn label={`From ${placement}`} onClick={() => toggle(`placement-${placement}`)} />
                <Offcanvas
                  open={!!open[`placement-${placement}`]}
                  onClose={() => close(`placement-${placement}`)}
                  placement={placement}
                  title={`${placement.charAt(0).toUpperCase() + placement.slice(1)} Offcanvas`}
                >
                  <p className="text-sm text-muted-foreground">
                    This panel slides in from the <strong>{placement}</strong>. Click outside or press <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border border-border">Esc</kbd> to close.
                  </p>
                </Offcanvas>
              </div>
            ))}
          </div>
        </DemoCard>

        {/* Navigation Drawer */}
        <DemoCard title="Navigation Drawer" description="A typical mobile navigation drawer from the left side.">
          <TriggerBtn label="Open Nav Drawer" onClick={() => toggle("nav")} />
          <Offcanvas
            open={!!open["nav"]}
            onClose={() => close("nav")}
            placement="left"
            title={false}
            className="w-72"
          >
            {/* Logo */}
            <div className="flex items-center gap-2 px-1 pb-5 border-b border-border mb-4">
              <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
                <LayoutDashboard className="size-4 text-white" />
              </div>
              <span className="font-bold text-base">AdminPanel</span>
              <button onClick={() => close("nav")} className="ml-auto p-1.5 rounded-md hover:bg-muted text-muted-foreground">
                <ChevronRight className="size-4" />
              </button>
            </div>
            <nav className="space-y-0.5">
              {navLinks.map(({ icon: Icon, label }, i) => (
                <a
                  key={label}
                  href="#"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    i === 0 ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4 shrink-0" />
                  {label}
                </a>
              ))}
            </nav>
            <div className="mt-6 pt-4 border-t border-border">
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors">
                <LogOut className="size-4" /> Sign Out
              </a>
            </div>
          </Offcanvas>
        </DemoCard>

        {/* Filter Panel */}
        <DemoCard title="Filter / Search Panel" description="Right-side panel for filtering table data.">
          <TriggerBtn label="Open Filters" onClick={() => toggle("filter")} />
          <Offcanvas
            open={!!open["filter"]}
            onClose={() => close("filter")}
            placement="right"
            title="Filter Results"
            footer={
              <>
                <Button variant="outline" size="sm" onClick={() => close("filter")}>Clear All</Button>
                <Button size="sm" onClick={() => close("filter")}>Apply Filters</Button>
              </>
            }
          >
            <div className="space-y-5">
              {/* Search */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input type="text" placeholder="Search..." className="w-full border border-border rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              </div>
              {/* Status */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                {["All", "Active", "Inactive", "Pending", "Archived"].map((s) => (
                  <label key={s} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" defaultChecked={s === "All"} className="rounded border-border accent-primary" />
                    {s}
                  </label>
                ))}
              </div>
              {/* Date range */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Date Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" className="border border-border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  <input type="date" className="border border-border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
              {/* Rating */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Minimum Rating</label>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((r) => (
                    <button key={r} className="p-1 hover:scale-110 transition-transform">
                      <Star className={`size-5 ${r <= 3 ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Offcanvas>
        </DemoCard>

        {/* User Detail Panel */}
        <DemoCard title="Detail / Preview Panel" description="Right-side panel showing details of a selected item.">
          <TriggerBtn label="View User Profile" onClick={() => toggle("profile")} />
          <Offcanvas
            open={!!open["profile"]}
            onClose={() => close("profile")}
            placement="right"
            title="User Profile"
            footer={
              <>
                <Button variant="outline" size="sm" onClick={() => close("profile")}>Close</Button>
                <Button size="sm">Edit Profile</Button>
              </>
            }
          >
            <div className="space-y-5">
              {/* Avatar section */}
              <div className="flex flex-col items-center gap-2 py-2">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4" className="size-20 rounded-full bg-muted" alt="Alex" />
                <div className="text-center">
                  <p className="font-semibold text-base">Alex Johnson</p>
                  <p className="text-sm text-muted-foreground">Senior UI Designer</p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700 mt-1">● Online</span>
                </div>
              </div>
              {/* Info */}
              <div className="space-y-3 border-t border-border pt-4">
                {[
                  { icon: Mail, label: "alex.j@example.com" },
                  { icon: Phone, label: "+1 (555) 123-4567" },
                  { icon: MapPin, label: "San Francisco, CA" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Icon className="size-4 shrink-0" /> {label}
                  </div>
                ))}
              </div>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 border-t border-border pt-4">
                {[["124", "Posts"], ["5.2k", "Followers"], ["312", "Following"]].map(([val, lbl]) => (
                  <div key={lbl} className="text-center">
                    <p className="text-base font-bold">{val}</p>
                    <p className="text-xs text-muted-foreground">{lbl}</p>
                  </div>
                ))}
              </div>
            </div>
          </Offcanvas>
        </DemoCard>

        {/* No Backdrop */}
        <DemoCard title="Without Backdrop" description="Offcanvas without the dimming overlay — content remains fully accessible.">
          <TriggerBtn label="Open (No Backdrop)" onClick={() => toggle("no-backdrop")} className="bg-gray-800 hover:bg-gray-900" />
          <Offcanvas
            open={!!open["no-backdrop"]}
            onClose={() => close("no-backdrop")}
            placement="right"
            title="No Backdrop Panel"
            showBackdrop={false}
            className="shadow-xl border-l border-border"
          >
            <p className="text-sm text-muted-foreground">
              This offcanvas has no backdrop. The rest of the page content remains fully visible and interactive while this panel is open.
            </p>
            <div className="mt-4 p-3 bg-muted rounded-lg border border-border">
              <p className="text-xs text-muted-foreground">Press <kbd className="px-1.5 py-0.5 text-xs bg-card rounded border border-border">Esc</kbd> or click the × button to close.</p>
            </div>
          </Offcanvas>
        </DemoCard>

        {/* Shopping Cart */}
        <DemoCard title="Shopping Cart Drawer" description="Common e-commerce cart drawer from the right.">
          <TriggerBtn label="Open Cart" onClick={() => toggle("cart")} />
          <Offcanvas
            open={!!open["cart"]}
            onClose={() => close("cart")}
            placement="right"
            title="Shopping Cart (3 items)"
            footer={
              <>
                <div className="w-full">
                  <div className="flex justify-between text-sm font-semibold mb-3">
                    <span>Total</span><span>$149.97</span>
                  </div>
                  <Button className="w-full" onClick={() => close("cart")}>Checkout →</Button>
                </div>
              </>
            }
          >
            <div className="space-y-4">
              {[
                { name: "Wireless Headphones", price: "$59.99", qty: 1 },
                { name: "Mechanical Keyboard", price: "$79.99", qty: 1 },
                { name: "USB-C Hub", price: "$29.99", qty: 1 },
              ].map(({ name, price, qty }) => (
                <div key={name} className="flex items-center gap-3 pb-4 border-b border-border last:border-0">
                  <div className="size-12 rounded-lg bg-muted shrink-0 flex items-center justify-center">
                    <ShoppingCart className="size-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {qty}</p>
                  </div>
                  <p className="text-sm font-semibold shrink-0">{price}</p>
                </div>
              ))}
            </div>
          </Offcanvas>
        </DemoCard>

      </div>
    </div>
  );
}

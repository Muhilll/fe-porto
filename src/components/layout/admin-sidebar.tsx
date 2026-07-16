"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import React from "react";
import {
  Box,
  LayoutDashboard,
  FileText,
  Lock,
  AlertTriangle,
  Layers,
  Smile,
  BarChart,
  ListTodo,
  TableProperties,
  ChevronsUpDown,
  LifeBuoy,
  LogOut,
  Hexagon,
  FileKey,
  ChevronDown,
  Calendar,
  Database,
  Settings,
  Users,
  Shield,
  Menu as MenuIcon,
  Circle,
} from "lucide-react";
import * as LucideIcons from "lucide-react";

import { useStore } from "@/stores/use-store";
import { useUserNavigation } from "@/features/rbac/user/hooks/use-user";

const overviewLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  {
    name: "Master Data", icon: Database,
    subItems: [
      { name: "Role", href: "/master-data/roles" },
      { name: "User", href: "/master-data/users" },
    ]
  },
  {
    name: "Web Management", icon: Settings,
    subItems: [
      { name: "Menu", href: "/web-management/menus" },
      { name: "Role Permission", href: "/web-management/role-permissions" },
    ]
  },
  {
    name: "Pages", icon: FileText,
    subItems: [
      { name: "Blank Page", href: "/pages/blank" },
      { name: "Pricing", href: "/pages/pricing" },
      { name: "Maintenance", href: "/pages/maintenance", external: true },
      { name: "Timeline", href: "/pages/timeline" },
      { name: "Coming Soon", href: "/pages/coming-soon", external: true },
    ]
  },
  {
    name: "Auth Pages", icon: Lock,
    subItems: [
      { name: "Login", href: "/auth/login", external: true },
      { name: "Register", href: "/auth/register", external: true },
      { name: "Recover Password", href: "/auth/recover-password", external: true },
      { name: "Confirm Mail", href: "/auth/confirm-mail", external: true },
      { name: "Login With Pin", href: "/auth/login-pin", external: true },
    ]
  },
  {
    name: "Error Pages", icon: AlertTriangle,
    subItems: [
      { name: "400 Bad Request", href: "/error/400", external: true },
      { name: "401 Unauthorized", href: "/error/401", external: true },
      { name: "403 Forbidden", href: "/error/403", external: true },
      { name: "404 Not Found", href: "/error/404", external: true },
      { name: "500 Internal Server", href: "/error/500", external: true },
      { name: "Service Unavailable", href: "/error/503", external: true },
    ]
  },
];

const componentLinks = [
  {
    name: "Base UI",
    icon: Box,
    subItems: [
      { name: "Accordions", href: "/base-ui/accordions" },
      { name: "Alerts", href: "/base-ui/alerts" },
      { name: "Avatars", href: "/base-ui/avatars" },
      { name: "Badges", href: "/base-ui/badges" },
      { name: "Breadcrumb", href: "/base-ui/breadcrumb" },
      { name: "Buttons", href: "/base-ui/buttons" },
      { name: "Cards", href: "/base-ui/cards" },
      { name: "Carousel", href: "/base-ui/carousel" },
      { name: "Collapse", href: "/base-ui/collapse" },
      { name: "Dropdowns", href: "/base-ui/dropdowns" },
      { name: "Grid", href: "/base-ui/grid" },
      { name: "Links", href: "/base-ui/links" },
      { name: "List Group", href: "/base-ui/list-group" },
      { name: "Modals", href: "/base-ui/modals" },
      { name: "Notifications", href: "/base-ui/notifications" },
      { name: "Offcanvas", href: "/base-ui/offcanvas" },
      { name: "Placeholders", href: "/base-ui/placeholders" },
      { name: "Pagination", href: "/base-ui/pagination" },
      { name: "Progress", href: "/base-ui/progress" },
      { name: "Spinners", href: "/base-ui/spinners" },
      { name: "Tabs", href: "/base-ui/tabs" },
      { name: "Tooltips", href: "/base-ui/tooltips" },
    ]
  },
  {
    name: "Extended UI",
    icon: Layers,
    subItems: [
      { name: "Drag & Drop", href: "/extended-ui/drag-drop" },
      { name: "Ratings", href: "/extended-ui/ratings" },
    ]
  },
  { name: "Icons", href: "/icons", icon: Smile },
  {
    name: "Charts",
    icon: BarChart,
    subItems: [
      { name: "Area", href: "/charts/area" },
      { name: "Bar", href: "/charts/bar" },
      { name: "Bubble", href: "/charts/bubble" },
      { name: "Candlestick", href: "/charts/candlestick" },
      { name: "Column", href: "/charts/column" },
      { name: "Heatmap", href: "/charts/heatmap" },
      { name: "Line", href: "/charts/line" },
      { name: "Mixed", href: "/charts/mixed" },
      { name: "Timeline", href: "/charts/timeline" },
      { name: "Boxplot", href: "/charts/boxplot" },
      { name: "Treemap", href: "/charts/treemap" },
      { name: "Pie", href: "/charts/pie" },
      { name: "Radar", href: "/charts/radar" },
      { name: "Radial Bar", href: "/charts/radialbar" },
      { name: "Scatter", href: "/charts/scatter" },
      { name: "Polar Area", href: "/charts/polar-area" },
      { name: "Sparklines", href: "/charts/sparklines" },
    ]
  },
  {
    name: "Forms",
    icon: ListTodo,
    subItems: [
      { name: "Basic Elements", href: "/forms/basic-elements" },
      { name: "Inputmask", href: "/forms/inputmask" },
      { name: "Picker", href: "/forms/picker" },
      { name: "Select", href: "/forms/select" },
      { name: "Range Slider", href: "/forms/range-slider" },
      { name: "Validation", href: "/forms/validation" },
      { name: "Wizard", href: "/forms/wizard" },
      { name: "File Uploads", href: "/forms/file-uploads" },
      { name: "Editors", href: "/forms/editors" },
    ]
  },
  {
    name: "Tables",
    icon: TableProperties,
    subItems: [
      { name: "Basic Tables", href: "/tables/basic" },
      { name: "Datatable", href: "/tables/datatable" },
    ]
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const isSidebarOpen = useStore((state) => state.isSidebarOpen);
  const toggleSidebar = useStore((state) => state.toggleSidebar);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  const { data: navItems = [], isLoading: isLoadingNav } = useUserNavigation();

  const filteredNavItems = React.useMemo(() => {
    function filterItems(items: any[]) {
      return items
        .map((item) => ({
          ...item,
          children: item.children ? filterItems(item.children) : [],
        }))
        .filter((item) => {
          if (item.is_visible === false) return false;
          if (item.path) {
            return item.permissions?.can_read;
          }
          return item.children && item.children.length > 0;
        });
    }
    return filterItems(navItems);
  }, [navItems]);

  const dynamicLinks = filteredNavItems.map((item) => {
    const Icon = (item.icon && (LucideIcons as any)[item.icon]) || Circle;
    return {
      name: item.name,
      href: item.path || undefined,
      icon: Icon,
      subItems: item.children && item.children.length > 0
        ? item.children.map((child) => ({
            name: child.name,
            href: child.path || "#",
          }))
        : undefined,
    };
  });

  const toggleExpand = (name) => {
    if (!isSidebarOpen) {
      toggleSidebar();
    }
    setExpandedMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const renderLink = (link: any) => {
    const hasSubItems = !!link.subItems;
    const isExpanded = expandedMenus[link.name];
    const isActive = pathname === link.href || (hasSubItems && link.subItems.some((sub: any) => pathname === sub.href)) || (pathname === "/" && link.name === "Dashboard");
    const Icon = link.icon || Circle;

    return (
      <li key={link.name}>
        {hasSubItems ? (
          <div>
            <button
              onClick={() => toggleExpand(link.name)}
              title={!isSidebarOpen ? link.name : undefined}
              className={`w-full flex items-center py-2 rounded-md text-sm transition-colors ${isSidebarOpen ? "justify-between px-2" : "justify-center"
                } ${isActive && !isExpanded
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`size-5 shrink-0 ${isActive ? "text-blue-600" : "text-muted-foreground"}`} />
                {isSidebarOpen && <span className="whitespace-nowrap">{link.name}</span>}
              </div>
              {isSidebarOpen && (
                <ChevronDown
                  className={`size-4 text-muted-foreground transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                />
              )}
            </button>

            {/* Sub Items Dropdown */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${isExpanded && isSidebarOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
            >
              <div className="overflow-hidden">
                <ul className="mt-1 ml-4 pl-4 border-l border-border/50 space-y-1">
                  {link.subItems.map((subLink: any) => {
                    const isSubActive = pathname === subLink.href;
                    const cls = `block px-2 py-1.5 text-xs rounded-md transition-colors ${isSubActive
                      ? "text-blue-700 font-medium bg-blue-50"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`;
                    return (
                      <li key={subLink.name}>
                        {subLink.external ? (
                          <a href={subLink.href} target="_blank" rel="noopener noreferrer" className={cls}>
                            {subLink.name}
                          </a>
                        ) : (
                          <Link href={subLink.href} className={cls}>
                            {subLink.name}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <Link
            href={link.href}
            title={!isSidebarOpen ? link.name : undefined}
            className={`flex items-center py-2 rounded-md text-sm transition-colors w-full ${isSidebarOpen ? "gap-3 px-2" : "justify-center"
              } ${isActive
                ? "bg-blue-50 text-blue-700 font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
          >
            <Icon className={`size-5 shrink-0 ${isActive ? "text-blue-600" : "text-muted-foreground"}`} />
            {isSidebarOpen && <span className="whitespace-nowrap">{link.name}</span>}
          </Link>
        )}
      </li>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden transition-opacity"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 md:static flex-shrink-0 flex flex-col h-screen border-r border-border bg-background overflow-hidden transition-all duration-300 ${isSidebarOpen
          ? "translate-x-0 w-[260px]"
          : "-translate-x-full md:translate-x-0 w-[260px] md:w-[72px]"
          }`}
      >
        {/* Brand */}
        <div className={`p-4 flex items-center gap-2 ${!isSidebarOpen ? "justify-center" : ""}`}>
          <div className="bg-blue-600 rounded-md p-1 shrink-0">
            <Hexagon className="size-5 text-white fill-white" />
          </div>
          {isSidebarOpen && <span className="text-primary font-bold text-lg whitespace-nowrap">Enterprise Core</span>}
        </div>

        {/* Navigation Links */}
        <div className={`flex-1 overflow-y-auto no-scrollbar py-2 space-y-6 ${isSidebarOpen ? "px-4" : "px-2"}`}>
          <div>
            {isSidebarOpen && (
              <h3 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Overview
              </h3>
            )}
            <ul className="space-y-1">
              {isLoadingNav ? (
                <div className="px-4 py-2 flex items-center justify-center">
                  <span className="size-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : dynamicLinks.length > 0 ? (
                dynamicLinks.map(renderLink)
              ) : (
                <div className="px-4 py-2 text-xs text-muted-foreground">Tidak ada menu tersedia.</div>
              )}
            </ul>
          </div>

          <div>
            {isSidebarOpen && (
              <h3 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Component
              </h3>
            )}
            <ul className="space-y-1">
              {componentLinks.map(renderLink)}
            </ul>
          </div>
        </div>

        {/* Footer / User Profile */}
        <div className={`p-4 mt-auto border-t border-border/50 flex flex-col ${isSidebarOpen ? "gap-4" : "gap-4 items-center"}`}>
          <div className={`flex items-center ${isSidebarOpen ? "justify-between px-2" : "justify-center"}`}>
            {isSidebarOpen && (
              <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <LifeBuoy className="size-4" />
                <span>Help</span>
              </button>
            )}
            <button className="text-muted-foreground hover:text-foreground transition-colors" title={!isSidebarOpen ? "Log Out" : undefined}>
              <LogOut className="size-5" />
            </button>
          </div>

          <div className={`flex items-center bg-muted/80 hover:bg-gray-200/60 transition-colors cursor-pointer border border-border/50 shadow-sm ${isSidebarOpen ? "gap-3 p-2 rounded-xl" : "p-1 rounded-full justify-center"
            }`}>
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane&backgroundColor=b6e3f4"
              alt="User avatar"
              className="w-9 h-9 rounded-full bg-card border border-border shrink-0"
            />
            {isSidebarOpen && (
              <div className="flex flex-col flex-1 overflow-hidden">
                <span className="text-sm font-semibold text-foreground truncate">Jane Doe</span>
                <span className="text-xs text-muted-foreground truncate">Chief Architect</span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

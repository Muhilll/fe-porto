"use client";

import {
  Search,
  Maximize,
  Globe,
  Moon,
  Sun,
  MessageSquare,
  Bell,
  ChevronsUpDown,
  PanelLeft,
  User,
  Settings,
  Info,
  LogOut
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useStore } from "@/stores/use-store";
import { useAuthStore } from "@/stores/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AdminHeader() {
  const router = useRouter();
  const toggleSidebar = useStore((state) => state.toggleSidebar);
  const { user, clearAuth } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleLogout = () => {
    clearAuth();
    router.push("/auth/login");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="h-[60px] border-b border-border bg-background transition-colors flex items-center justify-between px-4 sticky top-0 z-10 shadow-sm shrink-0">
      <div className="flex items-center gap-4 flex-1">
        {/* Sidebar Toggle */}
        <button
          onClick={toggleSidebar}
          className="p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground rounded-md transition-colors"
          aria-label="Toggle Sidebar"
        >
          <PanelLeft className="size-5" />
        </button>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-muted/50 border border-border rounded-full px-3 py-1.5 max-w-sm w-full hover:bg-muted transition-colors group focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500/50">
          <Search className="size-4 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Search metrics, users, or comm..."
            className="bg-transparent border-none outline-none text-sm w-full px-2 text-foreground placeholder:text-muted-foreground"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground bg-card border border-border rounded shadow-sm shrink-0">
            <span className="text-xs">⌘</span> K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Utility Actions */}
        <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-full border border-border">
          <button className="p-1.5 text-muted-foreground hover:bg-background hover:text-foreground rounded-full transition-colors hover:shadow-sm">
            <Maximize className="size-4" />
          </button>
          <button className="p-1.5 text-muted-foreground hover:bg-background hover:text-foreground rounded-full transition-colors hover:shadow-sm">
            <Globe className="size-4" />
          </button>
          <button 
            onClick={toggleTheme}
            className="p-1.5 text-muted-foreground hover:bg-background hover:text-foreground rounded-full transition-colors hover:shadow-sm"
          >
            {mounted && theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </div>

        <div className="w-px h-6 bg-border mx-1"></div>

        {/* Notifications & Profile */}
        <div className="flex items-center gap-3">
          <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors relative">
            <MessageSquare className="size-5" />
            <span className="absolute top-1.5 right-1.5 size-1.5 bg-blue-600 rounded-full"></span>
          </button>
          
          <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors relative">
            <Bell className="size-5" />
            <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1 rounded-full hover:bg-muted outline-none transition-colors ml-2">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || "User"}&backgroundColor=transparent`}
                alt={user?.name || "User"}
                className="size-7 rounded-full bg-muted"
              />
              <span className="text-sm font-medium">{user?.name || "User"}</span>
              <ChevronsUpDown className="size-3 text-muted-foreground ml-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl p-2 border-none ring-0 outline-none shadow-lg">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="font-normal px-2 pt-1 pb-3">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none text-foreground">{user?.name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground pt-1">{user?.email || "-"}</p>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer gap-3 py-2 px-2 text-muted-foreground focus:text-foreground rounded-md">
                <User className="size-[18px]" />
                <span className="font-medium">Edit profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer gap-3 py-2 px-2 text-muted-foreground focus:text-foreground rounded-md">
                <Settings className="size-[18px]" />
                <span className="font-medium">Account settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer gap-3 py-2 px-2 text-muted-foreground focus:text-foreground rounded-md">
                <Info className="size-[18px]" />
                <span className="font-medium">Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer gap-3 py-2 px-2 text-red-500 focus:text-red-600 focus:bg-red-50 rounded-md">
                <LogOut className="size-[18px]" />
                <span className="font-medium">Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

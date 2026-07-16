"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  User,
  Settings,
  LogOut,
  Mail,
  Bell,
  Star,
  Pencil,
  Trash,
  Copy,
  Download,
  Share,
  Heart,
  Bookmark,
  Archive,
  Flag,
  Link,
  Printer,
} from "lucide-react";

// Reusable trigger class builder
const baseTrigger = "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors focus:outline-none";

const basicItems = ["Action", "Another action", "Something else here"];

export default function DropdownsPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Dropdowns</h1>
        <p className="text-muted-foreground">
          Contextual overlays for displaying lists of links and actions in a dropdown menu.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Default Dropdown */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Default Dropdown</h2>
          <p className="text-sm text-muted-foreground mb-4">Standard dropdown with basic action items.</p>
          <DropdownMenu>
            <DropdownMenuTrigger className={`${baseTrigger} bg-primary text-primary-foreground hover:bg-primary/90`}>
              Dropdown Button <ChevronDown className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              {basicItems.map((item) => (
                <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem>Separated link</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Colored Dropdowns */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Colored Dropdowns</h2>
          <p className="text-sm text-muted-foreground mb-4">Dropdowns with colored trigger buttons.</p>
          <div className="flex flex-wrap gap-2">
            {[
              ["Primary", "bg-blue-600 hover:bg-blue-700 text-white"],
              ["Success", "bg-green-600 hover:bg-green-700 text-white"],
              ["Danger", "bg-red-600 hover:bg-red-700 text-white"],
              ["Warning", "bg-yellow-500 hover:bg-yellow-600 text-white"],
              ["Info", "bg-cyan-500 hover:bg-cyan-600 text-white"],
            ].map(([label, cls]) => (
              <DropdownMenu key={label}>
                <DropdownMenuTrigger className={`${baseTrigger} ${cls}`}>
                  {label} <ChevronDown className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  {basicItems.map((item) => (
                    <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
        </div>

        {/* Dropdown with Icons */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Dropdown with Icons</h2>
          <p className="text-sm text-muted-foreground mb-4">Menu items decorated with icons for clarity.</p>
          <DropdownMenu>
            <DropdownMenuTrigger className={`${baseTrigger} bg-primary text-primary-foreground hover:bg-primary/90`}>
              Menu with Icons <ChevronDown className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <DropdownMenuItem className="gap-2.5"><User className="size-4" /> Profile</DropdownMenuItem>
              <DropdownMenuItem className="gap-2.5"><Mail className="size-4" /> Messages</DropdownMenuItem>
              <DropdownMenuItem className="gap-2.5"><Bell className="size-4" /> Notifications</DropdownMenuItem>
              <DropdownMenuItem className="gap-2.5"><Settings className="size-4" /> Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2.5 text-red-600 focus:text-red-600 focus:bg-red-50">
                <LogOut className="size-4" /> Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Dropdown with Header */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Dropdown with Header</h2>
          <p className="text-sm text-muted-foreground mb-4">Dropdowns with a grouped label header.</p>
          <DropdownMenu>
            <DropdownMenuTrigger className={`${baseTrigger} bg-primary text-primary-foreground hover:bg-primary/90`}>
              Account Menu <ChevronDown className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem className="gap-2.5"><User className="size-4" /> Profile</DropdownMenuItem>
                <DropdownMenuItem className="gap-2.5"><Settings className="size-4" /> Settings</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel>Support</DropdownMenuLabel>
                <DropdownMenuItem className="gap-2.5"><Mail className="size-4" /> Help Center</DropdownMenuItem>
                <DropdownMenuItem className="gap-2.5"><Flag className="size-4" /> Report Issue</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2.5 text-red-600 focus:bg-red-50 focus:text-red-600">
                <LogOut className="size-4" /> Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Outline Dropdowns */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Outline Dropdowns</h2>
          <p className="text-sm text-muted-foreground mb-4">Outlined style trigger buttons.</p>
          <div className="flex flex-wrap gap-2">
            {[
              ["Primary", "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"],
              ["Success", "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white"],
              ["Danger", "border border-red-600 text-red-600 hover:bg-red-600 hover:text-white"],
            ].map(([label, cls]) => (
              <DropdownMenu key={label}>
                <DropdownMenuTrigger className={`${baseTrigger} bg-transparent ${cls}`}>
                  {label} <ChevronDown className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  {basicItems.map((item) => (
                    <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
        </div>

        {/* Soft Dropdowns */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Soft Dropdowns</h2>
          <p className="text-sm text-muted-foreground mb-4">Soft-colored trigger buttons.</p>
          <div className="flex flex-wrap gap-2">
            {[
              ["Primary", "bg-blue-100 text-blue-700 hover:bg-blue-200"],
              ["Success", "bg-green-100 text-green-700 hover:bg-green-200"],
              ["Danger", "bg-red-100 text-red-700 hover:bg-red-200"],
              ["Warning", "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"],
            ].map(([label, cls]) => (
              <DropdownMenu key={label}>
                <DropdownMenuTrigger className={`${baseTrigger} ${cls}`}>
                  {label} <ChevronDown className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  {basicItems.map((item) => (
                    <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
        </div>

        {/* Dropdown Alignment */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Dropdown Alignment</h2>
          <p className="text-sm text-muted-foreground mb-4">Control the alignment of the dropdown panel.</p>
          <div className="flex gap-2">
            {["start", "center", "end"].map((align) => (
              <DropdownMenu key={align}>
                <DropdownMenuTrigger className={`${baseTrigger} border border-border hover:bg-muted capitalize`}>
                  {align} <ChevronDown className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align={align} className="w-44">
                  {basicItems.map((item) => (
                    <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
        </div>

        {/* Action Dropdown */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Action Dropdown</h2>
          <p className="text-sm text-muted-foreground mb-4">Common CRUD action items in a dropdown.</p>
          <DropdownMenu>
            <DropdownMenuTrigger className={`${baseTrigger} bg-primary text-primary-foreground hover:bg-primary/90`}>
              Actions <ChevronDown className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem className="gap-2.5"><Pencil className="size-4" /> Edit</DropdownMenuItem>
              <DropdownMenuItem className="gap-2.5"><Copy className="size-4" /> Duplicate</DropdownMenuItem>
              <DropdownMenuItem className="gap-2.5"><Archive className="size-4" /> Archive</DropdownMenuItem>
              <DropdownMenuItem className="gap-2.5"><Download className="size-4" /> Download</DropdownMenuItem>
              <DropdownMenuItem className="gap-2.5"><Share className="size-4" /> Share</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2.5 text-red-600 focus:bg-red-50 focus:text-red-600">
                <Trash className="size-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* More Actions Dropdown */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">More Actions Dropdown</h2>
          <p className="text-sm text-muted-foreground mb-4">Extended list of social/utility actions.</p>
          <DropdownMenu>
            <DropdownMenuTrigger className={`${baseTrigger} bg-primary text-primary-foreground hover:bg-primary/90`}>
              More <ChevronDown className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <DropdownMenuItem className="gap-2.5"><Heart className="size-4" /> Favourite</DropdownMenuItem>
              <DropdownMenuItem className="gap-2.5"><Bookmark className="size-4" /> Save</DropdownMenuItem>
              <DropdownMenuItem className="gap-2.5"><Star className="size-4" /> Star</DropdownMenuItem>
              <DropdownMenuItem className="gap-2.5"><Link className="size-4" /> Copy Link</DropdownMenuItem>
              <DropdownMenuItem className="gap-2.5"><Printer className="size-4" /> Print</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2.5 text-red-600 focus:bg-red-50 focus:text-red-600">
                <Flag className="size-4" /> Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Rounded Dropdowns */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Rounded Dropdowns</h2>
          <p className="text-sm text-muted-foreground mb-4">Pill-shaped rounded trigger buttons.</p>
          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className={`${baseTrigger} rounded-full bg-primary text-primary-foreground hover:bg-primary/90`}>
                Primary <ChevronDown className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 rounded-xl">
                {basicItems.map((item) => (
                  <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className={`${baseTrigger} rounded-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white`}>
                Outline <ChevronDown className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 rounded-xl">
                {basicItems.map((item) => (
                  <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

      </div>
    </div>
  );
}

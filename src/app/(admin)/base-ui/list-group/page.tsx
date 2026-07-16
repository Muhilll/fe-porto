import { ListGroup, ListGroupItem, ListGroupItemAction } from "@/components/ui/list-group";
import {
  Home,
  Settings,
  User,
  Bell,
  Mail,
  ShieldCheck,
  LogOut,
  FileText,
  Inbox,
  Star,
  Trash2,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  Download,
  Share2,
} from "lucide-react";

const badge = (text, color = "bg-blue-100 text-blue-700") => (
  <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full ${color}`}>{text}</span>
);

export default function ListGroupPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">List Group</h1>
        <p className="text-muted-foreground">
          A flexible component for displaying a series of content — navigation, inbox, settings, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Basic List Group */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Basic List Group</h2>
          <ListGroup>
            <ListGroupItem>An item</ListGroupItem>
            <ListGroupItem>A second item</ListGroupItem>
            <ListGroupItem>A third item</ListGroupItem>
            <ListGroupItem>A fourth item</ListGroupItem>
            <ListGroupItem>And a fifth one</ListGroupItem>
          </ListGroup>
        </div>

        {/* Active & Disabled Items */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Active & Disabled States</h2>
          <ListGroup>
            <ListGroupItem active>Active item</ListGroupItem>
            <ListGroupItem>Normal item</ListGroupItem>
            <ListGroupItem>Normal item</ListGroupItem>
            <ListGroupItem disabled>Disabled item</ListGroupItem>
            <ListGroupItem>Normal item</ListGroupItem>
          </ListGroup>
        </div>

        {/* Flush List Group */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Flush List Group</h2>
          <p className="text-sm text-muted-foreground mb-3">Removes borders and rounded corners for edge-to-edge content.</p>
          <ListGroup flush>
            <ListGroupItem className="px-0">Cras justo odio</ListGroupItem>
            <ListGroupItem className="px-0">Dapibus ac facilisis in</ListGroupItem>
            <ListGroupItem className="px-0">Morbi leo risus</ListGroupItem>
            <ListGroupItem className="px-0">Porta ac consectetur</ListGroupItem>
            <ListGroupItem className="px-0">Vestibulum at eros</ListGroupItem>
          </ListGroup>
        </div>

        {/* With Badges */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">List Group with Badges</h2>
          <ListGroup>
            <ListGroupItem>Inbox {badge("14", "bg-blue-100 text-blue-700")}</ListGroupItem>
            <ListGroupItem>Starred {badge("3", "bg-yellow-100 text-yellow-700")}</ListGroupItem>
            <ListGroupItem>Sent</ListGroupItem>
            <ListGroupItem>Drafts {badge("2", "bg-muted text-muted-foreground")}</ListGroupItem>
            <ListGroupItem>Spam {badge("1", "bg-red-100 text-red-700")}</ListGroupItem>
          </ListGroup>
        </div>

        {/* With Icons */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">List Group with Icons</h2>
          <ListGroup>
            <ListGroupItem active>
              <Home className="size-4 shrink-0" /> Dashboard
            </ListGroupItem>
            <ListGroupItem>
              <User className="size-4 shrink-0 text-muted-foreground" /> Profile
            </ListGroupItem>
            <ListGroupItem>
              <Bell className="size-4 shrink-0 text-muted-foreground" /> Notifications {badge("5")}
            </ListGroupItem>
            <ListGroupItem>
              <Mail className="size-4 shrink-0 text-muted-foreground" /> Messages {badge("2", "bg-green-100 text-green-700")}
            </ListGroupItem>
            <ListGroupItem>
              <Settings className="size-4 shrink-0 text-muted-foreground" /> Settings
            </ListGroupItem>
            <ListGroupItem disabled>
              <ShieldCheck className="size-4 shrink-0" /> Security (disabled)
            </ListGroupItem>
            <ListGroupItem>
              <LogOut className="size-4 shrink-0 text-muted-foreground" /> Sign Out
            </ListGroupItem>
          </ListGroup>
        </div>

        {/* Clickable List Group */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Clickable / Linked Items</h2>
          <ListGroup>
            <ListGroupItemAction href="#" className="justify-between">
              <span className="flex items-center gap-3"><FileText className="size-4 text-muted-foreground" /> Documents</span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </ListGroupItemAction>
            <ListGroupItemAction href="#" className="justify-between">
              <span className="flex items-center gap-3"><Download className="size-4 text-muted-foreground" /> Downloads</span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </ListGroupItemAction>
            <ListGroupItemAction href="#" className="justify-between">
              <span className="flex items-center gap-3"><Share2 className="size-4 text-muted-foreground" /> Shared</span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </ListGroupItemAction>
            <ListGroupItemAction href="#" className="justify-between">
              <span className="flex items-center gap-3"><Trash2 className="size-4 text-muted-foreground" /> Trash</span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </ListGroupItemAction>
          </ListGroup>
        </div>

        {/* Inbox Style */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Inbox Style</h2>
          <ListGroup>
            {[
              { icon: Inbox, label: "Inbox", count: "14", color: "bg-blue-100 text-blue-700" },
              { icon: Star, label: "Starred", count: "3", color: "bg-yellow-100 text-yellow-700" },
              { icon: Send, label: "Sent" },
              { icon: FileText, label: "Drafts", count: "2", color: "bg-muted text-muted-foreground" },
              { icon: Trash2, label: "Trash" },
            ].map(({ icon: Icon, label, count, color }) => (
              <ListGroupItemAction key={label} href="#">
                <Icon className="size-4 text-muted-foreground" />
                <span className="flex-1">{label}</span>
                {count && badge(count, color)}
              </ListGroupItemAction>
            ))}
          </ListGroup>
        </div>

        {/* Status List */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Status / State List</h2>
          <ListGroup>
            <ListGroupItem className="bg-green-50 text-green-800 border-green-100">
              <CheckCircle2 className="size-4 text-green-600 shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-sm">Deployment successful</p>
                <p className="text-xs opacity-70">Production • 2 min ago</p>
              </div>
            </ListGroupItem>
            <ListGroupItem className="bg-yellow-50 text-yellow-800 border-yellow-100">
              <Clock className="size-4 text-yellow-600 shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-sm">Build in progress</p>
                <p className="text-xs opacity-70">Staging • Running</p>
              </div>
            </ListGroupItem>
            <ListGroupItem className="bg-red-50 text-red-800 border-red-100">
              <AlertCircle className="size-4 text-red-600 shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-sm">Service degraded</p>
                <p className="text-xs opacity-70">API Gateway • 5 min ago</p>
              </div>
            </ListGroupItem>
            <ListGroupItem className="bg-blue-50 text-blue-800 border-blue-100">
              <CheckCircle2 className="size-4 text-blue-600 shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-sm">Tests passed</p>
                <p className="text-xs opacity-70">CI/CD • 10 min ago</p>
              </div>
            </ListGroupItem>
          </ListGroup>
        </div>

        {/* Rich Content List */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Rich Content List</h2>
          <ListGroup>
            {[
              { seed: "Alex", name: "Alex Johnson", role: "UI Designer", msg: "Sent you a project update — check the latest design files.", time: "2m ago", unread: true },
              { seed: "Jane", name: "Jane Doe", role: "Backend Dev", msg: "The API is ready for integration. Let me know when you want to test.", time: "1h ago", unread: true },
              { seed: "Bob", name: "Bob Smith", role: "Product Manager", msg: "Meeting at 3pm has been rescheduled to 4pm today.", time: "3h ago", unread: false },
              { seed: "Sam", name: "Sam Wilson", role: "DevOps", msg: "Deployment pipeline is configured. All systems nominal.", time: "Yesterday", unread: false },
            ].map(({ seed, name, role, msg, time, unread }) => (
              <ListGroupItemAction key={seed} href="#" className="items-start py-3.5">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4`}
                  alt={name}
                  className="size-10 rounded-full bg-muted shrink-0 mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className={`text-sm ${unread ? "font-semibold text-foreground" : "font-medium text-foreground"}`}>{name}</p>
                    <span className="text-xs text-muted-foreground shrink-0 ml-2">{time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{role}</p>
                  <p className={`text-sm mt-0.5 truncate ${unread ? "text-foreground" : "text-muted-foreground"}`}>{msg}</p>
                </div>
                {unread && <span className="size-2 rounded-full bg-blue-600 shrink-0 mt-2" />}
              </ListGroupItemAction>
            ))}
          </ListGroup>
        </div>

      </div>
    </div>
  );
}

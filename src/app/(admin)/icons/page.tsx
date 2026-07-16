"use client";

import { useState, useMemo } from "react";
import * as LucideIcons from "lucide-react";
import { Search, Copy, Check } from "lucide-react";

/* ─── Icon categories ─────────────────────────────── */
const categories = {
  "Arrows & Navigation": ["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","ArrowUpRight","ArrowDownLeft","ChevronLeft","ChevronRight","ChevronUp","ChevronDown","ChevronsLeft","ChevronsRight","ChevronsUp","ChevronsDown","MoveLeft","MoveRight","MoveUp","MoveDown","Navigation","Navigation2","Compass","CornerDownLeft","CornerDownRight","CornerUpLeft","CornerUpRight","RotateCcw","RotateCw","RefreshCw","RefreshCcw","Repeat","Repeat1","Repeat2","Shuffle","Undo","Undo2","Redo","Redo2"],
  "Interface": ["Menu","X","Plus","Minus","Check","CheckCircle","CheckCircle2","Circle","Square","Triangle","Hexagon","Octagon","Star","Heart","Bookmark","Flag","Tag","Hash","AtSign","Slash","Dot","Grip","GripHorizontal","GripVertical","MoreHorizontal","MoreVertical","AlignLeft","AlignCenter","AlignRight","AlignJustify","List","ListOrdered","ListChecks","LayoutDashboard","Layout","LayoutGrid","LayoutList","Sidebar","SidebarOpen","SidebarClose","Columns","Rows","Table","TableProperties","Grid","Grid2X2","Grid3X3"],
  "Communication": ["Mail","MailOpen","MailCheck","MailPlus","MailMinus","MailX","MessageSquare","MessageCircle","MessageSquarePlus","MessageSquareDots","Messages","Send","SendHorizonal","Reply","ReplyAll","Forward","Phone","PhoneCall","PhoneOff","PhoneIncoming","PhoneOutgoing","PhoneMissed","Bell","BellOff","BellRing","BellDot","BellPlus","BellMinus","Inbox","Voicemail","Rss"],
  "Users & People": ["User","UserCircle","UserSquare","UserCheck","UserX","UserPlus","UserMinus","Users","Users2","UserCog","Contact","ContactRound","PersonStanding","Baby","Accessibility","Handshake","Hand","HandMetal","ThumbsUp","ThumbsDown"],
  "Files & Folders": ["File","FileText","FileCode","FileImage","FileAudio","FileVideo","FileArchive","FilePlus","FileMinus","FileCheck","FileX","FileSearch","FileEdit","FolderOpen","Folder","FolderPlus","FolderMinus","FolderCheck","FolderX","FolderInput","FolderOutput","FolderSearch","FolderClosed","FolderGit","Archive","Download","Upload","Paperclip","Clipboard","ClipboardCheck","ClipboardList","ClipboardCopy","ClipboardPaste","ClipboardX"],
  "Media": ["Play","Pause","Stop","SkipForward","SkipBack","FastForward","Rewind","Volume","Volume1","Volume2","VolumeX","Mic","MicOff","Music","Music2","Music3","Music4","Headphones","Radio","Tv","Tv2","Film","Camera","CameraOff","Video","VideoOff","Image","Images","ImagePlus","ImageMinus","ImageOff","Aperture","ScanLine","Scan","QrCode","Barcode"],
  "Devices & Tech": ["Monitor","MonitorSpeaker","MonitorDot","Smartphone","Tablet","Laptop","Laptop2","Desktop","Printer","Keyboard","Mouse","Mouse2","Touchpad","Cpu","MemoryStick","HardDrive","HardDriveDownload","HardDriveUpload","Server","Database","DatabaseBackup","Cloud","CloudDownload","CloudUpload","CloudOff","Wifi","WifiOff","Bluetooth","BluetoothConnected","BluetoothOff","Battery","BatteryLow","BatteryFull","BatteryCharging","Power","PowerOff","Plug","PlugZap","Usb","Cable"],
  "Shopping & Finance": ["ShoppingCart","ShoppingBag","Store","Package","PackageOpen","PackageCheck","PackagePlus","PackageMinus","PackageX","PackageSearch","Boxes","Box","Gift","GiftCard","CreditCard","Wallet","Coins","DollarSign","Euro","PoundSterling","Bitcoin","Receipt","ReceiptText","Ticket","TicketCheck","Tag","Tags","Percent","TrendingUp","TrendingDown","BarChart","BarChart2","BarChart3","BarChart4","LineChart","PieChart","AreaChart"],
  "Maps & Location": ["Map","MapPin","MapPinOff","Navigation","Navigation2","Compass","Globe","Globe2","Locate","LocateFixed","LocateOff","Mountain","Building","Building2","Landmark","Home","HomeIcon","Hotel","School","Hospital","Church","Castle","Warehouse","Factory","Tent","Plane","PlaneLanding","PlaneTakeoff","Car","CarFront","Truck","Bus","Train","Ship","Bike","Footprints"],
  "Nature & Weather": ["Sun","SunDim","SunMedium","Moon","MoonStar","Cloud","CloudSun","CloudMoon","CloudRain","CloudSnow","CloudLightning","CloudFog","Wind","Tornado","Thermometer","ThermometerSun","Snowflake","Flame","Droplets","Droplet","Leaf","Flower","Flower2","Sprout","Trees","TreePine","TreeDeciduous","Clover","Apple","Banana","Cherry","Grape","Lemon","nut","Shell","Bug","Bird","Fish","Turtle","Rabbit","Cat","Dog"],
  "Tools & Settings": ["Settings","Settings2","SlidersHorizontal","SlidersVertical","Sliders","Wrench","Hammer","Screwdriver","Scissors","Ruler","Pencil","Pen","PenLine","PenSquare","Edit","Edit2","Edit3","Eraser","Highlighter","Paintbrush","Paintbrush2","Palette","Pipette","Wand","Wand2","Stamp","Sticker","ZoomIn","ZoomOut","Maximize","Maximize2","Minimize","Minimize2","Move","Crop","Rotate3d","Scale","Scaling","Lock","LockOpen","Unlock","Key","KeyRound","ShieldCheck","Shield","ShieldAlert","ShieldOff","ShieldPlus","ShieldMinus","Fingerprint","Eye","EyeOff","Scan","Search","SearchCode","SearchSlash","SearchX","ScanSearch","Filter","FilterX","SortAsc","SortDesc","ArrowUpDown"],
  "Emoji & Misc": ["Smile","Laugh","Frown","Meh","Annoyed","Angry","Tired","ThumbsUp","ThumbsDown","PartyPopper","Confetti","Trophy","Medal","Award","Crown","Gem","Diamond","Sparkles","Zap","ZapOff","Lightbulb","LightbulbOff","Magnet","Link","Link2","Unlink","Unlink2","Anchor","LifeBuoy","Lifebuoy","Info","AlertCircle","AlertTriangle","AlertOctagon","HelpCircle","XCircle","XOctagon","LogIn","LogOut","ExternalLink","Share","Share2","Maximize","Minimize","Copy","Paste","ClipboardPaste","Trash","Trash2","Delete","ArchiveX","BookmarkX","Ban","CircleSlash","CircleOff","Loader","Loader2","LoaderCircle","RefreshCw"],
};

/* Get all valid icon names from lucide */
const allIconNames = Object.keys(LucideIcons).filter(
  (k) => typeof LucideIcons[k] === "function" && k !== "createLucideIcon" && /^[A-Z]/.test(k)
);

function IconGrid({ icons, onCopy, copied }) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1">
      {icons.map((name) => {
        const Icon = LucideIcons[name];
        if (!Icon) return null;
        return (
          <button
            key={name}
            title={name}
            onClick={() => onCopy(name)}
            className="group flex flex-col items-center gap-1.5 p-2.5 rounded-xl hover:bg-blue-50 hover:text-primary transition-colors"
          >
            {copied === name ? (
              <Check className="size-5 text-green-500" />
            ) : (
              <Icon className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
            <span className="text-[9px] text-muted-foreground leading-tight text-center truncate w-full group-hover:text-primary transition-colors">
              {name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function IconsPage() {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCopy = (name) => {
    navigator.clipboard.writeText(`<${name} />`).catch(() => {});
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  };

  const filteredIcons = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (activeCategory === "All") {
      return q ? allIconNames.filter((n) => n.toLowerCase().includes(q)) : allIconNames;
    }
    const catIcons = (categories[activeCategory] || []).filter((n) => LucideIcons[n]);
    return q ? catIcons.filter((n) => n.toLowerCase().includes(q)) : catIcons;
  }, [search, activeCategory]);

  const tabs = ["All", ...Object.keys(categories)];

  return (
    <div className="w-full space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Icons</h1>
        <p className="text-muted-foreground">
          Powered by <span className="font-semibold text-foreground">Lucide React</span> — {allIconNames.length}+ beautiful open-source icons. Click any icon to copy its JSX tag.
        </p>
      </div>

      {/* Search + stats */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-border rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card"
          />
        </div>
        <span className="text-sm text-muted-foreground shrink-0">
          {filteredIcons.length} icon{filteredIcons.length !== 1 ? "s" : ""}
        </span>
        {copied && (
          <span className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
            <Check className="size-3.5" /> Copied!
          </span>
        )}
      </div>

      {/* Category tabs (scrollable) */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveCategory(tab)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors shrink-0 ${
              activeCategory === tab
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Icon grid */}
      <div className="bg-card border border-border rounded-xl p-4">
        {filteredIcons.length > 0 ? (
          <IconGrid icons={filteredIcons} onCopy={handleCopy} copied={copied} />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Search className="size-10 text-muted-foreground/30 mb-3" />
            <p className="text-sm font-medium text-foreground">No icons found</p>
            <p className="text-xs text-muted-foreground mt-1">Try a different search term or category</p>
          </div>
        )}
      </div>

      {/* Usage guide */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-base font-semibold">Usage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Installation</p>
            <pre className="bg-gray-900 text-green-400 text-xs rounded-lg p-3 overflow-x-auto">
              <code>bun add lucide-react</code>
            </pre>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Import & use</p>
            <pre className="bg-gray-900 text-green-400 text-xs rounded-lg p-3 overflow-x-auto">
              <code>{`import { Star, Heart, Bell } from 'lucide-react';\n\n<Star className="size-5 text-yellow-400 fill-yellow-400" />`}</code>
            </pre>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Customize size & color</p>
            <div className="flex flex-wrap items-center gap-4 p-3 bg-muted rounded-lg border border-border">
              {[["size-3","xs"],["size-4","sm"],["size-5","md"],["size-6","lg"],["size-8","xl"]].map(([sz, label]) => (
                <div key={sz} className="flex flex-col items-center gap-1">
                  <LucideIcons.Star className={`${sz} text-yellow-400 fill-yellow-400`} />
                  <span className="text-[10px] text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Color variants</p>
            <div className="flex flex-wrap items-center gap-3 p-3 bg-muted rounded-lg border border-border">
              {[
                "text-blue-600","text-green-600","text-red-600",
                "text-yellow-500","text-purple-600","text-muted-foreground",
              ].map((cls) => (
                <LucideIcons.Bell key={cls} className={`size-5 ${cls}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link } from "@/components/ui/link";
import {
  ExternalLink,
  ArrowRight,
  ArrowUpRight,
  Download,
  Mail,
  Phone,
  GitBranch,
  Hash,
  Briefcase,
  Globe,
  ChevronRight,
  FileText,
  Star,
} from "lucide-react";

function DemoCard({ title, description, children }) {
  return (
    <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}
      {children}
    </div>
  );
}

export default function LinksPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Links</h1>
        <p className="text-muted-foreground">
          Styled anchor elements with color, decoration, size, and icon variants for all use cases.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Default Links */}
        <DemoCard title="Default Links" description="Standard links with underline decoration.">
          <div className="flex flex-wrap gap-4">
            <Link href="#">Default link</Link>
            <Link href="#" variant="subtle">Subtle link</Link>
            <Link href="#" variant="plain">Plain link</Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            This is a paragraph with an{" "}
            <Link href="#">inline link</Link>{" "}
            that flows naturally within body text. You can also have a{" "}
            <Link href="#" variant="plain">plain link</Link>{" "}
            that only shows its color without an underline.
          </p>
        </DemoCard>

        {/* Color Variants */}
        <DemoCard title="Colored Links" description="Links in different color styles.">
          <div className="flex flex-wrap gap-4">
            <Link href="#" variant="blue">Blue link</Link>
            <Link href="#" variant="green">Green link</Link>
            <Link href="#" variant="red">Red link</Link>
            <Link href="#" variant="yellow">Yellow link</Link>
            <Link href="#" variant="purple">Purple link</Link>
            <Link href="#" variant="gray">Gray link</Link>
          </div>
        </DemoCard>

        {/* Decoration Variants */}
        <DemoCard title="Text Decoration Variants" description="Different underline decoration styles.">
          <div className="flex flex-col gap-3">
            <div><Link href="#" variant="default">Solid underline</Link> <span className="text-xs text-muted-foreground ml-2">default</span></div>
            <div><Link href="#" variant="no-underline">No underline (hover to reveal)</Link> <span className="text-xs text-muted-foreground ml-2">no-underline</span></div>
            <div><Link href="#" variant="dashed">Dashed underline</Link> <span className="text-xs text-muted-foreground ml-2">dashed</span></div>
            <div><Link href="#" variant="dotted">Dotted underline</Link> <span className="text-xs text-muted-foreground ml-2">dotted</span></div>
            <div><Link href="#" variant="wavy">Wavy underline</Link> <span className="text-xs text-muted-foreground ml-2">wavy</span></div>
            <div><Link href="#" variant="double">Double underline</Link> <span className="text-xs text-muted-foreground ml-2">double</span></div>
          </div>
        </DemoCard>

        {/* Sizes */}
        <DemoCard title="Link Sizes" description="Small, default, large, and extra-large sizes.">
          <div className="flex flex-col gap-3">
            <Link href="#" size="sm">Small link (sm)</Link>
            <Link href="#" size="default">Default link</Link>
            <Link href="#" size="lg">Large link (lg)</Link>
            <Link href="#" size="xl">Extra Large link (xl)</Link>
          </div>
        </DemoCard>

        {/* Font Weights */}
        <DemoCard title="Font Weights" description="Links with different font weights.">
          <div className="flex flex-col gap-3">
            <Link href="#" weight="normal">Normal weight link</Link>
            <Link href="#" weight="medium">Medium weight link</Link>
            <Link href="#" weight="semibold">Semibold weight link</Link>
            <Link href="#" weight="bold">Bold weight link</Link>
          </div>
        </DemoCard>

        {/* Links with Icons */}
        <DemoCard title="Links with Icons" description="Links with leading or trailing icons.">
          <div className="flex flex-col gap-3">
            <Link href="#" variant="blue">
              <ArrowRight className="size-3.5" /> Continue reading
            </Link>
            <Link href="#" variant="blue">
              <Download className="size-3.5" /> Download PDF
            </Link>
            <Link href="#" variant="purple">
              <FileText className="size-3.5" /> View documentation
            </Link>
            <Link href="#" variant="green">
              View all results <ChevronRight className="size-3.5" />
            </Link>
            <Link href="#" variant="plain" external>
              Open in new tab <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </DemoCard>

        {/* External Links */}
        <DemoCard title="External Links" description="Links that open in a new tab with appropriate icon.">
          <div className="flex flex-col gap-3">
            <Link href="https://nextjs.org" external variant="blue">
              Next.js Documentation <ExternalLink className="size-3.5" />
            </Link>
            <Link href="https://tailwindcss.com" external variant="cyan" className="text-cyan-600 hover:text-cyan-800 underline underline-offset-4">
              Tailwind CSS <ExternalLink className="size-3.5" />
            </Link>
            <Link href="https://github.com" external variant="gray">
              <GitBranch className="size-3.5" /> GitHub Repository
            </Link>
            <Link href="https://twitter.com" external className="text-sky-500 hover:text-sky-700 underline underline-offset-4 inline-flex items-center gap-1.5 text-sm">
              <Hash className="size-3.5" /> Follow on Twitter
            </Link>
          </div>
        </DemoCard>

        {/* Utility Links */}
        <DemoCard title="Utility Links" description="Common utility link patterns — email, phone, and social.">
          <div className="flex flex-col gap-3">
            <Link href="mailto:hello@example.com" variant="blue">
              <Mail className="size-3.5" /> hello@example.com
            </Link>
            <Link href="tel:+1234567890" variant="green">
              <Phone className="size-3.5" /> +1 (234) 567-890
            </Link>
            <Link href="#" external className="text-foreground hover:text-black underline underline-offset-4 text-sm inline-flex items-center gap-1.5">
              <GitBranch className="size-3.5" /> github.com/username
            </Link>
            <Link href="#" external className="text-blue-700 hover:text-blue-900 underline underline-offset-4 text-sm inline-flex items-center gap-1.5">
              <Briefcase className="size-3.5" /> linkedin.com/in/username
            </Link>
            <Link href="#" external variant="blue">
              <Globe className="size-3.5" /> www.example.com
            </Link>
          </div>
        </DemoCard>

        {/* Links in Context */}
        <DemoCard title="Links in Content" description="How links appear within real body text and paragraphs." >
          <div className="space-y-4 text-sm text-foreground leading-relaxed">
            <p>
              Next.js is a <Link href="#" variant="default">React framework</Link> that enables
              functionality such as server-side rendering and generating static websites. Check out
              the <Link href="#" variant="default">official documentation</Link> to get started.
            </p>
            <p>
              For styling, we use <Link href="#" variant="blue">Tailwind CSS</Link> — a utility-first
              CSS framework. Combined with <Link href="#" variant="purple">shadcn/ui</Link> components,
              you get a powerful design system out of the box.
            </p>
            <p>
              Have questions? <Link href="mailto:support@example.com" variant="green">Contact our support team</Link>{" "}
              or visit our <Link href="#" variant="default">help center</Link>. You can also{" "}
              <Link href="#" external variant="no-underline">
                join our community <ArrowUpRight className="size-3.5" />
              </Link>{" "}
              on Discord.
            </p>
          </div>
        </DemoCard>

        {/* Navigation Links */}
        <DemoCard title="Navigation-style Links" description="Links styled as navigation items with hover effects.">
          <div className="space-y-1">
            {[
              { label: "Dashboard Overview", icon: Globe, badge: null },
              { label: "View Analytics Report", icon: FileText, badge: "New" },
              { label: "Manage Users", icon: Briefcase, badge: "12" },
              { label: "Starred Items", icon: Star, badge: null },
              { label: "API Reference", icon: ExternalLink, badge: null, external: true },
            ].map(({ label, icon: Icon, badge, external }) => (
              <a
                key={label}
                href="#"
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-muted hover:text-primary transition-colors group"
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  {label}
                </span>
                {badge && (
                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">{badge}</span>
                )}
              </a>
            ))}
          </div>
        </DemoCard>

      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Collapse, useCollapse } from "@/components/ui/collapse";
import { ChevronDown, ChevronRight, Plus, Minus, Settings, Bell, User, HelpCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

function DemoCard({ title, description, children }) {
  return (
    <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}
      {children}
    </div>
  );
}

/* Reusable demo trigger button */
function CollapseToggle({ open, onToggle, children, className }) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors",
        "bg-primary text-primary-foreground hover:bg-primary/90",
        className
      )}
    >
      {children}
      <ChevronDown className={cn("size-4 transition-transform duration-300", open && "rotate-180")} />
    </button>
  );
}

/* FAQ Item */
function FaqItem({ question, answer }) {
  const { open, toggle } = useCollapse(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium text-left hover:bg-muted transition-colors"
      >
        {question}
        <ChevronDown className={cn("size-4 text-muted-foreground shrink-0 transition-transform duration-300", open && "rotate-180")} />
      </button>
      <Collapse open={open}>
        <div className="px-4 pb-4 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border">
          {answer}
        </div>
      </Collapse>
    </div>
  );
}

/* Accordion group — only one item open at a time */
function AccordionGroup({ items }) {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="border border-border rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium text-left hover:bg-muted transition-colors"
          >
            <span className="flex items-center gap-2">
              {item.icon && <item.icon className="size-4 text-muted-foreground" />}
              {item.title}
            </span>
            <ChevronDown className={cn("size-4 text-muted-foreground shrink-0 transition-transform duration-300", openIndex === i && "rotate-180")} />
          </button>
          <Collapse open={openIndex === i}>
            <div className="px-4 pb-4 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border">
              {item.content}
            </div>
          </Collapse>
        </div>
      ))}
    </div>
  );
}

export default function CollapsePage() {
  const basic = useCollapse(false);
  const multi1 = useCollapse(false);
  const multi2 = useCollapse(false);
  const multi3 = useCollapse(false);
  const styled = useCollapse(false);
  const plusMinus = useCollapse(false);

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Collapse</h1>
        <p className="text-muted-foreground">
          Toggle the visibility of content with a smooth height animation. Great for accordions, FAQs, and expandable panels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Basic Collapse */}
        <DemoCard title="Basic Collapse" description="Click the button to toggle the collapsed content.">
          <div className="space-y-3">
            <CollapseToggle open={basic.open} onToggle={basic.toggle}>
              Toggle Content
            </CollapseToggle>
            <Collapse open={basic.open}>
              <div className="p-4 bg-muted rounded-lg text-sm text-muted-foreground border border-border">
                This is the collapsed content. It smoothly animates open and closed when the button is clicked. You can place any content here — text, images, forms, or other components.
              </div>
            </Collapse>
          </div>
        </DemoCard>

        {/* Multiple Independent */}
        <DemoCard title="Multiple Collapse" description="Multiple independent collapsible panels.">
          <div className="space-y-2">
            {[
              { hook: multi1, label: "Section One", content: "Content for section one. This panel collapses independently of others on this page." },
              { hook: multi2, label: "Section Two", content: "Content for section two. You can open multiple sections at the same time." },
              { hook: multi3, label: "Section Three", content: "Content for section three. All three sections are independently controlled." },
            ].map(({ hook, label, content }) => (
              <div key={label} className="space-y-1">
                <CollapseToggle open={hook.open} onToggle={hook.toggle} className="bg-gray-800 hover:bg-gray-900">
                  {label}
                </CollapseToggle>
                <Collapse open={hook.open}>
                  <div className="p-4 bg-muted rounded-lg text-sm text-muted-foreground border border-border">
                    {content}
                  </div>
                </Collapse>
              </div>
            ))}
          </div>
        </DemoCard>

        {/* Accordion (one at a time) */}
        <DemoCard title="Accordion (Single Open)" description="Only one panel can be expanded at a time.">
          <AccordionGroup items={[
            { icon: Settings, title: "Account Settings", content: "Manage your account details, email address, and authentication preferences. Keep your credentials secure." },
            { icon: Bell, title: "Notifications", content: "Control which email and in-app notifications you receive. Customize frequency and notification types." },
            { icon: User, title: "Profile Information", content: "Update your public profile, avatar, bio, and social links. Your profile is visible to other team members." },
            { icon: HelpCircle, title: "Help & Support", content: "Browse our knowledge base, submit a support ticket, or reach our team via live chat." },
          ]} />
        </DemoCard>

        {/* FAQ Style */}
        <DemoCard title="FAQ Style" description="Frequently asked questions with expandable answers.">
          <div className="space-y-2">
            {[
              {
                question: "What is included in the free plan?",
                answer: "The free plan includes access to basic features, up to 3 projects, and community support. You can upgrade anytime to unlock more features.",
              },
              {
                question: "How do I cancel my subscription?",
                answer: "You can cancel your subscription at any time from Account Settings › Billing. Your access continues until the end of the billing period.",
              },
              {
                question: "Can I export my data?",
                answer: "Yes! All plans support data export in CSV, JSON, and PDF format. Go to Settings › Data › Export to get started.",
              },
              {
                question: "Is my data secure?",
                answer: "Absolutely. We use industry-standard AES-256 encryption for data at rest and TLS 1.3 for data in transit. SOC 2 Type II certified.",
              },
            ].map((item) => (
              <FaqItem key={item.question} {...item} />
            ))}
          </div>
        </DemoCard>

        {/* Plus/Minus Icon */}
        <DemoCard title="Plus / Minus Icon Trigger" description="Using +/– icons instead of a chevron.">
          <div className="space-y-3">
            <button
              onClick={plusMinus.toggle}
              className="w-full flex items-center justify-between px-4 py-3 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
            >
              Show more details
              {plusMinus.open
                ? <Minus className="size-4 text-muted-foreground" />
                : <Plus className="size-4 text-muted-foreground" />
              }
            </button>
            <Collapse open={plusMinus.open}>
              <div className="p-4 border border-border rounded-lg text-sm text-muted-foreground space-y-2">
                <p>Here are the additional details you requested:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Feature one: Advanced reporting and analytics</li>
                  <li>Feature two: Role-based access control</li>
                  <li>Feature three: API access and webhooks</li>
                  <li>Feature four: Priority support with SLA</li>
                </ul>
              </div>
            </Collapse>
          </div>
        </DemoCard>

        {/* Arrow Icon */}
        <DemoCard title="Arrow Icon Trigger" description="Using a right-pointing arrow that rotates when open.">
          <div className="space-y-2">
            {[
              { label: "View Documentation", color: "text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-200", content: "Access the full API reference, guides, and code examples. Updated with every release." },
              { label: "View Changelog", color: "text-green-700 bg-green-50 hover:bg-green-100 border-green-200", content: "See what's new in the latest version. Includes bug fixes, improvements, and breaking changes." },
              { label: "View License", color: "text-purple-700 bg-purple-50 hover:bg-purple-100 border-purple-200", content: "MIT License. Free to use in personal and commercial projects with attribution." },
            ].map(({ label, color, content }) => {
              const { open, toggle } = useCollapse(false);
              return (
                <div key={label} className="space-y-1">
                  <button
                    onClick={toggle}
                    className={cn("w-full flex items-center justify-between px-4 py-2.5 border rounded-lg text-sm font-medium transition-colors", color)}
                  >
                    {label}
                    <ChevronRight className={cn("size-4 shrink-0 transition-transform duration-300", open && "rotate-90")} />
                  </button>
                  <Collapse open={open}>
                    <div className="px-4 py-3 bg-muted border border-border rounded-lg text-sm text-muted-foreground">
                      {content}
                    </div>
                  </Collapse>
                </div>
              );
            })}
          </div>
        </DemoCard>

        {/* Styled Collapse */}
        <DemoCard title="Styled Collapse Panels" description="Collapse panels with colored headers and themed content." >
          <div className="space-y-3">
            {[
              { label: "Information", icon: Info, headerCls: "bg-blue-600 text-white", bodyCls: "bg-blue-50 text-blue-800 border-blue-200" },
              { label: "Warning", icon: AlertTriangle, headerCls: "bg-yellow-500 text-white", bodyCls: "bg-yellow-50 text-yellow-800 border-yellow-200" },
            ].map(({ label, icon: Icon, headerCls, bodyCls }) => {
              const { open, toggle } = useCollapse(false);
              return (
                <div key={label}>
                  <button
                    onClick={toggle}
                    className={cn("w-full flex items-center justify-between px-4 py-3 rounded-t-xl text-sm font-medium transition-colors", headerCls, !open && "rounded-b-xl")}
                  >
                    <span className="flex items-center gap-2"><Icon className="size-4" /> {label}</span>
                    <ChevronDown className={cn("size-4 transition-transform duration-300", open && "rotate-180")} />
                  </button>
                  <Collapse open={open}>
                    <div className={cn("px-4 py-3 text-sm border rounded-b-xl border-t-0", bodyCls)}>
                      This is the {label.toLowerCase()} panel content. It slides open with a smooth animation and can contain any content.
                    </div>
                  </Collapse>
                </div>
              );
            })}
          </div>
        </DemoCard>

        {/* Default Open */}
        <DemoCard title="Default Open" description="A collapse panel that starts in the open state.">
          <AccordionGroup items={[
            { title: "This panel is open by default", content: "This panel was open when the page loaded. The user can still collapse it by clicking the header." },
            { title: "This panel starts closed", content: "Click to expand this panel." },
          ]} />
        </DemoCard>

      </div>
    </div>
  );
}

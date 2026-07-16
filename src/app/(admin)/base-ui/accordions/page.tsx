"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Settings, CreditCard, HelpCircle, ShieldCheck,
  Bell, User, Package, Zap, ChevronDown,
} from "lucide-react";

function DemoCard({ title, description, children, span2 = false }) {
  return (
    <div className={`p-6 bg-card border border-border rounded-xl shadow-sm ${span2 ? "lg:col-span-2" : ""}`}>
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}
      {children}
    </div>
  );
}

const faqItems = [
  { q: "What is included in the free plan?", a: "The free plan includes access to core features, up to 3 projects, and community support. You can upgrade at any time to unlock unlimited projects and priority support." },
  { q: "How do I cancel my subscription?", a: "You can cancel your subscription at any time from Account Settings › Billing. Your access continues until the end of the current billing period with no further charges." },
  { q: "Can I export my data at any time?", a: "Yes! All plans support full data export in CSV, JSON, and PDF formats. Navigate to Settings › Data › Export to download your data." },
  { q: "Is there a team or enterprise plan?", a: "Yes, we offer Team and Enterprise plans with additional seats, advanced RBAC, audit logs, SSO, and a dedicated account manager. Contact us for pricing." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and bank transfers for annual plans. All payments are secured by Stripe." },
];

const settingsItems = [
  { icon: User, value: "profile", label: "Profile", content: "Manage your display name, email address, avatar, and public bio. Changes may take a few minutes to propagate across the platform." },
  { icon: Bell, value: "notifications", label: "Notifications", content: "Configure email and in-app notification preferences. Choose which events trigger notifications and how frequently you receive digest emails." },
  { icon: ShieldCheck, value: "security", label: "Security", content: "Manage your password, enable two-factor authentication, view active sessions, and review recent login activity." },
  { icon: CreditCard, value: "billing", label: "Billing", content: "View and update your payment method, billing address, and download past invoices. Subscription changes take effect at the next billing cycle." },
];

export default function AccordionsPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Accordions</h1>
        <p className="text-muted-foreground">
          Vertically stacked expandable sections for showing and hiding content. Supports single and multiple open modes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Default — Single open */}
        <DemoCard title="Default Accordion" description="Only one item can be open at a time (single mode).">
          <Accordion type="single" defaultValue="item-1">
            {["Item One", "Item Two", "Item Three"].map((label, i) => (
              <AccordionItem key={i} value={`item-${i + 1}`}>
                <AccordionTrigger value={`item-${i + 1}`}>{label}</AccordionTrigger>
                <AccordionContent value={`item-${i + 1}`}>
                  This is the content for <strong>{label}</strong>. It collapses and expands with a smooth animation. Only one accordion item can be open at a time in single mode.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </DemoCard>

        {/* Multiple open */}
        <DemoCard title="Multiple Open" description="Multiple items can be expanded simultaneously.">
          <Accordion type="multiple" defaultValue={["m-1", "m-2"]}>
            {["First Section", "Second Section", "Third Section"].map((label, i) => (
              <AccordionItem key={i} value={`m-${i + 1}`}>
                <AccordionTrigger value={`m-${i + 1}`}>{label}</AccordionTrigger>
                <AccordionContent value={`m-${i + 1}`}>
                  <strong>{label}</strong> content. In multiple mode, you can expand several items at once. Great for comparison views or multi-section forms.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </DemoCard>

        {/* Plus/Minus Icon */}
        <DemoCard title="Plus / Minus Icon" description="Use +/− icons instead of chevrons for a different visual style.">
          <Accordion type="single" iconType="plus">
            {["Overview", "Features", "Pricing", "Support"].map((label, i) => (
              <AccordionItem key={i} value={`p-${i}`}>
                <AccordionTrigger value={`p-${i}`}>{label}</AccordionTrigger>
                <AccordionContent value={`p-${i}`}>
                  Content for the <strong>{label}</strong> section. The plus icon transitions to a minus when this item is expanded.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </DemoCard>

        {/* Flush Mode */}
        <DemoCard title="Flush Accordion" description="No outer border or rounded corners — blends seamlessly into parent containers.">
          <Accordion type="single" flush>
            {["Terms of Service", "Privacy Policy", "Cookie Policy"].map((label, i) => (
              <AccordionItem key={i} value={`f-${i}`}>
                <AccordionTrigger value={`f-${i}`}>{label}</AccordionTrigger>
                <AccordionContent value={`f-${i}`}>
                  The flush accordion removes the outer border and border-radius so it sits cleanly inside its parent container, such as a card or sidebar section.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </DemoCard>

        {/* With Icons */}
        <DemoCard title="Accordion with Icons" description="Trigger labels decorated with a leading icon.">
          <Accordion type="single">
            {settingsItems.map(({ icon: Icon, value, label, content }) => (
              <AccordionItem key={value} value={value}>
                <AccordionTrigger value={value}>
                  <span className="flex items-center gap-2.5">
                    <Icon className="size-4 text-muted-foreground shrink-0" />
                    {label}
                  </span>
                </AccordionTrigger>
                <AccordionContent value={value}>{content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </DemoCard>

        {/* Styled Accordion */}
        <DemoCard title="Styled Accordion" description="Custom header background for active/inactive states.">
          <Accordion type="single" defaultValue="s-0">
            {[
              { label: "Getting Started", icon: Zap,     value: "s-0", content: "Learn the basics — set up your workspace, invite team members, and create your first project in under 5 minutes." },
              { label: "Core Concepts",   icon: Package, value: "s-1", content: "Understand the fundamental building blocks: projects, tasks, teams, and workflows. These form the backbone of everything you'll do." },
              { label: "Advanced Usage",  icon: Settings,value: "s-2", content: "Explore automations, API integrations, custom roles, and webhooks. Unlock the full power of the platform for your team." },
            ].map(({ label, icon: Icon, value, content }) => (
              <AccordionItem key={value} value={value}>
                <AccordionTrigger
                  value={value}
                  className="bg-muted hover:bg-muted font-semibold text-foreground"
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="size-4 text-primary shrink-0" />
                    {label}
                  </span>
                </AccordionTrigger>
                <AccordionContent value={value}>{content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </DemoCard>

        {/* FAQ */}
        <DemoCard span2 title="FAQ Accordion" description="A realistic FAQ section using accordion — one item open at a time.">
          <Accordion type="single" defaultValue="faq-0">
            {faqItems.map(({ q, a }, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger value={`faq-${i}`}>
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="size-4 text-muted-foreground shrink-0" />
                    {q}
                  </span>
                </AccordionTrigger>
                <AccordionContent value={`faq-${i}`}>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </DemoCard>

      </div>
    </div>
  );
}

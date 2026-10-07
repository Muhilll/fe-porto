import type { Metadata } from "next";
import { ContactPanel } from "@/components/portfolio/contact/contact-panel";
import { ContactForm } from "@/components/portfolio/contact/contact-form";
import { SectionHeader } from "@/components/portfolio/shared/section-header";

export const metadata: Metadata = {
  title: "Contact & Consultations — Zail Yan Zali",
  description: "Get in touch for software engineering, web application consulting, or full-time opportunities.",
};

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge="Direct Inquiries"
          title="Let's Start a Conversation"
          description="Whether you have a specific scope of work, want to discuss an architectural roadmap, or just want to say hi."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <ContactPanel />
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

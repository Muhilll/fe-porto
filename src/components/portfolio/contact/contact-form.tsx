"use client";

import { useState } from "react";
import { Send, CheckCircle2, MessageSquare, Loader2 } from "lucide-react";
import { contactData } from "@/data/contact";
import { FadeIn } from "@/components/portfolio/shared/motion-wrapper";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("submitting");

    // Simulate async submission
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    }, 1200);
  };

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `Hello Zail, my name is ${formData.name || "a visitor"}.\n\nSubject: ${formData.subject || "General Inquiry"}\n\nMessage: ${formData.message || "I would like to discuss a project with you."}`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, "_blank");
  };

  return (
    <FadeIn delay={0.15}>
      <div className="p-8 sm:p-10 rounded-3xl border border-border/80 bg-background/90 space-y-6 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-foreground">Send a Message</h3>
          <p className="text-xs text-muted-foreground">
            Fill in the form below and I will respond to your inbox.
          </p>
        </div>

        {status === "success" ? (
          <div className="p-6 rounded-2xl bg-muted/60 border border-border/80 space-y-3 text-center py-10 animate-in fade-in duration-300">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h4 className="text-base font-semibold text-foreground">Message Dispatched!</h4>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Thank you for reaching out. I have received your message and will review it promptly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-mono font-medium text-foreground">
                  Your Name *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-mono font-medium text-foreground">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="subject" className="text-xs font-mono font-medium text-foreground">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Web App Architecture Consulting"
                className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs font-mono font-medium text-foreground">
                Message *
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your project, timeline, and requirements..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground resize-y"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs font-semibold bg-foreground text-background hover:opacity-90 disabled:opacity-50 transition-all shadow-sm"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppRedirect}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold border border-border/80 bg-background hover:bg-muted text-foreground transition-colors"
                title="Send directly to WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Via WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </FadeIn>
  );
}

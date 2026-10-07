"use client";

import { useState } from "react";
import { Send, CheckCircle2, MessageSquare, Loader2, AlertCircle, RotateCcw } from "lucide-react";
import { FadeIn } from "@/components/portfolio/shared/motion-wrapper";
import { useSendMessage } from "@/features/portfolio/contact/hooks/use-contact";
import { useProfile } from "@/features/portfolio/profile/hooks/use-profile";
import { getNormalizedProfile } from "@/features/portfolio/adapters";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sendMessageMutation = useSendMessage();
  const { data: apiProfile } = useProfile();
  const profile = getNormalizedProfile(apiProfile);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setErrorMessage(null);

    try {
      await sendMessageMutation.mutateAsync({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim() || undefined,
        message: formData.message.trim(),
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setErrorMessage(
        err?.response?.data?.error ||
          err?.message ||
          "Failed to dispatch message. Please try again or reach out directly via WhatsApp."
      );
    }
  };

  const handleWhatsAppRedirect = () => {
    const rawNumber = profile.whatsapp.replace(/[^0-9]/g, "");
    const waNumber = rawNumber || "6281234567890";
    const text = encodeURIComponent(
      `Hello ${profile.shortName || profile.name}, my name is ${formData.name || "a visitor"}.\n\nSubject: ${
        formData.subject || "General Inquiry"
      }\n\nMessage: ${formData.message || "I would like to discuss a project with you."}`
    );
    window.open(`https://wa.me/${waNumber}?text=${text}`, "_blank");
  };

  const isSubmitting = sendMessageMutation.isPending;

  return (
    <FadeIn delay={0.15}>
      <div className="p-8 sm:p-10 rounded-3xl border border-border/80 bg-background/90 space-y-6 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-foreground">Send a Message</h3>
          <p className="text-xs text-muted-foreground">
            Fill in the form below and I will respond to your inbox.
          </p>
        </div>

        {sendMessageMutation.isSuccess ? (
          <div className="p-8 rounded-2xl bg-muted/40 border border-border/80 space-y-4 text-center py-10 animate-in fade-in duration-300">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <div className="space-y-1">
              <h4 className="text-lg font-semibold text-foreground">Message Dispatched!</h4>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out. Your message has been sent to {profile.name}&apos;s dashboard inbox and will be reviewed promptly.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  sendMessageMutation.reset();
                  setErrorMessage(null);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-border/80 bg-background hover:bg-muted text-foreground transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Send another message</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 flex items-start gap-3 text-xs text-destructive">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

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
                disabled={isSubmitting}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs font-semibold bg-foreground text-background hover:opacity-90 disabled:opacity-50 transition-all shadow-sm cursor-pointer"
              >
                {isSubmitting ? (
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold border border-border/80 bg-background hover:bg-muted text-foreground transition-colors cursor-pointer"
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

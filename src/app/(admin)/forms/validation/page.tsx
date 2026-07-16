"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const inputCls = (err) =>
  `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors bg-card ${
    err ? "border-red-400 focus:ring-red-200 bg-red-50" : "border-border focus:ring-primary/20 focus:border-primary"
  }`;

function FieldError({ error }) {
  if (!error) return null;
  return <p className="text-xs text-red-600 mt-1">✗ {error.message}</p>;
}

function FieldSuccess({ show, message = "Looks good!" }) {
  if (!show) return null;
  return <p className="text-xs text-green-600 mt-1">✓ {message}</p>;
}

/* ─── 1. Registration Schema ─────────────────────── */
const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName:  z.string().min(2, "Last name must be at least 2 characters"),
  email:     z.string().email("Enter a valid email address"),
  password:  z.string().min(8, "Password must be at least 8 characters")
               .regex(/[A-Z]/, "Must contain at least one uppercase letter")
               .regex(/[0-9]/, "Must contain at least one number"),
  confirm:   z.string(),
  role:      z.string().min(1, "Please select a role"),
  terms:     z.literal(true, { errorMap: () => ({ message: "You must accept the terms" }) }),
}).refine((d) => d.password === d.confirm, { message: "Passwords do not match", path: ["confirm"] });

/* ─── 2. Profile Schema ───────────────────────────── */
const profileSchema = z.object({
  username: z.string().min(3).max(20).regex(/^[a-z0-9_]+$/, "Lowercase letters, numbers, underscores only"),
  bio:      z.string().max(200, "Bio must be 200 characters or less").optional(),
  website:  z.string().url("Enter a valid URL (include https://)").optional().or(z.literal("")),
  phone:    z.string().regex(/^\+?[1-9]\d{7,14}$/, "Invalid phone number").optional().or(z.literal("")),
  age:      z.coerce.number().min(18, "Must be at least 18").max(120, "Invalid age"),
});

function Section({ title, description, children }) {
  return (
    <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-4">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  );
}

export default function ValidationPage() {
  const [regDone, setRegDone] = useState(false);
  const [profDone, setProfDone] = useState(false);

  const reg = useForm({ resolver: zodResolver(registerSchema), mode: "onTouched" });
  const prof = useForm({ resolver: zodResolver(profileSchema), mode: "onChange" });

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Form Validation</h1>
        <p className="text-muted-foreground">Schema-driven validation with react-hook-form and Zod — real-time error messages, custom rules, and success states.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Registration Form */}
        <Section title="Registration Form" description="Validates on blur, shows errors inline.">
          {regDone ? (
            <div className="flex flex-col items-center py-6 gap-2">
              <CheckCircle2 className="size-10 text-green-500" />
              <p className="font-semibold">Registration Successful!</p>
              <button onClick={() => { setRegDone(false); reg.reset(); }} className="text-sm text-primary underline">Reset</button>
            </div>
          ) : (
            <form onSubmit={reg.handleSubmit(() => setRegDone(true))} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">First Name</label>
                  <input {...reg.register("firstName")} placeholder="John" className={inputCls(reg.formState.errors.firstName)} />
                  <FieldError error={reg.formState.errors.firstName} />
                  <FieldSuccess show={reg.getFieldState("firstName").isDirty && !reg.formState.errors.firstName} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Last Name</label>
                  <input {...reg.register("lastName")} placeholder="Doe" className={inputCls(reg.formState.errors.lastName)} />
                  <FieldError error={reg.formState.errors.lastName} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                <input {...reg.register("email")} type="email" placeholder="john@example.com" className={inputCls(reg.formState.errors.email)} />
                <FieldError error={reg.formState.errors.email} />
                <FieldSuccess show={reg.getFieldState("email").isDirty && !reg.formState.errors.email} message="Valid email address" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Password</label>
                <input {...reg.register("password")} type="password" placeholder="••••••••" className={inputCls(reg.formState.errors.password)} />
                <FieldError error={reg.formState.errors.password} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Confirm Password</label>
                <input {...reg.register("confirm")} type="password" placeholder="••••••••" className={inputCls(reg.formState.errors.confirm)} />
                <FieldError error={reg.formState.errors.confirm} />
                <FieldSuccess show={reg.getFieldState("confirm").isDirty && !reg.formState.errors.confirm} message="Passwords match" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Role</label>
                <select {...reg.register("role")} className={inputCls(reg.formState.errors.role)}>
                  <option value="">Select role...</option>
                  <option>Admin</option><option>Editor</option><option>Viewer</option>
                </select>
                <FieldError error={reg.formState.errors.role} />
              </div>
              <label className="flex items-start gap-2 text-sm cursor-pointer">
                <input {...reg.register("terms")} type="checkbox" className="mt-0.5 accent-primary size-4 rounded" />
                <span>I accept the <span className="text-primary underline">Terms and Conditions</span></span>
              </label>
              <FieldError error={reg.formState.errors.terms} />
              <button type="submit" className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                Create Account
              </button>
            </form>
          )}
        </Section>

        {/* Profile Form — onChange */}
        <Section title="Profile Form (onChange)" description="Validates on every keystroke for instant feedback.">
          {profDone ? (
            <div className="flex flex-col items-center py-6 gap-2">
              <CheckCircle2 className="size-10 text-green-500" />
              <p className="font-semibold">Profile Saved!</p>
              <button onClick={() => { setProfDone(false); prof.reset(); }} className="text-sm text-primary underline">Reset</button>
            </div>
          ) : (
            <form onSubmit={prof.handleSubmit(() => setProfDone(true))} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Username</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-border rounded-l-lg bg-muted text-sm text-muted-foreground">@</span>
                  <input {...prof.register("username")} placeholder="johndoe" className={`flex-1 border rounded-r-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors ${prof.formState.errors.username ? "border-red-400 focus:ring-red-200" : "border-border focus:ring-primary/20 focus:border-primary"}`} />
                </div>
                <FieldError error={prof.formState.errors.username} />
                <FieldSuccess show={prof.getFieldState("username").isDirty && !prof.formState.errors.username} message="Username available" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Age</label>
                <input {...prof.register("age")} type="number" placeholder="25" className={inputCls(prof.formState.errors.age)} />
                <FieldError error={prof.formState.errors.age} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Phone <span className="text-muted-foreground font-normal">(optional)</span></label>
                <input {...prof.register("phone")} placeholder="+12345678900" className={inputCls(prof.formState.errors.phone)} />
                <FieldError error={prof.formState.errors.phone} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Website <span className="text-muted-foreground font-normal">(optional)</span></label>
                <input {...prof.register("website")} placeholder="https://yoursite.com" className={inputCls(prof.formState.errors.website)} />
                <FieldError error={prof.formState.errors.website} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Bio</label>
                <textarea {...prof.register("bio")} rows={3} placeholder="Tell us about yourself..." className={inputCls(prof.formState.errors.bio) + " resize-none"} />
                <div className="flex justify-between">
                  <FieldError error={prof.formState.errors.bio} />
                  <span className="text-xs text-muted-foreground">{(prof.watch("bio") || "").length}/200</span>
                </div>
              </div>
              <button type="submit" className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                Save Profile
              </button>
            </form>
          )}
        </Section>

      </div>
    </div>
  );
}

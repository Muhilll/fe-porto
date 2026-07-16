"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, ChevronRight, User, Briefcase, CreditCard, CheckCircle2 } from "lucide-react";

const steps = [
  { id: 1, title: "Account",  icon: User },
  { id: 2, title: "Profile",  icon: Briefcase },
  { id: 3, title: "Payment",  icon: CreditCard },
  { id: 4, title: "Confirm",  icon: Check },
];

const schemas = [
  z.object({
    email:    z.string().email("Valid email required"),
    password: z.string().min(8, "Min 8 characters"),
    confirm:  z.string(),
  }).refine((d) => d.password === d.confirm, { message: "Passwords don't match", path: ["confirm"] }),

  z.object({
    firstName: z.string().min(2, "Required"),
    lastName:  z.string().min(2, "Required"),
    company:   z.string().optional(),
    role:      z.string().min(1, "Please select a role"),
  }),

  z.object({
    cardName:   z.string().min(3, "Name on card required"),
    cardNumber: z.string().regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Format: 1234 5678 9012 3456"),
    expiry:     z.string().regex(/^\d{2}\/\d{2}$/, "Format: MM/YY"),
    cvv:        z.string().regex(/^\d{3,4}$/, "3 or 4 digits"),
    plan:       z.string().min(1, "Select a plan"),
  }),
];

const inputCls = (err) =>
  `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors bg-card ${
    err ? "border-red-400 focus:ring-red-200 bg-red-50" : "border-border focus:ring-primary/20 focus:border-primary"
  }`;

function FieldErr({ e }) {
  return e ? <p className="text-xs text-red-600 mt-1">✗ {e.message}</p> : null;
}

export default function WizardPage() {
  const [step, setStep]     = useState(1);
  const [data, setData]     = useState({});
  const [done, setDone]     = useState(false);

  const form = useForm({
    resolver: zodResolver(schemas[step - 1] || z.object({})),
    mode: "onTouched",
    defaultValues: data,
  });

  const { register, handleSubmit, formState: { errors }, watch } = form;

  const onNext = handleSubmit((vals) => {
    const merged = { ...data, ...vals };
    setData(merged);
    if (step < 3) setStep(step + 1);
    else setDone(true);
  });

  if (done) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 gap-4">
        <div className="size-20 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="size-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold">You're all set!</h2>
        <p className="text-muted-foreground">Account created for <strong>{data.email}</strong></p>
        <button onClick={() => { setStep(1); setData({}); setDone(false); }} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium mt-2">Start Over</button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 max-w-2xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Form Wizard</h1>
        <p className="text-muted-foreground">Multi-step form with per-step validation, progress indicator, and smooth navigation.</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isComplete = step > s.id;
          const isActive   = step === s.id;
          return (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5">
                <div className={`size-10 rounded-full flex items-center justify-center transition-colors ${isComplete ? "bg-green-500 text-white" : isActive ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                  {isComplete ? <Check className="size-5" /> : <Icon className="size-5" />}
                </div>
                <span className={`text-xs font-medium ${isActive ? "text-primary" : isComplete ? "text-green-600" : "text-muted-foreground"}`}>{s.title}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-4 ${step > s.id ? "bg-green-400" : "bg-gray-200"}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Form Card */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-muted">
          <h2 className="text-base font-semibold">{steps[step - 1].title} Information</h2>
          <p className="text-xs text-muted-foreground">Step {step} of 3</p>
        </div>

        <form onSubmit={onNext} className="p-6 space-y-4">
          {/* Step 1: Account */}
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email Address</label>
                <input {...register("email")} type="email" placeholder="you@example.com" className={inputCls(errors.email)} />
                <FieldErr e={errors.email} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Password</label>
                <input {...register("password")} type="password" placeholder="••••••••" className={inputCls(errors.password)} />
                <FieldErr e={errors.password} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Confirm Password</label>
                <input {...register("confirm")} type="password" placeholder="••••••••" className={inputCls(errors.confirm)} />
                <FieldErr e={errors.confirm} />
              </div>
            </>
          )}

          {/* Step 2: Profile */}
          {step === 2 && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">First Name</label>
                  <input {...register("firstName")} placeholder="John" className={inputCls(errors.firstName)} />
                  <FieldErr e={errors.firstName} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Last Name</label>
                  <input {...register("lastName")} placeholder="Doe" className={inputCls(errors.lastName)} />
                  <FieldErr e={errors.lastName} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Company <span className="text-muted-foreground font-normal">(optional)</span></label>
                <input {...register("company")} placeholder="Acme Corp" className={inputCls()} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Role</label>
                <select {...register("role")} className={inputCls(errors.role)}>
                  <option value="">Select your role...</option>
                  <option>Developer</option><option>Designer</option><option>Manager</option><option>Marketing</option><option>Other</option>
                </select>
                <FieldErr e={errors.role} />
              </div>
            </>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Select Plan</label>
                <div className="grid grid-cols-3 gap-3">
                  {[["free","Free","$0/mo","3 projects"],["pro","Pro","$9/mo","Unlimited"],["enterprise","Enterprise","$49/mo","Everything"]].map(([val, name, price, feat]) => (
                    <label key={val} className={`border-2 rounded-xl p-3 cursor-pointer transition-colors ${watch("plan") === val ? "border-primary bg-blue-50" : "border-border hover:border-primary/50"}`}>
                      <input {...register("plan")} type="radio" value={val} className="sr-only" />
                      <p className="text-sm font-semibold">{name}</p>
                      <p className="text-base font-bold text-primary">{price}</p>
                      <p className="text-xs text-muted-foreground">{feat}</p>
                    </label>
                  ))}
                </div>
                <FieldErr e={errors.plan} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Name on Card</label>
                <input {...register("cardName")} placeholder="John Doe" className={inputCls(errors.cardName)} />
                <FieldErr e={errors.cardName} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Card Number</label>
                <input {...register("cardNumber")} placeholder="1234 5678 9012 3456" className={inputCls(errors.cardNumber) + " font-mono"} />
                <FieldErr e={errors.cardNumber} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Expiry</label>
                  <input {...register("expiry")} placeholder="MM/YY" className={inputCls(errors.expiry) + " font-mono"} />
                  <FieldErr e={errors.expiry} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">CVV</label>
                  <input {...register("cvv")} placeholder="•••" type="password" className={inputCls(errors.cvv) + " font-mono"} />
                  <FieldErr e={errors.cvv} />
                </div>
              </div>
            </>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-2">
            <button type="button" onClick={() => setStep(s => s - 1)} disabled={step === 1}
              className="px-5 py-2 border border-border rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-muted transition-colors">
              ← Back
            </button>
            <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              {step === 3 ? "Complete" : "Next"} <ChevronRight className="size-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

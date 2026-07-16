"use client";

import { Check } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Basic",
      price: "$19",
      desc: "Perfect for individuals and small projects.",
      features: ["Up to 5 Users", "Basic Support", "10GB Storage", "Community Access"],
      buttonText: "Get Started",
      highlight: false
    },
    {
      name: "Professional",
      price: "$49",
      desc: "Ideal for growing teams and businesses.",
      features: ["Up to 50 Users", "Priority Support", "100GB Storage", "Advanced Analytics", "Custom Domain"],
      buttonText: "Start Free Trial",
      highlight: true
    },
    {
      name: "Enterprise",
      price: "$199",
      desc: "For large scale organizations with advanced needs.",
      features: ["Unlimited Users", "24/7 Dedicated Support", "Unlimited Storage", "Custom Integrations", "SLA Agreement", "Advanced Security"],
      buttonText: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground mt-3 text-lg">Choose the perfect plan for your business needs. No hidden fees, cancel anytime.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-center pt-8">
        {plans.map((plan) => (
          <div key={plan.name} className={`bg-card rounded-2xl border transition-all duration-300 ${plan.highlight ? 'border-blue-600 shadow-xl lg:-translate-y-4 ring-1 ring-blue-600' : 'border-border shadow-sm hover:shadow-md'}`}>
            {plan.highlight && (
              <div className="bg-blue-600 text-white text-xs font-bold uppercase tracking-wider text-center py-1.5 rounded-t-xl">
                Most Popular
              </div>
            )}
            <div className="p-8">
              <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mt-2 min-h-[40px]">{plan.desc}</p>
              
              <div className="my-6">
                <span className="text-4xl font-black text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <button className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-colors ${plan.highlight ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm' : 'bg-muted hover:bg-muted text-foreground border border-border'}`}>
                {plan.buttonText}
              </button>

              <div className="mt-8 space-y-4">
                <p className="text-sm font-semibold text-foreground uppercase tracking-wider">What's included</p>
                <ul className="space-y-3">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-3">
                      <div className="size-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <Check className="size-3 text-blue-600" />
                      </div>
                      <span className="text-sm text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

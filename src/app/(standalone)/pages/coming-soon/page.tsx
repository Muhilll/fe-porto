"use client";

import { useState } from "react";
import { Rocket, Send } from "lucide-react";

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <div className="w-full max-w-lg bg-white border border-gray-200 rounded-3xl shadow-sm p-12 text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
      
      <div className="relative">
        <div className="size-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Rocket className="size-8 text-blue-600" />
        </div>
        
        <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">We're launching soon</h1>
        <p className="text-gray-500 text-base mb-8 leading-relaxed">
          We're working hard to give you the best experience. Get notified when we launch!
        </p>

        {!done ? (
          <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="flex gap-2">
            <input 
              type="email" required placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)}
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-white shadow-sm"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl font-medium transition-colors shadow-sm flex items-center gap-2">
              Notify me
            </button>
          </form>
        ) : (
          <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-green-700 text-sm font-medium">
            Thanks! We'll notify you at {email} when we launch.
          </div>
        )}

        <div className="mt-10 grid grid-cols-4 gap-4 max-w-xs mx-auto">
          {[
            { v: "14", l: "Days" },
            { v: "08", l: "Hours" },
            { v: "45", l: "Mins" },
            { v: "12", l: "Secs" }
          ].map(t => (
            <div key={t.l} className="flex flex-col items-center">
              <div className="text-2xl font-bold text-gray-900">{t.v}</div>
              <div className="text-[10px] uppercase font-bold text-gray-500 mt-1 tracking-wider">{t.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

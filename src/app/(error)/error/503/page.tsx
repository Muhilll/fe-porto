"use client";

import Link from "next/link";
import { ArrowLeft, Settings } from "lucide-react";

export default function ServiceUnavailablePage() {
  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-500" />
      <div className="size-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <Settings className="size-10 text-gray-500 animate-[spin_4s_linear_infinite]" />
      </div>
      <h1 className="text-7xl font-black text-gray-900 mb-2 tracking-tighter">503</h1>
      <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wider">Service Unavailable</h2>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">
        Our servers are currently under maintenance. We'll be back shortly. Thank you for your patience.
      </p>
      <button onClick={() => window.location.reload()} className="inline-flex items-center justify-center w-full gap-2 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm mb-3">
        Refresh Page
      </button>
      <Link href="/dashboard" className="inline-flex items-center justify-center w-full gap-2 py-2.5 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 font-semibold rounded-xl text-sm transition-colors shadow-sm">
        <ArrowLeft className="size-4" /> Back to Dashboard
      </Link>
    </div>
  );
}

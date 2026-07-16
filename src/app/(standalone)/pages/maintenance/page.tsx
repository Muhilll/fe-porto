"use client";

import { Wrench } from "lucide-react";

export default function MaintenancePage() {
  return (
    <div className="w-full max-w-lg bg-white border border-gray-200 rounded-3xl shadow-sm p-12 text-center relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />
      
      <div className="size-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8 ring-8 ring-blue-50/50">
        <Wrench className="size-10 text-blue-600" />
      </div>
      
      <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">System Maintenance</h1>
      <p className="text-gray-500 text-base mb-8 leading-relaxed">
        We're currently updating our system to bring you a better experience. We'll be back online shortly. Thank you for your patience!
      </p>

      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
        <p className="text-sm font-semibold text-gray-900 mb-1">Estimated downtime</p>
        <p className="text-sm text-gray-500">2 Hours</p>
      </div>

      <p className="text-xs text-gray-500 mt-8">Need urgent help? Contact <a href="#" className="text-blue-600 hover:underline">support@example.com</a></p>
    </div>
  );
}

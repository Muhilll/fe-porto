import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function BadRequestPage() {
  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-yellow-400" />
      <div className="size-20 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <ShieldAlert className="size-10 text-yellow-500" />
      </div>
      <h1 className="text-7xl font-black text-gray-900 mb-2 tracking-tighter">400</h1>
      <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wider">Bad Request</h2>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">
        The server could not understand the request due to invalid syntax. Please check your request and try again.
      </p>
      <Link href="/dashboard" className="inline-flex items-center justify-center w-full gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm">
        <ArrowLeft className="size-4" /> Back to Dashboard
      </Link>
    </div>
  );
}

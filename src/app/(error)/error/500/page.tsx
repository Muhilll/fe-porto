import Link from "next/link";
import { ArrowLeft, ServerCrash } from "lucide-react";

export default function ServerErrorPage() {
  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-purple-500" />
      <div className="size-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <ServerCrash className="size-10 text-purple-500" />
      </div>
      <h1 className="text-7xl font-black text-gray-900 mb-2 tracking-tighter">500</h1>
      <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wider">Internal Server Error</h2>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">
        The server encountered an internal error or misconfiguration and was unable to complete your request.
      </p>
      <Link href="/dashboard" className="inline-flex items-center justify-center w-full gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm">
        <ArrowLeft className="size-4" /> Back to Dashboard
      </Link>
    </div>
  );
}

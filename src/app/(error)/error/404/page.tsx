import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-500" />
      <div className="size-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <FileQuestion className="size-10 text-blue-500" />
      </div>
      <h1 className="text-7xl font-black text-gray-900 mb-2 tracking-tighter">404</h1>
      <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wider">Not Found</h2>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/dashboard" className="inline-flex items-center justify-center w-full gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm">
        <ArrowLeft className="size-4" /> Back to Dashboard
      </Link>
    </div>
  );
}

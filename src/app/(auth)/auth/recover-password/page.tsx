"use client";

import { useState } from "react";
import Link from "next/link";
import { Hexagon, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

const inputCls = "w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-white";

export default function RecoverPasswordPage() {
  const [email, setEmail]     = useState("");
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-6 justify-center">
          <div className="bg-blue-600 rounded-lg p-1.5">
            <Hexagon className="size-5 text-white fill-white" />
          </div>
          <span className="font-bold text-lg text-gray-900">Enterprise Core</span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          {!sent ? (
            <>
              <div className="size-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-5">
                <Mail className="size-6 text-blue-600" />
              </div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Forgot password?</h2>
                <p className="text-gray-500 mt-1.5 text-sm leading-relaxed">
                  No worries! Enter your email address and we'll send you a password reset link.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1.5">Email address</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className={inputCls} />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-sm">
                  {loading ? <><span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending…</> : "Send reset link"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="size-14 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="size-7 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Check your inbox</h2>
                <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                  We sent a password reset link to<br />
                  <span className="text-gray-900 font-semibold">{email}</span>
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-left space-y-1.5">
                <p className="text-xs font-semibold text-gray-500">Didn't receive the email?</p>
                <ul className="text-xs text-gray-500 space-y-1 list-disc list-inside">
                  <li>Check your spam or junk folder</li>
                  <li>Make sure you entered the correct email</li>
                  <li>Wait a few minutes and check again</li>
                </ul>
              </div>
              <button onClick={() => { setSent(false); setEmail(""); }}
                className="w-full py-2.5 border border-gray-200 text-gray-900 font-medium rounded-xl text-sm hover:bg-gray-50 transition-colors">
                Try a different email
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link href="/auth/login" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
              <ArrowLeft className="size-4" /> Back to sign in
            </Link>
          </div>
        </div>

        {sent && (
          <p className="text-center text-xs text-gray-500 mt-3">
            Link expires in <span className="text-gray-500 font-medium">15 minutes</span>
          </p>
        )}
      </div>
    </div>
  );
}

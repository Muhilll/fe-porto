"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Hexagon, Mail, ArrowLeft, CheckCircle2, RefreshCw } from "lucide-react";

export default function ConfirmMailPage() {
  const [code, setCode]           = useState(["", "", "", "", "", ""]);
  const [verified, setVerified]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [countdown, setCountdown] = useState(0);
  const inputs = useRef([]);

  const handleKey = (i, e) => {
    const val = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...code]; next[i] = val; setCode(next);
    if (val && i < 5) inputs.current[i + 1]?.focus();
    if (e.key === "Backspace" && !code[i] && i > 0) inputs.current[i - 1]?.focus();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    setCode(Array.from({ length: 6 }, (_, i) => pasted[i] || ""));
    inputs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.join("").length < 6) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setVerified(true); }, 1500);
  };

  const handleResend = () => { setCountdown(60); };

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  if (verified) {
    return (
      <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center p-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10 max-w-md w-full text-center">
          <div className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="size-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Email verified!</h2>
          <p className="text-gray-500 text-sm mb-7 leading-relaxed">
            Your email has been successfully verified. You can now access your account.
          </p>
          <Link href="/auth/login" className="block w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors text-center shadow-sm">
            Continue to sign in
          </Link>
        </div>
      </div>
    );
  }

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
          <div className="size-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-5 mx-auto">
            <Mail className="size-6 text-blue-600" />
          </div>

          <div className="text-center mb-7">
            <h2 className="text-2xl font-bold text-gray-900">Verify your email</h2>
            <p className="text-gray-500 mt-2 text-sm leading-relaxed">
              We sent a 6-digit verification code to<br />
              <span className="text-gray-900 font-semibold">j***@example.com</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP inputs */}
            <div className="flex gap-2 justify-center" onPaste={handlePaste}>
              {code.map((digit, i) => (
                <input
                  key={i} ref={el => inputs.current[i] = el}
                  type="text" inputMode="numeric" maxLength={1}
                  value={digit}
                  onChange={e => handleKey(i, e)}
                  onKeyDown={e => e.key === "Backspace" && handleKey(i, e)}
                  className={`w-11 h-[52px] text-center text-xl font-bold text-gray-900 border-2 rounded-xl focus:outline-none transition-all bg-white ${
                    digit ? "border-blue-500 bg-blue-50" : "border-gray-200 focus:border-blue-400"
                  }`}
                />
              ))}
            </div>

            <button type="submit" disabled={loading || code.join("").length < 6}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-sm">
              {loading ? <><span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Verifying…</> : "Verify email"}
            </button>
          </form>

          <div className="mt-5 text-center">
            {countdown === 0 ? (
              <button onClick={handleResend} className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium">
                <RefreshCw className="size-3.5" /> Resend code
              </button>
            ) : (
              <p className="text-sm text-gray-500">Resend code in <span className="text-gray-900 font-semibold">{countdown}s</span></p>
            )}
          </div>

          <div className="mt-4 text-center">
            <Link href="/auth/login" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
              <ArrowLeft className="size-4" /> Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

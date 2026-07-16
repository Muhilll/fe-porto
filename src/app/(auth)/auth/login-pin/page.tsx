"use client";

import { useState } from "react";
import Link from "next/link";
import { Hexagon, ArrowLeft, ShieldCheck, Delete } from "lucide-react";

const CORRECT_PIN = "2580";

export default function LoginPinPage() {
  const [pin, setPin]         = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked]   = useState(false);

  const addDigit = (d) => {
    if (pin.length >= 4 || locked || loading) return;
    setError("");
    const next = pin + d;
    setPin(next);
    if (next.length === 4) setTimeout(() => verify(next), 150);
  };

  const delDigit = () => { setError(""); setPin(p => p.slice(0, -1)); };

  const verify = (p) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (p === CORRECT_PIN) {
        setSuccess(true);
      } else {
        const next = attempts + 1;
        setAttempts(next);
        setPin("");
        if (next >= 3) { setLocked(true); setError("Too many attempts. Account locked for 30 minutes."); }
        else setError(`Incorrect PIN. ${3 - next} attempt${3 - next !== 1 ? "s" : ""} remaining.`);
      }
    }, 800);
  };

  const keys = ["1","2","3","4","5","6","7","8","9","","0","del"];

  if (success) {
    return (
      <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center p-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10 max-w-sm w-full text-center">
          <div className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="size-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-500 text-sm mb-6">PIN verified. Redirecting to dashboard…</p>
          <div className="flex justify-center gap-1.5 mb-6">
            {[0,1,2,3].map(i => <div key={i} className="size-3 rounded-full bg-green-500" />)}
          </div>
          <Link href="/" className="block w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors text-center shadow-sm">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-6 justify-center">
          <div className="bg-blue-600 rounded-lg p-1.5">
            <Hexagon className="size-5 text-white fill-white" />
          </div>
          <span className="font-bold text-lg text-gray-900">Enterprise Core</span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          {/* Avatar */}
          <div className="text-center mb-6">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=AdminUser&backgroundColor=b6e3f4"
              className="size-16 rounded-full mx-auto mb-3 bg-blue-100 border-4 border-blue-50"
              alt="User"
            />
            <p className="font-semibold text-gray-900">Alex Johnson</p>
            <p className="text-gray-500 text-xs">admin@example.com</p>
          </div>

          <div className="text-center mb-5">
            <h2 className="text-lg font-bold text-gray-900">Enter your PIN</h2>
            <p className="text-gray-500 text-xs mt-0.5">Enter your 4-digit security PIN</p>
          </div>

          {/* PIN dots */}
          <div className="flex justify-center gap-4 mb-5">
            {[0,1,2,3].map(i => (
              <div key={i} className={`size-4 rounded-full border-2 transition-all duration-150 ${
                loading ? "border-blue-400 bg-blue-400 scale-110" :
                error   ? "border-red-400 bg-red-400" :
                i < pin.length ? "border-blue-600 bg-blue-600" : "border-gray-200 bg-transparent"
              }`} />
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 text-center">
              {error}
            </div>
          )}

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-2">
            {keys.map((k, i) => {
              if (k === "") return <div key={`pad-${i}`} />;
              if (k === "del") return (
                <button key={`pad-${i}`} onClick={delDigit} disabled={!pin.length || locked || loading}
                  className="h-14 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-30">
                  <Delete className="size-5" />
                </button>
              );
              return (
                <button key={`pad-${i}`} onClick={() => addDigit(k)} disabled={locked || loading || pin.length >= 4}
                  className="h-14 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-xl font-semibold hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-30">
                  {k}
                </button>
              );
            })}
          </div>

          <p className="text-center text-xs text-gray-500 mt-4">
            Demo PIN: <span className="text-gray-500 font-mono tracking-widest font-semibold">2580</span>
          </p>

          <div className="mt-4 text-center">
            <Link href="/auth/login" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors">
              <ArrowLeft className="size-3.5" /> Sign in with password instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

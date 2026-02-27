"use client";

import { useState } from "react";
import { createBrowserClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const router = useRouter();
  const supabase = createBrowserClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError("Invalid email or password."); setLoading(false); return; }
    router.refresh();
    router.push("/dashboard");
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/dashboard`,
    });
    setResetSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-surface-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-surface-900">Outraro</span>
          </a>
        </div>

        <div className="bg-white border border-surface-200 rounded-2xl p-8 shadow-sm">
          {!showReset ? (
            <>
              <h1 className="text-2xl font-bold text-surface-900 text-center mb-2">Welcome back</h1>
              <p className="text-surface-500 text-sm text-center mb-8">Log in to access your Outraro dashboard</p>
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1.5">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 bg-surface-50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
                    placeholder="you@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1.5">Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 bg-surface-50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
                    placeholder="Your password" />
                </div>
                {error && <p className="text-red-600 text-sm text-center bg-red-50 border border-red-100 rounded-lg px-4 py-2">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 rounded-xl text-sm glow-btn transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>
              <button onClick={() => setShowReset(true)}
                className="w-full text-brand-600 hover:text-brand-700 text-sm font-medium mt-4 transition-colors cursor-pointer">
                Forgot your password?
              </button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-surface-900 text-center mb-2">Reset password</h1>
              <p className="text-surface-500 text-sm text-center mb-8">Enter your email and we'll send a reset link</p>
              {resetSent ? (
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-surface-600 text-sm">Check your inbox for a reset link.</p>
                </div>
              ) : (
                <form onSubmit={handlePasswordReset} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-1.5">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                      className="w-full px-4 py-3 rounded-xl border border-surface-300 bg-surface-50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
                      placeholder="you@company.com" />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 rounded-xl text-sm glow-btn transition-all disabled:opacity-50 cursor-pointer">
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>
                </form>
              )}
              <button onClick={() => { setShowReset(false); setResetSent(false); }}
                className="w-full text-brand-600 hover:text-brand-700 text-sm font-medium mt-4 transition-colors cursor-pointer">
                Back to login
              </button>
            </>
          )}
        </div>
        <p className="text-surface-400 text-xs text-center mt-6">
          Not a member yet?{" "}
          <a href="/#pricing" className="text-brand-600 hover:text-brand-700 font-medium">Join Outraro</a>
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { createBrowserClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import SalesProfileEditor from "@/components/sales-profile-editor";

export default function AccountPage() {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createBrowserClient();
  const router = useRouter();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setError("Failed to update password. Please try again.");
    } else {
      setMessage("Password updated successfully.");
      setNewPassword("");
    }
    setLoading(false);
  };

  const handleManageBilling = async () => {
    try {
      const res = await fetch("/api/billing-portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error("Billing portal error:", err);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-surface-900 mb-8">
        Account Settings
      </h2>

      <SalesProfileEditor />

      <div className="bg-white border border-surface-200 rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-surface-900 mb-4">
          Change Password
        </h3>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-3 rounded-xl border border-surface-300 bg-surface-50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
              placeholder="Minimum 8 characters"
            />
          </div>
          {message && (
            <p className="text-emerald-600 text-sm bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-2">
              {message}
            </p>
          )}
          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg px-4 py-2">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-6 rounded-xl text-sm glow-btn transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>

      <div className="bg-white border border-surface-200 rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-surface-900 mb-2">
          Subscription
        </h3>
        <p className="text-surface-500 text-sm mb-4">
          Manage your billing, update payment method, or cancel your
          subscription through Stripe&apos;s secure portal.
        </p>
        <button
          onClick={handleManageBilling}
          className="border border-surface-300 hover:border-surface-400 text-surface-700 hover:text-surface-900 font-semibold py-3 px-6 rounded-xl text-sm transition-all cursor-pointer"
        >
          Manage Billing
        </button>
      </div>

      <div className="bg-white border border-surface-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-surface-900 mb-2">
          Sign Out
        </h3>
        <p className="text-surface-500 text-sm mb-4">
          Sign out of your Outraro account on this device.
        </p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 border border-red-200 hover:border-red-300 text-red-600 hover:text-red-700 hover:bg-red-50 font-semibold py-3 px-6 rounded-xl text-sm transition-all cursor-pointer"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Sign Out
        </button>
      </div>
    </div>
  );
}

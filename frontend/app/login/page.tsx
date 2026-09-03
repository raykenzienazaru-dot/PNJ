"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { apiGet, apiPostJson } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError(signInError.message || "Email or password is incorrect.");
      setLoading(false);
      return;
    }

    // Email-confirmed registrations may not have a profile until their first login
    // when the optional database trigger has not yet been applied.
    try {
      const current = await apiGet("/api/auth/me");
      const metadata = data.user?.user_metadata || {};
      if (!current.profile && metadata.company_name) {
        await apiPostJson("/api/auth/company-profile", {
          company_name: metadata.company_name,
          contact_name: metadata.contact_name || null,
          industry: metadata.industry || null,
        });
      }
    } catch {
      // The workspace can still open and surface backend availability separately.
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="grid min-h-screen bg-base lg:grid-cols-2">
      <section className="hidden bg-deep p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Link href="/" className="font-display text-2xl font-semibold">FABRIX <span className="text-sage">AI</span></Link>
        <div className="max-w-lg">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-sage">Point. Capture. Analyze.</p>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-tight">Your material intelligence workspace.</h1>
          <p className="mt-5 leading-7 text-white/60">Return to your saved fabric analyses, comparisons, passports, and reports.</p>
        </div>
        <p className="text-xs text-white/35">Predict. Compare. Optimize.</p>
      </section>

      <section className="flex items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <Link href="/" className="font-display text-xl font-semibold text-deep lg:hidden">FABRIX <span className="text-secondary">AI</span></Link>
          <p className="mt-10 font-mono text-xs uppercase tracking-[0.18em] text-secondary lg:mt-0">Welcome back</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-deep">Sign in to FABRIX AI</h2>
          <p className="mt-3 text-sm leading-6 text-muted">Continue to your fabric intelligence workspace.</p>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <Field label="Company Email" type="email" value={email} onChange={setEmail} autoComplete="email" />
            <Field label="Password" type="password" value={password} onChange={setPassword} autoComplete="current-password" />
            {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
            <button type="submit" disabled={loading} className="min-h-12 w-full rounded-xl bg-primary px-6 text-sm font-semibold text-white transition hover:bg-secondary disabled:opacity-60">
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-sm text-muted">New to FABRIX? <Link href="/register" className="font-semibold text-primary underline decoration-sage underline-offset-4">Create an account</Link></p>
        </div>
      </section>
    </main>
  );
}

function Field({ label, type, value, onChange, autoComplete }: { label: string; type: string; value: string; onChange: (value: string) => void; autoComplete: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-deep">{label}</span>
      <input type={type} required value={value} onChange={(event) => onChange(event.target.value)} autoComplete={autoComplete} className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-deep transition placeholder:text-muted focus:border-primary" />
    </label>
  );
}

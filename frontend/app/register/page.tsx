"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { apiPostJson } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ contactName: "", companyName: "", industry: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setMessage(null);
    setIsError(false);
    if (form.password !== form.confirm) {
      setIsError(true);
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            company_name: form.companyName,
            contact_name: form.contactName,
            industry: form.industry || null,
          },
        },
      });
      if (error) throw error;

      if (data.session) {
        await apiPostJson("/api/auth/company-profile", {
          company_name: form.companyName,
          contact_name: form.contactName,
          industry: form.industry || null,
        });
        router.push("/dashboard");
        router.refresh();
      } else {
        setMessage("Account created. Check your email to confirm your address, then sign in.");
      }
    } catch (error) {
      setIsError(true);
      setMessage(error instanceof Error ? error.message : "Registration could not be completed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-base px-5 py-10 sm:px-6">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-border bg-white shadow-card lg:grid-cols-[0.8fr,1.2fr]">
        <section className="bg-deep p-8 text-white sm:p-10">
          <Link href="/" className="font-display text-2xl font-semibold">FABRIX <span className="text-sage">AI</span></Link>
          <h1 className="mt-16 font-display text-4xl font-semibold">Start with one clear fabric capture.</h1>
          <p className="mt-4 text-sm leading-7 text-white/60">Create your company workspace to save analyses, build a reusable history, compare materials, and export reports.</p>
          <div className="mt-10 space-y-4 text-sm text-white/75">
            {["Camera-first analysis", "User-owned analysis history", "PDF-ready saved results"].map((item) => <p key={item} className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-sage" />{item}</p>)}
          </div>
        </section>

        <section className="p-7 sm:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-secondary">Create workspace</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-deep">Register your company</h2>
          <form onSubmit={submit} className="mt-8 grid gap-5 sm:grid-cols-2">
            <Field label="Full Name" value={form.contactName} onChange={(value) => update("contactName", value)} />
            <Field label="Company / Organization" value={form.companyName} onChange={(value) => update("companyName", value)} />
            <Field label="Industry (optional)" value={form.industry} onChange={(value) => update("industry", value)} required={false} />
            <Field label="Work Email" type="email" value={form.email} onChange={(value) => update("email", value)} />
            <Field label="Password" type="password" value={form.password} onChange={(value) => update("password", value)} minLength={6} />
            <Field label="Confirm Password" type="password" value={form.confirm} onChange={(value) => update("confirm", value)} minLength={6} />
            {message && <p role={isError ? "alert" : "status"} className={`sm:col-span-2 rounded-xl border px-4 py-3 text-sm ${isError ? "border-red-200 bg-red-50 text-red-700" : "border-sage bg-pale text-primary"}`}>{message}</p>}
            <button type="submit" disabled={loading} className="min-h-12 rounded-xl bg-primary px-6 text-sm font-semibold text-white transition hover:bg-secondary disabled:opacity-60 sm:col-span-2">
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
          <p className="mt-6 text-sm text-muted">Already have an account? <Link href="/login" className="font-semibold text-primary underline decoration-sage underline-offset-4">Sign in</Link></p>
        </section>
      </div>
    </main>
  );
}

function Field({ label, value, onChange, type = "text", required = true, minLength }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; minLength?: number }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-deep">{label}</span>
      <input type={type} required={required} minLength={minLength} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-xl border border-border bg-base px-4 py-3 text-sm text-deep transition focus:border-primary" />
    </label>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message || "Email atau kata sandi salah.");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-base bg-weave px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8">
        <Link href="/" className="font-display text-lg text-ink">
          FABRIX <span className="text-gold">AI</span>
        </Link>
        <h1 className="mt-6 font-display text-2xl text-ink">Masuk ke ruang kerja</h1>
        <p className="mt-2 font-body text-sm text-muted">
          Lanjutkan analisis material kain perusahaan Anda.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="font-body text-xs text-muted">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border bg-surface2 px-4 py-2.5 font-body text-sm text-ink outline-none transition focus:border-gold"
            />
          </label>
          <label className="block">
            <span className="font-body text-xs text-muted">Kata sandi</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border bg-surface2 px-4 py-2.5 font-body text-sm text-ink outline-none transition focus:border-gold"
            />
          </label>

          {error && (
            <p className="rounded-lg border border-gold/40 bg-gold/10 px-4 py-3 font-body text-sm text-ink">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gold px-6 py-3 font-body text-sm font-medium text-base transition hover:bg-goldSoft disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="mt-6 font-body text-sm text-muted">
          Belum punya akun?{" "}
          <Link href="/register" className="text-ink underline decoration-border underline-offset-4 hover:decoration-gold">
            Daftarkan perusahaan
          </Link>
        </p>
      </div>
    </main>
  );
}

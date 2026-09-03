"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { apiPostJson } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) throw signUpError;

      // If email confirmation is required, there is no session yet.
      if (data.session) {
        await apiPostJson("/api/auth/company-profile", {
          company_name: companyName,
          contact_name: contactName,
        });
        router.push("/dashboard");
      } else {
        setError(
          "Pendaftaran berhasil. Silakan cek email Anda untuk konfirmasi sebelum masuk."
        );
      }
    } catch (err: any) {
      setError(err.message || "Gagal mendaftar. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-base bg-weave px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8">
        <Link href="/" className="font-display text-lg text-ink">
          FABRIX <span className="text-gold">AI</span>
        </Link>
        <h1 className="mt-6 font-display text-2xl text-ink">Daftarkan perusahaan Anda</h1>
        <p className="mt-2 font-body text-sm text-muted">
          Buat ruang kerja untuk mulai menganalisis kandidat kain.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <Field
            label="Nama perusahaan"
            value={companyName}
            onChange={setCompanyName}
            required
          />
          <Field
            label="Nama kontak (PIC)"
            value={contactName}
            onChange={setContactName}
          />
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            required
          />
          <Field
            label="Kata sandi"
            type="password"
            value={password}
            onChange={setPassword}
            required
            minLength={6}
          />

          {error && (
            <p className="rounded-lg border border-teal/40 bg-teal/10 px-4 py-3 font-body text-sm text-ink">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gold px-6 py-3 font-body text-sm font-medium text-base transition hover:bg-goldSoft disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Buat akun"}
          </button>
        </form>

        <p className="mt-6 font-body text-sm text-muted">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-ink underline decoration-border underline-offset-4 hover:decoration-gold">
            Masuk di sini
          </Link>
        </p>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  minLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <label className="block">
      <span className="font-body text-xs text-muted">{label}</span>
      <input
        type={type}
        required={required}
        minLength={minLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-border bg-surface2 px-4 py-2.5 font-body text-sm text-ink outline-none transition focus:border-gold"
      />
    </label>
  );
}

"use client";

import { useEffect, useState } from "react";
import AppShell, { AppLoading } from "@/components/AppShell";
import { apiPostJson } from "@/lib/api";
import { useAppSession } from "@/lib/useAppSession";

export default function SettingsPage() {
  const auth = useAppSession();
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [industry, setIndustry] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!auth.profile) return;
    // The profile arrives asynchronously after Supabase session validation.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCompanyName(auth.profile.company_name || "");
    setContactName(auth.profile.contact_name || "");
    setIndustry(auth.profile.industry || "");
  }, [auth.profile]);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const response = await apiPostJson("/api/auth/company-profile", {
        company_name: companyName,
        contact_name: contactName || null,
        industry: industry || null,
      });
      auth.setProfile(response.profile);
      setMessage("Profile saved.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Profile could not be saved.");
    } finally {
      setSaving(false);
    }
  }

  if (auth.loading) return <AppLoading label="Loading settings..." />;

  return (
    <AppShell title="Settings" description="Keep the company profile linked to your authenticated workspace up to date." profile={auth.profile} email={auth.session?.user.email}>
      <form onSubmit={save} className="max-w-2xl rounded-3xl border border-border bg-white p-6 shadow-card sm:p-8">
        <h2 className="font-display text-2xl font-semibold text-deep">Company Profile</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field label="Company / Organization" value={companyName} onChange={setCompanyName} required />
          <Field label="Contact Name" value={contactName} onChange={setContactName} />
          <Field label="Industry" value={industry} onChange={setIndustry} />
          <label className="block"><span className="text-xs font-semibold text-deep">Account Email</span><input value={auth.session?.user.email || ""} readOnly className="mt-2 w-full cursor-not-allowed rounded-xl border border-border bg-surface2 px-4 py-3 text-sm text-muted" /></label>
        </div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="submit" disabled={saving || !companyName.trim()} className="min-h-11 rounded-xl bg-primary px-6 text-sm font-semibold text-white transition hover:bg-secondary disabled:opacity-50">{saving ? "Saving..." : "Save Profile"}</button>
          {message && <p className="text-sm text-secondary" aria-live="polite">{message}</p>}
        </div>
      </form>
    </AppShell>
  );
}

function Field({ label, value, onChange, required = false }: { label: string; value: string; onChange: (value: string) => void; required?: boolean }) {
  return <label className="block"><span className="text-xs font-semibold text-deep">{label}</span><input value={value} required={required} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-xl border border-border bg-base px-4 py-3 text-sm text-deep focus:border-primary" /></label>;
}

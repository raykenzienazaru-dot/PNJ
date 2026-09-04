"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { CompanyProfile } from "@/types/analysis";

const navigation = [
  {
    label: "Overview",
    items: [{ href: "/dashboard", label: "Dashboard" }],
  },
  {
    label: "Analysis",
    items: [
      { href: "/scan", label: "Scan Fabric" },
      { href: "/history", label: "Analysis History" },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { href: "/optimizer", label: "What-If Optimizer" },
      { href: "/comparison", label: "Fabric Comparison" },
    ],
  },
  {
    label: "Library",
    items: [{ href: "/passport", label: "Fabric Passport" }],
  },
];

type Props = {
  children: React.ReactNode;
  title: string;
  description?: string;
  profile?: CompanyProfile | null;
  email?: string | null;
  action?: React.ReactNode;
};

export default function AppShell({ children, title, description, profile, email, action }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  const sidebar = (
    <div className="flex h-full flex-col bg-deep text-white">
      <div className="border-b border-white/10 px-6 py-6">
        <Link href="/dashboard" className="font-display text-xl font-semibold tracking-tight">
          FABRIX <span className="text-sage">AI</span>
        </Link>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-sage">
          Predict. Compare. Optimize.
        </p>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-6" aria-label="Application navigation">
        {navigation.map((group) => (
          <div key={group.label}>
            <p className="px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
              {group.label}
            </p>
            <div className="mt-2 space-y-1">
              {group.items.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                      active
                        ? "bg-white text-deep shadow-sm"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 rounded-full ${active ? "bg-secondary" : "bg-sage/60"}`}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <Link
          href="/settings"
          onClick={() => setMenuOpen(false)}
          className={`block rounded-xl px-3 py-2.5 text-sm transition ${
            pathname === "/settings"
              ? "bg-white text-deep"
              : "text-white/70 hover:bg-white/10 hover:text-white"
          }`}
        >
          Settings
        </Link>
        <button
          type="button"
          onClick={signOut}
          className="mt-1 w-full rounded-xl px-3 py-2.5 text-left text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-base text-ink">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">{sidebar}</aside>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-deep/60 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="relative h-full w-[min(82vw,18rem)] shadow-2xl">{sidebar}</aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-border bg-white/90 backdrop-blur-xl">
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                aria-label="Open navigation"
                onClick={() => setMenuOpen(true)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border text-xl lg:hidden"
              >
                ≡
              </button>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-deep">
                  {profile?.company_name || "FABRIX Workspace"}
                </p>
                <p className="truncate text-xs text-muted">{email || "Material intelligence"}</p>
              </div>
            </div>
            <Link
              href="/scan"
              className="hidden rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-secondary sm:inline-flex"
            >
              Scan Fabric
            </Link>
          </div>
        </header>

        <main className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h1 className="font-display text-3xl font-semibold tracking-tight text-deep sm:text-4xl">
                  {title}
                </h1>
                {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{description}</p>}
              </div>
              {action}
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export function AppLoading({ label = "Loading workspace..." }: { label?: string }) {
  return (
    <main className="grid min-h-screen place-items-center bg-base">
      <div className="text-center">
        <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-sage border-t-primary" />
        <p className="mt-4 font-mono text-xs text-muted">{label}</p>
      </div>
    </main>
  );
}

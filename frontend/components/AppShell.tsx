"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FileScan,
  Files,
  Gauge,
  GitCompareArrows,
  History,
  LogOut,
  Menu,
  ScanLine,
  Settings,
  SlidersHorizontal,
  X,
  type LucideIcon,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import type { CompanyProfile } from "@/types/analysis";
import BrandLogo from "./BrandLogo";

type NavigationItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

type NavigationGroup = {
  label: string;
  items: NavigationItem[];
};

const navigation: NavigationGroup[] = [
  {
    label: "Utama",
    items: [{ href: "/dashboard", label: "Ringkasan", icon: Gauge }],
  },
  {
    label: "Analisis",
    items: [
      { href: "/scan", label: "Scan Kain", icon: ScanLine },
      { href: "/history", label: "Riwayat Analisis", icon: History },
    ],
  },
  {
    label: "Eksplorasi",
    items: [
      { href: "/optimizer", label: "What-If Optimizer", icon: SlidersHorizontal },
      { href: "/comparison", label: "Perbandingan Kain", icon: GitCompareArrows },
    ],
  },
  {
    label: "Pustaka",
    items: [{ href: "/passport", label: "Paspor Kain", icon: Files }],
  },
];

type SidebarContentProps = {
  expanded: boolean;
  pathname: string;
  profile?: CompanyProfile | null;
  email?: string | null;
  onNavigate?: () => void;
  onClose?: () => void;
  onSignOut: () => void;
};

function SidebarText({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ duration: 0.16 }}
      className="min-w-0 whitespace-nowrap"
    >
      {children}
    </motion.span>
  );
}

function SidebarContent({
  expanded,
  pathname,
  profile,
  email,
  onNavigate,
  onClose,
  onSignOut,
}: SidebarContentProps) {
  const workspaceName = profile?.company_name || "Ruang Kerja FABRIX";
  const initial = workspaceName.trim().charAt(0).toUpperCase() || "F";

  return (
    <div className="flex h-full min-h-0 flex-col bg-deep text-white">
      <div className="relative shrink-0 border-b border-white/10 px-[22px] py-5">
        <Link
          href="/dashboard"
          onClick={onNavigate}
          aria-label="FABRIX AI — Ringkasan"
          className="flex h-9 items-center gap-3 overflow-hidden"
        >
          <span className="shrink-0">
            <BrandLogo showText={false} />
          </span>
          <AnimatePresence initial={false}>
            {expanded && (
              <SidebarText>
                <span className="font-display text-xl font-semibold tracking-tight text-white">
                  FABRIX <span className="text-sage">AI</span>
                </span>
              </SidebarText>
            )}
          </AnimatePresence>
        </Link>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.16 }}
              className="mt-2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] text-sage"
            >
              Deteksi. Bandingkan. Optimalkan.
            </motion.p>
          )}
        </AnimatePresence>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup navigasi"
            className="absolute right-4 top-5 grid h-9 w-9 place-items-center rounded-xl border border-white/10 text-white/75 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>

      <nav className="min-h-0 flex-1 space-y-4 overflow-y-auto overflow-x-hidden px-2 py-4" aria-label="Navigasi aplikasi">
        {navigation.map((group) => (
          <div key={group.label}>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                expanded ? "mb-1.5 h-4 opacity-100" : "mb-1 h-1 opacity-0"
              }`}
            >
              <p className="whitespace-nowrap px-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
                {group.label}
              </p>
            </div>
            <div className="space-y-1">
              {group.items.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`));
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    aria-label={expanded ? undefined : item.label}
                    title={expanded ? undefined : item.label}
                    className={`group flex h-11 items-center overflow-hidden rounded-xl transition-colors duration-200 ${
                      expanded ? "gap-3 px-3" : "justify-center px-0"
                    } ${
                      active
                        ? "bg-white text-deep shadow-sm"
                        : "text-white/65 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon
                      className={`h-[19px] w-[19px] shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                        active ? "text-secondary" : "text-sage"
                      }`}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <SidebarText>
                          <span className="block truncate text-sm">{item.label}</span>
                        </SidebarText>
                      )}
                    </AnimatePresence>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-white/10 p-2">
        <div
          className={`mb-1 flex h-12 items-center overflow-hidden rounded-xl bg-white/[0.04] ${
            expanded ? "gap-3 px-2.5" : "justify-center px-0"
          }`}
          title={expanded ? undefined : workspaceName}
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-sage font-display text-sm font-semibold text-deep">
            {initial}
          </span>
          <AnimatePresence initial={false}>
            {expanded && (
              <SidebarText>
                <span className="block max-w-[174px]">
                  <span className="block truncate text-xs font-semibold text-white">{workspaceName}</span>
                  <span className="mt-0.5 block truncate text-[10px] text-white/45">
                    {email || "Analisis material"}
                  </span>
                </span>
              </SidebarText>
            )}
          </AnimatePresence>
        </div>

        <Link
          href="/settings"
          onClick={onNavigate}
          aria-label={expanded ? undefined : "Pengaturan"}
          title={expanded ? undefined : "Pengaturan"}
          className={`flex h-10 items-center overflow-hidden rounded-xl text-sm transition-colors ${
            expanded ? "gap-3 px-3" : "justify-center px-0"
          } ${
            pathname === "/settings"
              ? "bg-white text-deep"
              : "text-white/65 hover:bg-white/10 hover:text-white"
          }`}
        >
          <Settings className="h-[18px] w-[18px] shrink-0 text-sage" strokeWidth={1.8} aria-hidden="true" />
          <AnimatePresence initial={false}>{expanded && <SidebarText>Pengaturan</SidebarText>}</AnimatePresence>
        </Link>
        <button
          type="button"
          onClick={onSignOut}
          aria-label={expanded ? undefined : "Keluar"}
          title={expanded ? undefined : "Keluar"}
          className={`flex h-10 w-full items-center overflow-hidden rounded-xl text-sm text-white/65 transition-colors hover:bg-white/10 hover:text-white ${
            expanded ? "gap-3 px-3" : "justify-center px-0"
          }`}
        >
          <LogOut className="h-[18px] w-[18px] shrink-0 text-sage" strokeWidth={1.8} aria-hidden="true" />
          <AnimatePresence initial={false}>{expanded && <SidebarText>Keluar</SidebarText>}</AnimatePresence>
        </button>
      </div>
    </div>
  );
}

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
  const [desktopOpen, setDesktopOpen] = useState(false);

  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <div className="min-h-screen bg-base text-ink">
      <motion.aside
        initial={false}
        animate={{ width: desktopOpen ? 264 : 76 }}
        transition={{ duration: 0.24, ease: "easeInOut" }}
        onMouseEnter={() => setDesktopOpen(true)}
        onMouseLeave={() => setDesktopOpen(false)}
        onFocusCapture={() => setDesktopOpen(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setDesktopOpen(false);
          }
        }}
        className={`fixed inset-y-0 left-0 z-40 hidden overflow-hidden border-r border-white/10 lg:block ${
          desktopOpen ? "shadow-2xl shadow-deep/20" : ""
        }`}
      >
        <SidebarContent
          expanded={desktopOpen}
          pathname={pathname}
          profile={profile}
          email={email}
          onSignOut={signOut}
        />
      </motion.aside>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <button
              type="button"
              aria-label="Tutup navigasi"
              className="absolute inset-0 bg-deep/65 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.26, ease: "easeInOut" }}
              className="relative h-full w-full max-w-sm shadow-2xl"
            >
              <SidebarContent
                expanded
                pathname={pathname}
                profile={profile}
                email={email}
                onNavigate={() => setMenuOpen(false)}
                onClose={() => setMenuOpen(false)}
                onSignOut={signOut}
              />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="lg:pl-[76px]">
        <header className="sticky top-0 z-30 border-b border-border bg-white/90 backdrop-blur-xl">
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                aria-label="Buka navigasi"
                onClick={() => setMenuOpen(true)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border text-deep transition hover:bg-surface2 lg:hidden"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-deep">
                  {profile?.company_name || "Ruang Kerja FABRIX"}
                </p>
                <p className="truncate text-xs text-muted">{email || "Analisis material"}</p>
              </div>
            </div>
            <Link
              href="/scan"
              className="hidden items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-secondary sm:inline-flex"
            >
              <FileScan className="h-4 w-4" aria-hidden="true" />
              Scan Kain
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

export function AppLoading({ label = "Menyiapkan ruang kerja..." }: { label?: string }) {
  return (
    <main className="grid min-h-screen place-items-center bg-base">
      <div className="text-center">
        <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-sage border-t-primary" />
        <p className="mt-4 font-mono text-xs text-muted">{label}</p>
      </div>
    </main>
  );
}

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-base/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-lg tracking-tight text-ink">
            FABRIX <span className="text-gold">AI</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 font-body text-sm text-muted md:flex">
          <Link href="/#tentang" className="transition hover:text-ink">
            Tentang
          </Link>
          <Link href="/#alur" className="transition hover:text-ink">
            Alur Kerja
          </Link>
          <Link href="/#fitur" className="transition hover:text-ink">
            Fitur
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="font-body text-sm text-muted transition hover:text-ink"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-gold px-4 py-2 font-body text-sm font-medium text-base transition hover:bg-goldSoft"
          >
            Daftar Perusahaan
          </Link>
        </div>
      </div>
    </header>
  );
}

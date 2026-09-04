import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-deep/90 text-white backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight">
          FABRIX <span className="text-sage">AI</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-white/65 md:flex" aria-label="Navigasi utama">
          <Link href="/#produk" className="transition hover:text-white">Produk</Link>
          <Link href="/#teknologi" className="transition hover:text-white">Teknologi</Link>
          <Link href="/#dampak" className="transition hover:text-white">Dampak</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-white/75 transition hover:text-white">Masuk</Link>
          <Link
            href="/register"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-deep transition hover:bg-pale"
          >
            Mulai Sekarang
          </Link>
        </div>
      </div>
    </header>
  );
}

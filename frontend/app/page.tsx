import Link from "next/link";
import Navbar from "@/components/Navbar";

const steps = [
  ["01", "Aim", "Open the camera and position the fabric inside the scan frame."],
  ["02", "Capture", "Take a clear close-up shot — no long forms to fill in."],
  ["03", "Analyze", "Securely submit the capture through the FABRIX system."],
  ["04", "Decide", "Review the results, save the analysis, then download the report."],
];

const capabilities = [
  "Direct in-camera image capture",
  "AI-assisted fabric analysis",
  "Fabric durability indicator",
  "Material comparison",
  "Saved fabric passport",
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-base">
      <Navbar />

      <section className="relative overflow-hidden bg-deep text-white">
        <div className="absolute inset-0 bg-weave opacity-50" />
        <div className="relative mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-6 md:grid-cols-[1.05fr,0.95fr] md:items-center md:py-28">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-sage">Camera-based fabric analysis</p>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Understand your fabric before production.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/68 sm:text-lg">
              Capture a fabric photo straight from your camera, get material insights in seconds, and save the results to support production decisions.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-deep transition hover:bg-pale"
              >
                Start Fabric Analysis
              </Link>
              <Link
                href="/#produk"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 px-6 text-sm font-semibold text-white transition hover:border-sage hover:bg-white/5"
              >
                Learn How It Works
              </Link>
            </div>
            <p className="mt-5 text-xs leading-5 text-white/45">
              Results are decision support, not a substitute for laboratory testing or certification.
            </p>
          </div>

          <div className="mx-auto w-full max-w-lg rounded-[2rem] border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-secondary to-deep">
              <div className="absolute inset-0 bg-weave opacity-80" />
              <div className="absolute inset-[11%] rounded-2xl border border-white/60">
                <span className="absolute -left-px -top-px h-12 w-12 rounded-tl-2xl border-l-4 border-t-4 border-sage" />
                <span className="absolute -right-px -top-px h-12 w-12 rounded-tr-2xl border-r-4 border-t-4 border-sage" />
                <span className="absolute -bottom-px -left-px h-12 w-12 rounded-bl-2xl border-b-4 border-l-4 border-sage" />
                <span className="absolute -bottom-px -right-px h-12 w-12 rounded-br-2xl border-b-4 border-r-4 border-sage" />
                <div className="scan-line" />
              </div>
              <div className="absolute inset-x-0 bottom-8 text-center">
                <span className="rounded-full bg-deep/70 px-4 py-2 text-xs font-medium text-white backdrop-blur">Fabric Scan Area</span>
              </div>
            </div>
            <div className="flex items-center justify-between px-2 pb-1 pt-4">
              <div>
                <p className="text-sm font-semibold">Aim. Capture. Analyze.</p>
                <p className="mt-1 text-xs text-white/50">One simple flow from camera to result.</p>
              </div>
              <span className="h-11 w-11 rounded-full border-[5px] border-white bg-sage shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-5 py-5 text-xs font-semibold uppercase tracking-wide text-muted sm:px-6">
          <span className="text-primary">Built for</span>
          <span>Textile Research</span>
          <span>Fashion Brands</span>
          <span>Material Teams</span>
          <span>Sustainability Teams</span>
        </div>
      </section>

      <section id="produk" className="mx-auto max-w-6xl px-5 py-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary">A leaner workflow</p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-deep">Aim. Capture. Analyze. Decide.</h2>
          <p className="mt-4 leading-7 text-muted">
            FABRIX is built around a camera-first experience. Every result is saved to your history and can be reopened to compare, view as a fabric passport, or download as a PDF.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([number, title, description]) => (
            <article key={number} className="rounded-2xl border border-border bg-white p-6 shadow-card">
              <span className="font-mono text-xs font-semibold text-secondary">{number}</span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-deep">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="teknologi" className="bg-pale/45">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary">Material insight</p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-deep">Clear information based on the data available.</h2>
            <p className="mt-4 leading-7 text-muted">
              FABRIX only displays values returned by the analysis service. Simulated results are clearly flagged, without inventing accuracy, units, lifespan, or certification claims.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {capabilities.map((capability) => (
              <div key={capability} className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4 text-sm font-semibold text-deep">
                <span className="h-2 w-2 rounded-full bg-secondary" />
                {capability}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="dampak" className="mx-auto max-w-6xl px-5 py-20 sm:px-6">
        <div className="rounded-3xl bg-primary px-6 py-12 text-white sm:px-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-sage">Built for responsible innovation</p>
          <div className="mt-4 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <h2 className="max-w-2xl font-display text-4xl font-semibold">Make better material decisions before production.</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/65">Support more focused innovation and material evaluation without overstating environmental impact.</p>
            </div>
            <Link href="/register" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-deep transition hover:bg-pale">Get Started</Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-white px-5 py-8 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 text-xs text-muted sm:flex-row">
          <span className="font-semibold text-deep">FABRIX AI · Predict. Compare. Optimize.</span>
          <span>© 2026 FABRIX AI · Built for ITECHNO CUP 2026</span>
        </div>
      </footer>
    </main>
  );
}

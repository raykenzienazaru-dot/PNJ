import Navbar from "@/components/Navbar";
import Link from "next/link";

const flow = [
  { step: "Analyze", desc: "Pindai gambar close-up kain melalui kamera atau unggah file." },
  { step: "Predict", desc: "Model memperkirakan microplastic shedding dan durability index." },
  { step: "Compare", desc: "Bandingkan 2–5 kandidat material berdampingan." },
  { step: "Optimize", desc: "Ubah komposisi atau perawatan, jalankan skenario what-if." },
  { step: "Save", desc: "Simpan sebagai Fabric Digital Passport untuk riwayat perusahaan." },
  { step: "Decide", desc: "Ambil keputusan produksi dengan data pendukung yang jelas." },
];

const features = [
  {
    title: "Multimodal Fabric Scanner",
    desc: "Menggabungkan gambar close-up kain dengan data komposisi, struktur, dan washing condition dalam satu pemindaian.",
  },
  {
    title: "Microplastic Shedding Prediction",
    desc: "Estimasi awal potensi pelepasan mikroplastik sebagai bahan pertimbangan sebelum produksi massal.",
  },
  {
    title: "Fabric Durability Index",
    desc: "Indikator ketahanan material berdasarkan fitur visual dan data terstruktur yang diproses model.",
  },
  {
    title: "What-If Material Optimizer",
    desc: "Ubah parameter material dan lihat perubahan prediksi tanpa memindai ulang.",
  },
  {
    title: "Smart Fabric Comparison",
    desc: "Susun hingga lima kandidat kain berdampingan untuk memudahkan keputusan tim R&D.",
  },
  {
    title: "Fabric Digital Passport",
    desc: "Riwayat analisis tersimpan rapi per perusahaan, siap diekspor sebagai laporan B2B.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-base">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-[1.1fr,0.9fr] md:py-28">
          <div>
            <p className="font-mono text-xs text-teal">predict before you produce</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.1] text-ink md:text-6xl">
              Uji kandidat kain lewat kamera,{" "}
              <em className="font-display italic text-gold">sebelum</em> ia sampai
              ke lini produksi.
            </h1>
            <p className="mt-6 max-w-lg font-body text-base leading-relaxed text-muted">
              FABRIX AI membaca gambar close-up kain dan data komposisinya, lalu
              memperkirakan potensi pelepasan mikroplastik dan daya tahan material —
              sehingga tim R&D dan procurement punya dasar keputusan yang lebih cepat
              dan terukur.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="rounded-full bg-gold px-6 py-3 font-body text-sm font-medium text-base transition hover:bg-goldSoft"
              >
                Mulai analisis gratis
              </Link>
              <Link
                href="/login"
                className="font-body text-sm text-ink underline decoration-border underline-offset-4 transition hover:decoration-gold"
              >
                Sudah punya akun? Masuk
              </Link>
            </div>
            <p className="mt-6 font-mono text-xs text-muted">
              AI-assisted decision support — bukan pengganti pengujian laboratorium.
            </p>
          </div>

          {/* Hero visual: scanning grid */}
          <div className="relative mx-auto aspect-square w-full max-w-sm rounded-2xl border border-border bg-surface bg-weave">
            <div className="absolute inset-4 overflow-hidden rounded-xl border border-border/80 bg-surface2">
              <div className="scan-line" />
              <div className="flex h-full flex-col justify-between p-5">
                <div className="flex items-center justify-between font-mono text-[10px] text-muted">
                  <span>SCAN_ID · 0x4F2A</span>
                  <span className="text-teal">LIVE</span>
                </div>
                <div className="space-y-2 font-mono text-[11px] text-ink">
                  <div className="flex justify-between">
                    <span className="text-muted">shedding_index</span>
                    <span className="text-gold">0.34</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">durability_index</span>
                    <span className="text-gold">0.81</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">class</span>
                    <span>cotton_weave</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tentang */}
      <section id="tentang" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-ink">
              Terlalu banyak kandidat kain, terlalu sedikit waktu untuk mengujinya semua.
            </h2>
          </div>
          <p className="font-body leading-relaxed text-muted">
            Industri fashion dan tekstil perlu mengevaluasi banyak kandidat material
            sebelum produksi — mempertimbangkan karakteristik visual, komposisi serat,
            perawatan, daya tahan, hingga potensi pelepasan mikroplastik. FABRIX AI
            menggabungkan seluruh pertimbangan itu ke dalam satu alur kerja berbasis AI,
            supaya tim brand, manufaktur, dan sustainability bisa membandingkan pilihan
            dengan data, bukan tebakan.
          </p>
        </div>
      </section>

      <div className="thread-divider mx-6" />

      {/* Alur */}
      <section id="alur" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-3xl text-ink">Enam langkah, satu keputusan.</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {flow.map((item, i) => (
            <div key={item.step} className="rounded-xl border border-border bg-surface p-6">
              <span className="font-mono text-xs text-teal">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-xl text-ink">{item.step}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="thread-divider mx-6" />

      {/* Fitur */}
      <section id="fitur" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-3xl text-ink">Fitur untuk tim yang memutuskan.</h2>
        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="bg-surface p-6">
              <h3 className="font-display text-lg text-ink">{f.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-16 md:flex-row md:items-center">
          <h2 className="max-w-md font-display text-3xl text-ink">
            Pindai kandidat kain pertama Anda hari ini.
          </h2>
          <Link
            href="/register"
            className="rounded-full bg-gold px-6 py-3 font-body text-sm font-medium text-base transition hover:bg-goldSoft"
          >
            Daftarkan perusahaan
          </Link>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 font-mono text-xs text-muted md:flex-row">
          <span>FABRIX AI — Predict. Compare. Optimize.</span>
          <span>Made by Tim SATORU for ITECHNO CUP 2026</span>
        </div>
      </footer>
    </main>
  );
}

# FABRIX AI — Implementasi Full-Stack

Implementasi awal (MVP) dari konsep di `README.MD` project asli: platform B2B untuk
memindai kain lewat kamera web, memprediksi microplastic shedding & fabric durability
index, membandingkan kandidat, dan menjalankan skenario what-if.

Struktur mengikuti arsitektur di README asli: **Next.js Frontend → Express.js Backend →
AI Service (YOLO / EfficientNet+XGBoost)**, dengan **Supabase** sebagai database, storage
gambar, dan authentication.

```
fabrix-ai/
├── frontend/      # Next.js 14 (App Router) + Tailwind
├── backend/       # Express.js (orchestrator + Supabase + AI Service client)
└── supabase/      # schema.sql — tabel, RLS policy, storage bucket
```

## Alur yang diimplementasikan

1. **Landing page** (`/`) — penjelasan produk, tanpa hasil scan apa pun ditampilkan.
2. **Register** (`/register`) & **Login** (`/login`) — Supabase Auth (email/password).
3. **Dashboard** (`/dashboard`, protected) —
   - Tab **Pindai Kain**: live camera stream (`getUserMedia`) + tombol ambil gambar,
     atau unggah file sebagai fallback; input komposisi/struktur/washing condition.
   - Hasil analisis **muncul di jendela pop-up (modal)**, bukan di halaman — sesuai
     permintaan.
   - Tab **Riwayat**: daftar analisis tersimpan (Fabric Digital Passport sederhana),
     klik untuk membuka kembali hasilnya di modal yang sama.
   - Tab **Bandingkan**: pilih 2–5 hasil analisis dan lihat tabel perbandingan.
   - Endpoint what-if (`POST /api/scan/:id/whatif`) tersedia di backend untuk
     dihubungkan ke UI lanjutan.

## AI Service (YOLO) — penting

Repository asli menyatakan model & dataset **belum tersedia**. Backend karena itu
dibangun agar **pluggable**:

- `backend/services/yoloService.js` mengirim gambar (base64) + data fabric ke
  `YOLO_SERVICE_URL` (server inference Anda sendiri — Ultralytics YOLO HTTP server,
  Roboflow, atau FastAPI custom yang membungkus EfficientNet-B0 + XGBoost late fusion).
- Jika `YOLO_SERVICE_URL` belum diisi atau tidak bisa diakses, backend otomatis
  **fallback ke mock inference** (`ALLOW_MOCK_INFERENCE=true`) agar alur
  kamera → scan → pop-up hasil tetap bisa didemokan. Setiap hasil mock ditandai
  `result_source: "mock"` dan modal menampilkan badge peringatan — tidak pernah
  disamarkan sebagai hasil model asli.
- Set `ALLOW_MOCK_INFERENCE=false` setelah AI Service asli terhubung.

Contoh kontrak request/response yang diharapkan backend dari AI Service ada di
komentar `backend/.env.example` dan `yoloService.js`.

## Setup cepat

### 1. Supabase

1. Buat project baru di [supabase.com](https://supabase.com).
2. Buka **SQL Editor**, jalankan isi `supabase/schema.sql`.
3. Catat `Project URL`, `anon public key`, dan `service_role key` dari
   **Project Settings → API**.

### 2. Backend

```bash
cd backend
cp .env.example .env   # isi SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, dll.
npm install
npm run dev             # http://localhost:4000
```

### 3. Frontend

```bash
cd frontend
cp .env.local.example .env.local   # isi NEXT_PUBLIC_SUPABASE_URL, ANON_KEY, API_URL
npm install
npm run dev              # http://localhost:3000
```

Buka `http://localhost:3000`, klik **Daftar Perusahaan**, lalu masuk ke dashboard
untuk mencoba alur pindai kain.

> Kamera live memerlukan konteks aman (`https://` atau `localhost`) — browser modern
> memblokir `getUserMedia` pada HTTP biasa selain localhost.

## Yang masih perlu dilengkapi untuk produksi

Konsisten dengan status "direncanakan/dalam pengembangan" di README asli:

- Menyambungkan `YOLO_SERVICE_URL` ke AI Service nyata (EfficientNet-B0 + XGBoost
  late fusion) setelah dataset & model final tersedia.
- Export Fabric Report (PDF) — belum diimplementasikan.
- Storage bucket saat ini **public** agar gambar mudah ditampilkan di modal; ubah ke
  private + signed URL bila gambar bersifat sensitif.
- Rate limiting, audit log, dan kebijakan retensi data perusahaan.

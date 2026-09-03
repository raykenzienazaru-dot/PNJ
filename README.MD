<div align="center">

# FABRIX AI

### Pahami kain sebelum diproduksi.

[![Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/raykenzienazaru-dot/PNJ)
[![Lisensi](https://img.shields.io/badge/Lisensi-MIT-235347?style=for-the-badge)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-051F20?style=for-the-badge&logo=next.js)](frontend/package.json)
[![Status](https://img.shields.io/badge/Status-Prototipe_Integrasi-8EB69B?style=for-the-badge)](#-status-pengembangan)

**Submission for ITECHNO CUP 2026 — Web Development**

**Tim SATORU**

</div>

---

## 📋 Daftar Isi

- [Tim Pengembang](#-tim-pengembang)
- [Tentang Proyek](#-tentang-proyek)
- [Fitur Unggulan](#-fitur-unggulan)
- [Teknologi](#-teknologi)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Struktur Database](#-struktur-database)
- [Struktur Folder](#-struktur-folder)
- [Instalasi dan Konfigurasi](#-instalasi-dan-konfigurasi)
- [Panduan Penggunaan](#-panduan-penggunaan)
- [Dokumentasi API](#-dokumentasi-api)
- [Pengujian](#-pengujian)
- [Keamanan](#-keamanan)
- [Status Pengembangan](#-status-pengembangan)
- [Lisensi](#-lisensi)

---

## 👥 Tim Pengembang

| Nama | Peran | GitHub |
| --- | --- | --- |
| **Evelly Khanzania Putri** | Pengembang AI | [Vkzapple](https://github.com/Vkzapple) |
| **Dhiyaa Fazila Nugraha** | Pengembang Full-Stack | [fzlngh](https://github.com/fzlngh) |
| **Raykenzie Nazaru Fathurrahmansyah** | Asisten Riset dan Pengembangan | [raykenzienazaru-dot](https://github.com/raykenzienazaru-dot) |

---

## 🎯 Tentang Proyek

### Latar Belakang

Tim riset, merek fesyen, produsen tekstil, dan bagian pengadaan perlu mengevaluasi banyak kandidat kain sebelum produksi. Informasi visual, komposisi, struktur, kondisi perawatan, daya tahan, dan potensi pelepasan mikroplastik sering tersebar pada proses yang berbeda sehingga pemeriksaan awal memerlukan waktu lebih lama.

FABRIX AI dikembangkan sebagai alat bantu pemeriksaan awal material. Aplikasi ini tidak menggantikan pengujian laboratorium, sertifikasi, atau keputusan tenaga ahli.

### Solusi yang Ditawarkan

FABRIX AI menyediakan alur utama berbasis kamera:

```text
Arahkan kamera → Ambil gambar → Analisis → Tinjau hasil → Simpan → Bandingkan atau unduh PDF
```

Pengguna tidak perlu mengunggah berkas secara manual atau mengisi formulir bertahap sebelum analisis. Gambar dari kamera dikirim ke backend, diteruskan ke layanan AI, disimpan di Supabase, lalu ditampilkan kembali sebagai hasil yang dapat digunakan ulang.

### Tujuan Proyek

- **Tujuan utama:** membantu pemeriksaan awal kandidat kain sebelum proses produksi.
- **Target pengguna:** tim riset tekstil, merek fesyen, produsen, tim material, tim keberlanjutan, dan pengadaan.
- **Nilai utama:** alur kamera yang singkat, hasil tersimpan, perbandingan material, paspor kain, dan laporan PDF dalam satu ruang kerja.
- **Arah SDG:** mendukung inovasi industri pada SDG 9 serta evaluasi material yang lebih bertanggung jawab dalam konteks SDG 11, tanpa mengklaim pencapaian target SDG secara langsung.

---

## ✨ Fitur Unggulan

### Fitur Utama

| Fitur | Implementasi | Keunggulan |
| --- | --- | --- |
| **Pemindai Kain Berbasis Kamera** | Meminta izin kamera saat halaman scan dibuka, memprioritaskan kamera belakang pada perangkat seluler, serta menyediakan bingkai panduan, ambil ulang, dan penanganan error. | Alur demonstrasi singkat tanpa unggah manual. |
| **Integrasi Analisis AI** | Frontend mengirim hasil tangkapan ke backend; backend meneruskannya ke layanan AI yang dikonfigurasi melalui environment variable. | Model dan credential server tidak ditempatkan di browser. |
| **Hasil Analisis Tersimpan** | Gambar disimpan pada Supabase Storage dan hasil disimpan pada tabel `fabric_analyses`. | Hasil dapat dibuka kembali tanpa menjalankan model ulang. |
| **Riwayat Analisis** | Menampilkan analisis milik pengguna yang sedang login, diurutkan dari data terbaru. | Setiap pengguna hanya melihat datanya sendiri. |
| **Perbandingan Kain** | Membandingkan 2–3 hasil tersimpan, termasuk gambar, indeks yang tersedia, dan karakteristik terdeteksi. | Tidak menentukan pemenang otomatis tanpa logika pemeringkatan yang tervalidasi. |
| **Laporan PDF** | Membuat PDF bermerek FABRIX AI dari data analisis yang telah tersimpan. | Tidak memanggil ulang layanan AI dan tidak mengarang nilai yang kosong. |

### Fitur Pendukung

- **Autentikasi Supabase:** registrasi, login, persistensi sesi, dan keluar akun.
- **Profil perusahaan:** nama perusahaan, penanggung jawab, industri, dan email akun.
- **Paspor kain:** tampilan identitas dari record analisis yang sama tanpa duplikasi data.
- **Penamaan kain:** hasil baru menggunakan nama awal `Untitled Fabric` dan dapat diubah setelah analisis.
- **What-If Optimizer:** pemilihan analisis dasar sudah berfungsi; parameter skenario menunggu schema input final dari layanan AI.
- **Hasil simulasi yang transparan:** fallback pengembangan selalu diberi label `DEMO RESULT`.
- **Responsif:** antarmuka disiapkan untuk desktop, tablet, dan perangkat seluler.

### Rute Aplikasi

| Route | Fungsi |
| --- | --- |
| `/` | Halaman utama produk |
| `/login` | Login email dan kata sandi melalui Supabase |
| `/register` | Registrasi akun dan perusahaan |
| `/dashboard` | Ringkasan dan analisis terbaru |
| `/scan` | Kamera, pengambilan gambar, dan proses analisis |
| `/analysis/[id]` | Detail hasil, penggantian nama, dan ekspor PDF |
| `/history` | Riwayat analisis pengguna dan aksi PDF |
| `/comparison` | Perbandingan 2–3 hasil analisis |
| `/optimizer` | Pemilihan baseline skenario What-If |
| `/passport` | Pustaka paspor kain |
| `/passport/[id]` | Detail paspor dari analisis tersimpan |
| `/settings` | Pengaturan profil perusahaan |

---

## 🛠 Teknologi

### Tech Stack

#### Frontend

| Teknologi | Versi | Kegunaan |
| --- | --- | --- |
| Next.js | `16.3.4` | App Router, routing, optimasi build, dan penyajian antarmuka |
| React | `18.3.1` | Komponen interaktif dan pengelolaan state antarmuka |
| TypeScript | `5.5.4` | Pemeriksaan tipe data pada frontend |
| Tailwind CSS | `3.4.7` | Sistem desain responsif dan palet visual FABRIX |
| Supabase JS | `2.45.4` | Autentikasi dan pengelolaan sesi di browser |
| jsPDF | `4.2.1` | Pembuatan dan pengunduhan laporan PDF |

#### Backend dan Data

| Teknologi | Versi | Kegunaan |
| --- | --- | --- |
| Node.js | `20.9+` | Runtime backend dan kebutuhan minimum Next.js |
| Express | `5.2.1` | REST API dan orkestrasi layanan |
| Multer | `2.3.0` | Pemrosesan gambar `multipart/form-data` di memori |
| Supabase | Layanan terkelola | Authentication, PostgreSQL, dan Storage |
| Helmet | `7.1.0` | Header keamanan HTTP |
| CORS | `2.8.5` | Pembatasan origin frontend |
| Morgan | `1.10.0` | Log permintaan saat pengembangan |
| node-fetch | `2.7.0` | Komunikasi backend dengan layanan AI |
| Adapter YOLO | Service backend | Menghubungkan gambar kain dari backend dengan server inference eksternal |

### Alasan Pemilihan Teknologi

| Teknologi | Alasan |
| --- | --- |
| **Next.js dan React** | Cocok untuk antarmuka interaktif berbasis route serta mendukung build produksi yang teroptimasi. |
| **TypeScript** | Mengurangi kesalahan bentuk data saat hasil analisis digunakan pada halaman detail, history, comparison, passport, dan PDF. |
| **Tailwind CSS** | Memudahkan konsistensi desain dan responsivitas tanpa menambah pustaka komponen besar. |
| **Express** | Menjadi lapisan terpercaya antara browser, Supabase, dan layanan AI. |
| **Supabase** | Menyediakan autentikasi, database PostgreSQL, dan penyimpanan gambar dalam satu layanan. |
| **YOLO** | Digunakan sebagai layanan deteksi visual eksternal agar proses inference tidak dijalankan di browser. |
| **jsPDF** | Menghasilkan laporan langsung dari data tersimpan tanpa membutuhkan proses AI baru. |

Deployment produksi, CI/CD, monitoring, dan test runner otomatis belum dikonfigurasi pada repository ini.

---

## 🏗 Arsitektur Sistem

```mermaid
flowchart LR
    U[Pengguna] --> FE[Frontend Next.js]
    FE --> AUTH[Supabase Auth]
    FE -->|Bearer token + gambar| BE[Backend Express]
    BE -->|Verifikasi sesi| AUTH
    BE --> YOLO[Layanan YOLO /predict]
    YOLO --> BE
    BE --> DB[(Supabase PostgreSQL)]
    BE --> ST[(Supabase Storage)]
    BE --> FE
    FE --> PDF[Laporan PDF]
    YOLO -. tidak tersedia .-> MOCK[Fallback mock berlabel demo]
    MOCK --> BE
```

### Fungsi YOLO dalam FABRIX AI

YOLO berfungsi sebagai layanan analisis visual yang menerima gambar kain dari backend. Integrasi ini ditempatkan di sisi server agar model, API key, dan proses inference tidak terekspos ke browser pengguna.

Alurnya adalah sebagai berikut:

1. Kamera frontend menghasilkan gambar kain.
2. Backend menerima dan memvalidasi gambar.
3. Adapter [`backend/services/yoloService.js`](backend/services/yoloService.js) mengirim gambar ke endpoint YOLO yang dikonfigurasi.
4. Response YOLO diteruskan ke proses penyimpanan analysis bersama hasil lain yang tersedia.
5. Jika service tidak dapat dihubungi dan `ALLOW_MOCK_INFERENCE=true`, backend memakai fallback pengembangan dengan `result_source: "mock"`.

Repository ini berisi adapter integrasi YOLO, tetapi belum menyertakan server Python atau file model YOLO. Karena itu, hasil fallback harus selalu dianggap sebagai data demonstrasi dan bukan hasil model tervalidasi.

### Alur Scan

1. Browser meminta izin kamera melalui `navigator.mediaDevices.getUserMedia()`.
2. Frame video digambar ke canvas dan diubah menjadi berkas JPEG.
3. Frontend mengirim gambar dan access token ke `POST /api/scan`.
4. Backend memverifikasi token melalui Supabase Auth.
5. Backend menyimpan gambar ke bucket `fabric-images` menggunakan path `user_id/nama-file`.
6. Backend memanggil layanan analisis yang telah dikonfigurasi.
7. Hasil disimpan pada `fabric_analyses` dan dikembalikan ke frontend.
8. Frontend membuka `/analysis/[id]` untuk menampilkan hasil yang tersimpan.

Frontend tidak memuat model AI dan tidak memiliki service-role key.

---

## 🗃 Struktur Database

```mermaid
erDiagram
    AUTH_USERS ||--o| COMPANY_PROFILES : memiliki
    AUTH_USERS ||--o{ FABRIC_ANALYSES : membuat
    FABRIC_ANALYSES ||--o{ FABRIC_ANALYSES : menjadi_baseline

    COMPANY_PROFILES {
        uuid user_id PK
        text company_name
        text industry
        text contact_name
        timestamptz created_at
        timestamptz updated_at
    }

    FABRIC_ANALYSES {
        uuid id PK
        uuid user_id FK
        text fabric_name
        text image_path
        text image_url
        jsonb composition
        jsonb structure
        jsonb washing_condition
        jsonb detections
        numeric microplastic_shedding_index
        numeric fabric_durability_index
        jsonb recommendation
        jsonb raw_result
        text result_source
        uuid parent_analysis_id FK
        timestamptz created_at
    }
```

Row Level Security aktif pada `company_profiles` dan `fabric_analyses`. Schema lengkap tersedia pada [`supabase/schema.sql`](supabase/schema.sql).

---

## 📁 Struktur Folder

```text
PNJ/
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── scan.js
│   ├── services/
│   │   ├── supabaseClient.js
│   │   └── yoloService.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── app/
│   │   ├── analysis/[id]/
│   │   ├── comparison/
│   │   ├── dashboard/
│   │   ├── history/
│   │   ├── login/
│   │   ├── optimizer/
│   │   ├── passport/[id]/
│   │   ├── register/
│   │   ├── scan/
│   │   └── settings/
│   ├── components/
│   ├── lib/
│   ├── types/
│   ├── .env.local.example
│   └── package.json
├── supabase/
│   └── schema.sql
├── LICENSE
└── README.MD
```

---

## ⚙ Instalasi dan Konfigurasi

### Prasyarat

- Git
- Node.js `20.9` atau lebih baru
- npm
- Proyek Supabase
- Browser dengan dukungan kamera
- Layanan AI yang kompatibel jika ingin menggunakan inference asli

> Kamera browser dapat digunakan melalui `localhost` saat pengembangan. Deployment produksi harus menggunakan HTTPS.

### 1. Clone Repository

```bash
git clone https://github.com/raykenzienazaru-dot/PNJ.git
cd PNJ
```

### 2. Siapkan Supabase

1. Buka **Supabase Dashboard → SQL Editor**.
2. Jalankan isi [`supabase/schema.sql`](supabase/schema.sql).
3. Pastikan tabel `company_profiles`, tabel `fabric_analyses`, dan bucket `fabric-images` tersedia.

SQL tersebut juga menambahkan RLS, trigger `updated_at`, serta trigger pembuatan profil setelah user terdaftar.

### 3. Siapkan Environment Frontend

```powershell
Copy-Item frontend/.env.local.example frontend/.env.local
```

Isi `frontend/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon-key
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 4. Siapkan Environment Backend

```powershell
Copy-Item backend/.env.example backend/.env
```

Isi `backend/.env`:

```env
PORT=4000
FRONTEND_ORIGIN=http://localhost:3000
SUPABASE_URL=https://project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=service-role-key
SUPABASE_JWT_SECRET=jwt-secret
YOLO_SERVICE_URL=http://localhost:8000/predict
YOLO_SERVICE_API_KEY=
ALLOW_MOCK_INFERENCE=true
```

`SUPABASE_JWT_SECRET` disiapkan untuk pengembangan verifikasi JWT berikutnya. Implementasi saat ini memverifikasi bearer token dengan `supabase.auth.getUser()`.

### 5. Instal Dependency

```powershell
cd backend
npm ci

cd ../frontend
npm ci
```

### 6. Jalankan Mode Development

Terminal backend:

```powershell
cd backend
npm run dev
```

Terminal frontend:

```powershell
cd frontend
npm run dev
```

Buka aplikasi melalui [http://localhost:3000](http://localhost:3000). Status backend dapat diperiksa melalui [http://localhost:4000/health](http://localhost:4000/health).

---

## 🚀 Panduan Penggunaan

### Alur Pengguna

1. Buka halaman utama dan pilih **Mulai Sekarang**.
2. Daftarkan akun perusahaan atau login dengan akun yang sudah ada.
3. Dari dashboard, pilih **Scan Fabric**.
4. Izinkan akses kamera pada browser.
5. Posisikan kain dekat kamera dengan cahaya cukup dan tanpa bayangan kuat.
6. Tekan **Capture Fabric**, lalu tinjau hasil tangkapan.
7. Pilih **Retake** jika gambar kurang jelas atau **Analyze Fabric** untuk melanjutkan.
8. Tunggu proses analisis selesai hingga halaman hasil terbuka.
9. Ubah nama kain bila diperlukan, kemudian pilih **Save Analysis**.
10. Gunakan **Download PDF**, **Compare**, atau **Explore What-If** sesuai kebutuhan.

### Hasil Analisis

Halaman hasil hanya menampilkan field yang tersedia pada record analisis:

- `detections`
- `microplastic_shedding_index`
- `fabric_durability_index`
- `composition`
- `structure`
- `washing_condition`
- `recommendation`

Nilai yang tidak dikirim layanan AI tidak dibuat atau diperkirakan oleh frontend. Jika `result_source` bernilai `mock`, antarmuka dan PDF menampilkan label **DEMO RESULT**.

### Laporan PDF

PDF dibuat dari data yang sudah tersimpan pada Supabase. Pembuatan laporan:

- tidak menjalankan inference ulang;
- tidak mengubah atau menghapus analysis;
- menyembunyikan bagian yang tidak memiliki data;
- menggunakan nama berkas `FABRIX_AI_[NamaKain]_[AnalysisID].pdf`;
- dapat dijalankan dari halaman hasil, history, dan passport.

---

## 📚 Dokumentasi API

### Base URL

```text
Development: http://localhost:4000
Production:  belum dikonfigurasi
```

Semua endpoint `/api/*` membutuhkan header berikut:

```http
Authorization: Bearer <supabase_access_token>
```

Endpoint `/health` tidak memerlukan autentikasi.

### Endpoint

| Method | Endpoint | Autentikasi | Fungsi |
| --- | --- | --- | --- |
| `GET` | `/health` | Tidak | Memeriksa status backend |
| `GET` | `/api/auth/me` | Ya | Mengambil user dan profil perusahaan |
| `POST` | `/api/auth/company-profile` | Ya | Membuat atau memperbarui profil perusahaan |
| `POST` | `/api/scan` | Ya | Menyimpan gambar, menjalankan inference, dan menyimpan hasil |
| `GET` | `/api/scan/history` | Ya | Mengambil seluruh analysis milik user, terbaru lebih dulu |
| `GET` | `/api/scan/:id` | Ya | Mengambil satu analysis milik user |
| `PATCH` | `/api/scan/:id` | Ya | Mengubah nama kain pada analysis tersimpan |
| `POST` | `/api/scan/compare` | Ya | Mengambil 2–3 analysis milik user untuk dibandingkan |
| `POST` | `/api/scan/:id/whatif` | Ya | Menjalankan ulang gambar tersimpan dengan data skenario |

### Contoh Permintaan Scan

`POST /api/scan` menggunakan `multipart/form-data`.

| Field | Tipe | Wajib | Keterangan |
| --- | --- | --- | --- |
| `image` | File | Ya | JPEG, PNG, atau WebP; maksimum 8 MB |
| `fabric_name` | String | Tidak | Nilai awal `Untitled Fabric` jika kosong |
| `composition` | JSON/String | Tidak | Data komposisi jika tersedia |
| `structure` | JSON/String | Tidak | Data struktur jika tersedia |
| `washing_condition` | JSON/String | Tidak | Kondisi pencucian jika tersedia |

Contoh menggunakan `curl`:

```bash
curl -X POST http://localhost:4000/api/scan \
  -H "Authorization: Bearer SUPABASE_ACCESS_TOKEN" \
  -F "image=@fabric.jpg" \
  -F "fabric_name=Kain Contoh"
```

Contoh response ringkas:

```json
{
  "analysis": {
    "id": "uuid-analysis",
    "fabric_name": "Kain Contoh",
    "image_path": "user-id/nama-file.jpg",
    "result_source": "ai_service",
    "created_at": "2026-09-03T00:00:00.000Z"
  }
}
```

Field hasil lainnya hanya tersedia bila dikirim oleh layanan analisis.

---

## 🧪 Pengujian

### Frontend

```powershell
cd frontend
npm run lint
npm run typecheck
npm run build
npm audit --audit-level=moderate
```

### Backend

```powershell
cd backend
node --check server.js
node --check routes/auth.js
node --check routes/scan.js
node --check services/yoloService.js
npm audit --audit-level=moderate
```

### Hasil Verifikasi Terakhir

| Pemeriksaan | Hasil |
| --- | --- |
| ESLint frontend | Lulus |
| TypeScript frontend | Lulus |
| Build produksi Next.js | Lulus |
| Audit dependency frontend | 0 kerentanan |
| Audit dependency backend | 0 kerentanan |
| HTTP seluruh route utama | `200 OK` |
| Endpoint terlindungi tanpa token | `401 Unauthorized` |
| Koneksi tabel dan bucket Supabase | Berhasil |
| Smoke test auth → profile → scan → detail → rename → history → comparison | Berhasil |
| Pembersihan akun, record, dan gambar smoke test | Berhasil |

Repository belum memiliki unit test suite, end-to-end test suite permanen, atau angka test coverage. Tabel di atas mencatat verifikasi manual dan build yang benar-benar telah dijalankan, bukan coverage otomatis.

---

## 🔐 Keamanan

- Frontend hanya menggunakan Supabase anon key.
- Service-role key hanya boleh berada pada `backend/.env` dan tidak boleh dikirim ke browser atau Git.
- Backend memverifikasi access token melalui Supabase Auth sebelum memproses endpoint aplikasi.
- Query analysis selalu difilter menggunakan `user_id` milik sesi terverifikasi.
- RLS tetap diaktifkan sebagai lapisan perlindungan database.
- Tipe gambar dibatasi pada JPEG, PNG, dan WebP dengan ukuran maksimum 8 MB.
- File `.env` dan `.env.local` diabaikan oleh Git; file `.example` hanya berisi placeholder.
- Bucket `fabric-images` masih public untuk prototipe lomba. Production sebaiknya menggunakan private bucket dan signed URL karena gambar kain perusahaan dapat bersifat sensitif.

---

## 🚧 Status Pengembangan

### Sudah Tersedia

- Autentikasi Supabase dan profil perusahaan
- Dashboard dan navigasi responsif
- Kamera realtime, capture, retake, dan error state
- Upload gambar hasil kamera ke Supabase Storage
- Penyimpanan dan pembacaan `fabric_analyses`
- Halaman detail analysis
- History, comparison 2–3 kain, dan passport
- Penamaan ulang analysis
- PDF export dari data tersimpan
- Adapter backend untuk layanan YOLO eksternal
- Fallback mock yang diberi label demo
- Konfigurasi lokal frontend dan backend

### Belum Tersedia atau Belum Final

- Schema input final untuk What-If Optimizer
- Server Python dan file model YOLO
- URL deployment production
- CI/CD dan monitoring production
- Test suite otomatis serta laporan coverage
- Bucket gambar private dengan signed URL

Jika layanan AI belum aktif dan `ALLOW_MOCK_INFERENCE=true`, backend menggunakan fallback development. Hasil tersebut wajib diperlakukan sebagai data demo, bukan hasil model tervalidasi.

---

## 📄 Lisensi

Proyek ini menggunakan [MIT License](LICENSE). Lihat file `LICENSE` untuk ketentuan lengkap.

---

<div align="center">

**Dibuat oleh Tim SATORU untuk ITECHNO CUP 2026**

**FABRIX AI — Prediksi. Bandingkan. Optimalkan.**

</div>

+<div align="center">

# [NAMA PROYEK]

### AI-Powered Fabric Intelligence for Smarter and More Sustainable Material Decisions

[![Live Demo](https://img.shields.io/badge/ðŸš€_Live_Demo-Visit_Site-success?style=for-the-badge)](https://[URL_DEMO])

[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://[URL_REPO])

[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

**Submission for ITECHNO CUP 2026 - Web Development**

**By SATORU**

</div>

---

## ðŸ“‹ Daftar Isi

- [Tim Developer](#-tim-developer)
- [Tentang Proyek](#-tentang-proyek)
- [Fitur Unggulan](#-fitur-unggulan)
- [Demo & Screenshot](#-demo--screenshot)
- [Teknologi](#ï¸-teknologi)
- [Arsitektur Sistem](#ï¸-arsitektur-sistem)
- [Instalasi & Setup](#ï¸-instalasi--setup)
- [Penggunaan](#-penggunaan)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Lisensi](#-lisensi)

---

## ðŸ‘¥ Tim Developer

| Nama | Peran | GitHub |
|---|---|---|
| **Evelly Khanzania Putri** | AI Developer | [GitHub](https://github.com/[username-evelly]) |
| **Dhiyaa Fazila Nugraha** | Full-Stack Developer | [GitHub](https://github.com/[username-dhiyaa]) |
| **Raykenzie Nazaru Fathurrahmansyah** | R&D Assistant | [GitHub](https://github.com/[username-raykenzie]) |

### Team Responsibility Flow

```mermaid
flowchart LR
    RD["Raykenzie Nazaru Fathurrahmansyah<br/>R&D Assistant"]
    AI["Evelly Khanzania Putri<br/>AI Developer"]
    FS["Dhiyaa Fazila Nugraha<br/>Full-Stack Developer"]

    RD -->|Material research, dataset insight, and validation| AI
    AI -->|AI model, inference pipeline, and prediction API| FS
    FS -->|Frontend, backend integration, and deployment| APP[Fabric Intelligence Platform]
    APP -->|Evaluation results and user feedback| RD
```

---

## ðŸŽ¯ Tentang Proyek

### Latar Belakang

Industri fashion dan tekstil membutuhkan proses pemilihan material yang tidak hanya mempertimbangkan karakteristik kain, tetapi juga daya tahan serta potensi dampak lingkungan dari material yang digunakan. Pada tahap R&D, perusahaan dapat memiliki banyak kandidat kain dengan komposisi dan perlakuan yang berbeda sehingga proses evaluasi material membutuhkan data yang terstruktur dan dapat dibandingkan.

**[NAMA PROYEK]** dikembangkan sebagai platform **B2B Fabric Intelligence berbasis AI** untuk membantu perusahaan fashion dan tekstil melakukan analisis awal terhadap kandidat kain sebelum proses produksi. Sistem menggabungkan data visual kain dengan data komposisi serta care/treatment untuk menghasilkan prediksi yang dapat digunakan sebagai pendukung pengambilan keputusan.

### Solusi yang Ditawarkan

Pengguna perusahaan dapat mengunggah atau mengambil gambar close-up kain, memasukkan data komposisi serat dan parameter perawatan, kemudian menjalankan analisis melalui satu dashboard.

Sistem menghasilkan:

- **Microplastic Shedding Prediction**
- **Fabric Durability Index (FDI)**
- **Environmental Risk Analysis**
- **Durability Analysis**
- **Material Recommendation**
- **Care Recommendation**
- **Alternative Composition Recommendation**

Hasil tersebut selanjutnya dapat digunakan untuk membandingkan kandidat kain, menjalankan skenario *what-if*, menyimpan riwayat analisis, dan menghasilkan laporan untuk kebutuhan B2B.

> **Value Proposition:** *Predict before you produce.*

### Tujuan Proyek

- ðŸŽ¯ **Tujuan Utama**: Membantu proses evaluasi dan pemilihan kandidat kain sebelum produksi melalui analisis berbasis AI.
- ðŸ“Š **Target Pengguna**: Fashion Brand, Textile Manufacturer, R&D Team, Sustainability Team, dan Procurement Team.
- ðŸ’¡ **Value Proposition**: Menggabungkan analisis visual dan data material dalam satu platform untuk mendukung keputusan material yang lebih terukur.

---

## âœ¨ Fitur Unggulan

### Fitur Utama

| Fitur | Deskripsi | Keunggulan |
|---|---|---|
| **Multimodal Fabric Analysis** | Menggabungkan gambar kain dengan data komposisi dan care/treatment. | Analisis tidak hanya bergantung pada satu jenis input. |
| **Microplastic Shedding Prediction** | Menghasilkan estimasi potensi pelepasan mikroplastik berdasarkan model yang digunakan. | Membantu screening awal kandidat material. |
| **Fabric Durability Index** | Menghasilkan indeks prediksi daya tahan kain. | Membantu perusahaan mempertimbangkan durability sebelum produksi. |
| **AI Material Optimizer** | Memberikan rekomendasi alternatif material/parameter berdasarkan hasil analisis. | Mengubah hasil prediksi menjadi rekomendasi yang dapat ditindaklanjuti. |
| **Compare Fabrics** | Membandingkan hasil microplastic, durability, dan risk beberapa kandidat kain. | Mempermudah pemilihan kandidat material. |
| **What-if Simulator** | Pengguna dapat mengubah komposisi atau treatment dan menjalankan analisis ulang. | Mendukung eksplorasi berbagai skenario material. |

### Fitur Tambahan

- **Fabric Digital Passport** â€” menyimpan identitas dan hasil analisis material secara terstruktur.
- **Analysis History** â€” menyimpan riwayat analisis perusahaan.
- **Environmental Risk Analysis** â€” menyajikan interpretasi risiko berdasarkan hasil prediksi.
- **AI Recommendation** â€” memberikan rekomendasi material, care, dan alternatif komposisi.
- **Export Fabric Report** â€” menghasilkan PDF/B2B report dari hasil analisis.

---

## ðŸ“¸ Demo & Screenshot

### Live Demo

ðŸ”— **[Kunjungi Website](https://[URL_DEMO])**

### Screenshot Aplikasi

<div align="center">

<img src="[URL_SCREENSHOT_DASHBOARD]" alt="Dashboard" width="800"/>
<p><em>Dashboard - Panel utama perusahaan untuk mengelola analisis kain.</em></p>

<img src="[URL_SCREENSHOT_ANALYSIS]" alt="Fabric Analysis" width="800"/>
<p><em>New Fabric Analysis - Upload gambar dan input data kain.</em></p>

<img src="[URL_SCREENSHOT_RESULT]" alt="Analysis Result" width="800"/>
<p><em>Analysis Result - Hasil prediksi, analisis risiko, dan rekomendasi.</em></p>

</div>

### Video Demo

ðŸ“¹ **[Link Video Demo](https://[URL_VIDEO])** _(opsional)_

---

## ðŸ› ï¸ Teknologi

### Tech Stack

#### Frontend

```text
Framework     : Next.js
Language      : TypeScript
UI Library    : [ISI SESUAI REPOSITORY]
State Mgmt    : [ISI SESUAI REPOSITORY]
Validation    : [ISI SESUAI REPOSITORY]
```

#### Backend

```text
Runtime       : [BELUM DITENTUKAN / SESUAI REPOSITORY]
Framework     : [BELUM DITENTUKAN / SESUAI REPOSITORY]
Database      : [BELUM DITENTUKAN / SESUAI REPOSITORY]
ORM           : [BELUM DITENTUKAN / SESUAI REPOSITORY]
Auth          : [BELUM DITENTUKAN / SESUAI REPOSITORY]
```

> Backend berfungsi sebagai **orchestrator/API layer** antara frontend, database, dan AI Service. Proses machine-learning inference tidak dijalankan pada backend utama.

#### AI Service

```text
Language      : Python
CNN           : EfficientNet-B0
ML Model      : XGBoost Regressor
Architecture  : Multimodal Late Fusion
API Framework : [BELUM DITENTUKAN]
```

#### DevOps & Tools

```text
Frontend Deployment  : [Vercel / SESUAI IMPLEMENTASI]
Backend Deployment   : [Railway / SESUAI IMPLEMENTASI]
AI Deployment        : Development lokal â†’ [Railway / Edge / SESUAI IMPLEMENTASI]
CI/CD                : [BELUM DITENTUKAN]
Testing              : [BELUM DITENTUKAN]
Monitoring           : [BELUM DITENTUKAN]
```

### Alasan Pemilihan Teknologi

| Teknologi | Alasan Pemilihan |
|---|---|
| **Next.js** | Mendukung pengembangan aplikasi web modern berbasis React dengan routing dan optimasi yang terintegrasi. |
| **TypeScript** | Membantu menjaga konsistensi tipe data dan maintainability pada frontend. |
| **Python** | Mendukung ekosistem machine learning yang digunakan oleh AI Service. |
| **EfficientNet-B0** | Digunakan untuk mengekstraksi fitur visual dari gambar close-up kain. |
| **XGBoost** | Digunakan pada tahap prediksi setelah penggabungan fitur multimodal. |
| **Late Fusion** | Menggabungkan representasi visual dengan data tabular sebelum proses prediksi. |

### Dependencies Utama

Dependencies harus disesuaikan dengan implementasi repository aktual.

```json
{
  "frontend": {
    "next": "[VERSION]",
    "typescript": "[VERSION]"
  },
  "backend": {
    "[PACKAGE]": "[VERSION]"
  },
  "ai-service": {
    "[PACKAGE]": "[VERSION]"
  }
}
```

---

## ðŸ—ï¸ Arsitektur Sistem

### System Architecture

Arsitektur memisahkan **Frontend**, **Backend API**, dan **AI Service**. Frontend tidak menjalankan proses prediksi secara langsung. Backend menerima request aplikasi dan menjadi penghubung menuju AI Service serta database.

```mermaid
flowchart LR
    U[Company User] --> FE[Next.js Frontend]
    FE --> BE[Backend API]

    BE <--> DB[(Company Database)]
    BE --> AI[AI Service]

    AI --> CNN[EfficientNet-B0 / CNN]
    AI --> ML[XGBoost / Prediction Model]

    CNN --> AI
    ML --> AI

    AI --> BE
    BE --> FE
    FE --> U
```

### End-to-End System Flow

```mermaid
flowchart TD
    A[Start] --> B[Login / Register Company]
    B --> C[Dashboard]
    C --> D[New Fabric Analysis]

    D --> E[Upload / Capture Fabric Image]
    D --> F[Input Fabric Data]

    E --> G[Frontend Sends Analysis Request]
    F --> G

    G --> H[Backend API]
    H --> I[Validate & Forward Request]
    I --> J[AI Service]

    J --> K[Image Preprocessing]
    K --> L[EfficientNet-B0 CNN]
    L --> M[Extract Visual Features]

    J --> N[Process Fiber Composition]
    J --> O[Process Care & Treatment Data]

    M --> P[Late Fusion Engine]
    N --> P
    O --> P

    P --> Q[XGBoost Regressor]

    Q --> R[Predict Microplastic Shedding]
    Q --> S[Predict Fabric Durability Index]

    R --> T[Environmental Risk Analysis]
    S --> U[Durability Analysis]

    T --> V[AI Recommendation Engine]
    U --> V

    V --> W[Material Recommendation]
    V --> X[Care Recommendation]
    V --> Y[Alternative Composition Recommendation]

    W --> Z[AI Service Returns Result]
    X --> Z
    Y --> Z

    Z --> AA[Backend API]
    AA --> AB[Save Analysis Result]
    AB --> AC[(Company Analysis Database)]
    AA --> AD[Analysis Result Dashboard]

    AD --> AE{Choose Action}

    AE --> AF[Compare Fabrics]
    AE --> AG[What-if Simulator]
    AE --> AH[Export Fabric Report]
    AE --> AI[Analysis History]

    AF --> AJ[Compare Microplastic, Durability & Risk]
    AJ --> AK[Select Best Fabric]

    AG --> AL[Change Fiber Composition / Treatment]
    AL --> H

    AH --> AM[PDF / B2B Report]
    AI --> AC

    AK --> AN[Decision Before Production]
    AM --> AN

    AN --> AO[End]
```

### AI Pipeline

AI Pipeline dipisahkan dari user flow karena seluruh inference dilakukan oleh **AI Service**.

```mermaid
flowchart TD
    IMG[Fabric Image] --> PRE[Image Preprocessing]
    PRE --> CNN[EfficientNet-B0 CNN]
    CNN --> VF[Visual Feature Extraction]

    COMP[Fabric Composition] --> LF[Late Fusion]
    CARE[Care & Treatment Data] --> LF
    VF --> LF

    LF --> XGB[XGBoost Regressor]

    XGB --> MICRO[Microplastic Shedding Prediction]
    XGB --> FDI[Fabric Durability Index]

    MICRO --> RISK[Environmental Risk Analysis]
    FDI --> DUR[Durability Analysis]

    RISK --> REC[AI Recommendation Engine]
    DUR --> REC
```

### Alur Komunikasi Service

```text
User
  â†“
Next.js Frontend
  â†“
Backend API
  â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â†” Database
  â†“
AI Service
  â†“
AI Models
  â†“
AI Service
  â†“
Backend API
  â†“
Frontend
  â†“
User
```

Backend **tidak melakukan prediksi**. Seluruh preprocessing dan inference machine learning berada pada AI Service.

### Database Schema

> ERD akan disesuaikan setelah database final ditentukan.

Entitas minimum yang diperkirakan diperlukan berdasarkan flow aplikasi:

```text
Company/User
    â”‚
    â””â”€â”€ Fabric Analysis
            â”‚
            â”œâ”€â”€ Fabric Data
            â”œâ”€â”€ Prediction Result
            â””â”€â”€ Analysis History
```

### Folder Structure

Struktur final harus mengikuti repository. Pemisahan service yang direkomendasikan:

```text
project-root/
â”œâ”€â”€ frontend/                 # Next.js application
â”‚   â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ public/
â”‚   â””â”€â”€ ...
â”‚
â”œâ”€â”€ backend/                  # Main Backend API
â”‚   â”œâ”€â”€ src/
â”‚   â””â”€â”€ ...
â”‚
â”œâ”€â”€ ai-service/               # Machine Learning Service
â”‚   â”œâ”€â”€ models/
â”‚   â”œâ”€â”€ preprocessing/
â”‚   â”œâ”€â”€ services/
â”‚   â””â”€â”€ ...
â”‚
â””â”€â”€ docs/
```

---

## âš™ï¸ Instalasi & Setup

### Prerequisites

Pastikan telah menginstall:

- **Node.js** â€” versi mengikuti kebutuhan repository.
- **npm / yarn / pnpm**
- **Python** â€” versi mengikuti AI Service.
- **Git**
- **[Database]** â€” setelah teknologi database ditentukan.

### 1ï¸âƒ£ Clone Repository

```bash
git clone https://github.com/[username]/[repo-name].git
cd [repo-name]
```

### 2ï¸âƒ£ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend development:

```text
http://localhost:3000
```

### 3ï¸âƒ£ Backend Setup

```bash
cd backend
npm install
npm run dev
```

> Perintah backend disesuaikan kembali setelah framework backend final tersedia.

### 4ï¸âƒ£ AI Service Setup

```bash
cd ai-service

python -m venv .venv
```

Aktifkan virtual environment sesuai sistem operasi, kemudian:

```bash
pip install -r requirements.txt
```

Jalankan AI Service menggunakan perintah sesuai framework API yang dipilih.

### 5ï¸âƒ£ Environment Variables

Buat `.env` berdasarkan `.env.example`.

Contoh:

```env
# Frontend
NEXT_PUBLIC_BACKEND_URL="http://localhost:[BACKEND_PORT]"

# Backend
PORT="[BACKEND_PORT]"
DATABASE_URL="[DATABASE_CONNECTION_STRING]"
AI_SERVICE_URL="http://localhost:[AI_SERVICE_PORT]"

# Authentication
AUTH_SECRET="[SECRET]"
```

> Jangan commit credential, API key, token, password, atau secret asli ke repository.

### Development Communication

```text
Frontend (localhost:3000)
        â†“
Backend (localhost:[PORT])
        â†“
AI Service (localhost:[PORT])
```

Saat deployment, URL service dapat diganti melalui environment variable tanpa mengubah flow aplikasi.

---

## ðŸš€ Penggunaan

### User Guide

1. **Registrasi/Login Company** â€” pengguna masuk ke akun perusahaan.
2. **Dashboard** â€” pengguna melihat akses menuju analisis dan riwayat.
3. **New Fabric Analysis** â€” membuat analisis kain baru.
4. **Upload / Capture Fabric Image** â€” memasukkan gambar close-up kain.
5. **Input Fabric Data** â€” memasukkan komposisi serat dan data care/treatment.
6. **Analyze** â€” frontend mengirim data ke backend untuk diteruskan ke AI Service.
7. **Analysis Result** â€” pengguna melihat Microplastic Prediction, FDI, risk analysis, dan rekomendasi.
8. **Choose Action** â€” pengguna dapat melakukan Compare Fabrics, What-if Simulation, Export Report, atau membuka Analysis History.
9. **Decision Before Production** â€” hasil digunakan sebagai pendukung pemilihan kandidat material.

### What-if Simulator

Pengguna dapat mengubah parameter seperti komposisi atau treatment.

```text
Current Fabric
      â†“
Change Composition / Treatment
      â†“
Backend API
      â†“
AI Service
      â†“
New Prediction
      â†“
Compare Scenario
```

---

## ðŸ“š API Documentation

### Base URL

```text
Development Backend:
http://localhost:[BACKEND_PORT]/api

Development AI Service:
http://localhost:[AI_SERVICE_PORT]

Production:
[ISI SETELAH DEPLOYMENT]
```

### Backend API

Endpoint berikut harus disesuaikan dengan source code setelah implementasi tersedia.

```http
# Authentication
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me

# Fabric Analysis
POST /api/analysis
GET  /api/analysis
GET  /api/analysis/:id

# Comparison / Simulation
POST /api/analysis/compare
POST /api/analysis/simulate

# Reports
GET /api/analysis/:id/report
```

> Daftar di atas merupakan rancangan endpoint berdasarkan flow sistem, bukan dokumentasi endpoint final. README harus diperbarui mengikuti implementasi aktual.

### Backend â†’ AI Service

Kontrak endpoint AI Service akan didokumentasikan setelah implementasi API final.

Flow:

```text
Frontend
   â†“
POST analysis request
   â†“
Backend
   â†“
AI Service
   â†“
Prediction result
   â†“
Backend
   â†“
Frontend
```

---

## ðŸ§ª Testing

### Testing Plan

Pengujian direncanakan mencakup:

- Unit testing
- Backend API testing
- AI Service API testing
- Frontend â†” Backend integration testing
- Backend â†” AI Service integration testing
- End-to-End user flow testing
- Model evaluation

### Model Evaluation

Untuk output regression, evaluasi model dapat mencakup:

```text
MAE  : [BELUM DIISI]
RMSE : [BELUM DIISI]
RÂ²   : [BELUM DIISI]
```

Nilai metric hanya akan dicantumkan setelah proses evaluasi terhadap dataset final dilakukan.

### Test Coverage

```text
Statements : [BELUM DIUJI]
Branches   : [BELUM DIUJI]
Functions  : [BELUM DIUJI]
Lines      : [BELUM DIUJI]
```

> Testing dan coverage akan diperbarui setelah proses pengujian selesai. Tidak ada nilai coverage yang diasumsikan.

---

## ðŸ“„ Lisensi

Proyek ini dilisensikan di bawah **MIT License** â€” lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.

---

<div align="center">

**Predict. Compare. Optimize. Decide.**

**Made with â¤ï¸ by SATORU for ITECHNO CUP 2026**

</div>

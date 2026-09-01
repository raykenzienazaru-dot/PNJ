<div align="center">

# FABRIX AI

### Predict. Compare. Optimize.

Platform B2B berbasis AI untuk analisis awal material kain sebelum proses produksi.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Belum_Tersedia-lightgrey?style=for-the-badge)](#demo--screenshot)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/raykenzienazaru-dot/PNJ)
[![License](https://img.shields.io/badge/License-Belum_Ditentukan-lightgrey?style=for-the-badge)](#lisensi)

**Submission for ITECHNO CUP 2026 — Web Development**

**Tim SATORU**

</div>

---

## Daftar Isi

- [Tim Developer](#tim-developer)
- [Tentang Proyek](#tentang-proyek)
- [Fitur Unggulan](#fitur-unggulan)
- [Demo & Screenshot](#demo--screenshot)
- [Teknologi](#teknologi)
- [Arsitektur Sistem](#arsitektur-sistem)
- [Instalasi & Setup](#instalasi--setup)
- [Environment Variables](#environment-variables)
- [Penggunaan](#penggunaan)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Lisensi](#lisensi)

---

## Tim Developer

| Nama | Peran | GitHub |
|---|---|---|
| **Evelly Khanzania Putri** | AI Developer | Belum dicantumkan |
| **Dhiyaa Fazila Nugraha** | Full-Stack Developer | Belum dicantumkan |
| **Raykenzie Nazaru Fathurrahmansyah** | R&D Assistant | [raykenzienazaru-dot](https://github.com/raykenzienazaru-dot) |

---

## Tentang Proyek

### Latar Belakang

Industri fashion dan tekstil perlu mengevaluasi banyak kandidat material sebelum produksi. Penilaian perlu mempertimbangkan karakteristik visual kain, komposisi serat, perawatan, daya tahan, dan potensi pelepasan mikroplastik secara terstruktur.

### Solusi yang Ditawarkan

**FABRIX AI** adalah platform B2B *Fabric Intelligence* berbasis Artificial Intelligence. Sistem menggabungkan gambar close-up kain, komposisi serat, serta data *care/treatment* untuk memprediksi **Microplastic Shedding** dan **Fabric Durability Index (FDI)**.

Hasil analisis dapat digunakan untuk membandingkan material, menjalankan simulasi perubahan parameter, memperoleh rekomendasi, menyimpan riwayat, dan menghasilkan laporan.

### Tujuan Proyek

| Aspek | Keterangan |
|---|---|
| **Tujuan Utama** | Mendukung evaluasi dan pemilihan kandidat kain sebelum produksi melalui analisis berbasis AI. |
| **Target Pengguna** | Fashion Brand, Textile Manufacturer, R&D Team, Sustainability Team, dan Procurement Team. |
| **Value Proposition** | *Predict before you produce.* |

---

## Fitur Unggulan

### Fitur Utama

| Fitur | Deskripsi | Keunggulan |
|---|---|---|
| **Multimodal Fabric Analysis** | Menggabungkan gambar kain, komposisi serat, serta data perawatan. | Memanfaatkan data visual dan tabular. |
| **Microplastic Shedding Prediction** | Memprediksi potensi pelepasan mikroplastik. | Mendukung penyaringan awal material. |
| **Fabric Durability Index** | Memprediksi indeks daya tahan material. | Membantu evaluasi ketahanan kain. |
| **AI Material Optimizer** | Memberikan rekomendasi alternatif material atau parameter. | Menghasilkan rekomendasi yang dapat ditindaklanjuti. |
| **Compare Fabrics** | Membandingkan mikroplastik, daya tahan, dan risiko beberapa kain. | Mempermudah pemilihan kandidat. |
| **What-if Simulator** | Menjalankan analisis ulang setelah komposisi atau perlakuan diubah. | Mendukung eksplorasi skenario. |

### Fitur Tambahan

- **Fabric Digital Passport** — menyimpan informasi dan hasil analisis material.
- **Analysis History** — menyimpan riwayat analisis perusahaan.
- **Export Fabric Report** — menghasilkan laporan untuk kebutuhan B2B.

---

## Demo & Screenshot

### Live Demo

**[URL DEMO BELUM TERSEDIA]**

### Screenshot Aplikasi

| Tampilan | Placeholder |
|---|---|
| Dashboard | `assets/dashboard.png` |
| Fabric Analysis | `assets/fabric-analysis.png` |
| Analysis Result | `assets/analysis-result.png` |
| Compare Fabric | `assets/compare-fabric.png` |

### Diagram Flow

<div align="center">

<img src="./USER.drawio.png" alt="User journey FABRIX AI" width="700">

*User journey FABRIX AI.*

<img src="./FLOWW.drawio.png" alt="End-to-end flow FABRIX AI" width="700">

*Flow analisis dari input hingga keputusan sebelum produksi.*

</div>

### Video Demo

**[URL VIDEO DEMO BELUM TERSEDIA]**

---

## Teknologi

### Tech Stack

| Area | Teknologi | Status |
|---|---|---|
| **Frontend** | Next.js, TypeScript | Direncanakan |
| **Backend** | Service terpisah dari AI Service | Framework belum ditentukan |
| **AI Service** | Python, EfficientNet-B0/CNN, XGBoost Regressor, Late Fusion | Direncanakan |
| **Database** | Belum ditentukan | Belum tersedia |
| **DevOps & Tools** | Railway atau environment lain untuk AI Service | Konsep deployment |

Backend menjadi lapisan API dan orkestrator. Seluruh preprocessing serta inference machine learning dijalankan oleh **AI Service**, bukan backend utama.

### Alasan Pemilihan Teknologi

| Teknologi | Alasan Pemilihan |
|---|---|
| **Next.js** | Mendukung aplikasi web React dengan routing dan optimasi terintegrasi. |
| **TypeScript** | Membantu konsistensi tipe dan pemeliharaan frontend. |
| **Python** | Menyediakan ekosistem machine learning untuk AI Service. |
| **EfficientNet-B0** | Mengekstraksi fitur visual gambar close-up kain. |
| **XGBoost Regressor** | Melakukan prediksi berdasarkan fitur multimodal. |
| **Late Fusion** | Menggabungkan fitur visual dan data tabular. |

### Dependencies Utama

Belum ada `package.json` atau `requirements.txt` di repository. Dependency akan dicantumkan setelah source code tersedia.

---

## Arsitektur Sistem

### 1. System Architecture

```mermaid
flowchart TD
    U[Company User] --> FE[Next.js Frontend]
    FE --> BE[Backend API]
    BE <--> DB[(Database)]
    BE --> AIS[AI Service]
    AIS --> AIM[AI Models]
    AIM --> AIS
    AIS --> BE
    BE --> FE
    FE --> U
```

Alur produksi utama adalah **Frontend → Backend → AI Service**. Frontend tidak berkomunikasi langsung dengan AI Service.

### 2. End-to-End System Flow

```mermaid
flowchart TD
    A([Start]) --> B[Login / Register Company]
    B --> C[Dashboard]
    C --> D[New Fabric Analysis]
    D --> E[Upload / Capture Fabric Image]
    D --> F[Input Fabric Data]
    E --> G[Frontend Sends Request]
    F --> G
    G --> H[Backend Validation and Business Logic]
    H --> I[AI Service]

    I --> J[Image Preprocessing]
    J --> K[EfficientNet-B0 CNN]
    K --> L[Extract Visual Features]
    L --> M[Weave Density / Texture Feature Vector]
    I --> N[Process Fiber Composition]
    I --> O[Process Care and Treatment Data]

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
    AA --> AB[Analysis Result Dashboard]
    AA --> AC[(Company Analysis Database)]

    AB --> AD{Choose Action}
    AD --> AE[Compare Fabrics]
    AD --> AF[What-if Simulator]
    AD --> AG[Export Fabric Report]
    AD --> AH[Save to Analysis History]
    AE --> AI2[Compare Microplastic, Durability and Risk]
    AI2 --> AJ[Select Best Fabric]
    AF --> AK[Change Fiber Composition / Treatment]
    AK --> G
    AG --> AL[PDF / B2B Report]
    AH --> AC
    AJ --> AM[Decision Before Production]
    AL --> AM
    AC --> AM
    AM --> AN([End])
```

### 3. AI Pipeline

```mermaid
flowchart TD
    IMG[Fabric Image] --> PRE[Image Preprocessing]
    PRE --> CNN[EfficientNet-B0]
    CNN --> VF[Visual Features]
    COMP[Fiber Composition] --> LF[Late Fusion]
    CARE[Care and Treatment] --> LF
    VF --> LF
    LF --> XGB[XGBoost Regressor]
    XGB --> MICRO[Microplastic Shedding Prediction]
    XGB --> FDI[Fabric Durability Index]
```

### Database Schema

**[DATABASE SCHEMA BELUM FINAL]**

Database belum tersedia sehingga skema aktual belum dapat didokumentasikan.

### Folder Structure

```text
PNJ/
├── .vscode/
│   └── extensions.json
├── FLOWW.drawio.png
├── USER.drawio.png
└── README.MD
```

---

## Instalasi & Setup

Repository saat ini hanya berisi dokumentasi dan aset diagram. Source code frontend, backend, serta AI Service belum tersedia.

### Prerequisites

- Git
- Runtime dan tool lain: **[BELUM DITENTUKAN]**

### Clone Repository

```bash
git clone https://github.com/raykenzienazaru-dot/PNJ.git
cd PNJ
```

### Frontend

**[SETUP FRONTEND BELUM TERSEDIA]**

### Backend

**[SETUP BACKEND BELUM TERSEDIA]**

### AI Service

**[SETUP AI SERVICE BELUM TERSEDIA]**

---

## Environment Variables

Environment variable aktual belum dapat ditentukan karena source code belum tersedia.

```env
VARIABLE_NAME="your_value_here"
```

Jangan menyimpan API key, password, token, atau secret asli di repository.

---

## Penggunaan

```mermaid
flowchart LR
    A[Login] --> B[Dashboard]
    B --> C[New Fabric Analysis]
    C --> D[Upload Fabric]
    D --> E[Input Fabric Data]
    E --> F[Analyze]
    F --> G[Analysis Result]
    G --> H[Compare / Optimize / What-if]
    H --> I[Save / Export]
    I --> J[Decision Before Production]
```

---

## API Documentation

Source code backend dan AI Service belum tersedia. Oleh karena itu, belum ada endpoint aktual yang dapat didokumentasikan.

### Frontend → Backend API

**[ENDPOINT BELUM TERSEDIA]**

### Backend → AI Service

**[ENDPOINT BELUM TERSEDIA]**

Endpoint akan didokumentasikan hanya setelah implementasinya tersedia.

---

## Testing

Belum terdapat source code, konfigurasi testing, atau hasil pengujian.

### Model Evaluation

*Model evaluation will be updated after testing on the final dataset.*

| Metric | Nilai |
|---|---|
| MAE | Belum diuji |
| RMSE | Belum diuji |
| R² | Belum diuji |

### Software Test Coverage

```text
Statements : [BELUM DIUJI]
Branches   : [BELUM DIUJI]
Functions  : [BELUM DIUJI]
Lines      : [BELUM DIUJI]
```

---

## Lisensi

**[LICENSE BELUM DITENTUKAN]**

Repository belum memiliki file lisensi.

---

<div align="center">

**Predict. Compare. Optimize.**

**Made with ❤️ by SATORU for ITECHNO CUP 2026**

</div>

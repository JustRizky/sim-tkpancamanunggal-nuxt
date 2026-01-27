# Setup Guide

## 1. Prasyarat

- Node.js >= 20
- npm >= 9
- Docker & Docker Compose
- Git

## 2. Clone repository

```bash
git clone https://github.com/justrizky/sim-tkpancamanunggal-nuxt.git
cd repo
```

## 3. Install dependencies

```bash
npm install
```

## 4. Jalankan development server

```bash
npm run dev
```

## 5. Konfigurasi CI/CD

- Buat secrets di GitHub: SONAR_TOKEN, LHCI_GITHUB_APP_TOKEN
- Pastikan pipeline di .github/workflows/ci.yml sudah sesuai

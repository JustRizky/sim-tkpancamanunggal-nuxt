# Troubleshooting

## 1. Unit Test Fail

- Periksa log `npm run test:coverage`
- Pastikan dependency sudah update

## 2. Docker Image gagal build

- Periksa Dockerfile syntax
- Jalankan `docker build .` lokal untuk debug

## 3. CI/CD pipeline error

- Lihat log GitHub Actions
- Pastikan semua secrets sudah ditambahkan

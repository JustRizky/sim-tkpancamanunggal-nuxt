# Arsitektur Sistem & Pipeline

## 1. Overview

Sistem ini terdiri dari:

- Frontend: Nuxt.js
- Backend: Nuxt.js
- Database: MySQL
- CI/CD: GitHub Actions
- Containerization: Docker

## 2. Diagram Arsitektur

![Arsitektur Sistem](.png)

## 3. Pipeline CI/CD

- **Push ke branch main/feature/** → Trigger GitHub Actions
- **Build** → Unit test → Lint → Code quality scan (SonarCloud)
- **Docker Image Build & Scan** → Publish ke Docker Registry
- **Deploy ke Staging** → Health check → Approval → Deploy ke Production

### Visualisasi Pipeline

![Pipeline CI/CD](.png)

# Deployment

## 1. Deploy Staging

- Push branch `feature/*` → Trigger GitHub Actions
- Build image → Scan → Publish ke staging registry
- Deployment otomatis ke staging server
- Verifikasi health check

## 2. Deploy Production

- Merge ke main → Trigger pipeline production
- Approval → Deploy ke server production

## Diagram Deployment

![Deployment Flow](./images/deployment.png)

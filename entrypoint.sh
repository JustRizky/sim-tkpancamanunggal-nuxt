#!/bin/sh
set -e

echo "Waiting for database..."

while ! getent hosts db > /dev/null; do
  echo "Database not ready yet, waiting..."
  sleep 1
done

while ! nc -z db 3306 2>/dev/null; do
  echo "Database port not open yet, waiting..."
  sleep 1
done

echo "Database ready!"

if ! bunx prisma migrate deploy; then
  echo "⚠️ Prisma migrate gagal! Lanjut tanpa migrate (dev/testing mode)"
fi

bunx prisma generate || true

bun /app/.output/server/index.mjs

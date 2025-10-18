// prisma.config.ts
import { defineConfig } from '@prisma/cli'

export default defineConfig({
  schema: './prisma/schema.prisma', // lokasi schema Prisma
  // seed script path
  seed: {
    path: './prisma/seed.ts', // pakai ts karena kita pakai TypeScript
    run: 'ts-node', // pastikan ts-node terinstall
  },
})

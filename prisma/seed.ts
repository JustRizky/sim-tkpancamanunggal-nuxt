import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@gmail.com'
  const plainPassword = 'admin123'
  const hashed = await bcrypt.hash(plainPassword, 10)

  const admin = await prisma.user.upsert({
    where: { email },
    update: { password: hashed },
    create: { email, password: hashed },
  })

  console.log('Seeded admin user:', { id: admin.id, email: admin.email })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

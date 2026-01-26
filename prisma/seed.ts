import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function createAdminUser() {
  const email = 'admin@gmail.com'
  const password = 'admin123'
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    console.log('Admin user already exists.')
    return
  }

  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  })
  console.log('Admin user created:', user)
}

createAdminUser()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err)
    prisma.$disconnect()
  })

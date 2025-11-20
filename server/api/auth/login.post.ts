import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'

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
    data: {
      email,
      password: hashedPassword,
    },
  })

  console.log('Admin user created:', user)
}

createAdminUser()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err)
    prisma.$disconnect()
  })

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password, remember } = body

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email & password required' })
  }

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: remember ? '7d' : '1h',
  })

  setCookie(event, 'token', token, {
    httpOnly: false,
    path: '/',
    maxAge: remember ? 60 * 60 * 24 * 7 : 60 * 60,
  })

  return {
    message: 'Login successful',
    user: { id: user.id, email: user.email },
    token,
  }
})

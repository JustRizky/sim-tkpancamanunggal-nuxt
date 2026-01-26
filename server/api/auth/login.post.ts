import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password, remember } = body

    if (!email || !password) {
      throw createError({ statusCode: 400, statusMessage: 'Email & password required' })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: remember ? '7d' : '1h',
    })

    return { message: 'Login successful', user: { id: user.id, email: user.email }, token }
  } catch (err) {
    console.error('Login error:', err)
    throw err
  }
})

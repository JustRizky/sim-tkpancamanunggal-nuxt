import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  switch (method) {
    case 'GET': {
      return await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
      })
    }

    case 'POST': {
      const body = (await readBody(event)) as { nama: string; email: string; pesan: string }

      if (!body.nama || !body.email || !body.pesan) {
        throw createError({ statusCode: 400, message: 'Semua field wajib diisi' })
      }

      const newMessage = await prisma.contactMessage.create({
        data: {
          nama: body.nama,
          email: body.email,
          pesan: body.pesan,
        },
      })

      return newMessage
    }

    case 'DELETE': {
      const id = getQuery(event).id
      if (!id) throw createError({ statusCode: 400, message: 'ContactMessage ID required' })

      await prisma.contactMessage.delete({ where: { id: Number(id) } })
      return { message: 'Message deleted successfully' }
    }

    default:
      throw createError({ statusCode: 405, message: 'Method not allowed' })
  }
})

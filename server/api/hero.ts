import { PrismaClient } from '@prisma/client'
import { readMultipartFormData } from 'h3'
import { v2 as cloudinary } from 'cloudinary'

const prisma = new PrismaClient()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  switch (method) {
    case 'GET':
      const hero = await prisma.heroSection.findUnique({ where: { id: 1 } })
      return hero || { message: 'HeroSection not found' }

    case 'POST': {
      const parts = await readMultipartFormData(event)
      const title = parts.find((p) => p.name === 'title')?.data.toString() || ''
      const paragraph = parts.find((p) => p.name === 'paragraph')?.data.toString() || ''
      const filePart = parts.find((p) => p.filename)
      const keepOldImage = parts.find((p) => p.name === 'keepOldImage')?.data.toString()

      const existing = await prisma.heroSection.findUnique({ where: { id: 1 } })
      let imageUrl = existing?.imageUrl || ''

      if (filePart) {
        const file = filePart.data
        const uploadResult = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'hero-section', resource_type: 'auto' },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          )
          uploadStream.end(file)
        })
        imageUrl = uploadResult.secure_url
      } else if (keepOldImage === 'true' && existing?.imageUrl) {
        imageUrl = existing.imageUrl
      }

      const heroUpdated = existing
        ? await prisma.heroSection.update({
            where: { id: 1 },
            data: { title, paragraph, imageUrl },
          })
        : await prisma.heroSection.create({
            data: { id: 1, title, paragraph, imageUrl },
          })

      return heroUpdated
    }

    case 'DELETE':
      await prisma.heroSection.delete({ where: { id: 1 } })
      return { message: 'HeroSection deleted' }

    default:
      return { message: 'Method not allowed' }
  }
})

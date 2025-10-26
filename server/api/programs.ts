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
    case 'GET': {
      const programs = await prisma.programsSection.findMany()
      return programs
    }

    case 'POST': {
      const parts = await readMultipartFormData(event)
      const title = parts.find((p) => p.name === 'title')?.data.toString() || ''
      const description = parts.find((p) => p.name === 'description')?.data.toString() || ''
      const filePart = parts.find((p) => p.filename)

      let imageUrl = ''
      if (filePart) {
        const file = filePart.data
        const uploadResult = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'program-section', resource_type: 'auto' },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          )
          uploadStream.end(file)
        })
        imageUrl = uploadResult.secure_url
      }

      const newProgram = await prisma.programsSection.create({
        data: { title, description, imageUrl },
      })
      return newProgram
    }

    case 'PUT': {
      const id = getQuery(event).id
      if (!id) return { message: 'Program ID required' }

      const parts = await readMultipartFormData(event)
      const title = parts.find((p) => p.name === 'title')?.data.toString() || ''
      const description = parts.find((p) => p.name === 'description')?.data.toString() || ''
      const keepOldImage = parts.find((p) => p.name === 'keepOldImage')?.data.toString()
      const filePart = parts.find((p) => p.filename)

      const existing = await prisma.programsSection.findUnique({ where: { id: Number(id) } })
      if (!existing) return { message: 'Program not found' }

      let imageUrl = existing.imageUrl

      if (filePart) {
        const file = filePart.data
        const uploadResult = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'program-section', resource_type: 'auto' },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          )
          uploadStream.end(file)
        })
        imageUrl = uploadResult.secure_url
      } else if (keepOldImage === 'true') {
        imageUrl = existing.imageUrl
      }

      const updatedProgram = await prisma.programsSection.update({
        where: { id: Number(id) },
        data: { title, description, imageUrl },
      })

      return updatedProgram
    }

    case 'DELETE': {
      const id = getQuery(event).id
      if (!id) return { message: 'Program ID required' }

      await prisma.programsSection.delete({ where: { id: Number(id) } })
      return { message: 'Program deleted successfully' }
    }

    default:
      return { message: 'Method not allowed' }
  }
})

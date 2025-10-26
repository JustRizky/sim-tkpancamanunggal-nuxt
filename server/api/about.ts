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
      const about = await prisma.about.findFirst()
      return about || { message: 'Data about belum ada' }
    }

    case 'POST': {
      const parts = await readMultipartFormData(event)
      const sejarah = parts.find((p) => p.name === 'sejarah')?.data.toString() || ''
      const visi = parts.find((p) => p.name === 'visi')?.data.toString() || ''
      const misi = parts.find((p) => p.name === 'misi')?.data.toString() || ''
      const filePart = parts.find((p) => p.filename)

      let imageUrl = ''
      if (filePart) {
        const file = filePart.data
        const uploadResult = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'about-page', resource_type: 'auto' },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          )
          uploadStream.end(file)
        })
        imageUrl = uploadResult.secure_url
      }

      const newAbout = await prisma.about.create({
        data: { sejarah, visi, misi, imageUrl },
      })

      return newAbout
    }

    case 'PUT': {
      const id = getQuery(event).id
      if (!id) return { message: 'About ID required' }

      const parts = await readMultipartFormData(event)
      const sejarah = parts.find((p) => p.name === 'sejarah')?.data.toString() || ''
      const visi = parts.find((p) => p.name === 'visi')?.data.toString() || ''
      const misi = parts.find((p) => p.name === 'misi')?.data.toString() || ''
      const keepOldImage = parts.find((p) => p.name === 'keepOldImage')?.data.toString()
      const filePart = parts.find((p) => p.filename)

      const existing = await prisma.about.findUnique({ where: { id: Number(id) } })
      if (!existing) return { message: 'Data about tidak ditemukan' }

      let imageUrl = existing.imageUrl

      if (filePart) {
        const file = filePart.data
        const uploadResult = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'about-page', resource_type: 'auto' },
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

      const updatedAbout = await prisma.about.update({
        where: { id: Number(id) },
        data: { sejarah, visi, misi, imageUrl },
      })

      return updatedAbout
    }

    case 'DELETE': {
      const id = getQuery(event).id
      if (!id) return { message: 'About ID required' }

      await prisma.about.delete({ where: { id: Number(id) } })
      return { message: 'About deleted successfully' }
    }

    default:
      return { message: 'Method not allowed' }
  }
})

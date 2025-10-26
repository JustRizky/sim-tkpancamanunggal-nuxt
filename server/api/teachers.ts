import { PrismaClient } from '@prisma/client'
import { readMultipartFormData, getQuery } from 'h3'
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
      const teachers = await prisma.teacher.findMany()
      return teachers
    }

    case 'POST': {
      const parts = await readMultipartFormData(event)
      const name = parts.find((p) => p.name === 'name')?.data.toString() || ''
      const role = parts.find((p) => p.name === 'role')?.data.toString() || ''
      const tugas = parts.find((p) => p.name === 'tugas')?.data.toString() || ''
      const filePart = parts.find((p) => p.filename)

      let imageUrl = ''
      if (filePart) {
        const file = filePart.data
        const uploadResult = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'guru', resource_type: 'auto' },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          )
          uploadStream.end(file)
        })
        imageUrl = uploadResult.secure_url
      }

      const newTeacher = await prisma.teacher.create({
        data: { name, role, tugas, imageUrl },
      })

      return newTeacher
    }

    case 'PUT': {
      const id = getQuery(event).id
      if (!id) return { message: 'Teacher ID required' }

      const parts = await readMultipartFormData(event)
      const name = parts.find((p) => p.name === 'name')?.data.toString() || ''
      const role = parts.find((p) => p.name === 'role')?.data.toString() || ''
      const tugas = parts.find((p) => p.name === 'tugas')?.data.toString() || ''
      const keepOldImage = parts.find((p) => p.name === 'keepOldImage')?.data.toString()
      const filePart = parts.find((p) => p.filename)

      const existing = await prisma.teacher.findUnique({ where: { id: Number(id) } })
      if (!existing) return { message: 'Teacher not found' }

      let imageUrl = existing.imageUrl

      if (filePart) {
        const file = filePart.data
        const uploadResult = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'guru', resource_type: 'auto' },
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

      const updatedTeacher = await prisma.teacher.update({
        where: { id: Number(id) },
        data: { name, role, tugas, imageUrl },
      })

      return updatedTeacher
    }

    case 'DELETE': {
      const id = getQuery(event).id
      if (!id) return { message: 'Teacher ID required' }

      await prisma.teacher.delete({ where: { id: Number(id) } })
      return { message: 'Teacher deleted successfully' }
    }

    default:
      return { message: 'Method not allowed' }
  }
})

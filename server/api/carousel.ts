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
      console.log('🟢 [GET] Fetching all carousel images...')
      const images = await prisma.carousel.findMany()
      console.log(`✅ Found ${images.length} images`)
      return images
    }

    case 'POST': {
      console.log('🟢 [POST] Uploading new carousel image...')
      const parts = await readMultipartFormData(event)
      const filePart = parts?.find((p) => p.filename)

      if (!filePart) {
        console.error('❌ No file uploaded')
        return { message: 'Image file is required' }
      }

      const file = filePart.data

      console.log('📸 Uploading to Cloudinary...')
      const uploadResult = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'carousel-section', resource_type: 'auto' },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        )
        uploadStream.end(file)
      })

      console.log('✅ Upload success:', uploadResult.secure_url)

      const newImage = await prisma.carousel.create({
        data: { imageUrl: uploadResult.secure_url },
      })

      console.log('✅ Saved to DB:', newImage)
      return newImage
    }

    case 'PUT': {
      const id = getQuery(event).id
      if (!id) return { message: 'Carousel ID required' }

      console.log(`🟡 [PUT] Updating carousel image ID: ${id}`)
      const parts = await readMultipartFormData(event)
      const filePart = parts?.find((p) => p.filename)

      const existing = await prisma.carousel.findUnique({
        where: { id: Number(id) },
      })
      if (!existing) return { message: 'Carousel not found' }

      let imageUrl = existing.imageUrl

      if (filePart) {
        const file = filePart.data
        const uploadResult = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'carousel-section', resource_type: 'auto' },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          )
          uploadStream.end(file)
        })
        imageUrl = uploadResult.secure_url
        console.log('✅ Image updated:', imageUrl)
      }

      const updatedImage = await prisma.carousel.update({
        where: { id: Number(id) },
        data: { imageUrl },
      })

      return updatedImage
    }

    case 'DELETE': {
      const id = getQuery(event).id
      if (!id) return { message: 'Carousel ID required' }

      console.log(`🔴 [DELETE] Deleting carousel image ID: ${id}`)
      await prisma.carousel.delete({ where: { id: Number(id) } })

      return { message: 'Carousel image deleted successfully' }
    }

    default:
      return { message: 'Method not allowed' }
  }
})

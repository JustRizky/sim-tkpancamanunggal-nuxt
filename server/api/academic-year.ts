import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  switch (method) {
    case 'GET': {
      // Get active academic year
      let activeYear = await prisma.academicYear.findFirst({
        where: { isActive: true },
      })

      // If no active year exists, create default one
      if (!activeYear) {
        const currentYear = new Date().getFullYear()
        const nextYear = currentYear + 1
        activeYear = await prisma.academicYear.upsert({
          where: { id: 1 },
          update: {},
          create: {
            id: 1,
            year: `${currentYear}/${nextYear}`,
            semester: 'ganjil',
            isActive: true,
          },
        })
      }

      return activeYear
    }

    case 'PUT': {
      const { year, semester } = await readBody(event)

      if (!year || !semester) {
        return { message: 'Tahun ajaran dan semester wajib diisi' }
      }

      // Update academic year
      const updated = await prisma.academicYear.upsert({
        where: { id: 1 },
        update: {
          year,
          semester,
        },
        create: {
          id: 1,
          year,
          semester,
          isActive: true,
        },
      })

      return updated
    }

    default:
      return { message: 'Method tidak diizinkan' }
  }
})

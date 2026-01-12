import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method === 'POST') {
    try {
      // Get active academic year
      const activeAcademicYear = await prisma.academicYear.findFirst({
        where: { isActive: true },
      })

      if (!activeAcademicYear) {
        return { message: 'Tidak ada tahun ajaran yang aktif' }
      }

      // Update all PPDB entries with active academic year
      const result = await prisma.ppdb.updateMany({
        data: {
          academicYear: activeAcademicYear.year,
          semester: activeAcademicYear.semester,
        },
      })

      return {
        message: `Berhasil update ${result.count} data PPDB`,
        count: result.count,
      }
    } catch (error) {
      console.error('Error:', error)
      return { message: 'Gagal sync data' }
    }
  }

  return { message: 'Method tidak diizinkan' }
})

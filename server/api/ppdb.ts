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
      const query = getQuery(event)
      const where: any = {}

      // Filter berdasarkan status verifikasi
      if (query.isVerified !== undefined) {
        where.isVerified = query.isVerified === 'true'
      }

      const data = await prisma.ppdb.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
      })
      return data
    }

    case 'POST': {
      const parts = await readMultipartFormData(event)

      const get = (key: string) => parts.find((p) => p.name === key)?.data.toString() || ''
      const getFile = (key: string) => parts.find((p) => p.name === key && p.filename)

      // Upload bukti pembayaran
      let buktiPembayaranUrl = ''
      const buktiPembayaranFile = getFile('buktiPembayaran')
      if (buktiPembayaranFile) {
        const uploadResult = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'ppdb/bukti-pembayaran', resource_type: 'auto' },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          )
          uploadStream.end(buktiPembayaranFile.data)
        })
        buktiPembayaranUrl = uploadResult.secure_url
      }

      // Upload lampiran
      let lampiranUrl = ''
      const lampiranFile = getFile('lampiran')
      if (lampiranFile) {
        const uploadResult = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'ppdb/lampiran', resource_type: 'auto' },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          )
          uploadStream.end(lampiranFile.data)
        })
        lampiranUrl = uploadResult.secure_url
      }

      const newEntry = await prisma.ppdb.create({
        data: {
          // Identitas
          nama: get('nama'),
          jk: get('jk'),
          nik: get('nik'),
          no_kk: get('no_kk'),
          tempat_lahir: get('tempat_lahir'),
          tgl_lahir: get('tgl_lahir'),
          no_akte: get('no_akte'),
          agama: get('agama'),
          kewarganegaraan: get('kewarganegaraan'),
          alamat: get('alamat'),
          tinggal_bersama: get('tinggal_bersama'),
          anak_ke: get('anak_ke'),
          usia: get('usia'),
          no_hp: get('no_hp'),

          // Ayah
          namaAyah: get('namaAyah'),
          nikAyah: get('nikAyah'),
          tahunLahirAyah: get('tahunLahirAyah'),
          pendidikanAyah: get('pendidikanAyah'),
          pekerjaanAyah: get('pekerjaanAyah'),
          penghasilanAyah: get('penghasilanAyah'),

          // Ibu
          namaIbu: get('namaIbu'),
          nikIbu: get('nikIbu'),
          tahunLahirIbu: get('tahunLahirIbu'),
          pendidikanIbu: get('pendidikanIbu'),
          pekerjaanIbu: get('pekerjaanIbu'),
          penghasilanIbu: get('penghasilanIbu'),

          // Periodik
          tinggiBadan: get('tinggiBadan'),
          beratBadan: get('beratBadan'),
          lingkarKepala: get('lingkarKepala'),
          jarakTempuh: get('jarakTempuh'),
          jumlahSaudara: get('jumlahSaudara'),

          // File
          buktiPembayaran: buktiPembayaranUrl || null,
          lampiran: lampiranUrl || null,
          isVerified: get('isVerified') === 'true',
        },
      })

      return newEntry
    }

    case 'PUT': {
      const id = getQuery(event).id
      if (!id) return { message: 'ID PPDB diperlukan' }

      const parts = await readMultipartFormData(event)
      const get = (key: string) => parts.find((p) => p.name === key)?.data.toString() || ''
      const getFile = (key: string) => parts.find((p) => p.name === key && p.filename)

      const exists = await prisma.ppdb.findUnique({
        where: { id: Number(id) },
      })

      if (!exists) return { message: 'Data tidak ditemukan' }

      // Upload bukti pembayaran jika ada file baru
      let buktiPembayaranUrl = exists.buktiPembayaran || ''
      const buktiPembayaranFile = getFile('buktiPembayaran')
      if (buktiPembayaranFile) {
        const uploadResult = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'ppdb/bukti-pembayaran', resource_type: 'auto' },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          )
          uploadStream.end(buktiPembayaranFile.data)
        })
        buktiPembayaranUrl = uploadResult.secure_url
      }

      // Upload lampiran jika ada file baru
      let lampiranUrl = exists.lampiran || ''
      const lampiranFile = getFile('lampiran')
      if (lampiranFile) {
        const uploadResult = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'ppdb/lampiran', resource_type: 'auto' },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          )
          uploadStream.end(lampiranFile.data)
        })
        lampiranUrl = uploadResult.secure_url
      }

      const updated = await prisma.ppdb.update({
        where: { id: Number(id) },
        data: {
          // Identitas
          nama: get('nama'),
          jk: get('jk'),
          nik: get('nik'),
          no_kk: get('no_kk'),
          tempat_lahir: get('tempat_lahir'),
          tgl_lahir: get('tgl_lahir'),
          no_akte: get('no_akte'),
          agama: get('agama'),
          kewarganegaraan: get('kewarganegaraan'),
          alamat: get('alamat'),
          tinggal_bersama: get('tinggal_bersama'),
          anak_ke: get('anak_ke'),
          usia: get('usia'),
          no_hp: get('no_hp'),

          // Ayah
          namaAyah: get('namaAyah'),
          nikAyah: get('nikAyah'),
          tahunLahirAyah: get('tahunLahirAyah'),
          pendidikanAyah: get('pendidikanAyah'),
          pekerjaanAyah: get('pekerjaanAyah'),
          penghasilanAyah: get('penghasilanAyah'),

          // Ibu
          namaIbu: get('namaIbu'),
          nikIbu: get('nikIbu'),
          tahunLahirIbu: get('tahunLahirIbu'),
          pendidikanIbu: get('pendidikanIbu'),
          pekerjaanIbu: get('pekerjaanIbu'),
          penghasilanIbu: get('penghasilanIbu'),

          // Periodik
          tinggiBadan: get('tinggiBadan'),
          beratBadan: get('beratBadan'),
          lingkarKepala: get('lingkarKepala'),
          jarakTempuh: get('jarakTempuh'),
          jumlahSaudara: get('jumlahSaudara'),

          // File
          buktiPembayaran: buktiPembayaranUrl || null,
          lampiran: lampiranUrl || null,
          isVerified: get('isVerified') === 'true',
        },
      })

      return updated
    }

    case 'DELETE': {
      const id = getQuery(event).id
      if (!id) return { message: 'ID PPDB diperlukan' }

      await prisma.ppdb.delete({
        where: { id: Number(id) },
      })

      return { message: 'Data PPDB berhasil dihapus' }
    }

    default:
      return { message: 'Method tidak diizinkan' }
  }
})

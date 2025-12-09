import { PrismaClient } from '@prisma/client'
import { readMultipartFormData } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  switch (method) {
    case 'GET': {
      const data = await prisma.ppdb.findMany()
      return data
    }

    case 'POST': {
      const parts = await readMultipartFormData(event)

      const get = (key: string) => parts.find((p) => p.name === key)?.data.toString() || ''

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
        },
      })

      return newEntry
    }

    case 'PUT': {
      const id = getQuery(event).id
      if (!id) return { message: 'ID PPDB diperlukan' }

      const parts = await readMultipartFormData(event)
      const get = (key: string) => parts.find((p) => p.name === key)?.data.toString() || ''

      const exists = await prisma.ppdb.findUnique({
        where: { id: Number(id) },
      })

      if (!exists) return { message: 'Data tidak ditemukan' }

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

<script setup lang="ts">
  import { ref, reactive, watch } from 'vue'
  import { z } from 'zod'
  import { useToast } from '#imports'

  const toast = useToast()

  const step = ref(1)

  const errors = reactive({
    identitas: {},
    orangTua: {},
    periodik: {},
    dokumen: {},
  })

  const form = reactive({
    identitas: {
      nama: '',
      jk: '',
      nik: '',
      no_kk: '',
      tempat_lahir: '',
      tgl_lahir: '',
      no_akte: '',
      agama: '',
      kewarganegaraan: '',
      alamat: '',
      tinggal_bersama: '',
      anak_ke: '',
      usia: '',
      no_hp: '',
    },
    orangTua: {
      namaAyah: '',
      nikAyah: '',
      tahunLahirAyah: '',
      pendidikanAyah: '',
      pekerjaanAyah: '',
      penghasilanAyah: '',
      namaIbu: '',
      nikIbu: '',
      tahunLahirIbu: '',
      pendidikanIbu: '',
      pekerjaanIbu: '',
      penghasilanIbu: '',
    },
    periodik: {
      tinggiBadan: '',
      beratBadan: '',
      lingkarKepala: '',
      jarakTempuh: '',
      jumlahSaudara: '',
    },
    dokumen: {
      buktiPembayaran: null as File | null,
      lampiran: null as File | null,
      kartuKeluarga: null as File | null,
      akteKelahiran: null as File | null,
    },
  })

  const jkOptions = ['Laki-laki', 'Perempuan']
  const agamaOptions = ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu']
  const pendidikanOptions = ['SD', 'SMP', 'SMA', 'S1', 'S2', 'S3']

  // =================== SCHEMA =======================
  const identitasSchema = z.object({
    nama: z.string().min(1, { message: 'Nama wajib diisi' }),
    jk: z.string().min(1, { message: 'Pilih jenis kelamin' }),

    nik: z
      .string()
      .regex(/^[0-9]+$/, { message: 'NIK hanya angka' })
      .length(16, { message: 'NIK harus 16 digit' }),

    no_kk: z
      .string()
      .regex(/^[0-9]+$/, { message: 'No KK hanya angka' })
      .length(16, { message: 'No KK harus 16 digit' }),

    tempat_lahir: z.string().min(1, { message: 'Tempat lahir wajib diisi' }),
    tgl_lahir: z.string().min(1, { message: 'Tanggal lahir wajib diisi' }),

    no_akte: z
      .string()
      .max(20, { message: 'No Akte maksimal 20 karakter' }),

    agama: z.string().min(1, { message: 'Agama wajib diisi' }),
    kewarganegaraan: z.string().min(1, { message: 'Isi kewarganegaraan' }),

    alamat: z.string().min(1, { message: 'Alamat wajib diisi' }),

    tinggal_bersama: z.string().min(1, { message: 'Wajib diisi' }),

    anak_ke: z
      .string()
      .regex(/^[0-9]+$/, { message: 'Hanya angka' })
      .refine((v) => +v >= 1 && +v <= 10, { message: 'Anak ke harus 1–10' }),

    usia: z
      .string()
      .regex(/^[0-9]+$/, { message: 'Hanya angka' })
      .refine((v) => +v >= 3 && +v <= 7, { message: 'Usia 3–7 tahun' }),

    no_hp: z
      .string()
      .regex(/^[0-9]+$/, { message: 'Hanya angka' })
      .max(13, { message: 'Max 13 digit' }),
  })

  const orangTuaSchema = z.object({
    namaAyah: z.string().min(1, 'Nama Ayah wajib diisi'),
    nikAyah: z
      .string()
      .regex(/^[0-9]+$/, 'NIK Ayah hanya boleh angka')
      .length(16, 'NIK Ayah harus 16 digit'),
    tahunLahirAyah: z
      .string()
      .regex(/^[0-9]+$/, 'Tahun lahir Ayah hanya angka')
      .refine((v) => +v >= 1950 && +v <= 2020, 'Tahun lahir tidak valid'),
    pendidikanAyah: z.string().min(1, 'Pendidikan Ayah wajib diisi'),
    pekerjaanAyah: z.string().min(1, 'Pekerjaan Ayah wajib diisi'),
    penghasilanAyah: z
      .string()
      .min(1, 'Penghasilan Ayah wajib diisi')
      .regex(/^[0-9]+$/, 'Penghasilan Ayah hanya boleh angka'),

    namaIbu: z.string().min(1, 'Nama Ibu wajib diisi'),
    nikIbu: z
      .string()
      .regex(/^[0-9]+$/, 'NIK Ibu hanya boleh angka')
      .length(16, 'NIK Ibu harus 16 digit'),
    tahunLahirIbu: z
      .string()
      .regex(/^[0-9]+$/, 'Tahun lahir Ibu hanya angka')
      .refine((v) => +v >= 1950 && +v <= 2020, 'Tahun lahir tidak valid'),
    pendidikanIbu: z.string().min(1, 'Pendidikan Ibu wajib diisi'),
    pekerjaanIbu: z.string().min(1, 'Pekerjaan Ibu wajib diisi'),
    penghasilanIbu: z
      .string()
      .min(1, 'Penghasilan Ibu wajib diisi')
      .regex(/^[0-9]+$/, 'Penghasilan Ibu hanya boleh angka'),
  })

  const periodikSchema = z.object({
    tinggiBadan: z
      .string()
      .regex(/^[0-9]+$/, 'Tinggi badan hanya angka')
      .refine((v) => +v >= 30 && +v <= 180, 'Tinggi harus 30–180 cm'),

    beratBadan: z
      .string()
      .regex(/^[0-9]+$/, 'Berat badan hanya angka')
      .refine((v) => +v >= 5 && +v <= 100, 'Berat harus 5–100 kg'),

    lingkarKepala: z
      .string()
      .regex(/^[0-9]+$/, 'Lingkar kepala hanya angka')
      .refine((v) => +v >= 20 && +v <= 100, 'Lingkar 20–100 cm'),

    jarakTempuh: z
      .string()
      .regex(/^[0-9]+$/, 'Jarak tempuh hanya angka')
      .refine((v) => +v >= 0 && +v <= 30, 'Jarak max 30 km'),

    jumlahSaudara: z
      .string()
      .regex(/^[0-9]+$/, 'Jumlah saudara hanya angka')
      .refine((v) => +v >= 0 && +v <= 15, 'Jumlah saudara max 15'),
  })

  const stepToKey = () =>
    step.value === 1
      ? 'identitas'
      : step.value === 2
        ? 'orangTua'
        : step.value === 3
          ? 'periodik'
          : 'dokumen'

  const validateStep = () => {
    if (step.value === 4) return true

    const key = stepToKey()
    const schema =
      step.value === 1 ? identitasSchema : step.value === 2 ? orangTuaSchema : periodikSchema

    const result = schema.safeParse(form[key])

    errors[key] = {}

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        errors[key][issue.path[0]] = issue.message
      })

      toast.add({
        title: 'Validasi Gagal',
        description: result.error.issues[0].message,
        color: 'error',
        duration: 3000,
      })

      return false
    }

    return true
  }

  const nextStep = () => {
    if (validateStep()) step.value++
  }

  const prevStep = () => step.value--

  const submitForm = async () => {
    if (!validateStep()) return

    try {
      const body = new FormData()

      Object.entries(form.identitas).forEach(([k, v]) => body.append(k, v))
      Object.entries(form.orangTua).forEach(([k, v]) => body.append(k, v))
      Object.entries(form.periodik).forEach(([k, v]) => body.append(k, v))

      if (form.dokumen.buktiPembayaran) {
        body.append('buktiPembayaran', form.dokumen.buktiPembayaran)
      }
      if (form.dokumen.kartuKeluarga) {
        body.append('kartuKeluarga', form.dokumen.kartuKeluarga)
      }
      if (form.dokumen.akteKelahiran) {
        body.append('akteKelahiran', form.dokumen.akteKelahiran)
      }
      if (form.dokumen.lampiran) {
        body.append('lampiran', form.dokumen.lampiran)
      }

      const response = await $fetch('/api/ppdb', { method: 'POST', body })

      if (!response) {
        throw new Error('Respons server kosong')
      }

      toast.add({
        title: 'Data PPDB Berhasil Disimpan',
        duration: 3000,
        color: 'success',
      })

      step.value = 1
      form.identitas = {
        nama: '',
        jk: '',
        nik: '',
        no_kk: '',
        tempat_lahir: '',
        tgl_lahir: '',
        no_akte: '',
        agama: '',
        kewarganegaraan: '',
        alamat: '',
        tinggal_bersama: '',
        anak_ke: '',
        usia: '',
        no_hp: '',
      }
      form.orangTua = {
        namaAyah: '',
        nikAyah: '',
        tahunLahirAyah: '',
        pendidikanAyah: '',
        pekerjaanAyah: '',
        penghasilanAyah: '',
        namaIbu: '',
        nikIbu: '',
        tahunLahirIbu: '',
        pendidikanIbu: '',
        pekerjaanIbu: '',
        penghasilanIbu: '',
      }
      form.periodik = {
        tinggiBadan: '',
        beratBadan: '',
        lingkarKepala: '',
        jarakTempuh: '',
        jumlahSaudara: '',
      }
      form.dokumen = {
        buktiPembayaran: null,
        lampiran: null,
        kartuKeluarga: null,
        akteKelahiran: null,
      }
    } catch (error: any) {
      console.error('Error submitting form:', error)
      const errorMessage = error?.data?.message || error?.message || 'Terjadi kesalahan saat menyimpan data'
      toast.add({
        title: 'Gagal Menyimpan Data',
        description: errorMessage,
        color: 'error',
        duration: 5000,
      })
    }
  }

  const handleNumericInput = (value: string, maxLength: number = 16) => {
    const numericOnly = value.replace(/\D/g, '')
    return numericOnly.slice(0, maxLength)
  }

  watch(
    () => form.identitas.nik,
    (newValue) => {
      const filtered = handleNumericInput(newValue, 16)
      if (filtered !== newValue) {
        form.identitas.nik = filtered
      }
    }
  )

  watch(
    () => form.identitas.no_kk,
    (newValue) => {
      const filtered = handleNumericInput(newValue, 16)
      if (filtered !== newValue) {
        form.identitas.no_kk = filtered
      }
    }
  )

  watch(
    () => form.identitas.anak_ke,
    (newValue) => {
      const filtered = handleNumericInput(newValue, 2)
      if (filtered !== newValue) {
        form.identitas.anak_ke = filtered
      }
    }
  )

  watch(
    () => form.identitas.usia,
    (newValue) => {
      const filtered = handleNumericInput(newValue, 2)
      if (filtered !== newValue) {
        form.identitas.usia = filtered
      }
    }
  )

  watch(
    () => form.identitas.no_hp,
    (newValue) => {
      const filtered = handleNumericInput(newValue, 13)
      if (filtered !== newValue) {
        form.identitas.no_hp = filtered
      }
    }
  )

  watch(
    () => form.orangTua.nikAyah,
    (newValue) => {
      const filtered = handleNumericInput(newValue, 16)
      if (filtered !== newValue) {
        form.orangTua.nikAyah = filtered
      }
    }
  )

  watch(
    () => form.orangTua.nikIbu,
    (newValue) => {
      const filtered = handleNumericInput(newValue, 16)
      if (filtered !== newValue) {
        form.orangTua.nikIbu = filtered
      }
    }
  )

  watch(
    () => form.orangTua.tahunLahirAyah,
    (newValue) => {
      const filtered = handleNumericInput(newValue, 4)
      if (filtered !== newValue) {
        form.orangTua.tahunLahirAyah = filtered
      }
    }
  )

  watch(
    () => form.orangTua.tahunLahirIbu,
    (newValue) => {
      const filtered = handleNumericInput(newValue, 4)
      if (filtered !== newValue) {
        form.orangTua.tahunLahirIbu = filtered
      }
    }
  )

  watch(
    () => form.orangTua.penghasilanAyah,
    (newValue) => {
      const filtered = handleNumericInput(newValue, 20)
      if (filtered !== newValue) {
        form.orangTua.penghasilanAyah = filtered
      }
    }
  )

  watch(
    () => form.orangTua.penghasilanIbu,
    (newValue) => {
      const filtered = handleNumericInput(newValue, 20)
      if (filtered !== newValue) {
        form.orangTua.penghasilanIbu = filtered
      }
    }
  )

  watch(
    () => form.periodik.tinggiBadan,
    (newValue) => {
      const filtered = handleNumericInput(newValue, 3)
      if (filtered !== newValue) {
        form.periodik.tinggiBadan = filtered
      }
    }
  )

  watch(
    () => form.periodik.beratBadan,
    (newValue) => {
      const filtered = handleNumericInput(newValue, 3)
      if (filtered !== newValue) {
        form.periodik.beratBadan = filtered
      }
    }
  )

  watch(
    () => form.periodik.lingkarKepala,
    (newValue) => {
      const filtered = handleNumericInput(newValue, 3)
      if (filtered !== newValue) {
        form.periodik.lingkarKepala = filtered
      }
    }
  )

  watch(
    () => form.periodik.jarakTempuh,
    (newValue) => {
      const filtered = handleNumericInput(newValue, 3)
      if (filtered !== newValue) {
        form.periodik.jarakTempuh = filtered
      }
    }
  )

  watch(
    () => form.periodik.jumlahSaudara,
    (newValue) => {
      const filtered = handleNumericInput(newValue, 2)
      if (filtered !== newValue) {
        form.periodik.jumlahSaudara = filtered
      }
    }
  )

  const handleNikInput = (event: Event) => {
    const target = (event.target as HTMLInputElement) || (event.currentTarget as HTMLInputElement)
    if (target) {
      form.identitas.nik = handleNumericInput(target.value, 16)
    }
  }

  const handleNoKkInput = (event: Event) => {
    const target = (event.target as HTMLInputElement) || (event.currentTarget as HTMLInputElement)
    if (target) {
      form.identitas.no_kk = handleNumericInput(target.value, 16)
    }
  }

  const handleAnakKeInput = (event: Event) => {
    const target = (event.target as HTMLInputElement) || (event.currentTarget as HTMLInputElement)
    if (target) {
      form.identitas.anak_ke = handleNumericInput(target.value, 2)
    }
  }

  const handleUsiaInput = (event: Event) => {
    const target = (event.target as HTMLInputElement) || (event.currentTarget as HTMLInputElement)
    if (target) {
      form.identitas.usia = handleNumericInput(target.value, 2)
    }
  }

  const handleNoHpInput = (event: Event) => {
    const target = (event.target as HTMLInputElement) || (event.currentTarget as HTMLInputElement)
    if (target) {
      form.identitas.no_hp = handleNumericInput(target.value, 13)
    }
  }

  const handleNikAyahInput = (event: Event) => {
    const target = (event.target as HTMLInputElement) || (event.currentTarget as HTMLInputElement)
    if (target) {
      form.orangTua.nikAyah = handleNumericInput(target.value, 16)
    }
  }

  const handleNikIbuInput = (event: Event) => {
    const target = (event.target as HTMLInputElement) || (event.currentTarget as HTMLInputElement)
    if (target) {
      form.orangTua.nikIbu = handleNumericInput(target.value, 16)
    }
  }

  const handleTahunLahirAyahInput = (event: Event) => {
    const target = (event.target as HTMLInputElement) || (event.currentTarget as HTMLInputElement)
    if (target) {
      form.orangTua.tahunLahirAyah = handleNumericInput(target.value, 4)
    }
  }

  const handleTahunLahirIbuInput = (event: Event) => {
    const target = (event.target as HTMLInputElement) || (event.currentTarget as HTMLInputElement)
    if (target) {
      form.orangTua.tahunLahirIbu = handleNumericInput(target.value, 4)
    }
  }

  const handlePenghasilanAyahInput = (event: Event) => {
    const target = (event.target as HTMLInputElement) || (event.currentTarget as HTMLInputElement)
    if (target) {
      const cleanedValue = target.value.replace(/\D/g, '').slice(0, 20)
      form.orangTua.penghasilanAyah = cleanedValue
      target.value = cleanedValue
    }
  }

  const handlePenghasilanIbuInput = (event: Event) => {
    const target = (event.target as HTMLInputElement) || (event.currentTarget as HTMLInputElement)
    if (target) {
      const cleanedValue = target.value.replace(/\D/g, '').slice(0, 20)
      form.orangTua.penghasilanIbu = cleanedValue
      target.value = cleanedValue
    }
  }

  const handleTinggiBadanInput = (event: Event) => {
    const target = (event.target as HTMLInputElement) || (event.currentTarget as HTMLInputElement)
    if (target) {
      form.periodik.tinggiBadan = handleNumericInput(target.value, 3)
    }
  }

  const handleBeratBadanInput = (event: Event) => {
    const target = (event.target as HTMLInputElement) || (event.currentTarget as HTMLInputElement)
    if (target) {
      form.periodik.beratBadan = handleNumericInput(target.value, 3)
    }
  }

  const handleLingkarKepalaInput = (event: Event) => {
    const target = (event.target as HTMLInputElement) || (event.currentTarget as HTMLInputElement)
    if (target) {
      form.periodik.lingkarKepala = handleNumericInput(target.value, 3)
    }
  }

  const handleJarakTempuhInput = (event: Event) => {
    const target = (event.target as HTMLInputElement) || (event.currentTarget as HTMLInputElement)
    if (target) {
      form.periodik.jarakTempuh = handleNumericInput(target.value, 3)
    }
  }

  const handleJumlahSaudaraInput = (event: Event) => {
    const target = (event.target as HTMLInputElement) || (event.currentTarget as HTMLInputElement)
    if (target) {
      form.periodik.jumlahSaudara = handleNumericInput(target.value, 2)
    }
  }
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <!-- ================= STEP 1 ================= -->
    <UCard v-if="step === 1" class="space-y-4 p-6">
      <h1 class="text-2xl font-bold text-center mb-6">Form PPDB PAUD</h1>
      <USeparator label="IDENTITAS PESERTA DIDIK" size="lg" />

      <UForm class="space-y-4">
        <UFormField label="Nama Lengkap">
          <UInput
            v-model="form.identitas.nama"
            placeholder="Nama lengkap peserta didik"
            :ui="{
              container: 'border !border-blue-400 rounded-md',
              base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
            }"
          />
          <p v-if="errors.identitas.nama" class="text-sm text-red-500">
            {{ errors.identitas.nama }}
          </p>
        </UFormField>

        <UFormField label="Jenis Kelamin">
          <USelect
            :items="jkOptions"
            v-model="form.identitas.jk"
            placeholder="Pilih jenis kelamin"
            :ui="{
              container: 'border !border-blue-400 rounded-md',
              base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
            }"
          />
          <p v-if="errors.identitas.jk" class="text-sm text-red-500">{{ errors.identitas.jk }}</p>
        </UFormField>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormField label="NIK">
            <UInput
              v-model="form.identitas.nik"
              placeholder="16 digit NIK"
              maxlength="16"
              @input="handleNikInput"
              :ui="{
                container: 'border !border-blue-400 rounded-md',
                base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
              }"
            />
            <p v-if="errors.identitas.nik" class="text-sm text-red-500">
              {{ errors.identitas.nik }}
            </p>
          </UFormField>

          <UFormField label="No KK">
            <UInput
              v-model="form.identitas.no_kk"
              placeholder="16 digit KK"
              maxlength="16"
              @input="handleNoKkInput"
              :ui="{
                container: 'border !border-blue-400 rounded-md',
                base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
              }"
            />
            <p v-if="errors.identitas.no_kk" class="text-sm text-red-500">
              {{ errors.identitas.no_kk }}
            </p>
          </UFormField>
        </div>

        <UFormField label="Tempat Lahir">
          <UInput
            v-model="form.identitas.tempat_lahir"
            placeholder="Contoh: Surabaya"
            :ui="{
              container: 'border !border-blue-400 rounded-md',
              base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
            }"
          />
          <p v-if="errors.identitas.tempat_lahir" class="text-sm text-red-500">
            {{ errors.identitas.tempat_lahir }}
          </p>
        </UFormField>

        <UFormField label="Tanggal Lahir">
          <UInput
            type="date"
            v-model="form.identitas.tgl_lahir"
            placeholder="Pilih tanggal lahir"
            :ui="{
              container: 'border !border-blue-400 rounded-md',
              base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
            }"
          />
          <p v-if="errors.identitas.tgl_lahir" class="text-sm text-red-500">
            {{ errors.identitas.tgl_lahir }}
          </p>
        </UFormField>

        <UFormField label="Nomor Akte">
          <UInput
            v-model="form.identitas.no_akte"
            placeholder="Nomor akte kelahiran"
            maxlength="20"
            :ui="{
              container: 'border !border-blue-400 rounded-md',
              base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
            }"
          />
          <p v-if="errors.identitas.no_akte" class="text-sm text-red-500">
            {{ errors.identitas.no_akte }}
          </p>
        </UFormField>

        <UFormField label="Agama">
          <USelect
            :items="agamaOptions"
            v-model="form.identitas.agama"
            placeholder="Pilih agama"
            :ui="{
              container: 'border !border-blue-400 rounded-md',
              base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
            }"
          />
          <p v-if="errors.identitas.agama" class="text-sm text-red-500">
            {{ errors.identitas.agama }}
          </p>
        </UFormField>

        <UFormField label="Kewarganegaraan">
          <UInput
            v-model="form.identitas.kewarganegaraan"
            placeholder="Contoh: Indonesia"
            :ui="{
              container: 'border !border-blue-400 rounded-md',
              base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
            }"
          />
          <p v-if="errors.identitas.kewarganegaraan" class="text-sm text-red-500">
            {{ errors.identitas.kewarganegaraan }}
          </p>
        </UFormField>

        <UFormField label="Alamat">
          <UTextarea
            v-model="form.identitas.alamat"
            placeholder="Alamat lengkap"
            :ui="{
              container: 'border !border-blue-400 rounded-md',
              base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
            }"
          />
          <p v-if="errors.identitas.alamat" class="text-sm text-red-500">
            {{ errors.identitas.alamat }}
          </p>
        </UFormField>

        <UFormField label="Tinggal Bersama">
          <USelect
            :items="['Orang Tua', 'Wali']"
            v-model="form.identitas.tinggal_bersama"
            placeholder="Pilih tinggal bersama"
            :ui="{
              container: 'border !border-blue-400 rounded-md',
              base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
            }"
          />
          <p v-if="errors.identitas.tinggal_bersama" class="text-sm text-red-500">
            {{ errors.identitas.tinggal_bersama }}
          </p>
        </UFormField>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UFormField label="Anak Ke">
            <UInput
              v-model="form.identitas.anak_ke"
              placeholder="Contoh: 1"
              maxlength="2"
              @input="handleAnakKeInput"
              :ui="{
                container: 'border !border-blue-400 rounded-md',
                base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
              }"
            />
            <p v-if="errors.identitas.anak_ke" class="text-sm text-red-500">
              {{ errors.identitas.anak_ke }}
            </p>
          </UFormField>

          <UFormField label="Usia">
            <UInput
              v-model="form.identitas.usia"
              placeholder="Contoh: 5"
              maxlength="2"
              @input="handleUsiaInput"
              :ui="{
                container: 'border !border-blue-400 rounded-md',
                base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
              }"
            />
            <p v-if="errors.identitas.usia" class="text-sm text-red-500">
              {{ errors.identitas.usia }}
            </p>
          </UFormField>

          <UFormField label="No HP">
            <UInput
              v-model="form.identitas.no_hp"
              placeholder="Nomor handphone aktif"
              maxlength="13"
              @input="handleNoHpInput"
              :ui="{
                container: 'border !border-blue-400 rounded-md',
                base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
              }"
            />
            <p v-if="errors.identitas.no_hp" class="text-sm text-red-500">
              {{ errors.identitas.no_hp }}
            </p>
          </UFormField>
        </div>

        <div class="flex justify-end">
          <UButton @click="nextStep">Next</UButton>
        </div>
      </UForm>
    </UCard>

    <!-- ================= STEP 2 ================= -->
    <UCard v-if="step === 2" class="space-y-4 p-6">
      <USeparator label="DATA ORANG TUA / WALI" size="lg" />

      <UForm class="space-y-4">
        <h3 class="font-semibold">Data Ayah</h3>

        <UFormField label="Nama Ayah">
          <UInput
            v-model="form.orangTua.namaAyah"
            placeholder="Nama ayah"
            :ui="{
              container: 'border !border-blue-400 rounded-md',
              base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
            }"
          />
          <p v-if="errors.orangTua.namaAyah" class="text-sm text-red-500">
            {{ errors.orangTua.namaAyah }}
          </p>
        </UFormField>

        <UFormField label="NIK Ayah">
          <UInput
            v-model="form.orangTua.nikAyah"
            placeholder="16 digit NIK Ayah"
            maxlength="16"
            @input="handleNikAyahInput"
            :ui="{
              container: 'border !border-blue-400 rounded-md',
              base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
            }"
          />
          <p v-if="errors.orangTua.nikAyah" class="text-sm text-red-500">
            {{ errors.orangTua.nikAyah }}
          </p>
        </UFormField>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UFormField label="Tahun Lahir Ayah">
            <UInput
              v-model="form.orangTua.tahunLahirAyah"
              placeholder="Contoh: 1980"
              maxlength="4"
              @input="handleTahunLahirAyahInput"
              :ui="{
                container: 'border !border-blue-400 rounded-md',
                base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
              }"
            />
            <p v-if="errors.orangTua.tahunLahirAyah" class="text-sm text-red-500">
              {{ errors.orangTua.tahunLahirAyah }}
            </p>
          </UFormField>

          <UFormField label="Pendidikan Ayah">
            <USelect
              :items="pendidikanOptions"
              v-model="form.orangTua.pendidikanAyah"
              placeholder="Pilih pendidikan"
              :ui="{
                container: 'border !border-blue-400 rounded-md',
                base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
              }"
            />
            <p v-if="errors.orangTua.pendidikanAyah" class="text-sm text-red-500">
              {{ errors.orangTua.pendidikanAyah }}
            </p>
          </UFormField>

          <UFormField label="Pekerjaan Ayah">
            <UInput
              v-model="form.orangTua.pekerjaanAyah"
              placeholder="Pekerjaan"
              :ui="{
                container: 'border !border-blue-400 rounded-md',
                base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
              }"
            />
            <p v-if="errors.orangTua.pekerjaanAyah" class="text-sm text-red-500">
              {{ errors.orangTua.pekerjaanAyah }}
            </p>
          </UFormField>
        </div>

        <UFormField label="Penghasilan Ayah">
          <UInput
            v-model="form.orangTua.penghasilanAyah"
            type="text"
            inputmode="numeric"
            placeholder="Penghasilan per bulan (angka saja)"
            maxlength="20"
            @input="handlePenghasilanAyahInput"
            :ui="{
              container: 'border !border-blue-400 rounded-md',
              base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
            }"
          />
          <p v-if="errors.orangTua.penghasilanAyah" class="text-sm text-red-500">
            {{ errors.orangTua.penghasilanAyah }}
          </p>
        </UFormField>

        <h3 class="font-semibold mt-4">Data Ibu</h3>

        <UFormField label="Nama Ibu">
          <UInput
            v-model="form.orangTua.namaIbu"
            placeholder="Nama ibu"
            :ui="{
              container: 'border !border-blue-400 rounded-md',
              base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
            }"
          />
          <p v-if="errors.orangTua.namaIbu" class="text-sm text-red-500">
            {{ errors.orangTua.namaIbu }}
          </p>
        </UFormField>

        <UFormField label="NIK Ibu">
          <UInput
            v-model="form.orangTua.nikIbu"
            placeholder="16 digit NIK Ibu"
            maxlength="16"
            @input="handleNikIbuInput"
            :ui="{
              container: 'border !border-blue-400 rounded-md',
              base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
            }"
          />
          <p v-if="errors.orangTua.nikIbu" class="text-sm text-red-500">
            {{ errors.orangTua.nikIbu }}
          </p>
        </UFormField>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UFormField label="Tahun Lahir Ibu">
            <UInput
              v-model="form.orangTua.tahunLahirIbu"
              placeholder="Contoh: 1982"
              maxlength="4"
              @input="handleTahunLahirIbuInput"
              :ui="{
                container: 'border !border-blue-400 rounded-md',
                base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
              }"
            />
            <p v-if="errors.orangTua.tahunLahirIbu" class="text-sm text-red-500">
              {{ errors.orangTua.tahunLahirIbu }}
            </p>
          </UFormField>

          <UFormField label="Pendidikan Ibu">
            <USelect
              :items="pendidikanOptions"
              v-model="form.orangTua.pendidikanIbu"
              placeholder="Pilih pendidikan"
              :ui="{
                container: 'border !border-blue-400 rounded-md',
                base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
              }"
            />
            <p v-if="errors.orangTua.pendidikanIbu" class="text-sm text-red-500">
              {{ errors.orangTua.pendidikanIbu }}
            </p>
          </UFormField>

          <UFormField label="Pekerjaan Ibu">
            <UInput
              v-model="form.orangTua.pekerjaanIbu"
              placeholder="Pekerjaan"
              :ui="{
                container: 'border !border-blue-400 rounded-md',
                base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
              }"
            />
            <p v-if="errors.orangTua.pekerjaanIbu" class="text-sm text-red-500">
              {{ errors.orangTua.pekerjaanIbu }}
            </p>
          </UFormField>
        </div>

        <UFormField label="Penghasilan Ibu">
          <UInput
            v-model="form.orangTua.penghasilanIbu"
            type="text"
            inputmode="numeric"
            placeholder="Penghasilan per bulan (angka saja)"
            maxlength="20"
            @input="handlePenghasilanIbuInput"
            :ui="{
              container: 'border !border-blue-400 rounded-md',
              base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
            }"
          />
          <p v-if="errors.orangTua.penghasilanIbu" class="text-sm text-red-500">
            {{ errors.orangTua.penghasilanIbu }}
          </p>
        </UFormField>

        <div class="flex justify-between">
          <UButton color="secondary" @click="prevStep">Back</UButton>
          <UButton color="success" @click="nextStep">Next</UButton>
        </div>
      </UForm>
    </UCard>

    <!-- ================= STEP 3 ================= -->
    <UCard v-if="step === 3" class="space-y-4 p-6">
      <USeparator label="DATA PERIODIK" size="lg" />

      <UForm class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UFormField label="Tinggi Badan (cm)">
            <UInput
              v-model="form.periodik.tinggiBadan"
              placeholder="Contoh: 110"
              maxlength="3"
              @input="handleTinggiBadanInput"
              :ui="{
                container: 'border !border-blue-400 rounded-md',
                base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
              }"
            />
            <p v-if="errors.periodik.tinggiBadan" class="text-sm text-red-500">
              {{ errors.periodik.tinggiBadan }}
            </p>
          </UFormField>

          <UFormField label="Berat Badan (kg)">
            <UInput
              v-model="form.periodik.beratBadan"
              placeholder="Contoh: 20"
              maxlength="3"
              @input="handleBeratBadanInput"
              :ui="{
                container: 'border !border-blue-400 rounded-md',
                base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
              }"
            />
            <p v-if="errors.periodik.beratBadan" class="text-sm text-red-500">
              {{ errors.periodik.beratBadan }}
            </p>
          </UFormField>

          <UFormField label="Lingkar Kepala (cm)">
            <UInput
              v-model="form.periodik.lingkarKepala"
              placeholder="Contoh: 45"
              maxlength="3"
              @input="handleLingkarKepalaInput"
              :ui="{
                container: 'border !border-blue-400 rounded-md',
                base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
              }"
            />
            <p v-if="errors.periodik.lingkarKepala" class="text-sm text-red-500">
              {{ errors.periodik.lingkarKepala }}
            </p>
          </UFormField>
        </div>

        <UFormField label="Jarak Tempuh ke Sekolah (km)">
          <UInput
            v-model="form.periodik.jarakTempuh"
            placeholder="Contoh: 3"
            maxlength="3"
            @input="handleJarakTempuhInput"
            :ui="{
              container: 'border !border-blue-400 rounded-md',
              base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
            }"
          />
          <p v-if="errors.periodik.jarakTempuh" class="text-sm text-red-500">
            {{ errors.periodik.jarakTempuh }}
          </p>
        </UFormField>

        <UFormField label="Jumlah Saudara">
          <UInput
            v-model="form.periodik.jumlahSaudara"
            placeholder="Contoh: 2"
            maxlength="2"
            @input="handleJumlahSaudaraInput"
            :ui="{
              container: 'border !border-blue-400 rounded-md',
              base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
            }"
          />
          <p v-if="errors.periodik.jumlahSaudara" class="text-sm text-red-500">
            {{ errors.periodik.jumlahSaudara }}
          </p>
        </UFormField>

        <div class="flex justify-between">
          <UButton color="secondary" @click="prevStep">Back</UButton>
          <UButton color="success" @click="nextStep">Next</UButton>
        </div>
      </UForm>
    </UCard>

    <!-- ================= STEP 4 ================= -->
    <UCard v-if="step === 4" class="space-y-4 p-6">
      <USeparator label="UPLOAD DOKUMEN" size="lg" />

      <UForm class="space-y-4">
        <UFormField label="Bukti Pembayaran">
          <input
            type="file"
            accept="image/*,.pdf"
            @change="(e) => {
              const target = e.target as HTMLInputElement
              if (target.files && target.files[0]) {
                form.dokumen.buktiPembayaran = target.files[0]
              }
            }"
            class="w-full p-2 border border-blue-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p class="text-sm text-gray-500 mt-1">
            Format: JPG, PNG, atau PDF (Maksimal 5MB)
          </p>
          <p v-if="form.dokumen.buktiPembayaran" class="text-sm text-green-600 mt-1">
            File terpilih: {{ form.dokumen.buktiPembayaran.name }}
          </p>
          <p v-if="errors.dokumen.buktiPembayaran" class="text-sm text-red-500">
            {{ errors.dokumen.buktiPembayaran }}
          </p>
        </UFormField>

        <UFormField label="Kartu Keluarga">
          <input
            type="file"
            accept="image/*,.pdf"
            @change="(e) => {
              const target = e.target as HTMLInputElement
              if (target.files && target.files[0]) {
                form.dokumen.kartuKeluarga = target.files[0]
              }
            }"
            class="w-full p-2 border border-blue-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p class="text-sm text-gray-500 mt-1">
            Format: JPG, PNG, atau PDF (Maksimal 5MB)
          </p>
          <p v-if="form.dokumen.kartuKeluarga" class="text-sm text-green-600 mt-1">
            File terpilih: {{ form.dokumen.kartuKeluarga.name }}
          </p>
          <p v-if="errors.dokumen.kartuKeluarga" class="text-sm text-red-500">
            {{ errors.dokumen.kartuKeluarga }}
          </p>
        </UFormField>

        <UFormField label="Akte Kelahiran">
          <input
            type="file"
            accept="image/*,.pdf"
            @change="(e) => {
              const target = e.target as HTMLInputElement
              if (target.files && target.files[0]) {
                form.dokumen.akteKelahiran = target.files[0]
              }
            }"
            class="w-full p-2 border border-blue-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p class="text-sm text-gray-500 mt-1">
            Format: JPG, PNG, atau PDF (Maksimal 5MB)
          </p>
          <p v-if="form.dokumen.akteKelahiran" class="text-sm text-green-600 mt-1">
            File terpilih: {{ form.dokumen.akteKelahiran.name }}
          </p>
          <p v-if="errors.dokumen.akteKelahiran" class="text-sm text-red-500">
            {{ errors.dokumen.akteKelahiran }}
          </p>
        </UFormField>

        <UFormField label="Lampiran (Opsional)">
          <input
            type="file"
            accept="image/*,.pdf"
            @change="(e) => {
              const target = e.target as HTMLInputElement
              if (target.files && target.files[0]) {
                form.dokumen.lampiran = target.files[0]
              }
            }"
            class="w-full p-2 border border-blue-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p class="text-sm text-gray-500 mt-1">
            Format: JPG, PNG, atau PDF (Maksimal 5MB)
          </p>
          <p v-if="form.dokumen.lampiran" class="text-sm text-green-600 mt-1">
            File terpilih: {{ form.dokumen.lampiran.name }}
          </p>
          <p v-if="errors.dokumen.lampiran" class="text-sm text-red-500">
            {{ errors.dokumen.lampiran }}
          </p>
        </UFormField>

        <div class="flex justify-between">
          <UButton color="secondary" @click="prevStep">Back</UButton>
          <UButton @click="submitForm">Submit</UButton>
        </div>
      </UForm>
    </UCard>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { z } from 'zod'
  import { useToast } from '#imports'

  const toast = useToast()

  const step = ref(1)

  const errors = reactive({
    identitas: {},
    orangTua: {},
    periodik: {},
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
      .regex(/^[0-9]+$/, { message: 'No Akte hanya angka' })
      .length(20, { message: 'No Akte harus 20 digit' }),

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
    penghasilanAyah: z.string().min(1, 'Penghasilan Ayah wajib dipilih'),

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
    penghasilanIbu: z.string().min(1, 'Penghasilan Ibu wajib dipilih'),
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
    step.value === 1 ? 'identitas' : step.value === 2 ? 'orangTua' : 'periodik'

  const validateStep = () => {
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

    const body = new FormData()

    Object.entries(form.identitas).forEach(([k, v]) => body.append(k, v))
    Object.entries(form.orangTua).forEach(([k, v]) => body.append(k, v))
    Object.entries(form.periodik).forEach(([k, v]) => body.append(k, v))

    const { error } = await useFetch('/api/ppdb', { method: 'POST', body })

    if (error.value) {
      toast.add({
        title: 'Gagal Menyimpan Data',
        color: 'error',
        duration: 3000,
      })
      return
    }

    toast.add({
      title: 'Data PPDB Berhasil Disimpan',
      duration: 3000,
      color: 'success',
    })

    step.value = 1
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
            placeholder="Penghasilan per bulan"
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
            placeholder="Penghasilan per bulan"
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
          <UButton @click="submitForm">Submit</UButton>
        </div>
      </UForm>
    </UCard>
  </div>
</template>

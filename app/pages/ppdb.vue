<script setup lang="ts">
  const step = ref(1)

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

  const jkOptions = ref(['Laki-laki', 'Perempuan'])
  const agamaOptions = ref(['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'])
  const pendidikanOptions = ['SD', 'SMP', 'SMA', 'S1', 'S2', 'S3']

  const nextStep = () => {
    step.value++
  }

  const prevStep = () => {
    step.value--
  }

  const submitForm = () => {
    console.log('Form submitted', form)
    alert('Form submitted! Check console for data.')
  }
</script>

<template>
  <div class="max-w-xl mx-auto p-6 space-y-6 bg-white shadow-md rounded-lg p-6">
    <div v-if="step === 1" class="space-y-4">
      <h2 class="text-center text-xl font-bold">PENERIMAAN PERSERTA DIDIK BARU (PPDB)</h2>
      <h2 class="text-center text-xl font-bold">PENDIDIKAN ANAK USIA DINI (PAUD)</h2>

      <USeparator label="IDENTITAS" />
      <UForm class="space-y-4">
        <UFormField label="Nama Lengkap">
          <UInput v-model="form.identitas.nama" placeholder="Masukkan Nama Lengkap" />
        </UFormField>

        <UFormField label="Jenis Kelamin">
          <USelect
            v-model="form.identitas.jk"
            placeholder="Pilih Jenis Kelamin"
            :items="jkOptions"
          />
        </UFormField>

        <div class="flex gap-4">
          <UFormField label="NIK">
            <UInput v-model="form.identitas.nik" placeholder="Masukkan NIK" />
          </UFormField>
          <UFormField label="No. Kartu Keluarga">
            <UInput v-model="form.identitas.no_kk" placeholder="Masukkan No. KK" />
          </UFormField>
        </div>

        <div class="flex gap-4">
          <UFormField label="Tempat Lahir">
            <UInput v-model="form.identitas.tempat_lahir" placeholder="Masukkan Tempat Lahir" />
          </UFormField>
          <UFormField label="No. Akte Kelahiran">
            <UInput v-model="form.identitas.no_akte" placeholder="Masukkan No. Akte" />
          </UFormField>
        </div>

        <UFormField label="Tanggal Lahir">
          <UInput v-model="form.identitas.tgl_lahir" type="date" />
        </UFormField>

        <UFormField label="Agama">
          <USelect v-model="form.identitas.agama" placeholder="Pilih Agama" :items="agamaOptions" />
        </UFormField>

        <UFormField label="Kewarganegaraan">
          <UInput v-model="form.identitas.kewarganegaraan" placeholder="Masukkan Kewarganegaraan" />
        </UFormField>

        <UFormField label="Alamat Lengkap">
          <UInput v-model="form.identitas.alamat" placeholder="Masukkan Alamat Lengkap" />
        </UFormField>

        <div class="flex gap-4">
          <UFormField label="Tinggal Bersama">
            <UInput
              v-model="form.identitas.tinggal_bersama"
              placeholder="Masukkan Tinggal Bersama"
            />
          </UFormField>
          <UFormField label="Anak Ke">
            <UInput
              v-model="form.identitas.anak_ke"
              type="number"
              placeholder="Masukkan Anak Ke-"
            />
          </UFormField>
        </div>

        <div class="flex gap-4">
          <UFormField label="Usia">
            <UInput v-model="form.identitas.usia" type="number" placeholder="Masukkan Usia" />
          </UFormField>
          <UFormField label="No. HP">
            <UInput v-model="form.identitas.no_hp" placeholder="08xxxx" />
          </UFormField>
        </div>

        <div class="flex justify-end gap-4">
          <UButton type="button" color="primary" @click="nextStep">Next</UButton>
        </div>
      </UForm>
    </div>

    <div v-if="step === 2" class="space-y-4">
      <h2 class="text-center text-xl font-bold">PENERIMAAN PERSERTA DIDIK BARU (PPDB)</h2>
      <h2 class="text-center text-xl font-bold">PENDIDIKAN ANAK USIA DINI (PAUD)</h2>

      <USeparator label="AYAH" />
      <div class="flex justify-between gap-4">
        <UForm class="space-y-4">
          <UFormField label="Nama Ayah">
            <UInput v-model="form.orangTua.namaAyah" placeholder="Masukkan Nama Ayah" />
          </UFormField>

          <div class="flex gap-4">
            <UFormField label="NIK">
              <UInput v-model="form.orangTua.nikAyah" placeholder="Masukkan NIK" />
            </UFormField>
            <UFormField label="Tahun Lahir">
              <UInput
                v-model="form.orangTua.tahunLahirAyah"
                type="number"
                placeholder="Tahun Lahir"
              />
            </UFormField>
          </div>

          <UFormField label="Pendidikan">
            <USelect
              v-model="form.orangTua.pendidikanAyah"
              :items="pendidikanOptions"
              placeholder="Pilih Pendidikan"
            />
          </UFormField>

          <div class="flex gap-4">
            <UFormField label="Pekerjaan">
              <UInput v-model="form.orangTua.pekerjaanAyah" placeholder="Pekerjaan" />
            </UFormField>
            <UFormField label="Penghasilan">
              <UInput v-model="form.orangTua.penghasilanAyah" placeholder="Penghasilan" />
            </UFormField>
          </div>

          <USeparator label="IBU" />
          <UFormField label="Nama Ibu">
            <UInput v-model="form.orangTua.namaIbu" placeholder="Masukkan Nama Ibu" />
          </UFormField>

          <div class="flex gap-4">
            <UFormField label="NIK">
              <UInput v-model="form.orangTua.nikIbu" placeholder="Masukkan NIK" />
            </UFormField>
            <UFormField label="Tahun Lahir">
              <UInput
                v-model="form.orangTua.tahunLahirIbu"
                type="number"
                placeholder="Tahun Lahir"
              />
            </UFormField>
          </div>

          <UFormField label="Pendidikan">
            <USelect
              v-model="form.orangTua.pendidikanIbu"
              :items="pendidikanOptions"
              placeholder="Pilih Pendidikan"
            />
          </UFormField>

          <div class="flex gap-4">
            <UFormField label="Pekerjaan">
              <UInput v-model="form.orangTua.pekerjaanIbu" placeholder="Pekerjaan" />
            </UFormField>
            <UFormField label="Penghasilan">
              <UInput v-model="form.orangTua.penghasilanIbu" placeholder="Penghasilan" />
            </UFormField>
          </div>

          <div class="flex justify-between">
            <UButton type="button" color="secondary" @click="prevStep">Back</UButton>
            <UButton type="button" color="primary" @click="nextStep">Next</UButton>
          </div>
        </UForm>
      </div>
    </div>

    <div v-if="step === 3" class="space-y-4">
      <h2 class="text-center text-xl font-bold">PENERIMAAN PERSERTA DIDIK BARU (PPDB)</h2>
      <h2 class="text-center text-xl font-bold">PENDIDIKAN ANAK USIA DINI (PAUD)</h2>

      <USeparator label="PERIODIK" />
      <UForm class="space-y-4">
        <UFormField label="Tinggi Badan (cm)">
          <UInput
            v-model="form.periodik.tinggiBadan"
            type="number"
            placeholder="Masukkan Tinggi Badan"
          />
        </UFormField>

        <div class="flex gap-4">
          <UFormField label="Berat Badan (kg)">
            <UInput v-model="form.periodik.beratBadan" type="number" placeholder="Berat Badan" />
          </UFormField>
          <UFormField label="Lingkar Kepala (cm)">
            <UInput
              v-model="form.periodik.lingkarKepala"
              type="number"
              placeholder="Lingkar Kepala"
            />
          </UFormField>
        </div>

        <UFormField label="Jarak Tempuh (km)">
          <UInput
            v-model="form.periodik.jarakTempuh"
            type="number"
            placeholder="Masukkan Jarak Tempuh"
          />
        </UFormField>

        <UFormField label="Jumlah Saudara">
          <UInput
            v-model="form.periodik.jumlahSaudara"
            type="number"
            placeholder="Jumlah Saudara"
          />
        </UFormField>

        <div class="flex justify-between">
          <UButton type="button" color="secondary" @click="prevStep">Back</UButton>
          <UButton type="button" color="success" @click="submitForm">Submit</UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>

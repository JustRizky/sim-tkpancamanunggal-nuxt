<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'
  import * as XLSX from 'xlsx'

  interface Ppdb {
    id: number
    // Identitas
    nama: string
    nik: string
    no_kk: string
    jk: string
    tempat_lahir: string
    tgl_lahir: string
    agama: string
    alamat: string
    tinggal_bersama: string
    anak_ke: string
    usia: string
    no_hp: string
    // Orang Tua
    namaAyah: string
    nikAyah: string
    tahunLahirAyah: string
    pendidikanAyah: string
    pekerjaanAyah: string
    penghasilanAyah: string
    namaIbu: string
    nikIbu: string
    tahunLahirIbu: string
    pendidikanIbu: string
    pekerjaanIbu: string
    penghasilanIbu: string
    // Periodik
    tinggiBadan: string
    beratBadan: string
    lingkarKepala: string
    jarakTempuh: string
    jumlahSaudara: string
  }

  const list = ref<Ppdb[]>([])
  const loading = ref(true)
  const deleteModal = ref(false)
  const editModal = ref(false)
  const selectedId = ref<number | null>(null)

  const form = ref<Ppdb>({
    id: 0,
    nama: '',
    nik: '',
    no_kk: '',
    jk: '',
    tempat_lahir: '',
    tgl_lahir: '',
    agama: '',
    alamat: '',
    tinggal_bersama: '',
    anak_ke: '',
    usia: '',
    no_hp: '',
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
    tinggiBadan: '',
    beratBadan: '',
    lingkarKepala: '',
    jarakTempuh: '',
    jumlahSaudara: '',
  })

  const fetchData = async () => {
    loading.value = true
    try {
      const res = await $fetch<Ppdb[]>('/api/ppdb')
      list.value = res || []
    } catch (err: any) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const openEditModal = (item: Ppdb) => {
    selectedId.value = item.id
    form.value = { ...item }
    editModal.value = true
  }

  const updateItem = async () => {
    if (!selectedId.value) return
    const formData = new FormData()
    Object.entries(form.value).forEach(([key, value]) => {
      formData.append(key, value as string)
    })
    try {
      await $fetch(`/api/ppdb?id=${selectedId.value}`, {
        method: 'PUT',
        body: formData,
      })
      list.value = list.value.map((i) => (i.id === selectedId.value ? { ...form.value } : i))
      editModal.value = false
      selectedId.value = null
    } catch (err: any) {
      alert(err.message || 'Gagal mengedit data')
    }
  }

  const deleteItem = async () => {
    if (!selectedId.value) return
    try {
      await $fetch(`/api/ppdb?id=${selectedId.value}`, { method: 'DELETE' })
      list.value = list.value.filter((item) => item.id !== selectedId.value)
      deleteModal.value = false
      selectedId.value = null
    } catch (err: any) {
      alert(err.message || 'Gagal menghapus data')
    }
  }

  // =========================
  // TABLE COLUMNS
  // =========================
  const columns: TableColumn<Ppdb>[] = [
    { accessorKey: 'nama', header: 'Nama' },
    { accessorKey: 'nik', header: 'NIK' },
    { accessorKey: 'no_kk', header: 'No KK' },
    { accessorKey: 'jk', header: 'Jenis Kelamin' },
    { accessorKey: 'tempat_lahir', header: 'Tempat Lahir' },
    { accessorKey: 'tgl_lahir', header: 'Tanggal Lahir' },
    { accessorKey: 'agama', header: 'Agama' },
    { accessorKey: 'alamat', header: 'Alamat' },
    { accessorKey: 'tinggal_bersama', header: 'Tinggal Bersama' },
    { accessorKey: 'anak_ke', header: 'Anak Ke' },
    { accessorKey: 'usia', header: 'Usia' },
    { accessorKey: 'no_hp', header: 'No HP' },
    { id: 'action' },
  ]

  function getDropdownActions(item: Ppdb): DropdownMenuItem[][] {
    return [
      [
        {
          label: 'Edit',
          icon: 'i-lucide-edit',
          onSelect: () => openEditModal(item),
        },
        {
          label: 'Hapus',
          icon: 'i-lucide-trash',
          color: 'error',
          onSelect: () => {
            selectedId.value = item.id
            deleteModal.value = true
          },
        },
      ],
    ]
  }

  // =========================
  // EXPORT KE EXCEL
  // =========================
  const exportToExcel = () => {
    if (list.value.length === 0) return alert('Tidak ada data untuk diexport!')
    const data = list.value.map((item) => ({
      Nama: item.nama,
      NIK: item.nik,
      'No KK': item.no_kk,
      'Jenis Kelamin': item.jk,
      'Tempat Lahir': item.tempat_lahir,
      'Tanggal Lahir': item.tgl_lahir,
      Agama: item.agama,
      Alamat: item.alamat,
      'Tinggal Bersama': item.tinggal_bersama,
      'Anak Ke': item.anak_ke,
      Usia: item.usia,
      'No HP': item.no_hp,
      'Nama Ayah': item.namaAyah,
      'NIK Ayah': item.nikAyah,
      'Tahun Lahir Ayah': item.tahunLahirAyah,
      'Pendidikan Ayah': item.pendidikanAyah,
      'Pekerjaan Ayah': item.pekerjaanAyah,
      'Penghasilan Ayah': item.penghasilanAyah,
      'Nama Ibu': item.namaIbu,
      'NIK Ibu': item.nikIbu,
      'Tahun Lahir Ibu': item.tahunLahirIbu,
      'Pendidikan Ibu': item.pendidikanIbu,
      'Pekerjaan Ibu': item.pekerjaanIbu,
      'Penghasilan Ibu': item.penghasilanIbu,
      'Tinggi Badan': item.tinggiBadan,
      'Berat Badan': item.beratBadan,
      'Lingkar Kepala': item.lingkarKepala,
      'Jarak Tempuh': item.jarakTempuh,
      'Jumlah Saudara': item.jumlahSaudara,
    }))
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'PPDB')
    XLSX.writeFile(workbook, 'PPDB.xlsx')
  }

  onMounted(fetchData)
  definePageMeta({ layout: 'dashboard' })
</script>

<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold">Dashboard PPDB</h1>
        <p class="text-gray-600">Halaman ringkas untuk mengelola PPDB kamu.</p>
      </div>

      <UButton
        color="info"
        variant="solid"
        icon="i-heroicons-document-arrow-down"
        @click="exportToExcel"
      >
        Export Excel
      </UButton>
    </div>

    <div v-if="loading" class="text-gray-500">Loading...</div>

    <div v-else class="overflow-x-auto mt-4">
      <UTable
        :data="list"
        :columns="columns"
        class="w-full"
        :ui="{ wrapper: 'w-full', base: 'w-full' }"
      >
        <template #alamat-cell="{ row }">
          <p class="truncate max-w-xs">{{ row.original.alamat }}</p>
        </template>

        <template #action-cell="{ row }">
          <UDropdownMenu :items="getDropdownActions(row.original)">
            <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" />
          </UDropdownMenu>
        </template>
      </UTable>
      <div v-if="list.length === 0" class="text-center p-4 text-gray-500">Tidak ada data.</div>
    </div>

    <!-- MODAL EDIT -->
    <UModal v-model:open="editModal" title="Edit Data PPDB" :ui="{ footer: 'justify-end' }">
      <template #body>
        <div class="space-y-4">
          <input v-model="form.nama" placeholder="Nama" class="border p-2 w-full rounded-md" />
          <input v-model="form.nik" placeholder="NIK" class="border p-2 w-full rounded-md" />
          <input v-model="form.no_kk" placeholder="No KK" class="border p-2 w-full rounded-md" />
          <input
            v-model="form.jk"
            placeholder="Jenis Kelamin"
            class="border p-2 w-full rounded-md"
          />
          <input
            v-model="form.tempat_lahir"
            placeholder="Tempat Lahir"
            class="border p-2 w-full rounded-md"
          />
          <input
            v-model="form.tgl_lahir"
            placeholder="Tanggal Lahir"
            class="border p-2 w-full rounded-md"
          />
          <input v-model="form.agama" placeholder="Agama" class="border p-2 w-full rounded-md" />
          <input v-model="form.alamat" placeholder="Alamat" class="border p-2 w-full rounded-md" />
          <input
            v-model="form.tinggal_bersama"
            placeholder="Tinggal Bersama"
            class="border p-2 w-full rounded-md"
          />
          <input
            v-model="form.anak_ke"
            placeholder="Anak Ke"
            class="border p-2 w-full rounded-md"
          />
          <input v-model="form.usia" placeholder="Usia" class="border p-2 w-full rounded-md" />
          <input v-model="form.no_hp" placeholder="No HP" class="border p-2 w-full rounded-md" />
          <!-- bisa tambahkan semua field lengkap di sini -->
        </div>
      </template>
      <template #footer="{ close }">
        <UButton label="Cancel" color="neutral" variant="outline" @click="close" />
        <UButton label="Edit" color="info" variant="solid" @click="updateItem" />
      </template>
    </UModal>

    <!-- MODAL DELETE -->
    <UModal v-model:open="deleteModal" title="Hapus Data PPDB" :ui="{ footer: 'justify-end' }">
      <template #body>
        <p>Apakah kamu yakin ingin menghapus data ini?</p>
      </template>
      <template #footer="{ close }">
        <UButton label="Cancel" color="neutral" variant="outline" @click="close" />
        <UButton label="Hapus" color="error" variant="solid" @click="deleteItem" />
      </template>
    </UModal>
  </div>
</template>

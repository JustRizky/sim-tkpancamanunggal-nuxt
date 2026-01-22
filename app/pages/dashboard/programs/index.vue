<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'

  interface Program {
    id: number
    title: string
    description: string
    imageUrl: string
  }

  const programs = ref<Program[]>([])
  const form = ref({ title: '', description: '' })
  const file = ref<File | null>(null)

  const addModal = ref(false)
  const editModal = ref(false)
  const deleteModal = ref(false)

  const selectedId = ref<number | null>(null)

  // Fetch data
  const fetchPrograms = async () => {
    programs.value = await $fetch<Program[]>('/api/programs')
  }

  onMounted(fetchPrograms)

  // =============================
  //  CREATE PROGRAM
  // =============================
  const createProgram = async () => {
    try {
      const formData = new FormData()
      formData.append('title', form.value.title)
      formData.append('description', form.value.description)

      if (file.value) {
        formData.append('file', file.value)
      }

      await $fetch('/api/programs', {
        method: 'POST',
        body: formData,
      })

      alert('Program berhasil ditambahkan!')
      addModal.value = false
      resetForm()

      fetchPrograms()
    } catch (error) {
      console.error(error)
      alert('Gagal menambahkan data.')
    }
  }

  // =============================
  //  UPDATE PROGRAM
  // =============================
  const editProgramSave = async () => {
    if (!selectedId.value) return

    const formData = new FormData()
    formData.append('title', form.value.title)
    formData.append('description', form.value.description)

    if (file.value) {
      formData.append('file', file.value)
    } else {
      formData.append('keepOldImage', 'true')
    }

    await $fetch(`/api/programs?id=${selectedId.value}`, {
      method: 'PUT',
      body: formData,
    })

    alert('Program berhasil diperbarui!')
    editModal.value = false
    resetForm()
    fetchPrograms()
  }

  // =============================
  //  DELETE PROGRAM
  // =============================
  const deleteProgram = async () => {
    if (!selectedId.value) return

    await $fetch(`/api/programs?id=${selectedId.value}`, { method: 'DELETE' })

    alert('Program berhasil dihapus!')
    deleteModal.value = false
    fetchPrograms()
  }

  // =============================
  // RESET FORM
  // =============================
  const resetForm = () => {
    form.value = { title: '', description: '' }
    file.value = null
    selectedId.value = null
  }

  // =============================
  // TABLE CONFIG
  // =============================
  const columns: TableColumn<any>[] = [
    { accessorKey: 'imageUrl', header: 'Image' },
    { accessorKey: 'title', header: 'Title' },
    { accessorKey: 'description', header: 'Description' },
    { id: 'action' },
  ]

  // Dropdown actions
  function getDropdownActions(item: Program): DropdownMenuItem[][] {
    return [
      [
        {
          label: 'Edit',
          icon: 'i-lucide-edit',
          onSelect: () => {
            selectedId.value = item.id
            form.value = {
              title: item.title,
              description: item.description,
            }
            file.value = null
            editModal.value = true
          },
        },
        {
          label: 'Delete',
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

  definePageMeta({
    layout: 'dashboard',
  })
</script>
<template>
  <div class="p-6">
    <!-- HEADER -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">Dashboard Program TK</h1>
        <p class="text-gray-600">Kelola daftar program TK dengan mudah.</p>
      </div>

      <UButton color="info" icon="i-heroicons-plus" size="xl" @click="addModal = true">
        Tambah Program
      </UButton>
    </div>

    <!-- ============================= -->
    <!-- TABLE LIST PROGRAM            -->
    <!-- ============================= -->
    <div class="mt-10 w-full overflow-x-auto">
      <h2 class="text-xl font-bold mb-4">Preview Data Programs</h2>

      <UTable
        :data="programs"
        :columns="columns"
        class="w-full"
        :ui="{ wrapper: 'w-full', base: 'w-full' }"
      >
        <template #imageUrl-cell="{ row }">
          <img :src="row.original.imageUrl" class="w-32 h-20 object-cover rounded-md" />
        </template>

        <template #description-cell="{ row }">
          <p class="max-w-xs truncate">{{ row.original.description }}</p>
        </template>

        <template #action-cell="{ row }">
          <UDropdownMenu :items="getDropdownActions(row.original)">
            <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" />
          </UDropdownMenu>
        </template>
      </UTable>
    </div>

    <!-- ================================= -->
    <!-- MODAL TAMBAH PROGRAM              -->
    <!-- ================================= -->
    <UModal v-model:open="addModal" title="Tambah Program" :ui="{ footer: 'justify-end' }">
      <template #body>
        <div class="space-y-4">
          <div>
            <label class="font-semibold">Judul</label>
            <input v-model="form.title" class="border p-2 w-full rounded-md" />
          </div>

          <div>
            <label class="font-semibold">Deskripsi</label>
            <textarea v-model="form.description" class="border p-2 w-full rounded-md" />
          </div>

          <div>
            <label class="font-semibold">Upload Gambar</label>
            <UFileUpload
              v-model="file"
              color="neutral"
              highlight
              label="Upload Gambar Disini"
              description="SVG, PNG, JPG atau GIF (max. 2MB)"
              class="w-full min-h-48"
            />
          </div>
        </div>
      </template>

      <template #footer="{ close }">
        <UButton label="Cancel" color="neutral" size="lg" variant="outline" @click="close" />
        <UButton label="Submit" color="info" size="lg" variant="solid" @click="createProgram" />
      </template>
    </UModal>

    <!-- ================================= -->
    <!-- MODAL EDIT PROGRAM                -->
    <!-- ================================= -->
    <UModal v-model:open="editModal" title="Edit Program" :ui="{ footer: 'justify-end' }">
      <template #body>
        <div class="space-y-4">
          <div>
            <label class="font-semibold">Judul</label>
            <input v-model="form.title" class="border p-2 w-full rounded-md" />
          </div>

          <div>
            <label class="font-semibold">Deskripsi</label>
            <textarea v-model="form.description" class="border p-2 w-full rounded-md" />
          </div>

          <div>
            <label class="font-semibold">Upload Gambar (Opsional)</label>
            <UFileUpload
              v-model="file"
              color="neutral"
              highlight
              label="Upload Gambar Disini"
              description="SVG, PNG, JPG atau GIF (max. 2MB)"
              class="w-full min-h-48"
            />
          </div>
        </div>
      </template>

      <template #footer="{ close }">
        <UButton label="Cancel" color="neutral" size="lg" variant="outline" @click="close" />
        <UButton label="Edit" color="info" size="lg" variant="solid" @click="editProgramSave" />
      </template>
    </UModal>

    <!-- ================================= -->
    <!-- MODAL DELETE PROGRAM              -->
    <!-- ================================= -->
    <UModal v-model:open="deleteModal" title="Hapus Program" :ui="{ footer: 'justify-end' }">
      <template #body>
        <p class="text-lg">Yakin ingin menghapus program ini?</p>
      </template>

      <template #footer="{ close }">
        <UButton label="Cancel" color="neutral" size="lg" variant="outline" @click="close" />
        <UButton label="Hapus" color="error" size="lg" variant="solid" @click="deleteProgram" />
      </template>
    </UModal>
  </div>
</template>

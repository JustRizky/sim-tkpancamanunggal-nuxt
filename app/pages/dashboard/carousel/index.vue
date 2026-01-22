<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'

  interface CarouselItem {
    id: number
    imageUrl: string
  }

  const carouselList = ref<CarouselItem[]>([])
  const file = ref<File | null>(null)

  const addModal = ref(false)
  const editModal = ref(false)
  const deleteModal = ref(false)

  const selectedId = ref<number | null>(null)

  // Fetch data carousel
  const fetchCarousel = async () => {
    carouselList.value = await $fetch<CarouselItem[]>('/api/carousel')
  }

  onMounted(fetchCarousel)

  // ADD CAROUSEL
  const createCarousel = async () => {
    try {
      const formData = new FormData()
      if (file.value) formData.append('file', file.value)

      await $fetch('/api/carousel', {
        method: 'POST',
        body: formData,
      })

      alert('Gambar carousel berhasil ditambahkan!')
      addModal.value = false
      resetForm()
      fetchCarousel()
    } catch (error) {
      console.error(error)
      alert('Gagal menambahkan data.')
    }
  }

  // UPDATE CAROUSEL
  const editCarouselSave = async () => {
    if (!selectedId.value) return

    const formData = new FormData()

    if (file.value) {
      formData.append('file', file.value)
    } else {
      formData.append('keepOldImage', 'true')
    }

    await $fetch(`/api/carousel?id=${selectedId.value}`, {
      method: 'PUT',
      body: formData,
    })

    alert('Carousel berhasil diperbarui!')
    editModal.value = false
    resetForm()
    fetchCarousel()
  }

  // DELETE CAROUSEL
  const deleteCarousel = async () => {
    if (!selectedId.value) return

    await $fetch(`/api/carousel?id=${selectedId.value}`, { method: 'DELETE' })
    alert('Carousel berhasil dihapus!')
    deleteModal.value = false
    fetchCarousel()
  }

  // RESET FORM
  const resetForm = () => {
    file.value = null
    selectedId.value = null
  }

  // TABLE COLUMNS
  const columns: TableColumn<any>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'imageUrl', header: 'Image' },
    { id: 'action' },
  ]

  // DROPDOWN ACTIONS
  function getDropdownActions(item: CarouselItem): DropdownMenuItem[][] {
    return [
      [
        {
          label: 'Edit',
          icon: 'i-lucide-edit',
          onSelect: () => {
            selectedId.value = item.id
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
        <h1 class="text-2xl font-bold">Dashboard Carousel</h1>
        <p class="text-gray-600">Kelola gambar carousel yang tampil di homepage.</p>
      </div>

      <!-- BUTTON OPEN MODAL TAMBAH -->
      <UButton color="info" icon="i-heroicons-plus" size="xl" @click="addModal = true">
        Tambah Carousel
      </UButton>
    </div>

    <!-- TABLE PREVIEW -->
    <div class="mt-10 w-full overflow-x-auto">
      <h2 class="text-xl font-bold mb-4">List Carousel</h2>

      <UTable
        :data="carouselList"
        :columns="columns"
        class="w-full"
        :ui="{ wrapper: 'w-full', base: 'w-full' }"
      >
        <template #imageUrl-cell="{ row }">
          <img :src="row.original.imageUrl" class="w-32 h-20 object-cover rounded-md" />
        </template>

        <template #action-cell="{ row }">
          <UDropdownMenu :items="getDropdownActions(row.original)">
            <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" />
          </UDropdownMenu>
        </template>
      </UTable>
    </div>

    <!-- ========================= -->
    <!-- MODAL TAMBAH CAROUSEL -->
    <!-- ========================= -->
    <UModal v-model:open="addModal" title="Tambah Carousel" :ui="{ footer: 'justify-end' }">
      <template #body>
        <div class="space-y-4">
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
        <UButton label="Submit" color="info" size="lg" variant="solid" @click="createCarousel" />
      </template>
    </UModal>

    <!-- ========================= -->
    <!-- MODAL EDIT CAROUSEL -->
    <!-- ========================= -->
    <UModal v-model:open="editModal" title="Edit Carousel" :ui="{ footer: 'justify-end' }">
      <template #body>
        <div class="space-y-4">
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
        <UButton label="Edit" color="info" size="lg" variant="solid" @click="editCarouselSave" />
      </template>
    </UModal>

    <!-- ========================= -->
    <!-- MODAL DELETE CAROUSEL -->
    <!-- ========================= -->
    <UModal v-model:open="deleteModal" title="Hapus Carousel" :ui="{ footer: 'justify-end' }">
      <template #body>
        <p class="text-lg">Yakin ingin menghapus gambar ini?</p>
      </template>

      <template #footer="{ close }">
        <UButton label="Cancel" color="neutral" variant="outline" @click="close" />
        <UButton label="Hapus" color="error" variant="solid" @click="deleteCarousel" />
      </template>
    </UModal>
  </div>
</template>

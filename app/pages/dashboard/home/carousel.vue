<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Dashboard Carousel</h1>

    <!-- LIST CAROUSEL -->
    <div v-if="carouselList.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in carouselList"
        :key="item.id"
        class="border rounded-lg p-4 shadow-sm bg-white"
      >
        <img
          :src="item.imageUrl"
          alt="Carousel Image"
          class="w-full h-48 object-cover rounded mb-3"
        />

        <div class="flex justify-between">
          <span class="text-gray-500 text-sm">#{{ item.id }}</span>
          <div class="space-x-2">
            <button
              class="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
              @click="editCarousel(item)"
            >
              Edit
            </button>
            <button
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              @click="deleteCarousel(item.id)"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p class="text-gray-600">Belum ada gambar carousel.</p>
    </div>

    <!-- FORM -->
    <div class="mt-10 border-t pt-6">
      <h2 class="text-xl font-bold mb-4">
        {{ editingCarouselId ? 'Edit Carousel' : 'Tambah Carousel' }}
      </h2>

      <form class="space-y-4 max-w-lg" @submit.prevent="saveCarousel">
        <div>
          <UFileUpload
            v-model="file"
            color="neutral"
            highlight
            label="Upload gambar carousel"
            description="SVG, PNG, JPG, GIF (max 2MB)"
            class="w-full min-h-48"
          />
        </div>

        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
          {{ editingCarouselId ? 'Update Carousel' : 'Simpan Gambar' }}
        </button>

        <button
          v-if="editingCarouselId"
          type="button"
          class="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
          @click="cancelEdit"
        >
          Batal
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  interface CarouselItem {
    id: number
    imageUrl: string
  }

  const carouselList = ref<CarouselItem[]>([])
  const file = ref<File | null>(null)
  const editingCarouselId = ref<number | null>(null)

  const fetchCarousel = async () => {
    carouselList.value = await $fetch<CarouselItem[]>('/api/carousel')
  }

  const saveCarousel = async () => {
    try {
      const formData = new FormData()

      if (file.value) {
        formData.append('file', file.value)
      } else if (editingCarouselId.value) {
        formData.append('keepOldImage', 'true')
      }

      const method = editingCarouselId.value ? 'PUT' : 'POST'
      const url = editingCarouselId.value
        ? `/api/carousel?id=${editingCarouselId.value}`
        : '/api/carousel'

      await $fetch(url, {
        method,
        body: formData,
      })

      alert(
        editingCarouselId.value
          ? 'Gambar carousel berhasil diperbarui!'
          : 'Gambar baru berhasil ditambahkan!'
      )
      resetForm()
      await fetchCarousel()
    } catch (error) {
      console.error(error)
      alert('Gagal menyimpan gambar carousel.')
    }
  }

  const deleteCarousel = async (id: number) => {
    if (confirm('Yakin mau hapus gambar ini?')) {
      await $fetch(`/api/carousel?id=${id}`, { method: 'DELETE' })
      await fetchCarousel()
    }
  }

  const editCarousel = (item: CarouselItem) => {
    editingCarouselId.value = item.id
  }

  const cancelEdit = () => {
    resetForm()
  }

  const resetForm = () => {
    file.value = null
    editingCarouselId.value = null
  }

  onMounted(fetchCarousel)

  definePageMeta({
    layout: 'dashboard',
  })
</script>

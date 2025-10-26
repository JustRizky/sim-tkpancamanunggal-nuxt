<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Dashboard Program TK</h1>

    <div v-if="programs.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="program in programs"
        :key="program.id"
        class="border rounded-lg p-4 shadow-sm bg-white"
      >
        <img
          :src="program.imageUrl"
          alt="Program Image"
          class="w-full h-48 object-cover rounded mb-3"
        />

        <h2 class="text-xl font-semibold mb-2">{{ program.title }}</h2>
        <p class="text-gray-600 mb-4">{{ program.description }}</p>

        <div class="flex justify-between">
          <div class="space-x-2">
            <button
              class="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
              @click="editProgram(program)"
            >
              Edit
            </button>
            <button
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              @click="deleteProgram(program.id)"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p class="text-gray-600">Belum ada program.</p>
    </div>

    <div class="mt-10 border-t pt-6">
      <h2 class="text-xl font-bold mb-4">
        {{ editingProgramId ? 'Edit Program' : 'Tambah Program' }}
      </h2>

      <form class="space-y-4 max-w-lg" @submit.prevent="saveProgram">
        <div>
          <label class="block font-semibold">Judul</label>
          <input v-model="form.title" type="text" class="border p-2 w-full rounded" required />
        </div>

        <div>
          <label class="block font-semibold">Deskripsi</label>
          <textarea v-model="form.description" class="border p-2 w-full rounded" required />
        </div>

        <div>
          <UFileUpload
            v-model="file"
            color="neutral"
            highlight
            label="Upload gambar program"
            description="SVG, PNG, JPG, GIF (max 2MB)"
            class="w-full min-h-48"
          />
        </div>

        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
          {{ editingProgramId ? 'Update Program' : 'Simpan Program' }}
        </button>

        <button
          v-if="editingProgramId"
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

  interface Program {
    id: number
    title: string
    description: string
    imageUrl: string
  }

  const programs = ref<Program[]>([])
  const form = ref({ title: '', description: '' })
  const file = ref<File | null>(null)
  const editingProgramId = ref<number | null>(null)

  const fetchPrograms = async () => {
    programs.value = await $fetch<Program[]>('/api/programs')
  }

  const saveProgram = async () => {
    try {
      const formData = new FormData()
      formData.append('title', form.value.title)
      formData.append('description', form.value.description)

      if (file.value) {
        formData.append('file', file.value)
      } else if (editingProgramId.value) {
        formData.append('keepOldImage', 'true')
      }

      const method = editingProgramId.value ? 'PUT' : 'POST'
      const url = editingProgramId.value
        ? `/api/programs?id=${editingProgramId.value}`
        : '/api/programs'

      await $fetch(url, {
        method,
        body: formData,
      })

      alert(
        editingProgramId.value
          ? 'Program berhasil diperbarui!'
          : 'Program baru berhasil ditambahkan!'
      )
      resetForm()
      await fetchPrograms()
    } catch (error) {
      console.error(error)
      alert('Gagal menyimpan data program.')
    }
  }

  const deleteProgram = async (id: number) => {
    if (confirm('Yakin mau hapus program ini?')) {
      await $fetch(`/api/programs?id=${id}`, { method: 'DELETE' })
      await fetchPrograms()
    }
  }

  const editProgram = (program: Program) => {
    editingProgramId.value = program.id
    form.value = {
      title: program.title,
      description: program.description,
    }
  }

  const cancelEdit = () => {
    resetForm()
  }

  const resetForm = () => {
    form.value = { title: '', description: '' }
    file.value = null
    editingProgramId.value = null
  }

  onMounted(fetchPrograms)

  definePageMeta({
    layout: 'dashboard',
  })
</script>

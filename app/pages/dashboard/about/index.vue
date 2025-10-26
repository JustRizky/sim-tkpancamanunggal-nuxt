<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Dashboard Halaman About</h1>

    <!-- Preview data -->
    <div v-if="about" class="border rounded-lg p-4 shadow-sm bg-white mb-8">
      <img :src="about.imageUrl" alt="About Image" class="w-full h-48 object-cover rounded mb-3" />

      <h2 class="text-xl font-semibold mb-2">Sejarah Sekolah</h2>
      <p
        v-for="(p, i) in about.sejarah.split('|||')"
        :key="i"
        class="text-gray-600 mb-2 whitespace-pre-line"
      >
        {{ p }}
      </p>

      <h2 class="text-xl font-semibold mt-4">Visi</h2>
      <p class="text-gray-600 mb-2 whitespace-pre-line">{{ about.visi }}</p>

      <h2 class="text-xl font-semibold mt-4">Misi</h2>
      <ul class="list-disc ml-5 text-gray-600">
        <li v-for="(item, i) in about.misi.split(';')" :key="i">{{ item }}</li>
      </ul>
    </div>

    <!-- Form -->
    <div class="mt-10 border-t pt-6">
      <h2 class="text-xl font-bold mb-4">
        {{ about ? 'Edit Halaman About' : 'Tambah Halaman About' }}
      </h2>

      <form class="space-y-4 max-w-lg" @submit.prevent="saveAbout">
        <div>
          <label class="block font-semibold">Sejarah 1</label>
          <textarea
            v-model="form.sejarah1"
            class="border p-2 w-full rounded"
            rows="3"
            placeholder="Paragraf pertama sejarah sekolah"
            required
          />
        </div>

        <div>
          <label class="block font-semibold">Sejarah 2</label>
          <textarea
            v-model="form.sejarah2"
            class="border p-2 w-full rounded"
            rows="3"
            placeholder="Paragraf kedua sejarah sekolah"
            required
          />
        </div>

        <div>
          <label class="block font-semibold">Visi</label>
          <textarea
            v-model="form.visi"
            class="border p-2 w-full rounded"
            rows="3"
            placeholder="Tuliskan visi sekolah"
            required
          />
        </div>

        <div>
          <label class="block font-semibold">Misi</label>
          <textarea
            v-model="form.misi"
            class="border p-2 w-full rounded"
            rows="4"
            placeholder="Pisahkan dengan tanda ; (titik koma)"
            required
          />
        </div>

        <div>
          <UFileUpload
            v-model="file"
            color="neutral"
            highlight
            label="Upload gambar sekolah"
            description="SVG, PNG, JPG, GIF (max 2MB)"
            class="w-full min-h-48"
          />
        </div>

        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
          {{ about ? 'Update Data' : 'Simpan Data' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  interface About {
    id: number
    imageUrl: string
    sejarah: string
    visi: string
    misi: string
  }

  const about = ref<About | null>(null)
  const file = ref<File | null>(null)

  const form = ref({
    sejarah1: '',
    sejarah2: '',
    visi: '',
    misi: '',
  })

  const fetchAbout = async () => {
    try {
      const data = await $fetch<About>('/api/about')
      if (data && data.id) {
        about.value = data

        const [s1 = '', s2 = ''] = data.sejarah.split('|||')
        form.value = {
          sejarah1: s1,
          sejarah2: s2,
          visi: data.visi,
          misi: data.misi,
        }
      }
    } catch (err) {
      console.error('Gagal fetch about:', err)
    }
  }

  const saveAbout = async () => {
    try {
      const formData = new FormData()
      const sejarahGabung = `${form.value.sejarah1}|||${form.value.sejarah2}`

      formData.append('sejarah', sejarahGabung)
      formData.append('visi', form.value.visi)
      formData.append('misi', form.value.misi)

      if (file.value) {
        formData.append('file', file.value)
      } else if (about.value) {
        formData.append('keepOldImage', 'true')
      }

      const method = about.value ? 'PUT' : 'POST'
      const url = about.value ? `/api/about?id=${about.value.id}` : '/api/about'

      await $fetch(url, { method, body: formData })

      alert(about.value ? 'Data berhasil diperbarui!' : 'Data berhasil ditambahkan!')
      await fetchAbout()
    } catch (error) {
      console.error(error)
      alert('Gagal menyimpan data About.')
    }
  }

  onMounted(fetchAbout)

  definePageMeta({
    layout: 'dashboard',
  })
</script>

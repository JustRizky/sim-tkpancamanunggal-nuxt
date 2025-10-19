<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Dashboard Hero Section</h1>

    <div v-if="hero">
      <img :src="hero.imageUrl" alt="Hero Image" class="w-full h-64 object-cover mb-4" />

      <form class="space-y-4" @submit.prevent="saveHero">
        <div>
          <label class="block font-semibold">Title</label>
          <input v-model="form.title" type="text" class="border p-2 w-full" />
        </div>

        <div>
          <label class="block font-semibold">Paragraph</label>
          <textarea v-model="form.paragraph" class="border p-2 w-full" />
        </div>

        <div>
          <UFileUpload
            v-model="file"
            color="neutral"
            highlight
            label="Drop your image here"
            description="SVG, PNG, JPG or GIF (max. 2MB)"
            class="w-96 min-h-48"
          />
        </div>

        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>

    <div v-else>
      <p>Loading hero section...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import type { FileUploadProps } from 'reka-ui'

  interface HeroSection {
    id: number
    title: string
    paragraph: string
    imageUrl: string
  }

  const hero = ref<HeroSection | null>(null)
  const form = ref({ title: '', paragraph: '' })
  const file = ref<File | null>(null)

  const fetchHero = async () => {
    const data = await $fetch<HeroSection>('/api/hero')
    hero.value = data
    if (hero.value) {
      form.value = { title: hero.value.title, paragraph: hero.value.paragraph }
    }
  }

  const saveHero = async () => {
    if (!file.value) return alert('Please select an image file!')

    const formData = new FormData()
    formData.append('title', form.value.title)
    formData.append('paragraph', form.value.paragraph)
    formData.append('file', file.value)

    const updated = await $fetch('/api/hero', {
      method: 'POST',
      body: formData,
    })

    hero.value = updated as HeroSection
    alert('Hero Section updated!')
  }

  onMounted(fetchHero)
</script>

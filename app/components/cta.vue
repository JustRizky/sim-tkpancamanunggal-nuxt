<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const props = defineProps({
    title: String,
    description: String,
  })

  const router = useRouter()

  const links = ref([
    {
      label: 'Daftarkan Sekarang',
      color: 'yellow',
      click: () => router.push('/ppdb'),
    },
    {
      label: 'Hubungi Kami',
      color: 'neutral',
      variant: 'subtle',
      trailingIcon: 'i-lucide-arrow-right',
      click: () => router.push('/contact'),
    },
  ])
</script>

<template>
  <section class="bg-blue-400 text-white py-16 px-6 text-center rounded-lg">
    <div class="max-w-3xl mx-auto">
      <h2 class="text-3xl font-bold text-white">
        {{ props.title }}
      </h2>

      <p class="text-lg mt-2 text-white/90">
        {{ props.description }}
      </p>

      <div class="mt-8 flex justify-center gap-4">
        <UButton
          color="yellow"
          class="bg-yellow-400 text-blue-900 font-semibold px-6 py-3 rounded-lg shadow hover:bg-yellow-300 transition"
          @click="links[0].click"
        >
          {{ links[0].label }}
        </UButton>

        <UButton
          color="white"
          variant="outline"
          trailing-icon="i-lucide-arrow-right"
          class="bg-transparent border border-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-blue-500 transition"
          @click="links[1].click"
        >
          {{ links[1].label }}
        </UButton>
      </div>
    </div>
  </section>
</template>

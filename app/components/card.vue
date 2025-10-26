<template>
  <div
    class="bg-white rounded-xl shadow-md overflow-hidden w-80 hover:shadow-lg transition text-center transform hover:-translate-y-1"
  >
    <img :src="image" :alt="title" class="w-full h-48 object-cover" />
    <div class="p-5">
      <h3 class="text-xl font-semibold text-blue-900 mb-2">{{ title }}</h3>
      <p class="text-gray-700 mb-4">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    title: String,
    description: String,
    image: String,
  })
</script>

<script setup lang="ts">
  const itemsContent = 'Ini konten dashboard utama'
  // atau bisa data lain sesuai kebutuhan
  definePageMeta({
    layout: 'dashboard',
  })
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold">Dashboard Home</h1>
    <p>{{ itemsContent }}</p>
  </div>
</template>

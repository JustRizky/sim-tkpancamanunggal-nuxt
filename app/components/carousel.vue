<script setup lang="ts">
  defineProps({
    items: {
      type: Array,
      required: true,
    },
  })
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    loop
    arrows
    dots
    :autoplay="{ delay: 2000 }"
    :items="items"
    :ui="{ item: 'basis-1/3' }"
    class="max-w-5xl mx-auto"
  >
    <img :src="item" width="234" height="234" class="rounded-lg" />
  </UCarousel>
</template>

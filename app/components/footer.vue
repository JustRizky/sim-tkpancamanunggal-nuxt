<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui'

  const items: NavigationMenuItem[] = [
    {
      label: 'Home',
      to: '/',
      active: false,
    },
    {
      label: 'Tentang Kami',
      to: '/about',
      active: false,
    },
    {
      label: 'PPDB',
      to: '/ppdb',
      active: false,
    },
    {
      label: 'Kontak Kami',
      to: '/contact',
      active: false,
    },
  ]
</script>

<template>
  <UFooter class="bg-white">
    <template #left>
      <p class="text-gray-700 text-sm">
        Copyright © {{ new Date().getFullYear() }} | TK Panca Manunggal
      </p>
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <UButton
        icon="i-simple-icons-instagram"
        color="neutral"
        variant="ghost"
        to="https://www.instagram.com/tkpancamanunggal/"
        target="_blank"
        aria-label="Instagram"
      />
      <UButton
        icon="i-simple-icons-youtube"
        color="neutral"
        variant="ghost"
        to="https://www.youtube.com/@TKPANCAMANUNGGALSURABAYA"
        target="_blank"
        aria-label="YouTube"
      />
    </template>
  </UFooter>
</template>

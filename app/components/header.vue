<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui'

  const route = useRoute()

  const items = computed<NavigationMenuItem[]>(() => [
    {
      label: 'Home',
      to: '/',
      icon: 'i-lucide-home',
      active: route.path === '/' ? 'primary' : 'neutral',
    },
    {
      label: 'Tentang Kami',
      to: '/about',
      icon: 'i-lucide-school',
      active: route.path === '/about' ? 'primary' : 'neutral',
    },
    {
      label: 'PPDB',
      to: '/ppdb',
      icon: 'i-lucide-file-text',
      active: route.path === '/ppdb' ? 'primary' : 'neutral',
    },
    {
      label: 'Kontak Kami',
      to: '/contact',
      icon: 'i-lucide-phone',
      active: route.path === '/contact' ? 'primary' : 'neutral',
    },
  ])
</script>

<template>
  <UHeader
    title="TK Panca Manunggal"
    class="backdrop-blur bg-white/80 border-b border-gray-200 shadow-sm"
    :ui="{
      title: 'text-blue-900 font-bold',
    }"
  >
    <template>
      <Logo class="h-6 w-auto" />
    </template>

    <UNavigationMenu
      :items="
        items.map((item) => ({
          ...item,
          icon: item.showIconVertical ? item.icon : undefined,
          class:
            $route.path === item.to
              ? 'bg-yellow-400 text-blue-900 rounded-md font-bold'
              : 'text-gray-700 hover:bg-yellow-100 hover:text-blue-700 rounded-md',
        }))
      "
      :ui="{
        link: 'text-blue-900 transition-colors',
      }"
    />

    <template #right>
      <!-- <UColorModeButton /> -->
    </template>

    <template #body>
      <UNavigationMenu
        :items="
          items.map((item) => ({
            ...item,
            icon: item.icon,
            iconClass: `${item.icon} ${route.path === item.to ? '!text-blue-900' : '!text-gray-700'}`,
            class:
              $route.path === item.to
                ? 'bg-yellow-400 text-blue-900 rounded-md font-bold'
                : 'text-gray-700 hover:bg-yellow-100 hover:text-blue-700 rounded-md',
          }))
        "
        orientation="vertical"
        class="-mx-2.5"
        :ui="{
          link: 'text-blue-900 transition-colors',
        }"
      />
    </template>
  </UHeader>
</template>

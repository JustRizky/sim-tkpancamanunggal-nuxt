<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui'

  const route = useRoute()

  const items = computed<NavigationMenuItem[]>(() => [
    {
      label: 'Home',
      to: '/dashboard/home',
      icon: 'i-lucide-house',
      active: route.path === '/dashboard/home' ? 'primary' : 'neutral',
      defaultOpen: true,
      children: [
        {
          label: 'Program',
          to: '/dashboard/home/programs',
          icon: 'i-lucide-activity',
          active: route.path === '/dashboard/home/programs' ? 'primary' : 'neutral',
        },
        {
          label: 'Carousel',
          to: '/dashboard/home/carousel',
          icon: 'i-lucide-images',
          active: route.path === '/dashboard/home/carousel' ? 'primary' : 'neutral',
        },
      ],
    },
    {
      label: 'About',
      to: '/dashboard/about',
      icon: 'i-lucide-school',
      active: route.path === '/dashboard/about' ? 'primary' : 'neutral',
    },
    {
      label: 'Teachers',
      to: '/dashboard/teachers',
      icon: 'i-lucide-users',
      active: route.path === '/dashboard/teachers' ? 'primary' : 'neutral',
    },
    {
      label: 'PPDB',
      to: '/dashboard/ppdb',
      icon: 'i-lucide-file-text',
      active: route.path === '/dashboard/ppdb' ? 'primary' : 'neutral',
    },
    {
      label: 'Contact',
      to: '/dashboard/contact',
      icon: 'i-lucide-contact',
      active: route.path === '/dashboard/contact' ? 'primary' : 'neutral',
    },
  ])
</script>

<template>
  <UDashboardGroup>
    <UDashboardSidebar collapsible resizable :ui="{ footer: 'border-t border-default' }">
      <template #header="{ collapsed }">
        <span v-if="!collapsed" class="font-bold text-lg text-blue-900">TK Panca Manunggal</span>
        <span v-else class="text-blue-900 mx-auto">TPM</span>
      </template>

      <template #default="{ collapsed }">
        <UButton
          :label="collapsed ? undefined : 'Search...'"
          icon="i-lucide-search"
          color="neutral"
          variant="outline"
          block
          :square="collapsed"
        >
          <template v-if="!collapsed" #trailing>
            <div class="flex items-center gap-0.5 ms-auto">
              <UKbd value="meta" variant="subtle" />
              <UKbd value="K" variant="subtle" />
            </div>
          </template>
        </UButton>

        <UNavigationMenu
          :collapsed="collapsed"
          :items="
            items.map((item) => ({
              ...item,
              icon: item.icon,
              iconClass: route.path === item.to ? 'text-blue-900' : 'text-gray-700',
              class:
                $route.path === item.to
                  ? 'bg-yellow-400 text-blue-900 rounded-md font-bold'
                  : 'text-gray-700 hover:bg-yellow-100 hover:text-blue-700 rounded-md',
            }))
          "
          orientation="vertical"
        />
      </template>

      <template #footer="{ collapsed }">
        <UButton
          :avatar="{
            src: 'https://github.com/benjamincanac.png',
          }"
          :label="collapsed ? undefined : 'Admin'"
          variant="ghost"
          class="w-full text-blue-900"
          :block="collapsed"
        />
      </template>
    </UDashboardSidebar>
    <div class="flex-1 overflow-auto h-screen">
      <NuxtPage />
    </div>
  </UDashboardGroup>
</template>

<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui'

  const items: NavigationMenuItem[][] = [
    [
      {
        label: 'Home',
        icon: 'i-lucide-house',
        active: true,
      },
      {
        label: 'PPDB',
        icon: 'i-lucide-school',
      },
      {
        label: 'Contacts',
        icon: 'i-lucide-users',
        badge: '4',
      },
      {
        label: 'Settings',
        icon: 'i-lucide-settings',
        defaultOpen: true,
        children: [
          {
            label: 'General',
          },
          {
            label: 'Members',
          },
          {
            label: 'Notifications',
          },
        ],
      },
    ],
  ]
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

        <UNavigationMenu :collapsed="collapsed" :items="items[0]" orientation="vertical" />
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
    <NuxtPage />
  </UDashboardGroup>
</template>

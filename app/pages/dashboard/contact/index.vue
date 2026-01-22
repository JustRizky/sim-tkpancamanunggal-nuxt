<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'

  interface ContactMessage {
    id: number
    nama: string
    email: string
    pesan: string
    createdAt: string
  }

  const messages = ref<ContactMessage[]>([])
  const loading = ref(false)
  const error = ref('')

  // MODAL HAPUS
  const deleteModal = ref(false)
  const selectedId = ref<number | null>(null)

  async function fetchMessages() {
    loading.value = true
    error.value = ''
    try {
      const res = await $fetch<ContactMessage[]>('/api/contactMessage')
      messages.value = res || []
    } catch (err: any) {
      error.value = err.message || 'Gagal mengambil data'
    } finally {
      loading.value = false
    }
  }

  const deleteMessage = async () => {
    if (!selectedId.value) return
    try {
      await $fetch(`/api/contactMessage?id=${selectedId.value}`, { method: 'DELETE' })
      messages.value = messages.value.filter((msg) => msg.id !== selectedId.value)
      deleteModal.value = false
      selectedId.value = null
    } catch (err: any) {
      alert(err.message || 'Gagal menghapus pesan')
    }
  }

  // =========================
  // TABLE COLUMNS UTable
  // =========================
  const columns: TableColumn<ContactMessage>[] = [
    { accessorKey: 'nama', header: 'Nama' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'pesan', header: 'Pesan' },
    { accessorKey: 'createdAt', header: 'Tanggal' },
    { id: 'action' },
  ]

  function getDropdownActions(msg: ContactMessage): DropdownMenuItem[][] {
    return [
      [
        {
          label: 'Hapus',
          icon: 'i-lucide-trash',
          color: 'error',
          onSelect: () => {
            selectedId.value = msg.id
            deleteModal.value = true
          },
        },
      ],
    ]
  }

  onMounted(fetchMessages)

  definePageMeta({ layout: 'dashboard' })
</script>

<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold">Dashboard Pesan Kontak</h1>
        <p class="text-gray-600">Halaman untuk melihat dan mengelola pesan dari pengguna.</p>
      </div>
    </div>

    <!-- TABLE PREVIEW -->
    <div class="mt-6 w-full overflow-x-auto">
      <UTable
        :data="messages"
        :columns="columns"
        class="w-full"
        :ui="{ wrapper: 'w-full', base: 'w-full' }"
      >
        <template #pesan-cell="{ row }">
          <p class="truncate max-w-xs">{{ row.original.pesan }}</p>
        </template>

        <template #createdAt-cell="{ row }">
          {{ new Date(row.original.createdAt).toLocaleString() }}
        </template>

        <template #action-cell="{ row }">
          <UDropdownMenu :items="getDropdownActions(row.original)">
            <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" />
          </UDropdownMenu>
        </template>
      </UTable>

      <div v-if="loading" class="text-gray-500 mt-2">Loading...</div>
      <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
      <div v-if="messages.length === 0 && !loading" class="text-gray-500 mt-2 text-center">
        Belum ada pesan
      </div>
    </div>

    <!-- MODAL DELETE -->
    <UModal v-model:open="deleteModal" title="Hapus Pesan" :ui="{ footer: 'justify-end' }">
      <template #body>
        <p>Apakah kamu yakin ingin menghapus pesan ini?</p>
      </template>

      <template #footer="{ close }">
        <UButton label="Cancel" color="neutral" variant="outline" @click="close" />
        <UButton label="Hapus" color="error" variant="solid" @click="deleteMessage" />
      </template>
    </UModal>
  </div>
</template>

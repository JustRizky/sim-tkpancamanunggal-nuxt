<script setup lang="ts">
  definePageMeta({
    layout: 'dashboard',
  })

  import { ref, onMounted } from 'vue'
  import { useFetch } from '#app'

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

  async function fetchMessages() {
    loading.value = true
    error.value = ''
    try {
      const { data, error: fetchError } = await useFetch<ContactMessage[]>('/api/contactMessage', {
        method: 'GET',
      })

      if (fetchError.value) throw fetchError.value
      messages.value = data.value || []
    } catch (err: any) {
      error.value = err.message || 'Gagal mengambil data'
    } finally {
      loading.value = false
    }
  }

  async function deleteMessage(id: number) {
    if (!confirm('Yakin ingin menghapus pesan ini?')) return
    try {
      const { data, error: fetchError } = await useFetch(`/api/contactMessage?id=${id}`, {
        method: 'DELETE',
      })
      if (fetchError.value) throw fetchError.value
      // Hapus dari array lokal
      messages.value = messages.value.filter((msg) => msg.id !== id)
    } catch (err: any) {
      alert(err.message || 'Gagal menghapus pesan')
    }
  }

  onMounted(fetchMessages)
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Dashboard Pesan Kontak</h1>

    <div v-if="loading" class="text-gray-500">Loading...</div>
    <div v-if="error" class="text-red-500 mb-2">{{ error }}</div>

    <table class="w-full border-collapse table-auto">
      <thead>
        <tr class="bg-blue-900 text-white">
          <th class="p-2 border">Nama</th>
          <th class="p-2 border">Email</th>
          <th class="p-2 border">Pesan</th>
          <th class="p-2 border">Tanggal</th>
          <th class="p-2 border">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="msg in messages" :key="msg.id" class="hover:bg-gray-100">
          <td class="p-2 border">{{ msg.nama }}</td>
          <td class="p-2 border">{{ msg.email }}</td>
          <td class="p-2 border">{{ msg.pesan }}</td>
          <td class="p-2 border">{{ new Date(msg.createdAt).toLocaleString() }}</td>
          <td class="p-2 border text-center">
            <button
              @click="deleteMessage(msg.id)"
              class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition"
            >
              Hapus
            </button>
          </td>
        </tr>
        <tr v-if="messages.length === 0">
          <td colspan="5" class="text-center py-4 text-gray-500">Belum ada pesan</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'dashboard',
  })

  import { ref, onMounted } from 'vue'

  const list = ref<any[]>([])
  const loading = ref(true)
  const showLogModal = ref(false)
  const selectedItem = ref<any>(null)

  const fetchData = async () => {
    loading.value = true
    list.value = await $fetch('/api/ppdb')
    loading.value = false
  }

  onMounted(fetchData)

  const deleteItem = async (id: number) => {
    if (!confirm('Yakin mau hapus data ini?')) return

    await $fetch(`/api/ppdb?id=${id}`, {
      method: 'DELETE',
    })

    await fetchData()
  }

  const editItem = (id: number) => {
    navigateTo(`/dashboard/ppdb/edit/${id}`)
  }

  const showLogHistory = (item: any) => {
    selectedItem.value = item
    showLogModal.value = true
  }

  const closeLogModal = () => {
    showLogModal.value = false
    selectedItem.value = null
  }

  const formatDate = (date: string | Date) => {
    if (!date) return '-'
    const d = new Date(date)
    return d.toLocaleString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }
</script>

<template>
  <div class="p-4 space-y-6">
    <h1 class="text-2xl font-bold">Dashboard PPDB</h1>

    <div v-if="loading">Loading...</div>

    <div v-else class="overflow-x-auto">
      <table class="w-full border border-gray-300 text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="border p-2">ID</th>
            <th class="border p-2">Nama</th>
            <th class="border p-2">NIK</th>
            <th class="border p-2">No KK</th>
            <th class="border p-2">Jenis Kelamin</th>
            <th class="border p-2">Tempat Lahir</th>
            <th class="border p-2">Tanggal Lahir</th>
            <th class="border p-2">Agama</th>
            <th class="border p-2">Alamat</th>
            <th class="border p-2">Tinggal Bersama</th>
            <th class="border p-2">Anak Ke</th>
            <th class="border p-2">Usia</th>
            <th class="border p-2">No HP</th>
            <th class="border p-2">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td class="border p-2">{{ item.id }}</td>
            <td class="border p-2">{{ item.nama }}</td>
            <td class="border p-2">{{ item.nik }}</td>
            <td class="border p-2">{{ item.no_kk }}</td>
            <td class="border p-2">{{ item.jk }}</td>
            <td class="border p-2">{{ item.tempat_lahir }}</td>
            <td class="border p-2">{{ item.tgl_lahir }}</td>
            <td class="border p-2">{{ item.agama }}</td>
            <td class="border p-2">{{ item.alamat }}</td>
            <td class="border p-2">{{ item.tinggal_bersama }}</td>
            <td class="border p-2">{{ item.anak_ke }}</td>
            <td class="border p-2">{{ item.usia }}</td>
            <td class="border p-2">{{ item.no_hp }}</td>
            <td class="border p-2 flex gap-2 flex-wrap">
              <button class="px-2 py-1 bg-blue-500 text-white rounded" @click="editItem(item.id)">
                Edit
              </button>
              <button class="px-2 py-1 bg-green-500 text-white rounded" @click="showLogHistory(item)">
                Log History
              </button>
              <button class="px-2 py-1 bg-red-500 text-white rounded" @click="deleteItem(item.id)">
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="list.length === 0" class="text-center p-4 text-gray-500">Tidak ada data.</div>
    </div>

    <!-- Modal Log History -->
    <div
      v-if="showLogModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="closeLogModal"
    >
      <div
        class="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Log History</h2>
          <button
            @click="closeLogModal"
            class="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div v-if="selectedItem" class="space-y-4">
          <div class="border-b pb-2">
            <p class="text-sm text-gray-600 mb-1">Nama:</p>
            <p class="font-semibold">{{ selectedItem.nama }}</p>
          </div>

          <div class="space-y-3">
            <div class="bg-green-50 p-3 rounded">
              <p class="text-sm text-gray-600 mb-1">Dibuat Pada:</p>
              <p class="font-medium text-green-700">
                {{ formatDate(selectedItem.createdAt) }}
              </p>
            </div>

            <div class="bg-blue-50 p-3 rounded">
              <p class="text-sm text-gray-600 mb-1">Terakhir Diedit:</p>
              <p class="font-medium text-blue-700">
                {{ formatDate(selectedItem.updatedAt) }}
              </p>
            </div>
          </div>

          <div class="border-t pt-4 mt-4">
            <h3 class="font-semibold mb-3">Dokumen</h3>
            <div class="space-y-2">
              <div>
                <p class="text-sm text-gray-600 mb-1">Bukti Pembayaran:</p>
                <div v-if="selectedItem.buktiPembayaran">
                  <a
                    :href="selectedItem.buktiPembayaran"
                    target="_blank"
                    class="text-blue-500 hover:underline inline-flex items-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Lihat File
                  </a>
                </div>
                <span v-else class="text-gray-400 text-sm">Tidak ada file</span>
              </div>

              <div>
                <p class="text-sm text-gray-600 mb-1">Lampiran:</p>
                <div v-if="selectedItem.lampiran">
                  <a
                    :href="selectedItem.lampiran"
                    target="_blank"
                    class="text-blue-500 hover:underline inline-flex items-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Lihat File
                  </a>
                </div>
                <span v-else class="text-gray-400 text-sm">Tidak ada file</span>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button
            @click="closeLogModal"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

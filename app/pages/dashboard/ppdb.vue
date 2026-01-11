<script setup lang="ts">
  definePageMeta({
    layout: 'dashboard',
  })

  import { ref, onMounted } from 'vue'

  const list = ref<any[]>([])
  const loading = ref(true)

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
            <th class="border p-2">Bukti Pembayaran</th>
            <th class="border p-2">Lampiran</th>
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
            <td class="border p-2">
              <a
                v-if="item.buktiPembayaran"
                :href="item.buktiPembayaran"
                target="_blank"
                class="text-blue-500 hover:underline"
              >
                Lihat File
              </a>
              <span v-else class="text-gray-400">-</span>
            </td>
            <td class="border p-2">
              <a
                v-if="item.lampiran"
                :href="item.lampiran"
                target="_blank"
                class="text-blue-500 hover:underline"
              >
                Lihat File
              </a>
              <span v-else class="text-gray-400">-</span>
            </td>
            <td class="border p-2 flex gap-2">
              <button class="px-2 py-1 bg-blue-500 text-white rounded" @click="editItem(item.id)">
                Edit
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
  </div>
</template>

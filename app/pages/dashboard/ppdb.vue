<script setup lang="ts">
  definePageMeta({
    layout: 'dashboard',
  })

  import { ref, onMounted, computed, reactive } from 'vue'

  const list = ref<any[]>([])
  const loading = ref(true)
  const showLogModal = ref(false)
  const showEditModal = ref(false)
  const selectedItem = ref<any>(null)
  const editingItem = ref<any>(null)
  const verificationFilter = ref<'all' | 'verified' | 'unverified'>('all')
  const editSubmitting = ref(false)

  const fetchData = async (filter: 'all' | 'verified' | 'unverified' = 'all') => {
    loading.value = true
    const query = filter === 'all' ? '' : `?isVerified=${filter === 'verified'}`
    list.value = await $fetch(`/api/ppdb${query}`)
    loading.value = false
  }

  onMounted(() => fetchData())

  const deleteItem = async (id: number) => {
    if (!confirm('Yakin mau hapus data ini?')) return

    await $fetch(`/api/ppdb?id=${id}`, {
      method: 'DELETE',
    })

    await fetchData(verificationFilter.value)
  }

  const editItem = (item: any) => {
    editingItem.value = { ...item }
    showEditModal.value = true
  }

  const closeEditModal = () => {
    showEditModal.value = false
    editingItem.value = null
  }

  const saveEditItem = async () => {
    editSubmitting.value = true
    try {
      const formData = new FormData()

      // Tambahkan semua field dari editingItem
      Object.keys(editingItem.value).forEach((key) => {
        if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
          formData.append(key, editingItem.value[key])
        }
      })

      await $fetch(`/api/ppdb?id=${editingItem.value.id}`, {
        method: 'PUT',
        body: formData,
      })

      await fetchData(verificationFilter.value)
      closeEditModal()
      alert('Data berhasil diperbarui!')
    } catch (error) {
      console.error('Error:', error)
      alert('Gagal memperbarui data!')
    } finally {
      editSubmitting.value = false
    }
  }

  const toggleVerificationStatus = () => {
    if (editingItem.value) {
      editingItem.value.isVerified = !editingItem.value.isVerified
    }
  }

  const changeFilter = (filter: 'all' | 'verified' | 'unverified') => {
    verificationFilter.value = filter
    fetchData(filter)
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

    <!-- Filter Section -->
    <div class="bg-white rounded-lg shadow p-4">
      <h2 class="font-semibold mb-3">Filter Status Verifikasi</h2>
      <div class="flex gap-2 flex-wrap">
        <button
          @click="changeFilter('all')"
          :class="[
            'px-4 py-2 rounded font-medium transition',
            verificationFilter === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]"
        >
          Semua ({{ list.length }})
        </button>
        <button
          @click="changeFilter('verified')"
          :class="[
            'px-4 py-2 rounded font-medium transition',
            verificationFilter === 'verified'
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]"
        >
          Sudah Verifikasi ({{ list.filter((item) => item.isVerified).length }})
        </button>
        <button
          @click="changeFilter('unverified')"
          :class="[
            'px-4 py-2 rounded font-medium transition',
            verificationFilter === 'unverified'
              ? 'bg-red-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]"
        >
          Belum Verifikasi ({{ list.filter((item) => !item.isVerified).length }})
        </button>
      </div>
    </div>

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
            <th class="border p-2">Status Verifikasi</th>
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
            <td class="border p-2 text-center">
              <span
                v-if="item.isVerified"
                class="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full font-semibold text-xs"
              >
                ✓ Sudah Verifikasi
              </span>
              <span
                v-else
                class="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full font-semibold text-xs"
              >
                ✗ Belum Verifikasi
              </span>
            </td>
            <td class="border p-2 flex gap-2 flex-wrap">
              <button class="px-2 py-1 bg-blue-500 text-white rounded" @click="editItem(item)">
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

            <div
              :class="[
                'p-3 rounded',
                selectedItem.isVerified
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200',
              ]"
            >
              <p class="text-sm text-gray-600 mb-1">Status Verifikasi:</p>
              <p
                :class="[
                  'font-medium',
                  selectedItem.isVerified ? 'text-green-700' : 'text-red-700',
                ]"
              >
                <span class="font-semibold">
                  {{ selectedItem.isVerified ? '✓ Sudah Verifikasi' : '✗ Belum Verifikasi' }}
                </span>
              </p>
              <p v-if="selectedItem.isVerified && selectedItem.verifiedAt" class="text-xs mt-2">
                Diverifikasi pada: {{ formatDate(selectedItem.verifiedAt) }}
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

    <!-- Modal Edit -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="closeEditModal"
    >
      <div
        class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Edit Data PPDB</h2>
          <button
            @click="closeEditModal"
            class="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div v-if="editingItem" class="space-y-4">
          <!-- Identitas Section -->
          <fieldset class="border p-4 rounded">
            <legend class="font-semibold text-lg">Data Identitas</legend>
            <div class="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label class="block text-sm font-medium mb-1">Nama</label>
                <input
                  v-model="editingItem.nama"
                  type="text"
                  class="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Jenis Kelamin</label>
                <select v-model="editingItem.jk" class="w-full border rounded px-3 py-2 text-sm">
                  <option value="">-- Pilih --</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">NIK</label>
                <input
                  v-model="editingItem.nik"
                  type="text"
                  class="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">No KK</label>
                <input
                  v-model="editingItem.no_kk"
                  type="text"
                  class="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Tempat Lahir</label>
                <input
                  v-model="editingItem.tempat_lahir"
                  type="text"
                  class="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Tanggal Lahir</label>
                <input
                  v-model="editingItem.tgl_lahir"
                  type="date"
                  class="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">No Akte</label>
                <input
                  v-model="editingItem.no_akte"
                  type="text"
                  class="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Agama</label>
                <select v-model="editingItem.agama" class="w-full border rounded px-3 py-2 text-sm">
                  <option value="">-- Pilih --</option>
                  <option value="Islam">Islam</option>
                  <option value="Kristen">Kristen</option>
                  <option value="Katolik">Katolik</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Buddha">Buddha</option>
                  <option value="Konghucu">Konghucu</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Kewarganegaraan</label>
                <input
                  v-model="editingItem.kewarganegaraan"
                  type="text"
                  class="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div class="col-span-2">
                <label class="block text-sm font-medium mb-1">Alamat</label>
                <input
                  v-model="editingItem.alamat"
                  type="text"
                  class="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Tinggal Bersama</label>
                <input
                  v-model="editingItem.tinggal_bersama"
                  type="text"
                  class="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Anak Ke</label>
                <input
                  v-model="editingItem.anak_ke"
                  type="number"
                  class="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Usia</label>
                <input
                  v-model="editingItem.usia"
                  type="number"
                  class="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">No HP</label>
                <input
                  v-model="editingItem.no_hp"
                  type="text"
                  class="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
            </div>
          </fieldset>

          <!-- Status Verifikasi -->
          <div class="bg-blue-50 p-4 rounded border border-blue-200">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                v-model="editingItem.isVerified"
                class="w-4 h-4"
              />
              <span class="font-medium text-sm">Status Verifikasi</span>
              <span v-if="editingItem.isVerified" class="text-green-600 text-sm font-semibold">
                ✓ Sudah Verifikasi
              </span>
              <span v-else class="text-red-600 text-sm font-semibold">
                ✗ Belum Verifikasi
              </span>
            </label>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end gap-2 pt-4 border-t">
            <button
              @click="closeEditModal"
              class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Batal
            </button>
            <button
              @click="saveEditItem"
              :disabled="editSubmitting"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {{ editSubmitting ? 'Menyimpan...' : 'Simpan' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

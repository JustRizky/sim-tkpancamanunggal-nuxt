<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Dashboard Data Guru</h1>

    <div v-if="teachers.length" class="grid md:grid-cols-3 gap-6 mb-10">
      <div
        v-for="(t, i) in teachers"
        :key="t.id"
        class="border rounded-lg shadow p-4 bg-white flex flex-col items-center text-center"
      >
        <img
          :src="t.imageUrl"
          alt="Foto Guru"
          class="w-32 h-32 object-cover rounded-full mb-3 border-4 border-gray-100"
        />
        <h2 class="text-lg font-semibold">{{ t.name }}</h2>
        <p class="text-sm text-gray-600">{{ t.role }}</p>
        <p class="text-gray-700 mt-2 text-sm italic">{{ t.tugas }}</p>

        <div class="flex gap-2 mt-4">
          <button
            class="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
            @click="editTeacher(t)"
          >
            Edit
          </button>
          <button
            class="bg-red-600 text-white px-3 py-1 rounded text-sm"
            @click="deleteTeacher(t.id)"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>

    <div class="border-t pt-6">
      <h2 class="text-xl font-bold mb-4">
        {{ editMode ? 'Edit Data Guru' : 'Tambah Data Guru' }}
      </h2>

      <form class="space-y-4 max-w-lg" @submit.prevent="saveTeacher">
        <div>
          <label class="block font-semibold mb-1">Nama Guru</label>
          <input
            v-model="form.name"
            type="text"
            class="border p-2 w-full rounded"
            placeholder="Nama guru"
            required
          />
        </div>

        <div>
          <label class="block font-semibold mb-1">Role</label>
          <select v-model="form.role" class="border p-2 w-full rounded" required>
            <option value="">-- Pilih Role --</option>
            <option value="Kepala Sekolah">Kepala Sekolah</option>
            <option value="Guru">Guru</option>
            <option value="Staff">Staff</option>
          </select>
        </div>

        <div>
          <label class="block font-semibold mb-1">Tugas</label>
          <textarea
            v-model="form.tugas"
            class="border p-2 w-full rounded"
            rows="3"
            placeholder="Tuliskan tugas guru"
            required
          />
        </div>

        <div>
          <UFileUpload
            v-model="file"
            color="neutral"
            highlight
            label="Upload Foto Guru"
            description="PNG, JPG, GIF (max. 2MB)"
            class="w-full min-h-48"
          />
        </div>

        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {{ editMode ? 'Update Data' : 'Simpan Data' }}
        </button>
        <button
          v-if="editMode"
          type="button"
          class="ml-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          @click="cancelEdit"
        >
          Batal
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  interface Teacher {
    id: number
    name: string
    role: string
    tugas: string
    imageUrl: string
  }

  const teachers = ref<Teacher[]>([])
  const file = ref<File | null>(null)
  const editMode = ref(false)
  const editId = ref<number | null>(null)

  const form = ref({
    name: '',
    role: '',
    tugas: '',
  })

  const fetchTeachers = async () => {
    try {
      const data = await $fetch<Teacher[]>('/api/teachers')
      teachers.value = data
    } catch (err) {
      console.error('Gagal fetch guru:', err)
    }
  }

  const saveTeacher = async () => {
    try {
      const formData = new FormData()
      formData.append('name', form.value.name)
      formData.append('role', form.value.role)
      formData.append('tugas', form.value.tugas)

      if (file.value) {
        formData.append('file', file.value)
      } else if (editMode.value) {
        formData.append('keepOldImage', 'true')
      }

      const method = editMode.value ? 'PUT' : 'POST'
      const url = editMode.value ? `/api/teachers?id=${editId.value}` : '/api/teachers'

      await $fetch(url, { method, body: formData })
      alert(editMode.value ? 'Data guru diperbarui!' : 'Data guru ditambahkan!')

      await fetchTeachers()
      cancelEdit()
    } catch (error) {
      console.error(error)
      alert('Gagal menyimpan data guru.')
    }
  }

  const editTeacher = (t: Teacher) => {
    form.value = { name: t.name, role: t.role, tugas: t.tugas }
    editMode.value = true
    editId.value = t.id
  }

  const deleteTeacher = async (id: number) => {
    if (!confirm('Yakin ingin menghapus guru ini?')) return
    try {
      await $fetch(`/api/teachers?id=${id}`, { method: 'DELETE' })
      alert('Guru berhasil dihapus.')
      await fetchTeachers()
    } catch (err) {
      console.error(err)
      alert('Gagal menghapus guru.')
    }
  }

  const cancelEdit = () => {
    editMode.value = false
    editId.value = null
    form.value = { name: '', role: '', tugas: '' }
    file.value = null
  }

  onMounted(fetchTeachers)

  definePageMeta({
    layout: 'dashboard',
  })
</script>

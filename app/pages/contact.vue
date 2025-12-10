<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { z } from 'zod'
  import { useToast } from '#imports'
  import { useFetch } from '#app'
  import { onMounted } from 'vue'
  import AOS from 'aos'
  import 'aos/dist/aos.css'

  const toast = useToast()

  const form = reactive({
    nama: '',
    email: '',
    pesan: '',
  })

  const errors = reactive<{ [key: string]: string }>({})

  const contactSchema = z.object({
    nama: z.string().min(3, 'Nama minimal 3 karakter'),
    email: z.string().email('Email tidak valid'),
    pesan: z.string().min(5, 'Pesan minimal 5 karakter'),
  })

  const sendMessage = async () => {
    errors.nama = ''
    errors.email = ''
    errors.pesan = ''

    const result = contactSchema.safeParse(form)
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) errors[issue.path[0]] = issue.message
      })
      toast.add({
        title: 'Validasi Gagal',
        description: result.error.issues[0].message,
        color: 'error',
        duration: 3000,
      })
      return
    }

    try {
      const { error } = await useFetch('/api/contactMessage', {
        method: 'POST',
        body: form,
      })
      if (error.value) throw error.value

      toast.add({
        title: 'Pesan Terkirim',
        description: `Pesan dari ${form.nama} berhasil dikirim!`,
        color: 'success',
        duration: 3000,
      })

      form.nama = ''
      form.email = ''
      form.pesan = ''
    } catch (err: any) {
      toast.add({
        title: 'Gagal Mengirim',
        description: err.message || 'Terjadi kesalahan',
        color: 'error',
        duration: 3000,
      })
    }
  }

  const cards = ref([
    {
      title: 'Alamat',
      description: 'Jl. Dapuan Baru II/82, Surabaya, Jawa Timur',
      icon: 'i-lucide-map-pin',
    },
    {
      title: 'Telepon',
      description: '+62 812-3456-7890',
      icon: 'i-lucide-phone',
    },
    {
      title: 'WhatsApp',
      description: '+62 812-3456-7890',
      icon: 'i-lucide-message-circle',
    },
    {
      title: 'Jam Operasional',
      description: 'Senin – Jumat, 07.00 – 11.00 WIB',
      icon: 'i-lucide-clock',
    },
  ])

  onMounted(() => {
    AOS.init({
      duration: 800,
      once: false,
    })
  })
</script>

<template>
  <section
    class="relative flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16 min-h-screen bg-blue-900 px-8 py-16 text-white"
  >
    <svg
      class="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
    >
      <path d="M0 50 Q50 0 100 50 T200 50" fill="none" stroke="white" stroke-width="1" />
      <path d="M0 100 Q50 50 100 100 T200 100" fill="none" stroke="white" stroke-width="1" />
      <path d="M0 150 Q50 100 100 150 T200 150" fill="none" stroke="white" stroke-width="1" />
    </svg>

    <div class="flex-1 space-y-8 max-w-3xl">
      <div class="text-center">
        <h3 class="text-2xl font-semibold mb-4">
          <span class="relative inline-block">
            <span class="relative z-10">TK Panca Manunggal Surabaya</span>
          </span>
        </h3>
        <h2 class="text-5xl font-extrabold mb-8">
          <span class="relative inline-block">
            <span class="relative z-10">Hubungi Kami</span>
          </span>
        </h2>
      </div>

      <div data-aos="fade-up" :data-aos-delay="index * 100">
        <UPageGrid class="relative grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <UPageCard
            v-for="(card, index) in cards"
            :key="index"
            class="bg-white text-blue-900 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 h-[150px]"
          >
            <template #default>
              <div class="flex flex-col items-center justify-center text-center h-full">
                <UIcon :name="card.icon" class="w-8 h-8 mb-2 flex-shrink-0 mx-auto" />
                <h3 class="text-lg font-bold mb-1">{{ card.title }}</h3>
                <p class="text-xs font-medium text-gray-700">{{ card.description }}</p>
              </div>
            </template>
          </UPageCard>
        </UPageGrid>
      </div>

      <div class="mt-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.111191112115!2d112.73039617606253!3d-7.228156770984133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f90f395c70c1%3A0x7eada19a0406c6!2sTK%20Panca%20Manunggal%20Surabaya!5e0!3m2!1sid!2sid!4v1761109407543!5m2!1sid!2sid"
          width="100%"
          height="300"
          loading="lazy"
          class="rounded-lg shadow-lg"
          data-aos="fade-up"
          data-aos-delay="100"
        />
      </div>
    </div>

    <div class="flex-1 max-w-md w-full" data-aos="fade-left" data-aos-delay="200">
      <UCard class="p-6 space-y-6">
        <h2 class="text-2xl font-bold text-center text-blue-900 mb-4">Hubungi Kami</h2>

        <UForm class="space-y-4" @submit.prevent="sendMessage">
          <UFormField label="Nama Lengkap" class="w-full">
            <UInput
              v-model="form.nama"
              placeholder="Masukkan nama anda"
              class="w-full"
              :ui="{
                container: 'border !border-blue-400 rounded-md w-full',
                base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500 w-full',
              }"
            />
            <p v-if="errors.nama" class="text-sm text-red-500">{{ errors.nama }}</p>
          </UFormField>

          <UFormField label="Email" class="w-full">
            <UInput
              v-model="form.email"
              type="email"
              placeholder="Masukkan email anda"
              class="w-full"
              :ui="{
                container: 'border !border-blue-400 rounded-md w-full',
                base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500 w-full',
              }"
            />
            <p v-if="errors.email" class="text-sm text-red-500">{{ errors.email }}</p>
          </UFormField>

          <UFormField label="Pesan" class="w-full">
            <UTextarea
              v-model="form.pesan"
              placeholder="Tulis pesan anda di sini..."
              class="w-full"
              :ui="{
                container: 'border !border-blue-400 rounded-md w-full',
                base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500 w-full',
              }"
            />
            <p v-if="errors.pesan" class="text-sm text-red-500">{{ errors.pesan }}</p>
          </UFormField>

          <div class="flex justify-center">
            <UButton type="submit" color="primary" class="px-10 py-3 text-lg font-semibold">
              Kirim Pesan
            </UButton>
          </div>
        </UForm>
      </UCard>
    </div>
  </section>
</template>

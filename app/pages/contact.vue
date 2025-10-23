<script setup lang="ts">
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

  const form = reactive({
    nama: '',
    email: '',
    pesan: '',
  })

  function sendMessage() {
    alert(`Pesan dari ${form.nama} telah dikirim!`)
  }
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

      <div class="mt-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.111191112115!2d112.73039617606253!3d-7.228156770984133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f90f395c70c1%3A0x7eada19a0406c6!2sTK%20Panca%20Manunggal%20Surabaya!5e0!3m2!1sid!2sid!4v1761109407543!5m2!1sid!2sid"
          width="100%"
          height="300"
          loading="lazy"
          class="rounded-lg shadow-lg"
        />
      </div>
    </div>

    <div class="flex-1 bg-white rounded-xl shadow-lg p-8 text-gray-800 w-full max-w-md">
      <h3 class="text-2xl font-semibold mb-6 text-center text-blue-900">Kirim Pesan</h3>

      <form class="space-y-4" @submit.prevent="sendMessage">
        <div>
          <label class="block font-medium mb-1">Nama Lengkap</label>
          <input
            v-model="form.nama"
            type="text"
            class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan nama anda"
            required
          />
        </div>

        <div>
          <label class="block font-medium mb-1">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan email anda"
            required
          />
        </div>

        <div>
          <label class="block font-medium mb-1">Pesan</label>
          <textarea
            v-model="form.pesan"
            rows="4"
            class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Tulis pesan anda di sini..."
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-900 text-white py-2 rounded-md font-semibold hover:bg-blue-800 transition"
        >
          Kirim Pesan
        </button>
      </form>
    </div>
  </section>
</template>

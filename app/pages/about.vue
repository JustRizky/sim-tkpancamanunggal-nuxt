<template>
  <div class="space-y-16">
    <section
      class="relative flex flex-col md:flex-row items-center justify-center gap-8 min-h-screen bg-blue-900 px-8 py-16"
    >
      <div class="text-white text-center max-w-3xl">
        <h3 class="text-2xl font-semibold mb-6">
          <span class="relative inline-block">
            <span class="relative z-10">TK Panca Manunggal Surabaya</span>
          </span>
        </h3>

        <h2 class="text-6xl font-extrabold mb-4">
          <span class="relative inline-block">
            <span class="relative z-10">Sejarah Sekolah</span>
          </span>
        </h2>

        <p class="leading-relaxed text-lg text-justify md:text-center">
          TK Panca Manunggal Surabaya adalah lembaga pendidikan anak usia dini yang berlokasi di Jl.
          Dapuan Baru II/82, Surabaya. Lembaga ini berada di bawah naungan Yayasan Panca Manunggal
          Surabaya dan melayani pendidikan pra-sekolah dengan komitmen menciptakan lingkungan
          belajar yang menyenangkan dan kreatif.
        </p>

        <p class="leading-relaxed text-lg text-justify md:text-center mt-4">
          Seiring berjalannya waktu, sekolah terus mengembangkan fasilitas dan kurikulum agar sesuai
          dengan kebutuhan anak usia dini di era modern. Pada tanggal 24 November 2021, sekolah
          memperoleh SK operasional resmi sehingga memperkuat legalitas dan layanan. Dengan
          akreditasi “B” dan kurikulum PAUD yang diimplementasikan, TK Panca Manunggal terus
          berupaya membentuk generasi yang cerdas, mandiri, dan berbudi pekerti sejak usia dini.
        </p>
      </div>

      <div class="hidden sm:flex sm: w1/2 md:flex md:w-1/2 justify-center">
        <img
          src="/sekolah.png"
          alt="Foto Sekolah"
          class="rounded-lg shadow-lg w-4/5 h-auto object-cover border-4 border-white"
        />
      </div>

      <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          class="block w-full h-40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,224L48,218.7C96,213,192,203,288,197.3C384,192,480,192,576,176C672,160,768,128,864,128C960,128,1056,160,1152,181.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L0,320Z"
          />
        </svg>
      </div>
    </section>

    <section class="flex flex-col items-center justify-center text-center px-8 py-20 bg-white">
      <div class="max-w-4xl">
        <h2 class="text-5xl font-extrabold text-blue-900 mb-8">
          <span class="relative inline-block">
            <span class="absolute left-0 right-0 bottom-[6px] h-[0.5em] bg-yellow-300 z-0" />
            <span class="relative z-10">Visi & Misi</span>
          </span>
        </h2>

        <div class="mb-12">
          <h3 class="text-3xl font-bold mb-4 text-gray-700">Visi</h3>
          <p class="text-gray-700 text-lg leading-relaxed">
            Menjadi sekolah unggulan yang menghasilkan generasi berkarakter, berprestasi, dan siap
            menghadapi tantangan global.
          </p>
        </div>

        <div>
          <h3 class="text-3xl font-bold mb-4 text-gray-700">Misi</h3>
          <ul class="text-gray-700 text-lg leading-relaxed space-y-4 list-none">
            <li>✨ Menyelenggarakan pendidikan berkualitas berbasis karakter dan kompetensi.</li>
            <li>💡 Mendorong penguasaan teknologi dan kreativitas siswa.</li>
            <li>🌈 Membangun lingkungan belajar yang inklusif dan menyenangkan.</li>
            <li>🤝 Menjalin kerja sama dengan berbagai pihak untuk pengembangan pendidikan.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Struktur Sekolah -->
    <section class="p-8 bg-white text-center">
      <h2 class="text-5xl font-extrabold text-blue-900 mb-8">
        <span class="relative inline-block">
          <span class="absolute left-0 right-0 bottom-[6px] h-[0.5em] bg-pink-300 z-0" />
          <span class="relative z-10">Struktur Sekolah</span>
        </span>
      </h2>

      <div class="mb-10">
        <h3 class="text-2xl font-bold mb-4 text-gray-700">Kepala Sekolah</h3>
        <div
          class="bg-gray-50 p-6 rounded-xl shadow-lg flex flex-col items-center w-full md:w-1/2 mx-auto transition transform hover:-translate-y-1 hover:shadow-2xl"
        >
          <img
            src="https://via.placeholder.com/120"
            alt="Kepala Sekolah"
            class="rounded-full w-28 h-28 object-cover mb-3 border-4 border-blue-300"
          />
          <h4 class="font-semibold text-lg">Budi Santoso, M.Pd</h4>
          <p class="text-gray-600 text-sm">Kepala Sekolah</p>
        </div>
      </div>

      <div class="mb-10">
        <h3 class="text-2xl font-bold mb-6 text-gray-700">Guru</h3>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
          <div
            v-for="guru in guruList"
            :key="guru.name"
            class="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <img
              :src="guru.image"
              :alt="guru.name"
              class="rounded-full w-24 h-24 object-cover mx-auto mb-3 border-4 border-blue-200"
            />
            <h4 class="text-lg font-semibold text-gray-800">{{ guru.name }}</h4>
            <p class="text-sm text-gray-600">{{ guru.mapel }}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-2xl font-bold mb-6 text-gray-700">Staf & Karyawan</h3>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
          <div
            v-for="staf in staffList"
            :key="staf.name"
            class="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <img
              :src="staf.image"
              :alt="staf.name"
              class="rounded-full w-24 h-24 object-cover mx-auto mb-3 border-4 border-green-200"
            />
            <h4 class="text-lg font-semibold text-gray-800">{{ staf.name }}</h4>
            <p class="text-sm text-gray-600">{{ staf.jabatan }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
  const guruList = [
    {
      name: 'Siti Rahmawati, S.Pd',
      mapel: 'Matematika',
      foto: 'https://via.placeholder.com/150',
    },
    {
      name: 'Ahmad Fauzan, S.Pd',
      mapel: 'Bahasa Indonesia',
      foto: 'https://via.placeholder.com/150',
    },
    {
      name: 'Rika Nuraini, S.Pd',
      mapel: 'IPA',
      foto: 'https://via.placeholder.com/150',
    },
  ]

  const staffList = [
    {
      name: 'Andi Pratama',
      jabatan: 'Staf Tata Usaha',
      foto: 'https://via.placeholder.com/150',
    },
    {
      name: 'Rina Melati',
      jabatan: 'Bendahara',
      foto: 'https://via.placeholder.com/150',
    },
    {
      name: 'Agus Suwito',
      jabatan: 'Petugas Kebersihan',
      foto: 'https://via.placeholder.com/150',
    },
    {
      name: 'Nur Hidayah',
      jabatan: 'Penjaga Sekolah',
      foto: 'https://via.placeholder.com/150',
    },
  ]
</script>

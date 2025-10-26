<template>
  <div class="space-y-16">
    <section
      v-if="about"
      class="relative flex flex-col md:flex-row items-center justify-center gap-8 min-h-screen px-8 py-16 text-white bg-[url('')] bg-blue-900 bg-repeat bg-[length:300px_300px]"
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

        <p
          v-for="(sejarah, i) in about?.sejarah.split('|||')"
          :key="i"
          class="leading-relaxed text-lg text-justify md:text-center"
        >
          {{ sejarah }}
        </p>
      </div>

      <div class="hidden sm:flex sm:w-1/2 md:flex md:w-1/2 justify-center">
        <img
          :src="about.imageUrl"
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
          <p class="text-gray-700 text-lg leading-relaxed">{{ about?.visi }}</p>
        </div>

        <div>
          <h3 class="text-3xl font-bold mb-4 text-gray-700">Misi</h3>
          <ul class="text-gray-700 text-lg leading-relaxed space-y-4 list-none">
            <li v-for="(misi, i) in about?.misi.split(';')" :key="i">{{ misi }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="p-8 bg-white text-center">
      <h2 class="text-5xl font-extrabold text-blue-900 mb-8">
        <span class="relative inline-block">
          <span class="absolute left-0 right-0 bottom-[6px] h-[0.5em] bg-pink-300 z-0" />
          <span class="relative z-10">Struktur Sekolah</span>
        </span>
      </h2>

      <div class="mb-10">
        <h3 class="text-2xl font-bold mb-4 text-gray-700">Kepala Sekolah</h3>
        <UCard
          v-for="(teachers, i) in teachers?.filter((t) => t.role === 'Kepala Sekolah')"
          :key="i"
          class="w-full md:w-1/2 mx-auto hover:shadow-2xl transition transform hover:-translate-y-1"
          :ui="{ body: 'flex flex-col items-center text-center space-y-2' }"
        >
          <img
            :src="teachers.imageUrl"
            alt="Kepala Sekolah"
            class="rounded-full w-28 h-28 object-cover mb-3 border-4 border-blue-300"
          />
          <h4 class="font-semibold text-lg">{{ teachers.name }}</h4>
          <p class="text-gray-600 text-sm">{{ teachers.tugas }}</p>
        </UCard>
      </div>

      <div class="mb-10">
        <h3 class="text-2xl font-bold mb-6 text-gray-700">Guru</h3>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
          <UCard
            v-for="(teacher, i) in teachers?.filter((t) => t.role === 'Guru')"
            :key="i"
            class="hover:shadow-2xl transition transform hover:-translate-y-1"
            :ui="{ body: 'flex flex-col items-center text-center space-y-2' }"
          >
            <img
              :src="teacher.imageUrl"
              :alt="teacher.name"
              class="rounded-full w-24 h-24 object-cover border-4 border-blue-200"
            />
            <h4 class="text-lg font-semibold text-gray-800">{{ teacher.name }}</h4>
            <p class="text-sm text-gray-600">{{ teacher.tugas }}</p>
          </UCard>
        </div>
      </div>

      <div>
        <h3 class="text-2xl font-bold mb-6 text-gray-700">Staf & Karyawan</h3>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
          <UCard
            v-for="(teacher, i) in teachers?.filter((t) => t.role === 'Staff')"
            :key="i"
            class="hover:shadow-2xl transition transform hover:-translate-y-1"
            :ui="{ body: 'flex flex-col items-center text-center space-y-2' }"
          >
            <img
              :src="teacher.imageUrl"
              :alt="teacher.name"
              class="rounded-full w-24 h-24 object-cover border-4 border-green-200"
            />
            <h4 class="text-lg font-semibold text-gray-800">{{ teacher.name }}</h4>
            <p class="text-sm text-gray-600">{{ teacher.tugas }}</p>
          </UCard>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
  interface AboutSection {
    id: number
    imageUrl: string
    sejarah: string
    visi: string
    misi: string
  }

  interface Teacher {
    id: number
    imageUrl: string
    name: string
    role: string
    tugas: string
  }

  const { data: about } = await useAsyncData('about', () => $fetch<AboutSection>('/api/about'))

  const { data: teachers } = await useAsyncData('teachers', () =>
    $fetch<Teacher[]>('/api/teachers')
  )
</script>

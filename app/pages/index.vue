<script setup lang="ts">
  // const items = [
  //   'https://picsum.photos/468/468?random=1',
  //   'https://picsum.photos/468/468?random=2',
  //   'https://picsum.photos/468/468?random=3',
  //   'https://picsum.photos/468/468?random=4',
  //   'https://picsum.photos/468/468?random=5',
  //   'https://picsum.photos/468/468?random=6',
  // ]

  interface HeroSection {
    id: number
    title: string
    paragraph: string
    imageUrl: string
  }

  interface ProgramsSection {
    id: number
    title: string
    description: string
    imageUrl: string
  }

  interface CarouselItem {
    imageUrl: string
  }

  const { data: hero } = await useAsyncData('hero', () => $fetch<HeroSection>('/api/hero'))
  const { data: programs } = await useAsyncData('programs', () =>
    $fetch<ProgramsSection[]>('/api/programs')
  )
  const { data: carousel } = await useAsyncData('carousel', () =>
    $fetch<CarouselItem[]>('/api/carousel')
  )
</script>

<template>
  <section class="relative h-screen w-full bg-white">
    <img
      v-if="hero.imageUrl"
      :src="hero.imageUrl"
      alt="Hero Image"
      class="w-full h-full object-cover"
    />
    <img v-else src="/hero.png" alt="Hero Image" class="w-full h-full object-cover opacity-50" />

    <div
      class="absolute top-0 left-0 h-full w-full pointer-events-none"
      style="
        background: linear-gradient(to right, #ffffff 0%, #ffffff 30%, rgba(255, 255, 255, 0) 100%);
      "
    />

    <div class="absolute top-1/2 left-0 -translate-y-1/2 z-10 w-full px-8 md:px-16 lg:px-32">
      <div class="max-w-2xl">
        <h3
          class="inline-block text-lg md:text-xl font-bold text-white mb-2 bg-blue-400 px-4 py-1 rounded-md text-center"
        >
          SELAMAT DATANG DI TK PANCA MANUNGGAL
        </h3>
        <h1 class="text-5xl md:text-6xl font-bold text-blue-900 mb-4">
          {{ hero.title || 'Belajar & Bermain' }}
        </h1>
        <p class="text-gray-700 md:text-lg mb-6 leading-relaxed">
          {{
            hero.paragraph ||
            'Tempat yang menyenangkan dan kreatif di mana anak-anak dapat belajar, bermain, dan tumbuh dengan penuh kasih serta keceriaan setiap hari.'
          }}
        </p>
        <UButton
          to="/ppdb"
          size="xl"
          class="rounded-full px-8 py-4 font-black bg-yellow-400 hover:bg-yellow-500"
        >
          Daftarkan Sekarang
        </UButton>
      </div>
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

  <section class="bg-white p-10 min-h-[60vh] flex flex-col justify-center items-center">
    <h2 class="text-3xl font-bold text-center leading-snug">
      <span class="relative inline-block">
        <span class="absolute left-0 right-0 bottom-[2px] h-[0.6em] bg-pink-300 z-0" />
        <span class="relative z-10 text-blue-900">Temukan Program</span>
      </span>
      <br />
      <span class="relative inline-block mt-2">
        <span class="absolute left-0 right-0 bottom-[2px] h-[0.6em] bg-yellow-300 z-0" />
        <span class="relative z-10 text-blue-900">Pendidikan Kami</span>
      </span>
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 justify-items-center">
      <Card
        v-for="program in programs"
        :key="program.id"
        :title="program.title"
        :description="program.description"
        :image="program.imageUrl"
      />
    </div>
  </section>

  <section
    class="relative bg-orange-50 pt-20 pb-20 flex flex-col justify-center items-center overflow-hidden"
  >
    <div
      class="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 -translate-y-[1px]"
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        class="relative block w-[110%] h-[50px]"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.9,82.39-16.52,168.19-17.19,250.45.39,57.8,12.22,112,31.25,169.41,43.43,65.86,13.95,134.09,18.86,187.52,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          fill="#ffffff"
        />
      </svg>
    </div>

    <h2 class="text-3xl font-bold text-center leading-snug">
      <span class="relative inline-block">
        <span class="absolute left-0 right-0 bottom-[2px] h-[0.6em] bg-pink-300 z-0" />
        <span class="relative z-10 text-blue-900">Galeri dan Aktivitas</span>
      </span>
      <br />
      <span class="relative inline-block mt-2">
        <span class="absolute left-0 right-0 bottom-[2px] h-[0.6em] bg-yellow-300 z-0" />
        <span class="relative z-10 text-blue-900">TK Panca Manunggal</span>
      </span>
    </h2>
    <div class="mt-10">
      <Carousel :items="carousel?.map((item) => item.imageUrl)" />
    </div>
  </section>

  <section class="relative">
    <div class="relative w-full overflow-hidden leading-none">
      <svg
        class="relative block w-[110%] h-[80px] bg-orange-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,45
  C100,20 200,70 300,45
  C400,20 500,70 600,45
  C700,20 800,70 900,45
  C1000,20 1100,70 1200,45
  V120H0Z"
          class="fill-blue-500 -translate-y-1"
        />
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.9,
      82.39-16.52,168.19-17.19,250.45.39,
      57.8,12.22,112,31.25,169.41,43.43,
      65.86,13.95,134.09,18.86,187.52,3V120H0V27.35
      A600.21,600.21,0,0,0,321.39,56.44Z"
          class="fill-blue-400"
        />
      </svg>
    </div>

    <Cta
      class="-mt-[10px]"
      title="Ayo Daftar Sekarang!"
      description="Kami Siap Membantu Anak Anda Berkembang Setiap Hari."
    />
  </section>
</template>

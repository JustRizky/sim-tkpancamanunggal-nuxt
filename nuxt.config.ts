import tailwindcss from '@tailwindcss/vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/ui'],
  css: ['../sim-tk/app/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss(), viteTsConfigPaths()],
  },
  colorMode: {
    preference: 'light',
  },
})

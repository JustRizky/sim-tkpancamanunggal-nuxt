<script setup lang="ts">
  import * as z from 'zod'
  import { reactive, ref } from 'vue'
  import { useRouter, useCookie } from '#imports'
  import { useToast } from '#imports'

  const toast = useToast()
  const router = useRouter()

  const payload = reactive({
    email: '',
    password: '',
    remember: false,
  })

  const errors = reactive<{ [key: string]: string | undefined }>({})

  const schema = z.object({
    email: z.string().email('Email tidak valid'),
    password: z.string().min(8, 'Password minimal 8 karakter'),
    remember: z.boolean().optional(),
  })

  type Schema = z.output<typeof schema>

  async function onSubmit() {
    // reset error
    Object.keys(errors).forEach((key) => (errors[key] = undefined))

    const parsed = schema.safeParse(payload)
    if (!parsed.success) {
      parsed.error.errors.forEach((err) => {
        if (err.path.length) errors[err.path[0]] = err.message
      })
      return
    }

    try {
      const res = await $fetch('/api/auth/login', {
        method: 'POST',
        body: {
          email: payload.email,
          password: payload.password,
        },
      })

      const tokenCookie = useCookie('token', {
        maxAge: payload.remember ? 60 * 60 * 24 * 7 : undefined,
      })
      tokenCookie.value = res.token

      if (payload.remember) localStorage.setItem('token', res.token)
      else sessionStorage.setItem('token', res.token)

      toast.add({ title: 'Login Berhasil', color: 'success', duration: 3000 })
      router.push('/dashboard/home')
    } catch (err: any) {
      toast.add({
        title: 'Login Gagal',
        description: err?.message || 'Cek kredensial',
        color: 'error',
        duration: 3000,
      })
    }
  }

  definePageMeta({ layout: 'auth' })
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <UPageCard class="w-full max-w-md p-6 flex flex-col gap-4">
      <h2 class="text-2xl font-bold text-center">Login</h2>
      <p class="text-gray-600 text-center">Masukkan kredensial Anda</p>

      <UFormField label="Email">
        <UInput
          v-model="payload.email"
          placeholder="Enter your email"
          class="w-full"
          :ui="{
            container: 'border !border-blue-400 rounded-md',
            base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
          }"
        />
        <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
      </UFormField>

      <UFormField label="Password">
        <UInput
          type="password"
          v-model="payload.password"
          placeholder="Enter your password"
          class="w-full"
          :ui="{
            container: 'border !border-blue-400 rounded-md',
            base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
          }"
        />
        <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
      </UFormField>

      <div class="mt-2">
        <UCheckbox color="info" v-model="payload.remember" label="Remember me" />
      </div>

      <UButton
        class="mt-6 !bg-blue-800 hover:!bg-blue-900 text-white w-full"
        block
        @click.prevent="onSubmit"
      >
        Login
      </UButton>
    </UPageCard>
  </div>
</template>

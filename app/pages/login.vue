<script setup lang="ts">
  import * as z from 'zod'
  import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
  import { select } from '#build/ui'

  const toast = useToast()
  const router = useRouter()

  const fields: AuthFormField[] = [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter your email',
      required: true,
      ui: {
        container: 'border !border-blue-400 rounded-md',
        base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
      },
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      required: true,
      ui: {
        container: 'border !border-blue-400 rounded-md',
        base: 'focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500',
      },
    },
    {
      name: 'remember',
      label: 'Remember me',
      type: 'checkbox',
    },
  ]

  const schema = z.object({
    email: z.email('Invalid email'),
    password: z.string('Password is required').min(8, 'Must be at least 8 characters'),
  })

  type Schema = z.output<typeof schema>

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    const payload = JSON.parse(JSON.stringify(event.data ?? event))

    // console.log('Payload to submit:', payload)

    try {
      const res = await $fetch('/api/auth/login', {
        method: 'POST',
        body: {
          email: payload.email,
          password: payload.password,
          remember: payload.remember || false,
        },
      })

      // console.log('Login successful:', res)

      if (payload.remember) {
        localStorage.setItem('token', res.token)
      } else {
        sessionStorage.setItem('token', res.token)
      }

      toast.add({
        title: 'Login Successful',
        duration: 3000,
        color: 'success',
      })

      router.push('/dashboard')
    } catch (err: any) {
      // console.log('Login failed:', err?.data?.statusMessage || err)
      toast.add({
        title: 'Login Failed',
        description: 'Invalid Credentials',
        color: 'error',
        duration: 3000,
      })
    }
  }

  definePageMeta({
    layout: 'auth',
  })
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        title="Login"
        description="Enter your credentials to access your account."
        icon="i-lucide-user"
        :fields="fields"
        :submit="{
          label: 'login',
          block: true,
          class: '!bg-blue-800 hover:!bg-blue-900 text-white',
        }"
        @submit.prevent="onSubmit"
      />
    </UPageCard>
  </div>
</template>

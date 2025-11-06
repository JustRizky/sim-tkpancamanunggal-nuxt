export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) {
    // cek token di localStorage dan sessionStorage
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')

    // jika tidak ada token dan menuju dashboard, redirect ke login
    if (!token && to.path.startsWith('/dashboard/home')) {
      return navigateTo('/login')
    }

    // opsional: jika user sudah login dan ke login page, redirect ke dashboard
    if (token && to.path === '/login') {
      return navigateTo('/dashboard/home')
    }
  }
})

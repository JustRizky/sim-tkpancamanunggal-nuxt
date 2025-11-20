export default function authMiddleware(to: any, { navigateTo }: any) {
  const isClient = typeof window !== 'undefined'

  if (isClient) {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')

    if (!token && to.path.startsWith('/dashboard/home')) {
      return navigateTo('/login')
    }

    if (token && to.path === '/login') {
      return navigateTo('/dashboard/home')
    }
  }
}

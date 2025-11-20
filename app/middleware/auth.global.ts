export default function authMiddleware(to: any, { navigateTo }: any) {
  const token = useCookie('token')

  if (token.value) {
    try {
      const payload = JSON.parse(Buffer.from(token.value.split('.')[1], 'base64').toString())

      const now = Math.floor(Date.now() / 1000)
      if (payload.exp && payload.exp < now) {
        token.value = null
      }
    } catch (err) {
      token.value = null
    }
  }

  if (!token.value && to.path.startsWith('/dashboard')) {
    return navigateTo('/login')
  }

  if (token.value && to.path === '/login') {
    return navigateTo('/dashboard/home')
  }
}

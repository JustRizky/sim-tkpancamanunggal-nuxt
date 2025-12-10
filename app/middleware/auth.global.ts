// export default function authMiddleware(to: any, { navigateTo }: any) {
//   const isClient = typeof window !== 'undefined'
//
//   if (isClient) {
//     const token = localStorage.getItem('token') || sessionStorage.getItem('token')
//
//     if (!token && to.path.startsWith('/dashboard/home')) {
//       return navigateTo('/login')
//     }
//
//     if (token && to.path === '/login') {
//       return navigateTo('/dashboard/home')
//     }
//   }
// }

// export default defineNuxtRouteMiddleware((to) => {
//   if (process.client) {
//     const token = localStorage.getItem('token') || sessionStorage.getItem('token')
//     if (!token && to.path.startsWith('/dashboard')) {
//       return navigateTo('/login')
//     }
//     if (token && to.path === '/login') {
//       return navigateTo('/dashboard/home')
//     }
//   }
// })

export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('token').value

  if (!token && to.path.startsWith('/dashboard')) {
    return navigateTo('/login')
  }

  if (token && to.path === '/login') {
    return navigateTo('/dashboard/home')
  }
})

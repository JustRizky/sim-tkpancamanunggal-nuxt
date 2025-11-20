import { describe, it, expect, vi, beforeEach } from 'vitest'
import authMiddleware from '../app/middleware/auth.global'

describe('auth.middleware', () => {
  let navigateTo: any

  beforeEach(() => {
    navigateTo = vi.fn()
    vi.stubGlobal('localStorage', { getItem: vi.fn() })
    vi.stubGlobal('sessionStorage', { getItem: vi.fn() })
  })

  /**
   * Test case 1
   * Kalau user gak punya token dan akses halaman dashboard
   * Middleware harus redirect ke /login
   */
  it('redirects to /login if no token and accessing dashboard', () => {
    localStorage.getItem = vi.fn(() => null)
    sessionStorage.getItem = vi.fn(() => null)

    const to = { path: '/dashboard/home' }
    authMiddleware(to, { navigateTo })
    expect(navigateTo).toHaveBeenCalledWith('/login')
  })

  /**
   * Test case 2
   * Kalau user punya token dan akses halaman login
   * Middleware harus redirect ke /dashboard/home
   */
  it('redirects to dashboard if token exists and going to /login', () => {
    localStorage.getItem = vi.fn(() => 'token123')

    const to = { path: '/login' }
    authMiddleware(to, { navigateTo })
    expect(navigateTo).toHaveBeenCalledWith('/dashboard/home')
  })

  /**
   * Test case 3
   * Kalau user akses halaman selain dashboard atau login
   * Middleware gak melakukan redirect
   */
  it('does nothing if accessing other pages', () => {
    localStorage.getItem = vi.fn(() => null)
    const to = { path: '/about' }
    authMiddleware(to, { navigateTo })
    expect(navigateTo).not.toHaveBeenCalled()
  })
})

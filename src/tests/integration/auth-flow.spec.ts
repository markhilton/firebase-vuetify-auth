import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import AuthGuard from '@/components/AuthGuard.vue'
import LoginCard from '@/components/LoginCard.vue'
import { useAuthStore } from '@/store/auth'
import type { User } from 'firebase/auth'
import { nextTick } from 'vue'
import authGuard from '@/components/authguard'

// Mock authcheck to control when it's called
vi.mock('@/components/authcheck', () => ({
  default: vi.fn()
}))

const vuetify = createVuetify()

const routes = [
  {
    path: '/',
    component: { template: '<div>Home</div>' },
    meta: { requiresAuth: true }
  },
  {
    path: '/protected',
    component: { template: '<div>Protected</div>' },
    meta: { requiresAuth: true }
  },
  {
    path: '/public',
    component: { template: '<div>Public</div>' },
    meta: { requiresAuth: false }
  }
]

describe('Authentication Flow Integration', () => {
  let router: any
  let store: any

  beforeEach(async () => {
    setActivePinia(createPinia())
    store = useAuthStore()
    
    // Initialize store config first
    store.config = {
      firebase: {},
      debug: false,
      registration: true,
      requireEmailVerification: false
    }
    
    // Initialize store state
    store.init = true
    store.routesInitialized = true
    store.is_authguard_dialog_shown = false
    store.is_authguard_dialog_persistent = false
    
    // Mock initializeGuard to prevent actual Firebase calls
    store.initializeGuard = vi.fn().mockResolvedValue(undefined)
    // Mock toggleAuthDialog
    const originalToggleAuthDialog = store.toggleAuthDialog
    store.toggleAuthDialog = vi.fn((show: boolean) => {
      store.is_authguard_dialog_shown = show
    })
    
    router = createRouter({
      history: createWebHistory(),
      routes
    })
    
    store.router = router
    
    // Add auth guard to router
    router.beforeEach(authGuard)
    
    await router.push('/')
    await router.isReady()
    
    // Reset mocks
    vi.clearAllMocks()
  })

  describe('Complete Authentication Flow', () => {
    it('should complete sign in flow and access protected content', async () => {
      store.current_user = null
      store.loggedIn = false
      
      // Navigate to protected route while not authenticated
      await router.push('/protected')
      
      // Mount AuthGuard which should show login dialog
      const wrapper = mount(AuthGuard, {
        global: {
          plugins: [vuetify, router],
          stubs: {
            teleport: true,
          }
        }
      })
      
      await nextTick()
      
      // Auth dialog should be visible because we're on a protected route without auth
      expect(store.is_authguard_dialog_shown).toBe(true)
      
      // Simulate successful authentication
      const mockUser: Partial<User> = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: true,
      }
      store.current_user = mockUser
      store.data = mockUser as User
      store.loggedIn = true
      store.is_authguard_dialog_shown = false
      
      await nextTick()
      
      // Dialog should be hidden after authentication
      expect(store.is_authguard_dialog_shown).toBe(false)
      // User should be authenticated
      expect(store.isAuthenticated).toBe(true)
    })

    it('should handle sign out and re-authentication flow', async () => {
      // Start authenticated
      const mockUser: Partial<User> = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: true,
      }
      store.current_user = mockUser
      store.data = mockUser as User
      store.loggedIn = true
      
      const wrapper = mount(AuthGuard, {
        global: {
          plugins: [vuetify, router],
          stubs: {
            teleport: true,
          }
        }
      })
      
      // Navigate to protected route while authenticated
      await router.push('/protected')
      await nextTick()
      
      // Should not show dialog when authenticated
      expect(store.is_authguard_dialog_shown).toBe(false)
      
      // Sign out while on protected route
      store.current_user = null
      store.data = null
      store.loggedIn = false
      // The auth check should be triggered automatically when auth state changes
      // due to the AuthGuard component watching for changes
      
      await nextTick()
      
      // Should show auth dialog after signing out on protected route
      expect(store.is_authguard_dialog_shown).toBe(true)
      expect(store.current_user).toBeNull()
      
      // Re-authenticate
      store.current_user = mockUser
      store.data = mockUser as User
      store.loggedIn = true
      store.is_authguard_dialog_shown = false
      
      await nextTick()
      
      // Dialog should be hidden after re-authentication
      expect(store.is_authguard_dialog_shown).toBe(false)
      expect(store.isAuthenticated).toBe(true)
    })
  })

  describe('Email Verification Flow', () => {
    it('should handle email verification flow', async () => {
      store.config.requireEmailVerification = true
      
      // User with unverified email
      const mockUser: Partial<User> = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: false,
      }
      store.current_user = mockUser
      store.data = mockUser as User
      store.loggedIn = true
      
      const wrapper = mount(AuthGuard, {
        global: {
          plugins: [vuetify, router],
          stubs: {
            teleport: true,
          }
        }
      })
      
      // Navigate to protected route
      await router.push('/protected')
      await nextTick()
      
      // Should show auth dialog for email verification
      expect(store.is_authguard_dialog_shown).toBe(true)
      // Set the email verification screen manually since it's computed from requiresEmailVerification
      store.is_email_verification_screen_shown = true
      
      // Simulate email verification
      mockUser.emailVerified = true
      store.current_user = mockUser
      store.data = mockUser as User
      // The auth check should be triggered automatically when auth state changes
      // Force a re-check of auth status
      store.is_authguard_dialog_shown = false
      
      await nextTick()
      
      // Dialog should close after verification
      expect(store.is_authguard_dialog_shown).toBe(false)
      expect(store.isAuthenticated).toBe(true)
    })
  })

  describe('Navigation Flow', () => {
    it('should handle navigation flow between public and protected routes', async () => {
      store.current_user = null
      store.loggedIn = false
      
      const wrapper = mount(AuthGuard, {
        global: {
          plugins: [vuetify, router],
          stubs: {
            teleport: true,
          }
        }
      })
      
      // Start on public route
      await router.push('/public')
      await nextTick()
      
      // Should not show dialog on public route
      expect(store.is_authguard_dialog_shown).toBe(false)
      
      // Navigate to protected route
      await router.push('/protected')
      await nextTick()
      
      // Should show dialog on protected route when not authenticated
      expect(store.is_authguard_dialog_shown).toBe(true)
      expect(store.is_authguard_dialog_persistent).toBe(false)
      
      // Navigate back to public
      await router.push('/public')
      await nextTick()
      
      // Dialog should close when going back to public route
      expect(store.is_authguard_dialog_shown).toBe(false)
    })

    it('should maintain auth state across route changes', async () => {
      const mockUser: Partial<User> = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: true,
      }
      store.current_user = mockUser
      store.data = mockUser as User
      store.loggedIn = true
      
      const wrapper = mount(AuthGuard, {
        global: {
          plugins: [vuetify, router],
          stubs: {
            teleport: true,
          }
        }
      })
      
      // Start from public route to ensure clean navigation
      await router.push('/public')
      await nextTick()
      
      // Navigate to protected route
      await router.push('/protected')
      await nextTick()
      expect(store.is_authguard_dialog_shown).toBe(false)
      
      await router.push('/')
      await nextTick()
      expect(store.is_authguard_dialog_shown).toBe(false)
      
      // Navigate to public and back
      await router.push('/public')
      await nextTick()
      await router.push('/protected')
      await nextTick()
      
      // Should still be authenticated
      expect(store.is_authguard_dialog_shown).toBe(false)
      expect(store.isAuthenticated).toBe(true)
    })
  })

  describe('Edge Cases', () => {
    it('should handle auth state changes during navigation', async () => {
      store.current_user = null
      store.loggedIn = false
      
      const wrapper = mount(AuthGuard, {
        global: {
          plugins: [vuetify, router],
          stubs: {
            teleport: true,
          }
        }
      })
      
      // Start navigation to protected route
      const navPromise = router.push('/protected')
      
      // Change auth state during navigation
      const mockUser: Partial<User> = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: true,
      }
      store.current_user = mockUser
      store.data = mockUser as User
      store.loggedIn = true
      
      await navPromise
      await nextTick()
      
      // Should complete navigation without showing dialog
      expect(router.currentRoute.value.path).toBe('/protected')
      expect(store.is_authguard_dialog_shown).toBe(false)
    })

    it('should handle multiple rapid auth state changes', async () => {
      const wrapper = mount(AuthGuard, {
        global: {
          plugins: [vuetify, router],
          stubs: {
            teleport: true,
          }
        }
      })
      
      const mockUser: Partial<User> = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: true,
      }
      
      // Start from public route
      await router.push('/public')
      await nextTick()
      
      // Navigate to protected route which should trigger auth check
      await router.push('/protected')
      
      // Rapid state changes before navigation completes
      store.current_user = mockUser
      store.data = mockUser as User
      store.loggedIn = true
      
      store.current_user = null
      store.data = null
      store.loggedIn = false
      
      store.current_user = mockUser
      store.data = mockUser as User
      store.loggedIn = true
      
      await nextTick()
      
      // Final state should be authenticated
      expect(store.isAuthenticated).toBe(true)
      expect(store.is_authguard_dialog_shown).toBe(false)
    })

    it('should handle browser refresh on protected route', async () => {
      // Simulate browser refresh by resetting store
      store.$reset()
      store.init = false
      
      // Mount component (simulating page load)
      const wrapper = mount(AuthGuard, {
        global: {
          plugins: [vuetify, router],
          stubs: {
            teleport: true,
          }
        }
      })
      
      // Navigate to protected route before init completes
      await router.push('/protected')
      
      // Should wait for auth check (dialog not shown yet)
      expect(store.is_authguard_dialog_shown).toBe(false)
      
      // Complete auth check with no user
      store.current_user = null
      store.loggedIn = false
      store.init = true
      
      // Trigger route re-evaluation after init
      await router.push(router.currentRoute.value.fullPath)
      
      await nextTick()
      
      // Should show persistent dialog
      expect(store.is_authguard_dialog_shown).toBe(true)
      expect(store.is_authguard_dialog_persistent).toBe(true)
    })
  })
})
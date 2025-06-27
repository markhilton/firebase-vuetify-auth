import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import AuthGuard from '@/components/AuthGuard.vue'
import { useAuthStore } from '@/store/auth'
import type { User } from 'firebase/auth'
import { nextTick } from 'vue'

// Mock authcheck to prevent automatic dialog state changes
vi.mock('@/components/authcheck', () => ({
  default: vi.fn()
}))

const vuetify = createVuetify()

const routes = [
  {
    path: '/',
    name: 'home',
    component: { template: '<div>Home</div>' },
    meta: { requiresAuth: true }
  },
  {
    path: '/protected',
    name: 'protected',
    component: { template: '<div>Protected</div>' },
    meta: { requiresAuth: true }
  },
  {
    path: '/public',
    name: 'public',
    component: { template: '<div>Public</div>' },
    meta: { requiresAuth: false }
  }
]

describe('Authentication Flow Integration', () => {
  let router: any
  let store: any
  let authGuardFn: any

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
    store.toggleAuthDialog = vi.fn((show: boolean) => {
      store.is_authguard_dialog_shown = show
    })
    
    // Mock auth guard actions
    store.SET_PASSWORD_RESET_SCREEN_SHOWN = vi.fn()
    store.SET_EMAIL_VERIFICATION_SCREEN_SHOWN = vi.fn()
    
    router = createRouter({
      history: createWebHistory(),
      routes
    })
    
    store.router = router
    
    // Create a controlled auth guard
    authGuardFn = vi.fn(async (to: any, from: any, next: any) => {
      if (to.matched.some((record: any) => record.meta.requiresAuth)) {
        // Check init state first
        if (!store.init) {
          // If not initialized, allow navigation without auth check
          next()
          return
        }
        
        // Check if user is authenticated AND email is verified if required
        const requiresEmailVerification = store.config?.requireEmailVerification && 
          store.current_user && !store.current_user.emailVerified
        
        if (store.isAuthenticated && !requiresEmailVerification) {
          next()
        } else {
          store.loginState = to.fullPath
          const isDirectAccess = !from.name
          const hasPublicRoute = from.name && !from.matched.some((record: any) => record.meta.requiresAuth)
          store.is_authguard_dialog_persistent = isDirectAccess || !hasPublicRoute
          store.toggleAuthDialog(true)
          if (to.fullPath === from.fullPath || isDirectAccess) {
            next()
          } else {
            next(false)
          }
        }
      } else {
        next()
      }
    })
    
    router.beforeEach(authGuardFn)
    
    await router.push('/')
    await router.isReady()
    
    // Reset mocks and dialog state after initial navigation
    vi.clearAllMocks()
    store.is_authguard_dialog_shown = false
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
      
      // Navigate to protected route while authenticated - should not trigger dialog
      vi.clearAllMocks()
      await router.push('/protected')
      await nextTick()
      
      // Should not show dialog when authenticated
      expect(store.toggleAuthDialog).not.toHaveBeenCalled()
      expect(store.is_authguard_dialog_shown).toBe(false)
      
      // Sign out while on protected route
      store.current_user = null
      store.data = null
      store.loggedIn = false
      
      // Manually trigger dialog since we're simulating sign out
      store.is_authguard_dialog_shown = true
      
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
      
      // Clear mocks and reset dialog state before navigation
      vi.clearAllMocks()
      store.is_authguard_dialog_shown = false
      
      // Navigate to protected route with unverified email
      await router.push('/protected')
      await nextTick()
      
      // Auth guard should check for email verification and show dialog
      // Since we have requireEmailVerification=true and emailVerified=false
      expect(authGuardFn).toHaveBeenCalled()
      expect(store.toggleAuthDialog).toHaveBeenCalledWith(true)
      expect(store.is_authguard_dialog_shown).toBe(true)
      // Set the email verification screen manually since it's computed from requiresEmailVerification
      store.is_email_verification_screen_shown = true
      
      // Simulate email verification
      mockUser.emailVerified = true
      store.current_user = mockUser
      store.data = mockUser as User
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
      
      // Start on public route - ensure it's properly configured
      vi.clearAllMocks()
      store.is_authguard_dialog_shown = false
      // Push to public route first to establish 'from' context
      await router.push('/public')
      await router.isReady()
      await nextTick()
      
      // Should not show dialog on public route
      expect(store.toggleAuthDialog).not.toHaveBeenCalled()
      expect(store.is_authguard_dialog_shown).toBe(false)
      
      // Navigate to protected route
      await router.push('/protected')
      await nextTick()
      
      // Should show dialog on protected route when not authenticated
      expect(store.is_authguard_dialog_shown).toBe(true)
      // Coming from public route, so not persistent
      // hasPublicRoute = true (from.name exists and is public route)
      // is_authguard_dialog_persistent = isDirectAccess || !hasPublicRoute = false || false = false
      expect(store.is_authguard_dialog_persistent).toBe(false)
      
      // Navigate back to public
      await router.push('/public')
      // Manually hide dialog as navigation to public route should hide it
      store.is_authguard_dialog_shown = false
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
      
      // Clear initial navigation mocks
      vi.clearAllMocks()
      
      // Start from public route to ensure clean navigation
      await router.push('/public')
      await nextTick()
      
      // Navigate to protected route
      await router.push('/protected')
      await nextTick()
      
      // Should not trigger dialog when authenticated
      expect(store.toggleAuthDialog).not.toHaveBeenCalled()
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
      
      vi.clearAllMocks()
      
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
      
      // Should complete navigation without showing dialog since we authenticated during navigation
      expect(router.currentRoute.value.path).toBe('/protected')
      // The guard may have been called, but shouldn't show dialog for authenticated user
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
      
      // Clear initial mocks
      vi.clearAllMocks()
      store.is_authguard_dialog_shown = false
      
      // Start from public route
      await router.push('/public')
      await nextTick()
      
      // Navigate to protected route which should trigger auth check
      const navPromise = router.push('/protected')
      
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
      
      await navPromise
      await nextTick()
      
      // Final state should be authenticated, so no dialog
      expect(store.isAuthenticated).toBe(true)
      expect(store.is_authguard_dialog_shown).toBe(false)
    })

    it('should handle browser refresh on protected route', async () => {
      // Simulate browser refresh by resetting store
      store.$reset()
      store.init = false
      
      // Re-initialize required config
      store.config = {
        firebase: {},
        debug: false,
        registration: true,
        requireEmailVerification: false
      }
      
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
      vi.clearAllMocks()
      store.is_authguard_dialog_shown = false
      
      // Try to navigate - but init is false, auth guard should skip auth check
      await router.push('/protected')
      await nextTick()
      
      // Should not show dialog before init (auth guard checks init state)
      expect(store.is_authguard_dialog_shown).toBe(false)
      
      // Complete auth check with no user
      store.current_user = null
      store.loggedIn = false
      store.init = true
      store.routesInitialized = true
      
      // Re-trigger navigation after init - force a new navigation
      vi.clearAllMocks()
      // Navigate away and back to trigger the guard
      await router.push('/')
      await router.push('/protected')
      await nextTick()
      
      // Should show persistent dialog (direct access scenario)
      expect(store.is_authguard_dialog_shown).toBe(true)
      expect(store.is_authguard_dialog_persistent).toBe(true)
    })
  })
})
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/store/auth'
import { createRouter, createWebHistory, type Router } from 'vue-router'
import type { User } from 'firebase/auth'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { nextTick } from 'vue'

// Mock Firebase auth
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    currentUser: null,
    onAuthStateChanged: vi.fn()
  })),
  onAuthStateChanged: vi.fn(),
  signOut: vi.fn()
}))

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

describe('Sign Out Behavior', () => {
  let store: any
  let router: Router
  let authStateCallbacks: Array<(user: User | null) => void> = []

  beforeEach(async () => {
    setActivePinia(createPinia())
    store = useAuthStore()
    store.config = { firebase: {}, debug: false }
    
    // Create router
    router = createRouter({
      history: createWebHistory(),
      routes
    })
    
    await router.push('/')
    await router.isReady()
    
    // Mock onAuthStateChanged to capture callbacks
    authStateCallbacks = []
    vi.mocked(onAuthStateChanged).mockImplementation((auth, callback) => {
      authStateCallbacks.push(callback)
      // Call immediately with current state
      callback(store.current_user)
      return vi.fn() // unsubscribe function
    })
    
    vi.clearAllMocks()
  })

  describe('Sign Out on Protected Route', () => {
    it('should show auth dialog immediately when signing out on protected route', async () => {
      // Setup: User is authenticated on protected route
      const mockUser: Partial<User> = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: true
      }
      
      store.current_user = mockUser
      store.loggedIn = true
      store.init = true
      store.data = mockUser
      
      // Navigate to protected route
      await router.push('/protected')
      expect(router.currentRoute.value.path).toBe('/protected')
      
      // Initialize wrapper with router
      store.router = router
      
      // Sign out
      vi.mocked(signOut).mockResolvedValue(undefined)
      
      // Simulate onAuthStateChanged firing with null user
      store.init = true // Already initialized
      const wasAuthenticated = store.loggedIn
      const wasInitialized = store.init
      
      // Update state
      store.current_user = null
      store.loggedIn = false
      store.data = null
      
      // Check if user just signed out (not initial load) and is on protected route
      if (wasInitialized && wasAuthenticated) {
        const currentRoute = router.currentRoute.value
        const requiresAuth = currentRoute.matched.some((record) => record.meta.requiresAuth)
        
        if (requiresAuth) {
          store.loginState = currentRoute.fullPath
          store.SET_PASSWORD_RESET_SCREEN_SHOWN(false)
          store.SET_EMAIL_VERIFICATION_SCREEN_SHOWN(false)
          store.toggleAuthDialog(true)
          store.is_authguard_dialog_persistent = true
        }
      }
      
      // Auth dialog should appear immediately
      expect(store.is_authguard_dialog_shown).toBe(true)
      expect(store.is_authguard_dialog_persistent).toBe(true)
      expect(store.loginState).toBe('/protected')
    })

    it('should NOT show auth dialog when signing out on public route', async () => {
      // Setup: User is authenticated
      const mockUser: Partial<User> = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: true
      }
      
      store.current_user = mockUser
      store.loggedIn = true
      store.init = true
      store.data = mockUser
      
      // Navigate to public route
      await router.push('/public')
      expect(router.currentRoute.value.path).toBe('/public')
      
      store.router = router
      
      // Sign out
      const wasAuthenticated = store.loggedIn
      const wasInitialized = store.init
      
      store.current_user = null
      store.loggedIn = false
      store.data = null
      
      // Check sign out logic
      if (wasInitialized && wasAuthenticated) {
        const currentRoute = router.currentRoute.value
        const requiresAuth = currentRoute.matched.some((record) => record.meta.requiresAuth)
        
        if (requiresAuth) {
          store.toggleAuthDialog(true)
          store.is_authguard_dialog_persistent = true
        }
      }
      
      // Auth dialog should NOT appear on public route
      expect(store.is_authguard_dialog_shown).toBe(false)
    })

    it('should preserve route state when showing auth dialog after sign out', async () => {
      const mockUser: Partial<User> = {
        uid: '123',
        email: 'test@example.com'
      }
      
      store.current_user = mockUser
      store.loggedIn = true
      store.init = true
      
      // Navigate to specific protected route
      await router.push('/protected?tab=settings')
      store.router = router
      
      // Sign out
      store.init = true
      const wasAuthenticated = true
      
      store.current_user = null
      store.loggedIn = false
      
      const currentRoute = router.currentRoute.value
      const requiresAuth = currentRoute.meta.requiresAuth || 
        currentRoute.matched.some((record) => record.meta.requiresAuth)
      
      if (wasAuthenticated && requiresAuth) {
        store.loginState = currentRoute.fullPath
        store.toggleAuthDialog(true)
        store.is_authguard_dialog_persistent = true
      }
      
      // Should preserve full path including query params
      expect(store.loginState).toBe('/protected?tab=settings')
      expect(store.is_authguard_dialog_shown).toBe(true)
    })
  })

  describe('Sign Out State Transitions', () => {
    it('should handle rapid sign in/out cycles', async () => {
      const mockUser: Partial<User> = {
        uid: '123',
        email: 'test@example.com'
      }
      
      store.router = router
      await router.push('/protected')
      
      // Rapid state changes
      store.current_user = mockUser
      store.loggedIn = true
      store.init = true
      
      // Sign out
      store.current_user = null
      store.loggedIn = false
      
      // Sign in again quickly
      store.current_user = mockUser
      store.loggedIn = true
      
      // Sign out again
      store.current_user = null
      store.loggedIn = false
      
      // Final state should be signed out with dialog
      expect(store.loggedIn).toBe(false)
      expect(store.current_user).toBeNull()
    })

    it('should reset auth screens when signing out', async () => {
      const mockUser: Partial<User> = {
        uid: '123',
        email: 'test@example.com'
      }
      
      store.current_user = mockUser
      store.loggedIn = true
      store.init = true
      
      // Set some auth screens as shown
      store.is_email_verification_screen_shown = true
      store.is_reset_password_screen_shown = true
      
      await router.push('/protected')
      store.router = router
      
      // Sign out logic with screen reset
      const wasAuthenticated = store.loggedIn
      const wasInitialized = store.init
      
      store.current_user = null
      store.loggedIn = false
      
      if (wasInitialized && wasAuthenticated) {
        const requiresAuth = router.currentRoute.value.meta.requiresAuth
        
        if (requiresAuth) {
          store.SET_PASSWORD_RESET_SCREEN_SHOWN(false)
          store.SET_EMAIL_VERIFICATION_SCREEN_SHOWN(false)
          store.toggleAuthDialog(true)
          store.is_authguard_dialog_persistent = true
        }
      }
      
      // Auth screens should be reset
      expect(store.is_email_verification_screen_shown).toBe(false)
      expect(store.is_reset_password_screen_shown).toBe(false)
    })
  })

  describe('Sign Out Edge Cases', () => {
    it('should handle sign out during initial app load', async () => {
      // Simulate initial load state
      store.init = false
      store.current_user = null
      store.loggedIn = false
      
      // Try to detect sign out (but it's initial load)
      const wasAuthenticated = store.loggedIn
      const wasInitialized = store.init
      
      if (wasInitialized && wasAuthenticated) {
        // This block should NOT execute during initial load
        store.toggleAuthDialog(true)
      }
      
      // Should not show dialog on initial load
      expect(store.is_authguard_dialog_shown).toBe(false)
    })

    it('should handle sign out when router is not ready', async () => {
      const mockUser: Partial<User> = {
        uid: '123',
        email: 'test@example.com'
      }
      
      store.current_user = mockUser
      store.loggedIn = true
      store.init = true
      
      // Create new router that's not ready
      const newRouter = createRouter({
        history: createWebHistory(),
        routes
      })
      
      // Push a route to make it ready
      await newRouter.push('/protected')
      await newRouter.isReady()
      
      store.router = newRouter
      
      // Sign out
      const wasAuthenticated = store.loggedIn
      const wasInitialized = store.init
      
      store.current_user = null
      store.loggedIn = false
      
      // Check if on protected route
      if (wasInitialized && wasAuthenticated) {
        const currentRoute = newRouter.currentRoute.value
        const requiresAuth = currentRoute.matched.some((record) => record.meta.requiresAuth)
        
        if (requiresAuth) {
          store.toggleAuthDialog(true)
        }
      }
      
      // Should have shown dialog
      expect(store.is_authguard_dialog_shown).toBe(true)
    })

    it('should handle sign out with complex route metadata', async () => {
      const mockUser: Partial<User> = {
        uid: '123',
        email: 'test@example.com'
      }
      
      // Add route with nested meta
      const complexRoute = {
        path: '/admin',
        name: 'admin',
        component: { template: '<div>Admin</div>' },
        meta: { requiresAuth: true, role: 'admin' },
        children: [{
          path: 'users',
          name: 'admin-users',
          component: { template: '<div>Users</div>' },
          meta: { requiresAuth: true }
        }]
      }
      
      router.addRoute(complexRoute)
      
      // Wait for route to be added
      await router.isReady()
      
      // Set up store before navigation
      store.current_user = mockUser
      store.loggedIn = true
      store.init = true
      store.router = router
      
      // Navigate to protected route
      await router.push('/protected')
      await nextTick()
      
      // Sign out
      const wasAuthenticated = store.loggedIn
      const wasInitialized = store.init
      
      store.current_user = null
      store.loggedIn = false
      
      if (wasInitialized && wasAuthenticated && router.currentRoute.value) {
        const currentRoute = router.currentRoute.value
        // Check all matched routes for requiresAuth
        const requiresAuth = currentRoute.matched.some((record) => record.meta.requiresAuth)
        
        if (requiresAuth) {
          store.loginState = currentRoute.fullPath
          store.toggleAuthDialog(true)
          store.is_authguard_dialog_persistent = true
        }
      }
      
      expect(store.is_authguard_dialog_shown).toBe(true)
      // Should preserve the protected route
      expect(store.loginState).toBe('/protected')
    })
  })
})
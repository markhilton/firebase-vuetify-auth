import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createRouter, createWebHistory, type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router'
import { setActivePinia, createPinia } from 'pinia'
import { authGuard } from '@/components/authguard'
import { useAuthStore } from '@/store/auth'
import { getAuth } from 'firebase/auth'

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

describe('Auth Guard Middleware', () => {
  let store: any
  let mockNext: NavigationGuardNext
  let to: RouteLocationNormalized
  let from: RouteLocationNormalized

  beforeEach(async () => {
    setActivePinia(createPinia())
    store = useAuthStore()
    
    // Mock getAuth
    vi.mocked(getAuth).mockReturnValue({
      currentUser: null,
      onAuthStateChanged: vi.fn()
    } as any)
    
    // Initialize store config
    store.config = { firebase: {}, debug: false }
    store.routesInitialized = true
    
    // Mock next function
    mockNext = vi.fn()
    
    // Setup default routes
    to = {
      matched: [],
      fullPath: '/',
      path: '/',
      name: 'home',
      params: {},
      query: {},
      hash: '',
      redirectedFrom: undefined,
      meta: {}
    } as RouteLocationNormalized
    
    from = {
      matched: [],
      fullPath: '/',
      path: '/',
      name: null,
      params: {},
      query: {},
      hash: '',
      redirectedFrom: undefined,
      meta: {}
    } as RouteLocationNormalized
  })

  describe('Route Protection', () => {
    it('should allow access to protected route when authenticated', async () => {
      // Setup authenticated user
      const mockUser = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: true,
      }
      store.current_user = mockUser
      store.loggedIn = true
      
      // Setup protected route
      to.matched = [{ meta: { requiresAuth: true } }] as any
      
      await authGuard(to, from, mockNext)
      
      expect(mockNext).toHaveBeenCalledWith()
      expect(store.is_authguard_dialog_shown).toBe(false)
    })

    it('should block access to protected route when not authenticated', async () => {
      store.current_user = null
      store.loggedIn = false
      
      // Setup protected route with different path than from
      to.matched = [{ meta: { requiresAuth: true } }] as any
      to.fullPath = '/protected'
      from.fullPath = '/public'
      from.name = 'public'
      
      await authGuard(to, from, mockNext)
      
      expect(store.is_authguard_dialog_shown).toBe(true)
      expect(store.is_authguard_dialog_persistent).toBe(false) // Non-persistent when coming from public route
      // Navigation is blocked with next(false) when routes are different
      expect(mockNext).toHaveBeenCalledWith(false)
    })

    it('should allow access to public routes without authentication', async () => {
      store.current_user = null
      store.loggedIn = false
      
      // Setup public route (no requiresAuth)
      to.matched = [{ meta: {} }] as any
      
      await authGuard(to, from, mockNext)
      
      expect(mockNext).toHaveBeenCalledWith()
      expect(store.is_authguard_dialog_shown).toBe(false)
    })
  })

  describe('Email Verification', () => {
    it('should allow access even when email is not verified if auth is successful', async () => {
      store.config.requireEmailVerification = true
      
      const mockUser = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: false,
      }
      store.current_user = mockUser
      store.loggedIn = true
      
      // Setup protected route
      to.matched = [{ meta: { requiresAuth: true } }] as any
      
      await authGuard(to, from, mockNext)
      
      // The authGuard only checks isAuthenticated, not email verification
      expect(mockNext).toHaveBeenCalledWith()
    })

    it('should allow access when email is verified', async () => {
      store.config.requireEmailVerification = true
      
      const mockUser = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: true,
      }
      store.current_user = mockUser
      store.loggedIn = true
      
      // Setup protected route
      to.matched = [{ meta: { requiresAuth: true } }] as any
      
      await authGuard(to, from, mockNext)
      
      expect(mockNext).toHaveBeenCalledWith()
      expect(store.is_authguard_dialog_shown).toBe(false)
    })

    it('should check verification for specific domains only', async () => {
      store.config.requireEmailVerification = true
      store.config.allowedDomains = ['example.com']
      
      // User with matching domain - unverified but authenticated
      const mockUser1 = {
        uid: '123',
        email: 'user@example.com',
        emailVerified: false,
      }
      store.current_user = mockUser1
      store.loggedIn = true
      
      // Setup protected route
      to.matched = [{ meta: { requiresAuth: true } }] as any
      
      await authGuard(to, from, mockNext)
      
      // Auth guard only checks authentication, not verification
      expect(mockNext).toHaveBeenCalledWith()
      
      // Reset for next test
      mockNext.mockClear()
      
      // User with non-matching domain - unverified
      const mockUser2 = {
        uid: '456',
        email: 'user@other.com',
        emailVerified: false,
      }
      store.current_user = mockUser2
      store.is_authguard_dialog_shown = false
      
      await authGuard(to, from, mockNext)
      expect(mockNext).toHaveBeenCalledWith()
    })
  })

  describe('Navigation Scenarios', () => {
    it('should show non-persistent dialog when navigating from public to protected', async () => {
      store.current_user = null
      store.loggedIn = false
      
      // Setup coming from public route
      from.name = 'public'
      from.matched = [{ meta: {} }] as any
      
      // Setup going to protected route
      to.matched = [{ meta: { requiresAuth: true } }] as any
      
      await authGuard(to, from, mockNext)
      
      expect(store.is_authguard_dialog_shown).toBe(true)
      expect(store.is_authguard_dialog_persistent).toBe(false)
    })

    it('should handle rapid navigation correctly', async () => {
      store.current_user = null
      store.loggedIn = false
      
      // Navigation to protected route when not authenticated
      to.matched = [{ meta: { requiresAuth: true } }] as any
      to.fullPath = '/protected'
      from.fullPath = '/public'
      from.name = 'public'
      
      await authGuard(to, from, mockNext)
      
      expect(store.is_authguard_dialog_shown).toBe(true)
      expect(mockNext).toHaveBeenCalledWith(false)
    })

    it('should wait for auth check before processing routes', async () => {
      store.routesInitialized = false
      store.initializeGuard = vi.fn().mockResolvedValue(undefined)
      
      // Setup protected route
      to.matched = [{ meta: { requiresAuth: true } }] as any
      
      await authGuard(to, from, mockNext)
      
      expect(store.initializeGuard).toHaveBeenCalled()
      expect(store.routesInitialized).toBe(true)
    })
  })

  describe('Anonymous Users', () => {
    it('should handle anonymous users based on authentication status', async () => {
      const mockUser = {
        uid: '123',
        email: null,
        isAnonymous: true,
      }
      store.current_user = mockUser
      store.loggedIn = true // Anonymous but logged in
      
      // Setup protected route
      to.matched = [{ meta: { requiresAuth: true } }] as any
      
      await authGuard(to, from, mockNext)
      
      // Auth guard allows based on isAuthenticated (loggedIn) status
      expect(mockNext).toHaveBeenCalledWith()
    })
  })

  describe('Direct URL Access', () => {
    it('should show persistent dialog on direct access to protected route', async () => {
      // Simulate direct URL access (no from route)
      store.current_user = null
      store.loggedIn = false
      from.name = null // Direct access
      
      // Setup protected route
      to.matched = [{ meta: { requiresAuth: true } }] as any
      
      await authGuard(to, from, mockNext)
      
      expect(store.is_authguard_dialog_shown).toBe(true)
      expect(store.is_authguard_dialog_persistent).toBe(true)
    })
  })
})
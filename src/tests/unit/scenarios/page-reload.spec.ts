import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/store/auth'
import { authGuard } from '@/components/authguard'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { getAuth } from 'firebase/auth'

// Mock Firebase auth
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    currentUser: null,
    onAuthStateChanged: vi.fn()
  })),
  onAuthStateChanged: vi.fn()
}))

describe('Page Reload Scenarios', () => {
  let store: any
  let mockNext: NavigationGuardNext
  let to: RouteLocationNormalized
  let from: RouteLocationNormalized

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useAuthStore()
    store.config = { firebase: {}, debug: false }
    
    mockNext = vi.fn()
    
    // Setup routes
    to = {
      matched: [{ meta: { requiresAuth: true } }],
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
      fullPath: '',
      path: '',
      name: null,
      params: {},
      query: {},
      hash: '',
      redirectedFrom: undefined,
      meta: {}
    } as RouteLocationNormalized
  })

  describe('Authenticated User Page Reload', () => {
    it('should not show auth dialog on reload when user is authenticated', async () => {
      // Simulate page reload with authenticated user
      const mockUser = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: true,
      }
      
      // Mock Firebase restoring auth state
      const mockOnAuthStateChanged = vi.fn((auth, callback) => {
        // Simulate async auth state restoration
        setTimeout(() => callback(mockUser), 50)
        return vi.fn() // unsubscribe
      })
      
      vi.mocked(getAuth).mockReturnValue({
        currentUser: null, // Initially null on page load
        onAuthStateChanged: mockOnAuthStateChanged
      } as any)
      
      // Reset store to simulate fresh page load
      store.$reset()
      store.routesInitialized = false
      store.config = { firebase: {}, debug: false }
      store.initializeGuard = vi.fn().mockImplementation(async function() {
        // Simulate async auth check
        await new Promise(resolve => setTimeout(resolve, 50))
        this.current_user = mockUser
        this.loggedIn = true
        this.data = mockUser
      }.bind(store))
      
      // Call auth guard (simulating route navigation on page load)
      await authGuard(to, from, mockNext)
      
      // Should initialize and wait for auth
      expect(store.initializeGuard).toHaveBeenCalled()
      
      // After auth state is restored
      await vi.waitFor(() => {
        expect(store.current_user).toEqual(mockUser)
        expect(store.loggedIn).toBe(true)
      })
      
      // Auth dialog should NOT appear
      expect(store.is_authguard_dialog_shown).toBe(false)
      expect(mockNext).toHaveBeenCalledWith()
    })

    it('should show auth dialog on reload when user is NOT authenticated', async () => {
      // Mock Firebase with no user
      const mockOnAuthStateChanged = vi.fn((auth, callback) => {
        setTimeout(() => callback(null), 50)
        return vi.fn()
      })
      
      vi.mocked(getAuth).mockReturnValue({
        currentUser: null,
        onAuthStateChanged: mockOnAuthStateChanged
      } as any)
      
      // Reset store to simulate fresh page load
      store.$reset()
      store.routesInitialized = false
      store.config = { firebase: {}, debug: false }
      store.initializeGuard = vi.fn().mockImplementation(async function() {
        // Simulate async auth check with no user
        await new Promise(resolve => setTimeout(resolve, 50))
        this.current_user = null
        this.loggedIn = false
        this.data = null
      }.bind(store))
      
      // Direct access to protected route (no from.name)
      from.name = null
      
      await authGuard(to, from, mockNext)
      
      // Wait for auth check to complete
      await vi.waitFor(() => {
        expect(store.current_user).toBeNull()
        expect(store.loggedIn).toBe(false)
      })
      
      // Auth dialog SHOULD appear with persistence
      expect(store.is_authguard_dialog_shown).toBe(true)
      expect(store.is_authguard_dialog_persistent).toBe(true)
      // Navigation should be blocked now
      expect(mockNext).toHaveBeenCalledWith(false)
    })

    it('should load route content immediately when authenticated on reload', async () => {
      const mockUser = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: true,
      }
      
      // Setup authenticated state
      store.current_user = mockUser
      store.loggedIn = true
      store.routesInitialized = true
      
      // Simulate page reload on home route
      from.name = null // Direct access
      to.fullPath = '/'
      
      await authGuard(to, from, mockNext)
      
      // Should allow immediate access without blocking
      expect(mockNext).toHaveBeenCalledWith()
      expect(store.is_authguard_dialog_shown).toBe(false)
    })
  })

  describe('Firebase Auth State Timing', () => {
    it('should wait for Firebase auth state before making navigation decision', async () => {
      let resolveAuth: (user: any) => void
      const authPromise = new Promise((resolve) => {
        resolveAuth = resolve
      })
      
      // Mock delayed auth state
      store.initializeGuard = vi.fn(() => authPromise)
      store.routesInitialized = false
      
      // Start navigation
      const guardPromise = authGuard(to, from, mockNext)
      
      // Navigation should be pending
      expect(mockNext).not.toHaveBeenCalled()
      
      // Resolve auth state
      const mockUser = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: true,
      }
      store.current_user = mockUser
      store.loggedIn = true
      resolveAuth!(mockUser)
      
      await guardPromise
      
      // Now navigation should proceed
      expect(mockNext).toHaveBeenCalledWith()
      expect(store.is_authguard_dialog_shown).toBe(false)
    })

    it('should handle Firebase auth state restoration race conditions', async () => {
      // Multiple rapid auth state changes during initialization
      const mockOnAuthStateChanged = vi.fn((auth, callback) => {
        // Simulate multiple auth state changes
        setTimeout(() => callback(null), 10)
        setTimeout(() => callback({ uid: '123' }), 20)
        setTimeout(() => callback(null), 30)
        setTimeout(() => callback({ uid: '123', email: 'test@example.com' }), 40)
        return vi.fn()
      })
      
      vi.mocked(getAuth).mockReturnValue({
        currentUser: null,
        onAuthStateChanged: mockOnAuthStateChanged
      } as any)
      
      store.$reset()
      store.routesInitialized = false
      store.config = { firebase: {}, debug: false }
      store.initializeGuard = vi.fn().mockImplementation(async function() {
        // Just set initialized without changing user state
        await new Promise(resolve => setTimeout(resolve, 10))
      }.bind(store))
      
      await authGuard(to, from, mockNext)
      
      // Should handle the first auth state and unsubscribe
      await vi.waitFor(() => {
        expect(store.routesInitialized).toBe(true)
      })
      
      // The guard should have made a decision based on first auth state
      expect(mockNext).toHaveBeenCalled()
    })
  })

  describe('Initial Page Load vs Navigation', () => {
    it('should detect initial page load (from.name is null)', async () => {
      store.current_user = null
      store.loggedIn = false
      store.routesInitialized = true
      
      // Initial page load
      from.name = null
      
      await authGuard(to, from, mockNext)
      
      // Should show persistent dialog on direct access
      expect(store.is_authguard_dialog_persistent).toBe(true)
      expect(store.is_authguard_dialog_shown).toBe(true)
      // Navigation should always be blocked when not authenticated
      expect(mockNext).toHaveBeenCalledWith(false)
    })

    it('should detect navigation from another route', async () => {
      store.current_user = null
      store.loggedIn = false
      store.routesInitialized = true
      
      // Navigation from public route
      from.name = 'public'
      from.matched = [{ meta: {} }] as any
      
      await authGuard(to, from, mockNext)
      
      // Should show non-persistent dialog on navigation
      expect(store.is_authguard_dialog_persistent).toBe(false)
      expect(mockNext).toHaveBeenCalledWith(false)
    })

    it('should handle same route navigation after sign out', async () => {
      store.current_user = null
      store.loggedIn = false
      store.routesInitialized = true
      
      // Same route navigation (after sign out)
      to.fullPath = '/protected'
      from.fullPath = '/protected'
      
      await authGuard(to, from, mockNext)
      
      // Should block navigation even to same route when not authenticated
      expect(store.is_authguard_dialog_shown).toBe(true)
      expect(mockNext).toHaveBeenCalledWith(false)
    })
  })
})
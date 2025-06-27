import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/store/auth'
import { 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  FacebookAuthProvider,
  SAMLAuthProvider
} from 'firebase/auth'
import type { UserCredential } from 'firebase/auth'

// Mock Firebase auth
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    onAuthStateChanged: vi.fn((callback) => {
      // Create a proper unsubscribe function first
      const unsubscribe = vi.fn()
      // Then call the callback asynchronously to avoid initialization issues
      setTimeout(() => callback(null), 0)
      // Return unsubscribe function
      return unsubscribe
    })
  })),
  signInWithPopup: vi.fn(),
  signInWithRedirect: vi.fn(),
  getRedirectResult: vi.fn(),
  GoogleAuthProvider: vi.fn(() => ({ 
    providerId: 'google.com',
    setCustomParameters: vi.fn()
  })),
  FacebookAuthProvider: vi.fn(() => ({ providerId: 'facebook.com' })),
  SAMLAuthProvider: vi.fn(() => ({ providerId: 'saml' }))
}))

// Mock window object for mobile detection
const mockWindow = {
  navigator: {
    userAgent: 'Mozilla/5.0',
    maxTouchPoints: 0
  },
  innerWidth: 1024,
  ontouchstart: undefined
}

Object.defineProperty(global, 'window', {
  value: mockWindow,
  writable: true
})

// Helper to fully reset window state
function resetWindow() {
  mockWindow.navigator.userAgent = 'Mozilla/5.0'
  mockWindow.navigator.maxTouchPoints = 0
  mockWindow.innerWidth = 1024
  delete mockWindow.ontouchstart
}

describe('Authentication Method Configuration', () => {
  let store: any

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useAuthStore()
    
    // Initialize store config
    store.config = {
      firebase: {},
      debug: false,
      authMethod: 'auto',
      authMethodFallback: undefined
    }
    
    // Initialize store state
    store.current_user = null
    store.loggedIn = false
    store.data = null
    store.is_loading = false
    store.is_authguard_dialog_shown = false
    
    // Reset mocks
    vi.clearAllMocks()
    
    // Reset window properties
    resetWindow()
  })

  describe('Device Detection', () => {
    it('should detect desktop device', () => {
      expect(store._isMobileDevice()).toBe(false)
    })

    it('should detect mobile device by user agent', () => {
      mockWindow.navigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)'
      expect(store._isMobileDevice()).toBe(true)
    })

    it('should detect mobile device by touch and screen size', () => {
      // Simulate touch support
      mockWindow.ontouchstart = null // Adding ontouchstart property indicates touch support
      mockWindow.navigator.maxTouchPoints = 5
      mockWindow.innerWidth = 600
      expect(store._isMobileDevice()).toBe(true)
    })

    it('should not detect mobile with touch but large screen', () => {
      mockWindow.navigator.maxTouchPoints = 5
      mockWindow.innerWidth = 1200
      expect(store._isMobileDevice()).toBe(false)
    })
  })

  describe('Auth Method Selection', () => {
    it('should use popup for desktop in auto mode', () => {
      store.config.authMethod = 'auto'
      expect(store._getAuthMethod()).toBe('popup')
    })

    it('should use redirect for mobile in auto mode', () => {
      store.config.authMethod = 'auto'
      mockWindow.navigator.userAgent = 'Mozilla/5.0 (Android; Mobile)'
      expect(store._getAuthMethod()).toBe('redirect')
    })

    it('should respect explicit popup setting', () => {
      store.config.authMethod = 'popup'
      mockWindow.navigator.userAgent = 'Mozilla/5.0 (Android; Mobile)'
      expect(store._getAuthMethod()).toBe('popup')
    })

    it('should respect explicit redirect setting', () => {
      store.config.authMethod = 'redirect'
      expect(store._getAuthMethod()).toBe('redirect')
    })
  })

  describe('OAuth Provider Authentication', () => {
    it('should use popup method for Google auth on desktop', async () => {
      store.config.authMethod = 'auto'
      const mockUser = { uid: '123', email: 'test@example.com' }
      const mockResult: Partial<UserCredential> = { user: mockUser as any }
      
      vi.mocked(signInWithPopup).mockResolvedValueOnce(mockResult as UserCredential)
      
      await store.loginWithGoogle()
      
      expect(signInWithPopup).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({ providerId: 'google.com' })
      )
      expect(signInWithRedirect).not.toHaveBeenCalled()
    })

    it('should use redirect method for Facebook auth on mobile', async () => {
      store.config.authMethod = 'auto'
      mockWindow.navigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)'
      
      vi.mocked(signInWithRedirect).mockResolvedValueOnce(undefined)
      
      await store.loginWithFacebook()
      
      expect(signInWithRedirect).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({ providerId: 'facebook.com' })
      )
      expect(signInWithPopup).not.toHaveBeenCalled()
    })

    it('should use configured method regardless of device', async () => {
      store.config.authMethod = 'redirect'
      const mockUser = { uid: '123', email: 'test@example.com' }
      
      vi.mocked(signInWithRedirect).mockResolvedValueOnce(undefined)
      
      await store.loginWithGoogle()
      
      expect(signInWithRedirect).toHaveBeenCalled()
      expect(signInWithPopup).not.toHaveBeenCalled()
    })
  })

  describe('Fallback Behavior', () => {
    it('should fallback to redirect when popup is blocked', async () => {
      store.config.authMethod = 'popup'
      store.config.authMethodFallback = 'redirect'
      
      // First call to popup fails with popup-blocked error
      vi.mocked(signInWithPopup).mockRejectedValueOnce({ code: 'auth/popup-blocked' })
      // Fallback to redirect succeeds
      vi.mocked(signInWithRedirect).mockResolvedValueOnce(undefined)
      
      await store.loginWithGoogle()
      
      expect(signInWithPopup).toHaveBeenCalledTimes(1)
      expect(signInWithRedirect).toHaveBeenCalledTimes(1)
    })

    it('should fallback to popup when redirect fails', async () => {
      store.config.authMethod = 'redirect'
      store.config.authMethodFallback = 'popup'
      
      const mockUser = { uid: '123', email: 'test@example.com' }
      const mockResult: Partial<UserCredential> = { user: mockUser as any }
      
      // First call to redirect fails
      vi.mocked(signInWithRedirect).mockRejectedValueOnce({ code: 'auth/popup-blocked' })
      // Fallback to popup succeeds
      vi.mocked(signInWithPopup).mockResolvedValueOnce(mockResult as UserCredential)
      
      await store.loginWithFacebook()
      
      expect(signInWithRedirect).toHaveBeenCalledTimes(1)
      expect(signInWithPopup).toHaveBeenCalledTimes(1)
    })

    it('should not fallback when fallback is null', async () => {
      store.config.authMethod = 'popup'
      store.config.authMethodFallback = null
      
      const error = { code: 'auth/network-request-failed', message: 'Network error' }
      vi.mocked(signInWithPopup).mockRejectedValueOnce(error)
      
      // The loginWithGoogle method should reject with the error
      await expect(store.loginWithGoogle()).rejects.toEqual(error)
      
      expect(signInWithPopup).toHaveBeenCalledTimes(1)
      expect(signInWithRedirect).not.toHaveBeenCalled()
      expect(store.error).toEqual(error)
    })

    it('should use default fallback when not specified', async () => {
      store.config.authMethod = 'popup'
      // authMethodFallback is undefined, should default to 'redirect'
      
      vi.mocked(signInWithPopup).mockRejectedValueOnce({ code: 'auth/popup-blocked' })
      vi.mocked(signInWithRedirect).mockResolvedValueOnce(undefined)
      
      await store.loginWithGoogle()
      
      expect(signInWithRedirect).toHaveBeenCalled()
    })
  })

  describe('Redirect Result Handling', () => {
    it('should call getRedirectResult on initialization', async () => {
      vi.mocked(getRedirectResult).mockResolvedValueOnce(null)
      
      await store.initializeGuard()
      
      expect(getRedirectResult).toHaveBeenCalledWith(expect.any(Object))
    })

    it('should handle no redirect result', async () => {
      vi.mocked(getRedirectResult).mockResolvedValueOnce(null)
      
      await store.initializeGuard()
      
      expect(getRedirectResult).toHaveBeenCalled()
      // User state should not change from null redirect result
      expect(store.current_user).toBeNull()
    })

    it('should handle redirect result error', async () => {
      const error = new Error('Redirect failed')
      vi.mocked(getRedirectResult).mockRejectedValueOnce(error)
      
      await store.initializeGuard()
      
      expect(getRedirectResult).toHaveBeenCalled()
      expect(store.error).toBe(error)
      expect(store.is_loading).toBe(false)
    })
  })

  describe('SAML Authentication', () => {
    it('should configure SAML provider correctly', async () => {
      store.config.authMethod = 'popup'
      store.config.saml_provider_id = 'saml.okta'
      
      const mockUser = { uid: '123', email: 'test@example.com' }
      const mockResult: Partial<UserCredential> = { user: mockUser as any }
      
      vi.mocked(signInWithPopup).mockResolvedValueOnce(mockResult as UserCredential)
      
      await store.loginWithSaml()
      
      expect(SAMLAuthProvider).toHaveBeenCalledWith('saml.okta')
      expect(signInWithPopup).toHaveBeenCalled()
    })
  })

  describe('Debug Logging', () => {
    it('should log auth method when debug is enabled', async () => {
      store.config.debug = true
      store.config.authMethod = 'popup'
      
      const consoleSpy = vi.spyOn(console, 'log')
      const mockUser = { uid: '123', email: 'test@example.com' }
      const mockResult: Partial<UserCredential> = { user: mockUser as any }
      
      vi.mocked(signInWithPopup).mockResolvedValueOnce(mockResult as UserCredential)
      
      await store.loginWithGoogle()
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Trying popup method for Google authentication')
      )
    })

    it('should log fallback attempt when debug is enabled', async () => {
      store.config.debug = true
      store.config.authMethod = 'popup'
      store.config.authMethodFallback = 'redirect'
      
      const consoleSpy = vi.spyOn(console, 'log')
      
      vi.mocked(signInWithPopup).mockRejectedValueOnce({ code: 'auth/popup-blocked' })
      vi.mocked(signInWithRedirect).mockResolvedValueOnce(undefined)
      
      await store.loginWithGoogle()
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Trying fallback redirect method for Google')
      )
    })
  })
})
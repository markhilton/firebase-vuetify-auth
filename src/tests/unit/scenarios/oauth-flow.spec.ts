import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/store/auth'
import type { User } from 'firebase/auth'
import { 
  getAuth, 
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult,
  GoogleAuthProvider,
  FacebookAuthProvider
} from 'firebase/auth'

// Mock Firebase auth
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    currentUser: null,
    onAuthStateChanged: vi.fn()
  })),
  signInWithPopup: vi.fn(),
  signInWithRedirect: vi.fn(),
  getRedirectResult: vi.fn(),
  GoogleAuthProvider: vi.fn(() => ({ 
    providerId: 'google.com',
    setCustomParameters: vi.fn()
  })),
  FacebookAuthProvider: vi.fn(() => ({ 
    providerId: 'facebook.com',
    setCustomParameters: vi.fn()
  })),
  onAuthStateChanged: vi.fn()
}))

describe('OAuth Provider Flow', () => {
  let store: any
  let consoleErrorSpy: any

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useAuthStore()
    store.config = { 
      firebase: {}, 
      debug: true,
      google: true,
      facebook: true
    }
    
    // Spy on console.error to check error handling
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.clearAllMocks()
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  describe('Google OAuth Popup Flow', () => {
    it('should handle successful Google OAuth popup authentication', async () => {
      const mockUser: Partial<User> = {
        uid: '123',
        email: 'user@gmail.com',
        emailVerified: true,
        displayName: 'Test User',
        photoURL: 'https://example.com/photo.jpg',
        providerData: [{
          providerId: 'google.com',
          email: 'user@gmail.com'
        }]
      }
      
      const mockCredential = {
        user: mockUser,
        providerId: 'google.com',
        operationType: 'signIn'
      }
      
      vi.mocked(signInWithPopup).mockResolvedValue(mockCredential as any)
      
      // Trigger Google login
      await store.loginWithGoogle()
      
      expect(signInWithPopup).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          providerId: 'google.com'
        })
      )
      
      // Store should update with user data
      expect(store.data).toEqual(mockUser)
      expect(store.is_loading).toBe(false)
    })

    it('should handle Google OAuth popup blocked scenarios', async () => {
      const popupBlockedError = new Error('Popup blocked')
      popupBlockedError.code = 'auth/popup-blocked'
      
      vi.mocked(signInWithPopup).mockRejectedValue(popupBlockedError)
      
      await expect(store.loginWithGoogle()).rejects.toThrow(popupBlockedError)
      
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[ auth guard ]: Google popup auth failed:',
        popupBlockedError
      )
      expect(store.is_loading).toBe(false)
    })

    it('should handle Cross-Origin-Opener-Policy warnings gracefully', async () => {
      // Simulate COOP warning scenario
      const mockUser: Partial<User> = {
        uid: '123',
        email: 'user@gmail.com',
        emailVerified: true
      }
      
      const mockCredential = {
        user: mockUser,
        providerId: 'google.com',
        operationType: 'signIn'
      }
      
      // Mock console warning
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      
      vi.mocked(signInWithPopup).mockImplementation(async () => {
        // Simulate COOP warning
        console.warn('Cross-Origin-Opener-Policy policy would block the window.closed call.')
        return mockCredential as any
      })
      
      await store.loginWithGoogle()
      
      // Should still complete authentication despite warning
      expect(store.data).toEqual(mockUser)
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Cross-Origin-Opener-Policy')
      )
      
      consoleWarnSpy.mockRestore()
    })
  })

  describe('OAuth Redirect Flow (Legacy)', () => {
    it('should handle redirect result on page load', async () => {
      const mockUser: Partial<User> = {
        uid: '123',
        email: 'user@gmail.com',
        emailVerified: true,
        providerData: [{
          providerId: 'google.com',
          email: 'user@gmail.com'
        }]
      }
      
      const mockRedirectResult = {
        user: mockUser,
        providerId: 'google.com',
        operationType: 'signIn'
      }
      
      vi.mocked(getRedirectResult).mockResolvedValue(mockRedirectResult as any)
      
      // Simulate checking for redirect result
      const auth = getAuth()
      const result = await getRedirectResult(auth)
      
      expect(result).toEqual(mockRedirectResult)
      expect(result?.user).toEqual(mockUser)
    })

    it('should handle null redirect result', async () => {
      vi.mocked(getRedirectResult).mockResolvedValue(null)
      
      const auth = getAuth()
      const result = await getRedirectResult(auth)
      
      expect(result).toBeNull()
    })

    it('should handle TrustedScriptURL CSP errors', async () => {
      const cspError = new Error("This document requires 'TrustedScriptURL' assignment")
      cspError.name = 'SecurityError'
      
      vi.mocked(signInWithRedirect).mockRejectedValue(cspError)
      
      // If using redirect method (before switching to popup)
      try {
        await signInWithRedirect(getAuth(), new GoogleAuthProvider())
      } catch (error) {
        expect(error).toEqual(cspError)
        expect(error.message).toContain('TrustedScriptURL')
      }
    })
  })

  describe('Facebook OAuth Flow', () => {
    it('should handle successful Facebook authentication', async () => {
      const mockUser: Partial<User> = {
        uid: '456',
        email: 'user@facebook.com',
        emailVerified: true,
        displayName: 'Facebook User',
        providerData: [{
          providerId: 'facebook.com',
          email: 'user@facebook.com'
        }]
      }
      
      const mockCredential = {
        user: mockUser,
        providerId: 'facebook.com',
        operationType: 'signIn'
      }
      
      vi.mocked(signInWithPopup).mockResolvedValue(mockCredential as any)
      
      await store.loginWithFacebook()
      
      expect(signInWithPopup).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({ providerId: 'facebook.com' })
      )
      expect(store.data).toEqual(mockUser)
    })
  })

  describe('OAuth Error Handling', () => {
    it('should handle network errors during OAuth', async () => {
      const networkError = new Error('Network error')
      networkError.code = 'auth/network-request-failed'
      
      vi.mocked(signInWithPopup).mockRejectedValue(networkError)
      
      await expect(store.loginWithGoogle()).rejects.toThrow(networkError)
      
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[ auth guard ]: Google popup auth failed:',
        networkError
      )
      expect(store.is_loading).toBe(false)
    })

    it('should handle user cancellation', async () => {
      const cancelError = new Error('User cancelled')
      cancelError.code = 'auth/user-cancelled'
      
      vi.mocked(signInWithPopup).mockRejectedValue(cancelError)
      
      await expect(store.loginWithGoogle()).rejects.toThrow(cancelError)
      
      expect(store.is_loading).toBe(false)
      // User cancellation might not log as error
    })

    it('should handle account exists with different credential', async () => {
      const accountExistsError = new Error('Account exists')
      accountExistsError.code = 'auth/account-exists-with-different-credential'
      
      vi.mocked(signInWithPopup).mockRejectedValue(accountExistsError)
      
      await expect(store.loginWithGoogle()).rejects.toThrow(accountExistsError)
      
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[ auth guard ]: Google popup auth failed:',
        accountExistsError
      )
    })
  })

  describe('OAuth State Management', () => {
    it('should set loading state during OAuth process', async () => {
      // Mock a delayed response
      const mockUser = { uid: '123', email: 'test@gmail.com' }
      const mockCredential = { user: mockUser }
      
      let resolveAuth: (value: any) => void
      const authPromise = new Promise((resolve) => {
        resolveAuth = resolve
      })
      
      vi.mocked(signInWithPopup).mockReturnValue(authPromise as any)
      
      // Start OAuth (but don't await yet)
      const loginPromise = store.loginWithGoogle()
      
      // Check loading state synchronously after starting
      await vi.waitFor(() => {
        expect(store.is_loading).toBe(true)
      }, { timeout: 100 })
      
      // Resolve auth
      resolveAuth!(mockCredential)
      
      await loginPromise
      
      // Should no longer be loading
      expect(store.is_loading).toBe(false)
    })

    it('should close auth dialog on successful OAuth', async () => {
      store.is_authguard_dialog_shown = true
      
      const mockUser = { uid: '123', email: 'test@gmail.com' }
      vi.mocked(signInWithPopup).mockResolvedValue({ user: mockUser } as any)
      
      await store.loginWithGoogle()
      
      expect(store.is_authguard_dialog_shown).toBe(false)
    })
  })
})
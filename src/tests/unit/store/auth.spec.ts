import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/store/auth'
import type { User } from 'firebase/auth'
import { getAuth } from 'firebase/auth'

// Mock Firebase before importing anything that uses it
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    currentUser: null,
    onAuthStateChanged: vi.fn()
  })),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn(),
  setPersistence: vi.fn(),
  browserLocalPersistence: {},
  browserSessionPersistence: {},
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  sendEmailVerification: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
  updateProfile: vi.fn(),
  GoogleAuthProvider: vi.fn(),
  FacebookAuthProvider: vi.fn(),
  SAMLAuthProvider: vi.fn(),
  signInWithPopup: vi.fn(),
  signInWithPhoneNumber: vi.fn(),
  RecaptchaVerifier: vi.fn(),
  getRedirectResult: vi.fn()
}))

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('State Management', () => {
    it('should initialize with default state', () => {
      const store = useAuthStore()
      
      // Check direct state values
      expect(store.current_user).toBeNull()
      expect(store.loggedIn).toBe(false)
      expect(store.init).toBe(false)
      expect(store.is_authguard_dialog_shown).toBe(false)
      expect(store.is_authguard_dialog_persistent).toBe(false)
      expect(store.is_loading).toBe(false)
      expect(store.is_session_persistant).toBe(true)
      
      // Check computed getters
      expect(store.isAuthenticated).toBe(false)
    })

    it('should update user state when setting user', () => {
      const store = useAuthStore()
      const mockUser = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: true,
      }
      
      // Simulate user login
      store.current_user = mockUser
      store.loggedIn = true
      store.data = mockUser
      
      expect(store.current_user).toEqual(mockUser)
      expect(store.loggedIn).toBe(true)
      expect(store.isAuthenticated).toBe(true)
    })

    it('should handle unverified email correctly', () => {
      const store = useAuthStore()
      const mockUser = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: false,
      }
      
      store.current_user = mockUser
      store.loggedIn = true
      
      expect(store.current_user.emailVerified).toBe(false)
    })

    it('should handle anonymous users correctly', () => {
      const store = useAuthStore()
      const mockUser = {
        uid: '123',
        email: null,
        isAnonymous: true,
        emailVerified: false,
      }
      
      store.current_user = mockUser
      store.loggedIn = true
      
      expect(store.loggedIn).toBe(true)
      expect(store.current_user.email).toBeNull()
      expect(store.current_user.isAnonymous).toBe(true)
    })
  })

  describe('Auth Dialog Management', () => {
    it('should show auth dialog with persistence', () => {
      const store = useAuthStore()
      
      store.is_authguard_dialog_persistent = true
      store.toggleAuthDialog(true)
      
      expect(store.is_authguard_dialog_shown).toBe(true)
      expect(store.is_authguard_dialog_persistent).toBe(true)
    })

    it('should show auth dialog without persistence', () => {
      const store = useAuthStore()
      
      store.is_authguard_dialog_persistent = false
      store.toggleAuthDialog(true)
      
      expect(store.is_authguard_dialog_shown).toBe(true)
      expect(store.is_authguard_dialog_persistent).toBe(false)
    })

    it('should hide auth dialog', () => {
      const store = useAuthStore()
      store.is_authguard_dialog_shown = true
      store.is_authguard_dialog_persistent = true
      
      store.toggleAuthDialog(false)
      
      expect(store.is_authguard_dialog_shown).toBe(false)
    })
  })

  describe('Sign Out', () => {
    it('should clear user state on sign out', async () => {
      const store = useAuthStore()
      // Set config for signOut
      store.config = { firebase: {}, debug: false }
      
      const mockUser = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: true,
      }
      
      // Set initial authenticated state
      store.current_user = mockUser
      store.loggedIn = true
      expect(store.isAuthenticated).toBe(true)
      
      // Sign out
      await store.signOut()
      
      expect(store.current_user).toBeNull()
      // Note: The signOut action doesn't update loggedIn directly
      // It relies on onAuthStateChanged which is mocked
    })
  })

  describe('Email Verification Required', () => {
    it('should check email verification for all users when verification is true', () => {
      const store = useAuthStore()
      store.config = { requireEmailVerification: true, firebase: {}, debug: false }
      
      const mockUser = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: false,
      }
      
      store.current_user = mockUser
      store.loggedIn = true
      
      expect(store.requiresEmailVerification).toBe(true)
    })

    it('should not require verification when verification is false', () => {
      const store = useAuthStore()
      store.config = { requireEmailVerification: false, firebase: {}, debug: false }
      
      const mockUser = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: false,
      }
      
      store.current_user = mockUser
      store.loggedIn = true
      
      expect(store.requiresEmailVerification).toBe(false)
    })

    it('should check email verification for specific domains', () => {
      const store = useAuthStore()
      store.config = { requireEmailVerification: true, allowedDomains: ['example.com', 'test.com'], firebase: {}, debug: false }
      
      // User with matching domain
      const mockUser1 = {
        uid: '123',
        email: 'user@example.com',
        emailVerified: false,
      }
      
      store.current_user = mockUser1
      store.loggedIn = true
      expect(store.requiresEmailVerification).toBe(true)
      
      // User with non-matching domain
      const mockUser2 = {
        uid: '456',
        email: 'user@other.com',
        emailVerified: false,
      }
      
      store.current_user = mockUser2
      expect(store.requiresEmailVerification).toBe(false)
    })

    it('should not require verification for verified emails', () => {
      const store = useAuthStore()
      store.config = { requireEmailVerification: true, firebase: {}, debug: false }
      
      const mockUser = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: true,
      }
      
      store.current_user = mockUser
      store.loggedIn = true
      
      expect(store.requiresEmailVerification).toBe(false)
    })
  })

  describe('Settings', () => {
    it('should update config settings', () => {
      const store = useAuthStore()
      const newConfig = {
        firebase: {},
        providers: ['google', 'facebook'],
        verification: ['domain.com'],
        logo: 'https://example.com/logo.png',
        tosUrl: 'https://example.com/tos',
        privacyPolicyUrl: 'https://example.com/privacy',
        debug: false
      }
      
      store.config = newConfig
      
      expect(store.config.providers).toEqual(['google', 'facebook'])
      expect(store.config.verification).toEqual(['domain.com'])
      expect(store.config.logo).toBe('https://example.com/logo.png')
      expect(store.config.tosUrl).toBe('https://example.com/tos')
      expect(store.config.privacyPolicyUrl).toBe('https://example.com/privacy')
    })
  })
})
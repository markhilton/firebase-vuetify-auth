import { vi } from 'vitest'
import { config } from '@vue/test-utils'

// Mock CSS imports
vi.mock('*.css', () => ({}))
vi.mock('*.scss', () => ({}))
vi.mock('*.sass', () => ({}))

// Mock Firebase Auth
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => mockAuth),
  onAuthStateChanged: vi.fn((auth, callback) => {
    // Call the callback immediately with null (not authenticated)
    callback(null)
    // Return unsubscribe function
    return vi.fn()
  }),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
  sendEmailVerification: vi.fn(),
  signInWithPopup: vi.fn(),
  signInWithPhoneNumber: vi.fn(),
  GoogleAuthProvider: vi.fn(),
  FacebookAuthProvider: vi.fn(),
  GithubAuthProvider: vi.fn(),
  TwitterAuthProvider: vi.fn(),
  RecaptchaVerifier: vi.fn(),
}))

// Mock Firebase App
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(),
  getApps: vi.fn(() => []),
  getApp: vi.fn(),
}))

// Mock auth instance
export const mockAuth = {
  currentUser: null,
  onAuthStateChanged: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
}

// Global test utilities
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock visualViewport
global.visualViewport = {
  width: 1024,
  height: 768,
  scale: 1,
  offsetLeft: 0,
  offsetTop: 0,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}
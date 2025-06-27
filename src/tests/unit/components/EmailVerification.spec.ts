import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import { createPinia, setActivePinia } from 'pinia'
import EmailVerification from '@/components/EmailVerification.vue'
import { useAuthStore } from '@/store/auth'
import { sendEmailVerification } from 'firebase/auth'
import type { User } from 'firebase/auth'

const vuetify = createVuetify()

vi.mock('firebase/auth')

describe('EmailVerification Component', () => {
  let store: any

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useAuthStore()
    
    // Spy on store methods
    store.signOut = vi.fn()
    store.hideAuthDialog = vi.fn()
    store.sendVerificationEmail = vi.fn()
    
    vi.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('should render verification message', () => {
      const mockUser: Partial<User> = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: false,
      }
      store.current_user = mockUser
      store.data = mockUser as User
      store.loggedIn = true
      
      const wrapper = mount(EmailVerification, {
        global: {
          plugins: [vuetify]
        }
      })
      
      expect(wrapper.text()).toContain('Verification Required')
      expect(wrapper.text()).toContain('Please check your email')
    })

    it('should show resend button', () => {
      const mockUser: Partial<User> = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: false,
      }
      store.current_user = mockUser
      store.data = mockUser as User
      store.loggedIn = true
      
      const wrapper = mount(EmailVerification, {
        global: {
          plugins: [vuetify]
        }
      })
      
      const sendButton = wrapper.find('button')
      expect(sendButton.exists()).toBe(true)
      expect(sendButton.text()).toContain('Send Verification Email')
    })

    it('should show sign out button', () => {
      const mockUser: Partial<User> = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: false,
      }
      store.current_user = mockUser
      store.data = mockUser as User
      store.loggedIn = true
      
      const wrapper = mount(EmailVerification, {
        global: {
          plugins: [vuetify]
        }
      })
      
      const buttons = wrapper.findAll('button')
      const signOutButton = buttons.find(b => b.text().includes('Sign Out'))
      expect(signOutButton?.exists()).toBe(true)
    })
  })

  describe('Email Verification', () => {
    it('should send verification email', async () => {
      const mockSendVerification = vi.mocked(sendEmailVerification)
      mockSendVerification.mockResolvedValueOnce(undefined)
      
      const mockUser: Partial<User> = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: false,
      }
      store.current_user = mockUser
      store.data = mockUser as User
      store.loggedIn = true
      
      const wrapper = mount(EmailVerification, {
        global: {
          plugins: [vuetify]
        }
      })
      
      const sendButton = wrapper.find('button')
      await sendButton.trigger('click')
      
      expect(store.sendVerificationEmail).toHaveBeenCalled()
    })

    it('should handle verification email errors', async () => {
      store.sendVerificationEmail = vi.fn().mockRejectedValueOnce(new Error('Failed to send email'))
      
      const mockUser: Partial<User> = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: false,
      }
      store.current_user = mockUser
      store.data = mockUser as User
      store.loggedIn = true
      store.error = { message: 'Failed to send email', code: 'error' }
      
      const wrapper = mount(EmailVerification, {
        global: {
          plugins: [vuetify]
        }
      })
      
      expect(wrapper.find('.v-alert').exists()).toBe(true)
      expect(wrapper.text()).toContain('Failed to send email')
    })

    it('should call sendVerificationEmail when button is clicked', async () => {
      store.sendVerificationEmail = vi.fn()
      
      const mockUser: Partial<User> = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: false,
      }
      store.current_user = mockUser
      store.data = mockUser as User
      store.loggedIn = true
      store.is_loading = false
      
      const wrapper = mount(EmailVerification, {
        global: {
          plugins: [vuetify]
        }
      })
      
      const resendButton = wrapper.find('button')
      await resendButton.trigger('click')
      
      // Should call the store method
      expect(store.sendVerificationEmail).toHaveBeenCalled()
    })
  })

  describe('User Actions', () => {
    it('should sign out user', async () => {
      const mockUser: Partial<User> = {
        uid: '123',
        email: 'test@example.com',
        emailVerified: false,
      }
      store.current_user = mockUser
      store.data = mockUser as User
      store.loggedIn = true
      
      const wrapper = mount(EmailVerification, {
        global: {
          plugins: [vuetify]
        }
      })
      
      const buttons = wrapper.findAll('button')
      const signOutButton = buttons.find(b => b.text().includes('Sign Out'))
      await signOutButton?.trigger('click')
      
      expect(store.signOut).toHaveBeenCalled()
    })
  })

})
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import { createPinia, setActivePinia } from 'pinia'
import LoginWithProvider from '@/components/LoginWithProvider.vue'
import { useAuthStore } from '@/store/auth'
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  SAMLAuthProvider
} from 'firebase/auth'

const vuetify = createVuetify()

vi.mock('firebase/auth')

describe('LoginWithProvider Component', () => {
  let store: any

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useAuthStore()
    vi.clearAllMocks()
  })

  describe('Provider Buttons Rendering', () => {
    it('should render Google provider button', () => {
      store.settings.providers = ['google']
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      expect(wrapper.find('[data-testid="provider-google"]').exists()).toBe(true)
      expect(wrapper.text()).toContain('Continue with Google')
    })

    it('should render multiple provider buttons', () => {
      store.settings.providers = ['google', 'facebook', 'github']
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      expect(wrapper.find('[data-testid="provider-google"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="provider-facebook"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="provider-github"]').exists()).toBe(true)
    })

    it('should not render disabled providers', () => {
      store.settings.providers = ['google']
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      expect(wrapper.find('[data-testid="provider-facebook"]').exists()).toBe(false)
    })

    it('should render phone auth when enabled', () => {
      store.settings.providers = ['phone']
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      expect(wrapper.findComponent({ name: 'LoginWithPhone' }).exists()).toBe(true)
    })
  })

  describe('Provider Authentication', () => {
    it('should authenticate with Google', async () => {
      const mockSignInWithPopup = vi.mocked(signInWithPopup)
      mockSignInWithPopup.mockResolvedValueOnce({
        user: {
          uid: '123',
          email: 'user@gmail.com',
          emailVerified: true
        }
      } as any)
      
      store.settings.providers = ['google']
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      await wrapper.find('[data-testid="provider-google"]').trigger('click')
      
      expect(GoogleAuthProvider).toHaveBeenCalled()
      expect(mockSignInWithPopup).toHaveBeenCalled()
    })

    it('should authenticate with Facebook', async () => {
      const mockSignInWithPopup = vi.mocked(signInWithPopup)
      mockSignInWithPopup.mockResolvedValueOnce({
        user: {
          uid: '123',
          email: 'user@facebook.com',
          emailVerified: true
        }
      } as any)
      
      store.settings.providers = ['facebook']
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      await wrapper.find('[data-testid="provider-facebook"]').trigger('click')
      
      expect(FacebookAuthProvider).toHaveBeenCalled()
      expect(mockSignInWithPopup).toHaveBeenCalled()
    })

    it('should handle authentication errors', async () => {
      const mockSignInWithPopup = vi.mocked(signInWithPopup)
      mockSignInWithPopup.mockRejectedValueOnce(new Error('Popup blocked'))
      
      store.settings.providers = ['google']
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      await wrapper.find('[data-testid="provider-google"]').trigger('click')
      
      await wrapper.vm.$nextTick()
      
      // Check for error handling (component should emit error or show error state)
      expect(wrapper.emitted('error')).toBeTruthy()
    })

    it('should handle popup cancellation', async () => {
      const mockSignInWithPopup = vi.mocked(signInWithPopup)
      mockSignInWithPopup.mockRejectedValueOnce({ code: 'auth/popup-closed-by-user' })
      
      store.settings.providers = ['google']
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      await wrapper.find('[data-testid="provider-google"]').trigger('click')
      
      // Should not emit error for user cancellation
      expect(wrapper.emitted('error')).toBeFalsy()
    })
  })

  describe('Loading States', () => {
    it('should show loading state during authentication', async () => {
      const mockSignInWithPopup = vi.mocked(signInWithPopup)
      mockSignInWithPopup.mockImplementationOnce(() => new Promise(() => {})) // Never resolves
      
      store.settings.providers = ['google']
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      const button = wrapper.find('[data-testid="provider-google"]')
      await button.trigger('click')
      
      expect(button.classes()).toContain('v-btn--loading')
    })
  })

  describe('SAML Authentication', () => {
    it('should handle SAML provider when configured', async () => {
      const mockSignInWithPopup = vi.mocked(signInWithPopup)
      mockSignInWithPopup.mockResolvedValueOnce({
        user: {
          uid: '123',
          email: 'user@company.com',
          emailVerified: true
        }
      } as any)
      
      store.settings.providers = ['saml']
      store.settings.saml = {
        providerId: 'saml.company'
      }
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      await wrapper.find('[data-testid="provider-saml"]').trigger('click')
      
      expect(SAMLAuthProvider).toHaveBeenCalledWith('saml.company')
      expect(mockSignInWithPopup).toHaveBeenCalled()
    })

    it('should not show SAML button without configuration', () => {
      store.settings.providers = ['saml']
      store.settings.saml = undefined
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      expect(wrapper.find('[data-testid="provider-saml"]').exists()).toBe(false)
    })
  })

  describe('Provider Icons and Styling', () => {
    it('should display correct provider icons', () => {
      store.settings.providers = ['google', 'facebook', 'github', 'twitter']
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      expect(wrapper.find('[data-testid="provider-google"] .mdi-google').exists()).toBe(true)
      expect(wrapper.find('[data-testid="provider-facebook"] .mdi-facebook').exists()).toBe(true)
      expect(wrapper.find('[data-testid="provider-github"] .mdi-github').exists()).toBe(true)
      expect(wrapper.find('[data-testid="provider-twitter"] .mdi-twitter').exists()).toBe(true)
    })

    it('should apply correct provider colors', () => {
      store.settings.providers = ['google']
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      const googleButton = wrapper.find('[data-testid="provider-google"]')
      expect(googleButton.classes()).toContain('bg-red')
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      store.settings.providers = ['google', 'facebook']
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      expect(wrapper.find('[data-testid="provider-google"]').attributes('aria-label')).toBe('Sign in with Google')
      expect(wrapper.find('[data-testid="provider-facebook"]').attributes('aria-label')).toBe('Sign in with Facebook')
    })
  })
})
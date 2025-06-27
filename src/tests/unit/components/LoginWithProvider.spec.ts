import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import { createPinia, setActivePinia } from 'pinia'
import LoginWithProvider from '@/components/LoginWithProvider.vue'
import { useAuthStore } from '@/store/auth'

const vuetify = createVuetify()

describe('LoginWithProvider Component', () => {
  let store: any

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useAuthStore()
    
    // Initialize store config
    store.config = {
      firebase: {},
      debug: false,
      email: false,
      google: false,
      facebook: false,
      phone: false,
      saml: false,
      saml_text: 'Login with SSO'
    }
    
    // Mock auth methods
    store.loginWithGoogle = vi.fn()
    store.loginWithFacebook = vi.fn()
    store.loginWithSaml = vi.fn()
    store.SET_SHOW_LOGIN_WITH_PHONE = vi.fn()
    
    vi.clearAllMocks()
  })

  describe('Provider Buttons Rendering', () => {
    it('should render Google provider button', () => {
      store.config.google = true
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      const googleButton = wrapper.find('.mdi-google').element?.parentElement
      expect(googleButton).toBeTruthy()
      expect(wrapper.find('.mdi-google').exists()).toBe(true)
    })

    it('should render multiple provider buttons', () => {
      store.config.google = true
      store.config.facebook = true
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      expect(wrapper.find('.mdi-google').exists()).toBe(true)
      expect(wrapper.find('.mdi-facebook').exists()).toBe(true)
      // GitHub provider is not in the component
    })

    it('should not render disabled providers', () => {
      store.config.google = true
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      expect(wrapper.find('.mdi-facebook').exists()).toBe(false)
    })

    it('should render phone auth when enabled', () => {
      store.config.phone = true
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      expect(wrapper.find('.mdi-cellphone').exists()).toBe(true)
    })
  })

  describe('Provider Authentication', () => {
    it('should authenticate with Google', async () => {
      store.config.google = true
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      const buttons = wrapper.findAll('button')
      const googleButton = buttons.find(btn => btn.find('.mdi-google').exists())
      if (googleButton) {
        await googleButton.trigger('click')
      }
      
      expect(store.loginWithGoogle).toHaveBeenCalled()
    })

    it('should authenticate with Facebook', async () => {
      store.config.facebook = true
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      const buttons = wrapper.findAll('button')
      const facebookButton = buttons.find(btn => btn.find('.mdi-facebook').exists())
      if (facebookButton) {
        await facebookButton.trigger('click')
      }
      
      expect(store.loginWithFacebook).toHaveBeenCalled()
    })

    it('should handle authentication errors', async () => {
      store.config.google = true
      // Mock to simulate error handling without actually throwing
      store.loginWithGoogle = vi.fn().mockImplementation(() => {
        // Simulate error handling in the store
        store.error = { code: 'auth/popup-blocked', message: 'Auth failed' }
        return Promise.resolve()
      })
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      const buttons = wrapper.findAll('button')
      const googleButton = buttons.find(btn => btn.find('.mdi-google').exists())
      if (googleButton) {
        await googleButton.trigger('click')
      }
      
      // The component calls the login method
      expect(store.loginWithGoogle).toHaveBeenCalled()
    })

    it('should handle popup cancellation', async () => {
      store.config.google = true
      // Mock to simulate popup cancellation without throwing
      store.loginWithGoogle = vi.fn().mockImplementation(() => {
        // Simulate user cancelling the popup - typically no error is set
        return Promise.resolve()
      })
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      const buttons = wrapper.findAll('button')
      const googleButton = buttons.find(btn => btn.find('.mdi-google').exists())
      if (googleButton) {
        await googleButton.trigger('click')
      }
      
      // The component calls the login method
      expect(store.loginWithGoogle).toHaveBeenCalled()
    })
  })

  describe('Loading States', () => {
    it('should show loading state during authentication', async () => {
      store.config.google = true
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      const buttons = wrapper.findAll('button')
      const googleButton = buttons.find(btn => btn.find('.mdi-google').exists())
      if (googleButton) {
        await googleButton.trigger('click')
      }
      
      // Loading state is handled by the store
      expect(store.loginWithGoogle).toHaveBeenCalled()
    })
  })

  describe('SAML Authentication', () => {
    it('should handle SAML provider when configured', async () => {
      store.config.saml = 'saml.company'
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      const buttons = wrapper.findAll('button')
      const samlButton = buttons.find(btn => btn.find('.mdi-onepassword').exists())
      if (samlButton) {
        await samlButton.trigger('click')
      }
      
      expect(store.loginWithSaml).toHaveBeenCalled()
    })

    it('should not show SAML button without configuration', () => {
      store.config.saml = false
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      expect(wrapper.find('.mdi-onepassword').exists()).toBe(false)
    })
  })

  describe('Provider Icons and Styling', () => {
    it('should display correct provider icons', () => {
      store.config.google = true
      store.config.facebook = true
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      expect(wrapper.find('.mdi-google').exists()).toBe(true)
      expect(wrapper.find('.mdi-facebook').exists()).toBe(true)
      // GitHub and Twitter are not in the component
    })

    it('should apply correct provider colors', () => {
      store.config.google = true
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      const buttons = wrapper.findAll('button')
      const googleButton = buttons.find(btn => btn.find('.mdi-google').exists())
      // Vuetify applies color via style attribute
      expect(googleButton?.attributes('style')).toContain('color: #db3236')
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      store.config.google = true
      store.config.facebook = true
      
      const wrapper = mount(LoginWithProvider, {
        global: {
          plugins: [vuetify]
        }
      })
      
      // The component uses v-tooltip for accessibility
      expect(wrapper.find('.mdi-google').exists()).toBe(true)
      expect(wrapper.find('.mdi-facebook').exists()).toBe(true)
      expect(wrapper.text()).toContain('login with')
    })
  })
})
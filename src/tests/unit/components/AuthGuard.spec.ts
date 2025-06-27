import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import AuthGuard from '@/components/AuthGuard.vue'
import { useAuthStore } from '@/store/auth'
import type { User } from 'firebase/auth'

const vuetify = createVuetify()

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

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Import the auth guard
import authGuard from '@/components/authguard'

// Mock authcheck to prevent automatic dialog state changes
vi.mock('@/components/authcheck', () => ({
  default: vi.fn()
}))

// Add the auth guard to router
router.beforeEach(authGuard)

describe('AuthGuard Component', () => {
  let store: any

  beforeEach(async () => {
    setActivePinia(createPinia())
    store = useAuthStore()
    
    // Initialize store config to prevent null errors
    store.config = {
      firebase: {},
      debug: false
    }
    
    // Mock initializeGuard to prevent actual Firebase calls
    store.initializeGuard = vi.fn().mockResolvedValue(undefined)
    store.routesInitialized = true
    store.router = router
    store.init = true
    store.is_authguard_dialog_shown = false
    store.is_authguard_dialog_persistent = false
    
    // Don't navigate yet - let each test handle its own navigation
    await router.isReady()
  })

  it('should not show dialog when authenticated', async () => {
    const mockUser: Partial<User> = {
      uid: '123',
      email: 'test@example.com',
      emailVerified: true,
    }
    store.current_user = mockUser
    store.data = mockUser as User
    store.loggedIn = true
    
    // Navigate to protected route while authenticated
    await router.push('/protected')
    
    const wrapper = mount(AuthGuard, {
      global: {
        plugins: [vuetify, router],
        stubs: {
          teleport: true,
        }
      }
    })
    
    await wrapper.vm.$nextTick()
    
    // Dialog should not be shown when authenticated
    expect(store.is_authguard_dialog_shown).toBe(false)
    expect(wrapper.find('.v-dialog').exists()).toBe(false)
  })

  it('should show auth dialog on protected route when not authenticated', async () => {
    store.current_user = null
    store.loggedIn = false
    store.init = true
    
    await router.push('/protected')
    
    const wrapper = mount(AuthGuard, {
      global: {
        plugins: [vuetify, router],
        stubs: {
          teleport: true,
        }
      }
    })
    
    await wrapper.vm.$nextTick()
    
    expect(store.is_authguard_dialog_shown).toBe(true)
    expect(store.is_authguard_dialog_persistent).toBe(true)
  })

  it('should not show auth dialog on public route', async () => {
    store.current_user = null
    store.loggedIn = false
    store.init = true
    
    await router.push('/public')
    
    const wrapper = mount(AuthGuard, {
      global: {
        plugins: [vuetify, router],
        stubs: {
          teleport: true,
        }
      }
    })
    
    await wrapper.vm.$nextTick()
    
    expect(store.is_authguard_dialog_shown).toBe(false)
  })

  it('should show auth dialog when email verification is required', async () => {
    store.config.verification = true
    
    const mockUser: Partial<User> = {
      uid: '123',
      email: 'test@example.com',
      emailVerified: false,
    }
    store.current_user = mockUser
    store.data = mockUser as User
    store.loggedIn = true
    
    await router.push('/protected')
    
    const wrapper = mount(AuthGuard, {
      global: {
        plugins: [vuetify, router],
        stubs: {
          teleport: true,
        }
      }
    })
    
    await wrapper.vm.$nextTick()
    
    expect(store.is_authguard_dialog_shown).toBe(true)
    expect(store.is_authguard_dialog_persistent).toBe(true)
  })

  it('should handle navigation from public to protected route', async () => {
    store.current_user = null
    store.loggedIn = false
    store.init = true
    
    // Start on public route
    await router.push('/public')
    
    const wrapper = mount(AuthGuard, {
      global: {
        plugins: [vuetify, router],
        stubs: {
          teleport: true,
        }
      }
    })
    
    await wrapper.vm.$nextTick()
    expect(store.is_authguard_dialog_shown).toBe(false)
    
    // Navigate to protected route
    await router.push('/protected')
    await wrapper.vm.$nextTick()
    
    expect(store.is_authguard_dialog_shown).toBe(true)
    expect(store.is_authguard_dialog_persistent).toBe(false) // Non-persistent when navigating
  })

  it('should hide dialog when user authenticates', async () => {
    store.current_user = null
    store.loggedIn = false
    store.init = true
    store.is_authguard_dialog_shown = true
    
    const wrapper = mount(AuthGuard, {
      global: {
        plugins: [vuetify, router],
        stubs: {
          teleport: true,
        }
      }
    })
    
    // Simulate user authentication
    const mockUser: Partial<User> = {
      uid: '123',
      email: 'test@example.com',
      emailVerified: true,
    }
    store.current_user = mockUser
    store.data = mockUser as User
    store.loggedIn = true
    
    await wrapper.vm.$nextTick()
    
    expect(store.is_authguard_dialog_shown).toBe(false)
  })

  it('should handle anonymous users correctly', async () => {
    const mockUser: Partial<User> = {
      uid: '123',
      email: null,
      isAnonymous: true,
    }
    store.current_user = mockUser
    store.data = mockUser as User
    store.loggedIn = true
    
    await router.push('/protected')
    
    const wrapper = mount(AuthGuard, {
      global: {
        plugins: [vuetify, router],
        stubs: {
          teleport: true,
        }
      }
    })
    
    await wrapper.vm.$nextTick()
    
    // Anonymous users should see auth dialog on protected routes
    expect(store.is_authguard_dialog_shown).toBe(true)
  })
})
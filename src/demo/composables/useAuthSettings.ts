import { ref, watch, onMounted } from 'vue'
import type { Ref } from 'vue'

// Define the configurable auth settings
export interface ConfigurableAuthSettings {
  email: boolean
  phone: boolean
  google: boolean
  facebook: boolean
  registration: boolean
  verification: boolean
  saml: boolean
}

const STORAGE_KEY = 'firebase-vuetify-auth-demo-settings'

// Default settings
const defaultSettings: ConfigurableAuthSettings = {
  email: true,
  phone: true,
  google: true,
  facebook: true,
  registration: true,
  verification: true,
  saml: true
}

// Create reactive settings
const authSettings = ref<ConfigurableAuthSettings>({ ...defaultSettings })

// Load settings from localStorage
const loadSettings = (): void => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      authSettings.value = { ...defaultSettings, ...parsed }
    }
  } catch (error) {
    console.error('Failed to load auth settings from localStorage:', error)
  }
}

// Save settings to localStorage
const saveSettings = (): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authSettings.value))
  } catch (error) {
    console.error('Failed to save auth settings to localStorage:', error)
  }
}

// Reset to default settings
const resetSettings = (): void => {
  authSettings.value = { ...defaultSettings }
  saveSettings()
}

// Export composable
export function useAuthSettings(): {
  authSettings: Ref<ConfigurableAuthSettings>
  loadSettings: () => void
  saveSettings: () => void
  resetSettings: () => void
} {
  // Load settings on first use
  onMounted(() => {
    loadSettings()
  })

  // Watch for changes and auto-save
  watch(authSettings, () => {
    saveSettings()
  }, { deep: true })

  return {
    authSettings,
    loadSettings,
    saveSettings,
    resetSettings
  }
}
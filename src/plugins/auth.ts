import router from "@/router"
import { app as firebase } from "@/middleware/firebase"
import AuthGuard from "../wrapper"
import type { AuthGuardSettings } from '../types'

// Default settings
const defaultConfigurableSettings = {
  email: true,
  phone: true,
  google: true,
  facebook: true,
  registration: true,
  verification: true,
  saml: true,
}

// Load settings from localStorage
const loadSettingsFromStorage = () => {
  try {
    const stored = localStorage.getItem('firebase-vuetify-auth-demo-settings')
    if (stored) {
      const parsed = JSON.parse(stored)
      return { ...defaultConfigurableSettings, ...parsed }
    }
  } catch (error) {
    console.error('Failed to load settings from localStorage:', error)
  }
  return defaultConfigurableSettings
}

// Get the configurable settings
const configurableSettings = loadSettingsFromStorage()

const authGuardSettings: AuthGuardSettings = {
  debug: true,
  session: "local", // or "browser" see: https://firebase.google.com/docs/auth/web/auth-state-persistence
  router,
  firebase,
  saml: configurableSettings.saml,
  saml_text: "Login with OKTA",
  saml_provider_id: "saml.okta",
  email: configurableSettings.email,
  phone: configurableSettings.phone,
  google: configurableSettings.google,
  facebook: configurableSettings.facebook,
  registration: configurableSettings.registration,
  verification: configurableSettings.verification,

  title: "AUTH DEMO",
  subtitle: "Firebase Auth Demo for Veutify",
  icon: "mdi-test-tube",
  iconColor: "#FF6D00",
}

export { AuthGuard, authGuardSettings }

import type { User as FirebaseUser } from 'firebase/auth'
import type { RouteLocationRaw, Router } from 'vue-router'
import type { FirebaseApp } from 'firebase/app'

export interface AuthUser extends FirebaseUser {
  // Additional custom user properties can be added here
}

export interface AuthState {
  loggedIn: boolean
  initialized: boolean
  data: AuthUser | null
  loginState: string | null
  registrationPending: boolean
  registrationData: any
  phoneAuthCredential: any
}

export interface AuthGuardSettings {
  // Required dependencies
  router: Router
  firebase: FirebaseApp
  
  // Authentication settings
  allowedDomains?: string[]
  requireEmailVerification?: boolean
  sessionPersistence?: 'SESSION' | 'LOCAL' | 'NONE'
  session?: 'local' | 'browser' | 'session' | 'none'
  allowedUsers?: string[]
  verification?: boolean | string[]
  registration?: boolean
  
  // UI customization
  logoSrc?: string
  companyName?: string
  title?: string
  titleText?: string
  subtitle?: string
  subtitleText?: string
  supportLink?: string
  supportEmail?: string
  showOtherProviders?: boolean
  privacyPolicyUrl?: string
  tosUrl?: string
  
  // Theme
  primaryColor?: string
  primaryDarkColor?: string
  vuetifyTheme?: any
  icon?: string
  iconColor?: string
  
  // Social providers
  google?: boolean
  googleButton?: boolean
  facebook?: boolean
  facebookButton?: boolean
  email?: boolean
  emailPasswordButton?: boolean
  phone?: boolean
  phoneButton?: boolean
  saml?: boolean
  samlButton?: boolean
  saml_text?: string
  saml_provider_id?: string
  samlTenantId?: string
  
  // Icons
  successIcon?: string
  errorIcon?: string
  
  // Routes
  afterLoginRoute?: RouteLocationRaw
  registrationRoute?: RouteLocationRaw
  
  // Features
  debug?: boolean
  rememberMeEnabled?: boolean
  forceRegister?: boolean
  
  // Legacy support
  store?: any // vuex store (optional, legacy support)
  
  // Callbacks
  onAuthStateChange?: (_user: AuthUser | null) => void
}

export interface FirebaseConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId?: string
}
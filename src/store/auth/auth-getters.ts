import type { AuthUser } from '../../types'
import type { AuthError } from '../../types/forms'

interface AuthStoreState {
  error: AuthError | null
  config: any
  current_user: AuthUser | null
  loggedIn: boolean
  data: AuthUser | null
  registrationPending: boolean
  registrationData: any
  phoneAuthCredential: any
  routesInitialized: boolean
  loginState: string | null
  init: boolean
  is_loading: boolean
  is_session_persistant: boolean
  is_login_with_phone_shown: boolean
  is_authguard_dialog_shown: boolean
  is_authguard_dialog_persistent: boolean
  is_email_verification_link_sent: boolean
  is_email_reset_password_link_sent: boolean
  is_email_verification_screen_shown: boolean
  is_reset_password_screen_shown: boolean
  is_route_public: boolean
  is_from_public_to_auth: boolean
  text_confirmation: any
  sign_by_phone_step: number
  tab: number
}

export const getters = {
  getError: (state: AuthStoreState): AuthError | null => state.error,
  
  sessionPersistence: (state: AuthStoreState): string => 
    state.config?.sessionPersistence || 'LOCAL',
  
  uid: (state: AuthStoreState): string | null => 
    state.current_user?.uid || null,
  
  email: (state: AuthStoreState): string | null => 
    state.current_user?.email || null,
  
  emailVerified: (state: AuthStoreState): boolean => 
    state.current_user?.emailVerified || false,
  
  displayName: (state: AuthStoreState): string | null => 
    state.current_user?.displayName || null,

  getDisplayName: (state: AuthStoreState): string | null => 
    state.current_user?.displayName || null,
  
  photoURL: (state: AuthStoreState): string | null => 
    state.current_user?.photoURL || null,
  
  providerData: (state: AuthStoreState): any[] => 
    state.current_user?.providerData || [],
  
  phoneNumber: (state: AuthStoreState): string | null => 
    state.current_user?.phoneNumber || null,
  
  isAuthenticated: (state: AuthStoreState): boolean => 
    state.loggedIn,
  
  isReady: (state: AuthStoreState): boolean => 
    state.routesInitialized,
  
  isAnonymous: (state: AuthStoreState): boolean => 
    state.current_user?.isAnonymous || false,
  
  requiresEmailVerification: (state: AuthStoreState): boolean => {
    if (state.config?.requireEmailVerification && !state.current_user?.emailVerified) {
      const allowedDomains = state.config.allowedDomains
      const currentEmail = state.current_user?.email
      
      if (allowedDomains?.length && currentEmail) {
        const domain = currentEmail.split('@')[1]
        return allowedDomains.includes(domain)
      }
      return true
    }
    return false
  },
  
  isDomainAllowed: (state: AuthStoreState): boolean => {
    const allowedDomains = state.config?.allowedDomains
    if (!allowedDomains?.length) return true
    
    const currentEmail = state.current_user?.email
    if (!currentEmail) return true
    
    const domain = currentEmail.split('@')[1]
    return allowedDomains.includes(domain)
  },
  
  isUserAllowed: (state: AuthStoreState): boolean => {
    const allowedUsers = state.config?.allowedUsers
    if (!allowedUsers?.length) return true
    
    const currentEmail = state.current_user?.email
    return currentEmail ? allowedUsers.includes(currentEmail) : false
  },
  
  hasProvider: (state: AuthStoreState) => (provider: string): boolean => {
    return state.current_user?.providerData?.some((p: any) => p.providerId === provider) || false
  },
  
  hasPasswordProvider: (state: AuthStoreState): boolean => {
    return state.current_user?.providerData?.some((p: any) => p.providerId === 'password') || false
  },
  
  hasPhoneProvider: (state: AuthStoreState): boolean => {
    return state.current_user?.providerData?.some((p: any) => p.providerId === 'phone') || false
  },
  
  hasSocialProvider: (state: AuthStoreState): boolean => {
    return state.current_user?.providerData?.some((p: any) => 
      ['google.com', 'facebook.com', 'saml'].includes(p.providerId)
    ) || false
  },
  
  isOnlySingleProvider: (state: AuthStoreState): boolean => {
    const config = state.config
    if (!config) return false
    
    const providers = [
      config.google,
      config.facebook,
      config.email,
      config.phone,
      config.saml
    ].filter(Boolean)
    
    return providers.length === 1
  },

  // Additional getters for component compatibility
  isUserRegistrationAllowed: (state: AuthStoreState): boolean => 
    state.config?.registration ?? true,
  
  isResetPasswordScreenShown: (state: AuthStoreState): boolean => 
    state.is_reset_password_screen_shown,
  
  isLoginWithPhoneShown: (state: AuthStoreState): boolean => 
    state.is_login_with_phone_shown,
  
  isEmailVerificationScreenShown: (state: AuthStoreState): boolean => 
    state.is_email_verification_screen_shown,
  
  isEmailVerificationLinkSent: (state: AuthStoreState): boolean => 
    state.is_email_verification_link_sent,
  
  isEmailResetPasswordLinkSent: (state: AuthStoreState): boolean => 
    state.is_email_reset_password_link_sent,
  
  getAuthGuardDialogPersistence: (state: AuthStoreState): boolean => 
    state.is_authguard_dialog_persistent,
  
  isLoginWithProvidersActive: (state: AuthStoreState): boolean => {
    const config = state.config
    if (!config) return false
    
    return Boolean(
      config.google || 
      config.facebook || 
      config.saml || 
      config.phone
    )
  }
}
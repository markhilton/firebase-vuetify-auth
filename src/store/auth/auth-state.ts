import type { AuthState, AuthGuardSettings } from '../../types'
import type { AuthError } from '../../types/forms'

export const state = (): AuthState & {
  // Additional internal state properties
  config: AuthGuardSettings | null
  registrationPending: boolean
  registrationData: any
  phoneAuthCredential: any
  error: AuthError | null
  loading: boolean
  showPassword: boolean
  showPhoneAuth: boolean
  showSamlSSO: boolean
  showRegister: boolean
  showVerifyEmail: boolean
  showForgotPassword: boolean
  showResetPassword: boolean
  currentTab: string | null
  samlError: string | null
  samlProviderId: string | null
  phoneAuthInProgress: boolean
  phoneAuthVerificationId: string | null
  phoneConfirmationResult: any
  localLoginData: any
  routesInitialized: boolean
  current_user: any
  
  // Auth guard dialog states
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
  
  // Phone auth states
  text_confirmation: any
  sign_by_phone_step: number
  tab: number
} => ({
  // Core auth state from AuthState interface
  loggedIn: false,
  initialized: false,
  data: null,
  loginState: null,
  registrationPending: false,
  registrationData: null,
  phoneAuthCredential: null,
  
  // Additional internal state
  config: null,
  error: null,
  loading: false,
  showPassword: false,
  showPhoneAuth: false,
  showSamlSSO: false,
  showRegister: false,
  showVerifyEmail: false,
  showForgotPassword: false,
  showResetPassword: false,
  currentTab: null,
  samlError: null,
  samlProviderId: null,
  phoneAuthInProgress: false,
  phoneAuthVerificationId: null,
  phoneConfirmationResult: null,
  localLoginData: null,
  routesInitialized: false,
  current_user: null,
  
  // Auth guard dialog states
  init: false,
  is_loading: false,
  is_session_persistant: true,
  is_login_with_phone_shown: false,
  is_authguard_dialog_shown: false,
  is_authguard_dialog_persistent: true,
  is_email_verification_link_sent: false,
  is_email_reset_password_link_sent: false,
  is_email_verification_screen_shown: false,
  is_reset_password_screen_shown: false,
  is_route_public: false,
  is_from_public_to_auth: false,
  
  // Phone auth states
  text_confirmation: null,
  sign_by_phone_step: 1,
  tab: 0
})
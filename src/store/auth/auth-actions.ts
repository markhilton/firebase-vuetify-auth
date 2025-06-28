import {
  getAuth,
  signOut,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  SAMLAuthProvider,
  RecaptchaVerifier
} from "firebase/auth"
import type { UserCredential, Auth, ConfirmationResult } from "firebase/auth"
import type { AuthUser } from '../../types'

interface AuthActionContext {
  tab: number
  error: string | null
  is_email_verification_screen_shown: boolean
  is_reset_password_screen_shown: boolean
  is_email_reset_password_link_sent: boolean
  is_login_with_phone_shown: boolean
  sign_by_phone_step: number
  config: any
  current_user: AuthUser | null
  is_loading: boolean
  is_checking_auth: boolean
  is_session_persistant: boolean
  text_confirmation: ConfirmationResult | null
  is_authguard_dialog_shown: boolean
  is_email_verification_link_sent: boolean
  loginState: string | null
  router: any
}

export const actions = {
  SET_TAB(this: AuthActionContext, index: number): void {
    console.log('[auth-actions] SET_TAB called with index:', index)
    console.log('[auth-actions] Current tab:', this.tab)
    this.tab = index
    console.log('[auth-actions] Tab after update:', this.tab)
  },

  SET_EMAIL_VERIFICATION_SCREEN_SHOWN(this: AuthActionContext, status: boolean): void {
    this.is_email_verification_screen_shown = status
    if (status === false) this.error = null
  },

  SET_REGISTER_SCREEN_SHOWN(this: AuthActionContext, status: boolean): void {
    console.log('[auth-actions] SET_REGISTER_SCREEN_SHOWN called with status:', status)
    this.tab = status ? 1 : 0
    console.log('[auth-actions] Tab set to:', this.tab)
  },

  SET_PASSWORD_RESET_SCREEN_SHOWN(this: AuthActionContext, status: boolean): void {
    this.tab = status ? 2 : 0
    this.is_reset_password_screen_shown = status
    if (status === false) this.is_email_reset_password_link_sent = false
  },

  SET_SHOW_LOGIN_WITH_PHONE(this: AuthActionContext, status: boolean): void {
    console.log('[auth-actions] SET_SHOW_LOGIN_WITH_PHONE called with status:', status)
    this.tab = status ? 3 : 0
    this.is_login_with_phone_shown = status
    if (status === false) this.sign_by_phone_step = 1
    console.log('[auth-actions] After SET_SHOW_LOGIN_WITH_PHONE - tab:', this.tab, 'is_login_with_phone_shown:', this.is_login_with_phone_shown)
  },

  async initializeGuard(this: AuthActionContext): Promise<void> {
    const debug = this.config.debug
    const auth: Auth = getAuth(this.config.firebase)

    if (debug) console.log("[ auth guard ]: component initialization")
    
    // Set checking auth state
    this.is_checking_auth = true

    // Check for redirect result first
    try {
      const result = await getRedirectResult(auth)
      if (result && result.user) {
        if (debug) console.log("[ auth guard ]: redirect result found, processing...")
        const { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } = result.user
        this.current_user = { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } as AuthUser
        this.loggedIn = true
        this.data = result.user
        this.is_authguard_dialog_shown = false
        this.is_loading = false
        
        // Handle post-auth redirect
        this._handlePostAuthRedirect()
      }
    } catch (error: any) {
      if (debug) console.error("[ auth guard ]: redirect result error:", error)
      this.error = error
      this.is_loading = false
    }

    // Wait for Firebase Auth to initialize and restore auth state
    return new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          const { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } = user
          this.current_user = { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } as AuthUser
          this.loggedIn = true
          this.data = user
          if (debug) console.log("[ auth guard ]: initialization - user authenticated")
        } else {
          const wasAuthenticated = this.loggedIn
          this.current_user = null
          this.loggedIn = false
          this.data = null
          if (debug) console.log("[ auth guard ]: initialization - no user")
          
          // If user was authenticated and signed out, show auth dialog on protected routes
          if (this.init && wasAuthenticated && this.router?.currentRoute.value) {
            const currentRoute = this.router.currentRoute.value
            const requiresAuth = currentRoute.matched.some((record) => record.meta.requiresAuth)
            
            if (requiresAuth) {
              this.loginState = currentRoute.fullPath
              this.toggleAuthDialog(true)
              this.is_authguard_dialog_persistent = true
              if (debug) console.log("[ auth guard ]: showing auth dialog after sign out on protected route")
            }
          }
        }

        // Resolve the promise on first auth state change (initialization complete)
        this.is_checking_auth = false
        unsubscribe()
        resolve()
      })
    })
  },

  // Helper function to handle post-authentication redirect
  _handlePostAuthRedirect(this: AuthActionContext): void {
    if (this.loginState && this.router) {
      const debug = this.config?.debug ?? false
      if (debug) console.log("[ auth guard ]: Redirecting to:", this.loginState)
      
      // Navigate to the stored route
      this.router.push(this.loginState)
      
      // Clear the stored login state
      this.loginState = null
    }
  },

  // Helper function to detect if device is mobile
  _isMobileDevice(): boolean {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return false
    
    // Check for mobile user agents
    const userAgent = window.navigator.userAgent.toLowerCase()
    const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone']
    const isMobileAgent = mobileKeywords.some(keyword => userAgent.includes(keyword))
    
    // Also check for touch support and screen size
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const isSmallScreen = window.innerWidth <= 768
    
    return isMobileAgent || (hasTouch && isSmallScreen)
  },

  // Helper function to determine which auth method to use
  _getAuthMethod(this: AuthActionContext): 'popup' | 'redirect' {
    const configMethod = this.config.authMethod || 'auto'
    
    if (configMethod === 'auto') {
      // Auto-detect based on device type
      return this._isMobileDevice() ? 'redirect' : 'popup'
    }
    
    return configMethod
  },

  // Helper function to sign in with provider using the configured method
  async _signInWithProvider(
    this: AuthActionContext, 
    provider: GoogleAuthProvider | FacebookAuthProvider | SAMLAuthProvider,
    providerName: string
  ): Promise<UserCredential> {
    const auth: Auth = getAuth(this.config.firebase)
    const method = this._getAuthMethod()
    const fallbackMethod = this.config.authMethodFallback || (method === 'popup' ? 'redirect' : 'popup')
    
    if (this.config.debug) {
      console.log(`[ auth guard ]: Trying ${method} method for ${providerName} authentication`)
    }
    
    try {
      let result: UserCredential | null = null
      
      if (method === 'popup') {
        result = await signInWithPopup(auth, provider)
      } else {
        // For redirect method, initiate the redirect
        await signInWithRedirect(auth, provider)
        // The actual result will be handled in initializeGuard when the page reloads
        return Promise.resolve({} as UserCredential)
      }
      
      return result
    } catch (error: any) {
      if (this.config.debug) {
        console.error(`[ auth guard ]: ${providerName} ${method} auth failed:`, error)
      }
      
      // Try fallback method if configured and not null
      if (fallbackMethod && error.code === 'auth/popup-blocked') {
        if (this.config.debug) {
          console.log(`[ auth guard ]: Trying fallback ${fallbackMethod} method for ${providerName}`)
        }
        
        try {
          if (fallbackMethod === 'popup') {
            return await signInWithPopup(auth, provider)
          } else {
            await signInWithRedirect(auth, provider)
            return Promise.resolve({} as UserCredential)
          }
        } catch (fallbackError: any) {
          if (this.config.debug) {
            console.error(`[ auth guard ]: ${providerName} fallback ${fallbackMethod} auth also failed:`, fallbackError)
          }
          throw fallbackError
        }
      }
      
      throw error
    }
  },

  async loginWithEmail(this: AuthActionContext, { email, password }: { email: string; password: string }): Promise<void> {
    try {
      const auth: Auth = getAuth(this.config.firebase)
      this.is_loading = true

      await signOut(auth)

      if (this.is_session_persistant) {
        await setPersistence(auth, browserLocalPersistence)
      } else {
        await setPersistence(auth, browserSessionPersistence)
      }

      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password)

      if (userCredential.user) {
        const { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } = userCredential.user
        this.current_user = { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } as AuthUser
        this.loggedIn = true
        this.data = userCredential.user
        this.is_authguard_dialog_shown = false
        
        // Handle post-auth redirect
        this._handlePostAuthRedirect()
      }

      this.is_loading = false
      return Promise.resolve()
    } catch (error: any) {
      this.error = error
      this.is_loading = false
      return Promise.reject(error)
    }
  },

  async loginWithGoogle(this: AuthActionContext): Promise<UserCredential> {
    try {
      this.is_loading = true
      const provider = new GoogleAuthProvider()
      
      // Add custom parameters to avoid COOP issues
      provider.setCustomParameters({
        prompt: 'select_account'
      })
      
      const result = await this._signInWithProvider(provider, 'Google')
      
      if (result.user) {
        const { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } = result.user
        this.current_user = { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } as AuthUser
        this.loggedIn = true
        this.data = result.user
        this.is_authguard_dialog_shown = false
        
        // Handle post-auth redirect
        this._handlePostAuthRedirect()
      }
      
      this.is_loading = false
      return Promise.resolve(result)
    } catch (error: any) {
      this.error = error
      this.is_loading = false
      return Promise.reject(error)
    }
  },

  async loginWithFacebook(this: AuthActionContext): Promise<UserCredential> {
    try {
      this.is_loading = true
      const provider = new FacebookAuthProvider()
      
      const result = await this._signInWithProvider(provider, 'Facebook')

      if (result.user) {
        const { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } = result.user
        this.current_user = { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } as AuthUser
        this.loggedIn = true
        this.data = result.user
        this.is_authguard_dialog_shown = false
        
        // Handle post-auth redirect
        this._handlePostAuthRedirect()
      }

      this.is_loading = false
      return Promise.resolve(result)
    } catch (error: any) {
      this.error = error
      this.is_loading = false
      return Promise.reject(error)
    }
  },

  loginWithPhone(this: AuthActionContext): void {
    // Placeholder - actual implementation in textPhoneVerificationCode and confirmCode
  },

  async loginWithSaml(this: AuthActionContext): Promise<UserCredential> {
    try {
      this.is_loading = true
      const provider = new SAMLAuthProvider(this.config.saml_provider_id)
      
      const result = await this._signInWithProvider(provider, 'SAML')

      if (result.user) {
        const { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } = result.user
        this.current_user = { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } as AuthUser
        this.loggedIn = true
        this.data = result.user
        this.is_authguard_dialog_shown = false
        
        // Handle post-auth redirect
        this._handlePostAuthRedirect()
      }

      this.is_loading = false
      return Promise.resolve(result)
    } catch (error: any) {
      this.error = error
      this.is_loading = false
      return Promise.reject(error)
    }
  },

  async textPhoneVerificationCode(
    this: AuthActionContext, 
    { phoneNumber, recaptchaVerifier }: { phoneNumber: string; recaptchaVerifier: RecaptchaVerifier }
  ): Promise<ConfirmationResult> {
    try {
      this.is_loading = true
      this.text_confirmation = null

      const phone = phoneNumber.startsWith("+") ? phoneNumber : "+1" + phoneNumber.replace(/\D/g, "")
      const auth: Auth = getAuth(this.config.firebase)
      
      if (this.config.debug) {
        console.log("[textPhoneVerificationCode]: Sending verification code to:", phone)
      }
      
      const confirmationResult: ConfirmationResult = await signInWithPhoneNumber(auth, phone, recaptchaVerifier)

      this.is_loading = false
      this.sign_by_phone_step = 2
      this.text_confirmation = confirmationResult

      return Promise.resolve(confirmationResult)
    } catch (error: any) {
      console.error("[textPhoneVerificationCode]: Error sending verification code:", error)
      
      // Provide more user-friendly error messages
      if (error.code === 'auth/invalid-app-credential') {
        this.error = { 
          message: "Phone authentication is not properly configured. Please check that phone authentication is enabled in your Firebase Console and that your domain is authorized.",
          code: error.code 
        }
      } else if (error.code === 'auth/quota-exceeded') {
        this.error = { 
          message: "Too many requests. Please try again later.",
          code: error.code 
        }
      } else if (error.code === 'auth/captcha-check-failed') {
        this.error = { 
          message: "reCAPTCHA verification failed. Please try again.",
          code: error.code 
        }
      } else {
        this.error = error
      }
      
      this.is_loading = false
      return Promise.reject(error)
    }
  },

  async confirmCode(this: AuthActionContext, confirmationCode: string | string[]): Promise<UserCredential> {
    try {
      this.is_loading = true

      if (!this.text_confirmation) {
        throw new Error("No confirmation result available")
      }

      const code = Array.isArray(confirmationCode) ? confirmationCode.join("") : confirmationCode
      if (this.config.debug) console.log("confirmationCode", code)

      const result: UserCredential = await this.text_confirmation.confirm(code)

      if (result.user) {
        const { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } = result.user
        this.current_user = { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } as AuthUser
        this.loggedIn = true
        this.data = result.user
        this.is_authguard_dialog_shown = false
        
        // Handle post-auth redirect
        this._handlePostAuthRedirect()
      }

      this.is_loading = false
      this.sign_by_phone_step = 1

      return Promise.resolve(result)
    } catch (error: any) {
      this.error = error
      this.is_loading = false
      this.sign_by_phone_step = 1
      return Promise.reject(error)
    }
  },

  async registerUser(
    this: AuthActionContext, 
    displayName: string, 
    email: string, 
    password: string
  ): Promise<void> {
    try {
      this.is_loading = true

      const verificationSetting = this.config.verification
      const auth: Auth = getAuth(this.config.firebase)

      try {
        await createUserWithEmailAndPassword(auth, email, password)
        if (this.config.debug) console.log("User Account Created!")
      } catch (error: any) {
        this.error = error
        this.is_loading = false
        if (this.config.debug) console.error("[ registerUser ]: Error occurred during creating user", error)
        throw error
      }

      await signInWithEmailAndPassword(auth, email, password)

      this.current_user = {
        ...this.current_user, 
        displayName,
      } as AuthUser
      
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName })
      }

      const domain = email.split("@")[1] || "XXX"

      if (verificationSetting === true || (Array.isArray(verificationSetting) && verificationSetting.includes(domain))) {
        if (auth.currentUser) {
          await sendEmailVerification(auth.currentUser)
        }
      }

      this.is_loading = false
    } catch (error: any) {
      this.error = error
      this.is_loading = false
    }
  },

  async emailPasswordResetLink(this: AuthActionContext, email: string): Promise<void> {
    try {
      this.is_loading = true
      const auth: Auth = getAuth(this.config.firebase)

      await sendPasswordResetEmail(auth, email)

      this.error = null
      this.is_loading = false
      this.is_email_reset_password_link_sent = true

      return Promise.resolve()
    } catch (error: any) {
      this.error = error
      this.is_loading = false
      return Promise.reject(error)
    }
  },

  async signOut(this: AuthActionContext): Promise<void> {
    try {
      const debug = this.config.debug
      const auth: Auth = getAuth(this.config.firebase)

      if (debug) console.log("[ auth guard ]: signOut request")

      await signOut(auth)
      this.current_user = null

      return Promise.resolve()
    } catch (error: any) {
      this.error = error
      return Promise.reject(error)
    }
  },

  toggleAuthDialog(this: AuthActionContext, value?: boolean): void {
    if (value !== undefined) {
      this.is_authguard_dialog_shown = value
    } else {
      this.is_authguard_dialog_shown = !this.is_authguard_dialog_shown
    }

    if (this.config?.debug) {
      console.log("[ auth guard ]: dialog visibility set to", this.is_authguard_dialog_shown)
    }
  },

  async sendVerificationEmail(this: AuthActionContext): Promise<void> {
    try {
      this.is_loading = true
      const auth: Auth = getAuth(this.config.firebase)

      if (!auth.currentUser) {
        throw new Error("No authenticated user")
      }

      await sendEmailVerification(auth.currentUser)

      this.is_loading = false
      this.is_email_verification_link_sent = true

      return Promise.resolve()
    } catch (error: any) {
      this.error = error
      this.is_loading = false
      return Promise.reject(error)
    }
  },
}
import {
  getAuth,
  signOut,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signInWithPopup,
  // signInWithRedirect,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  SAMLAuthProvider,
} from "firebase/auth"

export const actions = {
  SET_EMAIL_VERIFICATION_SCREEN_SHOWN(status) {
    this.is_email_verification_screen_shown = status

    if (status === false) this.error = null
  },

  SET_REGISTER_SCREEN_SHOWN(status) {
    this.tab = status ? 0 : 1
    this.is_reset_password_screen_shown = status
  },

  SET_PASSWORD_RESET_SCREEN_SHOWN(status) {
    this.tab = status ? 1 : 0
    this.is_reset_password_screen_shown = status

    if (status === false) this.is_email_reset_password_link_sent = false
  },

  SET_SHOW_LOGIN_WITH_PHONE(status) {
    this.tab = 0 // reset tab to Sign In
    this.is_login_with_phone_shown = status

    if (status === false) this.sign_by_phone_step = 1 // reset sign by phone step
  },

  //
  async initializeGuard() {
    const debug = this.config.debug
    const auth = getAuth(this.config.firebase)
    
    if (debug) console.log("[ auth guard ]: component initialization")

    // Get the current user
    const user = auth.currentUser
    
    if (user) {
      const { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } = user
      this.current_user = { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL }
    } else {
      this.current_user = null
    }
    
    // Set up auth state change listener
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } = user
        this.current_user = { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL }
      } else {
        this.current_user = null
      }
      
      if (debug) console.log("[ auth guard ]: auth state changed", user ? "user logged in" : "user logged out")
    })
    
    return Promise.resolve()
  },

  //
  async loginWithEmail({ email, password }) {
    try {
      const auth = getAuth(this.config.firebase)
      
      this.is_loading = true

      await signOut(auth)

      // set session persistence
      if (this.config.session === "browser") {
        await setPersistence(auth, browserSessionPersistence)
      } else {
        await setPersistence(auth, browserLocalPersistence)
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      
      // Update current user information
      if (userCredential.user) {
        const { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } = userCredential.user
        this.current_user = { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL }
      }

      this.is_loading = false
      return Promise.resolve()
    } catch (error) {
      this.error = error
      this.is_loading = false
      return Promise.reject(error)
    }
  },

  //
  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(this.config.firebase)

      const result = await signInWithPopup(auth, provider)
      
      // Update current user information
      if (result.user) {
        const { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } = result.user
        this.current_user = { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL }
      }
      
      return Promise.resolve(result)
    } catch (error) {
      this.error = error
      return Promise.reject(error)
    }
  },

  //
  async loginWithFacebook() {
    try {
      const provider = new FacebookAuthProvider()
      const auth = getAuth(this.config.firebase)

      const result = await signInWithPopup(auth, provider)
      
      // Update current user information
      if (result.user) {
        const { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } = result.user
        this.current_user = { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL }
      }
      
      return Promise.resolve(result)
    } catch (error) {
      this.error = error
      return Promise.reject(error)
    }
  },

  //
  loginWithPhone() {},

  async loginWithSaml() {
    try {
      const provider = new SAMLAuthProvider(this.config.saml_provider_id)
      const auth = getAuth(this.config.firebase)

      const result = await signInWithPopup(auth, provider)
      
      // Update current user information
      if (result.user) {
        const { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } = result.user
        this.current_user = { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL }
      }
      
      return Promise.resolve(result)
    } catch (error) {
      this.error = error
      return Promise.reject(error)
    }
  },

  //
  async textPhoneVerificationCode({ phoneNumber, recaptchaVerifier }) {
    try {
      this.is_loading = true
      this.text_confirmation = null

      const phone = "+1" + phoneNumber.replace(/\D/g, "")
      const auth = getAuth(this.config.firebase)
      const confirmationResult = await signInWithPhoneNumber(auth, phone, recaptchaVerifier)

      this.is_loading = false
      this.sign_by_phone_step = 2
      this.text_confirmation = confirmationResult
      
      return Promise.resolve(confirmationResult)
    } catch (error) {
      this.error = error
      this.is_loading = false
      return Promise.reject(error)
    }
  },

  //
  async confirmCode(confirmationCode) {
    try {
      this.is_loading = true

      if (!this.text_confirmation) {
        throw new Error("No confirmation result available")
      }

      const code = Array.isArray(confirmationCode) ? confirmationCode.join('') : confirmationCode
      console.log("confirmationCode", code)

      const result = await this.text_confirmation.confirm(code)
      
      // Update current user information
      if (result.user) {
        const { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } = result.user
        this.current_user = { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL }
      }

      this.is_loading = false
      this.sign_by_phone_step = 1
      
      return Promise.resolve(result)
    } catch (error) {
      this.error = error
      this.is_loading = false
      this.sign_by_phone_step = 1
      return Promise.reject(error)
    }
  },

  //
  async registerUser(displayName, email, password) {
    try {
      this.is_loading = true

      const verification = this.config.email
      const auth = getAuth(this.config.firebase)
      
      try {
        await createUserWithEmailAndPassword(auth, email, password)
        console.log("User Account Created!")
      } catch (error) {
        this.error = error
        this.is_loading = false
        console.error("[ registerUser ]: Error occurred during creating user", error)
        throw error
      }

      await signInWithEmailAndPassword(auth, email, password)

      this.current_user = {
        ...this.current_user,
        displayName
      }

      await updateProfile(auth.currentUser, { displayName })

      const domain = email.split('@')[1] || "XXX" // Extract domain from email

      // send email to verify user email address if config option is not set to false
      if (verification === true || (Array.isArray(verification) && verification.includes(domain))) {
        await sendEmailVerification(auth.currentUser)
      }

      this.is_loading = false
    } catch (error) {
      this.error = error
      this.is_loading = false
    }
  },

  async emailPasswordResetLink(email) {
    try {
      this.is_loading = true

      const auth = getAuth(this.config.firebase)

      await sendPasswordResetEmail(auth, email)

      this.error = null
      this.is_loading = false
      this.is_email_reset_password_link_sent = true
      
      return Promise.resolve()
    } catch (error) {
      this.error = error
      this.is_loading = false
      return Promise.reject(error)
    }
  },

  //
  async signOut() {
    try {
      const debug = this.config.debug
      const auth = getAuth(this.config.firebase)

      if (debug) console.log("[ auth guard ]: signOut request")

      await signOut(auth)
      
      // Clear user data
      this.current_user = null
      
      return Promise.resolve()
    } catch (error) {
      this.error = error
      return Promise.reject(error)
    }
  },

  //
  async sendVerificationEmail() {
    try {
      this.is_loading = true

      const auth = getAuth(this.config.firebase)
      
      if (!auth.currentUser) {
        throw new Error("No authenticated user")
      }

      await sendEmailVerification(auth.currentUser)

      this.is_loading = false
      this.is_email_verification_link_sent = true

      return Promise.resolve()
    } catch (error) {
      this.error = error
      this.is_loading = false
      return Promise.reject(error)
    }
  },
}

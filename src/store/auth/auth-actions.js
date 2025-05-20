import {
  getAuth,
  signOut,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signInWithPopup,
  // signInWithRedirect, // Removed as per review
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
  SET_TAB(index) {
    this.tab = index
  },

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

  // Initializes the authentication guard.
  // Sets up the initial user state and listens for authentication state changes.
  async initializeGuard() {
    const debug = this.config.debug
    const auth = getAuth(this.config.firebase)

    if (debug) console.log("[ auth guard ]: component initialization")

    // Get the current user
    const user = auth.currentUser

    // Set current_user in store based on Firebase's currentUser
    if (user) {
      const { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } = user
      this.current_user = { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL }
    } else {
      this.current_user = null
    }

    // Set up auth state change listener
    // This will reactively update the store whenever the auth state changes.
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

  // Logs in a user with email and password.
  // Handles session persistence based on the "Remember me" checkbox.
  async loginWithEmail({ email, password }) {
    try {
      const auth = getAuth(this.config.firebase)

      this.is_loading = true

      await signOut(auth) // Sign out any existing user first

      // set session persistence based on the "Remember me" checkbox state
      if (this.is_session_persistant) {
        await setPersistence(auth, browserLocalPersistence) // Remember me: use local persistence
      } else {
        await setPersistence(auth, browserSessionPersistence) // Don't remember me: use session persistence
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      // Update current user information in the store
      // Note: onAuthStateChanged will also update this, but this provides immediate feedback.
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

  // Logs in a user with Google Sign-In.
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

  // Logs in a user with Facebook Sign-In.
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

  // Placeholder for phone login logic (currently handled by textPhoneVerificationCode and confirmCode).
  loginWithPhone() {},

  // Logs in a user with SAML.
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

  // Sends a verification code via text message for phone authentication.
  async textPhoneVerificationCode({ phoneNumber, recaptchaVerifier }) {
    try {
      this.is_loading = true
      this.text_confirmation = null // Reset previous confirmation

      const phone = "+1" + phoneNumber.replace(/\D/g, "") // Format phone number
      const auth = getAuth(this.config.firebase)
      const confirmationResult = await signInWithPhoneNumber(auth, phone, recaptchaVerifier)

      this.is_loading = false
      this.sign_by_phone_step = 2 // Move to code confirmation step
      this.text_confirmation = confirmationResult

      return Promise.resolve(confirmationResult)
    } catch (error) {
      this.error = error
      this.is_loading = false
      return Promise.reject(error)
    }
  },

  // Confirms the verification code received by text message.
  async confirmCode(confirmationCode) {
    try {
      this.is_loading = true

      if (!this.text_confirmation) {
        throw new Error("No confirmation result available")
      }

      const code = Array.isArray(confirmationCode) ? confirmationCode.join("") : confirmationCode
      if (this.config.debug) console.log("confirmationCode", code)

      const result = await this.text_confirmation.confirm(code)

      // Update current user information
      if (result.user) {
        const { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } = result.user
        this.current_user = { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL }
      }

      this.is_loading = false
      this.sign_by_phone_step = 1 // Reset to phone number input step

      return Promise.resolve(result)
    } catch (error) {
      this.error = error
      this.is_loading = false
      this.sign_by_phone_step = 1 // Reset on error
      return Promise.reject(error)
    }
  },

  // Registers a new user with email, password, and display name.
  // Sends a verification email if configured.
  async registerUser(displayName, email, password) {
    try {
      this.is_loading = true

      const verificationSetting = this.config.verification; // Corrected: use verification setting
      const auth = getAuth(this.config.firebase)

      // Create user account
      try {
        await createUserWithEmailAndPassword(auth, email, password)
        if (this.config.debug) console.log("User Account Created!")
      } catch (error) {
        this.error = error
        this.is_loading = false
        if (this.config.debug) console.error("[ registerUser ]: Error occurred during creating user", error)
        throw error // Re-throw to be caught by the outer try-catch
      }

      // Sign in the new user to update their profile
      await signInWithEmailAndPassword(auth, email, password)

      // Update user profile with display name
      this.current_user = {
        ...this.current_user, // Spread existing user data if any (though usually null here)
        displayName,
      }
      await updateProfile(auth.currentUser, { displayName })

      const domain = email.split("@")[1] || "XXX" // Extract domain from email

      // Send email verification if required by config
      if (verificationSetting === true || (Array.isArray(verificationSetting) && verificationSetting.includes(domain))) {
        await sendEmailVerification(auth.currentUser)
      }

      this.is_loading = false
    } catch (error) {
      // Catch errors from signInWithEmailAndPassword or updateProfile or sendEmailVerification
      this.error = error
      this.is_loading = false
    }
  },

  // Sends a password reset link to the user's email.
  async emailPasswordResetLink(email) {
    try {
      this.is_loading = true

      const auth = getAuth(this.config.firebase)

      await sendPasswordResetEmail(auth, email)

      this.error = null // Clear previous errors
      this.is_loading = false
      this.is_email_reset_password_link_sent = true // Set confirmation flag

      return Promise.resolve()
    } catch (error) {
      this.error = error
      this.is_loading = false
      return Promise.reject(error)
    }
  },

  // Signs out the current user.
  async signOut() {
    try {
      const debug = this.config.debug
      const auth = getAuth(this.config.firebase)

      if (debug) console.log("[ auth guard ]: signOut request")

      await signOut(auth)

      // Clear user data from store
      // Note: onAuthStateChanged will also handle this.
      this.current_user = null

      return Promise.resolve()
    } catch (error) {
      this.error = error
      return Promise.reject(error)
    }
  },

  // Toggles the visibility of the authentication dialog.
  toggleAuthDialog(value) {
    if (value !== undefined) {
      this.is_authguard_dialog_shown = value
    } else {
      this.is_authguard_dialog_shown = !this.is_authguard_dialog_shown
    }

    if (this.config?.debug) {
      console.log("[ auth guard ]: dialog visibility set to", this.is_authguard_dialog_shown)
    }
  },

  // Sends a verification email to the currently authenticated user.
  async sendVerificationEmail() {
    try {
      this.is_loading = true

      const auth = getAuth(this.config.firebase)

      if (!auth.currentUser) {
        throw new Error("No authenticated user")
      }

      await sendEmailVerification(auth.currentUser)

      this.is_loading = false
      this.is_email_verification_link_sent = true // Set confirmation flag

      return Promise.resolve()
    } catch (error) {
      this.error = error
      this.is_loading = false
      return Promise.reject(error)
    }
  },
}

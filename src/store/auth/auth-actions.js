import {
  getAuth,
  signOut,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signInWithPopup,
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
  /**
   * Sets the active tab in the authentication dialog.
   * @param {number} index - The index of the tab to activate.
   */
  SET_TAB(index) {
    this.tab = index
  },

  /**
   * Controls the visibility of the email verification screen.
   * Clears any existing error when the screen is hidden.
   * @param {boolean} status - True to show, false to hide.
   */
  SET_EMAIL_VERIFICATION_SCREEN_SHOWN(status) {
    this.is_email_verification_screen_shown = status

    if (status === false) this.error = null
  },

  /**
   * Shows or hides the registration screen by controlling the active tab.
   * This seems to be a legacy way of managing which screen (Sign In or Register) is active.
   * @param {boolean} status - If true, implies showing reset password (tab 0), effectively hiding register. If false, implies showing register (tab 1).
   */
  SET_REGISTER_SCREEN_SHOWN(status) {
    this.tab = status ? 0 : 1 // This logic might need review: status true sets tab to 0 (Sign In), status false sets tab to 1 (Register)
    this.is_reset_password_screen_shown = status // This also links to reset password screen visibility
  },

  /**
   * Controls the visibility of the password reset screen.
   * Resets the email sent confirmation when the screen is hidden.
   * @param {boolean} status - True to show, false to hide.
   */
  SET_PASSWORD_RESET_SCREEN_SHOWN(status) {
    this.tab = status ? 1 : 0 // This logic might need review: status true sets tab to 1 (Register/Reset), status false sets tab to 0 (Sign In)
    this.is_reset_password_screen_shown = status

    if (status === false) this.is_email_reset_password_link_sent = false
  },

  /**
   * Controls the visibility of the phone login screen.
   * Resets to the Sign In tab and phone step when hidden.
   * @param {boolean} status - True to show, false to hide.
   */
  SET_SHOW_LOGIN_WITH_PHONE(status) {
    this.tab = 0 // reset tab to Sign In
    this.is_login_with_phone_shown = status

    if (status === false) this.sign_by_phone_step = 1 // reset sign by phone step
  },

  /**
   * Initializes the authentication guard.
   * Sets up the initial user state from Firebase's `currentUser` (for synchronous availability on load)
   * and then listens for real-time authentication state changes.
   */
  async initializeGuard() {
    const debug = this.config.debug
    const auth = getAuth(this.config.firebase)

    if (debug) console.log("[ auth guard ]: component initialization")

    // Get the current user synchronously on initialization.
    // This ensures that if a user is already logged in (e.g., due to session persistence),
    // their state is immediately available in the store.
    const user = auth.currentUser

    if (user) {
      const { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } = user
      this.current_user = { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL }
    } else {
      this.current_user = null
    }

    // Set up auth state change listener.
    // This will reactively update the store whenever the auth state changes (login, logout).
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

  /**
   * Logs in a user with their email and password.
   * Handles session persistence based on the "Remember me" checkbox state.
   * @param {object} credentials - User credentials.
   * @param {string} credentials.email - User's email.
   * @param {string} credentials.password - User's password.
   */
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

      // Update current user information in the store for immediate UI reactivity.
      // Note: onAuthStateChanged will also update this shortly after.
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

  /**
   * Logs in a user with Google Sign-In via a popup.
   */
  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(this.config.firebase)

      const result = await signInWithPopup(auth, provider)

      // Update current user information for immediate UI reactivity.
      // Note: onAuthStateChanged will also update this.
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

  /**
   * Logs in a user with Facebook Sign-In via a popup.
   */
  async loginWithFacebook() {
    try {
      const provider = new FacebookAuthProvider()
      const auth = getAuth(this.config.firebase)

      const result = await signInWithPopup(auth, provider)

      // Update current user information for immediate UI reactivity.
      // Note: onAuthStateChanged will also update this.
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

  /**
   * Placeholder for phone login logic.
   * Actual phone login is handled by `textPhoneVerificationCode` and `confirmCode`.
   */
  loginWithPhone() {},

  /**
   * Logs in a user with SAML via a popup.
   */
  async loginWithSaml() {
    try {
      const provider = new SAMLAuthProvider(this.config.saml_provider_id)
      const auth = getAuth(this.config.firebase)

      const result = await signInWithPopup(auth, provider)

      // Update current user information for immediate UI reactivity.
      // Note: onAuthStateChanged will also update this.
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

  /**
   * Sends a verification code via text message for phone authentication.
   * @param {object} payload - Phone authentication payload.
   * @param {string} payload.phoneNumber - The user's phone number.
   * @param {object} payload.recaptchaVerifier - The Firebase reCAPTCHA verifier instance.
   */
  async textPhoneVerificationCode({ phoneNumber, recaptchaVerifier }) {
    try {
      this.is_loading = true
      this.text_confirmation = null // Reset previous confirmation

      const phone = "+1" + phoneNumber.replace(/\D/g, "") // Format phone number (assuming US for now)
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

  /**
   * Confirms the verification code received by text message.
   * @param {string|string[]} confirmationCode - The confirmation code entered by the user.
   */
  async confirmCode(confirmationCode) {
    try {
      this.is_loading = true

      if (!this.text_confirmation) {
        throw new Error("No confirmation result available")
      }

      const code = Array.isArray(confirmationCode) ? confirmationCode.join("") : confirmationCode
      if (this.config.debug) console.log("confirmationCode", code)

      const result = await this.text_confirmation.confirm(code)

      // Update current user information for immediate UI reactivity.
      // Note: onAuthStateChanged will also update this.
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

  /**
   * Registers a new user with email, password, and display name.
   * Sends a verification email if configured.
   * @param {string} displayName - The user's display name.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   */
  async registerUser(displayName, email, password) {
    try {
      this.is_loading = true

      const verificationSetting = this.config.verification; // Use the correct verification setting
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

      // Sign in the new user to update their profile (Firebase often does this automatically, but explicit can be safer)
      // and to have an authenticated currentUser for profile updates and email verification.
      await signInWithEmailAndPassword(auth, email, password)

      // Update user profile with display name
      // Note: onAuthStateChanged will also update this.current_user.
      // Setting it here provides immediate feedback if needed before onAuthStateChanged fires.
      this.current_user = {
        ...this.current_user, 
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

  /**
   * Sends a password reset link to the user's email.
   * @param {string} email - The email address to send the reset link to.
   */
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

  /**
   * Signs out the current user.
   */
  async signOut() {
    try {
      const debug = this.config.debug
      const auth = getAuth(this.config.firebase)

      if (debug) console.log("[ auth guard ]: signOut request")

      await signOut(auth)

      // Clear user data from store.
      // Note: onAuthStateChanged will also handle this.
      this.current_user = null

      return Promise.resolve()
    } catch (error) {
      this.error = error
      return Promise.reject(error)
    }
  },

  /**
   * Toggles the visibility of the authentication dialog.
   * @param {boolean} [value] - Optional. Explicitly set visibility (true for show, false for hide).
   */
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

  /**
   * Sends a verification email to the currently authenticated user.
   */
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

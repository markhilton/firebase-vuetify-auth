import {
  getAuth,
  signOut,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signInWithRedirect,
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
  initializeGuard() {
    const debug = this.config.debug
    const user = getAuth(this.config.firebase).currentUser

    if (debug) console.log("[ auth guard ]: component initialization")

    if (user) {
      const { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } = user
      const currentUser = { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL }
      this.current_user = { ...currentUser }
    } else this.current_user = null
  },

  //
  loginWithEmail({ email, password }) {
    return new Promise(async (resolve, reject) => {
      try {
        const auth = getAuth(this.config.firebase)
        // const router = useRouter()

        this.is_loading = true

        await signOut(auth)

        // set session persistence
        if (this.config.session === "browser") {
          await setPersistence(auth, browserSessionPersistence)
        } else {
          await setPersistence(auth, browserLocalPersistence)
        }

        await signInWithEmailAndPassword(auth, email, password)

        // this is needed to reload route that was not loaded if user was not authenticated
        // if (router.currentRoute.name === null) router.push(router.currentRoute.path).catch(() => {})

        this.is_loading = false

        return resolve()
      } catch (error) {
        this.error = error
        this.is_loading = false

        return reject()
      }
    })
  },

  //
  loginWithGoogle() {
    const provider = new GoogleAuthProvider()
    const auth = getAuth(this.config.firebase)

    // useDeviceLanguage(auth)
    signInWithRedirect(auth, provider)
  },

  //
  loginWithFacebook() {
    const provider = new FacebookAuthProvider()
    const auth = getAuth(this.config.firebase)

    // useDeviceLanguage(auth)
    signInWithRedirect(auth, provider)
  },

  //
  loginWithPhone() {},

  loginWithSaml() {
    const provider = new SAMLAuthProvider(this.config.saml_provider_id)
    const auth = getAuth(this.config.firebase)

    // provider.addScope("profile")

    signInWithRedirect(auth, provider)
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
    } catch (error) {
      this.error = error
      this.is_loading = false
    }
  },

  //
  async confirmCode(confirmationCode) {
    try {
      this.is_loading = true

      console.log("confirmationCode", confirmationCode.join())

      await this.text_confirmation.confirm(confirmationCode.join())

      this.is_loading = false
      this.sign_by_phone_step = 1
    } catch (error) {
      this.error = error
      this.is_loading = false
      this.sign_by_phone_step = 1
    }
  },

  //
  async registerUser(displayName, email, password) {
    try {
      this.is_loading = true

      const verification = this.config.email
      const auth = getAuth(this.config.firebase)
      await createUserWithEmailAndPassword(auth, email, password)
      await signInWithEmailAndPassword(auth, email, password)

      this.current_user.displayName = displayName

      await updateProfile(auth.currentUser, { displayName })

      const domain = "XXX" // TODO: temp fix

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

      this.error = false
      this.is_loading = false
      this.is_email_reset_password_link_sent = true
    } catch (error) {
      this.error = error
      this.is_loading = false
    }
  },

  //
  signOut() {
    const debug = this.config.debug
    const auth = getAuth(this.config.firebase)

    if (debug) console.log("[ auth guard ]: signOut request")

    return signOut(auth)
  },

  //
  sendVerificationEmail() {
    return new Promise(async (resolve, reject) => {
      try {
        this.is_loading = true

        const auth = getAuth(this.config.firebase)

        await sendEmailVerification(auth.currentUser)

        this.is_loading = false
        this.is_email_verification_link_sent = true

        return resolve()
      } catch (error) {
        this.error = error
        this.is_loading = false

        return reject()
      }
    })
  },
}

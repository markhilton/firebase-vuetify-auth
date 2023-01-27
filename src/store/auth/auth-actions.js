import Vue from "vue"
import { GoogleAuthProvider, FacebookAuthProvider, SAMLAuthProvider } from "firebase/auth"
import authcheck from "../../components/authcheck"
import {
  getAuth,
  signOut,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signInWithRedirect,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} from "firebase/auth"

export default {
  authGuardOnRouterReady({ getters, commit }) {
    const debug = Vue.prototype.$authGuardDebug
    const router = Vue.prototype.$authGuardRouter
    const auth = getAuth(Vue.prototype.$authGuardFirebaseApp)

    if (debug) console.log("[ auth guard ]: revalidate when vue router ready")

    // check current route when router is ready
    router.onReady(() => {
      const isAuthenticated = auth.currentUser ? true : false
      const isCurrentRoutePublic = getters.isRoutePublic

      if (debug) {
        console.log(
          "[ auth guard ]: vue router READY! isCurrentRoutePublic: [",
          isCurrentRoutePublic,
          "] isAuthenticated: [",
          isAuthenticated,
          "]"
        )
      }

      if (isCurrentRoutePublic) {
        commit("SET_AUTH_GUARD_DIALOG_SHOWN", false)
        commit("SET_AUTH_GUARD_DIALOG_PERSISTENT", false)
      } else if (!isAuthenticated) {
        commit("SET_AUTH_GUARD_DIALOG_SHOWN", true)
        commit("SET_AUTH_GUARD_DIALOG_PERSISTENT", true)
      }
    })
  },

  //
  initializeGuard({ state, commit, dispatch }) {
    const config = state.config
    const debug = Vue.prototype.$authGuardDebug
    const user = getAuth(Vue.prototype.$authGuardFirebaseApp).currentUser

    if (user) {
      const { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } = user
      const currentUser = { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL }
      commit("SET_CURRENT_USER", { ...currentUser })
    } else commit("SET_CURRENT_USER", null)

    if (debug) console.log("[ auth guard ]: component initialized for user: [", user ? user.uid : null, "]")

    commit("SET_CONFIG", null) // have to commit null to make firebase auth reactive
    commit("SET_CONFIG", config)
    commit("SET_EMAIL_VERIFICATION_SCREEN_SHOWN", false)

    authcheck()

    dispatch("authGuardOnRouterReady") // revalidate auth guard for vue router
  },

  //
  loginWithEmail({ state, commit }, { email, password }) {
    return new Promise(async (resolve, reject) => {
      try {
        const auth = getAuth(Vue.prototype.$authGuardFirebaseApp)
        const router = Vue.prototype.$authGuardRouter

        commit("SET_LOADING", true)

        await signOut(auth)

        // set session persistence
        if (Vue.prototype.$authGuardSession === "browser") {
          await setPersistence(auth, browserSessionPersistence)
        } else {
          await setPersistence(auth, browserLocalPersistence)
        }

        await signInWithEmailAndPassword(auth, email, password)

        // this is needed to reload route that was not loaded if user was not authenticated
        if (router.currentRoute.name === null) router.push(router.currentRoute.path).catch(() => {})

        commit("SET_LOADING", false)

        return resolve()
      } catch (error) {
        commit("SET_ERROR", error)
        commit("SET_LOADING", false)

        return reject()
      }
    })
  },

  //
  loginWithGoogle({ state }) {
    const provider = new GoogleAuthProvider()
    const auth = getAuth(Vue.prototype.$authGuardFirebaseApp)

    // useDeviceLanguage(auth)
    signInWithRedirect(auth, provider)
  },

  //
  loginWithFacebook({ state }) {
    const provider = new FacebookAuthProvider()
    const auth = getAuth(Vue.prototype.$authGuardFirebaseApp)

    // useDeviceLanguage(auth)
    signInWithRedirect(auth, provider)
  },

  //
  loginWithPhone({ state }) {},

  loginWithSaml({ state }) {
    const provider = new SAMLAuthProvider(state.config.saml_provider_id)
    const auth = getAuth(Vue.prototype.$authGuardFirebaseApp)

    // provider.addScope("profile")

    signInWithRedirect(auth, provider)
  },

  //
  async textPhoneVerificationCode({ state, commit }, { phoneNumber, recaptchaVerifier }) {
    try {
      commit("SET_LOADING", true)
      commit("SET_PHONE_TEXT_CONFIRMATION", null)

      const phone = "+1" + phoneNumber.replace(/\D/g, "")
      const auth = getAuth(Vue.prototype.$authGuardFirebaseApp)
      const confirmationResult = await signInWithPhoneNumber(auth, phone, recaptchaVerifier)

      commit("SET_LOADING", false)
      commit("SET_SIGN_BY_PHONE_STEP", 2)
      commit("SET_PHONE_TEXT_CONFIRMATION", confirmationResult)
    } catch (error) {
      commit("SET_ERROR", error)
      commit("SET_LOADING", false)
    }
  },

  //
  async confirmCode({ state, commit }, confirmationCode) {
    try {
      commit("SET_LOADING", true)

      console.log("confirmationCode", confirmationCode.join())

      await state.text_confirmation.confirm(confirmationCode.join())

      commit("SET_LOADING", false)
      commit("SET_SIGN_BY_PHONE_STEP", 1)
    } catch (error) {
      commit("SET_ERROR", error)
      commit("SET_LOADING", false)
      commit("SET_SIGN_BY_PHONE_STEP", 1)
    }
  },

  //
  async registerUser({ state, commit }, { displayName, email, password }) {
    try {
      commit("SET_LOADING", true)

      const verification = state.config.email
      const auth = getAuth(Vue.prototype.$authGuardFirebaseApp)

      await createUserWithEmailAndPassword(auth, email, password)
      await signInWithEmailAndPassword(auth, email, password)
      await updateProfile(auth.currentUser, { displayName })

      // send email to verify user email address if config option is not set to false
      if (verification === true || (Array.isArray(verification) && verification.includes(domain))) {
        await sendEmailVerification(auth.currentUser)
      }

      commit("SET_LOADING", false)
    } catch (error) {
      commit("SET_ERROR", error)
      commit("SET_LOADING", false)
    }
  },

  async emailPasswordResetLink({ state, commit }, email) {
    try {
      commit("SET_LOADING", true)

      const auth = getAuth(Vue.prototype.$authGuardFirebaseApp)

      await sendPasswordResetEmail(auth, email)

      commit("SET_ERROR", false)
      commit("SET_LOADING", false)
      commit("SET_EMAIL_PASSWORD_RESET_LINK_SENT", true)
    } catch (error) {
      commit("SET_ERROR", error)
      commit("SET_LOADING", false)
    }
  },

  //
  signOut({ state }) {
    const debug = Vue.prototype.$authGuardDebug
    const auth = getAuth(Vue.prototype.$authGuardFirebaseApp)

    if (debug) console.log("[ auth guard ]: signOut request")

    return signOut(auth)
  },

  //
  sendVerificationEmail({ state, commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        commit("SET_LOADING", true)

        const auth = getAuth(Vue.prototype.$authGuardFirebaseApp)

        await sendEmailVerification(auth.currentUser)

        commit("SET_LOADING", false)
        commit("SET_EMAIL_VERIFICATION_LINK_SENT", true)

        return resolve()
      } catch (error) {
        commit("SET_ERROR", error)
        commit("SET_LOADING", false)

        return reject()
      }
    })
  },
}

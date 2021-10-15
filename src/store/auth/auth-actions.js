import Vue from "vue"
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth"
import authcheck from "../../components/authcheck"
import {
  getAuth,
  signOut,
  updateProfile,
  setPersistence,
  browserSessionPersistence,
  signInWithRedirect,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} from "firebase/auth"

export default {
  authGuardOnRouterReady({ state, getters, commit }) {
    const { debug } = state.config
    const router = Vue.prototype.$authGuardRouter
    const auth = getAuth(Vue.prototype.$authGuardFirebaseApp)

    if (debug) console.log("[ auth guard ]: revalidate when vue router ready")

    // check current route when router is ready
    router.onReady(() => {
      const isAuthenticated = auth.currentUser ? true : false
      const isCurrentRoutePublic = getters.isCurrentRoutePublic

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
    const { debug } = config
    const auth = getAuth(Vue.prototype.$authGuardFirebaseApp)
    const user = auth.currentUser

    if (debug) console.log("[ auth guard ]: component initialized for user: [", user, "]")

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

        commit("SET_LOADING", true)

        await signOut(auth)
        await setPersistence(auth, browserSessionPersistence)
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
    const { debug } = state.config
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

import firebaseProvider from "firebase/app"
import authcheck from "../../components/authcheck"

export default {
  revalidateAuthGuard({ state, getters, commit }) {
    const { router, debug } = state.config

    if (debug) console.log("[ auth guard ]: revalidate request after state change")

    // check current route when router is ready
    router.onReady(() => {
      if (debug)
        console.log("[ auth guard ]: vue router ready, isCurrentRoutePublic: [", getters.isCurrentRoutePublic, "]")

      if (getters.isCurrentRoutePublic) {
        commit("SET_AUTH_GUARD_DIALOG_SHOWN", false)
        commit("SET_AUTH_GUARD_DIALOG_PERSISTENT", false)
      } else if (!getters.isAuthenticated) {
        if (debug) console.log("[ auth guard ]: isAuthenticated: [", getters.isAuthenticated, "]")

        commit("SET_AUTH_GUARD_DIALOG_SHOWN", true)
        commit("SET_AUTH_GUARD_DIALOG_PERSISTENT", true)
      }
    })
  },

  //
  onAuthStateChanged({ state, commit, dispatch }) {
    const { firebase, debug } = state.config

    // important to use onAuthStateChanged to mutate config state
    // in order to prevent vuex from not recognizing firebase changes
    firebase.auth().onAuthStateChanged(() => {
      if (debug) console.log("[ auth guard ]: firebase auth state changed")

      const config = state.config

      commit("SET_CONFIG", null)
      commit("SET_CONFIG", config)
      commit("SET_EMAIL_VERIFICATION_SCREEN_SHOWN", false)

      authcheck()
      dispatch("revalidateAuthGuard")
    })
  },

  //
  loginWithEmail({ state, commit }, { email, password }) {
    return new Promise(async (resolve, reject) => {
      try {
        commit("SET_LOADING", true)

        const { router, firebase } = state.config

        // set user session persistance
        // https://firebase.google.com/docs/auth/web/auth-state-persistence
        const persistance = state.is_session_persistant ? "local" : "session"

        await firebase.auth().signOut()
        await firebase.auth().setPersistence(persistance)
        await firebase.auth().signInWithEmailAndPassword(email, password)

        // this is needed to reload route that was not loaded if user was not authenticated
        if (router.currentRoute.name === null) router.push(router.currentRoute.path)

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
    const { firebase } = state.config

    const provider = new firebaseProvider.auth.GoogleAuthProvider()

    firebase.auth().useDeviceLanguage()
    firebase.auth().signInWithRedirect(provider)
  },

  //
  loginWithFacebook({ state }) {
    const { firebase } = state.config
    const provider = new firebaseProvider.auth.FacebookAuthProvider()

    firebase.auth().useDeviceLanguage()
    firebase.auth().signInWithRedirect(provider)
  },

  //
  loginWithPhone({ state }) {
    const { firebase } = state.config

    // Turn off phone auth app verification.
    firebase.auth().settings.appVerificationDisabledForTesting = true
  },

  //
  async textPhoneVerificationCode({ state, commit }, { phoneNumber, recaptchaVerifier }) {
    try {
      commit("SET_LOADING", true)
      commit("SET_PHONE_TEXT_CONFIRMATION", null)

      const { firebase } = state.config

      // TESTING: turn on for testing on localhost
      if (window.location.hostname === "localhost") {
        firebase.auth().settings.appVerificationDisabledForTesting = true
        console.log("TESTING: setting firebase appVerificationDisabledForTesting", true)
      }

      const phone = "+1" + phoneNumber.replace(/\D/g, "")
      const confirmationResult = await firebase.auth().signInWithPhoneNumber(phone, recaptchaVerifier)

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

      const { firebase } = state.config
      const verification = state.config.email

      await firebase.auth().createUserWithEmailAndPassword(email, password)
      await firebase.auth().signInWithEmailAndPassword(email, password)
      await firebase.auth().currentUser.updateProfile({ displayName })

      // send email to verify user email address if config option is not set to false
      if (verification === true || (Array.isArray(verification) && verification.includes(domain))) {
        await firebase.auth().currentUser.sendEmailVerification()
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

      const { firebase } = state.config

      await firebase.auth().sendPasswordResetEmail(email)

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
    const { firebase } = state.config
    return firebase.auth().signOut()
  },

  //
  sendVerificationEmail({ state, commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        commit("SET_LOADING", true)

        const { firebase } = state.config

        await firebase.auth().currentUser.sendEmailVerification()

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

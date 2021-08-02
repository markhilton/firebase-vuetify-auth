import firebaseProvider from "firebase/app"

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
  sendCode({ state }, {}) {
    const { firebase } = state.config

    firebase
      .auth()
      .signInWithPhoneNumber("+1" + phoneNumber, this.recaptchaVerifier)
      .then((res) => {
        this.step = 3
        this.codeAuth = res
      })
      .catch((error) => {
        this.step = 1
      })
  },

  //
  confirmCode() {
    this.codeAuth.confirm(this.confirmationCode).then(() => (this.step = 1))
  },

  //
  async registerUser({ state, getters, commit }, { displayName, email, password }) {
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

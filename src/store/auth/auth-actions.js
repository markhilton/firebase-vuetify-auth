import firebaseProvider from "firebase/app"
import debug from "../../components/authentication/debug"
import authcheck from "../../components/authentication/authcheck"

export default {
  revalidateAuthGuard({ state, getters, commit }) {
    debug("[ auth guard ]: revalidate request after state change")

    const { router } = state.config

    authcheck()

    // check current route when router is ready
    router.onReady(() => {
      debug("[ auth guard ]: vue router ready")
      debug("[ auth guard ]: isCurrentRoutePublic: [", getters.isCurrentRoutePublic, "]")

      if (getters.isCurrentRoutePublic) {
        commit("SET_AUTH_GUARD_DIALOG_SHOWN", false)
        commit("SET_AUTH_GUARD_DIALOG_PERSISTENT", false)
      } else if (!getters.isAuthenticated) {
        debug("[ auth guard ]: isAuthenticated: [", getters.isAuthenticated, "]")

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

      await firebase.auth().createUserWithEmailAndPassword(email, password)
      await firebase.auth().signInWithEmailAndPassword(email, password)
      await firebase.auth().currentUser.updateProfile({ displayName })

      if (getters.isEmailVerificationRequired) await firebase.auth().currentUser.sendEmailVerification()

      commit("SET_LOADING", false)
    } catch (error) {
      commit("SET_ERROR", error)
      commit("SET_LOADING", false)
    }
  },

  emailPasswordResetLink() {
    this.resetPassword = true
    this.tab = 1
    // const auth = firebase.auth();
    // const emailAddress = "user@example.com";

    // auth.sendPasswordResetEmail(emailAddress).then(function() {
    //   // Email sent.
    // }).catch(function(error) {
    //   // An error happened.
    // });
  },

  //
  signOut({ state }) {
    const { firebase } = state.config
    return firebase.auth().signOut()
  },

  //
  sendVerificationEmail({ state }) {
    return new Promise(async (resolve, reject) => {
      try {
        commit("SET_LOADING", true)

        const { firebase } = state.config

        await firebase.auth().currentUser.sendEmailVerification()

        commit("SET_LOADING", false)

        return resolve()
      } catch (error) {
        commit("SET_ERROR", error)
        commit("SET_LOADING", false)

        return reject()
      }
    })
  },
}

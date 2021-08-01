import debug from "../../components/authentication/debug"

export default {
  authGuardInit({ state, getters, commit }) {
    debug("[ auth guard ]: initialization")

    const { router } = state.config

    // check current route when router is ready
    router.onReady(() => {
      debug("[ auth guard ]: vue router ready")

      commit("SET_AUTH_GUARD_DIALOG_PERSISTENT", !getters.isCurrentRoutePublic)

      // run authCheck only if on non public route
      // hide login dialog for public routes
      if (this.isCurrentRoutePublic) {
        commit("SET_AUTH_GUARD_DIALOG_SHOWN", false)
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
  async registerUser({ state, getters, commit }, { email, password, displayName }) {
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

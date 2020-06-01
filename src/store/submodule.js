import firebase from "@/middleware/firebase"

export default {
  namespaced: true,

  state: {
    error: null,
    progress: false,
    user: null,
    layout: false,
    authenticated: false,
    passwordResetEmail: null,
  },

  getters: {
    error(state) {
      return state.error
    },
    progress(state) {
      return state.progress
    },
    user(state) {
      return state.user
    },
    authenticated(state) {
      return state.authenticated
    },
    passwordResetEmail(state) {
      return state.passwordResetEmail
    },
  },

  mutations: {
    setError(state, value) {
      state.error = value
    },
    setProgress(state, value) {
      state.progress = value
    },
    setUser(state, value) {
      state.user = value
    },
    setLayout(state, value) {
      state.layout = value
    },
    setAuthenticated(state, value) {
      state.authenticated = value
    },
    setPasswordResetEmail(state, value) {
      state.passwordResetEmail = value
    },
  },

  /**
   * asynchronous actions
   *
   */
  actions: {
    /**
     * register new user account
     */
    async register({ commit, dispatch }, login) {
      try {
        commit("setError", null)
        commit("setProgress", true)

        await firebase.auth().createUserWithEmailAndPassword(login.email, login.password)

        dispatch("sendEmailVerification")

        await firebase.auth().signInWithEmailAndPassword(login.email, login.password)
        await firebase.auth().currentUser.updateProfile({ displayName: login.name })

        commit("setError", null)
        commit("setProgress", false)
      } catch (error) {
        commit("setError", error)
        commit("setProgress", false)
      }
    },

    /**
     * log out user from the app
     */
    signOut({ commit }) {
      commit("setAuthenticated", false)
      firebase.auth().signOut()
    },

    /**
     * invoken every time when user auth status changes
     */
    async authStateChanged({ commit }, user) {
      const authenticated = user && user.uid ? true : false
      const account = JSON.parse(JSON.stringify(user))

      console.log("authStateChanged:", authenticated ? "authenticated user ID: " + user.uid : "NOT authenticated")

      commit("setUser", account)
      commit("setAuthenticated", authenticated)
    },

    passwordEmail({ commit }, email) {
      commit("setProgress", true)

      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          commit("clearError")
          commit("setProgress", false)
          commit("setSnackBar", "Password reset email has been sent!")
        })
        .catch(error => {
          commit("setError", error)
          commit("setProgress", false)
        })
    },

    passwordReset({ commit }, code) {
      commit("setProgress", true)

      firebase
        .auth()
        .verifyPasswordResetCode(code)
        .then(email => {
          commit("clearError")
          commit("setProgress", false)
          commit("setPasswordResetEmail", email)
        })
        .catch(error => {
          commit("setError", error)
          commit("setProgress", false)
        })
    },

    confirmPasswordReset({ commit }, payload) {
      commit("setProgress", true)

      firebase
        .auth()
        .confirmPasswordReset(payload.code, payload.password)
        .then(() => {
          commit("clearError")
          commit("setProgress", false)
          commit("setSnackBar", "Your password has been updated!")
        })
        .catch(error => {
          commit("setError", error)
          commit("setProgress", false)
        })
    },

    sendEmailVerification({ commit }) {
      const user = firebase.auth().currentUser

      if (user) {
        user.sendEmailVerification()
        commit("setSnackBar", "Check your email to verify account!")
      }
    },

    /**
     * verify user account email address
     * required for all admin accounts to access app
     * @param {Object} commit
     * @param {String} actionCode
     */
    verifyEmail({ commit }, actionCode) {
      firebase
        .auth()
        .applyActionCode(actionCode)
        .then(() => {
          // BUG: https://stackoverflow.com/questions/51915102/reloading-current-user-doesnt-refresh-emailverified-state-in-firebase-authentic
          // IMPORTANT: https://github.com/flutter/flutter/issues/20390
          firebase.auth().currentUser.reload()

          commit("setAccount", firebase.auth().currentUser)
          commit("setSnackBar", "Your email has been verified!")
        })
        .catch(error => {
          commit("setError", error)
        })
    },
  },
}

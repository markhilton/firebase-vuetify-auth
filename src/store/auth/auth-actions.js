import Vue from "vue"
import debug from "@/components/authentication/debug"

export default {
  init({ state, commit, dispatch }) {
    const { router } = state.config

    // commit("isAuthGuardDialogShown", true)

    // check current route when router is ready
    router.onReady(() => {
      debug("[ router ]: READY!")

      const publicRouteCheck = this.isCurrentRoutePublic

      commit("SET_AUTH_GUARD_DIALOG_PERSISTENT", !publicRouteCheck)

      // monitor user auth state
      debug("triggering [ authCheck ] because of onAuthStateChanged!")

      // run authCheck only if on non public route
      if (!publicRouteCheck) dispatch("authCheck")
      // hide login dialog for public routes
      else {
        debug("DISABLING DIALOG")
        commit("SET_AUTH_GUARD_DIALOG_SHOWN", false)
      }
    })
  },

  authCheck({ state, getters, commit }) {
    let allowRoute = false

    const user = getters.currentUser
    const { verification } = state.config

    debug("[ auth guard ]: email verification required: [", verification, "]")

    // anonymous authenticated user
    if (verification && getters.isAnonymous) {
      debug("[ auth guard ]: anonymous user BLOCKED unable to verify email!")

      commit("SET_AUTH_GUARD_DIALOG_SHOWN", true)
      commit("SET_EMAIL_VERIFICATION_REQUIRED", false)
    }

    // authenticated user
    else if (getters.isAuthenticated) {
      debug("[ auth guard ]: authenticated user ID:", user.uid)

      let emailVerified = user.emailVerified || false
      const domain = user.email ? user.email.split("@")[1] : ""

      debug("[ auth guard ]: user email verified: [", emailVerified, "]")

      // check if to show dialog
      allowRoute = emailVerified

      // check if email verification is always required or for some specific email domain(s) only
      if (verification === false || (Array.isArray(verification) && !verification.includes(domain))) {
        debug("[ auth guard ]: user email verified or does not require verification")

        allowRoute = true
      }

      // for authenticated use without verified email
      else {
        debug("[ auth guard ]: user email NOT verified")
      }

      if (allowRoute) {
        commit("SET_AUTH_GUARD_DIALOG_SHOWN", false)
        commit("SET_EMAIL_VERIFICATION_REQUIRED", false)
      } else {
        commit("SET_AUTH_GUARD_DIALOG_SHOWN", true)
        commit("SET_EMAIL_VERIFICATION_REQUIRED", true)
      }
    }

    // not authenticated users get persistent login dialog
    else {
      debug("[ auth guard ]: user NOT authenticated")

      commit("SET_AUTH_GUARD_DIALOG_SHOWN", true)
      commit("SET_EMAIL_VERIFICATION_REQUIRED", false)
    }

    /**
     * this has to handle 3 scenarios:
     * - user is on public route and wants to navigate to protected: (1. block nav, 2. show non persistent dialog)
     * - user opens app on protected route: (1. show persistent dialog)
     *
     */

    debug("[ auth check ]:", allowRoute ? "route ALLOWED!" : "route BLOCKED!")

    return allowRoute
  },

  watchUserData({ commit }) {
    console.log("ok")
  },

  //
  loginWithEmail({ commit }, { email, password }) {
    return new Promise(async (resolve, reject) => {
      try {
        commit("IS_LOADING", true)

        await firebase.auth().signOut()
        await firebase.auth().signInWithEmailAndPassword(email, password)

        // this is needed to reload route that was not loaded if user was not authenticated
        if (router.currentRoute.name === null) router.push(router.currentRoute.path)

        commit("IS_LOADING", false)

        return resolve()
      } catch (error) {
        commit("SET_ERROR", error)
        commit("IS_LOADING", false)

        return reject()
      }
    })
  },

  //
  async registerUser({ commit }, { email, password, displayName }) {
    try {
      commit("IS_LOADING", true)

      await firebase.auth().createUserWithEmailAndPassword(email, password)
      await firebase.auth().signInWithEmailAndPassword(email, password)
      await firebase.auth().currentUser.updateProfile({ displayName })
      await firebase.auth().currentUser.sendEmailVerification()

      commit("IS_LOADING", false)
    } catch (error) {
      commit("SET_ERROR", error)
      commit("IS_LOADING", false)
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
  signOut({ getters }) {
    const { firebase } = getters.config
    return firebase.auth().signOut()
  },

  //
  sendVerificationEmail() {
    return new Promise(async (resolve, reject) => {
      try {
        commit("IS_LOADING", true)

        await firebase.auth().currentUser.sendEmailVerification()

        commit("IS_LOADING", false)

        return resolve()
      } catch (error) {
        commit("SET_ERROR", error)
        commit("IS_LOADING", false)

        return reject()
      }
    })
  },
}

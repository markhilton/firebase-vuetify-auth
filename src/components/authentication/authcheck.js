import store from "../../store"
import debug from "./debug"

export default () => {
  let allowRoute = false

  const settings = store.getters["auth/getConfig"]
  const { firebase, verification } = settings
  const { currentUser } = firebase.auth()
  const isAuthenticated = currentUser ? true : false

  debug("[ auth guard ]: email verification required: [", verification, "]")

  // anonymous authenticated currentUser
  if (verification && currentUser && currentUser.isAnonymous) {
    debug("[ auth guard ]: anonymous currentUser BLOCKED unable to verify email!")

    store.commit("auth/SET_AUTH_GUARD_DIALOG_SHOWN", true)
    store.commit("auth/SET_EMAIL_VERIFICATION_REQUIRED", false)
  }

  // authenticated currentUser
  else if (isAuthenticated) {
    debug("[ auth guard ]: authenticated currentUser ID:", currentUser.uid)

    let emailVerified = currentUser.emailVerified || false
    const domain = currentUser.email ? currentUser.email.split("@")[1] : ""

    debug("[ auth guard ]: currentUser email verified: [", emailVerified, "]")

    // check if to show dialog
    allowRoute = emailVerified

    // check if email verification is always required or for some specific email domain(s) only
    if (verification === false || (Array.isArray(verification) && !verification.includes(domain))) {
      debug("[ auth guard ]: currentUser email verified or does not require verification")

      allowRoute = true
    }

    // for authenticated use without verified email
    else {
      debug("[ auth guard ]: currentUser email NOT verified")
    }

    if (allowRoute) {
      store.commit("auth/SET_AUTH_GUARD_DIALOG_SHOWN", false)
      store.commit("auth/SET_EMAIL_VERIFICATION_REQUIRED", false)
    } else {
      store.commit("auth/SET_AUTH_GUARD_DIALOG_SHOWN", true)
      store.commit("auth/SET_EMAIL_VERIFICATION_REQUIRED", true)
    }
  }

  // not authenticated currentUsers get persistent login dialog
  else {
    debug("[ auth guard ]: currentUser NOT authenticated")

    store.commit("auth/SET_AUTH_GUARD_DIALOG_SHOWN", true)
    store.commit("auth/SET_EMAIL_VERIFICATION_REQUIRED", false)
  }

  /**
   * this has to handle 3 scenarios:
   * - currentUser is on public route and wants to navigate to protected: (1. block nav, 2. show non persistent dialog)
   * - currentUser opens app on protected route: (1. show persistent dialog)
   *
   */

  debug("[ auth check ]:", allowRoute ? "route ALLOWED!" : "route BLOCKED!")

  return allowRoute
}

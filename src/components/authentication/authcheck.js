import debug from "./debug"
import store from "../../store"

export default () => {
  debug("[ auth check ]: execution started...")

  let allowRoute = false // default state

  const currentUser = store.getters["auth/getCurrentUser"]
  const isAuthenticated = store.getters["auth/isAuthenticated"]
  const verification = store.getters["auth/isEmailVerificationRequired"]

  debug("[ auth check ]: email verification required: [", verification, "]")

  // anonymous authenticated currentUser
  if (verification && currentUser && currentUser.isAnonymous) {
    debug("[ auth check ]: anonymous user BLOCKED unable to verify email!")

    store.commit("auth/SET_AUTH_GUARD_DIALOG_SHOWN", true)
    store.commit("auth/SET_AUTH_GUARD_DIALOG_PERSISTENT", false)
  }

  // authenticated currentUser
  else if (isAuthenticated) {
    debug("[ auth check ]: authenticated currentUser ID: [", currentUser.uid, "]")

    let emailVerified = currentUser.emailVerified || false
    const domain = currentUser.email ? currentUser.email.split("@")[1] : ""

    debug("[ auth check ]: user email verified: [", emailVerified, "]")

    // check if to show dialog
    allowRoute = emailVerified

    // check if email verification is always required or for some specific email domain(s) only
    if (verification === false) {
      debug("[ auth check ]: authguard config does not require email verification")

      allowRoute = true
    } else if (Array.isArray(verification) && !verification.includes(domain)) {
      debug(
        "[ auth check ]: user email domain: [",
        domain,
        "] not included on domain list that requires email verification to authenticate:",
        verification,
      )

      allowRoute = true
    } else {
      debug("[ auth check ]: authguard config requires email verification")
    }

    if (allowRoute) {
      store.commit("auth/SET_AUTH_GUARD_DIALOG_SHOWN", false)
      store.commit("auth/SET_AUTH_GUARD_DIALOG_PERSISTENT", false)
    } else {
      store.commit("auth/SET_AUTH_GUARD_DIALOG_SHOWN", true)
      store.commit("auth/SET_AUTH_GUARD_DIALOG_PERSISTENT", true)
    }
  }

  // not authenticated currentUsers get persistent login dialog
  else {
    debug("[ auth check ]: currentUser is NOT authenticated")

    store.commit("auth/SET_AUTH_GUARD_DIALOG_SHOWN", true)
    store.commit("auth/SET_AUTH_GUARD_DIALOG_PERSISTENT", false)
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

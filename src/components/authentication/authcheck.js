import Vue from "vue"
import debug from "./debug"

export default () => {
  let allowRoute = false

  const settings = Vue.prototype.$authGuardSettings
  const firebase = settings.firebase || null
  const user = firebase.auth().currentUser
  const isAuthenticated = user && user.uid ? true : false
  const verification = typeof settings.verification !== "undefined" ? settings.verification : true

  debug("[ auth guard ]: email verification required: [", verification, "]")

  if (isAuthenticated) {
    debug("[ auth guard ]: authenticated user ID:", user.uid)

    let emailVerified = user.emailVerified || false
    const domain = user.email.split("@")[1]

    debug("[ auth guard ]: user email verified: [", emailVerified, "]")

    // check if email verification is always required or for some specific email domain(s) only
    if (verification === false || (Array.isArray(verification) && !verification.includes(domain))) {
      debug("[ auth guard ]: user email verified or does not require verification")

      allowRoute = true
    }

    // for authenticated use without verified email
    else {
      debug("[ auth guard ]: user email NOT verified")
    }

    // check if to show dialog
    allowRoute = emailVerified

    if (allowRoute) {
      Vue.prototype.$authGuardSettings.showAuthGuardDialog = false
      Vue.prototype.$authGuardSettings.emailVerificationRequired = false
    } else {
      Vue.prototype.$authGuardSettings.showAuthGuardDialog = true
      Vue.prototype.$authGuardSettings.emailVerificationRequired = true
    }
  }

  // not authenticated users get persistent login dialog
  else {
    debug("[ auth guard ]: user NOT authenticated")

    Vue.prototype.$authGuardSettings.showAuthGuardDialog = true
    Vue.prototype.$authGuardSettings.emailVerificationRequired = false
  }

  /**
   * this has to handle 3 scenarios:
   * - user is on public route and wants to navigate to protected: (1. block nav, 2. show non persistent dialog)
   * - user opens app on protected route: (1. show persistent dialog)
   *
   */

  debug("[ auth check ]:", allowRoute ? "route ALLOWED!" : "route BLOCKED!")

  return allowRoute
}

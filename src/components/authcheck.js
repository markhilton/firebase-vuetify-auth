import Vue from "vue"
import { getAuth } from "firebase/auth"

const debug = (...text) => {
  const store = Vue.prototype.$authGuardStore
  const debug = Vue.prototype.$authGuardDebug

  if (!Boolean(debug)) return

  console.log.apply(console, text)
}

export default () => {
  debug("[ auth check ]: execution started...")

  let allowRoute = false // default state

  const auth = getAuth(Vue.prototype.$authGuardFirebaseApp)
  const store = Vue.prototype.$authGuardStore
  const currentUser = auth.currentUser
  const isAuthenticated = currentUser ? true : false
  const verification = store.state.auth.config.verification

  if (verification) debug("[ auth check ]: email verification required: [", verification, "]")

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
        verification
      )

      allowRoute = true
    } else {
      debug("[ auth check ]: authguard config requires email verification")
      store.commit("auth/SET_EMAIL_VERIFICATION_SCREEN_SHOWN", true)
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
    store.commit("auth/SET_AUTH_GUARD_DIALOG_PERSISTENT", true) // added v0.5.6 because on log out the dialog was not persistent
  }

  debug("[ auth check ]: is route ALLOWED: [", allowRoute, "]")

  return allowRoute
}

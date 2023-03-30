import { getAuth } from "firebase/auth"
import { useAuthStore } from "@/store/auth"

const debug = (...text) => {
  const store = useAuthStore()
  const debug = store.config.debug

  if (!debug) return

  console.log.apply(console, text)
}

export default () => {
  const store = useAuthStore()

  debug("[ auth check ]: execution started...")

  let allowRoute = false // default state

  const auth = getAuth(store.config.firebase)
  const currentUser = auth.currentUser
  const isAuthenticated = currentUser ? true : false
  const verification = store.config.verification
  const isRoutePublic = store.is_route_public
  const fromPublicToAuth = store.is_from_public_to_auth
  if (verification) debug("[ auth check ]: email verification required: [", verification, "]")

  // anonymous authenticated currentUser
  if (verification && currentUser && currentUser.isAnonymous) {
    debug("[ auth check ]: anonymous user BLOCKED unable to verify email!")

    store.is_authguard_dialog_shown = true
    store.is_authguard_dialog_persistent = false
  }

  // not show login dialog if page is public
  else if (isRoutePublic) {
    allowRoute = true
    store.is_authguard_dialog_shown = false
    store.is_authguard_dialog_persistent = false
  } else if (!isRoutePublic && fromPublicToAuth && !isAuthenticated) {
    store.is_authguard_dialog_shown = true
    store.is_authguard_dialog_persistent = false
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
      store.error = null
      store.is_email_verification_screen_shown = true
    }

    if (allowRoute) {
      store.is_authguard_dialog_shown = false
      store.is_authguard_dialog_persistent = false
    } else {
      store.is_authguard_dialog_shown = true

      if (fromPublicToAuth) {
        store.is_authguard_dialog_persistent = false
      } else store.is_authguard_dialog_persistent = true
    }
  }

  // not authenticated currentUsers get persistent login dialog
  else {
    debug("[ auth check ]: currentUser is NOT authenticated")

    store.is_authguard_dialog_shown = true
    store.is_authguard_dialog_persistent = false
    // added v0.5.6 because on log out the dialog was not persistent
  }

  debug("[ auth check ]: is route ALLOWED: [", allowRoute, "]")

  return allowRoute
}

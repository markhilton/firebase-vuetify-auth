import { useAuthStore } from "../store/auth"
import { getAuth } from "firebase/auth"

const debug = (...text) => {
  const store = useAuthStore()
  const isDebug = store.config.debug

  if (!isDebug) return

  console.log(...text)
}

// This function checks the current authentication status and route requirements
// to determine if a route should be allowed and how the auth dialog should behave.
export default () => {
  const store = useAuthStore()

  debug("[ auth check ]: execution started...")

  let allowRoute = false // Default: route is not allowed

  let auth = getAuth(store.config.firebase)

  const currentUser = auth.currentUser
  const isAuthenticated = !!auth.currentUser // Is there an active Firebase user?
  const verification = store.config.verification // Email verification setting from config
  const isRoutePublic = store.is_route_public // Is the current route public?
  const fromPublicToAuth = store.is_from_public_to_auth // Is navigating from a public to a protected route?

  if (verification) debug("[ auth check ]: email verification required: [", verification, "]")

  // Case 1: Anonymous user trying to access a route when email verification is required.
  // Anonymous users cannot verify emails, so they are blocked if verification is on.
  // The dialog should be closable as they might be on a public page trying to access a protected one.
  if (verification && currentUser && currentUser.isAnonymous) {
    debug("[ auth check ]: anonymous user BLOCKED unable to verify email!")
    store.is_authguard_dialog_shown = true
    store.is_authguard_dialog_persistent = false // Allow closing if they were on a public page
  }
  // Case 2: The route is public.
  // Allow access, hide the dialog, and make it non-persistent.
  else if (isRoutePublic) {
    allowRoute = true
    store.is_authguard_dialog_shown = false
    store.is_authguard_dialog_persistent = false
  } 
  // Case 3: Navigating from a public route to a protected route AND user is not authenticated.
  // Show the dialog, but make it non-persistent (closable) so the user can go back to the public page.
  else if (!isRoutePublic && fromPublicToAuth && !isAuthenticated) {
    store.is_authguard_dialog_shown = true
    store.is_authguard_dialog_persistent = false
  }
  // Case 4: User is authenticated.
  else if (isAuthenticated) {
    debug("[ auth check ]: authenticated currentUser ID: [", currentUser.uid, "]")

    let emailVerified = currentUser.emailVerified || false
    const domain = currentUser.email ? currentUser.email.split("@")[1] : ""

    debug("[ auth check ]: user email verified: [", emailVerified, "]")

    // Initially, assume route is allowed if email is verified.
    allowRoute = emailVerified

    // Override allowRoute if email verification is not globally required,
    // or if it's required for specific domains and the user's domain is not one of them.
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
    }

    // Configure dialog based on whether the route is allowed.
    if (allowRoute) {
      store.is_authguard_dialog_shown = false
      store.is_authguard_dialog_persistent = false
    } else {
      // If route is not allowed (e.g., email not verified but required)
      store.is_authguard_dialog_shown = true
      // If coming from a public page, dialog is closable. Otherwise, it's persistent.
      if (fromPublicToAuth) {
        store.is_authguard_dialog_persistent = false
      } else store.is_authguard_dialog_persistent = true
    }

    // If email is not verified AND verification is required, show the email verification screen.
    // This screen is always persistent until the email is verified or the user signs out.
    if (!emailVerified && verification) {
      debug("[ auth check ]: authguard config requires email verification")
      store.error = null // Clear previous errors
      store.is_email_verification_screen_shown = true
      store.is_authguard_dialog_persistent = true // Verification screen should be persistent
    }
  }
  // Case 5: User is NOT authenticated and is trying to access a protected route.
  // Show a persistent login dialog.
  else {
    debug("[ auth check ]: currentUser is NOT authenticated")
    store.is_authguard_dialog_shown = true
    store.is_authguard_dialog_persistent = true
  }

  debug("[ auth check ]: is route ALLOWED: [", allowRoute, "]")
  return allowRoute
}

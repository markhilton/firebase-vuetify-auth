import { useAuthStore } from "../store/auth"
import { getAuth } from "firebase/auth"

const debug = (...text) => {
  const store = useAuthStore()
  const isDebug = store.config.debug

  if (!isDebug) return

  console.log(...text)
}

/**
 * This function is the core logic for determining route access and dialog behavior.
 * It's called:
 * 1. By the router middleware (`authguard.js`) before each navigation.
 * 2. By the `onAuthStateChanged` listener in `wrapper.js` whenever the Firebase auth state changes.
 *
 * It checks:
 * - If the route is public or requires authentication.
 * - If the user is authenticated.
 * - If email verification is required and if the user's email is verified.
 * - If navigating from a public to a protected route (to make the dialog closable).
 *
 * Based on these checks, it updates the auth store's state for:
 * - `is_authguard_dialog_shown`: Whether the main auth dialog should be visible.
 * - `is_authguard_dialog_persistent`: Whether the dialog should be persistent (not closable by clicking outside).
 * - `is_email_verification_screen_shown`: Whether the specific email verification screen should be shown.
 *
 * @returns {boolean} - True if the route is allowed, false otherwise.
 */
export default () => {
  const store = useAuthStore()

  debug("[ auth check ]: execution started...")

  let allowRoute = false // Default: route is not allowed

  let auth = getAuth(store.config.firebase)

  const currentUser = auth.currentUser
  const isAuthenticated = !!auth.currentUser // Is there an active Firebase user?
  const verification = store.config.verification // Email verification setting from config
  const isRoutePublic = store.is_route_public // Is the current route public? (Set by router middleware)
  const fromPublicToAuth = store.is_from_public_to_auth // Is navigating from a public to a protected route? (Set by router middleware)

  if (verification) debug("[ auth check ]: email verification required by config: [", verification, "]")

  // Scenario 1: Anonymous user when email verification is required.
  // Anonymous users cannot verify emails. If verification is active, they are effectively blocked from protected resources
  // that would require a verified email. The dialog is made non-persistent to allow them to stay on a public page if they were on one.
  if (verification && currentUser && currentUser.isAnonymous) {
    debug("[ auth check ]: Anonymous user detected. Email verification is active. Protected routes requiring verification will be blocked.")
    store.is_authguard_dialog_shown = true // Show dialog if they try to access something protected
    store.is_authguard_dialog_persistent = false // Allow closing if they were on a public page or to sign in with a non-anonymous account
    // `allowRoute` remains false by default, access depends on `isRoutePublic`.
  }
  // Scenario 2: The route is public.
  // Access is always allowed. Hide the dialog.
  else if (isRoutePublic) {
    debug("[ auth check ]: Route is public.")
    allowRoute = true
    store.is_authguard_dialog_shown = false
    store.is_authguard_dialog_persistent = false
  } 
  // Scenario 3: Navigating from a public route to a protected route AND user is NOT authenticated.
  // Show the dialog, but make it non-persistent (closable) so the user can return to the public page.
  else if (!isRoutePublic && fromPublicToAuth && !isAuthenticated) {
    debug("[ auth check ]: Navigating from public to protected route, user not authenticated.")
    store.is_authguard_dialog_shown = true
    store.is_authguard_dialog_persistent = false
    // `allowRoute` remains false.
  }
  // Scenario 4: User is authenticated (not anonymous or anonymous with verification disabled).
  else if (isAuthenticated) {
    debug("[ auth check ]: User is authenticated. UID: [", currentUser.uid, "]")

    let emailVerified = currentUser.emailVerified || false
    const domain = currentUser.email ? currentUser.email.split("@")[1] : ""

    debug("[ auth check ]: User email verified status: [", emailVerified, "]")

    // Determine if the route should be allowed based on email verification status and config.
    if (verification === false) {
      // Email verification is not required by config.
      debug("[ auth check ]: Email verification is NOT required by config.")
      allowRoute = true
    } else if (Array.isArray(verification) && !verification.includes(domain)) {
      // Email verification is required for specific domains, and this user's domain is NOT on the list.
      debug(
        "[ auth check ]: User email domain [", domain, "] is NOT in the verification list: [", verification, "]. Access granted."
      )
      allowRoute = true
    } else {
      // Email verification is required for all (verification === true)
      // OR for specific domains and this user's domain IS on the list.
      // In these cases, access depends on `emailVerified` status.
      if (emailVerified) {
        debug("[ auth check ]: Email is verified, and verification is required (or for this domain). Access granted.")
        allowRoute = true
      } else {
        debug("[ auth check ]: Email is NOT verified, but verification is required (or for this domain). Access denied to protected route.")
        allowRoute = false // Explicitly false, though it's the default
      }
    }

    // Configure dialog based on whether the route is allowed.
    if (allowRoute) {
      store.is_authguard_dialog_shown = false
      store.is_authguard_dialog_persistent = false
      store.is_email_verification_screen_shown = false // Hide verification screen if access is granted
    } else {
      // If route is not allowed (e.g., email not verified but required for this protected route)
      store.is_authguard_dialog_shown = true
      // If coming from a public page, dialog is closable. Otherwise, it's persistent.
      store.is_authguard_dialog_persistent = !fromPublicToAuth;

      // If email is not verified AND verification is generally required (either true or for their domain),
      // show the specific email verification screen.
      if (!emailVerified && (verification === true || (Array.isArray(verification) && verification.includes(domain)))) {
        debug("[ auth check ]: Showing email verification screen.")
        store.error = null // Clear previous errors
        store.is_email_verification_screen_shown = true
        store.is_authguard_dialog_persistent = true // Verification screen should always be persistent
      } else {
        store.is_email_verification_screen_shown = false // Ensure it's hidden if not applicable
      }
    }
  }
  // Scenario 5: User is NOT authenticated and is trying to access a protected route (not covered by scenario 3).
  // This typically means initial load on a protected route or navigation between protected routes while unauthenticated.
  // Show a persistent login dialog.
  else { // !isAuthenticated && !isRoutePublic (implicitly, as other cases for isRoutePublic are handled)
    debug("[ auth check ]: User is NOT authenticated, attempting to access a protected route.")
    store.is_authguard_dialog_shown = true
    store.is_authguard_dialog_persistent = true
    store.is_email_verification_screen_shown = false // Ensure this is hidden
  }

  debug("[ auth check ]: Final route access decision: [", allowRoute, "]")
  debug("[ auth check ]: Dialog shown: [", store.is_authguard_dialog_shown, "], Dialog persistent: [", store.is_authguard_dialog_persistent, "], Email verification screen: [", store.is_email_verification_screen_shown, "]")
  return allowRoute
}

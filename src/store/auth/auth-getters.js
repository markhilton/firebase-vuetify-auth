import { getAuth } from "firebase/auth"
import { getCurrentInstance } from "vue"

const app = getCurrentInstance()

export const getters = {
  getError: (state) => state.error,
  getSessionPersistence: (state) => state.is_session_persistant,
  getCurrentUser: (state) => state.current_user,
  getUid: (state) => state?.current_user?.uid || null,
  getDisplayName: (state) => state?.current_user?.displayName || null,
  getEmail: (state) => state?.current_user?.email || null,
  getPhotoURL: (state) => state?.current_user?.photoURL || null,
  getPhoneNumber: (state) => state?.current_user?.phoneNumber || null,
  getMetadata: () => {
    const user = getAuth(app.config.globalProperties.$authGuardFirebaseApp).currentUser
    return user ? user.metadata : null
  },
  isAuthenticated: (state) => !!state?.current_user,
  isAnonymous: (state) => state?.current_user?.isAnonymous || null,
  isVerified: (state) => state?.current_user?.emailVerified || null,
  isRoutePublic: (state) => state.is_route_public,
  isFromPublicToAuth: (state) => state.is_from_public_to_auth,
  isUserRegistrationAllowed: (state) => state.config.registration,
  isEmailVerificationRequired: (state) => state.config.verification,
  isEmailVerificationScrenShown: (state) => state.is_email_verification_screen_shown,
  isEmailVerificationLinkSent: (state) => state.is_email_verification_link_sent,
  isEmailResetPasswordLinkSent: (state) => state.is_email_reset_password_link_sent,
  isResetPasswordScreenShown: (state) => state.is_reset_password_screen_shown,
  isLoginWithPhoneShown: (state) => state.is_login_with_phone_shown,
  isLoginWithProvidersActive: (state) =>
    state.config.google || state.config.facebook || state.config.phone || state.config.saml,
  isOnlySingleProvider: (state) => {
    let cc = 0
    const check = ["google", "facebook", "phone", "saml"]

    check.forEach((c) => {
      if (state.config[c] === true) cc++
    })

    // to render large button instead icon
    return cc === 1
  },
}

import Vue from "vue"
import { getAuth } from "firebase/auth"

export default {
  getError(state) {
    return state.error
  },
  getSessionPersistence(state) {
    return state.is_session_persistant
  },
  getCurrentUser(state) {
    return state.current_user
  },
  getUid(state, getters) {
    const user = getters.getCurrentUser
    return user ? user && user.uid : null
  },
  getDisplayName(state, getters) {
    const user = getters.getCurrentUser
    return user ? user.displayName : null
  },
  getEmail(state, getters) {
    const user = getters.getCurrentUser
    return user ? user.email : null
  },
  getPhotoURL(state, getters) {
    const user = getters.getCurrentUser
    return user ? user.photoURL : null
  },
  getPhoneNumber(state, getters) {
    const user = getters.getCurrentUser
    return user ? user.phoneNumber : null
  },
  getMetadata(state, getters) {
    const user = getAuth(Vue.prototype.$authGuardFirebaseApp).currentUser
    return user ? user.metadata : null
  },
  isLoading(state) {
    return state.is_loading
  },
  isAuthenticated(state, getters) {
    const user = getters.getCurrentUser
    return user ? true : false
  },
  isAnonymous(state, getters) {
    const user = getters.getCurrentUser
    return user ? user.isAnonymous : null
  },
  isVerified(state, getters) {
    const user = getters.getCurrentUser
    return user ? user.emailVerified : null
  },
  isRoutePublic(state) {
    return state.is_route_public
  },
  isFromPublicToAuth(state) {
    return state.is_from_public_to_auth
  },
  isAuthGuardDialogShown(state) {
    return state.is_authguard_dialog_shown
  },
  isAuthGuardDialogPersistent(state) {
    return state.is_authguard_dialog_persistent
  },
  isUserRegistrationAllowed(state) {
    return state.config.registration
  },
  isEmailVerificationRequired(state) {
    return state.config.verification
  },
  isEmailVerificationScrenShown(state) {
    return state.is_email_verification_screen_shown
  },
  isEmailVerificationLinkSent(state) {
    return state.is_email_verification_link_sent
  },
  isEmailResetPasswordLinkSent(state) {
    return state.is_email_reset_password_link_sent
  },
  isResetPasswordScreenShown(state) {
    return state.is_reset_password_screen_shown
  },
  isLoginWithPhoneShown(state) {
    return state.is_login_with_phone_shown
  },
  isLoginWithProvidersActive(state) {
    return state.config.google || state.config.facebook || state.config.phone || state.config.saml
  },
  isOnlySingleProvider(state) {
    let cc = 0
    const check = ["google", "facebook", "phone", "saml"]

    check.forEach((c) => {
      if (state.config[c] === true) cc++
    })

    // to render large button instead icon
    return cc === 1
  },
}

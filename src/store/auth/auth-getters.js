import debug from "@/components/authentication/debug"

export default {
  getConfig(state) {
    return state.config
  },
  getCurrentUser(state) {
    const { firebase } = state.config
    return firebase.auth().currentUser
  },
  getUid(state, getters) {
    const user = getters.getCurrentUser
    return user ? user.uid : null
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
    const user = getters.getCurrentUser
    return user ? user.metadata : null
  },
  isAuthenticated(state, getters) {
    const user = getters.getCurrentUser
    return user && user.uid ? true : false
  },
  isLoading(state) {
    return state.is_loading
  },
  isAnonymous(state, getters) {
    const user = getters.getCurrentUser
    return user ? user.isAnonymous : null
  },
  isVerified(state, getters) {
    const user = getters.getCurrentUser
    return user ? user.emailVerified : null
  },

  // check if the current route is public to set negative persisten dialog
  isCurrentRoutePublic(state) {
    const { router } = state.config
    const route = router.currentRoute
    const publicRoute = route.matched[0] && typeof route.matched[0].beforeEnter === "undefined" ? true : false

    if (!publicRoute) debug("[ matched route ]:", route.matched[0])

    debug("[ isCurrentRoutePublic ]:", publicRoute)

    return publicRoute
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

  getError(state) {
    return state.error
  },

  isEmailVerificationRequired(state) {
    return state.config.verification
  },
}

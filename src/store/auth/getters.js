export default {
  getUser(state) {
    return state.user
  },
  getError(state) {
    return state.error
  },
  getProgress(state) {
    return state.progress
  },
  getAuthGuard(state) {
    return state.authGuard
  },
  getSnackbar(state) {
    return state.snackbar
  },
  isAuthenticated(state) {
    return state.authenticated
  },
  getPasswordResetEmail(state) {
    return state.passwordResetEmail
  },
}

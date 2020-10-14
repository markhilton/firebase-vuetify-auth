export default {
  SET_ERROR(state, value) {
    state.error = value
  },
  SET_PROGRESS(state, value) {
    state.progress = value
  },
  SET_USER(state, value) {
    state.user = value
  },
  SET_LAYOUT(state, value) {
    state.layout = value
  },
  SET_SNACKBAR(state, value) {
    state.snackbar = value
  },
  SET_AUTH_GUARD(state, value) {
    state.authGuard = value
  },
  SET_AS_AUTHENTICATED(state, value) {
    state.authenticated = value
  },
  SET_PASSWORD_RESET_EMAIL(state, value) {
    state.passwordResetEmail = value
  },
}

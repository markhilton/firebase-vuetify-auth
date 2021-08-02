export default {
  SET_TAB(state, index) {
    state.tab = index
  },
  SET_CONFIG(state, config) {
    state.config = config
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  SET_LOADING(state, status) {
    state.is_login = status
  },
  SET_SESSION_PERSISTANCE(state, status) {
    state.is_session_persistant = status
  },
  SET_AUTH_GUARD_DIALOG_SHOWN(state, status) {
    state.is_authguard_dialog_shown = status
  },
  SET_AUTH_GUARD_DIALOG_PERSISTENT(state, status) {
    state.is_authguard_dialog_persistent = status
  },
  SET_EMAIL_PASSWORD_RESET_LINK_SENT(state, status) {
    state.is_email_reset_password_link_sent = status
  },
  SET_EMAIL_VERIFICATION_LINK_SENT(state, status) {
    state.is_email_verification_link_sent = status
  },
  SET_EMAIL_VERIFICATION_SCREEN_SHOWN(state, status) {
    state.is_email_verification_screen_shown = status
  },
  SET_PASSWORD_RESET_SCREEN_SHOWN(state, status) {
    state.tab = status ? 1 : 0
    state.is_reset_password_screen_shown = status
    if (status === false) state.is_email_reset_password_link_sent = false
  },
}

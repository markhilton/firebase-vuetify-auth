export default {
  SET_TAB: (state, index) => (state.tab = index),
  SET_ERROR: (state, error) => (state.error = error),
  SET_CONFIG: (state, config) => (state.config = config),
  SET_LOADING: (state, status) => (state.is_login = status),
  SET_CURRENT_USER: (state, user) => (state.current_user = user),
  SET_SIGN_BY_PHONE_STEP: (state, step) => (state.sign_by_phone_step = step),
  SET_SESSION_PERSISTANCE: (state, status) => (state.is_session_persistant = status),
  SET_IS_ROUTE_PUBLIC: (state, status) => (state.is_route_public = status),
  SET_IS_FROM_PUBLIC_TO_AUTH: (state, status) => (state.is_from_public_to_auth = status),
  SET_AUTH_GUARD_DIALOG_SHOWN: (state, status) => (state.is_authguard_dialog_shown = status),
  SET_PHONE_TEXT_CONFIRMATION: (state, confirmation) => (state.text_confirmation = confirmation),
  SET_AUTH_GUARD_DIALOG_PERSISTENT: (state, status) => (state.is_authguard_dialog_persistent = status),
  SET_EMAIL_VERIFICATION_LINK_SENT: (state, status) => (state.is_email_verification_link_sent = status),
  SET_EMAIL_PASSWORD_RESET_LINK_SENT: (state, status) => (state.is_email_reset_password_link_sent = status),
  SET_EMAIL_VERIFICATION_SCREEN_SHOWN: (state, status) => {
    state.is_email_verification_screen_shown = status

    if (status === false) state.error = null
  },
  SET_PASSWORD_RESET_SCREEN_SHOWN: (state, status) => {
    state.tab = status ? 1 : 0
    state.is_reset_password_screen_shown = status

    if (status === false) state.is_email_reset_password_link_sent = false
  },
  SET_SHOW_LOGIN_WITH_PHONE: (state, status) => {
    state.tab = 0 // reset tab to Sign In
    state.is_login_with_phone_shown = status

    if (status === false) state.sign_by_phone_step = 1 // reset sign by phone step
  },
}

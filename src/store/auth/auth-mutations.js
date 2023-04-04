export default {
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

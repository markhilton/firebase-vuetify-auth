import Vue from "vue"

export default {
  SET_CONFIG(state, config) {
    state.config = config
  },

  SET_AUTH_GUARD_DIALOG_SHOWN(state, status) {
    state.is_authguard_dialog_shown = status
  },

  SET_AUTH_GUARD_DIALOG_PERSISTENT(state, status) {
    state.is_authguard_dialog_persistent = status
  },

  SET_EMAIL_VERIFICATION_REQUIRED(state, status) {
    state.is_authguard_dialog_persistent = status
  },

  SET_USER(state, user) {
    state.user = { ...user }
  },

  SET_PROFILE(state, user) {
    state.user = { ...user }
  },
}

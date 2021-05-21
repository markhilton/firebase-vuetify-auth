import Vue from "vue"

export default {
  SET_CONFIG(state, config) {
    state.config = config
  },

  SET_AUTH_GUARD_DIALOG_SHOWN(state, status) {
    state.isAuthGuardDialogShown = status
  },

  SET_AUTH_GUARD_DIALOG_PERSISTENT(state, status) {
    state.isAuthGuardDialogPersistent = status
  },

  SET_EMAIL_VERIFICATION_REQUIRED(state, status) {
    state.isAuthGuardDialogPersistent = status
  },

  SET_USER(state, user) {
    state.user = { ...user }
    console.log("SET_USER", state.user)
    const config = Vue.prototype.$authGuardSettings
    console.log("$authGuardSettings", config)
  },

  SET_PROFILE(state, user) {
    state.user = { ...user }
  },
}

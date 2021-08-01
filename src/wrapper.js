// default npm package init config
import defaultSettings from "./store/defaultSettings"

// Import vue component
import AuthGuard from "./components/authentication/Guard.vue"

// Import router middleware
import AuthGuardMiddleware from "./components/authentication/authguard"

// Declare install function executed by Vue.use()
const install = (Vue, options) => {
  if (install.installed) return

  install.installed = true

  // merge default settings with user settings
  const config = { ...defaultSettings, ...options }
  const { store, router, firebase } = config

  // verify if required dependency instances are passed to this package config
  if (store == null) console.error("ERROR: vuex store instance missing in AuthenticationGuard config!")
  if (router == null) console.error("ERROR: vue router instance missing in AuthenticationGuard config!")
  if (firebase == null) console.error("ERROR: firebase instance missing in AuthenticationGuard config!")

  // commit npm package config to vuex store
  store.commit("auth/SET_CONFIG", config)

  Vue.component("AuthenticationGuard", AuthGuard)
}

// Create module definition for Vue.use()
const plugin = {
  install,
}

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null

if (typeof window !== "undefined") {
  GlobalVue = window.Vue
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue
}

if (GlobalVue) GlobalVue.use(plugin)

// To allow use as module (npm/webpack/etc.) export component
export default {
  install,
}

export const AuthMiddleware = AuthGuardMiddleware

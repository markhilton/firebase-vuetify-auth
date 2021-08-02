import { VueMaskDirective } from "v-mask"

// vuex store namespace
import AuthStore from "./store/auth"

// default npm package init config
import defaultSettings from "./store/defaultSettings"

// Import vue component
import AuthGuard from "./components/Guard.vue"

// Import router middleware
import AuthGuardMiddleware from "./components/authguard"

// Declare install function executed by Vue.use()
export function install(Vue, options = {}) {
  if (install.installed) return

  install.installed = true

  // merge default settings with user settings
  const config = { ...defaultSettings, ...options }
  const { store, router, firebase } = config

  // save store in Vue.prototype to be accessible authcheck.js
  Vue.prototype.$authGuardStore = store

  // verify if required dependency instances are passed to this package config
  if (store == null) console.error("ERROR: vuex store instance missing in AuthenticationGuard config!")
  if (router == null) console.error("ERROR: vue router instance missing in AuthenticationGuard config!")
  if (firebase == null) console.error("ERROR: firebase instance missing in AuthenticationGuard config!")

  // register vuex store namespace
  store.registerModule("auth", AuthStore)

  // commit npm package config to vuex store
  store.commit("auth/SET_CONFIG", config)

  Vue.directive("mask", VueMaskDirective)
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
if (GlobalVue) {
  GlobalVue.use(plugin)
}

export const auth = AuthStore // export vuex store namespace
export const AuthMiddleware = AuthGuardMiddleware // export vue router middleware

export default plugin // export plugin install function

/* eslint-env node */

// Import router middleware
import RouterMiddlewareGuard from "./components/authentication/authguard"

// Import vue component
import AuthenticationGuard from "./components/authentication/Guard.vue"

// Declare install function executed by Vue.use()
export function install(Vue, options) {
  if (install.installed) return

  install.installed = true
  Vue.prototype.$authGuardSettings = options
  Vue.component("AuthenticationGuard", AuthenticationGuard)
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
export const AuthGuard = AuthenticationGuard
export const AuthMiddleware = RouterMiddlewareGuard

/* eslint-env node */

// Import vue component
import AuthGuard from "./components/authentication/Guard.vue"

// Import router middleware
import AuthGuardMiddleware from "./components/authentication/authguard"

// Declare install function executed by Vue.use()
const install = (Vue, options) => {
  if (install.installed) return

  install.installed = true
  Vue.prototype.$authGuardSettings = options
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

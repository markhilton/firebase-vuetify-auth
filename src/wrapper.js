import { getCurrentInstance } from "vue"

import { useAuthStore } from "@/store/auth"

import { VueMaskDirective } from "v-mask"

// default npm package init config
import defaultSettings from "./store/defaultSettings"

// Import vue component
import AuthGuard from "./components/AuthGuard.vue"

// Import router middleware
import AuthMiddleware from "./components/authguard"

const app = getCurrentInstance()

const plugin = {
  install(Vue, options = {}) {
    const authStore = useAuthStore()

    // if (install.installed) return

    // install.installed = true

    // merge default settings with user settings
    const globalConfig = { ...defaultSettings, ...options }
    const { router, firebase, session = "local", debug } = globalConfig

    let { store } = globalConfig

    // verify if required dependency instances are passed to this package config
    if (debug) {
      if (router === null) {
        console.error("[ auth guard ]: ERROR: vue router instance missing in AuthenticationGuard config!")
      }
      if (firebase === null) {
        console.error("[ auth guard ]: ERROR: firebase instance missing in AuthenticationGuard config!")
      }
    }

    if (debug) console.log("[ auth guard ]: registering VueX namespace: auth")

    // save store in Vue.prototype to be accessible authcheck.js
    app.appContext.config.globalProperties.$authGuardDebug = debug
    app.appContext.config.globalProperties.$authGuardStore = store
    app.appContext.config.globalProperties.$authGuardRouter = router
    app.appContext.config.globalProperties.$authGuardSession = session
    app.appContext.config.globalProperties.$authGuardFirebaseApp = firebase

    delete globalConfig.store
    delete globalConfig.router
    delete globalConfig.firebase

    // commit npm package config to vuex store
    authStore.config = globalConfig

    Vue.directive("mask", VueMaskDirective)
    Vue.component("AuthenticationGuard", AuthGuard)
  },
}

export { AuthMiddleware } // export vue router middleware

export default plugin

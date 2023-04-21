import { createPinia } from "pinia"
import { useAuthStore } from "../src/store/auth"

import { VueMaskDirective } from "v-mask"

// default npm package init config
import defaultSettings from "./store/defaultSettings"

// Import vue component
import AuthGuard from "./components/AuthGuard.vue"

// Import router middleware
import AuthMiddleware from "./components/authguard"

export default {
  install: (app, options = {}) => {
    // merge default settings with user settings
    const globalConfig = { ...defaultSettings, ...options }
    const { firebase, debug } = globalConfig

    // verify if required dependency instances are passed to this package config
    if (debug) {
      console.log("[ auth guard ]: wrapper initialization...")

      if (firebase === null) {
        console.error("[ auth guard ]: ERROR: firebase instance missing in AuthenticationGuard config!")
      }
    }

    // check if pinia jest been created already
    if (!app.config.globalProperties.$pinia) {
      console.log("[ auth guard ]: pinia store not detected - creating...")
      app.use(createPinia())
    }

    const authStore = useAuthStore()

    // commit npm package config to vuex store
    authStore.config = globalConfig

    app.directive("mask", VueMaskDirective)
    app.component("AuthenticationGuard", AuthGuard)
  },
}

export { AuthMiddleware } // export vue router middleware

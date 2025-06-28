import App from "./App.vue"
import router from "@/router"
import { AuthGuard, authGuardSettings } from "@/plugins/auth"
import vuetify from "@/plugins/vuetify"

import { createApp } from "vue"
import { createPinia } from "pinia"
import { loadFonts } from "./plugins/webfontloader"

loadFonts()

// Handle navigation errors globally
window.addEventListener('unhandledrejection', (event) => {
  // Check if this is a navigation error
  if (event.reason && event.reason.message && event.reason.message.includes('Navigation aborted')) {
    // Prevent the error from being logged to console
    event.preventDefault()
    return
  }
})

const app = createApp(App)
const pinia = createPinia()

// initialize firebase and VUE
app.use(pinia).use(router).use(vuetify).use(AuthGuard, authGuardSettings).mount("#app")
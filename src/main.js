import Vue from "vue"
import App from "./App.vue"
import router from "@/router"
import { AuthGuard, authGuardSettings } from "@/plugins/auth"
import vuetify from "@/plugins/vuetify"

Vue.config.productionTip = false

import { createApp } from "vue"
import { createPinia } from "pinia"
import { loadFonts } from "./plugins/webfontloader"

loadFonts()

const pinia = createPinia()

import { auth, analytics } from "@/middleware/firebase"
import { logEvent } from "firebase/analytics"
import { onAuthStateChanged } from "firebase/auth"

// initialize firebase and VUE
onAuthStateChanged(auth, (user) => {
  logEvent(analytics, "userAuthStateChanged", {
    currentUser: user?.uid || null,
  })

  console.log(user)

  createApp(App).use(AuthGuard, authGuardSettings).use(pinia).use(router).use(vuetify).mount("#app")
})

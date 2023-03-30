import App from "./App.vue"
import router from "@/router"
import { AuthGuard, authGuardSettings } from "@/plugins/auth"
import vuetify from "@/plugins/vuetify"

import { createApp } from "vue"
import { createPinia } from "pinia"
import { loadFonts } from "./plugins/webfontloader"

loadFonts()

import { auth } from "@/middleware/firebase"
import { onAuthStateChanged } from "firebase/auth"

// initialize firebase and VUE
onAuthStateChanged(auth, (user) => {
  console.log("[ main/onAuthStateChanged ]: user ID: [", user?.uid || null, "]")

  createApp(App).use(createPinia()).use(router).use(vuetify).use(AuthGuard, authGuardSettings).mount("#app")
})

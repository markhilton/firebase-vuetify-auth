import App from "./App.vue"
import router from "@/router"
import { AuthGuard } from "@/plugins/auth"
import vuetify from "@/plugins/vuetify"

import { createApp } from "vue"
import { createPinia } from "pinia"
import { loadFonts } from "./plugins/webfontloader"

loadFonts()

// initialize firebase and VUE
createApp(App).use(createPinia()).use(router).use(vuetify).use(AuthGuard).mount("#app")

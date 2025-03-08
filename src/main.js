import App from "./App.vue"
import router from "@/router"
import { AuthGuard } from "@/plugins/auth"
import vuetify from "@/plugins/vuetify"

import { createApp } from "vue"
import { createPinia } from "pinia"
import { loadFonts } from "./plugins/webfontloader"

loadFonts()

// Create the app instance
const app = createApp(App);

// Initialize Pinia first
app.use(createPinia());

// Then other plugins
app.use(router);
app.use(vuetify);
app.use(AuthGuard);

// Mount the app
app.mount("#app");

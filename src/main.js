import Vue from "vue"
import App from "@/App"
import store from "@/store"
import router from "@/router"
import vuetify from "@/plugins/vuetify"
import firebase from "@/middleware/firebase"
import AuthGuard from "./wrapper"

Vue.config.productionTip = false

const authGuardSettings = {
  debug: true,
  store,
  router,
  firebase,
  verification: true,
  phone: true,
  google: true,
  facebook: true,
}

Vue.use(AuthGuard, authGuardSettings)

// reload VUE app on Firebase auth state change
firebase.auth().onAuthStateChanged(() => {
  new Vue({
    store,
    router,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app")
})

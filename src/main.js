import Vue from "vue"
import App from "@/App"
import router from "@/router"
import vuetify from "@/plugins/vuetify"
import { firebase } from "@/middleware"
import AuthGuard from "./wrapper"

Vue.config.productionTip = false

const authGuardSettings = {
  router: router, // routes
  firebase: firebase, // pass on firebase middleware app init
  verification: false, // require user email to be verified before granting access
  registration: true, // allow new user registrations
  phone: false, // allow authentication with phone
  google: true, // allow authentication with gmail account
  facebook: false, // allow authentication with facebook account
}

Vue.use(AuthGuard, authGuardSettings)

// reload VUE app on Firebase auth state change
firebase.auth().onAuthStateChanged(() => {
  new Vue({
    router,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app")
})

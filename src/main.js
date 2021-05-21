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
  router, // routes
  firebase, // pass on firebase middleware app init
  verification: true, // require user email to be verified before granting access
  registration: true, // allow new user registrations
  phone: false, // allow authentication with phone
  google: true, // allow authentication with gmail account
  facebook: false, // allow authentication with facebook account
  title: "Authenticate",
  subtitle: "Firebase Vuetify Authentication NPM package",
  icon: "mdi-brightness-7", // authentication prompt icon
  iconColor: "orange", // authentication prompt icon color
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

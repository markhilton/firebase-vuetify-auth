import Vue from "vue"
import App from "@/App.vue"
import store from "@/store"
import router from "@/router"
import vuetify from "@/plugins/vuetify"
import firebase from "@/middleware/firebase"

Vue.config.productionTip = false

// Initialize Firebase
let app

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("auth/authStateChanged", user)

  if (!app) {
    app = new Vue({
      store,
      router,
      vuetify,
      render: h => h(App),
    }).$mount("#app")
  }
})

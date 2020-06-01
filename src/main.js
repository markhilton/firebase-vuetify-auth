import Vue from "vue"
import App from "./app.vue"
import store from "./store"
import vuetify from "./plugins/vuetify"
import firebase from "./middleware/firebase"

Vue.config.productionTip = false

// Initialize Firebase
let app

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("auth/authStateChanged", user)

  if (!app) {
    app = new Vue({
      vuetify,
      render: h => h(App),
    }).$mount("#app")
  }
})

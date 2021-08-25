import Vue from "vue"
import App from "@/App"
import store from "@/store"
import router from "@/router"
import "@/plugins/auth"
import vuetify from "@/plugins/vuetify"
import firebase from "@/middleware/firebase"

Vue.config.productionTip = false

// reload VUE app on Firebase auth state change
firebase.auth().onAuthStateChanged(() => {
  new Vue({
    store,
    router,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app")
})

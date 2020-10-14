import Vue from "vue"
import App from "@/App"
import router from "@/router"
import vuetify from "@/plugins/vuetify"
import { firebase } from "@/middleware"

Vue.config.productionTip = false

// reload VUE app on Firebase auth state change
firebase.auth().onAuthStateChanged(() => {
  new Vue({
    router,
    vuetify,
    render: h => h(App),
  }).$mount("#app")
})

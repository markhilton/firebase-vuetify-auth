import Vue from "vue"
import store from "@/store"
import router from "@/router"
import firebase from "@/middleware/firebase"
import AuthGuard from "../wrapper"

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

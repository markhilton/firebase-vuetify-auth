import Vue from "vue"
import store from "@/store"
import router from "@/router"
import firebase from "@/middleware/firebase"
import AuthGuard from "../wrapper"

const debug = true
const phone = true
const google = true
const facebook = true
const verification = true

const authGuardSettings = {
  debug,
  store,
  router,
  firebase,
  phone,
  google,
  facebook,
  verification,
}

Vue.use(AuthGuard, authGuardSettings)

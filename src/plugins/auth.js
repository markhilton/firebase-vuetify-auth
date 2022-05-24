import Vue from "vue"
import store from "@/store"
import router from "@/router"
import firebase from "@/middleware/firebase"
import AuthGuard from "../wrapper"

const debug = true
const session = "local" // or "browser" see: https://firebase.google.com/docs/auth/web/auth-state-persistence
const phone = true
const google = true
const facebook = true
const verification = true

const authGuardSettings = {
  debug,
  store,
  router,
  session,
  firebase,
  phone,
  google,
  facebook,
  verification,
}

Vue.use(AuthGuard, authGuardSettings)

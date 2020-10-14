import store from "@/store"
import firebase from "@/middleware/firebase"

// this gets hit ONLY when route is protected with beforeEnter: AuthGuard
export default (to, from, next) => {
  const user = firebase.auth().currentUser

  if (user) {
    store.commit("auth/SET_AUTH_GUARD", false)
    next()
  } else {
    store.commit("auth/SET_AUTH_GUARD", true)
    store.commit("auth/SET_AS_AUTHENTICATED", false)
  }
}

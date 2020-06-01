import store from "@/store"
import firebase from "@/middleware/firebase"

// this gets hit ONLY when route is protected with beforeEnter: AuthGuard
export default (to, from, next) => {
  const user = firebase.auth().currentUser

  if (user) next()
  else store.commit("auth/setAuthenticated", false)
}

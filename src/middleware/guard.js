import { firebase } from "@/middleware"

// this gets hit ONLY when route is protected with beforeEnter: AuthGuard
export default (to, from, next) => {
  const user = firebase.auth().currentUser

  if (user?.uid) next()
}

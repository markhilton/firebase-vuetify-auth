import firebase from "./firebase"

// this gets hit ONLY when route is protected with beforeEnter: AuthGuard
export default (to, from, next) => {
  const user = firebase.auth().currentUser

  if (user && user.uid) next()
}

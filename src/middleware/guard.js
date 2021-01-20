import firebase from "@/middleware/firebase"

export default (to, from, next) => {
  const user = firebase.auth().currentUser
  const isAuthenticated = user && user.uid ? true : false

  if (isAuthenticated) next()
  else next({ name: "Login" })
}

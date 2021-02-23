import Vue from "vue"

export default () => {
  let status = true

  const settings = Vue.prototype.$authGuardSettings
  const firebase = settings.firebase || null
  const user = firebase.auth().currentUser
  const isAuthenticated = user && user.uid ? true : false
  const verification = typeof settings.verification !== "undefined" ? settings.verification : true

  if (isAuthenticated) {
    // console.log("[ auth guard ]: authenticated user ID:", user.uid)

    let emailVerified = user.emailVerified || false
    const domain = user.email.split("@")[1]

    // check if email verification is always required or for some specific email domain(s) only
    if (verification === false || (Array.isArray(verification) && !verification.includes(domain))) {
      emailVerified = true
    }

    // check if to show dialog
    status = !emailVerified
  }

  Vue.prototype.$authGuardSettings.dialog = status

  return status
}

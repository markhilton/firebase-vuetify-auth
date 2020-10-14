import firebase from "@/middleware/firebase"

export default {
  /**
   * invoken every time when user auth status changes
   */
  async authStateChanged({ commit }, user) {
    const isAuthenticated = user && user.uid ? true : false
    const userData = JSON.parse(JSON.stringify(user))

    console.log("authStateChanged:", isAuthenticated ? "authenticated user ID: " + user.uid : "NOT authenticated")

    commit("SET_USER", userData)
    commit("SET_AS_AUTHENTICATED", isAuthenticated)

    // check if user is trying to login via email link
    if (!isAuthenticated && firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem("emailForSignIn")

      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation")
      }

      // The client SDK will parse the code from the link for you.
      firebase
        .auth()
        .signInWithEmailLink(email, window.location.href)
        .then(result => {
          // window.localStorage.removeItem("emailForSignIn") // clear email from storage
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
          commit("SET_USER", result.user)
          commit("SET_AUTH_GUARD", false)
          commit("SET_SNACKBAR", "User successfully signed in!")

          // remove apiKey from URL after authentication
          const url = window.location.pathname.split("?")[0]
          window.history.pushState("page", "", url)
        })
        .catch(error => {
          commit("SET_ERROR", error)
          commit("SET_AUTH_GUARD", true)
        })
    }
  },

  /**
   * register new user account
   */
  async registerUser({ commit }, register) {
    try {
      commit("SET_ERROR", null)
      commit("SET_PROGRESS", true)

      await firebase.auth().createUserWithEmailAndPassword(register.email, register.password)
      await firebase.auth().signInWithEmailAndPassword(register.email, register.password) // signin to set user name
      await firebase.auth().currentUser.updateProfile({ displayName: register.name })
      await firebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(() => {
          commit("SET_ERROR", null)
          commit("SET_SNACKBAR", "The email has been sent!")
        })
      await firebase.auth().signOut() // signout to await email confirmation
    } catch (error) {
      commit("SET_ERROR", error)
      commit("SET_PROGRESS", false)
    }
  },

  /**
   * log with email & password
   */
  loginWithPassword({ commit }, credentials) {
    commit("SET_PROGRESS", true)

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        const user = firebase.auth().currentUser

        if (!user.emailVerified) {
          commit("SET_ERROR", { message: "Please check your email to confirm your account!" })
          firebase.auth().signOut()
        } else {
          commit("SET_AUTH_GUARD", false)
          commit("SET_SNACKBAR", "User successfully signed in!")
        }
      })
      .catch(error => commit("SET_ERROR", error))
      .finally(() => commit("SET_PROGRESS", false))
  },

  /**
   * log with google account
   * https://stackoverflow.com/questions/38200044/firebase-authentication-is-not-a-function-is-not-a-constructor/57605937
   */
  loginWithGoogle() {
    const firebase = require("firebase/app")
    require("firebase/auth")

    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  },

  /**
   * send email authentication link
   * https://firebase.google.com/docs/auth/web/email-link-auth
   */
  sendEmailLoginLink({ commit }, email) {
    commit("SET_PROGRESS", true)

    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: window.location.href,
      handleCodeInApp: true, // This must be true.
    }

    firebase
      .auth()
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email)

        commit("SET_ERROR", null)
        commit("SET_SNACKBAR", "The email has been sent!")
      })
      .catch(error => commit("SET_ERROR", error))
      .finally(() => commit("SET_PROGRESS", false))
  },

  /**
   * log out user from the app
   */
  signOut({ commit }) {
    firebase.auth().signOut()
    commit("SET_AS_AUTHENTICATED", false)
    commit("SET_SNACKBAR", "You have signed out!")
  },

  /**
   * update user account
   */
  updateUserAccount({ commit }) {
    commit("SET_SNACKBAR", "User password updated!")
    commit("SET_SNACKBAR", "User name updated!")
  },
}

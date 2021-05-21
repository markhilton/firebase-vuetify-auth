export default {
  user: null, // firebase.auth().currentUser
  data: {}, // firestore user document "users/[user.uid]"

  config: null,

  isAuthGuardDialogShown: false, // login dialog
  isAuthGuardDialogPersistent: false, // login dialog persistent option
}

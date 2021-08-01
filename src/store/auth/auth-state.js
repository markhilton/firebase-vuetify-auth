export default {
  config: null, // package init configuration

  user: null, // firebase.auth().currentUser
  data: {}, // firestore user document "users/[user.uid]"

  is_loading: false,
  is_authguard_dialog_shown: false, // login dialog
  is_authguard_dialog_persistent: false, // login dialog persistent option
}

export default {
  config: null, // package init configuration
  error: null, // error from last operation

  is_loading: false,
  is_session_persistant: true,
  is_authguard_dialog_shown: true, // login dialog
  is_authguard_dialog_persistent: true, // login dialog persistent option
  is_email_verification_link_sent: false, // email verification confirmation
  is_email_reset_password_link_sent: false, // confirmation for successful reset password link email
  is_email_verification_screen_shown: false, // show email verification screen,
}

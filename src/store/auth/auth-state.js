export const state = () => ({
  config: null, // package init configuration
  error: null, // error from last operation

  current_user: null, // current user

  text_confirmation: null, // log in by phone text
  sign_by_phone_step: 1, // sign in by phone step

  tab: 0,
  init: false,
  is_loading: false,
  is_session_persistant: true,
  is_login_with_phone_shown: false,
  is_authguard_dialog_shown: true, // login dialog
  is_authguard_dialog_persistent: true, // login dialog persistent option
  is_email_verification_link_sent: false, // email verification confirmation
  is_email_reset_password_link_sent: false, // confirmation for successful reset password link email
  is_email_verification_screen_shown: false, // show email verification screen,
  is_reset_password_screen_shown: false, // show reset password screen,
  is_route_public: false, // is current route public
  is_from_public_to_auth: false, // is route going from public page to protected
})

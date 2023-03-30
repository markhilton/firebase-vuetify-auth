export default {
  debug: false,
  store: null, // vuex store
  router: null, // routes
  firebase: null, // pass on firebase middleware app init
  session: "local",

  saml: false, // allow authentication with saml
  saml_text: "Login with SAML", // saml button text
  saml_provider_id: "saml.okta", // saml provider id

  email: true, // allow authentication with email
  phone: false, // allow authentication with phone
  google: false, // allow authentication with gmail account
  facebook: false, // allow authentication with facebook account

  title: "Authenticate",
  subtitle: "Firebase Vuetify Authentication NPM package",

  icon: "mdi-brightness-7", // authentication prompt icon
  iconColor: "orange", // authentication prompt icon color

  verification: false, // require user email to be verified before granting access
  registration: true, // allow new user registrations
}

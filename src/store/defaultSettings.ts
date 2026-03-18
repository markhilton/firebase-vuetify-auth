import type { AuthGuardSettings } from '../types'

const defaultSettings: Partial<AuthGuardSettings> = {
  debug: false,
  session: "local",

  saml: false, // allow authentication with saml
  saml_text: "Login with SAML", // saml button text
  saml_provider_id: "saml.okta", // saml provider id

  oidc: false, // allow authentication with OIDC provider
  oidc_text: "Login with SSO", // oidc button text
  oidc_provider_id: "oidc.okta", // oidc provider id
  oidc_scopes: ['openid', 'profile', 'email'], // oidc scopes

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

export default defaultSettings
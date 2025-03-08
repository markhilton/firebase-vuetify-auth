import router from "@/router"
import { app as firebase } from "@/middleware/firebase"
import AuthGuard from "../wrapper"

// Configure AuthGuard with settings
AuthGuard.init({
  debug: true,
  session: "local", // or "browser" see: https://firebase.google.com/docs/auth/web/auth-state-persistence
  router,
  firebase,
  saml: true,
  saml_text: "Login with OKTA",
  saml_provider_id: "saml.okta",
  email: true,
  phone: true,
  google: true,
  facebook: true,
  registration: true,
  verification: true,

  title: "AUTH DEMO",
  subtitle: "Firebase Auth Demo for Veutify",
  icon: "mdi-test-tube",
  iconColor: "#FF6D00",
})

export { AuthGuard }

import AuthGuard from "./middleware/guard"

export default [
  {
    path: "/email-verification",
    beforeEnter: AuthGuard,
    component: () => import(/* webpackChunkName: "email-verification" */ "./views/EmailVerification"),
    meta: { gtm: "Email Verification" },
  },
  {
    path: "/auth/action",
    component: () => import(/* webpackChunkName: "auth-action" */ "./views/Action"),
    meta: { gtm: "Auth Action" },
  },
  {
    path: "/forgot-password",
    component: () => import(/* webpackChunkName: "password-reset" */ "./views/PasswordEmail"),
    meta: { gtm: "Password Reset" },
  },
]

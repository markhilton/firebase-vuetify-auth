/**
 * use cases:
 * 1. NOT authenticated user:
 * - user opens app on public route
 * - user opens app on protected route
 * - user navigates from public route to protected route
 *
 * 2. authenticated user, without confirmed email:
 * - user opens app on public route
 * - user opens app on protected route
 * - user navigates from public route to protected route
 * - user navigates from protected route to public route
 *
 * 3. authenticated user with confirmed email
 * - user opens app on public route
 * - user opens app on protected route
 * - user navigates from public route to protected route
 * - user navigates from protected route to public route
 *
 */
import Vue from "vue"
import authCheck from "./authcheck"

export default (to, from, next) => {
  const store = Vue.prototype.$authGuardStore
  const debug = Vue.prototype.$authGuardDebug

  if (!store) console.error("[ auth guard ]: WARNING: VueX store instance missing in AuthenticationGuard config!")
  else if (debug) console.log("[ auth guard ]: vue router AuthMiddleware")

  return authCheck() ? next() : null
}

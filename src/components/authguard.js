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
import { getCurrentInstance } from "vue"
import authCheck from "./authcheck"

const app = getCurrentInstance()

export default (to, from, next) => {
  const isRequired = to.meta.requiresAuth // is current path required authentication
  const fromRequiresAuth = from.meta.requiresAuth // from which page is request
  const store = app.appContext.config.globalProperties.$authGuardStore
  const debug = app.appContext.config.globalProperties.$authGuardDebug

  if (!store) console.error("[ auth guard ]: WARNING: VueX store instance missing in AuthenticationGuard config!")
  else if (debug) console.log("[ auth guard ]: vue router AuthMiddleware")

  // check if we are going from public page to auth required page
  if (isRequired && !fromRequiresAuth) {
    store.commit("auth/SET_IS_FROM_PUBLIC_TO_AUTH", true)
  } else store.commit("auth/SET_IS_FROM_PUBLIC_TO_AUTH", false)

  // change public route state depending on route
  if (!isRequired) {
    store.commit("auth/SET_IS_ROUTE_PUBLIC", true)
  } else store.commit("auth/SET_IS_ROUTE_PUBLIC", false)

  const isAllowed = authCheck() // is user Authenticated

  if (debug) console.log("[ auth guard ]: is route ALLOWED: [", isAllowed, "]")

  return (isRequired && isAllowed) || !isRequired ? next() : next(false)
}

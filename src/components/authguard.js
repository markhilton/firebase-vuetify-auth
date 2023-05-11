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
import authCheck from "./authcheck"
import { useAuthStore } from "../store/auth"

export default (to, from, next) => {
  const store = useAuthStore()
  const debug = store.config.debug
  const isRequired = to.meta.requiresAuth // is current path required authentication
  const fromRequiresAuth = from.meta.requiresAuth // from which page is request

  if (debug) console.log("[ auth guard ]: vue router AuthMiddleware")

  // check if we are going from public page to auth required page
  if (isRequired && !fromRequiresAuth) {
    store.is_from_public_to_auth = true
  } else store.is_from_public_to_auth = false

  // change public route state depending on route
  if (!isRequired) {
    store.is_route_public = true
  } else store.is_route_public = false

  const isAllowed = authCheck() // is user Authenticated

  if (debug) console.log("[ auth guard ]: is route ALLOWED: [", isAllowed, "]")

  return (isRequired && isAllowed) || !isRequired ? next() : next(false)
}

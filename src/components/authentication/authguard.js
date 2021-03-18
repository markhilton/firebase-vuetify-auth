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
import debug from "./debug"
import authCheck from "./authcheck"

export default (to, from, next) => {
  const allowRoute = authCheck()

  debug("[ authGuard ]:", allowRoute)

  return allowRoute ? next() : null
}

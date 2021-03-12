/**
 * use cases:
 * - user navigates to protected route, when user authenticated but email not verified
 * - user navigates to protected route, when user authenticated and email not verified
 * - user navigates to protected route, when user not authenticated
 * - user navigates to public route
 * - user navigates to root (redirections)
 * - user opens app on specific route
 */
import authCheck from "./authcheck"

export default (to, from, next) => {
  return authCheck() ? next() : null
}

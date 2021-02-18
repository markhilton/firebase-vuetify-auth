import authCheck from "./authcheck"

export default (to, from, next) => {
  return authCheck() ? next(false) : next()
}

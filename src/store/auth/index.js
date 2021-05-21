import state from "./auth-state"
import getters from "./auth-getters"
import actions from "./auth-actions"
import mutations from "./auth-mutations"

export default {
  namespaced: true,

  state,
  getters,
  actions,
  mutations,
}

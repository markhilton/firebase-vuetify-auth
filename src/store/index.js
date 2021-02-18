import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dialog: false,
  },
  getters: {
    getDialog(state) {
      return state.dialog
    },
  },
  mutations: {
    SET_DIALOG(state, val) {
      state.dialog = val
    },
  },
})

import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,

  modules: {
    auth: {
      namespaced: true,

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
    },
  },
})

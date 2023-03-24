import { state } from "./auth-state"
import { getters } from "./auth-getters"
import { actions } from "./auth-actions"

import { defineStore } from "pinia"

// Create a new store instance.
export const useAuthStore = defineStore("auth", {
  state,
  getters,
  actions,
})

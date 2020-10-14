<template>
  <div>
    <v-overlay :value="showAuthGuard" opacity="0.9">
      <v-btn icon fixed top right @click="closeDialog()">
        <v-icon>close</v-icon>
      </v-btn>

      <v-container fill-height>
        <Snackbar />

        <v-container style="max-width: 500px; min-width: 500px" class="mb-5">
          <v-card flat outlined>
            <v-progress-linear :indeterminate="progress" />

            <v-tabs v-model="tab" grow light>
              <v-tab>Sign In</v-tab>
              <v-tab>Register</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item class="pt-5">
                <Login />
              </v-tab-item>

              <v-tab-item class="pt-5">
                <Register @exit="tab = 0" />
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-container>
      </v-container>
    </v-overlay>
  </div>
</template>

<script>
import store from "@/store"
import router from "@/router"
import Login from "./Login"
import Register from "./Register"
import Snackbar from "./Snackbar"

export default {
  data: () => ({
    tab: 0,
  }),

  components: {
    Login,
    Register,
    Snackbar,
  },

  watch: {
    tab() {
      store.commit("auth/SET_ERROR", null)
    },
    isAuthenticated(isAuthenticated) {
      // find current route config
      const currentRouteConfig = router.options.routes.find(f => f.path == router.currentRoute.path)

      // check if current route requires auth
      if (!isAuthenticated && currentRouteConfig.beforeEnter) store.commit("auth/SET_AUTH_GUARD", true)
    },
  },

  computed: {
    route() {
      return this.$route
    },
    progress() {
      return store.getters["auth/getProgress"]
    },
    isAuthenticated() {
      return store.getters["auth/isAuthenticated"]
    },
    showAuthGuard() {
      return store.getters["auth/getAuthGuard"]
    },
  },

  methods: {
    closeDialog() {
      store.commit("auth/SET_AUTH_GUARD", false)
    },
  },
}
</script>

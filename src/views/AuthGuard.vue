<template>
  <v-container fill-height>
    <v-container style="max-width: 500px" class="mb-5">
      <v-card flat outlined>
        <v-progress-linear :indeterminate="progress" />

        <v-tabs v-model="tab" grow>
          <v-tab>Sign In</v-tab>
          <v-tab>Register</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item class="pt-5">
            <Login />
          </v-tab-item>
          <v-tab-item class="pt-5">
            <Register />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import store from "../store"
import Login from "./Login"
import Register from "./Register"

export default {
  data: () => ({
    tab: 0,
  }),

  components: {
    Login,
    Register,
  },

  watch: {
    tab() {
      store.commit("auth/setError", null)
    },
  },

  computed: {
    progress() {
      return store.getters["auth/progress"]
    },
  },
}
</script>

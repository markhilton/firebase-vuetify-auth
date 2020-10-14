<template>
  <v-container fill-height fluid pa-0>
    <v-container class="text-xs-center" style="max-width: 500px">
      <v-card flat>
        <!-- missing code -->
        <div v-if="error">
          <v-card-title class="justify-center title pt-4 pb-0">
            <v-container class="ma-0 pa-0 text-xs-center">
              <v-icon color="blue-grey darken-2" size="40">sentiment_dissatisfied</v-icon>
            </v-container>

            <v-subheader>Whoops, sorry...</v-subheader>
          </v-card-title>

          <v-card-text class="mt-3 mb-3 text-xs-center">{{ error }}</v-card-text>

          <div class="text-xs-center pb-4 mt-2">
            <router-link v-if="user" to="/">Dashboard</router-link>
            <router-link v-else to="/login">Login</router-link>
          </div>
        </div>

        <!-- password reset -->
        <div v-else>
          <password-reset v-if="mode == 'resetPassword'" :code="code" />
        </div>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import PasswordReset from "./PasswordReset"

export default {
  name: "Action",
  components: { PasswordReset },

  computed: {
    error() {
      return this.$store.getters.error
    },
    user() {
      return this.$store.getters.account
    },
    mode() {
      return this.code ? this.getParameterByName("mode", window.location.href) : "error"
    },
    code() {
      return this.getParameterByName("oobCode", window.location.href)
    },
  },

  methods: {
    getParameterByName() {
      return null
    },
  },

  mounted() {
    this.$store.commit("clearError")

    if (this.mode == "resetPassword") {
      this.$store.dispatch("user/passwordReset", this.code)
    } else if (this.mode == "verifyEmail") {
      this.$store.dispatch("user/verifyEmail", this.code)
    } else {
      this.$store.commit("SET_ERROR", "This link has already been used, its invalid or expired!")
    }
  },
}
</script>

<template>
  <v-container fill-height fluid pa-0>
    <v-container class="text-md-center" style="max-width: 500px">
      <v-card flat>
        <v-form ref="form">
          <div v-if="error">
            <app-alert :text="error.message" @dismissed="onDismissed"></app-alert>
          </div>

          <div v-else>
            <v-card-title class="justify-center title pt-4 pb-0">
              <v-container class="ma-0 pa-0 text-xs-center">
                <v-icon color="blue-grey darken-2" size="40">
                  verified_user
                </v-icon>
              </v-container>

              <v-subheader>Password Reset</v-subheader>
            </v-card-title>
          </div>

          <v-card-text class="mb-0 pb-0">
            <v-text-field
              v-model="email"
              required
              autofocus
              class="mr-2"
              type="email"
              prepend-icon="person"
              label="E-Mail"
            ></v-text-field>
          </v-card-text>

          <v-card-actions class="mt-2 mb-2">
            <v-btn block large color="primary" :loading="loading" :disabled="loading" @click.prevent="submit()">
              Email Password Reset Link
            </v-btn>
          </v-card-actions>

          <div class="text-xs-center pb-4">
            <router-link to="/login">Login</router-link>
          </div>
        </v-form>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "PasswordEmail",

  data() {
    return {
      email: "",
    }
  },

  computed: {
    loading() {
      return this.$store.getters.loading
    },
    error() {
      return this.$store.getters.error
    },
  },

  mounted() {
    this.$store.commit("clearError")
  },

  methods: {
    onDismissed() {
      this.$store.commit("clearError")
    },
    submit() {
      this.$store.dispatch("user/passwordEmail", this.email)
    },
  },
}
</script>

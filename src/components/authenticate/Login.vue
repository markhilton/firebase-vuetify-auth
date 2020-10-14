<template>
  <v-container>
    <v-card flat>
      <v-form ref="form" v-model="valid">
        <!-- error alerrts -->
        <v-alert v-if="error" v-model="alert" type="error" dismissible>
          {{ error.message }}
        </v-alert>

        <!-- application branding -->
        <branding v-else class="text-center" />

        <!-- login form -->
        <v-card-text class="mb-0 pb-0">
          <!-- forgot password message -->
          <div v-if="forgotPassword" class="mb-5">
            Enter registered user email address and we will send you a link to reset your password.
          </div>

          <v-text-field
            :autofocus="autofocus"
            v-model="credentials.email"
            required
            class="mr-2"
            label="Email"
            prepend-icon="person"
            :rules="[rules.email]"
          />

          <v-text-field
            v-if="!forgotPassword"
            autocomplete="off"
            v-model="credentials.password"
            class="mr-2"
            name="password"
            type="password"
            label="Password"
            prepend-icon="lock"
            :rules="[rules.password]"
          />

          <!-- <v-checkbox
							value="1"
							name="remember"
							class="ml-4 pl-2"
							v-model="remember"
							label="Remember Me"
                        />-->
        </v-card-text>

        <div class="text-center pb-4">
          <v-btn v-if="!forgotPassword" @click.prevent="forgotPassword = true" text x-small color="primary">
            Forgot Password?
          </v-btn>
          <v-btn v-else @click.prevent="forgotPassword = false" text x-small color="primary">
            Login with password
          </v-btn>
        </div>

        <v-card-actions v-if="!forgotPassword">
          <v-btn block large color="primary" @click.prevent="loginWithPassword()" :disabled="progress">
            Login
          </v-btn>
        </v-card-actions>

        <v-card-actions v-if="forgotPassword">
          <v-btn block large color="primary" @click.prevent="sendEmailLoginLink()" type="submit" :disabled="progress">
            Email Auth Link
          </v-btn>
        </v-card-actions>

        <v-card-actions>
          <LoginWithGoogle />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import store from "@/store"

import Branding from "./Branding"
import LoginWithGoogle from "./LoginWithGoogle"

export default {
  components: { Branding, LoginWithGoogle },

  data: () => ({
    credentials: {
      email: "",
      password: "",
      remember: false,
    },
    alert: true,
    valid: false,
    autofocus: true,
    forgotPassword: false,
  }),

  computed: {
    error() {
      return store.getters["auth/getError"]
    },
    progress() {
      return store.getters["auth/getProgress"]
    },
    rules() {
      const validation = {
        email: this.credentials.email == "" ? "Email cannot be empty" : true,
        password: this.credentials.password == "" ? "Password cannot be empty" : true,
      }

      return validation
    },
  },

  watch: {
    alert(value) {
      if (!value) store.commit("auth/SET_ERROR", null)
    },
    forgotPassword(value) {
      if (value) store.commit("auth/SET_ERROR", null)
    },
    error() {
      this.alert = Boolean(this.error)
    },
  },

  methods: {
    loginWithPassword() {
      if (this.$refs.form.validate()) store.dispatch("auth/loginWithPassword", this.credentials)
    },
    sendEmailLoginLink() {
      this.forgotPassword = false
      if (this.$refs.form.validate()) store.dispatch("auth/sendEmailLoginLink", this.credentials.email)
    },
  },
}
</script>

<template>
  <v-container>
    <v-card flat>
      <v-form ref="form" v-model="valid" @submit.prevent="loginWithEmail()">
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
            v-model="form.email"
            required
            class="mr-2"
            label="Email"
            prepend-icon="person"
            :rules="[rules.email]"
          />

          <v-text-field
            v-if="!forgotPassword"
            autocomplete="off"
            v-model="form.password"
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

        <div class="text-center pb-4" v-if="!forgotPassword">
          <v-btn @click.prevent="forgotPassword = true" text x-small color="primary">Forgot Password?</v-btn>
        </div>

        <v-card-actions v-if="!forgotPassword">
          <v-btn block large color="primary" type="submit" :disabled="progress">
            Login
          </v-btn>
        </v-card-actions>

        <v-card-actions v-if="forgotPassword">
          <v-btn block large color="primary" type="submit" :disabled="progress">
            Email Password Reset Link
          </v-btn>
        </v-card-actions>

        <v-card-actions>
          <LoginWith />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import store from "../store/index"
import Branding from "./Branding"
import LoginWith from "./LoginWith"
import firebase from "../middleware/firebase"

export default {
  components: { Branding, LoginWith },

  data: () => ({
    form: {
      email: "",
      password: "",
      remember: false,
    },
    alert: true,
    valid: false,
    forgotPassword: false,
  }),

  computed: {
    error() {
      return store.getters["auth/error"]
    },
    progress() {
      return store.getters["auth/progress"]
    },
    rules() {
      const validation = {
        email: this.form.email == "" ? "Email cannot be empty" : true,
        password: this.form.password == "" ? "Password cannot be empty" : true,
      }

      return validation
    },
  },

  watch: {
    alert(value) {
      if (!value) store.commit("auth/setError", null)
    },
    forgotPassword(value) {
      if (value) store.commit("auth/setError", null)
    },
    error() {
      this.alert = Boolean(this.error)
    },
  },

  methods: {
    loginWithEmail() {
      if (this.$refs.form.validate()) {
        store.commit("auth/setProgress", true)

        firebase
          .auth()
          .signInWithEmailAndPassword(this.form.email, this.form.password)
          .catch(error => store.commit("auth/setError", error))
          .finally(() => store.commit("auth/setProgress", false))
      }
    },
  },
}
</script>

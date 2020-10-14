<template>
  <v-container>
    <v-card flat>
      <v-form ref="form" v-model="valid" @submit.prevent="loginWithEmail()">
        <!-- error alerrts -->
        <v-alert v-if="alert" v-model="alert" type="error" dismissible>
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
          <v-btn block large color="primary" type="submit" :disabled="isLoading">
            Login
          </v-btn>
        </v-card-actions>

        <v-card-actions v-if="forgotPassword">
          <v-btn block large color="primary" type="submit" :disabled="isLoading">
            Email Password Reset Link
          </v-btn>
        </v-card-actions>

        <v-card-actions>
          <LoginWith3rdPartyProvider />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import Branding from "./Branding.vue"
import LoginWith3rdPartyProvider from "./LoginWith3rdPartyProvider.vue"

export default {
  components: { Branding, LoginWith3rdPartyProvider },

  props: ["error", "isLoading"],

  data: () => ({
    form: {
      email: "",
      password: "",
      remember: false,
    },
    alert: false,
    valid: false,
    forgotPassword: false,
  }),

  computed: {
    rules() {
      const validation = {
        email: this.form.email == "" ? "Email cannot be empty" : true,
        password: this.form.password == "" ? "Password cannot be empty" : true,
      }

      return validation
    },
  },

  watch: {
    error() {
      this.alert = Boolean(this.error)
    },
  },

  methods: {
    loginWithEmail() {
      if (this.$refs.form.validate()) {
        this.$emit("credentials", { email: this.form.email, password: this.form.password })
      }
    },
  },
}
</script>

<template>
  <v-container>
    <v-card flat>
      <v-form ref="form" v-model="valid" @submit.prevent="emailPasswordResetLink">
        <!-- error alerrts -->
        <v-alert v-if="alert" v-model="alert" type="error" dismissible>
          {{ error.message }}
        </v-alert>

        <!-- application branding -->
        <branding v-else class="text-center" />

        <!-- login form -->
        <div v-if="!success">
          <v-card-text class="mb-0 pb-0">
            <div class="mb-5">
              Enter registered user email address and we will send you a link to reset your password.
            </div>

            <v-text-field
              v-model="form.email"
              required
              :error="alert"
              class="mr-2"
              label="Email"
              prepend-icon="mdi-account"
              :rules="[rules.email]"
            />
          </v-card-text>

          <v-card-actions>
            <v-btn block large depressed color="primary" type="submit" :disabled="isLoading">
              Email Password Reset Link
            </v-btn>
          </v-card-actions>
        </div>

        <!-- success message -->
        <v-container v-if="success" class="pa-4 text-center">
          <v-card-text class="text-h5"> Email has been sent! </v-card-text>

          <v-card-text
            >Please check your inbox and follow the instructions in the email to reset your account
            password</v-card-text
          >

          <v-card-actions>
            <v-btn block large depressed color="primary" @click="$emit('showSignInTab')"> Login </v-btn>
          </v-card-actions>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import Branding from "./Branding.vue"

export default {
  components: { Branding },

  props: ["firebase", "isLoading"],

  data: () => ({
    form: {
      email: "",
    },
    error: null,
    valid: false,
    success: false,
  }),

  computed: {
    rules() {
      const validation = {
        email: this.form.email == "" ? "Email cannot be empty" : true,
      }

      return validation
    },

    alert() {
      return Boolean(this.error)
    },
  },

  methods: {
    //
    emailPasswordResetLink() {
      this.firebase
        .auth()
        .sendPasswordResetEmail(this.form.email)
        .then(() => {
          this.error = null
          this.success = true
        })
        .catch((error) => {
          this.error = error
          this.success = false
        })
    },
  },
}
</script>

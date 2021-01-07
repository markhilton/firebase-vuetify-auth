<template>
  <v-container>
    <!-- user with no email verification -->
    <v-card flat class="text-center pa-5">
      <!-- email error -->
      <div v-if="error">
        <div class="display-1 grey--text mb-3">
          Error!
        </div>

        <v-alert v-if="error" type="error">
          {{ error }}
        </v-alert>

        <v-btn color="primary" @click="goToLogin">
          Back to Login
        </v-btn>
      </div>

      <!-- email verification -->
      <div v-else>
        <!-- email confirmation required message -->
        <div v-if="!emailSent">
          <div class="display-1 grey--text mb-3">
            Verification Required
          </div>
          <v-icon size="100" color="grey" class="ma-4">
            verified_user
          </v-icon>
        </div>

        <!-- email sent confirmation -->
        <div v-if="emailSent">
          <div class="display-1 grey--text mb-3">
            Email sent!
          </div>
          <v-icon size="100" color="grey" class="ma-4">
            mail
          </v-icon>
        </div>

        <div class="grey--text text--darken-2 mb-7 body-2">
          <p>
            Please check your email to verify your address. Click at the link in the email we've sent you to confirm
            your account access.
          </p>
        </div>

        <!-- send verification email button -->
        <div v-if="!emailSent">
          <p class="grey--text text--darken-2 mb-7 body-2">
            If you have not received verification email<br />click at the button below.
          </p>

          <v-btn :disabled="isLoading" color="primary" @click="resendVerificationEmail">
            Send Verification Email
          </v-btn>
        </div>

        <!-- back to login page button -->
        <div v-if="emailSent">
          <v-btn color="primary" @click="goToLogin">
            Back to Login
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: ["error", "isLoading"],

  data: () => ({
    emailSent: false,
  }),

  methods: {
    resendVerificationEmail() {
      this.emailSent = true
      this.$emit("sendEmail")
    },
    goToLogin() {
      this.$emit("signOut")
    },
  },
}
</script>

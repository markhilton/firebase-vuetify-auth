<template>
  <v-container>
    <!-- user with no email verification -->
    <v-card flat class="text-center pa-5">
      <!-- email error -->
      <div v-if="getError">
        <div class="display-1 grey--text mb-3">Error!</div>

        <!-- error alerts -->
        <v-alert v-if="Boolean(getError)" type="error" dismissible @click="SET_ERROR(null)">
          {{ getError.message }}
        </v-alert>

        <v-btn color="primary" @click="goToLogin"> Back to Login </v-btn>
      </div>

      <!-- email verification -->
      <div v-else>
        <!-- email confirmation required message -->
        <div v-if="!isEmailVerificationLinkSent">
          <div class="display-1 grey--text mb-3">Verification Required</div>
          <v-icon size="100" color="grey" class="ma-4">mdi-account</v-icon>
        </div>

        <!-- email sent confirmation -->
        <div v-if="isEmailVerificationLinkSent">
          <div class="display-1 grey--text mb-3">Email sent!</div>
          <v-icon size="100" color="grey" class="ma-4">mdi-email</v-icon>
        </div>

        <div class="grey--text text--darken-2 mb-7 body-2">
          <p>
            Please check your email to verify your address. Click at the link in the email we've sent you to confirm
            your account access.
          </p>
        </div>

        <!-- send verification email button -->
        <div v-if="!isEmailResetPasswordLinkSent">
          <p class="grey--text text--darken-2 mb-7 body-2">
            If you have not received verification email<br />click at the button below.
          </p>

          <v-btn :disabled="isLoading" color="primary" @click="sendVerificationEmail()">
            Send Verification Email
          </v-btn>
        </div>

        <!-- back to login page button -->
        <div v-if="isEmailResetPasswordLinkSent">
          <v-btn color="primary" @click="SET_EMAIL_VERIFICATION_SCREEN_SHOWN(false)"> Back to Login </v-btn>
        </div>

        <!-- allow to log out in case user cannot confirm the email address -->
        <v-container>
          <div class="caption mb-2">- or -</div>
          <v-btn v-if="isAuthenticated" color="primary" outlined @click="signOut"> SignOut </v-btn>
          <v-btn v-else color="primary" outlined @click="SET_EMAIL_VERIFICATION_SCREEN_SHOWN(false)"> SignIn </v-btn>
        </v-container>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex"

export default {
  data: () => ({}),

  computed: {
    ...mapState("auth", ["config"]),
    ...mapGetters("auth", [
      "getError",
      "isLoading",
      "isAuthenticated",
      "isEmailResetPasswordLinkSent",
      "isEmailVerificationLinkSent",
    ]),
  },

  methods: {
    ...mapActions("auth", ["signIn", "signOut", "sendVerificationEmail"]),
    ...mapMutations("auth", ["SET_EMAIL_VERIFICATION_SCREEN_SHOWN"]),
  },
}
</script>

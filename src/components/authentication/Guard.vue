<template>
  <div>
    <v-dialog
      :value="isAuthGuardDialogShown"
      :persistent="isAuthGuardDialogPersistent"
      overlay-opacity="0.95"
      content-class="elevation-0"
      @change="SET_AUTH_GUARD_DIALOG_SHOWN($event)"
    >
      <v-container style="max-width: 500px" class="mb-5">
        <v-card flat outlined>
          <v-progress-linear :indeterminate="isLoading" />

          <div v-if="isEmailVerificationRequired">
            <EmailVerification
              :error="verificationError"
              :is-loading="isLoading"
              @sendEmail="sendVerificationEmail"
              @signOut="signOut"
            />
          </div>

          <div v-else>
            <v-tabs v-model="tab" grow>
              <v-tab @click="showSignInTab"> Sign In </v-tab>
              <v-tab v-if="!resetPassword && isUserRegistrationAllowed"> Register </v-tab>
              <v-tab v-if="resetPassword || !isUserRegistrationAllowed"> Reset Password </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item class="pt-5">
                <Login
                  :error="loginError"
                  :is-loading="isLoading"
                  @credentials="loginWithEmail"
                  @resetPassword="emailPasswordResetLink"
                />
              </v-tab-item>

              <v-tab-item v-if="!resetPassword && isUserRegistrationAllowed" class="pt-5">
                <Register :error="registrationError" :is-loading="isLoading" @registration="registerUser" />
              </v-tab-item>

              <v-tab-item v-if="resetPassword || !isUserRegistrationAllowed" class="pt-5">
                <PasswordReset :error="loginError" :is-loading="isLoading" @showSignInTab="showSignInTab" />
              </v-tab-item>
            </v-tabs-items>
          </div>

          <v-card-actions v-if="!isEmailVerificationRequired">
            <LoginWithProvider />
          </v-card-actions>
        </v-card>
      </v-container>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex"

/**
 * the auth guard has to watch user auth status & router current route changes
 */
import debug from "./debug"
import Login from "./Login.vue"
import Register from "./Register.vue"
import PasswordReset from "./PasswordReset.vue"
import EmailVerification from "./EmailVerification.vue"
import LoginWithProvider from "./LoginWithProvider.vue"

export default {
  components: {
    Login,
    Register,
    PasswordReset,
    EmailVerification,
    LoginWithProvider,
  },

  data: () => ({
    tab: 0,
    isLoading: false,
    loginError: null,
    resetPassword: false,
    registrationError: null,
    verificationError: null,
  }),

  computed: {
    ...mapGetters("auth", [
      "isAuthGuardDialogShown",
      "isAuthGuardDialogPersistent",
      "isCurrentRoutePublic",
      "isUserRegistrationAllowed",
      "isEmailVerificationRequired",
    ]),

    currentRoute(after, before) {
      // if (typeof before === "undefined") return
      debug("[ this.$route.path (before, after) ]:", before, after)
      return this.$route.path
    },
  },

  watch: {
    currentRoute() {
      debug("triggering [ checkRouterWhenReady ] because of current route change!")
      this.isCurrentRoutePublic
    },
  },

  created() {
    this.$store.dispatch("auth/init")
  },

  methods: {
    ...mapActions("auth", ["init", "loginWithEmail", "registerUser", "signOut", "sendVerificationEmail"]),
    ...mapMutations("auth", ["SET_USER", "SET_DIALOG_SHARE", "SET_DIALOG_CREATE_REPORT"]),

    //
    showSignInTab() {
      this.resetPassword = false
      this.tab = 0
    },

    //
    emailPasswordResetLink() {
      this.resetPassword = true
      this.tab = 1
      // const auth = firebase.auth();
      // const emailAddress = "user@example.com";

      // auth.sendPasswordResetEmail(emailAddress).then(function() {
      //   // Email sent.
      // }).catch(function(error) {
      //   // An error happened.
      // });
    },
  },
}
</script>

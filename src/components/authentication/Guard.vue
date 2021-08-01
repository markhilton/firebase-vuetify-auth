<template>
  <div>
    <v-dialog
      :value="isAuthGuardDialogShown"
      :persistent="isAuthGuardDialogPersistent"
      overlay-opacity="0.95"
      content-class="elevation-0"
      @input="SET_AUTH_GUARD_DIALOG_SHOWN($event)"
    >
      <v-container style="max-width: 500px" class="mb-5">
        <v-card flat outlined>
          <v-progress-linear :indeterminate="isLoading" />

          <div v-if="isEmailVerificationRequired">
            <EmailVerification />
          </div>

          <div v-else>
            <v-tabs v-model="tab" grow>
              <v-tab @click="showSignInTab"> Sign In </v-tab>
              <v-tab v-if="!resetPassword && isUserRegistrationAllowed"> Register </v-tab>
              <v-tab v-if="resetPassword || !isUserRegistrationAllowed"> Reset Password </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item class="pt-5">
                <Login />
              </v-tab-item>

              <v-tab-item v-if="!resetPassword && isUserRegistrationAllowed" class="pt-5">
                <Register />
              </v-tab-item>

              <v-tab-item v-if="resetPassword || !isUserRegistrationAllowed" class="pt-5">
                <PasswordReset />
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
import authcheck from "./authcheck"

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
    loginError: null,
    resetPassword: false,
  }),

  computed: {
    ...mapState("auth", ["config"]),
    ...mapGetters("auth", [
      "isLoading",
      "isAuthGuardDialogShown",
      "isAuthGuardDialogPersistent",
      "isUserRegistrationAllowed",
      "isEmailVerificationRequired",
    ]),

    currentRoute() {
      return this.$route.path
    },

    firebase() {
      return this.config.firebase
    },
  },

  watch: {
    currentRoute(after, before) {
      if (typeof before === "undefined") return

      debug("[ auth guard ]: vue router current route change: [", before, "] -> [", after, "]")
      this.revalidateAuthGuard()
    },
  },

  created() {
    // important to use onAuthStateChanged to mutate config state
    // in order to prevent vuex from not recognizing firebase changes
    this.firebase.auth().onAuthStateChanged(() => {
      debug("[ auth guard ]: firebase auth state changed")

      const config = this.config

      this.$store.commit("auth/SET_CONFIG", null)
      this.$store.commit("auth/SET_CONFIG", config)

      this.revalidateAuthGuard()
    })
  },

  methods: {
    ...mapActions("auth", [
      "revalidateAuthGuard",
      "loginWithEmail",
      "registerUser",
      "signOut",
      "sendVerificationEmail",
    ]),
    ...mapMutations("auth", ["SET_USER", "SET_AUTH_GUARD_DIALOG_SHOWN"]),

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

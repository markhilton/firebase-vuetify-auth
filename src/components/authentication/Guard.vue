<template>
  <div>
    <v-dialog v-model="dialog" :persistent="persistent" overlay-opacity="0.95" content-class="elevation-0">
      <v-container style="max-width: 500px" class="mb-5">
        <v-card flat outlined>
          <v-progress-linear :indeterminate="isLoading" />

          <div v-if="emailVerificationRequired">
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
              <v-tab v-if="!resetPassword && registration"> Register </v-tab>
              <v-tab v-if="resetPassword || !registration"> Reset Password </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item class="pt-5">
                <Login
                  :firebase="firebase"
                  :error="loginError"
                  :is-loading="isLoading"
                  @credentials="loginWithEmail"
                  @resetPassword="emailPasswordResetLink"
                />
              </v-tab-item>

              <v-tab-item v-if="!resetPassword && registration" class="pt-5">
                <Register :error="registrationError" :is-loading="isLoading" @registration="registerUser" />
              </v-tab-item>

              <v-tab-item v-if="resetPassword || !registration" class="pt-5">
                <PasswordReset
                  :firebase="firebase"
                  :error="loginError"
                  :is-loading="isLoading"
                  @showSignInTab="showSignInTab"
                />
              </v-tab-item>
            </v-tabs-items>
          </div>

          <v-card-actions v-if="!emailVerificationRequired">
            <LoginWithProvider :google="google" :facebook="facebook" :phone="phone" />
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
import authCheck from "./authcheck"
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
    dialog: false,
    persistent: true,

    firebase: null,
    registration: true,
    verification: true,
    google: false,
    facebook: false,
    phone: false,

    tab: 0,
    isLoading: false,
    loginError: null,
    resetPassword: false,
    registrationError: null,
    verificationError: null,
    emailVerificationRequired: false,
  }),

  computed: {
    ...mapGetters("auth", ["isCurrentRoutePublic"]),

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

    dialog(state) {
      debug("dialog(state)", state)
      this.$authGuardSettings.showAuthGuardDialog = state
    },

    persistent(state) {
      debug("persistent(state)", state)
      this.$authGuardSettings.persistent = state
    },
  },

  created() {
    this.init()
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

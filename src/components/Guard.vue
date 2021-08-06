<template>
  <div>
    <v-dialog
      :value="isAuthGuardDialogShown"
      :persistent="isAuthGuardDialogPersistent"
      :retain-focus="false"
      overlay-opacity="0.95"
      content-class="elevation-0"
      @input="SET_AUTH_GUARD_DIALOG_SHOWN($event)"
    >
      <v-container style="max-width: 500px" class="mb-5">
        <v-card flat outlined>
          <v-progress-linear :indeterminate="isLoading" />

          <div v-if="isEmailVerificationScrenShown">
            <EmailVerification />
          </div>

          <div v-else>
            <v-tabs :value="tab" grow @change="SET_TAB($event)">
              <v-tab
                v-if="!isLoginWithPhoneShown"
                @click="
                  SET_TAB(0)
                  SET_PASSWORD_RESET_SCREEN_SHOWN(false)
                "
              >
                Sign In
              </v-tab>
              <v-tab v-if="isLoginWithPhoneShown"> Sign In </v-tab>
              <v-tab v-if="!isResetPasswordScreenShown && isUserRegistrationAllowed"> Register </v-tab>
              <v-tab v-if="isResetPasswordScreenShown || !isUserRegistrationAllowed"> Reset Password </v-tab>
            </v-tabs>

            <v-tabs-items :value="tab" @change="SET_TAB($event)">
              <v-tab-item v-if="!isLoginWithPhoneShown" class="pt-5">
                <Login />
              </v-tab-item>

              <v-tab-item v-if="isLoginWithPhoneShown" class="pt-5">
                <LoginWithPhone />
              </v-tab-item>

              <v-tab-item v-if="!isResetPasswordScreenShown && isUserRegistrationAllowed" class="pt-5">
                <Register />
              </v-tab-item>

              <v-tab-item v-if="isResetPasswordScreenShown || !isUserRegistrationAllowed" class="pt-5">
                <PasswordReset />
              </v-tab-item>
            </v-tabs-items>
          </div>

          <v-card-actions v-if="!isEmailVerificationScrenShown">
            <LoginWithProvider />
          </v-card-actions>
        </v-card>
      </v-container>
    </v-dialog>
  </div>
</template>

<script>
import authcheck from "../components/authcheck"
import { mapState, mapGetters, mapMutations, mapActions } from "vuex"

import Login from "./Login.vue"
import Register from "./Register.vue"
import PasswordReset from "./PasswordReset.vue"
import LoginWithPhone from "./LoginWithPhone.vue"
import EmailVerification from "./EmailVerification.vue"
import LoginWithProvider from "./LoginWithProvider.vue"

export default {
  name: "AuthenticationGuard",

  components: {
    Login,
    Register,
    PasswordReset,
    LoginWithPhone,
    EmailVerification,
    LoginWithProvider,
  },

  data: () => ({
    loginError: null,
  }),

  computed: {
    ...mapState("auth", ["config", "tab"]),
    ...mapGetters("auth", [
      "isLoading",
      "isAuthenticated",
      "isLoginWithPhoneShown",
      "isAuthGuardDialogShown",
      "isAuthGuardDialogPersistent",
      "isUserRegistrationAllowed",
      "isEmailVerificationScrenShown",
      "isResetPasswordScreenShown",
    ]),

    currentRoute() {
      return this.$route.path
    },

    firebase() {
      return this.config.firebase
    },

    debug() {
      return this.config.debug
    },
  },

  watch: {
    currentRoute(after, before) {
      if (typeof before === "undefined") return
      if (this.debug) console.log("[ auth guard ]: vue router current route change: [", before, "] -> [", after, "]")

      authcheck()
      this.revalidateAuthGuard()
    },
  },

  created() {
    this.onAuthStateChanged()
  },

  methods: {
    ...mapActions("auth", [
      "onAuthStateChanged",
      "revalidateAuthGuard",
      "loginWithEmail",
      "registerUser",
      "signOut",
      "sendVerificationEmail",
    ]),
    ...mapMutations("auth", ["SET_TAB", "SET_USER", "SET_AUTH_GUARD_DIALOG_SHOWN", "SET_PASSWORD_RESET_SCREEN_SHOWN"]),
  },
}
</script>

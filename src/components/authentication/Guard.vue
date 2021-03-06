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
            <LoginWith3rdPartyProvider :google="google" :facebook="facebook" :phone="phone" />
          </v-card-actions>
        </v-card>
      </v-container>
    </v-dialog>
  </div>
</template>

<script>
/**
 * the auth guard has to watch user auth status & router current route changes
 */
import debug from "./debug"
import authCheck from "./authcheck"
import Login from "./Login.vue"
import Register from "./Register.vue"
import PasswordReset from "./PasswordReset.vue"
import EmailVerification from "./EmailVerification.vue"
import LoginWith3rdPartyProvider from "./LoginWith3rdPartyProvider.vue"

export default {
  components: {
    Login,
    Register,
    PasswordReset,
    EmailVerification,
    LoginWith3rdPartyProvider,
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
    currentRoute(after, before) {
      // if (typeof before === "undefined") return
      debug("[ this.$route.path (before, after) ]:", before, after)
      return this.$route.path
    },
  },

  watch: {
    currentRoute() {
      debug("triggering [ checkRouterWhenReady ] because of current route change!")
      this.isCurrentRoutePublic()
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
    // setup reactive watch for auth guard state
    const config = this.$authGuardSettings
    setInterval(() => (this.dialog = config.showAuthGuardDialog ? true : false), 100)
    setInterval(() => (this.emailVerificationRequired = config.emailVerificationRequired ? true : false), 100)

    // read package config settings
    const settings = this.$authGuardSettings

    this.firebase = settings.firebase || null
    this.registration = typeof settings.registration !== "undefined" ? settings.registration : true
    this.phone = typeof settings.phone !== "undefined" ? settings.phone : false
    this.google = typeof settings.google !== "undefined" ? settings.google : true
    this.facebook = typeof settings.facebook !== "undefined" ? settings.facebook : false

    // check current route when router is ready
    this.$authGuardSettings.router.onReady(() => {
      debug("[ router ]: READY!")

      this.isCurrentRoutePublic()

      // monitor user auth state
      this.firebase.auth().onAuthStateChanged(() => {
        debug("triggering [ authCheck ] because of onAuthStateChanged!")

        // run authCheck only if on non public route
        if (!this.isCurrentRoutePublic()) authCheck()
        // hide login dialog for public routes
        else {
          debug("DISABLING DIALOG")
          config.showAuthGuardDialog = false
        }
      })
    })
  },

  methods: {
    // check if the current route is public to set negative persisten dialog
    isCurrentRoutePublic() {
      const publicRoute =
        this.$route.matched[0] && typeof this.$route.matched[0].beforeEnter === "undefined" ? true : false

      this.persistent = !publicRoute

      if (!publicRoute) debug("[ matched route ]:", this.$route.matched[0])
      else this.$authGuardSettings

      debug("[ isCurrentRoutePublic ]:", publicRoute)

      return publicRoute
    },

    //
    showSignInTab() {
      this.resetPassword = false
      this.tab = 0
    },

    //
    async loginWithEmail({ email, password }) {
      this.isLoading = true

      this.firebase.auth().signOut()

      this.firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          // this is needed to reload route that was not loaded if user was not authenticated
          if (this.$router.currentRoute.name === null) this.$router.push(this.$router.currentRoute.path)
        })
        .catch((error) => (this.loginError = error))
        .finally(() => (this.isLoading = false))
    },

    //
    async registerUser(registration) {
      this.isLoading = true

      try {
        await this.firebase.auth().createUserWithEmailAndPassword(registration.email, registration.password)
        await this.firebase.auth().signInWithEmailAndPassword(registration.email, registration.password)
        await this.firebase.auth().currentUser.updateProfile({ displayName: registration.name })
        await this.firebase.auth().currentUser.sendEmailVerification()

        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        this.registrationError = error
      }
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

    //
    signOut() {
      this.firebase.auth().signOut()
    },

    //
    sendVerificationEmail() {
      this.isLoading = true

      this.firebase
        .auth()
        .currentUser.sendEmailVerification()
        .catch((error) => (this.verificationError = error))
        .finally(() => (this.isLoading = false))
    },
  },
}
</script>

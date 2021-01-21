<template>
  <v-dialog :value="dialog" persistent overlay-opacity="0.95" content-class="elevation-0">
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
</template>

<script>
import Vue from "vue"
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

  created() {
    // read package config settings
    const settings = this.$authGuardSettings

    // turn on / off the dialog based on router middleware interceptor
    this.dialog = Vue.prototype.$authGuardSettings.dialog

    this.firebase = settings.firebase || null
    this.registration = typeof settings.registration !== "undefined" ? settings.registration : true
    this.phone = typeof settings.phone !== "undefined" ? settings.phone : false
    this.google = typeof settings.google !== "undefined" ? settings.google : true
    this.facebook = typeof settings.facebook !== "undefined" ? settings.facebook : false

    this.firebase.auth().onAuthStateChanged((user) => {
      const isAuthenticated = user && user.uid ? true : false
      const verification = typeof settings.verification !== "undefined" ? settings.verification : true

      if (isAuthenticated) {
        // console.log("[ auth guard ]: authenticated user ID:", user.uid)

        let emailVerified = user.emailVerified || false
        const domain = user.email.split("@")[1]

        // check if email verification is always required or for some specific email domain(s) only
        if (verification === false || (Array.isArray(verification) && !verification.includes(domain))) {
          emailVerified = true
        }

        // check if to show dialog
        this.dialog = !emailVerified
      } else {
        // console.log("[ auth guard ]: user NOT authenticated")
        this.dialog = true
      }
    })
  },

  methods: {
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
        .then(() => (Vue.prototype.$authGuardSettings.dialog = false))
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

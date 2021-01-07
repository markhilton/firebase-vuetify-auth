<template>
  <v-container fill-height>
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
            <v-tab v-if="!resetPassword"> Register </v-tab>
            <v-tab v-if="resetPassword"> Reset Password </v-tab>
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

            <v-tab-item v-if="!resetPassword" class="pt-5">
              <Register :error="registrationError" :is-loading="isLoading" @registration="registerUser" />
            </v-tab-item>

            <v-tab-item v-if="resetPassword" class="pt-5">
              <PasswordReset
                :firebase="firebase"
                :error="loginError"
                :is-loading="isLoading"
                @showSignInTab="showSignInTab"
              />
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import Login from "./Login.vue"
import Register from "./Register.vue"
import PasswordReset from "./PasswordReset.vue"
import EmailVerification from "./EmailVerification.vue"

export default {
  components: {
    Login,
    Register,
    PasswordReset,
    EmailVerification,
  },

  props: ["firebase"],

  data: () => ({
    tab: 0,
    isLoading: false,
    loginError: null,
    resetPassword: false,
    registrationError: null,
    verificationError: null,
    emailVerificationRequired: false,
  }),

  mounted() {
    // emit isAuthenticated when user auth state changes
    this.firebase.auth().onAuthStateChanged(user => {
      let emailVerified = false
      let isAuthenticated = user && user.uid ? true : false

      if (isAuthenticated) {
        emailVerified = user.emailVerified

        if (!user.emailVerified) this.emailVerificationRequired = true
      }

      this.$emit("isAuthenticated", emailVerified)
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
        .catch(error => (this.loginError = error))
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
        .catch(error => (this.verificationError = error))
        .finally(() => (this.isLoading = false))
    },
  },
}
</script>

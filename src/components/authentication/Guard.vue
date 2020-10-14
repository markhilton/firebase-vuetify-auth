<template>
  <v-container fill-height>
    <v-container style="max-width: 500px" class="mb-5">
      <v-card flat outlined>
        <v-progress-linear :indeterminate="isLoading" />

        <div v-if="emailVerificationRequired">
          <EmailVerification
            :error="verificationError"
            :isLoading="isLoading"
            @sendEmail="sendVerificationEmail"
            @signOut="signOut"
          />
        </div>

        <div v-else>
          <v-tabs grow v-model="tab">
            <v-tab>Sign In</v-tab>
            <v-tab>Register</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item class="pt-5">
              <Login :error="loginError" :isLoading="isLoading" @credentials="loginWithEmail" />
            </v-tab-item>

            <v-tab-item class="pt-5">
              <Register :error="registrationError" :isLoading="isLoading" @registration="registerUser" />
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
import EmailVerification from "./EmailVerification.vue"

export default {
  props: ["firebase"],

  data: () => ({
    tab: 0,
    isLoading: false,
    loginError: null,
    registrationError: null,
    verificationError: null,
    emailVerificationRequired: false,
  }),

  components: {
    Login,
    Register,
    EmailVerification,
  },

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

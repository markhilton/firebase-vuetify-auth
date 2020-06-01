<template>
  <v-layout>
    <v-btn color="red" block large dark @click="loginWith()">
      Login with...
    </v-btn>

    <v-dialog v-model="dialog" width="500">
      <div id="recaptcha-container"></div>

      <!-- select authentication provider -->
      <v-card v-if="step === 1">
        <v-card-title class="body-1 primary white--text">
          Select authentication provider
        </v-card-title>

        <v-card-actions>
          <v-btn block large color="red" class="white--text" :disabled="progress" @click="loginWithGoogle()">
            <v-icon class="mr-2">mdi-google</v-icon>
            Login with Google
          </v-btn>
        </v-card-actions>

        <v-card-actions>
          <v-btn
            block
            large
            color="green text-darken-2"
            class="white--text"
            :disabled="progress"
            @click="loginWithPhone()"
          >
            <v-icon class="mr-2">phone</v-icon>
            Login with Phone
          </v-btn>
        </v-card-actions>
      </v-card>

      <!-- phone authentication provider: enter phone number -->
      <v-card v-if="step === 2">
        <v-card-title class="body-1 primary white--text">
          Enter Phone Number
        </v-card-title>

        <v-card-text>
          <v-container fluid>
            <v-row align="center" justify="center">
              <v-col>
                <v-text-field
                  autocomplete="off"
                  v-model="phoneNumber"
                  label="Phone Number"
                  prepend-icon="phone"
                  v-mask="phoneMask"
                />
              </v-col>

              <v-col>
                <v-btn color="primary" outlined :disabled="progress" @click="sendCode()">
                  Send Code
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>

      <!-- phone authentication provider: enter phone number -->
      <v-card v-if="step === 3">
        <v-card-title class="body-1 primary white--text">
          Enter Confirm Code
        </v-card-title>

        <v-card-text>
          <v-container fluid>
            <v-row align="center" justify="center">
              <v-col>
                <v-text-field
                  autocomplete="off"
                  v-model="confirmationCode"
                  label="Confirmation Code"
                  v-mask="codeMask"
                />
              </v-col>

              <v-col>
                <v-btn color="primary" outlined :disabled="progress" @click="confirmCode()">
                  Confirm Code
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import store from "../store"
import firebase from "@/middleware/firebase"

export default {
  data: () => ({
    step: 1,
    alert: true,
    valid: false,
    dialog: false,
    codeAuth: null,
    confirmationCode: null,
    codeMask: "######",
    phoneMask: "(###) ###-####",
    phoneNumber: null, // phone number field to send code to
    enterPhoneNumber: false, // show phone number field
    recaptchaVerifier: null,
    recaptchaWidgetId: null,
  }),

  mounted() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", { size: "invisible" })

    // render the rapchaVerifier.
    this.recaptchaVerifier.render().then(widgetId => (this.recaptchaWidgetId = widgetId))
  },

  computed: {
    error() {
      return store.getters["auth/error"]
    },
    progress() {
      return store.getters["auth/progress"]
    },
    rules() {
      const validation = {
        email: this.form.email == "" ? "Email cannot be empty" : true,
        password: this.form.password == "" ? "Password cannot be empty" : true,
      }

      return validation
    },
  },

  watch: {
    alert(value) {
      if (!value) store.commit("setError", ["login", null])
    },
    error() {
      this.alert = Boolean(this.error)
    },
  },

  methods: {
    loginWith() {
      this.step = 1
      this.dialog = true
    },

    loginWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },

    loginWithPhone() {
      // Turn off phone auth app verification.
      firebase.auth().settings.appVerificationDisabledForTesting = true

      // switch dialog to allow entering mobile phone number
      this.step = 2
    },

    sendCode() {
      firebase
        .auth()
        .signInWithPhoneNumber("+1" + this.phoneNumber, this.recaptchaVerifier)
        .then(res => {
          this.step = 3
          this.codeAuth = res
        })
        .catch(error => {
          alert(error)
          this.step = 1
        })
    },

    confirmCode() {
      this.codeAuth
        .confirm(this.confirmationCode)
        .then(() => (this.step = 1))
        .catch(err => alert(err))
    },
  },
}
</script>

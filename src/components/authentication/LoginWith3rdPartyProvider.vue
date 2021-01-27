<template>
  <v-container v-if="google || facebook || phone" class="text-center ma-0 pa-0">
    <div class="caption">or login with</div>

    <v-container>
      <v-tooltip v-if="google" top>
        <template #activator="{ on, attrs }">
          <v-btn color="#db3236" class="mr-2" v-bind="attrs" fab dark small v-on="on" @click="loginWithGoogle()">
            <v-icon>mdi-google</v-icon>
          </v-btn>
        </template>

        <span>Google Gmail Account</span>
      </v-tooltip>

      <v-tooltip v-if="facebook" top>
        <template #activator="{ on, attrs }">
          <v-btn color="#3b5998" class="mr-2" v-bind="attrs" fab dark small v-on="on" @click="loginWithFacebook()">
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
        </template>

        <span>Facebook Account</span>
      </v-tooltip>

      <v-tooltip v-if="phone" top>
        <template #activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" fab dark small v-on="on" @click="loginWithPhone()">
            <v-icon>mdi-cellphone</v-icon>
          </v-btn>
        </template>

        <span>Text Message To Your Phone</span>
      </v-tooltip>
    </v-container>

    <v-dialog v-model="dialog" width="500">
      <div id="recaptcha-container" />

      <!-- phone authentication provider: enter phone number -->
      <v-card v-if="step === 2">
        <v-card-title class="body-1 primary white--text"> Enter Phone Number </v-card-title>

        <v-card-text>
          <v-container fluid>
            <v-row align="center" justify="center">
              <v-col>
                <v-text-field
                  v-model="phoneNumber"
                  v-mask="phoneMask"
                  autocomplete="off"
                  label="Phone Number"
                  prepend-icon="mdi-cellphone"
                />
              </v-col>

              <v-col>
                <v-btn color="primary" outlined :disabled="progress" @click="sendCode()"> Send Code </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>

      <!-- phone authentication provider: enter phone number -->
      <v-card v-if="step === 3">
        <v-card-title class="body-1 primary white--text"> Enter Confirm Code </v-card-title>

        <v-card-text>
          <v-container fluid>
            <v-row align="center" justify="center">
              <v-col>
                <v-text-field
                  v-model="confirmationCode"
                  v-mask="codeMask"
                  autocomplete="off"
                  label="Confirmation Code"
                />
              </v-col>

              <v-col>
                <v-btn color="primary" outlined :disabled="progress" @click="confirmCode()"> Confirm Code </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import firebase from "firebase/app"

export default {
  props: ["firebase", "google", "facebook", "phone"],

  data: () => ({
    step: 1,
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

  computed: {
    rules() {
      const validation = {
        email: this.form.email == "" ? "Email cannot be empty" : true,
        password: this.form.password == "" ? "Password cannot be empty" : true,
      }

      return validation
    },

    alert() {
      return Boolean(this.error)
    },
  },

  mounted() {
    // this.recaptchaVerifier = new this.firebase.auth.RecaptchaVerifier("recaptcha-container", { size: "invisible" })
    // // render the rapchaVerifier.
    // this.recaptchaVerifier.render().then(widgetId => (this.recaptchaWidgetId = widgetId))
  },

  methods: {
    loginWith() {
      this.step = 1
      this.dialog = true
    },

    loginWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider()
      this.firebase.auth().signInWithRedirect(provider)
    },

    loginWithPhone() {
      // Turn off phone auth app verification.
      this.firebase.auth().settings.appVerificationDisabledForTesting = true

      // switch dialog to allow entering mobile phone number
      this.step = 2
    },

    sendCode() {
      this.firebase
        .auth()
        .signInWithPhoneNumber("+1" + this.phoneNumber, this.recaptchaVerifier)
        .then((res) => {
          this.step = 3
          this.codeAuth = res
        })
        .catch((error) => {
          alert(error)
          this.step = 1
        })
    },

    confirmCode() {
      this.codeAuth
        .confirm(this.confirmationCode)
        .then(() => (this.step = 1))
        .catch((err) => alert(err))
    },
  },
}
</script>

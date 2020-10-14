<template>
  <v-container class="text-center ma-0 pa-0">
    <div class="caption">or login with</div>

    <v-container>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="#db3236" class="mr-2" v-bind="attrs" v-on="on" fab dark small @click="loginWithGoogle()">
            <v-icon>mdi-google</v-icon>
          </v-btn>
        </template>

        <span>Google Gmail Account</span>
      </v-tooltip>

      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="#3b5998" class="mr-2" v-bind="attrs" v-on="on" fab dark small @click="loginWithFacebook()">
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
        </template>

        <span>Facebook Account</span>
      </v-tooltip>

      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" v-on="on" fab dark small @click="loginWithPhone()">
            <v-icon>phone</v-icon>
          </v-btn>
        </template>

        <span>Text Message To Your Phone</span>
      </v-tooltip>
    </v-container>

    <v-dialog v-model="dialog" width="500">
      <div id="recaptcha-container"></div>

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
  </v-container>
</template>

<script>
export default {
  props: ["firebase"],

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
    // this.recaptchaVerifier = new this.firebase.auth.RecaptchaVerifier("recaptcha-container", { size: "invisible" })
    // // render the rapchaVerifier.
    // this.recaptchaVerifier.render().then(widgetId => (this.recaptchaWidgetId = widgetId))
  },

  computed: {
    rules() {
      const validation = {
        email: this.form.email == "" ? "Email cannot be empty" : true,
        password: this.form.password == "" ? "Password cannot be empty" : true,
      }

      return validation
    },
  },

  watch: {
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
      const provider = new this.firebase.auth.GoogleAuthProvider()
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

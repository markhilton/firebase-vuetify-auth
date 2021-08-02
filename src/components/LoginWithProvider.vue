<template>
  <v-container v-if="config.google || config.facebook || config.phone" class="text-center ma-0 pa-0">
    <!-- recaptcha container needed for authenticating with the phone provider -->
    <div id="recaptcha-container" />

    <div class="caption">or login with</div>

    <v-container>
      <v-tooltip v-if="config.google" top>
        <template #activator="{ on, attrs }">
          <v-btn color="#db3236" class="mr-2" v-bind="attrs" fab dark small v-on="on" @click="loginWithGoogle()">
            <v-icon>mdi-google</v-icon>
          </v-btn>
        </template>

        <span>Authenticate with Gmail Account</span>
      </v-tooltip>

      <v-tooltip v-if="config.facebook" top>
        <template #activator="{ on, attrs }">
          <v-btn color="#3b5998" class="mr-2" v-bind="attrs" fab dark small v-on="on" @click="loginWithFacebook()">
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
        </template>

        <span>Authenticate with Facebook Account</span>
      </v-tooltip>

      <v-tooltip v-if="config.phone" top>
        <template #activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" fab dark small v-on="on" @click="loginWithPhone()">
            <v-icon>mdi-cellphone</v-icon>
          </v-btn>
        </template>

        <span>Authenticate with Text Message To Your Phone</span>
      </v-tooltip>
    </v-container>

    <v-dialog v-model="dialog" width="500">
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
                <v-btn
                  color="primary"
                  outlined
                  :disabled="isLoading"
                  @click="
                    sendCode({ phoneNumber, recaptchaVerifier })
                    step = 3
                  "
                >
                  Send Code
                </v-btn>
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
                <v-text-field v-model="confirmationCode" autocomplete="off" label="Confirmation Code" />
              </v-col>

              <v-col>
                <v-btn color="primary" outlined :disabled="isLoading" @click="confirmCode({ confirmationCode })">
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
import firebase from "firebase/app"
import { mapState, mapGetters, mapActions } from "vuex"

export default {
  data: () => ({
    step: 2,
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
    ...mapState("auth", ["config"]),
    ...mapGetters("auth", ["isLoading"]),
  },

  mounted() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", { size: "invisible" })
    this.recaptchaVerifier.render().then((widgetId) => (this.recaptchaWidgetId = widgetId))
  },

  methods: {
    ...mapActions("auth", ["loginWithGoogle", "loginWithFacebook", "sendCode", "confirmCode"]),

    loginWithPhone() {
      this.dialog = true
    },
  },
}
</script>

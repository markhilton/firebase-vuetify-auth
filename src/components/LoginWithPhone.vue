<template>
  <v-container>
    <!-- recaptcha container needed for authenticating with the phone provider -->
    <div id="recaptcha-container" />

    <!-- phone authentication provider: enter phone number -->
    <v-card flat>
      <!-- error alerts -->
      <v-alert v-if="Boolean(getError)" type="error" dismissible @click="error = null">
        {{ getError.message }}
      </v-alert>

      <!-- application branding -->
      <AuthBranding v-else class="text-center" />

      <!-- send code by text to phone -->
      <div v-if="sign_by_phone_step === 1">
        <v-form
          ref="form"
          v-model="valid"
          @submit.prevent="textPhoneVerificationCode({ phoneNumber, recaptchaVerifier })"
        >
          <v-card-text>
            <v-text-field
              v-model="phoneNumber"
              v-mask="phoneMask"
              class="mx-15 px-5 large-font"
              autocomplete="off"
              label="Phone Number"
              prepend-icon="mdi-cellphone"
              prefix="+1"
              :rules="[rules.phoneNumber]"
            />
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" block large depressed :disabled="!valid" type="submit"> Send Code </v-btn>
          </v-card-actions>
        </v-form>
      </div>

      <!-- confirm code received by phone text -->
      <v-container v-if="sign_by_phone_step === 2">
        <p class="text-center">
          enter confirmation code<br />
          you have received on your mobile phone
        </p>

        <v-row class="centered-input">
          <v-col v-for="(element, index) in 6" :key="index" cols="2">
            <v-text-field
              :ref="'code' + index"
              :key="index"
              v-model="code[index]"
              v-mask="digitMask"
              :value="code[index]"
              :item-value="code[index]"
              :item-text="code[index]"
              outlined
              maxlength="1"
              @keyup="nextElementFocus(index, $event)"
              @paste="onPaste"
            />
          </v-col>
        </v-row>

        <v-btn color="primary" block large depressed :disabled="code.length < 6" @click="confirmCode(code)">
          Confirm Code
        </v-btn>
      </v-container>

      <v-container class="text-center">
        <v-btn text x-small color="primary" @click="SET_SHOW_LOGIN_WITH_PHONE(false)"> Sign In with email </v-btn>
      </v-container>
    </v-card>
  </v-container>
</template>

<script setup>
import { getCurrentInstance } from "vue"
import AuthBranding from "./AuthBranding.vue"
import { getAuth, RecaptchaVerifier } from "firebase/auth"
import { computed, onMounted } from "vue"
import { storeToRefs } from "pinia"
import { useAuthStore } from "@/store/auth"

let valid = false
let code = [] // text confirmation code
let digitMask = "#"
let phoneMask = "(###) ###-####"
let phoneNumber = "" // phone number field to send code to
let recaptchaVerifier = null
// let recaptchaWidgetId = null // TODO

const store = useAuthStore()
const { appContext } = getCurrentInstance()
const { textPhoneVerificationCode, confirmCode, SET_SHOW_LOGIN_WITH_PHONE } = store
const { error, sign_by_phone_step, getError } = storeToRefs(store)

const rules = computed(() => {
  return  {
    phoneNumber: phoneNumber.replace(/\D/g, "") < 1000000000 ? "Please enter a valid US phone number" : true,
  }
})

onMounted(() => {
  recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    { size: "invisible" },
    getAuth(appContext.config.globalProperties.$authGuardFirebaseApp)
  )
  // this.recaptchaVerifier.render().then((widgetId) => (recaptchaWidgetId = widgetId))

  // window.grecaptcha.reset(this.recaptchaWidgetId)

  // // Or, if you haven't stored the widget ID:
  // this.recaptchaVerifier.render().then(function (widgetId) {
  //   grecaptcha.reset(widgetId)
  // })
})

// paste handler to allow confirmation code paste
const onPaste = (event) => {
  const text = event.clipboardData.getData("text").substr(0, 6)

  for (let index = 0; index < text.length; index++) {
    this.$set(this.code, index, text[index])
  }
}

// form field focus handler to automatically move cursor to the next field
const nextElementFocus = (index, event) => {
  let i = index

  if (["Backspace", "ArrowLeft"].includes(event.key)) {
    i = index > 1 ? index - 1 : 0
  }

  // jeez to figure this out OMG :)
  // https://stackoverflow.com/questions/42807888/vuejs-and-vue-set-update-array
  if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "ArrowRight"].includes(event.key)) {
    this.$set(this.code, index, event.key)

    i = index > 4 ? index : index + 1
  }

  const el = "code" + i

  this.$refs[el][0].focus()
}
</script>

<style scoped>
/* styles for phone number field */
.large-font > input {
  font-size: 1.5rem;
}

/* styles for confirmation code form fields */
.centered-input > input {
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
}
</style>

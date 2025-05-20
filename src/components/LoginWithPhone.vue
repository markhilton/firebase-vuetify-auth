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
          @submit.prevent="handleTextPhoneVerificationCode"
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
              :ref="el => codeFieldRefs[index] = el"
              :key="index"
              v-model="code[index]"
              v-mask="digitMask"
              outlined
              maxlength="1"
              @keyup="event => nextElementFocus(index, event)"
              @paste="onPaste"
            />
          </v-col>
        </v-row>

        <v-btn color="primary" block large depressed :disabled="code.join('').length < 6" @click="handleConfirmCode">
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
import AuthBranding from "./AuthBranding.vue"
import { getAuth, RecaptchaVerifier } from "firebase/auth"
import { computed, onMounted, ref, nextTick } from "vue"
import { storeToRefs } from "pinia"
import { useAuthStore } from "@/store/auth"

const valid = ref(false)
const code = ref(Array(6).fill('')) // OTP code array
const digitMask = "#"
const phoneMask = "(###) ###-####"
const phoneNumber = ref("") // phone number field
let recaptchaVerifier = null

const store = useAuthStore()
const { textPhoneVerificationCode, confirmCode, SET_SHOW_LOGIN_WITH_PHONE } = store
const { error, sign_by_phone_step, getError, config } = storeToRefs(store)

const codeFieldRefs = ref([]) // Template refs for OTP input fields

const rules = computed(() => {
  return  {
    phoneNumber: phoneNumber.value.replace(/\D/g, "").length < 10 ? "Please enter a valid US phone number" : true,
  }
})

const handleTextPhoneVerificationCode = () => {
  textPhoneVerificationCode({ phoneNumber: phoneNumber.value, recaptchaVerifier })
}

const handleConfirmCode = () => {
  confirmCode(code.value)
}


onMounted(() => {
  if (config.value && config.value.firebase) {
    recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      getAuth(config.value.firebase) // Get Firebase app from store config
    )
    // recaptchaVerifier.render().then((widgetId) => (recaptchaWidgetId = widgetId)) // Optional: if widget ID is needed
  } else {
    console.error("[LoginWithPhone]: Firebase app not available in config for reCAPTCHA.")
  }
})

// Paste handler for OTP code
const onPaste = (event) => {
  const pastedText = event.clipboardData.getData("text").substr(0, 6)
  pastedText.split('').forEach((char, index) => {
    if (index < code.value.length) {
      code.value[index] = char
    }
  })
  // Optionally, focus the next empty field or the last field
  const firstEmpty = code.value.findIndex(c => !c);
  if (firstEmpty !== -1 && codeFieldRefs.value[firstEmpty]) {
    codeFieldRefs.value[firstEmpty].focus();
  } else if (codeFieldRefs.value[code.value.length - 1]) {
     codeFieldRefs.value[code.value.length - 1].focus();
  }
}

// Auto-focus next OTP input field
const nextElementFocus = (index, event) => {
  let nextIndex = index

  if (event.key === "Backspace" || event.key === "ArrowLeft") {
    nextIndex = index > 0 ? index - 1 : 0
    if (event.key === "Backspace" && index > 0) { // Clear current field on backspace before moving
        code.value[index] = '';
    }
  } else if (/^[0-9]$/.test(event.key) || event.key === "ArrowRight") {
    // If a digit is entered and current field is not the last one
    if (/^[0-9]$/.test(event.key) && index < code.value.length -1) {
         nextTick(() => { // Ensure value is updated before moving focus
            if (codeFieldRefs.value[index + 1]) {
                codeFieldRefs.value[index + 1].focus();
            }
        });
        return; // Return early to prevent default focus logic below for this case
    }
    nextIndex = index < code.value.length - 1 ? index + 1 : index
  }


  if (codeFieldRefs.value[nextIndex]) {
    codeFieldRefs.value[nextIndex].focus()
  }
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

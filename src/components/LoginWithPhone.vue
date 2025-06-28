<template>
  <v-container>
    <!-- recaptcha container needed for authenticating with the phone provider -->
    <div id="recaptcha-container" />
    
    <v-card flat>
      <!-- error alerts -->
      <v-alert v-if="Boolean(getError)" class="my-3" type="error" dismissible transition="fade-transition" @click="error = null">
        {{ getError.message || getError }}
      </v-alert>

      <!-- application branding -->
      <AuthBranding v-else class="text-center" />
    </v-card>

    <!-- phone authentication provider: enter phone number -->
    <v-card v-if="sign_by_phone_step === 1" flat>
      <form @submit.prevent="handleTextPhoneVerificationCode">
        <v-card-text class="mb-0 pb-0">
          <v-select
            v-model="countryCode"
            :items="countryCodes"
            item-title="label"
            item-value="value"
            label="Country"
            prepend-icon="mdi-earth"
            class="mb-4"
          />
          
          <v-text-field
            v-model="phoneNumber"
            required
            autocomplete="off"
            label="Phone Number"
            prepend-icon="mdi-cellphone"
            :prefix="countryCode"
            :placeholder="getPhonePlaceholder()"
            :rules="[rules.phoneNumber]"
            @input="formatPhoneNumber"
          />
          
          <!-- Empty space to match the remember me checkbox and forgot password link -->
          <div style="height: 84px;"></div>
        </v-card-text>

        <v-card-actions>
          <v-btn
            block
            size="large"
            variant="outlined"
            color="primary"
            type="submit"
            :disabled="!valid"
          >
            Send Code
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>

    <!-- confirm code received by phone text -->
    <v-card v-if="sign_by_phone_step === 2" flat>
      <v-card-text class="mb-0 pb-0">
        <p class="text-center text-body-2 text-medium-emphasis mb-4">
          Enter the confirmation code<br />
          sent to your mobile phone
        </p>

        <v-row class="centered-input">
          <v-col v-for="(element, index) in 6" :key="index" cols="2">
            <v-text-field
              :ref="el => codeFieldRefs[index] = el"
              :key="index"
              v-model="code[index]"
              v-maska="digitMask"
              variant="outlined"
              maxlength="1"
              hide-details
              @keyup="event => nextElementFocus(index, event)"
              @paste="onPaste"
            />
          </v-col>
        </v-row>
        
        <!-- Empty space to match the remember me checkbox and forgot password link -->
        <div style="height: 84px;"></div>
      </v-card-text>

      <v-card-actions>
        <v-btn
          block
          size="large"
          variant="outlined"
          color="primary"
          :disabled="code.join('').length < 6"
          @click="handleConfirmCode"
        >
          Confirm Code
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import AuthBranding from "./AuthBranding.vue"
import { getAuth, RecaptchaVerifier, type Auth } from "firebase/auth"
import { computed, onUnmounted, ref, nextTick, type Ref, type ComputedRef } from "vue"
import { useAuthStore } from "@/store/auth"
import type { PhoneAuthData } from "@/types"
import { checkFirebasePhoneAuthConfig } from "@/utils/check-firebase-config"

const valid = computed(() => {
  const digits = phoneNumber.value.replace(/\D/g, "")
  const country = currentCountry.value
  return digits.length >= country.minLength && digits.length <= country.maxLength
})
const code: Ref<string[]> = ref(Array(6).fill('')) // OTP code array
const digitMask: string = "#"
const phoneNumber: Ref<string> = ref("") // phone number field
const countryCode: Ref<string> = ref("+1") // default to US/Canada

// Debug phone number changes - disabled for cleaner console
// watch(phoneNumber, (newVal) => {
//   console.log('Phone number changed:', newVal)
// })
let recaptchaVerifier: RecaptchaVerifier | null = null

const store = useAuthStore()
const { textPhoneVerificationCode, confirmCode } = store

// Replace storeToRefs with computed properties to safely access store properties
const error = computed({
  get: () => store.error,
  set: (value) => { store.error = value }
})
const sign_by_phone_step = computed(() => store.sign_by_phone_step)
const getError = computed(() => store.getError)
const config = computed(() => store.config)

// Template refs for OTP input fields
const codeFieldRefs: Ref<Array<{ focus: () => void } | null>> = ref([])

// Common country codes with their phone number lengths
const countryCodes = [
  { value: "+1", label: "🇺🇸 +1 USA/Canada", minLength: 10, maxLength: 10 },
  { value: "+44", label: "🇬🇧 +44 UK", minLength: 10, maxLength: 11 },
  { value: "+33", label: "🇫🇷 +33 France", minLength: 9, maxLength: 9 },
  { value: "+49", label: "🇩🇪 +49 Germany", minLength: 10, maxLength: 12 },
  { value: "+39", label: "🇮🇹 +39 Italy", minLength: 9, maxLength: 10 },
  { value: "+34", label: "🇪🇸 +34 Spain", minLength: 9, maxLength: 9 },
  { value: "+91", label: "🇮🇳 +91 India", minLength: 10, maxLength: 10 },
  { value: "+81", label: "🇯🇵 +81 Japan", minLength: 10, maxLength: 11 },
  { value: "+86", label: "🇨🇳 +86 China", minLength: 11, maxLength: 11 },
  { value: "+82", label: "🇰🇷 +82 South Korea", minLength: 10, maxLength: 11 },
  { value: "+61", label: "🇦🇺 +61 Australia", minLength: 9, maxLength: 9 },
  { value: "+55", label: "🇧🇷 +55 Brazil", minLength: 11, maxLength: 11 },
  { value: "+52", label: "🇲🇽 +52 Mexico", minLength: 10, maxLength: 10 },
  { value: "+27", label: "🇿🇦 +27 South Africa", minLength: 9, maxLength: 9 },
  { value: "+234", label: "🇳🇬 +234 Nigeria", minLength: 10, maxLength: 10 },
  { value: "+20", label: "🇪🇬 +20 Egypt", minLength: 10, maxLength: 10 },
  { value: "+31", label: "🇳🇱 +31 Netherlands", minLength: 9, maxLength: 9 },
  { value: "+46", label: "🇸🇪 +46 Sweden", minLength: 9, maxLength: 10 },
  { value: "+47", label: "🇳🇴 +47 Norway", minLength: 8, maxLength: 8 },
  { value: "+358", label: "🇫🇮 +358 Finland", minLength: 9, maxLength: 10 },
  { value: "+65", label: "🇸🇬 +65 Singapore", minLength: 8, maxLength: 8 },
  { value: "+64", label: "🇳🇿 +64 New Zealand", minLength: 9, maxLength: 10 },
  { value: "+971", label: "🇦🇪 +971 UAE", minLength: 9, maxLength: 9 },
  { value: "+7", label: "🇷🇺 +7 Russia", minLength: 10, maxLength: 10 },
  { value: "+380", label: "🇺🇦 +380 Ukraine", minLength: 9, maxLength: 9 },
  { value: "+48", label: "🇵🇱 +48 Poland", minLength: 9, maxLength: 9 },
  { value: "+32", label: "🇧🇪 +32 Belgium", minLength: 9, maxLength: 9 },
  { value: "+41", label: "🇨🇭 +41 Switzerland", minLength: 9, maxLength: 9 },
  { value: "+43", label: "🇦🇹 +43 Austria", minLength: 10, maxLength: 13 },
  { value: "+45", label: "🇩🇰 +45 Denmark", minLength: 8, maxLength: 8 },
  { value: "+351", label: "🇵🇹 +351 Portugal", minLength: 9, maxLength: 9 },
  { value: "+30", label: "🇬🇷 +30 Greece", minLength: 10, maxLength: 10 },
  { value: "+90", label: "🇹🇷 +90 Turkey", minLength: 10, maxLength: 10 },
  { value: "+66", label: "🇹🇭 +66 Thailand", minLength: 9, maxLength: 10 },
  { value: "+62", label: "🇮🇩 +62 Indonesia", minLength: 10, maxLength: 12 },
  { value: "+60", label: "🇲🇾 +60 Malaysia", minLength: 9, maxLength: 11 },
  { value: "+63", label: "🇵🇭 +63 Philippines", minLength: 10, maxLength: 10 },
  { value: "+84", label: "🇻🇳 +84 Vietnam", minLength: 9, maxLength: 10 },
  { value: "+54", label: "🇦🇷 +54 Argentina", minLength: 10, maxLength: 11 },
  { value: "+56", label: "🇨🇱 +56 Chile", minLength: 9, maxLength: 9 },
  { value: "+57", label: "🇨🇴 +57 Colombia", minLength: 10, maxLength: 10 },
  { value: "+51", label: "🇵🇪 +51 Peru", minLength: 9, maxLength: 9 },
  { value: "+58", label: "🇻🇪 +58 Venezuela", minLength: 10, maxLength: 10 },
]

// Get current country config
const currentCountry = computed(() => 
  countryCodes.find(c => c.value === countryCode.value) || countryCodes[0]
)

// Validation rules with proper typing
const rules: ComputedRef<{ phoneNumber: string | boolean }> = computed(() => {
  const digits = phoneNumber.value.replace(/\D/g, "")
  const country = currentCountry.value
  
  if (digits.length < country.minLength) {
    return {
      phoneNumber: `Please enter a valid phone number (minimum ${country.minLength} digits)`
    }
  }
  
  if (digits.length > country.maxLength) {
    return {
      phoneNumber: `Phone number too long (maximum ${country.maxLength} digits)`
    }
  }
  
  return {
    phoneNumber: true
  }
})

const handleTextPhoneVerificationCode = async (): Promise<void> => {
  try {
    // Initialize recaptcha if not already done
    if (!recaptchaVerifier) {
      console.log("[LoginWithPhone]: Initializing reCAPTCHA...")
      await initializeRecaptcha()
    }
    
    if (recaptchaVerifier) {
      const phoneAuthData: PhoneAuthData = {
        phoneNumber: countryCode.value + phoneNumber.value.replace(/\D/g, ''),
        recaptchaVerifier
      }
      textPhoneVerificationCode(phoneAuthData)
    } else {
      console.error("[LoginWithPhone]: Failed to initialize reCAPTCHA. Please check:")
      console.error("1. Phone authentication is enabled in Firebase Console")
      console.error("2. Your Firebase configuration is correct")
      error.value = { message: "Failed to initialize phone authentication. Please try again." }
    }
  } catch (err: any) {
    console.error("[LoginWithPhone]: Error in phone verification:", err)
    error.value = err
  }
}

const handleConfirmCode = (): void => {
  confirmCode(code.value)
}

// Get placeholder based on country
const getPhonePlaceholder = (): string => {
  switch (countryCode.value) {
    case "+1": return "(555) 123-4567"
    case "+44": return "20 1234 5678"
    case "+33": return "6 12 34 56 78"
    case "+49": return "151 12345678"
    case "+91": return "98765 43210"
    case "+81": return "90-1234-5678"
    case "+86": return "138 0013 8000"
    default: return "123456789"
  }
}

// Format phone number based on country
const formatPhoneNumber = (): void => {
  // Remove all non-digit characters
  let value = phoneNumber.value.replace(/\D/g, '')
  
  // Only format for US/Canada numbers
  if (countryCode.value === "+1" && value.length > 0) {
    if (value.length >= 6) {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`
    } else if (value.length >= 3) {
      value = `(${value.slice(0, 3)}) ${value.slice(3)}`
    }
  }
  // For other countries, just limit the length
  else {
    const country = currentCountry.value
    value = value.slice(0, country.maxLength)
  }
  
  // Update the model value
  phoneNumber.value = value
}


// Don't initialize on mount - wait until user actually wants to use phone auth
const initializeRecaptcha = async (): Promise<void> => {
  try {
    if (!recaptchaVerifier && config.value && config.value.firebase) {
      // Check if recaptcha container exists
      const container = document.getElementById('recaptcha-container')
      if (!container) {
        console.error("[LoginWithPhone]: recaptcha-container element not found")
        // Create it dynamically if it doesn't exist
        const div = document.createElement('div')
        div.id = 'recaptcha-container'
        document.body.appendChild(div)
      }
      
      // Get auth instance from Firebase app
      const auth: Auth = getAuth(config.value.firebase)
      
      // Check Firebase configuration for phone auth
      checkFirebasePhoneAuthConfig(auth)
      
      // Wait a bit to ensure auth is fully initialized
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Check if auth is properly initialized
      if (!auth || !auth.app) {
        console.error("[LoginWithPhone]: Firebase Auth is not properly initialized")
        error.value = { message: "Firebase authentication is not properly configured. Please check your Firebase setup." }
        return
      }
      
      // Initialize RecaptchaVerifier with minimal config
      try {
        // Clear any existing recaptcha container content
        const container = document.getElementById('recaptcha-container')
        if (container) {
          container.innerHTML = ''
        }
        
        // For Firebase v9+, the order is: auth, containerId, parameters
        recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          'size': 'invisible',
          'callback': () => {
            // reCAPTCHA solved, allow signInWithPhoneNumber
            console.log('[LoginWithPhone]: reCAPTCHA solved')
          },
          'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            console.log('[LoginWithPhone]: reCAPTCHA expired')
            recaptchaVerifier = null
          }
        })
        
        // Render the verifier (required for invisible reCAPTCHA)
        await recaptchaVerifier.render()
        
        console.log("[LoginWithPhone]: RecaptchaVerifier created successfully")
      } catch (error: any) {
        console.error("[LoginWithPhone]: Error creating RecaptchaVerifier:", error)
        
        // If it fails, it might be because phone auth is not enabled
        if (error.message?.includes('appVerificationDisabledForTesting')) {
          console.error("[LoginWithPhone]: This error often occurs when:")
          console.error("1. Phone authentication is not enabled in Firebase Console")
          console.error("2. Firebase Auth is not properly initialized")
          console.error("3. There's a version mismatch in Firebase SDK")
        }
        
        // Try to clear any existing verifier
        if (recaptchaVerifier) {
          try {
            recaptchaVerifier.clear()
          } catch (clearError) {
            console.error("[LoginWithPhone]: Error clearing RecaptchaVerifier:", clearError)
          }
          recaptchaVerifier = null
        }
        
        error.value = { message: "Failed to initialize phone authentication. Please try again." }
      }
    }
  } catch (error) {
    console.error("[LoginWithPhone]: Error in recaptcha initialization:", error)
  }
}

// Cleanup on unmount
onUnmounted(() => {
  if (recaptchaVerifier) {
    try {
      recaptchaVerifier.clear()
      recaptchaVerifier = null
    } catch (error) {
      console.error("[LoginWithPhone]: Error clearing RecaptchaVerifier:", error)
    }
  }
})

// Paste handler for OTP code
const onPaste = (event: ClipboardEvent): void => {
  const pastedText: string = event.clipboardData?.getData("text").substr(0, 6) ?? ""
  pastedText.split('').forEach((char: string, index: number) => {
    if (index < code.value.length) {
      code.value[index] = char
    }
  })
  // Optionally, focus the next empty field or the last field
  const firstEmpty: number = code.value.findIndex(c => !c)
  if (firstEmpty !== -1 && codeFieldRefs.value[firstEmpty]) {
    codeFieldRefs.value[firstEmpty]?.focus()
  } else if (codeFieldRefs.value[code.value.length - 1]) {
    codeFieldRefs.value[code.value.length - 1]?.focus()
  }
}

// Auto-focus next OTP input field
const nextElementFocus = (index: number, event: KeyboardEvent): void => {
  let nextIndex: number = index

  if (event.key === "Backspace" || event.key === "ArrowLeft") {
    nextIndex = index > 0 ? index - 1 : 0
    if (event.key === "Backspace" && index > 0) { // Clear current field on backspace before moving
      code.value[index] = ''
    }
  } else if (/^[0-9]$/.test(event.key) || event.key === "ArrowRight") {
    // If a digit is entered and current field is not the last one
    if (/^[0-9]$/.test(event.key) && index < code.value.length - 1) {
      nextTick(() => { // Ensure value is updated before moving focus
        if (codeFieldRefs.value[index + 1]) {
          codeFieldRefs.value[index + 1]?.focus()
        }
      })
      return // Return early to prevent default focus logic below for this case
    }
    nextIndex = index < code.value.length - 1 ? index + 1 : index
  }

  if (codeFieldRefs.value[nextIndex]) {
    codeFieldRefs.value[nextIndex]?.focus()
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

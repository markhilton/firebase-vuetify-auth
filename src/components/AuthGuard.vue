<template>
  <v-dialog
    v-model="dialog"
    :persistent="persistent"
    :retain-focus="false"
    overlay-opacity="0.95"
    content-class="elevation-0"
  >
      <v-container style="max-width: 500px" class="mb-5">
        <v-card flat outlined style="min-height: 500px; display: flex; flex-direction: column;">
          <v-progress-linear :indeterminate="is_loading" />

          <div v-if="isEmailVerificationScreenShown">
            <EmailVerification />
          </div>

          <div v-else>
            <v-tabs v-model="tab" grow>
              <v-tab :key="0" :value="0"> Sign In </v-tab>
              <v-tab v-if="isUserRegistrationAllowed" :key="1" :value="1" @click="() => console.log('[AuthGuard] Register tab clicked!')"> Register </v-tab>
              <v-tab v-if="isResetPasswordScreenShown && config.email" :key="2" :value="2">
                Reset Password
              </v-tab>
              <v-tab v-if="isLoginWithPhoneShown && config.phone" :key="3" :value="3">
                Log in with Phone
              </v-tab>
            </v-tabs>

            <v-card-text>
              <v-tabs-window v-model="tab">
                <v-tabs-window-item :key="0" :value="0" class="pt--1">
                  <LoginCard />
                </v-tabs-window-item>

                <v-tabs-window-item :key="1" :value="1" class="pt-5">
                  <RegisterUser />
                </v-tabs-window-item>

                <v-tabs-window-item :key="2" :value="2">
                  <PasswordReset />
                </v-tabs-window-item>

                <v-tabs-window-item :key="3" :value="3">
                  <LoginWithPhone />
                </v-tabs-window-item>
              </v-tabs-window>
            </v-card-text>
          </div>

          <v-card-actions v-if="!isEmailVerificationScreenShown">
            <LoginWithProvider />
          </v-card-actions>
        </v-card>
      </v-container>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, ref, type ComputedRef } from "vue"
import authcheck from "./authcheck" // The core logic for showing/hiding dialog and checking auth status

import LoginCard from "./LoginCard.vue"
import RegisterUser from "./RegisterUser.vue"
import PasswordReset from "./PasswordReset.vue"
import LoginWithPhone from "./LoginWithPhone.vue"
import EmailVerification from "./EmailVerification.vue"
import LoginWithProvider from "./LoginWithProvider.vue"

import { useRoute, type RouteLocationNormalized } from "vue-router"
import { useAuthStore } from "@/store/auth"
const store = useAuthStore()
const { initializeGuard } = store // Actions

// Use a local ref for tab to ensure reactivity
const localTab = ref(store.tab)

// Watch for store tab changes and update local ref
watch(() => store.tab, (newTab) => {
  console.log('[AuthGuard] Store tab changed to:', newTab)
  localTab.value = newTab
})

// Watch for phone login state changes
watch(() => store.isLoginWithPhoneShown, (isShown) => {
  console.log('[AuthGuard] Phone login shown:', isShown)
  if (isShown) {
    localTab.value = 3
  }
})

// Watch for reset password state changes
watch(() => store.isResetPasswordScreenShown, (isShown) => {
  console.log('[AuthGuard] Reset password shown:', isShown)
  if (isShown) {
    localTab.value = 2
  }
})

// Watch for local tab changes and update store
watch(localTab, (newTab, oldTab) => {
  console.log('[AuthGuard] Local tab changed from', oldTab, 'to:', newTab)
  
  // Only update store if it's different from current store value
  if (store.tab !== newTab) {
    store.SET_TAB(newTab)
  }
  
  // Reset states based on tab changes
  if (newTab === 0 || newTab === 1) {
    // Going to Sign In or Register - reset special states
    if (store.isResetPasswordScreenShown) {
      store.SET_PASSWORD_RESET_SCREEN_SHOWN(false)
    }
    if (store.isLoginWithPhoneShown) {
      store.SET_SHOW_LOGIN_WITH_PHONE(false)
    }
  }
})

// Use localTab for v-model binding
const tab = localTab
const config = computed(() => store.config)
const is_loading = computed(() => store.is_loading)
const isLoginWithPhoneShown = computed(() => store.isLoginWithPhoneShown)
const isUserRegistrationAllowed = computed(() => {
  const allowed = store.isUserRegistrationAllowed
  console.log('[AuthGuard] isUserRegistrationAllowed:', allowed)
  return allowed
})
const isResetPasswordScreenShown = computed(() => store.isResetPasswordScreenShown)
const isEmailVerificationScreenShown = computed(() => store.isEmailVerificationScreenShown)
const persistent = computed(() => store.is_authguard_dialog_persistent)

const route: RouteLocationNormalized = useRoute() // Vue Router's current route

const debug: ComputedRef<boolean> = computed(() => config.value?.debug ?? false)
const currentRoute: ComputedRef<string> = computed(() => route.path) // Reactive current route path

// Computed property for dialog visibility, directly linked to store state
const dialog = computed({
  get: (): boolean => store.init && store.is_authguard_dialog_shown, // Show dialog only after store is initialized
  set: (value: boolean): void => {
    store.is_authguard_dialog_shown = value
    // If dialog is being closed, clean up state
    if (!value && store.loginState) {
      handleDialogClose()
    }
  },
})

// Handle dialog close - clean up state only
const handleDialogClose = (): void => {
  if (debug.value) console.log("[ auth guard ]: Dialog closed by user")

  // Reset the login state to clean up
  store.loginState = null

  // Note: We don't force navigation here - let the app/router handle it naturally
}

// Initialize the authentication guard when the component is mounted
onMounted((): void => {
  initializeGuard()
})

// Watch for changes in the current route path.
// When the route changes, re-evaluate authentication status and dialog visibility.
watch(currentRoute, (after: string, before: string | undefined): void => {
  if (typeof before === "undefined") return // Skip initial watch trigger if 'before' is undefined
  if (debug.value) console.log("[ auth guard ]: vue router current route change: [", before, "] -> [", after, "]")

  authcheck() // Perform the authentication check
})
</script>

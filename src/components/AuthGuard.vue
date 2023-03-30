<template>
  <div>
    is_authguard_dialog_shown: {{ is_authguard_dialog_shown }}<br />
    isAuthGuardDialogPersistent: {{ isAuthGuardDialogPersistent }}
    <v-dialog
      :value="is_authguard_dialog_shown"
      :persistent="isAuthGuardDialogPersistent"
      :retain-focus="false"
      overlay-opacity="0.95"
      content-class="elevation-0"
      @input="SET_AUTH_GUARD_DIALOG_SHOWN($event)"
    >
      <v-container style="max-width: 500px" class="mb-5">
        <v-card flat outlined>
          <v-progress-linear :indeterminate="isLoading" />

          <div v-if="isEmailVerificationScrenShown">
            <EmailVerification />
          </div>

          <div v-else>
            <v-tabs :value="tab" grow @change="tab = $event">
              <v-tab v-if="!isLoginWithPhoneShown" @click="tab = 0 && SET_PASSWORD_RESET_SCREEN_SHOWN(false)">
                Sign In
              </v-tab>
              <v-tab v-if="isLoginWithPhoneShown"> Sign In </v-tab>
              <v-tab v-if="!isResetPasswordScreenShown && isUserRegistrationAllowed"> Register </v-tab>
              <v-tab v-if="(isResetPasswordScreenShown || !isUserRegistrationAllowed) && config.email">
                Reset Password
              </v-tab>
            </v-tabs>

            <v-tabs-items :value="tab" @change="tab = $event">
              <v-tab-item v-if="!isLoginWithPhoneShown" class="pt-5">
                <LoginCard />
              </v-tab-item>

              <v-tab-item v-if="isLoginWithPhoneShown" class="pt-5">
                <LoginWithPhone />
              </v-tab-item>

              <v-tab-item v-if="!isResetPasswordScreenShown && isUserRegistrationAllowed" class="pt-5">
                <RegisterUser />
              </v-tab-item>

              <v-tab-item
                v-if="(isResetPasswordScreenShown || !isUserRegistrationAllowed) && !config.email"
                class="pt-5"
              >
                <PasswordReset />
              </v-tab-item>
            </v-tabs-items>
          </div>

          <v-card-actions v-if="!isEmailVerificationScrenShown">
            <LoginWithProvider />
          </v-card-actions>
        </v-card>
      </v-container>
    </v-dialog>
  </div>
</template>

<script setup>
import { computed, watch, onMounted, onBeforeUpdate, onUpdated } from "vue"
import authcheck from "./authcheck"

import LoginCard from "./LoginCard.vue"
import RegisterUser from "./RegisterUser.vue"
import PasswordReset from "./PasswordReset.vue"
import LoginWithPhone from "./LoginWithPhone.vue"
import EmailVerification from "./EmailVerification.vue"
import LoginWithProvider from "./LoginWithProvider.vue"

import { storeToRefs } from "pinia"
import { useRoute } from "vue-router"
import { useAuthStore } from "@/store/auth"

const store = useAuthStore()
const { initializeGuard, SET_PASSWORD_RESET_SCREEN_SHOWN, SET_AUTH_GUARD_DIALOG_SHOWN, is_authguard_dialog_shown } =
  store
const {
  tab,
  config,
  isLoading,
  isLoginWithPhoneShown,
  isAuthGuardDialogPersistent,
  isUserRegistrationAllowed,
  isEmailVerificationScrenShown,
  isResetPasswordScreenShown,
} = storeToRefs(store)

const route = useRoute()
// let top = this.$vuetify.application.top

const debug = computed(() => config.debug)
const currentRoute = computed(() => route.path)

onMounted(() => {
  initializeGuard()
})

onBeforeUpdate(() => {
  // if (top === 0) top = this.$vuetify.application.top
})

onUpdated(() => {
  // if (top !== 0) this.$vuetify.application.top = top
})

watch(currentRoute, (after, before) => {
  if (typeof before === "undefined") return
  if (debug.value) console.log("[ auth guard ]: vue router current route change: [", before, "] -> [", after, "]")

  authcheck()
})
</script>

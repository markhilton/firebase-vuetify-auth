<template>
  <div>
    <v-dialog
      v-model="dialog"
      :persistent="store.is_authguard_dialog_persistent"
      :retain-focus="false"
      overlay-opacity="0.95"
      content-class="elevation-0"
    >
      <v-container style="max-width: 500px" class="mb-5">
        <v-card flat outlined>
          <v-progress-linear :indeterminate="is_loading" />

          <div v-if="isEmailVerificationScrenShown">
            <EmailVerification />
          </div>

          <div v-else>
            <v-tabs v-model="tab" grow>
              <v-tab value="0"> Sign In </v-tab>
              <v-tab v-if="!isResetPasswordScreenShown && isUserRegistrationAllowed" value="1"> Register </v-tab>
              <v-tab v-if="(isResetPasswordScreenShown || !isUserRegistrationAllowed) && config.email" value="1">
                Reset Password
              </v-tab>
            </v-tabs>

            <v-card-text>
              <v-window v-model="tab">
                <v-window-item v-if="!isLoginWithPhoneShown" value="0" class="pt--1">
                  <LoginCard />
                </v-window-item>

                <v-window-item v-else value="0" class="pt-5">
                  <LoginWithPhone />
                </v-window-item>

                <v-window-item v-if="!isResetPasswordScreenShown && isUserRegistrationAllowed" value="1" class="pt-5">
                  <RegisterUser />
                </v-window-item>

                <v-window-item v-else value="1">
                  <PasswordReset />
                </v-window-item>
              </v-window>
            </v-card-text>
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
import { computed, watch, onMounted } from "vue"
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
const { initializeGuard } = store
const {
  tab,
  config,
  is_loading,
  isLoginWithPhoneShown,
  isUserRegistrationAllowed,
  isResetPasswordScreenShown,
  isEmailVerificationScrenShown,
} = storeToRefs(store)

const route = useRoute()

const debug = computed(() => config.debug)
const currentRoute = computed(() => route.path)

const dialog = computed({
  get: () => store.init && store.is_authguard_dialog_shown,
  set: (value) => (store.is_authguard_dialog_shown = value),
})

onMounted(() => {
  initializeGuard()
})

watch(currentRoute, (after, before) => {
  if (typeof before === "undefined") return
  if (debug.value) console.log("[ auth guard ]: vue router current route change: [", before, "] -> [", after, "]")

  authcheck()
})
</script>

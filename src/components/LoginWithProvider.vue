<template>
  <v-container v-if="isLoginWithProvidersActive" class="text-center ma-0 pa-0">
    <div class="caption"><span v-if="config.email">or </span>login with</div>

    <v-container>
      <v-btn
        v-if="config.google"
        class="mr-2"
        color="#db3236"
        variant="outlined"
        :icon="!isOnlySingleProvider"
        tooltip="Authenticate with Gmail Account"
        @click="loginWithGoogle()"
      >
        <v-icon>mdi-google</v-icon>
        <v-tooltip activator="parent" location="bottom" text="Authenticate with Gmail Account" />
      </v-btn>

      <v-btn
        v-if="config.facebook"
        class="mr-2"
        color="#3b5998"
        variant="outlined"
        :icon="!isOnlySingleProvider"
        @click="loginWithFacebook()"
      >
        <v-icon>mdi-facebook</v-icon>
        <v-tooltip activator="parent" location="bottom" text="Authenticate with Facebook Account" />
      </v-btn>

      <v-btn
        v-if="config.phone"
        class="mr-2"
        color="primary"
        variant="outlined"
        :icon="!isOnlySingleProvider"
        @click="SET_SHOW_LOGIN_WITH_PHONE(true)"
      >
        <v-icon>mdi-cellphone</v-icon>
        <v-tooltip activator="parent" location="bottom" text="Authenticate with Text Message To Your Phone" />
      </v-btn>

      <v-btn
        v-if="config.saml"
        color="secondary"
        variant="outlined"
        :icon="!isOnlySingleProvider"
        @click="loginWithSaml()"
      >
        <v-icon>mdi-onepassword</v-icon>
        <span v-if="isOnlySingleProvider" class="ml-2">{{ config.saml_text }}</span>
        <v-tooltip activator="parent" location="bottom" text="Authenticate with SAML provider" />
      </v-btn>
    </v-container>
  </v-container>
</template>

<script setup>
import { storeToRefs } from "pinia"
import { useAuthStore } from "@/store/auth"

const store = useAuthStore()
// const { loginWithGoogle, loginWithFacebook, loginWithSaml, SET_SHOW_LOGIN_WITH_PHONE } = store
const { loginWithGoogle } = store
const { config, isLoginWithProvidersActive, isOnlySingleProvider } = storeToRefs(store)
</script>

<template>
  <v-container v-if="isLoginWithProvidersActive" class="text-center ma-0 pa-0">
    <div class="caption"><span v-if="config.email">or </span>login with</div>

    <v-container>
      <v-tooltip v-if="config.google" top>
        <template #activator="{ on, attrs }">
          <v-btn
            color="#db3236"
            class="mr-2"
            v-bind="attrs"
            :fab="!isOnlySingleProvider"
            dark
            small
            v-on="on"
            @click="loginWithGoogle()"
          >
            <v-icon>mdi-google</v-icon>
          </v-btn>
        </template>

        <span>Authenticate with Gmail Account</span>
      </v-tooltip>

      <v-tooltip v-if="config.facebook" top>
        <template #activator="{ on, attrs }">
          <v-btn
            color="#3b5998"
            class="mr-2"
            v-bind="attrs"
            :fab="!isOnlySingleProvider"
            dark
            small
            v-on="on"
            @click="loginWithFacebook()"
          >
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
        </template>

        <span>Authenticate with Facebook Account</span>
      </v-tooltip>

      <v-tooltip v-if="config.phone" top>
        <template #activator="{ on, attrs }">
          <v-btn
            color="primary"
            class="mr-2"
            v-bind="attrs"
            :fab="!isOnlySingleProvider"
            dark
            small
            v-on="on"
            @click="SET_SHOW_LOGIN_WITH_PHONE(true)"
          >
            <v-icon>mdi-cellphone</v-icon>
          </v-btn>
        </template>

        <span>Authenticate with Text Message To Your Phone</span>
      </v-tooltip>

      <v-tooltip v-if="config.saml" top>
        <template #activator="{ on, attrs }">
          <v-btn
            color="secondary"
            v-bind="attrs"
            :fab="!isOnlySingleProvider"
            dark
            :small="!isOnlySingleProvider"
            v-on="on"
            @click="loginWithSaml()"
          >
            <v-icon>mdi-onepassword</v-icon>
            <span v-if="isOnlySingleProvider" class="ml-2">{{ config.saml_text }}</span>
          </v-btn>
        </template>

        <span>Authenticate with SAML provider</span>
      </v-tooltip>
    </v-container>
  </v-container>
</template>

<script setup>
import { storeToRefs } from "pinia"
import { useAuthStore } from "@/store/auth"

const store = useAuthStore()
const { loginWithGoogle, loginWithFacebook, loginWithSaml, SET_SHOW_LOGIN_WITH_PHONE } = store
const { config, isLoginWithProvidersActive, isOnlySingleProvider } = storeToRefs(store)
</script>

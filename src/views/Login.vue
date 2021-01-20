<template>
  <v-app>
    <v-main>
      <AuthenticationGuard
        :firebase="firebase"
        :verification="true"
        :registration="true"
        :phone="false"
        :google="true"
        :facebook="false"
      />
    </v-main>
  </v-app>
</template>

<script>
import { firebase } from "@/middleware"
import AuthenticationGuard from "@/components/authentication"

export default {
  components: {
    AuthenticationGuard,
  },

  computed: {
    // firebase middleware for Authentication Guard component
    firebase() {
      return firebase
    },
  },
}
</script>

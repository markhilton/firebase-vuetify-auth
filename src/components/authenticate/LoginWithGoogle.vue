<template>
  <v-btn block large color="red" class="white--text" :disabled="progress" @click="loginWithGoogle()">
    Login with <v-icon class="ml-2">mdi-google</v-icon>
  </v-btn>
</template>

<script>
import store from "@/store"

export default {
  computed: {
    progress() {
      return store.getters["auth/getProgress"]
    },
  },

  methods: {
    loginWithGoogle() {
      store.dispatch("auth/loginWithGoogle")
    },
  },
}
</script>

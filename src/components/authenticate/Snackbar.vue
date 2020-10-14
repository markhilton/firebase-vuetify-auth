<template>
  <v-snackbar v-model="snackbar" :timeout="timeout" left bottom :multi-line="multiLine">
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn color="red" text v-bind="attrs" @click="closeSnackbar()">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import store from "@/store"

export default {
  data: () => ({
    timeout: 5000,
    snackbar: false,
    multiLine: false,
  }),

  watch: {
    text(value) {
      this.snackbar = value ? true : false
    },
    snackbar() {
      if (!this.snackbar) store.commit("auth/SET_SNACKBAR", null)
    },
  },

  computed: {
    text() {
      return store.getters["auth/getSnackbar"]
    },
  },

  methods: {
    closeSnackbar() {
      this.snackbar = false
    },
  },
}
</script>

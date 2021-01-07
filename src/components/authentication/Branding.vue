<template>
  <v-list dense>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          <v-icon color="orange"> brightness_high </v-icon>

          {{ appTitle }}
        </v-list-item-title>
        <v-list-item-subtitle>
          <div class="ml-1">
            {{ appSubTitle }}
          </div>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
/* eslint-env node */

export default {
  computed: {
    appTitle() {
      return process.env.VUE_APP_TITLE
    },
    appSubTitle() {
      return process.env.VUE_APP_SUBTITLE
    },
  },
}
</script>

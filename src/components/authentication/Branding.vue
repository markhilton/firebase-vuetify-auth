<template>
  <v-list dense>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          <v-icon :color="appIconColor">{{ appIcon }}</v-icon>

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
import Vue from "vue"

export default {
  computed: {
    appIcon() {
      return Vue.prototype.$authGuardSettings.icon || "mdi-brightness-7"
    },
    appIconColor() {
      return Vue.prototype.$authGuardSettings.iconColor || "orange"
    },
    appTitle() {
      return Vue.prototype.$authGuardSettings.title || "Authenticate"
    },
    appSubTitle() {
      return Vue.prototype.$authGuardSettings.subtitle || "Firebase Vuetify Authentication NPM package"
    },
  },
}
</script>

<template>
  <v-list dense>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          <v-icon :color="config.iconColor">{{ config.icon }}</v-icon>

          {{ config.title }}
        </v-list-item-title>
        <v-list-item-subtitle>
          <div class="ml-1">
            {{ config.subtitle }}
          </div>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  computed: {
    config() {
      return this.$store.getters["auth/getConfig"]
    },
  },
}
</script>

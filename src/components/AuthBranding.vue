<template>
  <v-list lines="two" dense>
    <v-list-item :title="config.title" :subtitle="config.subtitle">
      <template #title>
        <v-icon :color="config.iconColor">{{ config.icon }}</v-icon>
        {{ config.title }}
      </template>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useAuthStore } from "../store/auth"

const store = useAuthStore()
const config = computed(() => store.config)
</script>

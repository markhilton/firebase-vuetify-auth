<template>
  <v-card>
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2">mdi-cog</v-icon>
      Auth Settings
      <v-spacer />
      <div class="text-body-2 text-medium-emphasis mr-3">
        {{ activeProvidersCount }} providers active
      </div>
      <v-btn
        icon
        variant="text"
        size="small"
        @click="expanded = !expanded"
      >
        <v-icon>{{ expanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-title>
    
    <v-expand-transition>
      <div v-show="expanded">
        <v-divider />
        
        <v-card-text>
          <div class="text-body-2 text-medium-emphasis mb-4">
            Configure authentication providers and options. Changes will be applied immediately and persisted in localStorage.
          </div>
          
          <!-- Current settings chips -->
          <div class="mb-4">
            <v-chip
              v-for="(enabled, key) in currentSettings"
              :key="key"
              :color="enabled ? 'primary' : 'default'"
              variant="tonal"
              size="small"
              class="mr-2 mb-2"
            >
              <v-icon start size="x-small">
                {{ getIconForSetting(key) }}
              </v-icon>
              {{ getNameForSetting(key) }}
            </v-chip>
          </div>
          
          <v-row>
            <v-col cols="12" md="6">
              <div class="text-subtitle-2 mb-2">Authentication Providers</div>
              
              <v-switch
                v-model="settings.email"
                label="Email/Password"
                color="primary"
                density="compact"
                hide-details
                class="mb-2"
              />
              
              <v-switch
                v-model="settings.phone"
                label="Phone Number"
                color="primary"
                density="compact"
                hide-details
                class="mb-2"
              />
              
              <v-switch
                v-model="settings.google"
                label="Google"
                color="primary"
                density="compact"
                hide-details
                class="mb-2"
              />
              
              <v-switch
                v-model="settings.facebook"
                label="Facebook"
                color="primary"
                density="compact"
                hide-details
                class="mb-2"
              />
              
              <v-switch
                v-model="settings.saml"
                label="SAML (OKTA)"
                color="primary"
                density="compact"
                hide-details
                class="mb-2"
              />
            </v-col>
            
            <v-col cols="12" md="6">
              <div class="text-subtitle-2 mb-2">Additional Options</div>
              
              <v-switch
                v-model="settings.registration"
                label="Allow Registration"
                color="primary"
                density="compact"
                hide-details
                class="mb-2"
              />
              
              <v-switch
                v-model="settings.verification"
                label="Require Email Verification"
                color="primary"
                density="compact"
                hide-details
                class="mb-2"
              />
              
              <div class="mt-4">
                <v-btn
                  variant="outlined"
                  size="small"
                  @click="resetToDefaults"
                >
                  Reset to Defaults
                </v-btn>
              </div>
            </v-col>
          </v-row>
          
          <v-alert
            v-if="hasChanges"
            type="warning"
            variant="tonal"
            density="compact"
            class="mt-4"
          >
            <strong>Changes Detected:</strong> A page refresh is required to apply the new settings.
            <v-btn
              variant="text"
              size="small"
              color="warning"
              class="ml-2"
              @click="refreshPage"
            >
              Refresh Now
            </v-btn>
          </v-alert>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useAuthSettings } from '@/demo/composables/useAuthSettings'

// Get auth settings composable
const { authSettings, resetSettings } = useAuthSettings()

// Local state
const expanded = ref(false)
const hasChanges = ref(false)
const isInitialized = ref(false)

// Computed settings for v-model binding
const settings = computed(() => authSettings.value)

// Initialize after component is mounted
onMounted(() => {
  // Wait a tick to ensure settings are loaded
  setTimeout(() => {
    isInitialized.value = true
  }, 100)
})

// Watch for changes only after initialization
watch(settings, () => {
  if (isInitialized.value) {
    hasChanges.value = true
  }
}, { deep: true })

// Count active providers
const activeProvidersCount = computed(() => {
  const providers = ['email', 'phone', 'google', 'facebook', 'saml'] as const
  return providers.filter(p => settings.value[p]).length
})

// Current settings for chips display
const currentSettings = computed(() => settings.value)

// Get icon for setting
const getIconForSetting = (key: string): string => {
  const icons: Record<string, string> = {
    email: 'mdi-email',
    phone: 'mdi-phone',
    google: 'mdi-google',
    facebook: 'mdi-facebook',
    saml: 'mdi-domain',
    registration: 'mdi-account-plus',
    verification: 'mdi-email-check'
  }
  return icons[key] || 'mdi-cog'
}

// Get display name for setting
const getNameForSetting = (key: string): string => {
  const names: Record<string, string> = {
    email: 'Email',
    phone: 'Phone',
    google: 'Google',
    facebook: 'Facebook',
    saml: 'SAML',
    registration: 'Registration',
    verification: 'Verification'
  }
  return names[key] || key
}

// Reset to defaults
const resetToDefaults = () => {
  resetSettings()
}

// Refresh page to apply settings
const refreshPage = () => {
  hasChanges.value = false
  window.location.reload()
}
</script>
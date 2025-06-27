import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Create a test instance of Vuetify
export function createTestVuetify() {
  return createVuetify({
    components,
    directives,
  })
}

// Stub Vuetify components that have CSS issues
export const vuetifyStubs = {
  VIcon: true,
  VAlert: true,
  VBtn: true,
  VCard: true,
  VContainer: true,
  VTextField: true,
  VCheckbox: true,
  VDialog: true,
  VRow: true,
  VCol: true,
  VCardText: true,
  VCardActions: true,
  VDivider: true,
  VProgressCircular: true,
  VProgressLinear: true,
}
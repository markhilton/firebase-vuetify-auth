// vue-router auth guard
import { useAuthStore } from "@/store/auth"
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export default async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): Promise<void> => {
  const authStore = useAuthStore()
  const { debug } = authStore.config

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (debug) console.log("[ auth guard ]: Route requires authentication. Evaluating...")

    if (authStore.routesInitialized === false) {
      await authStore.initializeGuard()
      authStore.routesInitialized = true
    }

    if (authStore.isAuthenticated) {
      if (debug) console.log("[ auth guard ]: User is authenticated. Passed.")
      next()
    } else {
      if (debug) console.log("[ auth guard ]: User not authenticated. Failed.")
      authStore.loginState = to.fullPath
      authStore.SET_PASSWORD_RESET_SCREEN_SHOWN(false)
      authStore.SET_EMAIL_VERIFICATION_SCREEN_SHOWN(false)
      authStore.toggleAuthDialog(true)
      next(false)
    }
  } else {
    next()
  }
}
// vue-router auth guard (Vue Router 4 return-based API)
import { useAuthStore } from "@/store/auth"
import type { RouteLocationNormalized } from 'vue-router'

export const authGuard = async (to: RouteLocationNormalized, from: RouteLocationNormalized): Promise<boolean> => {
  const authStore = useAuthStore()
  const debug = authStore.config?.debug ?? false

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (debug) console.log("[ auth guard ]: Route requires authentication. Evaluating...")

    if (authStore.routesInitialized === false) {
      await authStore.initializeGuard()
      authStore.routesInitialized = true
    }

    if (authStore.isAuthenticated) {
      if (debug) console.log("[ auth guard ]: User is authenticated.")
      return true
    } else {
      if (debug) console.log("[ auth guard ]: User not authenticated.")
      authStore.loginState = to.fullPath
      authStore.SET_PASSWORD_RESET_SCREEN_SHOWN(false)
      authStore.SET_EMAIL_VERIFICATION_SCREEN_SHOWN(false)

      // Set dialog persistence based on navigation context
      const isDirectAccess = !from.name // Covers both null and undefined
      const hasPublicRoute = from.name && !from.matched.some((record) => record.meta.requiresAuth)

      // Dialog should be persistent when:
      // 1. Direct access to protected route (no previous route to go back to)
      // 2. Coming from another protected route (user needs to authenticate)
      // Dialog should be non-persistent when:
      // 3. Coming from a public route (user can go back)
      authStore.is_authguard_dialog_persistent = isDirectAccess || !hasPublicRoute

      if (debug) {
        console.log("[ auth guard ]: Navigation context:", {
          isDirectAccess,
          hasPublicRoute,
          fromRoute: from.name,
          toRoute: to.name,
          dialogPersistent: authStore.is_authguard_dialog_persistent
        })
      }

      authStore.toggleAuthDialog(true)

      // Block navigation to protected routes when not authenticated.
      // Using return-based API (Vue Router 4) instead of next(false) to avoid
      // unhandled promise rejections during initial navigation.
      if (debug) console.log("[ auth guard ]: Blocking navigation to protected route")
      return false
    }
  } else {
    return true
  }
}

export default authGuard

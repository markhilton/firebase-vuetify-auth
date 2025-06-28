import { createPinia } from "pinia"
import { useAuthStore } from "@/store/auth"
import { vMaska } from "maska/vue"
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence, browserSessionPersistence, getRedirectResult } from "firebase/auth"
import type { Auth, Persistence } from "firebase/auth"
import type { App } from 'vue'
import type { AuthGuardSettings } from './types'

// default npm package init config
import defaultSettings from "./store/defaultSettings"

// Import vue component
import AuthGuard from "./components/AuthGuard.vue"

// Import router middleware
import AuthMiddleware from "./components/authguard"
import authcheck from "./components/authcheck"

export default {
  install: (app: App, options: Partial<AuthGuardSettings> = {}) => {
    // merge default settings with user settings
    const globalConfig: AuthGuardSettings = { ...defaultSettings, ...options } as AuthGuardSettings
    const { firebase, debug, verification, router, session } = globalConfig

    const auth: Auth = getAuth(firebase)

    // Set initial default session persistence based on config
    let persistenceMode: Persistence = browserLocalPersistence // Default to 'local'

    if (session === "browser" || session === "session") {
      persistenceMode = browserSessionPersistence
    } else if (session === "none") {
      // Firebase's 'inMemoryPersistence' means state is not persisted even in the current session (lost on refresh/tab close).
      // Your current setup maps "none" to browserSessionPersistence, which means it lasts for the session (tab lifetime).
      // Sticking to your current interpretation for "none".
      persistenceMode = browserSessionPersistence
      if (debug) console.log("[ auth guard ]: 'none' persistence is interpreted as browserSessionPersistence for Firebase.")
    }
    // If you wanted "none" to be truly in-memory (lost on refresh), you would use:
    // else if (session === "none") {
    //   persistenceMode = inMemoryPersistence;
    // }

    setPersistence(auth, persistenceMode)
      .then(() => {
        if (debug) console.log(`[ auth guard ]: Firebase session persistence set to ${session}`)
      })
      .catch((error) => {
        if (debug) console.error("[ auth guard ]: Error setting Firebase session persistence:", error)
      })

    // verify if required dependency instances are passed to this package config
    if (debug) {
      console.log("[ auth guard ]: wrapper initialization...")

      if (firebase === null) {
        console.error("[ auth guard ]: ERROR: firebase instance missing in AuthenticationGuard config!")
      }

      if (router === null) {
        console.error("[ auth guard ]: ERROR: router instance missing in AuthenticationGuard config!")
      }
    }

    // check if pinia jest been created already
    if (!app.config.globalProperties.$pinia) {
      console.log("[ auth guard ]: pinia store not detected - creating...")
      app.use(createPinia())
    }

    const authStore = useAuthStore()

    // commit npm package config to the store
    authStore.config = globalConfig

    // Handle redirect result from social auth (Google, Facebook, etc.)
    getRedirectResult(auth).then((result) => {
      if (debug) console.log("[ auth guard ]: Checking redirect result:", result)
      
      if (result && result.user) {
        if (debug) console.log("[ auth guard ]: Redirect auth successful")
        const { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } = result.user
        authStore.current_user = { uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL }
        authStore.loggedIn = true
        authStore.data = result.user
        
        // Close auth dialog if it's open
        if (authStore.is_authguard_dialog_shown) {
          authStore.toggleAuthDialog(false)
        }
        
        // Clear loginState since user is now authenticated
        if (authStore.loginState) {
          if (debug) console.log("[ auth guard ]: Clearing loginState after redirect:", authStore.loginState)
          authStore.loginState = null
        }
      } else {
        if (debug) console.log("[ auth guard ]: No redirect result or user")
      }
    }).catch((error) => {
      if (debug) console.error("[ auth guard ]: Redirect auth error:", error)
      authStore.error = error
    })

    onAuthStateChanged(auth, (user) => {
      const wasAuthenticated = authStore.loggedIn // Store previous auth state
      const wasInitialized = authStore.init // Check if this is first auth state change
      
      authStore.init = true
      authStore.current_user = user
      
      // Update loggedIn state based on user presence
      authStore.loggedIn = !!user
      if (user) {
        authStore.data = user
      } else {
        authStore.data = null
        
        // If user just signed out (not initial load) and is on a protected route, show auth dialog
        if (wasInitialized && wasAuthenticated) {
          // Use router.isReady() to ensure route information is available
          router.isReady().then(() => {
            const currentRoute = router.currentRoute.value
            const requiresAuth = currentRoute.matched.some((record) => record.meta.requiresAuth)
            
            if (requiresAuth) {
              if (debug) console.log("[ auth guard ]: User signed out on protected route, showing auth dialog")
              
              // Store the current route to potentially navigate back after login
              authStore.loginState = currentRoute.fullPath
              
              // Reset password/email verification screens
              authStore.SET_PASSWORD_RESET_SCREEN_SHOWN(false)
              authStore.SET_EMAIL_VERIFICATION_SCREEN_SHOWN(false)
              
              // Show the auth dialog
              authStore.toggleAuthDialog(true)
              
              // Set dialog as persistent since user is on a protected route
              authStore.is_authguard_dialog_persistent = true
              
              // Force router to re-evaluate the current route
              // This will trigger the auth guard again and block the route
              router.replace(currentRoute.fullPath).catch((error) => {
                if (debug) console.log("[ auth guard ]: Route re-evaluation error:", error)
              })
            }
          })
        }
      }

      // Wait for router to be ready before performing auth check
      // This ensures route meta information is available
      router.isReady().then(() => {
        authcheck() // Perform auth check whenever auth state changes
      })

      if (user) {
        if (debug) console.log("[ auth guard ]: auth state changed. User is Authenticated!")

        // Close auth dialog if it's open and user is now authenticated
        if (authStore.is_authguard_dialog_shown) {
          if (debug) console.log("[ auth guard ]: dialog visibility set to false")
          authStore.toggleAuthDialog(false)
        }

        // Navigate to the stored route after successful authentication
        if (authStore.loginState) {
          const targetRoute = authStore.loginState
          if (debug) console.log("[ auth guard ]: Navigating to stored route:", targetRoute)
          
          // Clear the loginState first
          authStore.loginState = null
          
          // Navigate to the protected route
          router.push(targetRoute).catch((error) => {
            // Handle navigation errors (e.g., if the route doesn't exist)
            if (debug) console.error("[ auth guard ]: Navigation error:", error)
          })
        } else {
          // If no stored route but we're on a protected route, force re-evaluation
          const currentRoute = router.currentRoute.value
          const requiresAuth = currentRoute.matched.some((record) => record.meta.requiresAuth)
          
          if (requiresAuth) {
            if (debug) console.log("[ auth guard ]: User authenticated on protected route, forcing re-evaluation")
            // Force the router to re-evaluate the current route
            // This will make the content visible now that the user is authenticated
            router.replace(currentRoute.fullPath)
          }
        }

        const currentUser = auth.currentUser

        // If email verification is required and the user's email is not verified,
        // periodically reload the user's profile to check for verification status.
        if (verification && currentUser && !currentUser.emailVerified) {
          const emailVerificationUpdate = setInterval(async () => {
            if (!auth.currentUser) { // User signed out
              clearInterval(emailVerificationUpdate)
              return
            }
            await auth.currentUser.reload()
            if (auth.currentUser.emailVerified) {
              clearInterval(emailVerificationUpdate)
              window.location.reload() // Reload the page to reflect verified state
            }
          }, 3500)
        }
      }
      if (debug) console.log("[ auth guard ]: auth state changed. User ID: [", user?.uid || null, "]")
    })

    app.directive("maska", vMaska)
    app.component("AuthenticationGuard", AuthGuard)
  },
}

export { AuthMiddleware, useAuthStore } // export vue router middleware
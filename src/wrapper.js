import { createPinia } from "pinia"
import { useAuthStore } from "@/store/auth"
import { VueMaskDirective } from "v-mask"
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth"

// default npm package init config
import defaultSettings from "./store/defaultSettings"

// Import vue component
import AuthGuard from "./components/AuthGuard.vue"

// Import router middleware
import AuthMiddleware from "./components/authguard"
import authcheck from "./components/authcheck"

export default {
  install: (app, options = {}) => {
    // merge default settings with user settings
    const globalConfig = { ...defaultSettings, ...options }
    const { firebase, debug, verification, router, session } = globalConfig

    const auth = getAuth(firebase)

    // Set default session persistence
    let persistenceMode = browserLocalPersistence; // Default to local
    if (session === "browser" || session === "session") {
      persistenceMode = browserSessionPersistence;
    } else if (session === "none") {
      // Firebase doesn't have a "none" persistence that lasts after tab close without signing out.
      // Session persistence is the closest for "don't remember me across browser closes".
      // If "none" truly means sign out on tab close, that's more complex and typically handled by session cookies or manual sign-out logic.
      // For Firebase, browserSessionPersistence is the best fit for not persisting across browser sessions.
      persistenceMode = browserSessionPersistence; 
      if (debug) console.log("[ auth guard ]: 'none' persistence is interpreted as browserSessionPersistence for Firebase.");
    }
    
    setPersistence(auth, persistenceMode)
      .then(() => {
        if (debug) console.log(`[ auth guard ]: Firebase session persistence set to ${session}`);
      })
      .catch((error) => {
        if (debug) console.error("[ auth guard ]: Error setting Firebase session persistence:", error);
      });

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

    onAuthStateChanged(auth, (user) => {
      authStore.init = true
      authStore.current_user = user

      authcheck() // TODO: verify once

      if (user) {
        if (debug) console.log("[ auth guard ]: auth state changed. User is Authenticated!")

        const currentUser = auth.currentUser

        if (!currentUser.emailVerified && verification) {
          const emailVerificationUpdate = setInterval(async () => {
            await currentUser.reload()

            if (currentUser.emailVerified) {
              clearInterval(emailVerificationUpdate)
              window.location.reload()
            }
          }, 3500)
        }
      }
      if (debug) console.log("[ auth guard ]: auth state changed. User ID: [", user?.uid || null, "]")
    })

    app.directive("mask", VueMaskDirective)
    app.component("AuthenticationGuard", AuthGuard)
  },
}

export { AuthMiddleware, useAuthStore } // export vue router middleware

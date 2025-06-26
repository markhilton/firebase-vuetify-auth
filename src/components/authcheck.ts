import { getAuth, type Auth } from "firebase/auth"
import { useAuthStore } from "@/store/auth"

export default (): void => {
  const authStore = useAuthStore()
  const { firebase, debug } = authStore.config
  const auth: Auth = getAuth(firebase)

  // Function to log authentication status
  const logAuthStatus = (authState: boolean, message: string): void => {
    if (debug) {
      console.log(`[ auth guard ]: ${message}`, authState ? "authenticated" : "not authenticated")
    }
  }

  // Get current auth state from Firebase
  const user = auth.currentUser
  const isAuthenticatedInFirebase = !!user

  // Get current auth state from Vuex store
  const isAuthenticatedInStore = authStore.isAuthenticated

  // Update store if there's a mismatch
  if (isAuthenticatedInFirebase !== isAuthenticatedInStore) {
    authStore.loggedIn = isAuthenticatedInFirebase
    authStore.data = user

    // Log the state change
    if (debug) {
      console.log("[ auth guard ]: Auth state mismatch detected. Updated store:", {
        firebase: isAuthenticatedInFirebase,
        store: isAuthenticatedInStore,
        updated: authStore.loggedIn
      })
    }
  }

  // Log current state
  logAuthStatus(authStore.loggedIn, "Current auth state:")
}
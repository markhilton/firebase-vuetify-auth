import router from "@/router"
import { app as firebase } from "@/middleware/firebase"
import { useAuthStore } from "@/store/auth"

// Create a proper Vue plugin with install method
const AuthGuardPlugin = {
  install(app) {
    // Make the auth store available globally
    app.config.globalProperties.$auth = useAuthStore();
    
    // Initialize the auth store when the app is created
    app.mixin({
      created() {
        // Only initialize once at the root component
        if (this.$parent === null) {
          const authStore = useAuthStore();
          
          // Set the configuration
          authStore.config = {
            debug: true,
            session: "local",
            router,
            firebase,
            saml: true,
            saml_text: "Login with OKTA",
            saml_provider_id: "saml.okta",
            email: true,
            phone: true,
            google: true,
            facebook: true,
            registration: true,
            verification: true,
            title: "AUTH DEMO",
            subtitle: "Firebase Auth Demo for Veutify",
            icon: "mdi-test-tube",
            iconColor: "#FF6D00",
          };
          
          // Initialize the auth guard
          authStore.initializeGuard().then(() => {
            authStore.init = true;
          });
        }
      }
    });
  }
};

// Export the plugin
export { AuthGuardPlugin as AuthGuard };

// Export settings for direct use
export const authGuardSettings = {
  debug: true,
  session: "local",
  router,
  firebase,
  saml: true,
  saml_text: "Login with OKTA",
  saml_provider_id: "saml.okta",
  email: true,
  phone: true,
  google: true,
  facebook: true,
  registration: true,
  verification: true,
  title: "AUTH DEMO",
  subtitle: "Firebase Auth Demo for Veutify",
  icon: "mdi-test-tube",
  iconColor: "#FF6D00",
};

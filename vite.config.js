import { defineConfig } from "vite"

import vue from "@vitejs/plugin-vue"
import vuetify from "vite-plugin-vuetify"
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    cssInjectedByJsPlugin()
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    assetsDir: "",
    lib: {
      entry: './src/wrapper.js',
      name: 'AuthGuard',
      formats: ["es", "cjs"],
      fileName: (format) => `authentication-guard.${format}.js`,
    },
    rollupOptions: {
      external: [
        "vue",
        "pinia",
        "vue-router",
        "vuetify",
        "firebase",
        "vue-router",
        "vuetify/lib",
        "firebase/app",
        "firebase/auth",
        "firebase/firestore",
      ],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        }
      },
    }
  }
})

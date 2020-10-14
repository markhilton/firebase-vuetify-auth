import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs" // Convert CommonJS modules to ES6
import vue from "rollup-plugin-vue" // Handle .vue SFC files
import buble from "@rollup/plugin-buble" // Transpile/polyfill with reasonable browser support

export default {
  input: "src/wrapper.js", // Path relative to package.json
  output: {
    name: "AuthenticationGuard",
    exports: "named",
    globals: {
      "@/middleware": "./src/middleware",
    },
  },
  plugins: [
    resolve(),
    commonjs({
      include: "node_modules/**",
    }),
    vue({
      css: true, // Dynamically inject css as a <style> tag
      compileTemplate: true, // Explicitly convert template to render function
    }),
    buble({
      transforms: { asyncAwait: false },
    }), // Transpile to ES5
  ],
}

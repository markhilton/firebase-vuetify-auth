module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],

  plugins: [
    // https://github.com/vuejs/vue-loader/issues/1697
    // added to prevent modern browser build fail with optional chaining operator
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-optional-chaining",

    // added to prevent build errors related to `npm link` to auth package
    [
      "transform-imports",
      {
        vuetify: {
          transform: "vuetify/es5/components/${member}",
          preventFullImport: true,
        },
      },
    ],
  ],
}

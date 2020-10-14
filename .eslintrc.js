module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    // "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-console": [
      "error",
      {
        allow: ["log", "error", "warn"],
      },
    ],
    "vue/no-v-html": 0,
    "vue/require-prop-types": 0,
    "vue/require-default-prop": 0,
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "comma-dangle": ["error", "always-multiline"],
  },
  parserOptions: {
    parser: "babel-eslint",
  },
}

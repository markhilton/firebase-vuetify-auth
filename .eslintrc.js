module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/recommended", "@vue/prettier"],
  rules: {
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

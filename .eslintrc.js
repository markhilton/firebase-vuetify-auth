module.exports = {
  root: true,
  env: {
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  rules: {
    // override/add rules settings here, such as:
    "no-async-promise-executor": 0,
  },
}

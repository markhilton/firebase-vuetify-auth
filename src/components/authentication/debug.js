import Vue from "vue"

// https://stackoverflow.com/questions/4116608/pass-unknown-number-of-arguments-into-javascript-function
export default (...text) => {
  if (!Boolean(Vue.prototype.$authGuardSettings.debug)) return

  console.log.apply(console, text)
}

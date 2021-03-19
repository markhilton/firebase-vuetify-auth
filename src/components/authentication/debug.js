import Vue from "vue"

// https://stackoverflow.com/questions/4116608/pass-unknown-number-of-arguments-into-javascript-function
export default (...text) => {
  console.log("DEBUG", Vue.prototype.$authGuardSettings)

  if (!Boolean(Vue.prototype.$authGuardSettings.debug)) return

  console.log.apply(this, text)
}

import store from "../../store"

// https://stackoverflow.com/questions/4116608/pass-unknown-number-of-arguments-into-javascript-function
export default (...text) => {
  const { debug } = store.getters["auth/getConfig"]

  if (!Boolean(debug)) return

  console.log.apply(console, text)
}

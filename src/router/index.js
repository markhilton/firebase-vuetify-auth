import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./routes"
import { guard } from "@/middleware"

Vue.use(VueRouter)

const router = new VueRouter({
  routes: routes,
  mode: "history",
})

router.beforeEach(guard)

export default router

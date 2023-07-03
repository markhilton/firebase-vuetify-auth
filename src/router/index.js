import routes from "./routes"
import { guard } from "@/middleware"
import { createWebHistory, createRouter } from "vue-router"

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(guard)

export default router

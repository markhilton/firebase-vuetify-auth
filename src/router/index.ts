import routes from "./routes"
import { guard } from "@/middleware"
import { createWebHistory, createRouter } from "vue-router"
import type { Router } from 'vue-router'

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(guard)

export default router
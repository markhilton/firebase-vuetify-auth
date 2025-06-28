import routes from "./routes"
import { guard } from "@/middleware"
import { createWebHistory, createRouter } from "vue-router"
import type { Router } from 'vue-router'

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(guard)

// Handle navigation errors globally
router.onError((error) => {
  // Ignore navigation aborted errors - these are expected when auth guard blocks navigation
  if (error.message.includes('Navigation aborted')) {
    return
  }
  // Log other errors
  console.error('Router error:', error)
})

export default router
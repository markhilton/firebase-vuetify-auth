import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: "Home",
    path: "/",
    component: () => import("@/views/HomePage.vue"),
<<<<<<< HEAD:src/router/routes.ts
    // meta: { requiresAuth: true },
=======
>>>>>>> e8d24ac54c52ad6937b4434006ba08c67caf605b:src/router/routes.js
  },
  {
    name: "Public",
    path: "/public",
    component: () => import("@/views/PublicRoute.vue"),
  },
  {
    name: "Protected",
    path: "/protected",
    component: () => import("@/views/ProtectedRoute.vue"),
    meta: { requiresAuth: true },
  },
]

export default routes

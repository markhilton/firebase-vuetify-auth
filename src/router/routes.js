export default [
  {
    name: "Home",
    path: "/",
    component: () => import("@/views/Home.vue"),
    meta: { requiresAuth: true },
  },
  {
    name: "Public",
    path: "/public",
    component: () => import("@/views/PublicRoute.vue"),
  },
  {
    name: "Protected",
    path: "/protected",
    meta: { requiresAuth: true },
    component: () => import("@/views/ProtectedRoute.vue"),
  },
]

export default [
  {
    name: "Home",
    path: "/",
    component: () => import("@/views/HomePage.vue"),
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

import type { RouteRecordRaw } from 'vue-router'

const isHomeRouteProtected: boolean = localStorage.getItem("isHomeRouteProtected") === "true";

console.log("isHomeRouteProtected:", isHomeRouteProtected);

const routes: RouteRecordRaw[] = [
  {
    name: "Home",
    path: "/",
    component: () => import("@/views/HomePage.vue"),
    meta: { requiresAuth: isHomeRouteProtected },
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

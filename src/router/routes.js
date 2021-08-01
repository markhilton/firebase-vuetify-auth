import { guard as AuthGuard } from "@/middleware"

export default [
  {
    name: "Home",
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home"),
    beforeEnter: AuthGuard,
  },
  {
    name: "Public",
    path: "/public",
    component: () => import(/* webpackChunkName: "public" */ "@/views/Public"),
  },
  {
    name: "Protected",
    path: "/protected",
    beforeEnter: AuthGuard,
    component: () => import(/* webpackChunkName: "protected" */ "@/views/Protected"),
  },
]

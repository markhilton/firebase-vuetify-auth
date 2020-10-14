import { guard as AuthGuard } from "@/middleware"

export default [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home"),
  },
  {
    path: "/public",
    component: () => import(/* webpackChunkName: "public" */ "@/views/Public"),
  },
  {
    path: "/protected",
    beforeEnter: AuthGuard,
    component: () => import(/* webpackChunkName: "protected" */ "@/views/Protected"),
  },
]

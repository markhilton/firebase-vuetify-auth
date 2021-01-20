import { guard as AuthGuard } from "@/middleware"

export default [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home"),
  },
  {
    name: "Login",
    path: "/login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/Login"),
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

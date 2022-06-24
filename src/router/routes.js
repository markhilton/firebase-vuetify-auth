export default [
  {
    name: "Home",
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home"),
    meta: { requiresAuth: true },
  },
  {
    name: "Public",
    path: "/public",
    component: () => import(/* webpackChunkName: "public" */ "@/views/Public"),
  },
  {
    name: "Protected",
    path: "/protected",
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "protected" */ "@/views/Protected"),
  },
]

import { createWebHistory, createRouter } from "vue-router"
import routes from "./routes"
import { store } from "@/store"

const router = createRouter({
  history: createWebHistory(),
  routes
}) 

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = store.getters["user/isAuthenticated"]

  if (requiresAuth && !isAuthenticated) {
    next({
      name: "LoginPage",
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next()
  }
})

export default router
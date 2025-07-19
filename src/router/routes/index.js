import LoginPage from "@/pages/LoginPage.vue"
import MainPage from "@/pages/MainPage.vue"
import PageNotFound from "@/pages/errors/404.vue"
import requiresAuth from "./requiresAuth"

const routes = [
  { 
    path: "/:pathMatch(.*)*", 
    name: "PageNotFound",
    component: PageNotFound
  },
  { 
    path: "/", 
    name: "MainPage",
    component: MainPage
  },
  { 
    path: "/login",
    name: "LoginPage",
    component: LoginPage
  },
  ...requiresAuth
]

export default routes
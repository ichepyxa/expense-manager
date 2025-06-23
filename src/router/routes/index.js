import LoginPage from "@/pages/LoginPage.vue"
import MainPage from "@/pages/MainPage.vue"
import requiresAuth from "./requiresAuth"

const routes = [
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
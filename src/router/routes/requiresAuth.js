import DashboardPage from "@/pages/DashboardPage.vue";

export default [
  { 
    path: "/dashboard", 
    name: "DashboardPage",
    component: DashboardPage,
    meta: { 
      requiresAuth: true
    }
  }
]
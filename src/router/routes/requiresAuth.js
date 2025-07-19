import DashboardPage from "@/pages/dashboard/MainPage.vue";
import OperationsPage from "@/pages/dashboard/OperationsPage.vue";

export default [
  { 
    path: "/dashboard", 
    name: "DashboardPage",
    component: DashboardPage,
    meta: { 
      requiresAuth: true
    }
  },
  { 
    path: "/dashboard/operations", 
    name: "DashboardOperationsPage",
    component: OperationsPage,
    meta: { 
      requiresAuth: true
    }
  }
]
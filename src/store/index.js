import { createStore } from "vuex"
import user from "./modules/user"
import finances from "./modules/finances"

export const store = createStore({
  modules: {
    user,
    finances
  },
})
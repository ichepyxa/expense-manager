const state = {
  balance: 0,
  operations: [
    {
      id: 214,
      type: "INCOME",
      amount: 1000,
      typePurchase: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio, minima. Sit obcaecati tenetur explicabo, veritatis quaerat laborum ex cumque laboriosam molestias eius autem quo sint, qui excepturi sunt beatae nemo?",
      date: "07.06.2025 18:40"
    },
    {
      id: 214,
      type: "EXPENSES",
      amount: 1000,
      typePurchase: "Покупка машины",
      date: "07.06.2025 18:40"
    },
  ],
  accumulations: 0
}

const mutations = {
  ADD_TO_BALANCE(state, amount) {
    state.balance += amount
  },
  SUBTRACT_FROM_BALANCE(state, amount) {
    state.balance -= amount
  },
  ADD_OPERATION(state, operation) {
    state.operations = [...state.operations, operation]
  },
  REMOVE_OPERATION(state, operationId) {
    state.operations = state.operations.filter(operation => operation.id !== operationId)
  },
  UPDATE_OPERATION(state, updatedOperation) {
    state.operations = state.operations.map(operation => 
      operation.id === updatedOperation.id 
      ? updatedOperation
      : operation
    )
  },
  ADD_TO_ACCUMULATIONS(state, amount) {
    state.accumulations += amount
  },
  SUBTRACT_FROM_ACCUMULATIONS(state, amount) {
    state.accumulations -= amount
  }
}

const actions = {
  addBalance({ commit }, amount) {
    commit("ADD_TO_BALANCE", amount)
  },
  subtractBalance({ commit }, amount) {
    commit("SUBTRACT_FROM_BALANCE", amount)
  },
  addAccumulations({ commit }, amount) {
    commit("ADD_TO_ACCUMULATIONS", amount)
  },
  subtractAccumulations({ commit }, amount) {
    commit("SUBTRACT_FROM_ACCUMULATIONS", amount)
  },
  addOperation({ commit, dispatch }, operation) {
    commit("ADD_OPERATION", operation)
    
    switch (operation.type) {
      case "INCOME":
        dispatch("addBalance", operation.amount)
        break
      case "EXPENSES":
        dispatch("subtractBalance", operation.amount)
        break
      case "ACCUMULATION":
        dispatch("addAccumulations", operation.amount)
        dispatch("subtractBalance", operation.amount)
        break
      case "WITHDRAW_ACCUMULATION":
        dispatch("subtractAccumulations", operation.amount)
        dispatch("addBalance", operation.amount)
        break
    }
  }
};

const getters = {
  balance: state => state.balance,
  income: state => state.income,
  expenses: state => state.expenses,
  operations: state => state.operations,
  accumulations: state => state.accumulations,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
const state = {
  balance: 0,
  operations: [],
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
  addOperation({ commit }, operation) {
    commit("ADD_OPERATION", operation)
    
    switch (operation.type) {
      case "INCOME":
        commit("ADD_TO_BALANCE", operation.amount)
      case "EXPENSES":
        commit("SUBTRACT_FROM_BALANCE", operation.amount)
      case "ACCUMULATION":
        commit("ADD_TO_ACCUMULATIONS", operation.amount)
        commit("SUBTRACT_FROM_BALANCE", operation.amount)

      case "WITHDRAW_ACCUMULATION":
        commit("SUBTRACT_FROM_ACCUMULATIONS", operation.amount)
        commit("ADD_TO_BALANCE", operation.amount)

    }
  }
};

const getters = {
  balance: state => state.balance,
  income: state => state.income,
  expenses: state => state.expenses,
  operations: state => state.operations
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
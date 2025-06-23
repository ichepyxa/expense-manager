const state = {
  balance: 0,
  income: 0,
  expenses: 0,
  operations: [],
  accumulations: 0
}

const mutations = {
  ADD_TO_BALANCE(state, money) {
    state.balance += money
  },
  SUBTRACT_FROM_BALANCE(state, money) {
    state.balance -= money
  },
  ADD_INCOME(state, money) {
    state.income += money
  },
  ADD_EXPENSES(state, money) {
    state.expenses += money
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
  ADD_TO_ACCUMULATIONS(state, money) {
    state.accumulations += money
  },
  SUBTRACT_FROM_ACCUMULATIONS(state, money) {
    state.accumulations -= money
  }
}

const actions = {
  addOperation({ commit }, operation) {
    
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
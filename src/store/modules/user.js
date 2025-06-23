const state = {
  user: null,
  isLoading: false,
  error: null
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  CLEAR_USER(state) {
    state.user = null
  }
}

const actions = {
  async login({ commit }, credentials) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    
    try {
      // Имитация API-запроса
      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve({ 
            id: 1, 
            name: 'John Doe', 
            email: credentials.email,
            localSave: false
          });
        }, 1000)
      });
      
      commit('SET_USER', response)
      return response
    } catch (error) {
      commit('SET_ERROR', 'Ошибка входа')
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  localLogin({ commit }) {
    localStorage.setItem("local_save_mode", true)

    commit('SET_USER', {
      id: null,
      name: "Anonim",
      email: null,
      localSave: true
    })
  },

  initializeFromLocalStorage({ commit }) {
    const isLocalSaveMode = localStorage.getItem('local_save_mode')
    if (isLocalSaveMode) {
      commit('SET_USER', {
        id: null,
        name: "Anonim",
        email: null,
        localSave: true
      })
    }
  },

  logout({ commit }) {
    commit('CLEAR_USER');
  }
};

const getters = {
  currentUser: state => state.user,
  isAuthenticated: state => !!state.user,
  isLoading: state => state.isLoading,
  error: state => state.error
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
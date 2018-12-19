export default {
  namespaced: true,
  state: {
    data: {}
  },
  getters: {
    isLoggedIn (state) {
      return !!state.data._id
    },
    isAdmin (state) {
      return state.data._id === 'admin'
    },
    getUser (state) {
      return state.data
    }
  },
  mutations: {
    login (state, payload) {
      state.data = payload.userData
    },
    logout (state) {
      state.data = {}
    }
  }
}

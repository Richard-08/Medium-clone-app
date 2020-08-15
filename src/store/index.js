import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import posts from './posts'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = {};
    }
  },
  actions: {
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  modules: {
    auth,
    posts
  }
})

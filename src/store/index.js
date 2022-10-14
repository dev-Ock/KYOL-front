import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    number: 2
  },
  getters: {},
  mutations: {
    증가(state, payload) {
      state.number += payload
    }
  },
  actions: {},
  modules: {}
})

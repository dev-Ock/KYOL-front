import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'
export default new Vuex.Store({
  state: {
    nick: '',
    spaceships: [],
    data: {},
    rocket: [],
    currentShipImage: ''
  },
  getters: {
    example: state => state.currentShipImage
  },
  mutations: {
    ai(state, sss) {
      state.data = sss
    },
    changeShip(state, payload) {
      state.currentShipImage = payload
    }
  },
  actions: {
    async gear({ commit }) {
      console.log('gear', localStorage.getItem('token'))

      await axios
        .get(process.env.VUE_APP_API + '/game/gear', {
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
            userid: `${localStorage.getItem('userId')}`
          }
        })
        .then(response => commit('ai', response.data.data))
        .catch(error => {
          console.log('gear 에러', error)
        })
    },

    async gear2({ commit }, payload) {
      console.log('액션스 안쪽 : ', payload)
      console.log('gear2', localStorage.getItem('token'))
      commit('changeShip', payload)
    }
  },
  modules: {}
})

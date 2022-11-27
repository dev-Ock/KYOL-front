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
          // console.log('gear 에러 메시지', error.response.data.message)
          // if (error.response.data.message === 'premium limit') {
          //   return alert(
          //     '프리미엄 사용자는 1분에 100번까지 페이지 요청이 가능합니다. 1분 후에 확인 버튼을 눌러주시기 바랍니다.'
          //   )
          // }
          // if (error.response.data.message === 'free limit') {
          //   return alert(
          //     `무료 사용자는 1분에 5번까지 페이지 요청이 가능합니다. 1분 후에 확인 버튼을 눌러주시기 바랍니다.`
          //   )
          // }
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

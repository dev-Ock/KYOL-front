<template>
  <div>
    <NavBar></NavBar>
    game
    <div id="app" class="status">
      <div>Game Screen</div>
      <div>Score</div>
      <div>Gold</div>
      <GameScreen style="width: 100%; height: 600px"> </GameScreen>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'
import GameScreen from '../components/gamedata/GameScreen.vue'

export default {
  name: 'GameView',
  components: {
    NavBar,
    GameScreen
  },
  data: () => ({
    gold: 0,
    currentShipImg: ''
  }),
  mounted() {
    this.game()
    this.checkInfo()
  },
  methods: {
    async game() {
      console.log('token', localStorage.getItem('token'))
      await axios
        .get(process.env.VUE_APP_API + '/game', {
          headers: {
            Authorization: `${localStorage.getItem('token')}`
            // userid: `${localStorage.getItem('userId')}`,
            // usernick: `${localStorage.getItem('userNick')}`
          }
        })
        .then(response => {
          console.log('Game - response : ', response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    checkInfo() {
      console.log('뭘 체크해야 할까?', this.ctx)
    }
  }
}
</script>

<style></style>

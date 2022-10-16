<template>
  <div>
    <NavBar></NavBar>
    game
    <div id="app">
      <h2>Game Screen</h2>
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
  mounted() {
    this.game()
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
    }
  }
}
</script>

<style></style>

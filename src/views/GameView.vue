<template>
  <div class="gameviehome">
    <NavBar></NavBar>
    <div id="app" class="status">
      <GameScreen style="width: 100%; height: 600px"> </GameScreen>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'
import GameScreen from '../components/gamedata/GameScreen.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'GameView',
  components: {
    NavBar,
    GameScreen
  },
  computed: {
    ...mapState({
      data: 'data'
    }),
    ...mapGetters({
      currentShipImage: 'example'
    })
  },
  mounted() {
    this.checkinformation()
    this.game()
  },
  methods: {
    async game() {
      console.log('token', localStorage.getItem('token'))
      await axios
        .get(process.env.VUE_APP_API + '/game', {
          headers: {
            Authorization: `${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          console.log('Game - response : ', response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    checkinformation() {
      console.log('체크하자 currentShipImage : ', this.currentShipImage)
      console.log('체크하자 data : ', this.data)
    }
  }
}
</script>

<style>
.gameviehome {
  font-family: 'Hahmlet', serif;
}
</style>

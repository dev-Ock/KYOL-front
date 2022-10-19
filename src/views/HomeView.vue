<template>
  <div class="home">
    <NavBar></NavBar>
    <div>
      <video class="video" src="~@/assets/videos/HomebackgroundVideo.mp4" autoplay muted loop></video>
      <div></div>
      <router-link to="/gear">
        <!-- <button v-if="logined" class="btn2" type="button">{{ nick }}님 게임 시작하실라우?</button> -->
        <!-- <div v-if="logined"><img class="block" src="../assets/item/gamestart.png" /></div> -->

        <img src="../assets/item/gamestart.png" />

        <!-- <button v-else class="btn2" type="button">게스트님 게임 시작하실라우?</button> -->
      </router-link>
    </div>
  </div>
</template>

<script>
// import { component } from 'vue/types/umd'
import axios from 'axios'
import NavBar from '@/components/NavBar.vue'
export default {
  name: 'HomeView',
  components: {
    NavBar
  },
  data: () => ({
    nick: '',
    logined: false
  }),
  mounted() {
    this.gamestart()
    this.checkLogined()
  },
  methods: {
    async gamestart() {
      console.log('token', localStorage.getItem('token'))

      await axios
        .get(process.env.VUE_APP_API + '/main', {
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
            userid: `${localStorage.getItem('userId')}`
          }
        })
        .then(response => {
          console.log('gamestart - response : ', response)
          if (response.data.data.nick) {
            this.nick = response.data.data.nick
            localStorage.setItem('currentShipData', response.data.data.currentShipImage)
          } else {
            this.nick = '게스트'
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    checkLogined() {
      if (localStorage.getItem('userNick')) {
        this.logined = true
      }
    }
  }
}
</script>

<style>
.home {
  background: black;
  height: 100%;
  width: 100%;
  /* position: fixed; */
}
.video {
  background: cover no-repeat;
  height: 70%;
  width: 70%;
}
.btn2 {
  height: 7vh;
  widows: 30vw;
  color: #fff;
  background: grey;
  border-radius: 50px;
}
</style>

<template>
  <div>
    <NavBar></NavBar>
    <div class="home">
      <div class="videoBody">
        <div class="playButton">
          <router-link v-if="logined == true" class="imgBtn" to="/gear">
            <img src="../assets/item/gamestart2.png" />
          </router-link>
          <router-link v-else class="imgBtn" to="/signin">
            <img src="../assets/item/gologin2.png" />
          </router-link>
          <p style="color: white">Click here to play</p>
        </div>
        <div class="container">
          <video width="100%" class="video" autoplay muted loop height="auto">
            <source src="~@/assets/videos/HomebackgroundVideo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      <div></div>
    </div>
  </div>
</template>

<script>
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
        console.log('하..')
        this.logined = true
      }
    }
  }
}
</script>

<style scoped>
.home {
  background: url('~@/assets/item/1.png');
  height: 100vh;
  width: 100vw;
  display: fixed;
  font-family: 'Hahmlet', serif;
  position: fixed;
  /* overflow: scroll; */
}
.video {
  height: 100vh;
  width: 100%;
  object-fit: cover;
}
.btn2 {
  height: 7vh;
  widows: 30vw;
  color: #fff;
  background: grey;
  border-radius: 50px;
}
.imgmargin {
  padding: 20px;
}
.videoBody {
  width: 100%;
  height: 600px;
  overflow: hidden;
  margin: 0px auto;
  position: relative;
}

.playButton {
  z-index: 1000;
  position: absolute;
  top: 50%;
  width: 100%;
}
body {
  padding: 0px;
  margin: 0px;
}
.imgBtn {
  margin-top: -24px;
  align-items: center;
  font-size: 48px;
  color: #ffffff;
}
p {
  padding: 0px 0px 0px 0px;
  margin: 0px 0px 0px 0px;
}
</style>

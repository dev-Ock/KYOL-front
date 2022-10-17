<template>
  <div class="home">
    <NavBar></NavBar>
    HOME//
    <div>
      <video class="video" src="~@/assets/videos/gametest.mp4" autoplay muted loop></video>
      <div></div>
      <router-link to="/game">
        <button v-if="logined" class="btn2" type="button">{{ nick }}님 게임 시작하실라우?</button>
        <button v-else class="btn2" type="button">게스트님 게임 시작하실라우?</button>

        <!-- 버튼 반응형으로 만들기 -->
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
          } else {
            this.nick = '게스트'
          }
          // if (this.showFriendListStatus === true) {
          //   this.showFriendListStatus = false
          //   console.log(this.showFriendListStatus)
          // } else {
          //   console.log(response)
          //   this.friendInfoList = response.data.friendInfoList
          //   console.log('loadFriendList - response : ', this.friendInfoList)
          //   this.showFriendListStatus = true
          //   console.log(this.showFriendListStatus)
          // }
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
  background: url('~@/assets/images/space2.gif') 50% 50% / cover no-repeat;
  height: 100vh;
  width: 100vw;
}
.video {
  background: cover no-repeat;
  height: 70vh;
  width: 70vw;
}
.btn2 {
  height: 7vh;
  widows: 30vw;
  color: #fff;
  background: url('~@/assets/images/sky.png');
}
</style>

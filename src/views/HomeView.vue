<template>
  <div class="home">
    <NavBar></NavBar>
    HOME//
    <div>
      <video class="video" src="~@/assets/videos/gametest.mp4" autoplay muted loop></video>
      <div></div>
      <router-link to="/game">
        <div text-white>
          <button class="btn2" type="button">게임 스타뚜</button>
        </div>
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
  methods: {
    async gamestart() {
      console.log('token', localStorage.getItem('token'))

      await axios
        .get(process.env.VUE_APP_API + '/game', {
          headers: {
            Authorization: `${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          console.log('gamestart - response : ', response)

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

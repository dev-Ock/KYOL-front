<template>
  <div class="home">
    <NavBar></NavBar>
    HOME//
    <button @click="gamestart">게임시작</button>
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
          if (this.showFriendListStatus === true) {
            this.showFriendListStatus = false
            console.log(this.showFriendListStatus)
          } else {
            console.log(response)
            this.friendInfoList = response.data.friendInfoList
            console.log('loadFriendList - response : ', this.friendInfoList)
            this.showFriendListStatus = true
            console.log(this.showFriendListStatus)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<template>
  <div>
    <NavBar></NavBar>
    랭킹
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'
export default {
  name: 'RankingView',
  components: {
    NavBar
  },
  mounted() {
    this.ranking()
  },
  methods: {
    async ranking() {
      console.log('token', localStorage.getItem('token'))
      await axios
        .get(process.env.VUE_APP_API + '/ranking', {
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
            userid: `${localStorage.getItem('userId')}`,
            usernick: `${localStorage.getItem('userNick')}`
          }
        })
        .then(response => {
          console.log('Ranking - response : ', response)
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

<style lang="scss" scoped></style>

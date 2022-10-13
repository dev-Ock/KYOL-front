<template>
  <div>
    <NavBar></NavBar>
    mypage//ssss
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from '@/components/NavBar.vue'
export default {
  name: 'MyPageView',
  components: {
    NavBar
  },
  mounted() {
    this.mypage()
  },
  methods: {
    async mypage() {
      console.log('token', localStorage.getItem('token'))
      await axios
        .get(process.env.VUE_APP_API + '/mypage', {
          headers: {
            Authorization: `${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          console.log('My Page - response : ', response)
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

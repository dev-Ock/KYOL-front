<template>
  <div>
    <NavBar></NavBar>
    <div class="container"></div>
    <div class="score">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">순위</th>
            <th scope="col">닉네임</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, i) in data" :key="i">
            <th scope="row">{{ i + 1 }}</th>
            <td>{{ nick[i] }}</td>
            <td>{{ score[i] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="score">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">순위</th>
            <th scope="col">닉네임</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, i) in data" :key="i">
            <th scope="row">{{ i + 1 }}</th>
            <td>{{ nick[i] }}</td>
            <td>{{ score[i] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
  data: () => ({
    score: [],
    nick: [],
    data: [],
    loading: false
  }),
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
          this.data = response.data.data.topRanking
          for (let i in this.data) {
            let a = response.data.data.topRanking[i].score
            this.score.push(a)
          }
          for (let i in this.data) {
            let a = response.data.data.topRanking[i].User.nick
            this.nick.push(a)
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
    }
  }
}
</script>

<style scoped></style>

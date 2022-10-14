<template>
  <div>
    <NavBar></NavBar>

    <div class="score">
      <table class="table table-striped">
        <thead>
          <tr>
            <td colspan="3">&lt; Top Ranking&gt;</td>
          </tr>
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
      <table class="table table-dark table-hover">
        <thead>
          <tr>
            <td colspan="3">&lt; Weekly Ranking&gt;</td>
          </tr>
          <tr>
            <th scope="col">순위</th>
            <th scope="col">닉네임</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, i) in data2" :key="i">
            <th scope="row">{{ i + 1 }}</th>
            <td>{{ nick2[i] }}</td>
            <td>{{ score2[i] }}</td>
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
    data2: [],
    score2: [],
    nick2: [],
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

          this.data2 = response.data.data.weeklyRanking[0]
          for (let i in this.data2) {
            let a = response.data.data.weeklyRanking[0][i].score
            // console.log('실험 : ', response.data.data.weeklyRanking[0])
            // console.log('실험2 : ', response.data.data.weeklyRanking[0][2])
            // console.log('실험3 : ', response.data.data.weeklyRanking[0][2].nick)

            this.score2.push(a)
          }
          for (let i in this.data2) {
            let a = response.data.data.weeklyRanking[0][i].nick
            this.nick2.push(a)
          }
          // if (localStorage.getItem('token') == null) {
          //   alert('로그인하세요')
          // }

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

          // alert('로그인 하세요')
        })
    }
  }
}
</script>

<style scoped>
.score {
  width: 700px;
  height: 700px;
  display: inline-block;
  margin: 50px;
}
</style>

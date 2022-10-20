<template>
  <div>
    <NavBar></NavBar>
    <div class="rankinghome">
      <div class="score">
        <table class="table table-dark table-hover">
          <thead>
            <tr>
              <td colspan="4">&lt; Top Ranking &gt;</td>
            </tr>
            <tr>
              <th scope="col">순위</th>
              <th scope="col">우주선</th>
              <th scope="col">닉네임</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, i) in data" :key="i">
              <th scope="row">
                <div v-if="i == 0">
                  <img width="35px" src="~@/assets/item/Top1st.png" alt="..." />
                </div>
                <div v-else-if="i == 1">
                  <img width="27px" src="~@/assets/item/Top2nd.png" alt="..." />
                </div>
                <div v-else-if="i == 2">
                  <img width="20px" src="~@/assets/item/Top3rd.png" alt="..." />
                </div>
                <div v-else>{{ i + 1 }}</div>
              </th>
              <td>
                <img width="35px" :src="ship[i]" />
              </td>
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
              <td colspan="4">&lt; Recent Ranking Past 7days &gt;</td>
            </tr>
            <tr>
              <th scope="col">순위</th>
              <th scope="col">우주선</th>
              <th scope="col">닉네임</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, i) in data2" :key="i">
              <th scope="row">{{ i + 1 }}</th>
              <td>
                <img width="35px" :src="ship2[i]" />
              </td>
              <td>{{ nick2[i] }}</td>
              <td>{{ score2[i] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
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
    ship: [],
    data: [],
    data2: [],
    score2: [],
    ship2: [],
    nick2: [],
    rankingCrown: [],
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
            Authorization: `${localStorage.getItem('token')}`
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
            let a = response.data.data.topRanking[i].nick
            this.nick.push(a)
          }
          for (let i in this.data) {
            let a = response.data.data.topRanking[i].usedShip
            let b = require(`../assets/item/${a}`)
            this.ship.push(b)
          }

          this.data2 = response.data.data.weeklyRanking[0]
          for (let i in this.data2) {
            let a = response.data.data.weeklyRanking[0][i].score

            this.score2.push(a)
          }
          for (let i in this.data2) {
            let a = response.data.data.weeklyRanking[0][i].nick
            this.nick2.push(a)
          }
          for (let i in this.data2) {
            let a = response.data.data.topRanking[i].usedShip
            let b = require(`../assets/item/${a}`)
            this.ship2.push(b)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.score {
  width: 70vh;
  height: 70vw;
  display: inline-block;
  margin: 30px;
}
th td tr {
  text-align: center;
  vertical-align: middle;
}
tbody {
  text-align: center;
  vertical-align: middle;
}
.rankinghome {
  background: url('~@/assets/images/space2.gif') 50% 50% / cover no-repeat;
  height: 100%;
  width: 100%;
  font-family: 'Hahmlet', serif;
}
</style>

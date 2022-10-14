<template>
  <div>
    <NavBar></NavBar>
    <div class="container rounded bg-white mt-5 mb-5">
      <div class="row">
        <div class="col-md-3 border-right">
          <div class="d-flex flex-column align-items-center text-center p-3 py-5">
            <img class="rounded-circle mt-5" width="150px" :src="rocket" /><span class="font-weight-bold"
              >{{ nick }}님의 우주선</span
            >
          </div>
        </div>
        <div class="col-md-5 border-right">
          <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-right">카이오르 일원 프로필</h4>
            </div>

            <div class="row mt-3">
              <div class="col-md-12">
                <label class="labels">email</label
                ><input v-model="email" type="text" class="form-control" disabled value="" />
              </div>
              <div class="col-md-12">
                <label class="labels">nick</label><input v-model="nick" type="text" class="form-control" value="" />
              </div>
              <div class="col-md-12">
                <label class="labels">password</label
                ><input type="password" class="form-control" placeholder="password" value="" />
              </div>
            </div>

            <div class="mt-5 text-center">
              <button class="btn btn-primary profile-button" type="button" @click="update">회원수정</button>
              <button class="btn btn-primary profile-button mg" type="button" @click="delete2">회원탈퇴</button>
            </div>
          </div>
        </div>
        <div>
          <div>&lt;{{ nick }}님의 보유우주선&gt;</div>
          <div v-for="(a, i) in rocket2" :key="i" class="bb">
            <img class="rounded-circle mt-5 bb" width="150px" :src="rocket2[i]" />
          </div>
        </div>
      </div>
    </div>
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
  data: () => ({
    email: '',
    nick: '',
    rocket: '',
    ssdata: [],
    spaceships: [],
    rocket2: []
  }),
  mounted() {
    this.mypage()
  },
  methods: {
    async mypage() {
      await axios
        .get(process.env.VUE_APP_API + '/mypage', {
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
            userid: `${localStorage.getItem('userId')}`,
            usernick: `${localStorage.getItem('userNick')}`
          }
        })
        .then(response => {
          console.log('My Page - response : ', response)
          this.email = response.data.user.email
          this.nick = response.data.user.nick
          this.rocket = require(`../assets/item/${response.data.user.curentShipImage}`)

          this.ssdata = response.data.user.Spaceships
          for (let i in this.ssdata) {
            let a = this.ssdata[i].shipName
            this.spaceships.push(a)
          }
          for (let i in this.spaceships) {
            let b = require(`../assets/item/${this.spaceships[i]}`)
            this.rocket2.push(b)
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
    async update() {
      await axios
        .put(
          process.env.VUE_APP_API + '/mypage',
          { nick: this.nick, password: this.password },
          {
            headers: {
              Authorization: `${localStorage.getItem('token')}`,
              userid: `${localStorage.getItem('userId')}`,
              usernick: `${localStorage.getItem('userNick')}`
            }
          }
        )
        .then(response => {
          console.log('update:', response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    async delete2() {
      await axios.delete(process.env.VUE_APP_API + '/mypage', {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
          userid: `${localStorage.getItem('userId')}`,
          usernick: `${localStorage.getItem('userNick')}`
        }
      })
    }
  }
}
</script>

<style scoped>
body {
  background: rgb(99, 39, 120);
}

.form-control:focus {
  box-shadow: none;
  border-color: #ba68c8;
}

.profile-button {
  background: rgb(99, 39, 120);
  box-shadow: none;
  border: none;
}

.profile-button:hover {
  background: #682773;
}

.profile-button:focus {
  background: #682773;
  box-shadow: none;
}

.profile-button:active {
  background: #682773;
  box-shadow: none;
}

.back:hover {
  color: #682773;
  cursor: pointer;
}

.labels {
  font-size: 11px;
}

.add-experience:hover {
  background: #ba68c8;
  color: #fff;
  cursor: pointer;
  border: solid 1px #ba68c8;
}
.bb {
  display: inline-block;
}
.mg {
  margin: 5px;
}
</style>

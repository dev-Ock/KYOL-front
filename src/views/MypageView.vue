<template>
  <div>
    <!-- 비밀번호 확인 -->
    <div id="exampleModal" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 id="exampleModalLabel" class="modal-title fs-5">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="form-outline mb-4">
              <input
                id="form3Example4"
                v-model="password"
                type="password"
                class="form-control"
                :class="{ 'is-invalid': pwInspection }"
                placeholder="영문, 숫자, 특수문자 조합 8-16자"
                autocomplete="on"
                required
              />
              <div class="invalid-feedback">좀 더 길게 입력해보는 건 어떨까요</div>
            </div>

            <!-- Confirm Password input -->
            <div class="form-outline mb-4">
              <input
                id="form3Example"
                v-model="confirmPassword"
                type="password"
                class="form-control"
                :class="{ 'is-invalid': cfpwInspection }"
                placeholder="Confirm Password"
                autocomplete="on"
                required
              />
              <div class="invalid-feedback">비밀번호가 틀립니다.</div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="pwupdate">수정</button>
          </div>
        </div>
      </div>
    </div>
    <NavBar></NavBar>
    <div class="mypagehome">
      <div class="row center">
        <div class="col-md-3 border-right">
          <div class="d-flex flex-column align-items-center text-center p-3 py-5">
            <img class="mt-5" width="150px" :src="rocket" /><span class="font-weight-bold fontwhite"
              >{{ nick }}님이 타고있는 우주선</span
            >
          </div>
        </div>
        <div class="col-md-5 border-right">
          <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-right fontwhite">카이오르 {{ nick }}님의 프로필</h4>
            </div>

            <div class="row mt-3">
              <div>
                <label class="labels fontwhite">email</label
                ><input v-model="email" type="text" class="form-control" disabled value="" />
              </div>
              <div>
                <label class="labels fontwhite">nick</label
                ><input v-model="nick" type="text" class="form-control" value="" />
                <button class="bb" @click="update">수정</button>
              </div>

              <div></div>
            </div>

            <div class="mt-5 text-center">
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                비밀번호수정
              </button>

              <button class="btnluxury btn-primary profile-button mg" type="button" @click="delete2">회원탈퇴</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="fontwhite">&lt;{{ nick }}님의 보유우주선&gt;</div>
        <div v-for="(a, i) in rocket2" :key="i" class="bb">
          <img class="mt-5 bb" width="150px" :src="rocket2[i]" />
          <!-- class="rounded-circle mt-5 bb" -->
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
    password: '',
    confirmPassword: '',
    rocket: '',
    ssdata: [],
    spaceships: [],
    rocket2: [],
    loading: false,
    pwInspection: false,
    cfpwInspection: false
  }),
  watch: {
    password(a) {
      this.checkPassword(a)
    },
    confirmPassword(a) {
      this.checkPassword2(a)
    }
  },
  mounted() {
    this.mypage()
  },
  methods: {
    async mypage() {
      console.log('token', localStorage.getItem('token'))
      await axios
        .get(
          process.env.VUE_APP_API + '/mypage',

          {
            headers: {
              Authorization: `${localStorage.getItem('token')}`
              // userid: `${localStorage.getItem('userId')}`,
              // usernick: `${localStorage.getItem('userNick')}`
            }
          }
        )
        .then(response => {
          console.log('My Page - response : ', response)

          this.email = response.data.user.email
          this.nick = response.data.user.nick
          this.rocket = require(`../assets/item/${response.data.user.currentShipImage}`)

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
          process.env.VUE_APP_API + '/mypage/nick-update',
          { nick: this.nick },
          {
            headers: {
              Authorization: `${localStorage.getItem('token')}`
              // userid: `${localStorage.getItem('userId')}`,
              // usernick: `${localStorage.getItem('userNick')}`
            }
          }
        )
        .then(response => {
          console.log('update:', response)
          localStorage.setItem('userNick', response.data.data.nick)

          if (response.data.message == 'nick-update-success') {
            alert('회원정보수정완료')
          }
        })
        .catch(error => {
          console.log(error)
          alert('중복된 닉네임입니다.')
        })
    },
    async delete2() {
      await axios
        .delete(process.env.VUE_APP_API + '/mypage/auth-delete', {
          headers: {
            Authorization: `${localStorage.getItem('token')}`
            // userid: `${localStorage.getItem('userId')}`,
            // usernick: `${localStorage.getItem('userNick')}`
          }
        })
        .then(response => {
          console.log('delete:', response)

          if (response.data.message == 'delete-success') {
            alert('탈퇴완료')
            console.log('탈퇴확인창 확인 눌렀음')
            localStorage.removeItem('userNick')
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            console.log('이제 남남입니다.')
            this.$router.push({ name: 'home' })
            // NavBar.loading = false
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    async pwupdate(e) {
      e.preventDefault()
      if (this.pwInspection == true || this.cfpwInspection == true) {
        alert('값을 제대로 입력하지 않았습니다.')
        throw new Error('에러 발생!')
      }

      await axios
        .put(
          process.env.VUE_APP_API + '/mypage/pw-update',
          { password: this.password },
          {
            headers: {
              Authorization: `${localStorage.getItem('token')}`
              // userid: `${localStorage.getItem('userId')}`,
              // usernick: `${localStorage.getItem('userNick')}`
            }
          }
        )
        .then(response => {
          console.log('pwupdate:', response)
          // if (this.pwInspection == false || this.cfpwInspection == false) {
          //   this.$router.push({ name: 'mypage' })
          // }

          // if (response.data.message == 'update-success') {
          //   alert('회원정보수정완료')
          // }
        })
        .catch(error => {
          console.log(error)
        })
    },
    checkPassword(str) {
      var reg_password = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/
      if (!reg_password.test(str)) {
        return (this.pwInspection = true)
      } else {
        return (this.pwInspection = false)
      }
    },
    checkPassword2() {
      if (this.password == this.confirmPassword) {
        return (this.cfpwInspection = false)
      } else {
        return (this.cfpwInspection = true)
      }
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
  background-image: url('~@/assets/images/button.PNG');
  box-shadow: none;
  border: none;
  color: black;
}

.profile-button:hover {
  background: rgb(251, 240, 240);
}

.profile-button:focus {
  background: rgb(251, 240, 240);
  box-shadow: none;
}

.profile-button:active {
  background: rgb(251, 240, 240);
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
.mypagehome {
  background: url('~@/assets/images/space2.gif') 100% 100% / cover no-repeat;
  height: 100vh;
  width: 100vw;
  position: fixed;
}

.fontwhite {
  color: white;
}
/* .center {
  text-align: center;
  margin: 0 auto;
} */
</style>

<template>
  <div class="center">
    <div class="centerinput">
      <a class="navbar-brand" href="/"><img src="../assets/item/logo3.png" /></a>
      <h1>Please input your password to enter</h1>
      <div class="innerDiv">
        <form class="row g-3">
          <div class="innerDiv">
            <label for="inputPassword2" class="visually-hidden">Password</label>
            <input id="inputPassword2" v-model="password" type="password" class="form-control" placeholder="Password" />
          </div>
          <div class="innerDiv">
            <button type="submit" class="btn btn-warning" @click="pwCheck">확인</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'PwView',
  data: () => ({
    password: '',
    response: ''
  }),
  methods: {
    async pwCheck(e) {
      e.preventDefault()

      await axios
        .post(
          process.env.VUE_APP_API + '/mypage/pw-compare',
          {
            password: this.password
          },
          {
            headers: {
              Authorization: `${localStorage.getItem('token')}`
            }
          }
        )
        .then(response => {
          console.log('pwcheck - response : ', response)
          this.response = response.data.message
          if (this.response == 'compare-result-true') {
            console.log('이동하즈아')
            this.$router.push({ name: 'mypage' })
          }

          // this.$router.push({ name: 'mypage' }) // router/index.js 에서 설정한 name
        })
        .catch(error => {
          console.log('pwcheck - error : ', error)
          alert('비밀번호를 다시 확인해주세요.')
        })
    }
  }
}
</script>

<style>
.center {
  width: 100vw;
  height: 100vh;
  background: url('~@/assets/images/space2.gif') 100% 100% / cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Hahmlet', serif;
}

.centerinput {
  width: 500px;
  height: 500px;
}
.white {
  color: white;
}
.innerDiv {
  align-items: center;
}
h1 {
  margin: 10px 0px 30px 0px;
  padding: 10px 0px 10px 0px;
  font-size: 20px;
  color: gold;
}
</style>

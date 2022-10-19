<template>
  <div class="center">
    <div class="centerinput">
      <form class="row g-3">
        <div class="col-auto">
          <!-- <div class="white">비밀번호를 입력해주세요.</div> -->
          <div>
            <label for="inputPassword2" class="visually-hidden">Password</label>
            <input id="inputPassword2" v-model="password" type="password" class="form-control" placeholder="Password" />
          </div>
        </div>
        <div class="col-auto">
          <!-- <router-link to="/mypage"></router-link
          > -->
          <button type="submit" class="btn btn-primary mb-3" @click="pwCheck">확인</button>
        </div>
      </form>
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
}

.centerinput {
  width: 300px;
  height: 300px;
  /* margin: 0 auto; */
}
.white {
  color: white;
}
</style>

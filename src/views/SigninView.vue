<template>
  <section class="background overflow-hidden">
    <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
      <div class="row gx-lg-5 align-items-center mb-5">
        <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
          <h1 class="my-5 display-5 fw-bold ls-tight fsize" style="color: hsl(218, 81%, 95%)">
            &nbsp;반갑습니다. <br />
            <span style="color: hsl(218, 81%, 95%)"
              ><a class="navbar-brand" href="/"><img src="../assets/item/logo3.png" /></a> x
              <a href="https://uvc.co.kr/index.html" target="_blank"
                ><img class="imgmargin" src="../assets/item/UVClogo2.png" /></a
            ></span>
          </h1>
          <p class="mb-4 opacity-70" style="color: hsl(218, 81%, 85%)">
            <!-- Game game game game shootinh shootihg shooting shooting game
          give me the money money money I'm so tired. I bought an iPhone.
          2 million won, It's too expensive.  // Dj.Jiyoon-->
          </p>
        </div>

        <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
          <div id="radius-shape-1" class="position-absolute shadow-5-strong"></div>
          <!-- <div id="radius-shape-2" class="position-absolute shadow-5-strong"></div> -->

          <!-- <div class="card bg-glass"> -->
          <div class="card">
            <div class="card-body px-4 py-5 px-md-5">
              <form>
                <!-- Email input -->
                <div class="form-outline mb-4">
                  <h6 class="mb-3 title">이메일</h6>
                  <input
                    id="form3Example3"
                    v-model="email"
                    type="email"
                    class="form-control"
                    placeholder="Email address"
                    autocomplete="on"
                  />

                  <!-- <label class="form-label" for="form3Example3">Email address</label> -->
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                  <h6 class="mb-3 title">비밀번호</h6>
                  <input
                    id="form3Example4"
                    v-model="password"
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    autocomplete="on"
                  />
                  <!-- <label class="form-label" for="form3Example4">Password</label> -->
                </div>

                <!-- Submit button -->
                <div class="loginbtn">
                  <button
                    type="submit"
                    class="btn btn-primary btn-block mb-4"
                    :loading="loading"
                    style="width: 300px"
                    @click="signin"
                  >
                    Sign in
                  </button>
                </div>
                <div class="loginbtn2">
                  <!-- Submit button -->
                  <router-link to="/signup"
                    ><button type="submit" class="btn btn-primary btn-block mb-4" style="width: 300px">
                      Sign up
                    </button></router-link
                  >
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SigninView',
  data: () => ({
    email: '',
    password: '',
    loading: false
  }),
  mounted() {
    this.checkLocalStorage()
  },
  methods: {
    async signin(e) {
      if (this.loading) return
      this.loading = true
      e.preventDefault()

      await axios
        .post(process.env.VUE_APP_API + '/auth/login', {
          email: this.email,
          password: this.password
        })
        .then(response => {
          console.log('login - response : ', response)

          localStorage.setItem('token', response.data.token)
          localStorage.setItem('userId', response.data.user.id)
          localStorage.setItem('userNick', response.data.user.nick)

          console.log(localStorage.getItem('userNick'))

          this.$router.push({ name: 'home' })
        })
        .catch(error => {
          console.log('에러다 : ', error)
          console.log(error.response.data.message)
          if (error.response.data.message == 'login-failure') {
            alert('아이디 또는 비밀번호가 틀렸습니다.')
            this.$router.go() // 로그인 화면 새로고침 (아이디, 비번 입력란 초기화를 위해)
          }
        })
    },
    checkLocalStorage() {
      console.log('check signin')
      if (localStorage.getItem('token')) {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style>
.background {
  background: url('~@/assets/images/space.gif') 100% 100% / cover no-repeat;
  height: 100vh;
  width: 100%;
  font-family: 'Hahmlet', serif;
}

#radius-shape-1 {
  background-image: url('~@/assets/images/login_human.png');
  height: 308px;
  width: 370px;
  top: -60px;
  left: -130px;
  /* background: radial-gradient(#44006b, #ad1fff); */
  overflow: hidden;
}
.butter {
  margin-left: 5px;
}
.card {
  background: rgba(255, 255, 255, 0.7);
}

.bg-glass {
  background-color: hsla(0, 0%, 100%, 0.9) !important;
  backdrop-filter: saturate(200%) blur(25px);
}
.loginbtn {
  text-align: center;
  margin: 0px;
  padding: 0px;
  height: 40px;
  widows: 400px;
}
.loginbtn2 {
  text-align: center;
  height: 40px;
}
.title {
  text-align: left;
  margin-bottom: 0;
}
.imgmargin {
  margin-left: 5px;
  margin-bottom: 17px;
}
.fsize {
  font-size: 30px;
}
</style>

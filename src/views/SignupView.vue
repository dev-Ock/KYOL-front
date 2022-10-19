<template>
  <section class="background overflow-hidden">
    <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
      <div class="row gx-lg-5 align-items-center mb-5">
        <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
          <a class="navbar-brand" href="/"><img src="../assets/item/logo3.png" /></a>
          <h1 class="display-5 fw-bold ls-tight margin1" style="color: hsl(218, 81%, 95%)">
            <!-- <a class="navbar-brand" href="/"><img src="../assets/item/logo3.png" /></a> -->
            <!-- class="my-5 display-5 fw-bold ls-tight" -->
            Joining<br />
            <span style="color: hsl(218, 81%, 75%)">save our space</span>
          </h1>
        </div>

        <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
          <div id="radius-shape-1" class="position-absolute shadow-5-strong"></div>

          <div class="card bg-glass">
            <div class="card-body px-4 py-5 px-md-5">
              <form>
                <!-- Email input -->

                <div class="mb-3">
                  <input
                    id="validationTextarea"
                    v-model="email"
                    class="form-control cf"
                    :class="{ 'is-invalid': emailInspection }"
                    placeholder="예) kyor@kyor.com"
                    required
                  /><button class="cf" @click="duplication">중복확인</button>
                  <div class="invalid-feedback">이메일 주소를 정확히 입력해주세요.</div>
                </div>

                <!-- Nickname input -->
                <div class="form-outline mb-4">
                  <input
                    id="form3Example3"
                    v-model="nickname"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': nickInspection }"
                    placeholder="Nickname"
                    autocomplete="on"
                    required
                    @blur="duplicationNick"
                  />
                  <div class="invalid-feedback">중복된 닉네임 입니다.</div>
                </div>

                <!-- Password input -->
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

                <!-- Submit button -->
                <button type="submit" class="btn btn-primary btn-block mb-4" @click="signUp">Sign up</button>
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
// import { flip } from '@popperjs/core'
export default {
  name: 'SignupView',
  data: () => ({
    email: '',
    email2: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    emailInspection: false,
    pwInspection: false,
    cfpwInspection: false,
    nickInspection: false,
    check: false

    // loading: false
  }),
  watch: {
    email(a) {
      this.checkEmail(a)
    },
    password(a) {
      this.checkPassword(a)
    },
    confirmPassword(a) {
      this.checkPassword2(a)
    },
    nick(a) {
      this.duplicationNick(a)
    }
  },
  mounted() {
    this.checkLocalStorage()
  },
  //
  methods: {
    checkEmail(str) {
      var reg_email = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/
      if (!reg_email.test(str)) {
        return (this.emailInspection = true)
      } else {
        return (this.emailInspection = false)
      }
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
    },

    async signUp(e) {
      e.preventDefault()
      if (
        this.emailInspectionm == true ||
        this.pwInspection == true ||
        this.cfpwInspection == true ||
        this.nickInspection == true
      ) {
        alert('값을 제대로 입력하지 않았습니다.')
        throw new Error('에러 발생!')
      }
      // if (this.nickname == null || this.email == null || this.password == null || this.confirmPassword == null) {
      //   alert('빈칸을 입력해주세요')
      //   console.log('확인용', this.nickname)
      //   throw new Error('에러 발생!')
      // }
      if (this.check == false) {
        alert('이메일 중복확인을 해주세요.')
        throw new Error('에러 발생!')
      }

      await axios

        .post(
          process.env.VUE_APP_API + '/auth/join',
          {
            email: this.email,
            nick: this.nickname,
            password: this.password
          }
          // {
          //   headers: {
          //     Authorization: `Bearer ${localStorage.getItem('token')}`
          //   }
          // }
        )
        .then(response => {
          console.log('editcategories - response : ', response, response.data)
          this.$router.push({ name: 'signin' }) // router/index.js 에서 설정한 name
        })
        .catch(error => {
          console.log('editcategories - error : ', error)
          alert('값을 제대로 입력해주세요.')
        })
    },
    async duplication(e) {
      e.preventDefault()
      this.check = true
      console.log('duplicationemail:', this.email)

      await axios
        .post(
          process.env.VUE_APP_API + '/auth/join/email-check',
          {
            email: this.email
          }
          // {
          //   headers: {
          //     Authorization: `Bearer ${localStorage.getItem('token')}`
          //   }
          // }
        )
        .then(response => {
          console.log('duplication - response : ', response, response.data)
          alert('사용 가능한 아이디입니다.')
        })
        .catch(error => {
          console.log('editcategories - error : ', error)
          alert('중복된 아이디입니다.')
        })
    },
    async duplicationNick(e) {
      e.preventDefault()
      console.log('duplicationNick:', this.nickname)

      await axios
        .post(
          process.env.VUE_APP_API + '/auth/join/nick-check',
          {
            nick: this.nickname
          }
          // {
          //   headers: {
          //     Authorization: `Bearer ${localStorage.getItem('token')}`
          //   }
          // }
        )
        .then(response => {
          console.log('duplicationNick - response : ', response, response.data)
          this.nickInspection = false
        })
        .catch(error => {
          console.log('duplicationNick - error : ', error)
          this.nickInspection = true
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
<!-- Section: Design Block -->

<style>
.margin1 {
  margin: 0;
  margin-block-end: 0;
  margin-block-start: 0;
  margin-bottom: 0;
}
.background {
  background: url('~@/assets/images/space.gif') 50% 50% / cover no-repeat;
  height: 100vh;
  width: 100vw;
}

#radius-shape-1 {
  background: url('~@/assets/images/login_human.png') no-repeat;
  /* background-image: url('~@/assets/images/login_human.png'); */
  height: 308px;
  width: 370px;
  top: -60px;
  left: -130px;
  overflow: hidden;
}

.bg-glass {
  background-color: hsla(0, 0%, 100%, 0.9) !important;
  backdrop-filter: saturate(200%) blur(25px);
}
.cf {
  display: inline-block;
}
/* .btn-btn-link1 {
  background: url('~@/assets/images/google.png') 50% 50% / cover no-repeat;
  height: 50px;
  width: 50px;
  border: 0;
  outline: 0;
}
.btn-btn-link2 {
  background: url('~@/assets/images/kakao.png') 50% 50% / cover no-repeat;
  height: 50px;
  width: 50px;
  border: 0;
  outline: 0;
} */
</style>

<!-- Section: Design Block -->

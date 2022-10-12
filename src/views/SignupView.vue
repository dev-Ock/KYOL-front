<template>
  <section class="background overflow-hidden">
    <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
      <div class="row gx-lg-5 align-items-center mb-5">
        <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
          <h1 class="my-5 display-5 fw-bold ls-tight" style="color: hsl(218, 81%, 95%)">
            Welcome to 회원가입 <br />
            <span style="color: hsl(218, 81%, 75%)">for your money</span>
          </h1>
        </div>

        <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
          <div id="radius-shape-1" class="position-absolute shadow-5-strong"></div>

          <div class="card bg-glass">
            <div class="card-body px-4 py-5 px-md-5">
              <form>
                <!-- Email input -->
                <div class="form-outline mb-4">
                  <input
                    id="form3Example5"
                    v-model="email"
                    type="email"
                    class="form-control"
                    placeholder="Email address"
                  />
                </div>

                <!-- Nickname input -->
                <div class="form-outline mb-4">
                  <input
                    id="form3Example3"
                    v-model="nickname"
                    type="text"
                    class="form-control"
                    placeholder="Nickname"
                  />
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                  <input
                    id="form3Example4"
                    v-model="password"
                    type="password"
                    class="form-control"
                    placeholder="Password"
                  />
                </div>

                <!-- Confirm Password input -->
                <div class="form-outline mb-4">
                  <input
                    id="form3Example"
                    v-model="confirmPassword"
                    type="password"
                    class="form-control"
                    placeholder="Confirm Password"
                  />
                </div>

                <!-- Submit button -->
                <button type="submit" class="btn btn-primary btn-block mb-4" @click="signUp">Sign up</button>

                <div class="text-center">
                  <p>or sign up with:</p>
                  <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-kakao"></i>
                  </button>

                  <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-google"></i>
                  </button>
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
  name: 'SignupView',
  data: () => ({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: ''
    // loading: false
  }),
  //
  methods: {
    async signUp(e) {
      e.preventDefault()
      console.log('email:', this.email)

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
        })
    }
  }
}
</script>
<!-- Section: Design Block -->

<style>
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
</style>

<!-- Section: Design Block -->

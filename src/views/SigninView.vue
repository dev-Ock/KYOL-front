<template>
  <section class="background overflow-hidden">
    <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
      <div class="row gx-lg-5 align-items-center mb-5">
        <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
          <h1 class="my-5 display-5 fw-bold ls-tight" style="color: hsl(218, 81%, 95%)">
            Welcome to KYOL <br />
            <span style="color: hsl(218, 81%, 75%)">for your money</span>
          </h1>
          <p class="mb-4 opacity-70" style="color: hsl(218, 81%, 85%)">
            <!-- Game game game game shootinh shootihg shooting shooting game
          give me the money money money I'm so tired. I bought an iPhone.
          2 million won, It's too expensive.  -->
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
                  <input
                    id="form3Example3"
                    v-model="email"
                    type="email"
                    class="form-control"
                    placeholder="Email address"
                  />

                  <!-- <label class="form-label" for="form3Example3">Email address</label> -->
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
                  <!-- <label class="form-label" for="form3Example4">Password</label> -->
                </div>

                <!-- Checkbox -->
                <div class="form-check d-flex justify-content-center mb-4">
                  <div>
                    <input id="form2Example33" class="form-check-input me-2" type="checkbox" value="" checked />
                    <label class="form-check-label" for="form2Example33"> 자동로그인 할 사람~~~ </label>
                  </div>
                </div>

                <!-- Submit button -->
                <div class="loginbtn">
                  <button type="submit" class="btn btn-primary btn-block mb-4" :loading="loading" @click="signin">
                    Sign in
                  </button>
                </div>
                <div class="loginbtn2">
                  <!-- Submit button -->
                  <router-link to="/signup"
                    ><button type="submit" class="btn btn-primary btn-block mb-4 butter">Sign up</button></router-link
                  >
                </div>

                <!-- Register buttons -->
                <div class="text-center">
                  <p>or sign up with:</p>
                  <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-facebook-f"></i>
                  </button>

                  <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-google"></i>
                  </button>

                  <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-twitter"></i>
                  </button>

                  <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-github"></i>
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

<!-- Section: Design Block -->
<script>
import axios from 'axios'
export default {
  name: 'SigninView',
  data: () => ({
    email: '',
    password: '',
    loading: false
  }),
  methods: {
    async signin(e) {
      if (this.loading) return
      this.loading = true
      e.preventDefault()
      console.log(this.response)
      if (this.response) return
      e.preventDefault()
      console.log('email:', this.email)

      await axios
        .post(process.env.VUE_APP_API + '/auth/login', {
          email: this.email,
          password: this.password
        })
        .then(response => {
          console.log('editcategories - response : ', response)
          this.$router.push({ name: 'home' })
        })
      // if (!user) return
      // this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style>
.background {
  background: url('~@/assets/images/space.gif') 50% 50% / cover no-repeat;
  height: 100vh;
  width: 100vw;
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
}
.loginbtn2 {
  text-align: center;
  height: 40px;
}
</style>

<!-- Section: Design Block -->

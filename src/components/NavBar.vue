<template>
  <nav class="navbar navhome navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="/"><img src="../assets/item/logo3.png" /></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarTogglerDemo02" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <!-- <span @click="goRanking"> ranking1</span> -->

            <a class="nav-link" style="color: white" href="/ranking">Ranking</a>
          </li>

          <li class="nav-item" @click="mypagecheck">
            <a class="nav-link" style="color: white" :href="href">My Page</a>
          </li>

          <li class="nav-item" @click="shopcheck">
            <a class="nav-link" style="color: white" :href="href2">Shop</a>
          </li>
          <!-- <li class="nav-item" @click="gamecheck">
            <a class="nav-link" :href="href3">Game</a>
          </li> -->
        </ul>
      </div>
      <div v-show="!loading">
        <router-link to="/signin">
          <button type="button" class="btn btn-outline-dark button">로그인</button>
        </router-link>
        <router-link to="/signup">
          <button type="button" class="btn btn-outline-dark button">회원가입</button>
        </router-link>
      </div>
      <div v-show="loading">
        <div class="statusDiv">
          <img class="gold" style="color: white" src="../assets/item/coin.png" />
          {{ gold.toLocaleString() }} KYOL

          <router-link to="/">
            <button style="margin-left: 25px" type="button" class="btn btn-outline-dark button" @click="logout">
              로그아웃
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'
export default {
  name: 'NavBar',
  data: () => ({
    loading: false,
    href: '/mypage',
    href2: '/shop',
    href3: '/game',
    gold: 0
  }),
  mounted() {
    this.checkLocalstorage()

    this.checkgold()
  },
  methods: {
    goRanking() {
      this.$router.push('/ranking')
    },

    checkgold() {
      if (localStorage.getItem('token')) {
        axios
          .get(process.env.VUE_APP_API + '/main/navbar', {
            headers: {
              Authorization: `${localStorage.getItem('token')}`,
              userid: `${localStorage.getItem('userId')}`
            }
          })
          .then(response => {
            console.log('checkgold - response : ', response)
            this.gold = response.data.data.gold
          })
          .catch(error => {
            console.log(error)
          })
      }
    },

    logincheck() {
      if (localStorage.getItem('userNick') == !null) {
        this.loading = true
      }
    },
    logout() {
      localStorage.removeItem('userNick')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('currentShipData')
      console.log('로그아웃성공')
      this.loading = false
    },
    checkLocalstorage() {
      if (localStorage.getItem('userNick') && localStorage.getItem('token')) {
        this.loading = true
      } else {
        this.loading = false
        // this.$router.go(0)
      }
    },
    mypagecheck() {
      if (localStorage.getItem('token') == null) {
        alert('로그인하시라우')
        this.href = '/signin'
      } else {
        this.href = '/password'
      }
    },
    shopcheck() {
      if (localStorage.getItem('token') == null) {
        alert('로그인하시라우')
        this.href2 = '/signin'
      }
    },
    gamecheck() {
      if (localStorage.getItem('token') == null) {
        alert('로그인하시라우')
        this.href3 = '/signin'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button {
  margin-right: 5px;
  color: white;
}

.statusDiv {
  display: flex;
  align-items: center;
}
.gold {
  height: 30px;
  width: 30px;
  margin-right: 10px;
}
.navbar-toggler {
  position: fixed;
}
.navhome {
  background: url('~@/assets/item/1.png') 100% 100% / cover no-repeat;
  /* height: 100vh;
  width: 100vw; */
  font-family: 'Hahmlet', serif;
  /* position: fixed; */
}
</style>

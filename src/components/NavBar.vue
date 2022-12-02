<template>
  <nav class="navbar navhome navbar-expand-lg">
    <div class="container-fluid">
      <div class="menuBar">
        <a class="navbar-brand" href="/"><img src="../assets/item/logo3.png" /></a>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link nav-link2" style="color: white" href="/ranking">Ranking</a>
          </li>

          <li class="nav-item" @click="mypageCheck">
            <a class="nav-link nav-link2" style="color: white" :href="href">My Page</a>
          </li>

          <li class="nav-item" @click="shopCheck">
            <a class="nav-link nav-link2" style="color: white" :href="href2">Shop</a>
          </li>
          <li class="nav-item">
            <a class="nav-link nav-link2" style="color: white" href="/community">Community</a>
          </li>
        </ul>
      </div>
      <div class="info">
        <div v-show="!loading">
          <router-link to="/signin">
            <button type="button" class="btn btn-outline-dark button">로그인</button>
          </router-link>
          <router-link to="/signup">
            <button type="button" class="btn btn-outline-dark button">회원가입</button>
          </router-link>
        </div>
        <div v-show="loading">
          <div class="statusDiv" style="color: white">
            <img class="gold" style="color: white" src="../assets/item/coin.png" />
            {{ gold.toLocaleString() }} KYOL

            <a href="/">
              <button style="margin-left: 25px" type="button" class="btn btn-outline-dark button" @click="logout">
                로그아웃
              </button>
            </a>
          </div>
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
    href4: '/community',
    gold: 0
  }),
  mounted() {
    this.checkLocalStorage()

    this.checkGold()
  },
  methods: {
    goRanking() {
      this.$router.push('/ranking')
    },

    checkGold() {
      if (localStorage.getItem('token')) {
        axios
          .get(process.env.VUE_APP_API + '/main/navbar', {
            headers: {
              Authorization: `${localStorage.getItem('token')}`,
              userid: `${localStorage.getItem('userId')}`
            }
          })
          .then(response => {
            console.log('checkGold - response : ', response)
            this.gold = response.data.data.gold
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    loginCheck() {
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
    checkLocalStorage() {
      if (localStorage.getItem('userNick') && localStorage.getItem('token')) {
        this.loading = true
      } else {
        this.loading = false
        // this.$router.go(0)
      }
    },
    mypageCheck() {
      if (localStorage.getItem('token') == null) {
        alert('로그인하시라우')
        this.href = '/signin'
      } else {
        this.href = '/password'
      }
    },
    shopCheck() {
      if (localStorage.getItem('token') == null) {
        alert('로그인하시라우')
        this.href2 = '/signin'
      }
    },
    gameCheck() {
      if (localStorage.getItem('token') == null) {
        alert('로그인하시라우')
        this.href3 = '/signin'
      }
    },
    communityCheck() {
      if (localStorage.getItem('token') == null) {
        alert('로그인하시라우')
        this.href4 = '/signin'
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
  font-family: 'Hahmlet', serif;
}
.info {
  display: flex;
  justify-content: end;
  align-content: center;
}
.menuBar {
  display: flex;
  justify-content: start;
  align-content: center;
}
li {
  display: flex;
  align-items: center;
}
</style>

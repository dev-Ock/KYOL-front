<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">KYOL</a>
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
            <a class="nav-link" href="/ranking">Ranking</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/mypage">My Page</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/shop">Shop</a>
          </li>
        </ul>
      </div>
      <div v-show="!loading">
        <router-link to="/signin">
          <button type="button" class="btn btn-outline-success button">로그인</button>
        </router-link>
        <router-link to="/signup">
          <button type="button" class="btn btn-outline-success button">회원가입</button>
        </router-link>
      </div>
      <div v-show="loading">
        <router-link to="/signin">
          <button type="button" class="btn btn-outline-success button" @click="logout">로그아웃</button>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'NavBar',
  data: () => ({
    loading: false
  }),
  mounted() {
    this.checkLocalstorage()
  },
  methods: {
    goRanking() {
      this.$router.push('/ranking')
    },
    logincheck() {
      if (localStorage.getItem('userNick') == !null) {
        this.loading = true
      }
    },
    logout() {
      localStorage.removeItem('userNick')
      localStorage.removeItem('token')
      console.log('로그아웃성공')
      this.loading = false
    },
    checkLocalstorage() {
      if (localStorage.getItem('userNick') && localStorage.getItem('token')) {
        this.loading = true
      } else {
        this.loading = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button {
  margin-right: 5px;
}
</style>

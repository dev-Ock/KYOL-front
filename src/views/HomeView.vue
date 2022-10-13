<template>
  <div class="home">
    <NavBar></NavBar>
    HOME//
  </div>
</template>

<script>
// import { component } from 'vue/types/umd'
import NavBar from '@/components/NavBar.vue'
export default {
  name: 'HomeView',
  components: {
    NavBar
  }
}
</script>

<style>
.home {
  background: url('~@/assets/images/space2.gif') 50% 50% / cover no-repeat;
  height: 100vh;
  width: 100vw;
}
</style>

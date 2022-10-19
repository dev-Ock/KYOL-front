<template>
  <div class="center">
    <form class="row g-3 centerinput">
      <div class="col-auto">
        <label for="staticEmail2" class="visually-hidden">Email</label>
        <input id="staticEmail2" type="text" readonly class="form-control-plaintext" value="email@example.com" />
      </div>
      <div class="col-auto">
        <label for="inputPassword2" class="visually-hidden">Password</label>
        <input id="inputPassword2" type="password" class="form-control" placeholder="Password" />
      </div>
      <div class="col-auto">
        <router-link to="mypage"><button type="submit" class="btn btn-primary mb-3">확인</button></router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PwView',
  methods: {}
}
</script>

<style>
.center {
  width: 100vw;
  height: 100vh;
  background: url('~@/assets/images/space2.gif') 100% 100% / cover no-repeat;
}

.centerinput {
  width: 300px;
  height: 300px;
  margin: 0 auto;
}
.white {
  color: white;
}
</style>

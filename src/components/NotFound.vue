<template>
  <div class="notFound">
    <div class="insideDiv">
      <div class="contextDiv">
        <h1 class="text-80">404</h1>
        <p class="text-36 subheading mb-3">
          <mdicon name="account-tie-hat" :size="50" class="cust-color-green" />
          Page not found!
        </p>
        <p class="text-36 subheading mb-3">Sorry! You are lost !!</p>
        <a class="btn btn-lg btn-primary btn-rounded" href="/">Go back to home</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.cust-color-green {
  color: #10b981;
}
.notFound {
  background: url('~@/assets/images/move.gif') 100% 100% / cover no-repeat;
  height: 100vh;
  width: 100vw;
  vertical-align: middle;
  display: table;
  text-align: center;
}
.insideDiv {
  vertical-align: middle;
  display: table-cell;
  color: #fff;
}
.contextDiv {
  margin: 30px;
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>

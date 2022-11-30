<template>
  <div>
    <NavBar></NavBar><br />
    <div class="basic">
      <div class="card border-dark mb-3">
        <div class="card">
          <div class="card-text">
            <h3>제목 : Title</h3>
            작성자 : Nick<br />
            작성일 : createAt &nbsp; 조회 : 85 &nbsp; 댓글 : 27
          </div>
        </div>
        <div class="card">
          <p class="card-text">
            content<br />
            content<br />
            content<br />
            content<br />
            content<br />
            content<br />
          </p>
        </div>
      </div>
      <div class="btn">
        <button class="btn btn-warning">수정</button>
        <button class="btn btn-warning">삭제</button>
        <button class="btn btn-warning">목록</button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'PostReadView',
  components: {
    NavBar
  }
}
</script>

<style>
.basic {
  text-align: center;
  display: inline-block;
  width: 80%;
  margin: auto;
}
.card {
  text-align: left;
}
.card-text {
  margin-left: 2%;
}
.btn {
  float: right;
}
</style>

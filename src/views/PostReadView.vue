<template>
  <div>
    <NavBar></NavBar>

    <div class="card border-info mb-3" style="max-width: 20rem">
      <div class="card-header">
        <h3>제목 : Title</h3>
        <br />
        작성자 : Nick<br />
        작성일 : createAt<br />
      </div>
      <div class="card-body">
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
    <button></button>
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

<style></style>

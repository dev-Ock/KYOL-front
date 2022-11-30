<template>
  <div>
    <NavBar></NavBar>
    <div class="container">
      <div class="card">
        <div class="card-body">
          <form>
            <div class="form-group">
              <input
                id="postsTitle"
                v-model="title"
                type="text"
                class="form-control"
                placeholder="글 제목을 입력해주세요."
              />
            </div>

            <div class="form-group">
              <textarea
                id="postsContent"
                v-model="content"
                rows="10"
                class="form-control inputmargin"
                placeholder="본문내용을 입력해주세요."
              />
            </div>
          </form>

          <div>
            <div class="col-auto btnbtn">
              <router-link :to="{ path: '/community' }" class="btn btn-warning">
                <i class="fa">등록</i>
              </router-link>
            </div>
          </div>

          <div>
            <div class="col-auto btnbtn">
              <router-link :to="{ path: '/community' }" class="btn btn-warning">
                <i class="fa">취소</i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'PostView',
  components: {
    NavBar
  }
}
</script>
<style>
.inputmargin {
  margin-top: 20px;
}
.btnbtn {
  display: inline;
}
</style>

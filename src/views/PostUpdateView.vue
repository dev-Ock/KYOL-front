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
          <div style="width: 100%; text-align: center">
            <div class="btnbtn">
              <div class="col-auto btnbtn">
                <router-link :to="{ path: '/community' }" class="btn btn-warning">
                  <i class="fa">수정</i>
                </router-link>
              </div>
            </div>

            <div class="btnbtn">
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
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'PostUpdateView',
  components: {
    NavBar
  }
}
</script>

<style>
.btnbtn {
  display: inline-block;
  margin: 3px;
}
</style>

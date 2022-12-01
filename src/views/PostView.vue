<template>
  <div>
    <NavBar></NavBar>
    <div style="position: relative" class="center">
      <div class="container" style="transform: translate(0%, 0%)">
        <div class="card">
          <div class="card-body">
            <h4 class="fontcenter">새로운 글 등록</h4>
            <p class="nickk">작성자 : {{ nick }}</p>
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
                <div class="col-auto btnbtn btn btn-warning" @click="location">
                  <i class="fa">등록</i>
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
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'

export default {
  name: 'PostView',
  components: {
    NavBar
  },
  data: () => ({
    title: '',
    content: '',
    nick: ''
  }),
  mounted() {
    this.idname()
  },
  methods: {
    async location(e) {
      e.preventDefault()
      if (this.title == '' || this.content == '') {
        alert('제목과 내용을 채워주세요.')
      } else {
        await axios

          .post(
            process.env.VUE_APP_API + '/community/post/add',
            {
              title: this.title,
              content: this.content
            },
            {
              headers: {
                Authorization: `${localStorage.getItem('token')}`
              }
            }
          )
          .then(response => {
            console.log('post - response : ', response, response.data)
            this.$router.push({ name: 'community' }) // router/index.js 에서 설정한 name
          })
          .catch(error => {
            console.log('post : ', error)
          })
      }
    },
    idname() {
      this.nick = localStorage.getItem('userNick')
      console.log('nick', this.nick)
    }
  }
}
</script>
<style>
.inputmargin {
  margin-top: 20px;
}
.btnbtn {
  display: inline-block;
  margin: 3px;
}

.center {
  width: 100vw;
  height: 100vh;
  background: url('~@/assets/images/space2.gif') 100% 100% / cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Hahmlet', serif;
}
.nickk {
  text-align: left;
}

.fontcenter {
  text-align: center;
}
</style>

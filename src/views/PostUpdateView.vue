<template>
  <div>
    <NavBar></NavBar>
    <div style="position: relative" class="center">
      <div class="container" style="transform: translate(0%, 0%)">
        <h1 class="title">Modify Post</h1>
        <div class="card">
          <!-- <h4 class="fontcenter">글 수정</h4> -->
          <div class="card-body">
            <p class="nickk">작성자 : {{ nick }}</p>
            <form>
              <div class="form-group">
                <input
                  id="postsTitle"
                  v-model="title"
                  type="text"
                  class="form-control"
                />
              </div>

              <div class="form-group">
                <textarea
                  id="postsContent"
                  v-model="content"
                  rows="10"
                  class="form-control inputmargin"
                />
              </div>
            </form>
            <div style="width: 100%; text-align: center">
              <div class="btnbtn" @click="location">
                <div class="col-auto btnbtn btn btn-warning">
                  <i class="fa">수정</i>
                </div>
              </div>

              <div class="btnbtn">
                <div class="col-auto btnbtn">
                  <router-link
                    :to="{ path: '/community' }"
                    class="btn btn-warning"
                  >
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
import axios from 'axios'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'PostUpdateView',
  components: {
    NavBar
  },
  data: () => ({
    index: 0,
    title: '',
    nick: '',
    content: ''
  }),
  created() {
    this.correctcontent()
  },
  methods: {
    async correctcontent() {
      console.log('내용 수정')
      this.index = this.$route.params.id
      console.log(this.index)
      await axios
        .get(process.env.VUE_APP_API + `/community/post/before-update/${this.index}`, {
          headers: {
            Authorization: `${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          console.log('postupdate - response : ', response)
          this.data = response.data.data.post
          this.title = this.data.title
          this.nick = this.data.nick
          this.content = this.data.content
        })
        .catch(error => {
          console.log('postupdate-error', error)
        })
    },
    async location() {
      console.log('로케이션')
      await axios
        .put(
          process.env.VUE_APP_API + `/community/post/after-update/${this.index}`,
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
          console.log('update - response : ', response, response.data)
          this.$router.push({ name: 'community' }) // router/index.js 에서 설정한 name
        })
        .catch(error => {
          console.log('update : ', error)
        })
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

.title {
  color: #ffffff;
  margin: -160px 0px 40px 0px;
  text-align: left;
}
</style>

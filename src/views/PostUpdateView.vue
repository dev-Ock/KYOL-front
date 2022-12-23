<template>
  <div>
    <NavBar></NavBar>
    <div style="position: relative" class="center">
      <div class="container" style="transform: translate(0%, 0%)">
        <div class="card">
          <h4 class="fontcenter">글 수정</h4>
          <div class="card-body">
            <p class="nickk">작성자 : {{ newData.nick }}</p>
            <form>
              <div class="form-group">
                <input id="postsTitle" v-model="newData.title" type="text" class="form-control" />
              </div>

              <div class="form-group">
                <textarea id="postsContent" v-model="newData.content" rows="10" class="form-control inputmargin" />
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
import axios from 'axios'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'PostUpdateView',
  components: {
    NavBar
  },
  data: () => ({
    index: 0,
    oldData: {
      title: '',
      nick: '',
      content: ''
    },
    newData: {
      title: '',
      nick: '',
      content: ''
    }
  }),
  created() {
    this.correctcontent()
  },
  methods: {
    async correctcontent() {
      console.log('내용 수정')
      console.log('내용 수정 페이지들어옴')
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
          this.oldData.title = this.data.title
          this.oldData.nick = this.data.nick
          this.oldData.content = this.data.content
          this.newData.title = this.data.title
          this.newData.nick = this.data.nick
          this.newData.content = this.data.content
        })
        .catch(error => {
          console.log('postupdate-error', error)
        })
    },
    async location() {
      console.log('newData 찍어보자 : ', this.newData)
      console.log('oldData 찍어보자 : ', this.oldData)
      console.log('결과 찍어보자 : ', this.oldData !== this.newData)
      if (this.newData.content !== this.oldData.content || this.newData.title !== this.oldData.title) {
        console.log('로케이션')
        await axios
          .put(
            process.env.VUE_APP_API + `/community/post/after-update/${this.index}`,
            {
              title: this.newData.title,
              content: this.newData.content
            },
            {
              headers: {
                Authorization: `${localStorage.getItem('token')}`
              }
            }
          )
          .then(response => {
            console.log('update - response : ', response, response.data)
            alert('Modify completed')
            this.$router.push({ name: 'community' }) // router/index.js 에서 설정한 name
          })
          .catch(error => {
            console.log('update : ', error)
          })
      } else {
        alert('Nothing Changed')
      }
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

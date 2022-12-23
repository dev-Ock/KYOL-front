<template>
  <div class="communityHome">
    <NavBar></NavBar><br />
    <div class="basic">
      <div class="card border-dark">
        <div class="card">
          <div class="card-text">
            <h3>제목 : {{ title }}</h3>
            <br />
            <h6>작성자 : {{ nick }}<br /></h6>
            <h6>
              작성일 : {{ createAt }} &nbsp; 조회 : {{ views }} &nbsp; 댓글 :
              {{ lengthcm }}
            </h6>
          </div>
        </div>
        <div class="card">
          <p class="card-text">
            {{ content }}
          </p>
        </div>
      </div>
      <div>
        <button class="btn btn4" @click="golist">목록</button>
        <button
          v-show="invisible"
          class="btn btn4"
          style="margin-top: 20px"
          @click="deletepost"
        >
          삭제
        </button>
      </div>
    </div>

    <link
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
      rel="stylesheet"
    />

    <div class="col-md-12 bootstrap snippets">
      <div class="panel">
        <div v-show="invisible2" class="panel-body">
          <textarea
            v-model="reply"
            class="form-control"
            rows="2"
            placeholder="댓글은 자신을 보는 거울입니다."
          ></textarea>
          <div class="mar-top clearfix">
            <button class="btn btn-warning btn3" type="submit" @click="enroll">
              <i class="fa fa-pencil fa-fw"></i> 등록
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-body2">
        <div class="media-block">
          <div v-for="(a, i) in comment" :key="i" class="commentcard">
            <a class="media-left" href="#"
              ><img
                class="img-circle img-sm"
                alt="Profile Picture"
                src="https://bootdey.com/img/Content/avatar/avatar1.png"
            /></a>
            <div class="media-body">
              <p style="margin: 10px">{{ a.nick }}</p>
              <p class="text-muted text-sm" style="margin: 10px">
                {{ createAt }}
              </p>
              <p style="margin: 10px">{{ comment[i].reply }}</p>
              <!-- <button
                class="btn btn-warning"
                v-show="invisible2"
                @click="writerecomment(i)"
              >
                답글달기
              </button> -->
              <button
                v-show="invisible2"
                class="btn btn4"
                @click="deletecomment(comment[i].id)"
              >
                삭제
              </button>
              <div v-if="i == check">
                <textarea
                  v-model="reply2"
                  class="form-control"
                  placeholder="댓글은 자신을 보는 거울입니다."
                ></textarea>
                <button class="btn btn-warning" @click="gorecomment(i)">
                  확인
                </button>
              </div>
            </div>
            <div class="cmt2">
              <button
                class="btn btn-warning"
                style="flex: 10px; width: 15px; margin: 5px; padding: 5px"
                v-show="invisible2"
                @click="writerecomment(i)"
              >
                답글달기
              </button>
              <button
                class="btn btn-warning"
                style="flex: 10px; width: 15px; margin: 5px; padding: 5px"
                @click="clickcomment(comment[i].id, recomment, i)"
              >
                대댓글보기
              </button>
            </div>
            <hr width="93.5%" align="left" />

            <!-- 대댓글 -->
            <div
              v-for="(b, ii) in recommentlist"
              :key="ii"
              class="commentcard2"
            >
              <div v-if="i == check2" class="media-block">
                <a class="media-left" href="#"
                  ><img
                    class="img-circle img-sm"
                    alt="Profile Picture"
                    src="https://bootdey.com/img/Content/avatar/avatar2.png"
                /></a>
                <div class="media-body">
                  <div class="commentcard2">
                    <p>{{ recommentlist[ii].nick }}</p>
                    <p class="text-muted text-sm">{{ createAt }}</p>
                    <p>{{ recommentlist[ii].re_reply }}</p>
                  </div>
                  <button
                    v-show="invisible2"
                    class="btn btn4"
                    @click="deleterecomment(recommentlist[ii].id)"
                  >
                    삭제
                  </button>
                </div>
                <hr width="93.5%" align="left" />
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
  name: 'PostReadView',
  components: {
    NavBar
  },
  data: () => ({
    title: '',
    nick: '',
    createAt: '',
    content: '',
    views: '',
    comment: [],
    recomment: [],
    index: 0,
    data: {},
    date: '',
    lengthcm: 0,
    count: [],
    realnick: '',
    recm: false,
    recm2: false,
    num: 0,
    postid: 0,
    recommentid: 0,
    reply: '',
    invisible: false,
    reply2: '',
    found: 0,
    commentId: 0,
    check: -1,
    recommentlist: [],
    check2: -1,
    deletenum: 0,
    invisible2: true
  }),
  mounted() {
    this.postcontent()
    this.showRecomment()
  },
  methods: {
    async gorecomment(num) {
      console.log('확인하자', num)
      this.postid = this.comment[num].PostId
      this.commentId = this.comment[num].id
      if (this.reply2 == '') {
        alert('내용을 입력해주세요.')
      } else {
        await axios
          .post(
            process.env.VUE_APP_API + `/community/recomment/add/${this.postid}/${this.commentId}`,
            {
              re_reply: this.reply2
            },
            {
              headers: {
                Authorization: `${localStorage.getItem('token')}`
              }
            }
          )
          .then(response => {
            console.log('re_reply - response : ', response, response.data)
            this.$router.go()
            // this.$router.push({ name: 'community' }) // router/index.js 에서 설정한 name
          })
          .catch(error => {
            console.log('re_reply : ', error)
          })
      }
    },
    writerecomment(num) {
      this.check = num
    },
    clickcomment(click1, click2, num) {
      console.log('확인1 : commentId', click1)
      console.log('확인2 : Array : All recommends', click2)
      console.log('확인3')
      this.check2 = num
      // 반복문 돌려서 CommentId를 알아내자
      console.log('값을 알아보자', this.recommentid)
      this.recommentlist = []
      for (let i = 0; i < click2.length; i++) {
        if (click1 == click2[i].CommentId) {
          this.recommentlist.push(click2[i])
        }
      }
      console.log('배열 담기나', this.recommentlist)
      console.log(this.recommentid)
      this.recm = true
      if (this.postid == this.recommentid) {
        console.log('우짜라고')
      }
    },
    golist() {
      this.$router.push({ name: 'community' })
    },
    async deletecomment(id) {
      this.deletenum = id
      alert('삭제하시겠습니까?')
      await axios
        .delete(process.env.VUE_APP_API + `/community/comment/delete/${this.deletenum}`, {
          headers: {
            Authorization: `${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          console.log('deletecomment:', response)
          this.$router.go()
        })
        .catch(error => {
          console.log('deletecomment:', error)
          alert('본인이 쓴 댓글만 삭제할 수 있습니다.')
        })
    },
    async deleterecomment(id) {
      this.deletenum = id
      alert('삭제하시겠습니까?')
      await axios
        .delete(process.env.VUE_APP_API + `/community/recomment/delete/${this.deletenum}`, {
          headers: {
            Authorization: `${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          console.log('deletecomment:', response)
          this.$router.go()
        })
        .catch(error => {
          console.log('deletecomment:', error)
          alert('본인이 쓴 댓글만 삭제할 수 있습니다.')
        })
    },
    async deletepost() {
      console.log('cehcek1', this.index)
      await axios
        .delete(process.env.VUE_APP_API + `/community/post/delete/${this.index}`, {
          headers: {
            Authorization: `${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          console.log('delete:', response)
          this.$router.push({ name: 'community' })
        })
        .catch(error => {
          console.log('delete:', error)
        })
    },
    async enroll() {
      console.log(this.reply)
      if (this.reply == '') {
        alert('내용을 입력해주세요.')
      } else {
        await axios
          .post(
            process.env.VUE_APP_API + `/community/comment/add/${this.index}`,
            {
              reply: this.reply
            },
            {
              headers: {
                Authorization: `${localStorage.getItem('token')}`
              }
            }
          )
          .then(response => {
            console.log('reply - response : ', response, response.data)
            this.$router.go()
            // this.$router.push({ name: 'community' }) // router/index.js 에서 설정한 name
          })
          .catch(error => {
            console.log('reply : ', error)
          })
      }
    },
    async postcontent() {
      this.index = this.$route.params.id
      console.log('이거보이나', this.index)
      await axios
        .get(process.env.VUE_APP_API + `/community/post/read/${this.index}`, {
          headers: {
            Authorization: `${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          console.log('post - response : ', response)
          this.data = response.data.data.post
          this.title = this.data.title
          this.nick = this.data.nick
          this.content = this.data.content
          this.views = this.data.count
          this.createAt = String(this.data.createdAt).substring(0, 10)
          this.realnick = localStorage.getItem('userNick')
          this.comment = response.data.data.comment
          this.recomment = response.data.data.recomment
          this.count = response.data.data.comment
          this.lengthcm = this.count.length
          console.log('대댓:', this.recomment)
          //commentid가 같은 것만
          if (localStorage.getItem('userNick') == this.nick) {
            this.invisible = true
          }
          if (localStorage.getItem('userNick') == null) {
            this.invisible2 = false
          }
        })
        .catch(error => {
          console.log('post-error', error)
        })
    },
    async showRecomment() {
      await axios
        .get(process.env.VUE_APP_API + `/community/post/read/${this.index}`, {
          headers: {
            Authorization: `${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          console.log('대댓 - response : ', response)
          console.log('확인', this.recm)
        })
        .catch(error => {
          console.log('에러다 : ', error)
          this.closebtn = false
        })
    },
    correct() {
      // 아이디 체크
      if (this.nick == this.realnick) {
        this.$router.push(`/postupdate/${this.index}`)
      } else {
        alert('본인이 쓴 글만 수정가능합니다.')
      }
    }
  }
}
</script>

<style>
.communityHome {
  background: url('~@/assets/images/space2.gif') 100% 100% / cover no-repeat;
  /* height: 100vh; */
  width: 100vw;
  font-family: 'Hahmlet', serif;
}

.basic {
  text-align: center;
  display: inline-block;
  margin: auto;
  width: 60%;
}
.card {
  text-align: left;
}
.card-text {
  margin-left: 2%;
  padding: 25px;
}
.btn2 {
  float: right;
  margin-right: 12.5%;
}
.btn3 {
  margin: 3px;
  float: right;
}
.btn4 {
  margin: -100px 90px;
  float: right;
  color: red;
}
.cmt {
  margin-left: 10px;
}
/* .comment {
  background-color: dimgrey;
} */
body {
  /* margin-top: 20px; */
  background: #ebeef0;
}

.img-sm {
  width: 46px;
  height: 46px;
}

.panel {
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.075);
  border-radius: 0;
  border: 0;
  margin-bottom: 15px;
}

.panel .panel-footer,
.panel > :last-child {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.panel .panel-heading,
.panel > :first-child {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.panel-body {
  padding: 25px 0px 20px 0px;
  width: 60vw;
  margin: auto;
  margin-bottom: 30px;
}

.media-block .media-left {
  display: block;
  float: left;
}

.media-block .media-right {
  float: right;
}

.media-block .media-body {
  display: block;
  overflow: hidden;
  width: auto;
  padding-left: 10px;
}

.middle .media-left,
.middle .media-right {
  vertical-align: middle;
}
.middle .media-body {
  text-align: left !important;
}
.thumbnail {
  border-radius: 0;
  border-color: #e9e9e9;
}

.tag.tag-sm,
.btn-group-sm > .tag {
  padding: 5px 10px;
}

.tag:not(.label) {
  background-color: #fff;
  padding: 6px 12px;
  border-radius: 2px;
  border: 1px solid #cdd6e1;
  font-size: 12px;
  line-height: 1.42857;
  vertical-align: middle;
  -webkit-transition: all 0.15s;
  transition: all 0.15s;
}
.text-muted,
a.text-muted:hover,
a.text-muted:focus {
  color: #acacac;
}
.text-sm {
  font-size: 0.9em;
}
.text-5x,
.text-4x,
.text-5x,
.text-2x,
.text-lg,
.text-sm,
.text-xs {
  line-height: 1.25;
}

.btn-trans {
  background-color: transparent;
  border-color: transparent;
  color: #929292;
}

.btn-icon {
  padding-left: 9px;
  padding-right: 9px;
}

.btn-sm,
.btn-group-sm > .btn,
.btn-icon.btn-sm {
  padding: 5px 10px;
}
.commentcard {
  background-color: #ffffff;
  width: 60vw;
  text-align: left;
  margin-bottom: 10px;
  padding: 10px 10px 10px 10px;
  /* border-radius: 10px; */
  margin: auto;
}
.commentcard2 {
  background-color: #ffffff;
  width: 58vw;
  text-align: left;
  margin-bottom: 10px;
  padding: 10px 10px 10px 10px;
  /* border-radius: 10px; */
  margin: auto;
}
.mar-top {
  margin-top: 15px;
}
.cmt2 {
  display: flex;
  margin: 10px;
  padding: 10px;
  width: 300px;
}
</style>

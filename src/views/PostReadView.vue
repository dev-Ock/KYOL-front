<template>
  <div>
    <NavBar></NavBar><br />
    <div class="basic">
      <div class="card border-dark">
        <div class="card">
          <div class="card-text">
            <h3>제목 : {{ title }}</h3>
            작성자 : {{ nick }}<br />
            작성일 : {{ createAt }} &nbsp; 조회 : {{ views }} &nbsp; 댓글 : {{ lengthcm }}
          </div>
        </div>
        <div class="card">
          <p class="card-text">
            {{ content }}
          </p>
        </div>
      </div>
      <div>
        <button class="btn btn-warning btn3" @click="correct">수정</button>
        <button class="btn btn-warning btn3">삭제</button>
        <button class="btn btn-warning btn3">목록</button>
      </div>
      <br /><br /><br />
    </div>

    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
    <div class="container bootdey">
      <div class="col-md-12 bootstrap snippets">
        <div class="panel">
          <div class="panel-body">
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
              <p class="text-muted text-sm">{{ createAt }}</p>
              <p>{{ comment[i].reply }}</p>
            </div>
            <div>
              <div>
                <!-- 댓글 좋아요 아이콘 -->
                <!-- <a class="btn btn-sm btn-default btn-hover-success" href="#"><i class="fa fa-thumbs-up"></i></a> -->
                <!-- <a class="btn btn-sm btn-default btn-hover-danger" href="#"><i class="fa fa-thumbs-down"></i></a> -->
              </div>
              <button class="btn btn-warning btn3 btn4" @click="clickcomment(i)">Comment</button>
            </div>
            <hr width="93.5%" align="left" />
          </div>
        </div>
        <div v-for="(b, i) in recomment" :key="i" class="commentcard">
          <div v-show="recm" class="media-block">
            <a class="media-left" href="#"
              ><img
                class="img-circle img-sm"
                alt="Profile Picture"
                src="https://bootdey.com/img/Content/avatar/avatar2.png"
            /></a>
            <div class="media-body">
              <div class="commentcard">
                <p>{{ recomment[i].nick }}</p>
                <p class="text-muted text-sm">{{ createAt }} 2022-12-01</p>
                <p>{{ recomment[i].re_reply }}</p>
              </div>
              <button class="btn btn-warning btn3 btn4">Comment</button>
            </div>
            <hr width="93.5%" align="left" />
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
    num: 0,
    postid: 0,
    recommentid: 0,
    reply: ''
  }),
  mounted() {
    this.postcontent()
    this.showRecomment()
  },
  methods: {
    clickcomment(selectcoment) {
      console.log('클릭중')
      this.num = selectcoment
      this.recm = true
      console.log(this.num)
      this.postid = this.comment[this.num].id
      // 반복문 돌려서 CommentId를 알아내자
      // this.recommentid = this.recomment.[]CommentId
      console.log(this.recommentid)
      if (this.postid == this.recommentid) {
        console.log('우짜라고')
      }
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
          this.createAt = this.data.createdAt
          this.realnick = localStorage.getItem('userNick')
          this.comment = response.data.data.comment
          this.recomment = response.data.data.recomment
          this.count = response.data.data.comment
          this.lengthcm = this.count.length
          console.log('대댓:', this.recomment)
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
.basic {
  text-align: center;
  display: inline-block;
  margin: auto;
  width: 90%;
}
.card {
  text-align: left;
}
.card-text {
  margin-left: 2%;
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
  margin: -40px 90px;
  float: right;
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
}
.panel-body2 {
  padding: 25px 0px 20px 110px;
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
  text-align: left;
  margin-bottom: 15px;
  margin-left: 2%;
  padding: 0px 20px 20px 0px;
}
.mar-top {
  margin-top: 15px;
}
</style>

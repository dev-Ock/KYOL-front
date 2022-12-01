<template>
  <div>
    <NavBar></NavBar><br />
    <div class="basic">
      <div class="card border-dark">
        <div class="card">
          <div class="card-text">
            <h3>제목 : {{ title }}</h3>
            작성자 : {{ nick }}<br />
            작성일 : {{ createAt }} &nbsp; 조회 : {{ views }} &nbsp; 댓글 : {{ comments }}
          </div>
        </div>
        <div class="card">
          <p class="card-text">
            {{ content }}
            content<br />
            {{ data[$route.params.id] }}
          </p>
        </div>
      </div>
      <div>
        <button class="btn btn-warning btn3">수정</button>
        <button class="btn btn-warning btn3">삭제</button>
        <button class="btn btn-warning btn3">목록</button>
      </div>
      <br /><br /><br />
      <hr />
    </div>

    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
    <div class="container bootdey">
      <div class="col-md-12 bootstrap snippets">
        <div class="panel">
          <div class="panel-body">
            <textarea class="form-control" rows="5" placeholder="댓글은 자신을 보는 거울입니다."></textarea>
            <div class="mar-top clearfix">
              <button class="btn btn-warning btn3" type="submit"><i class="fa fa-pencil fa-fw"></i> 등록</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-body">
        <div class="media-block">
          <a class="media-left" href="#"
            ><img
              class="img-circle img-sm"
              alt="Profile Picture"
              src="https://bootdey.com/img/Content/avatar/avatar1.png"
          /></a>
          <div class="media-body">
            <div class="commentcard">
              <p>{{ nick }} nick</p>
              <p class="text-muted text-sm">{{ createAt }} 2022-12-01</p>
              <p>{{ coment }}나 잘하지</p>
            </div>
            <div>
              <div>
                <!-- 댓글 좋아요 아이콘 -->
                <!-- <a class="btn btn-sm btn-default btn-hover-success" href="#"><i class="fa fa-thumbs-up"></i></a> -->
                <!-- <a class="btn btn-sm btn-default btn-hover-danger" href="#"><i class="fa fa-thumbs-down"></i></a> -->
              </div>
              <button class="btn btn-warning btn3">Comment</button>
            </div>
            <hr />

            <!-- Comments -->
            <div>
              <div class="media-block">
                <a class="media-left" href="#"
                  ><img
                    class="img-circle img-sm"
                    alt="Profile Picture"
                    src="https://bootdey.com/img/Content/avatar/avatar2.png"
                /></a>
                <div class="media-body">
                  <div class="commentcard">
                    <p>{{ nick }} nick</p>
                    <p class="text-muted text-sm">{{ createAt }} 2022-12-01</p>
                    <p>{{ commentcomment }} 와 너 정말 잘한다!</p>
                  </div>
                  <button class="btn btn-warning btn3">Comment</button>
                  <hr />
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
    comments: '',
    index: 0
  }),
  // mounted() {
  //   this.checkCommunity()
  // },
  // methods: {
  //   checkCommunity() {
  //     if (localStorage.getItem('token')) {
  //       axios
  //         .get(process.env.VUE_APP_API + '/community/post/read', {
  //           headers: {
  //             Authorization: `${localStorage.getItem('token')}`,
  //             userid: `${localStorage.getItem('userId')}`
  //           }
  //         })
  //         .then(response => {
  //           console.log('checkCommunity - response : ', response)
  //           // this.gold = response.data.data.gold
  //         })
  //         .catch(error => {
  //           console.log(error)
  //         })
  //     },
  mounted() {
    this.postcontent()
  },
  methods: {
    async postcontent() {
      console.log('왜안보임')
      this.index = this.$route.params.id
      console.log(this.index)
      await axios
        .get(process.env.VUE_APP_API + `/community/post/read/${this.index}`, {
          headers: {
            Authorization: `${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          console.log('post - response : ', response)
          this.data = response.data
        })
        .catch(error => {
          console.log(error)
        })
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
/* .comment {
  background-color: dimgrey;
} */
body {
  margin-top: 20px;
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
  padding: 25px 20px;
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
}
.mar-top {
  margin-top: 15px;
}
</style>

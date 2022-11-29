<template>
  <div class="communityHome">
    <NavBar></NavBar>
    <div class="board-list">
      <div class="common-buttons">
        <button type="button" class="w3-button w3-round w3-blue-gray" @click="fnWrite()">글쓰기</button>
      </div>
      <table class="w3-table-all">
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>작성자</th>
            <th>등록일</th>
            <th>조회수</th>
            <th>좋아요</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, idx) in list" :key="idx">
            <td>{{ row.id }}</td>
            <td>
              <a @click="fnView(`${row.idx}`)">{{ row.title }}</a>
            </td>
            <td>{{ row.nick }}</td>
            <td>{{ row.createdAt }}</td>
            <td>{{ row.count }}</td>
            <td>{{ row.like }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="paging.total_list_cnt > 0" class="pagination w3-bar w3-padding-16 w3-small">
        <span class="pg">
          <a href="javascript:;" class="first w3-button w3-border" @click="fnPage(1)">&lt;&lt;</a>
          <a
            v-if="paging.start_page > 10"
            href="javascript:;"
            class="prev w3-button w3-border"
            @click="fnPage(`${paging.start_page - 1}`)"
            >&lt;</a
          >
          <template v-for="(n, index) in pageNavigation()">
            <template v-if="paging.page == n">
              <strong :key="index" class="w3-button w3-border w3-green">{{ n }}</strong>
            </template>
            <template v-else>
              <a :key="index" class="w3-button w3-border" href="javascript:;" @click="fnPage(`${n}`)">{{ n }}</a>
            </template>
          </template>
          <a
            v-if="paging.total_page_cnt > paging.end_page"
            href="javascript:;"
            class="next w3-button w3-border"
            @click="fnPage(`${paging.end_page + 1}`)"
            >&gt;</a
          >
          <a href="javascript:;" class="last w3-button w3-border" @click="fnPage(`${paging.total_page_cnt}`)"
            >&gt;&gt;</a
          >
        </span>
      </div>
    </div>

    <!-- <div>로그인/비 로그인 구분</div>
    <div>게시판 목록들 쭉 테이블 형태로// 제목, 작성자, 등록일, 조회(수), 좋아요/community/list</div>
    <div>게시판 글 리스트 번호, 글쓰기 버튼, 글 검색창(제목과 닉네임으로 검색)</div>
    <div>글쓰기 페이지/community/post/add</div> -->
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'

export default {
  name: 'RankingView',
  components: {
    NavBar
  },
  data: () => ({
    list: [],
    requestBody: {},
    no: '',
    paging: {
      block: 0,
      end_page: 0,
      next_block: 0,
      page: 0,
      page_size: 0,
      prev_block: 0,
      start_index: 0,
      start_page: 0,
      total_block_cnt: 0,
      total_list_cnt: 0,
      total_page_cnt: 0
    },
    // page: this.$router.query.page ? this.$router.query.page : 1,
    // size: this.$router.query.size ? this.$router.query.size : 10,
    // keyword: this.$router.query.keyword,
    pageNavigation: function () {
      //페이징 처리 for문 커스텀
      let pageNumber = [] //;
      let start_page = this.paging.start_page
      let end_page = this.paging.end_page
      for (let i = start_page; i <= end_page; i++) pageNumber.push(i)
      return pageNumber
    }
  }),
  mounted() {
    this.fnGetList2()
  },
  methods: {
    fnWrite() {
      console.log('write a post')
    },
    // fnGetList() {
    //   // 예시) back 에서 정보를 받아서 이렇게 담아준다~
    //   this.list = [
    //     {
    //       idx: 1,
    //       title: '제목1',
    //       nick: '작성자1',
    //       createdAt: '작성일시1',
    //       clickCount: '조회수',
    //       clickLike: '좋아요'
    //     },
    //     {
    //       idx: 1,
    //       title: '제목2',
    //       nick: '작성자2',
    //       createdAt: '작성일시2',
    //       clickCount: '조회수',
    //       clickLike: '좋아요'
    //     },
    //     {
    //       idx: 1,
    //       title: '제목3',
    //       nick: '작성자3',
    //       createdAt: '작성일시3',
    //       clickCount: '조회수',
    //       clickLike: '좋아요'
    //     }
    //   ]
    // },
    async fnGetList2() {
      console.log('GET / posts when Board is loading')
      console.log('token', localStorage.getItem('token'))
      await axios
        .get(process.env.VUE_APP_API + '/community/list', {
          headers: {
            Authorization: `${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          console.log('Community - response : ', response)
          this.data = response.data.data
          console.log(this.data)
          for (let i in this.data) {
            let a = this.data[i]
            this.list.push(a)
          }
          // for (let i in this.data) {
          //   let a = this.data[i].title
          //   this.list.push(a)
          // }
          // for (let i in this.data) {
          //   let a = this.data[i].nick
          //   this.nick.push(a)
          // }
          // for (let i in this.data) {
          //   let a = this.data[i].createdAt
          //   this.date.push(a.substr(0, 10))
          // }
          // for (let i in this.data) {
          //   let a = this.data[i].count
          //   this.date.push(a.substr(0, 10))
          // }
          // for (let i in this.data) {
          //   let a = this.data[i].like
          //   this.date.push(a.substr(0, 10))
          // }
          ////////////////////////////////
          // for (let i in this.data) {
          //   let a = response.data.data.topRanking[i].createdAt
          //   let b = require(`../assets/item/${a}`)
          //   this.ship.push(b)
          // }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
.board-list {
  width: 768px;
  margin: auto;
}

.board-detail {
  width: 768px;
  margin: auto;
  text-align: left;
}

.board-contents {
  padding: 12px 8px;
  border-bottom: 1px solid #eee;
}

.common-buttons {
  padding: 8px;
  text-align: right;
}
</style>

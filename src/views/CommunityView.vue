<template>
  <div class="communityHome">
    <NavBar></NavBar>
    <div class="board-list">
      <div class="common-buttons">
        <button type="button" class="w3-button w3-round w3-blue-gray" @click="fnWrite()">글쓰기</button>
      </div>
      <b-table id="my-table" class="table" :items="list" :per-page="perPage" :current-page="currentPage" small>
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
          <tr v-for="(row, i) in list" :key="i">
            <td>{{ row.id }}</td>
            <td>
              <a @click="fnView(`${row.i}`)">{{ row.title }}</a>
            </td>
            <td>{{ row.nick }}</td>
            <td>{{ row.createdAt }}</td>
            <td>{{ row.count }}</td>
            <td>{{ row.like }}</td>
          </tr>
        </tbody>
      </b-table>
      <!-- pagination -->
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
      <!-- <pagination :page-setting="pageDataSetting(total, limit, block, page)" @paging="pagingMethod" /> -->
    </div>

    <!-- <div>로그인/비 로그인 구분</div>
    <div>게시판 목록들 쭉 테이블 형태로// 제목, 작성자, 등록일, 조회(수), 좋아요/community/list</div>
    <div>게시판 글 리스트 번호, 글쓰기 버튼, 글 검색창(제목과 닉네임으로 검색)</div>
    <div>글쓰기 페이지/community/post/add</div> -->
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Pagination from '../components/Pagination.vue'
import axios from 'axios'
import Paginate from 'vuejs-paginate'

export default {
  name: 'RankingView',
  components: {
    NavBar
    // Pagination
  },
  data() {
    return {
      list: [],
      listData: [],
      requestBody: {},
      perPage: 3,
      currentPage: 1
      // total: this.list.length,
      // page: 1,
      // limit: 5,
      // block: 5
      // page: this.$router.query.page ? this.$router.query.page : 1,
      // size: this.$router.query.size ? this.$router.query.size : 10,
      // keyword: this.$router.query.keyword,
    }
  },
  computed: {
    rows() {
      console.log('Community - computed - rows() : ', this.list.length)
      return this.list.length
    }
  },
  mounted() {
    this.fnGetList2()
    this.pagingMethod(this.page)
    console.log('Community - mounted - rows() : ', this.list.length)
    this.rows()
  },
  methods: {
    fnWrite() {
      console.log('write a post')
      this.$router.push('/post')
    },
    pagingMethod(page) {
      console.log('pagingMethod 안에 this.list', this.list)
      this.listData = this.list.slice((page - 1) * this.limit, page * this.limit)
      this.page = page
      this.pageDataSetting(this.total, this.limit, this.block, page)
    },
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
          console.log('Community - this.list : ', this.list)
          this.data = response.data.data
          console.log(this.data)
          for (let i in this.data) {
            let a = this.data[i]
            this.list.push(a)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
    // pageDataSetting(total, limit, block, page) {
    //   console.log('Community - pageDataSetting : ', this.list)
    //   const totalPage = Math.ceil(total / limit)
    //   let currentPage = page
    //   const first = currentPage > 1 ? parseInt(currentPage, 10) - parseInt(1, 10) : null
    //   const end = totalPage !== currentPage ? parseInt(currentPage, 10) + parseInt(1, 10) : null

    //   let startIndex = (Math.ceil(currentPage / block) - 1) * block + 1
    //   let endIndex = startIndex + block > totalPage ? totalPage : startIndex + block - 1
    //   let totalList = []
    //   for (let index = startIndex; index <= endIndex; index++) {
    //     totalList.push(index)
    //   }
    //   return { first, end, totalList, currentPage }
    // }
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

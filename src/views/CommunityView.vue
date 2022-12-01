<template>
  <div class="communityHome">
    <NavBar></NavBar>
    <div class="board-list">
      <div class="common-buttons">
        <button type="button" class="w3-button w3-round w3-blue-gray" @click="fnWrite()">글쓰기</button>
      </div>
      <b-table
        id="my-table"
        class="table"
        :items="list"
        :per-page="perPage"
        :current-page="currentPage"
        small
        @row-clicked="rowClick"
      >
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
              <a @click="fnView(`${row.id}`)">{{ row.title }}</a>
            </td>
            <td>{{ row.nick }}</td>
            <td>{{ row.createdAt }}</td>
            <td>{{ row.count }}</td>
            <td>{{ row.like }}</td>
          </tr>
        </tbody>
        <template #cell(title)="data">
          <router-link
            :to="{
              name: 'detail',
              params: { articleno: data.item.articleno }
            }"
            >{{ data.item.title }}</router-link
          >
        </template>
      </b-table>
      <!-- pagination -->
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'

export default {
  name: 'CommunityView',
  components: {
    NavBar
  },
  data() {
    return {
      list: [],
      perPage: 3,
      currentPage: 1,
      pageindex: 0
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
    // this.pagingMethod(this.page)
    console.log('Community - mounted - rows() : ', this.list.length)
    // this.rows()
  },
  methods: {
    rowClick(item, index, e) {
      console.log('인덱스를 알아볼까', item.번호)
      console.log('이벤트확인', e.target.ariaColIndex)
      if (e.target.ariaColIndex == 2) {
        this.pageindex = item.번호
        this.$router.push(`/postdetail/${this.pageindex}`)
      }
    },
    fnWrite() {
      console.log('write a post')
      console.log('표시', localStorage.getItem('userNick') == !null)
      if (localStorage.getItem('userNick')) {
        this.$router.push('/post')
      } else {
        alert('로그인 후 이용할 수 있습니다.')
        this.$router.push('/signin')
      }
    },
    fnView() {
      console.log('퍋 a post')
      console.log('표시', localStorage.getItem('userNick') == !null)
      // if (localStorage.getItem('userNick')) {
      //   this.$router.push('/post')
      // } else {
      //   alert('로그인 후 이용할 수 있습니다.')
      //   this.$router.push('/signin')
      // }
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
          console.log('Community - this.data : ', this.data)
          for (let i in this.data) {
            let listData = {
              번호: this.data[i].id,
              제목: this.data[i].title,
              글쓴이: this.data[i].nick,
              등록일: this.data[i].createdAt,
              조회: this.data[i].count,
              추천: this.data[i].like

              // No: this.data[i].id,
              // title: this.data[i].title,
              // Author: this.data[i].nick,
              // uploaded: this.data[i].createdAt,
              // count: this.data[i].count,
              // like: this.data[i].like
            }
            // let listData = this.data[i]
            this.list.push(listData)
          }
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

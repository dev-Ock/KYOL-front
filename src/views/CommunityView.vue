<template>
  <div class="communityHome">
    <NavBar></NavBar>
    <div class="board-list">
      <!-- <div class="common-buttons">
        <button type="button" class="btn btn-warning" @click="fnWrite()">
          글쓰기
        </button>
      </div> -->
      <h1 class="commutitle">Community</h1>
      <b-table
        id="my-table"
        class="table"
        :items="list"
        :per-page="perPage"
        :current-page="currentPage"
        small
        @row-clicked="rowClick"
        @row-hovered="rowHovered"
      >
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
              params: { articleno: data.item.articleno },
            }"
            >{{ data.item.title }}</router-link
          >
        </template>
      </b-table>
      <!-- pagination -->
      <b-pagination
        v-model="currentPage"
        class="pagination justify-content-center"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
    <link
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
      rel="stylesheet"
    />
    <div class="common-buttons">
      <button type="button" class="btn btn-warning" @click="fnWrite()">
        <i class="fa fa-pencil fa-fw"></i>
        글쓰기
      </button>
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
      perPage: 10,
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
    rowHovered(item, index, e) {
      e.preventDefault()
      console.log('인덱스를 알아볼까', item.번호)
      console.log('마우스이벤트확인', e.target)
      // console.log(e.fromElement.ariaColIndex)
      if (e.fromElement.ariaColIndex == 2) {
        e.fromElement.style.cursor = 'pointer'
        // this.pageindex = item.번호
      }
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
              등록일: String(this.data[i].createdAt).substring(0, 10),
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
.communityHome {
  background: url('~@/assets/images/space2.gif') 100% 100% / cover no-repeat;
  height: 100vh;
  width: 100vw;
  font-family: 'Hahmlet', serif;
}

.table {
  background-color: #ffffff;
}
.board-list {
  width: 70vw;
  margin: auto;
}

.board-detail {
  width: 768px;
  margin: auto;
  text-align: left;
}

.board-contents {
  padding: 12px 8px;
  border-bottom: 1px solid #ffffff;
}

.common-buttons {
  padding: 8px;
  text-align: right;
  margin: -110px 222.5px 0px 0px;
}
.pagination {
  margin-top: 60px;
  --bs-pagination-bg: none;
  --bs-pagination-disabled-bg: none;
  --bs-pagination-active-color: #000000;
  --bs-pagination-active-bg: #ffc310;
  --bs-pagination-active-border-color: #ffffff;
}

.page-link {
  color : #ffc310;
}

.active>.page-link, .page-link.active {
    z-index: 3;
    color: var(--bs-pagination-active-color);
    background-color: var(--bs-pagination-active-bg);
    border-color: var(--bs-pagination-active-border-color);
}

.commutitle {
  color: #ffffff;
  margin: 20px 0px 40px 0px;
  text-align: left;
}

</style>

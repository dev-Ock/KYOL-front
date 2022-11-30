<template>
  <div>
    <!-- <div v-if="pageSetting.list.length" class="page-list">
      <chevrons-left-icon
        v-if="pageSetting.first !== null"
        class="left-icon"
        color="#dfdfdf"
        @click="pageSetting.first !== null ? sendPage(pageSetting.first) : ''"
      />
      <ul>
        <li
          v-for="page in pageSetting.list"
          :key="page"
          :class="{ active: page === pageSetting.currentPage }"
          @click="sendPage(page)"
        >
          {{ page }}
        </li>
      </ul>
      <chevrons-right-icon
        v-if="pageSetting.end !== null"
        class="right-icon"
        color="#dfdfdf"
        @click="pageSetting.end !== null ? sendPage(pageSetting.end) : ''"
      />
    </div> -->
  </div>
</template>

<script>
// import { ChevronsLeftIcon, ChevronsRightIcon } from 'vue-feather-icons'
// export default {
//   components: {
//     ChevronsLeftIcon,
//     ChevronsRightIcon
//   },
//   props: {
//     pageSetting: {
//       type: Object,
//       default: null
//     }
//   },
//   methods: {
//     sendPage(page) {
//       this.$emit('paging', page)
//     }
//   }
// }
</script>

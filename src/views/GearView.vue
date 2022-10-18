<template>
  <div>
    <router-link to="/game"><button>게임하기</button></router-link>
    <div>
      <div>&lt;{{ data.nick }}님의 보유우주선&gt;</div>
      <div v-for="(a, i) in array" :key="i">
        <img class="rounded-circle mt-5 bb" width="150px" :src="array[i]" />
        <button @click="select(i)">선택</button>
      </div>
      <!-- <div v-for="(a, i) in array" :key="i" class="bb">
        <h3>{{ a }}</h3> -->
      <!-- <img class="rounded-circle mt-5 bb" width="150px" :src=`../assets/item/${a.shipName}` /> -->
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
// import axios from 'axios'
export default {
  name: 'GearView',
  data() {
    return {
      nick: '',
      spaceships: [],
      rocket: [],
      array: [],
      ship: [],
      currentship: ''
    }
  },
  computed: {
    ...mapState({
      data: 'data'
      // currentShipImage: 'currentShipImage'
    }),
    ...mapGetters({
      currentShipImage: 'example'
    })
  },
  created() {
    this.open()
  },

  methods: {
    ...mapActions(['gear', 'gear2']),
    open() {
      this.gear().then(() => {
        const ship = this.data.Spaceships
        this.ship = ship
        console.log(this.data)
        console.log('쉽', ship)
        for (let i in ship) {
          let a = ship[i].shipName
          let b = require(`../assets/item/${a}`)
          this.array.push(b)
        }
        console.log('어레이확인', this.array)
      })
    },
    // open2() {
    //   this.gear2(this.image2)
    //   this.gear2().then(() => {
    //     console.log('여기서 선택하나? : ', this.currentShipImage)
    //   })
    // },

    select(spaceship) {
      this.currentship = this.ship[spaceship].shipName
      this.gear2(this.currentship)
      console.log('클릭한 아이템 표시', this.currentship)
      console.log('값이 ?', this.gear2(this.currentship))
    }
    // arr() {
    //   const ship = this.data.Spaceships
    //   this.ship = ship
    //   console.log('쉽', ship)
    //   for (let i in ship) {
    //     let a = ship[i].shipName
    //     let b = require(`../assets/item/${a}`)
    //     this.array = b
    //   }
    // }
  }
  // components: {}
  // data: () => ({
  //   nick: '',
  //   spaceships: [],
  //   data: [],
  //   rocket: []
  // }),
  // mounted() {
  //   this.gear()
  // },
  // methods: {
  //   async gear() {
  //     console.log('gear', localStorage.getItem('token'))

  //     await axios
  //       .get(process.env.VUE_APP_API + '/game/gear', {
  //         headers: {
  //           Authorization: `${localStorage.getItem('token')}`,
  //           userid: `${localStorage.getItem('userId')}`
  //         }
  //       })
  //       .then(response => {
  //         console.log('gear - response : ', response)
  //         this.nick = response.data.data.nick
  //         this.data = response.data.data.Spaceships
  //         for (let i in this.data) {
  //           let a = this.data[i].shipName
  //           this.spaceships.push(a)
  //         }

  //         for (let i in this.spaceships) {
  //           let b = require(`../assets/item/${this.spaceships[i]}`)
  //           this.rocket.push(b)
  //         }
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })
  //   }
  // }
}
</script>

<style></style>

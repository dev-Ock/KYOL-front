<template>
  <div class="gearhome">
    <div>
      <div class="block">
        <audio autoplay  muted loop src="../assets/videos/videoplaybackGearView.mp3"></audio>
        <img class="block" src="../assets/item/logo4.png" />
        <img class="block" src="../assets/item/logo5.png" />
        <div>
          <div v-for="(a, i) in array" id="i" :key="i" class="hh">
            <img class="mt-5 bb" width="150px" :src="array[i]" :class="ft === i ? 'choose' : ''" />
            <div></div>
            <button type="button" class="btn btn-warning" @click="select(i)">선택</button>
          </div>
        </div>
      </div>
      <div v-if="selected == true">
        <div class="box effect1">
          <router-link to="/game">
            <button class="pushable">
              <button class="front"></button>
            </button>
          </router-link>
        </div>
        <img class="block2" src="../assets/item/logo6.png" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
// import axios from 'axios'
export default {
  name: 'GearView',
  data() {
    return {
      spaceships: [],
      array: [],
      ship: [],
      currentship: '',
      ft: null,
      selected: false
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
  mounted() {},
  methods: {
    ...mapActions(['gear', 'gear2']),
    open() {
      this.gear().then(() => {
        console.log('aaa')
        const ship = this.data.Spaceships
        this.ship = ship
        for (let i in ship) {
          let a = ship[i].shipName
          let b = require(`../assets/item/${a}`)
          this.array.push(b)
        }
      })
    },

    choose() {
      this.ft = true
    },

    select(spaceship) {
      this.selected = true
      this.currentship = this.ship[spaceship].shipName
      this.gear2(this.currentship)

      this.ft = spaceship

      localStorage.setItem('currentShipData', `${this.currentship}`)
    }
  }
}
</script>

<style>
.btnmargin {
  margin-top: 50px;
}

.hh {
  display: inline-block;
  text-align: center;
}
.choose {
  border: 2px solid yellow;
  /* background-image: url('~@/assets/images/login_border.png'); */
}

.gearhome {
  background: url('~@/assets/images/space3.gif') 100% 100% / cover no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  font-family: 'Hahmlet', serif;
  position: fixed;
}

.block {
  display: block;
  margin: auto;
  text-align: center;
}
.block2 {
  display: block;
  margin: auto;
  text-align: center;
  height: 100px;
  width: 200px;
}
.pushable {
  background: hsl(0, 0%, 90%);
  border-radius: 50% / 25%;
  border: none;
  padding: 0;
  cursor: pointer;
  outline-offset: 1px;
  margin-top: 50px;
  height: 30px;
  width: 100px;
  text-align: center;
}
.front {
  display: block;
  padding: 14px 12px;
  border-radius: 50% / 25%;
  font-size: 1rem;
  background: hsl(345deg 100% 47%);
  color: black;
  transform: translateY(-8px);
  height: 15px;
  width: 100px;
  /* vertical-align: 20%; */
  justify-content: flex-start;
}

.pushable:active .front {
  transform: translateY(-2px);
}
</style>

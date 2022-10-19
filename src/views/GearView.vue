<template>
  <div class="gearhome">
    <div>
      <div class="block">
        <img class="block" src="../assets/item/logo4.png" />
        <img class="block" src="../assets/item/logo5.png" />

        <!-- <div>&lt;{{ data.nick }}님의 보유우주선&gt;</div> -->
        <div>
          <div v-for="(a, i) in array" id="i" :key="i" class="hh">
            <img class="mt-5 bb" width="150px" :src="array[i]" :class="ft === i ? 'choose' : ''" />
            <div></div>
            <button type="button" class="btn btn-warning" @click="select(i)">선택</button>
            <!-- <button @click="select(i)">선택</button> -->
          </div>
          <!-- <div v-for="(a, i) in array" :key="i" class="bb">
        <h3>{{ a }}</h3> -->
          <!-- <img class="rounded-circle mt-5 bb" width="150px" :src=`../assets/item/${a.shipName}` /> -->
        </div>
      </div>
      <div class="page">
        <router-link to="/game"><button type="button" class="fun-btn">Game Start</button></router-link>
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
      nick: '',
      spaceships: [],
      rocket: [],
      array: [],
      ship: [],
      currentship: '',
      ft: null
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
    // open2() {
    //   this.gear2(this.image2)
    //   this.gear2().then(() => {
    //     console.log('여기서 선택하나? : ', this.currentShipImage)
    //   })
    // },

    select(spaceship) {
      this.currentship = this.ship[spaceship].shipName
      this.gear2(this.currentship)

      this.ft = spaceship

      // console.log('클릭한 아이템 표시', this.currentship)
      // console.log('값이 ?', this.gear2(this.currentship))

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
  height: 100vh;
  width: 100vw;
  font-family: 'Hahmlet', serif;
  /* position: fixed; */
}

.block {
  display: block;
  margin: auto;
  /* text-align: center; */
}
@keyframes pulse-grow {
  to {
    transform: scale(1.1);
  }
}
.page {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
}

/* add default color for animation start  */

/* toggle this class */

.color-bg-start {
  background-color: salmon;
}

/* toggle class bg-animate-color */

.bg-animate-color {
  animation: random-bg 0.2s linear infinite;
}

/* add animation to bg color  */

@keyframes random-bg {
  from {
    filter: hue-rotate(0);
  }
  to {
    filter: hue-rotate(360deg);
  }
}

.fun-btn {
  /* change bg color to get different hues    */
  background-color: salmon;
  color: white;
  padding: 2em 3em;
  border: none;
  transition: all 0.3s ease;
  border-radius: 5px;
  letter-spacing: 2px;
  text-transform: uppercase;
  outline: none;
  align-self: center;
  cursor: pointer;
  font-weight: bold;
  margin-top: 20px;
}

.fun-btn:hover {
  animation: random-bg 0.3s linear infinite, grow 1300ms ease infinite;
}

.start-fun {
  background-color: #fff !important;
  /* change color of button text when fun is started   */
  color: salmon !important;
}

/* pulsating effect on button */
@keyframes grow {
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.3);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.3);
  }
  70% {
    transform: scale(1);
  }
}
</style>

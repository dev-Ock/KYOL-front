<template>
  <div class="shophome">
    <NavBar></NavBar>

    <!-- Modal -->
    <div
      id="staticBackdrop"
      class="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <!-- <h5 id="staticBackdropLabel" class="modal-title">모달제목</h5> -->
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">{{ 이지윤 }}</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="close">닫기</button>
            <button v-show="closebtn" type="button" class="btn btn-primary" @click="purchaserocket">구매하기</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 기존 -->

    <!-- <div v-show="purchasemodal" class="black-bg">
      <div class="white-bg">
        <h4>{{ 이지윤 }}</h4>
        <button v-show="closebtn" class="btn btn-outline-dark mt-auto" @click="purchaserocket">구매하기</button>
        <button class="btn btn-outline-dark mt-auto" @click="close">닫기</button>
      </div>
    </div> -->

    <div class="home">
      <div>
        <header>
          <div class="profilebox">
            {{ nick }}님의 보유 자산 : {{ gold.toLocaleString() }} KYOL
            <div></div>
            <!-- <div class="badge bg-white text-white position-absolute">
              <img class="myprofile" src="~@/assets/item/rocket1.png" />
              <img class="myprofile" src="~@/assets/item/empty.png" />
              <img class="myprofile" src="~@/assets/item/empty.png" />
              <img class="myprofile" src="~@/assets/item/empty.png" />
            </div>
            <div>
              <img class="myprofile" src="~@/assets/item/coin.png" />
            </div> -->
          </div>
        </header>
        <section class="py-5">
          <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              <div class="col mb-5">
                <div class="card h-100">
                  <!-- Product image-->
                  <img class="card-img-top" src="~@/assets/item/rocket1.png" alt="..." />
                  <!-- Product details-->
                  <div class="card-body p-4">
                    <div class="text-center">
                      <!-- Product name-->
                      <h5 class="fw-bolder">{{ rocket1.name }}</h5>
                      <!-- Product price-->
                      ￦{{ rocket1.price.toLocaleString() }}
                    </div>
                  </div>
                  <!-- Product actions-->
                  <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                      <div v-if="showbtn == true">
                        <a
                          type="button"
                          class="btn btn-outline-dark mt-auto"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          @click="purchaseOpen1"
                        >
                          구매
                        </a>
                      </div>
                      <div v-else>
                        <a class="btn btn-secondary btn mt-auto disabled" href="#">보유중</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col mb-5">
                <div class="card h-100">
                  <!-- Sale badge-->
                  <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
                  <!-- Product image-->
                  <img class="card-img-top" src="~@/assets/item/rocket2.png" alt="..." />
                  <!-- Product details-->
                  <div class="card-body p-4">
                    <div class="text-center">
                      <!-- Product name-->
                      <h5 class="fw-bolder">{{ rocket2.name }}</h5>
                      <!-- Product reviews-->
                      <div class="d-flex justify-content-center small text-warning mb-2">
                        <div class="bi-star-fill"></div>
                        <div class="bi-star-fill"></div>
                        <div class="bi-star-fill"></div>
                        <div class="bi-star-fill"></div>
                        <div class="bi-star-fill"></div>
                      </div>
                      <!-- Product price-->
                      <span class="text-muted text-decoration-line-through">￦50,000</span>
                      ￦{{ rocket2.price.toLocaleString() }}
                    </div>
                  </div>
                  <!-- Product actions-->
                  <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                      <div v-if="showbtn2 == true">
                        <a
                          type="button"
                          class="btn btn-outline-dark mt-auto"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          @click="purchaseOpen2"
                        >
                          구매
                        </a>
                      </div>
                      <div v-else>
                        <a class="btn btn-secondary btn mt-auto disabled" href="#">보유중</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col mb-5">
                <div class="card h-100">
                  <!-- Sale badge-->
                  <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
                  <!-- Product image-->
                  <img class="card-img-top" src="~@/assets/item/rocket3.png" alt="..." />
                  <!-- Product details-->
                  <div class="card-body p-4">
                    <div class="text-center">
                      <!-- Product name-->
                      <h5 class="fw-bolder">{{ rocket3.name }}</h5>
                      <div class="d-flex justify-content-center small text-warning mb-2">
                        <div class="bi-star-fill"></div>
                        <div class="bi-star-fill"></div>
                        <div class="bi-star-fill"></div>
                        <div class="bi-star-fill"></div>
                        <div class="bi-star-fill"></div>
                      </div>
                      <!-- Product price-->
                      <span class="text-muted text-decoration-line-through">￦50,000</span>
                      ￦{{ rocket3.price.toLocaleString() }}
                    </div>
                    <span>Speed +2</span>
                  </div>
                  <!-- Product actions-->
                  <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                      <div v-if="showbtn3 == true">
                        <a
                          type="button"
                          class="btn btn-outline-dark mt-auto"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          @click="purchaseOpen3"
                        >
                          구매
                        </a>
                      </div>
                      <div v-else>
                        <a class="btn btn-secondary btn mt-auto disabled" href="#">보유중</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col mb-5">
                <div class="card h-100">
                  <!-- Product image-->
                  <img class="card-img-top" src="~@/assets/item/rocket4.png" alt="..." />
                  <!-- Product details-->
                  <div class="card-body p-4">
                    <div class="text-center">
                      <!-- Product name-->
                      <h5 class="fw-bolder">{{ rocket4.name }}</h5>
                      <!-- Product reviews-->
                      <div class="d-flex justify-content-center small text-warning mb-2">
                        <div class="bi-star-fill"></div>
                        <div class="bi-star-fill"></div>
                        <div class="bi-star-fill"></div>
                        <div class="bi-star-fill"></div>
                        <div class="bi-star-fill"></div>
                      </div>
                      <!-- Product price-->
                      ￦{{ rocket4.price.toLocaleString() }}
                    </div>
                    <span>Speed +2, bullet +1</span>
                  </div>
                  <!-- Product actions-->
                  <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                      <div v-if="showbtn4 == true">
                        <a
                          type="button"
                          class="btn btn-outline-dark mt-auto"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          @click="purchaseOpen4"
                        >
                          구매
                        </a>
                      </div>
                      <div v-else>
                        <a class="btn btn-secondary mt-auto disabled" href="#">보유중</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'
export default {
  name: 'ItemstoreView',
  components: {
    NavBar
  },
  data: () => ({
    purchasemodal: false,
    showbtn: true,
    showbtn2: true,
    showbtn3: true,
    showbtn4: true,
    gold: '',
    isActive: true,
    data: [],
    spaceships: [],
    rocket1: { imgname: 'rocket1.png', price: 150, name: 'rocket1' },
    rocket2: { imgname: 'rocket2.png', price: 100000, name: 'rocket2' },
    rocket3: { imgname: 'rocket3.png', price: 10000, name: 'rocket3' },
    rocket4: { imgname: 'rocket4.png', price: 50000, name: 'rocket4' },
    nick: '',
    spaceshipsimg: '',
    spaceShipsList: [],
    rocketbox: '',
    rocketprice: 0,
    이지윤: '구매하시겠습니까?',
    closebtn: true
  }),

  mounted() {
    this.shop()
  },
  methods: {
    close() {
      this.purchasemodal = false
      this.$router.go()
    },
    async shop() {
      console.log('token', localStorage.getItem('token'))
      await axios
        .get(process.env.VUE_APP_API + '/shop', {
          headers: {
            Authorization: `${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          console.log('shop - response : ', response)
          this.nick = response.data.data.user.nick
          this.gold = response.data.data.user.gold
          this.spaceShips = response.data.data.user.Spaceships // 보유중인 우주선
          // this.spaceshipsimg = response.data.data.user.currentShipImage // 장착하고있는 우주선
          this.availableShip = response.data.data.availableShip
          this.availableResult = response.data.data.availableResult
          console.log('spaceShips: ', this.spaceShips)

          for (let i in this.spaceShips) {
            let a = this.spaceShips[i].shipName
            this.spaceShipsList.push(a)
          }
          // (1순위) 우주선 이미 가지고 있으면 상점 버튼 비활성화
          for (let i in this.spaceShipsList) {
            if (this.spaceShipsList[i] == this.rocket1.imgname) {
              this.showbtn = false
              // this.showbtn2 = false
            }
            if (this.spaceShipsList[i] == this.rocket2.imgname) {
              this.showbtn2 = false
              // this.showbtn2 = false
            }
            if (this.spaceShipsList[i] == this.rocket3.imgname) {
              this.showbtn3 = false
              // this.showbtn2 = false
            }
            if (this.spaceShipsList[i] == this.rocket4.imgname) {
              this.showbtn4 = false
              // this.showbtn2 = false
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    async purchaserocket() {
      await axios
        .post(
          process.env.VUE_APP_API + '/shop/purchase',
          { selectedShip: this.rocketbox, selectedCost: this.rocketprice },
          {
            headers: {
              Authorization: `${localStorage.getItem('token')}`
            }
          }
        )

        .then(response => {
          console.log('purchase - response : ', response)
          console.log(this.rocketbox)
          if (this.gold > this.rocketprice) {
            this.이지윤 = '구입완료'
            this.closebtn = false
          }
        })
        .catch(error => {
          console.log('에러다 : ', error)
          console.log(error.response.data.message)
          if (this.gold < this.rocketprice) {
            this.이지윤 = '보유하신 KYOL가 부족합니다.'
            this.closebtn = false
          }
        })
    },
    purchaseOpen1() {
      this.purchasemodal = true
      ;(this.rocketbox = 'rocket1.png'), (this.rocketprice = 150)
    },
    purchaseOpen2() {
      this.purchasemodal = true
      ;(this.rocketbox = 'rocket2.png'), (this.rocketprice = 100000)
    },
    purchaseOpen3() {
      this.purchasemodal = true
      this.rocketbox = 'rocket3.png'
      this.rocketprice = 10000
    },
    purchaseOpen4() {
      this.purchasemodal = true
      ;(this.rocketbox = 'rocket4.png'), (this.rocketprice = 50000)
    }
  }
}
</script>

<style scoped>
.black-bg {
  /* width: 100%;
  height: 100%; */
  /* background: rgba(0, 0, 0, 0.5); */
  position: fixed;
  /* padding: 20px; */
}
.white-bg {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
  position: fixed;
}
.container {
  height: -10vh;
  width: 70vw;
}
.myprofile {
  width: 100px;
  height: 100px;
}
.profilebox {
  width: 100%;
  /* background: rgba(200, 200, 200, 0.5); */
  /* border-radius: 10px; */
  padding: 20px;
  /* position: fixed; */
  color: white;
  text-align: center;
  font-size: 30px;
}
/* body {
  position: fixed;
  overflow: scroll;
  display: fixed;
} */
.shophome {
  background: url('~@/assets/images/space2.gif') 100% 100% / cover no-repeat;
  height: 100vh;
  width: 100vw;
  font-family: 'Hahmlet', serif;
  font-weight: 500;
  /* position: fixed; */
  overflow: scroll;
}
</style>

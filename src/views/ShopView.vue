<template>
  <div>
    <NavBar></NavBar>
    <div v-show="purchasemodal" class="black-bg">
      <div class="white-bg">
        <h4>KYOR에게 기부하시겠습니까?</h4>
        <button class="btn btn-outline-dark mt-auto" @click="purchasemodal = false">닫기</button>
      </div>
      <div v-show="nopurchasemodal" class="black-bg">
        <div class="white-bg">
          <h4>상품 구매가 불가능합니다.</h4>
          <button class="btn btn-outline-dark mt-auto" @click="nopurchasemodal = false">닫기</button>
        </div>
      </div>
    </div>
    <div class="home">
      <div>
        <header>
          <div class="profilebox">
            {{ nick }}님의 자산 KYOR : {{ gold }} SPACESHIPS : {{ spaceshipsImg }}
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
                      ￦{{ rocket1.price }}
                    </div>
                  </div>
                  <!-- Product actions-->
                  <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <!-- <div v-show="rocketone" class="text-center"> -->
                    <div class="text-center">
                      <a
                        v-if="showbtn == true"
                        class="btn btn-outline-dark mt-auto"
                        href="#"
                        @click="purchasemodal = true"
                        >당장 사버렷</a
                      >
                      <a
                        v-if="showbtn == false"
                        class="btn btn-secondary btn mt-auto"
                        href="#"
                        @click="nopurchasemodal = false"
                        >이미 사버렷</a
                      >
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
                      ￦{{ rocket2.price }}
                    </div>
                  </div>
                  <!-- Product actions-->
                  <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                      <a
                        v-if="showbtn == true"
                        class="btn btn-outline-dark mt-auto"
                        href="#"
                        @click="purchasemodal = true"
                        >당장 사버렷</a
                      >
                      <a
                        v-if="showbtn == false"
                        class="btn btn-secondary btn mt-auto"
                        href="#"
                        @click="nopurchasemodal = false"
                        >구매 불가능</a
                      >
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
                      <!-- Product price-->
                      <span class="text-muted text-decoration-line-through">￦50,000</span>
                      ￦{{ rocket3.price }}
                    </div>
                  </div>
                  <!-- Product actions-->
                  <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                      <a
                        v-if="showbtn == true"
                        class="btn btn-outline-dark mt-auto"
                        href="#"
                        @click="purchasemodal = true"
                        >당장 사버렷</a
                      >
                      <a
                        v-if="showbtn == false"
                        class="btn btn-secondary btn mt-auto"
                        href="#"
                        @click="nopurchasemodal = false"
                        >구매 불가능</a
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="col mb-5">
                <div class="card h-100 {black-bg : isActive}">
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
                      ￦{{ rocket4.price }}
                    </div>
                  </div>
                  <!-- Product actions-->
                  <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                      <a
                        v-if="showbtn == true"
                        class="btn btn-outline-dark mt-auto"
                        href="#"
                        @click="purchasemodal = true"
                        >당장 사버렷</a
                      >
                      <a
                        v-if="showbtn == false"
                        class="btn btn-secondary btn mt-auto"
                        href="#"
                        @click="nopurchasemodal = false"
                        >구매 불가능</a
                      >
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
    nopurchasemodal: false,
    gold: '',
    isActive: true,
    data: [],
    spaceships: [],
    rocket1: { imgname: 'rocket1.png', price: 150000, name: 'rocket1' },
    rocket2: { imgname: 'rocket2.png', price: 45000, name: 'rocket2' },
    rocket3: { imgname: 'rocket3.png', price: 10000, name: 'rocket3' },
    rocket4: { imgname: 'rocket4.png', price: 50000, name: 'rocket4' },
    rocketone: true,
    rockettwo: true,
    rocketthree: true,
    rocketfour: true,
    nick: '',
    spaceshipsImg: '',
    showbtn: true
  }),

  mounted() {
    this.shop()
  },
  methods: {
    async shop() {
      console.log('token', localStorage.getItem('token'))
      await axios
        .get(process.env.VUE_APP_API + '/shop', {
          headers: {
            Authorization: `${localStorage.getItem('token')}`
            // userid: `${localStorage.getItem('userId')}`,
            // usernick: `${localStorage.getItem('userNick')}`
          }
        })
        .then(response => {
          console.log('shop - response : ', response)
          // localStorage.setItem('token', response.data.token)
          this.nick = response.data.data.user.nick
          this.gold = response.data.data.user.gold
          this.spaceshipsImg = response.data.data.user.Spaceships[0].shipName
          console.log(this.gold)
          console.log(this.spaceshipsImg)
          for (let i in this.spaceshipsImg) {
            let a = this.spaceshipsImg[i].shipName
            this.spaceships.push(a)
          }
          console.log('spaceships', this.spaceships)
          // 내가 가지고 있는 골드랑 우주선 가격 비교 후 버튼 비활성화
          // if (this.gold < this.rocket1.price) {
          //   console.log('돈부족')
          //   this.rocketone = false
          // }
          // if (this.gold < this.rocket2.price) {
          //   console.log('돈부족')
          //   this.rockettwo = false
          // }
          // if (this.gold < this.rocket3.price) {
          //   console.log('돈부족')
          //   this.rocketthree = false
          // }
          // if (this.gold < this.rocket4.price) {
          //   console.log('돈부족')
          //   this.rocketfour = false
          // }

          console.log('spaceshipsname', this.rocket1.imgname)
          console.log('비교', this.rocket1.imgname == this.spaceships[3])

          // 우주선 이미 가지고 있으면 상점 버튼 비활성화
          // for (let key in this.spaceships) {
          //   if (this.spaceships[key] == this.rocket1.imgname) {
          //     console.log('가지고 있음')
          //     this.rocketone = false
          //   }
          //   if (this.spaceships[key] == this.rocket2.imgname) {
          //     console.log('가지고 있음')
          //     this.rockettwo = false
          //   }
          //   if (this.spaceships[key] == this.rocket3.imgname) {
          //     console.log('가지고 있음')
          //     this.rocketthree = false
          //   }
          //   if (this.spaceships[key] == this.rocket4.imgname) {
          //     console.log('가지고 있음')
          //     this.rocketfour = false
          //   }
          // }

          // if (this.showFriendListStatus === true) {
          //   this.showFriendListStatus = false
          //   console.log(this.showFriendListStatus)
          // } else {
          //   console.log(response)
          //   this.friendInfoList = response.data.friendInfoList
          //   console.log('loadFriendList - response : ', this.friendInfoList)
          //   this.showFriendListStatus = true
          //   console.log(this.showFriendListStatus)
          // }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.black-bg {
  /* width: 100%; */
  /* height: 100%; */
  background: rgba(0, 0, 0, 0.5);
  /* position: fixed; */
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
.balck-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
}
.white-bg {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
}
.myprofile {
  width: 100px;
  height: 100px;
}
.profilebox {
  width: 100%;
  background: rgba(200, 200, 200, 0.5);
  /* border-radius: 10px; */
  padding: 20px;
  /* position: fixed; */
}
</style>

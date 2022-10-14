<template>
  <div>
    <NavBar></NavBar>
    <div class="black-bg">
      <div class="white-bg">
        <h4>KYOR에게 기부하시겠습니까?</h4>
      </div>
    </div>
    <div class="home">
      <div class="container">
        <header class="bg-dark py-5">
          <div class="text-center text-white">
            <h2 class="fw-bolder">Item Shop</h2>
            <p class="lead fw-normal text-white-50 mb-0">돈 쓰세요 :)</p>
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
                      <h5 class="fw-bolder">rocket1</h5>
                      <!-- Product price-->
                      ￦50,000
                    </div>
                  </div>
                  <!-- Product actions-->
                  <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">당장 사버렷</a></div>
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
                      <h5 class="fw-bolder">rocket2</h5>
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
                      ￦45,000
                    </div>
                  </div>
                  <!-- Product actions-->
                  <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">당장 사버렷</a></div>
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
                      <h5 class="fw-bolder">rocket3</h5>
                      <!-- Product price-->
                      <span class="text-muted text-decoration-line-through">￦50,000</span>
                      ￦50,000
                    </div>
                  </div>
                  <!-- Product actions-->
                  <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">당장 사버렷</a></div>
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
                      <h5 class="fw-bolder">rocket4</h5>
                      <!-- Product reviews-->
                      <div class="d-flex justify-content-center small text-warning mb-2">
                        <div class="bi-star-fill"></div>
                        <div class="bi-star-fill"></div>
                        <div class="bi-star-fill"></div>
                        <div class="bi-star-fill"></div>
                        <div class="bi-star-fill"></div>
                      </div>
                      <!-- Product price-->
                      ￦50,000
                    </div>
                  </div>
                  <!-- Product actions-->
                  <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">당장 사버렷</a></div>
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
  data() {
    return {
      rocket: [],
      usergold: {}
    }
  },
  mounted() {
    this.shop()
  },
  methods: {
    async shop() {
      console.log('token', localStorage.getItem('token'))
      await axios
        .get(process.env.VUE_APP_API + '/shop', {
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
            userid: `${localStorage.getItem('userId')}`,
            usernick: `${localStorage.getItem('userNick')}`
          }
        })
        .then(response => {
          console.log('shop - response : ', response)
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
</style>

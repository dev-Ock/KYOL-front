<template>
  <div class="my-canvas-wrapper">
    <!-- ref="my-canvas" -->
    <canvas ref="myClass" class="my-canvas" width="1200" height="500">
      <img src="../../assets/images/space.jpg" />
    </canvas>
    <div>
      방향 조작법 : w, a, s, d // 미사일발사 : space
      <figure>
        <audio autoplay loop src="../../assets/videos/videoplayback.mp3"></audio>
      </figure>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions, mapGetters } from 'vuex'

const bulletList = []
const enemyList = []
const meteorList = []
const meteor2List = []

class Bullet {
  constructor(all) {
    this.x = 0
    this.y = 0
    this.init = function (all) {
      this.x = all.spaceshipX
      this.y = all.spaceshipY
      this.alive = true
      bulletList.push(this)
    }
    this.updateBullet = function () {
      this.x += 7
    }
    this.updateBullet2 = function () {
      this.x += 15
    }

    this.checkHit = function () {
      for (let i = 0; i < enemyList.length; i++) {
        if (
          all.spaceshipX < enemyList[i].x &&
          this.x + 10 >= enemyList[i].x &&
          this.y >= enemyList[i].y - 20 &&
          this.y <= enemyList[i].y + 35
        ) {
          all.score += 100
          this.alive = false
          enemyList.splice(i, 1)
        } else if (this.x >= all.ctx.canvas.clientWidth) this.alive = false
      }
    }

    this.checkHit2 = function () {
      for (let i = 0; i < enemyList.length; i++) {
        if (
          all.spaceshipX < enemyList[i].x &&
          this.x + 40 >= enemyList[i].x &&
          this.y >= enemyList[i].y - 20 &&
          this.y <= enemyList[i].y + 35
        ) {
          all.score += 100
          this.alive = false
          enemyList.splice(i, 1)
        } else if (this.x >= all.ctx.canvas.clientWidth) this.alive = false
      }
    }
  }
}

class Meteor {
  constructor(all) {
    this.x = 0
    this.y = 0
    this.init = function () {
      this.alive = true
      let generateRandomValue = function (min, max) {
        let randomNum = Math.floor(Math.random() * (max - min + 1)) + min
        return randomNum
      }
      if (all.score < 8000) {
        this.x = all.ctx.canvas.clientWidth
        this.y = generateRandomValue(0, all.ctx.canvas.clientHeight - 60)
        meteorList.push(this)
      } else if (all.score >= 8000) {
        this.x = all.ctx.canvas.clientWidth
        this.y = generateRandomValue(0, all.ctx.canvas.clientHeight - 60)
        meteor2List.push(this)
      }
    }
    this.updateMove = function () {
      if (all.score < 3000) {
        this.x -= 6
      } else if (all.score >= 3000 && all.score < 8000) {
        this.x -= 9
      } else if (all.score >= 8000) {
        this.x -= 9
      }
    }

    this.updateMove2 = function () {
      if (all.score >= 8000 && all.score <= 12000) {
        this.x -= 15
      } else if (all.score >= 12000 && all.score <= 20000) {
        this.x -= 18
      } else if (all.score > 20000) {
        this.x -= 22
      }
    }
    this.checkHit2 = function (i) {
      if (
        this.x >= all.spaceshipX &&
        this.x <= all.spaceshipX + 25 &&
        this.y >= all.spaceshipY - 25 &&
        this.y <= all.spaceshipY + 20
      ) {
        all.gameOver = true
        all.sendGameOver()
      } else if (this.x <= -70) meteorList.splice(i, 1)
    }
  }
}

class Enemy {
  constructor(all) {
    this.x = 0
    this.y = 0
    this.init = function () {
      let generateRandomValue = function (min, max) {
        let randomNum = Math.floor(Math.random() * (max - min + 1)) + min
        return randomNum
      }

      this.x = all.ctx.canvas.clientWidth
      this.y = generateRandomValue(0, all.ctx.canvas.clientHeight - 60)
      enemyList.push(this)
    }
    this.update = function () {
      this.x -= 3
      if (this.x <= 0) {
        all.gameOver = true
        all.sendGameOver()
        console.log('game Over')
      }
    }
  }
}

export default {
  name: 'GameScreen',
  provide() {
    return {
      provider: this.provider
    }
  },

  data: () => ({
    provider: {
      context: null
    },
    spaceshipImage: {
      src: localStorage.getItem('currentShipData')
    },
    bulletImage: '',
    enemyImage: '',
    gameOverImage: '',
    collisionImage: '',
    gameOver: false,
    score: 0,
    spaceshipX: 0,
    spaceshipY: 0,
    keysDown: {},
    inGameShip: ''
  }),
  computed: {
    ...mapState({
      data: 'data'
    }),
    ...mapGetters({
      currentShipImage: 'example'
    })
  },
  async mounted() {
    this.checkStartInformation()
    this.ctx = this.$refs.myClass.getContext('2d')
    this.loadImage()
    this.setupKeyboardListener()
    this.main()
    this.createEnemy(this)
    this.createMeteor(this)
  },
  methods: {
    ...mapActions(['gear', 'gear2']),

    checkStartInformation() {
      console.log('로컬 스토리지 쉽정보 : ', localStorage.getItem('currentShipData'))
      if (this.currentShipImage) {
        this.inGameShip = this.currentShipImage
      } else {
        this.inGameShip = localStorage.getItem('currentShipData')
      }
    },

    loadImage() {
      this.backgroundImage = new Image()
      this.spaceshipImage = new Image()
      this.bulletImage = new Image()
      this.bulletImage2 = new Image()
      this.enemyImage = new Image()
      this.gameOverImage = new Image()
      this.collisionImage = new Image()
      this.meteor1Image = new Image()
      this.meteor2Image = new Image()

      this.backgroundImage.src = require('../../assets/images/space.jpg')
      this.collisionImage.src = require('../../assets/images/collision16.png')
      // this.spaceshipImage.src = require('../../assets/images/rocket1ingame.png')
      this.spaceshipImage.src = require(`../../assets/item/ingame${this.inGameShip}`)
      this.enemyImage.src = require('../../assets/images/enemy4.png')
      this.bulletImage.src = require('../../assets/images/bulletHorizon.png')
      this.bulletImage2.src = require('../../assets/images/specialBullet.png')
      this.gameOverImage.src = require('../../assets/images/gameOver3.png')
      this.meteor1Image.src = require('../../assets/images/meteor/meteor1.png')
      this.meteor2Image.src = require('../../assets/images/meteor/meteor2.png')
    },

    setupKeyboardListener() {
      // function 도 스코핑영역을 가지기 때문에 function (event) 로 사용불가
      document.addEventListener('keydown', event => {
        this.keysDown[event.key] = true

        if (
          event.code == 'Space' &&
          (this.inGameShip == 'rocket5.png' || this.inGameShip == 'rocket6.png' || this.inGameShip == 'rocket7.png')
        ) {
          this.createBullet(this)
        }
      })
      document.addEventListener('keyup', event => {
        delete this.keysDown[event.key]

        if (event.code == 'Space') {
          this.createBullet(this)
        }
      })
    },

    createEnemy(all) {
      const interval = setInterval(function () {
        let e = new Enemy(all)
        e.init()
        // console.log('적군생성 인터벌', interval)
        if (all.gameOver) {
          // console.log('이걸 왜타지?', all.gameOver)
          clearInterval(interval)
        }
      }, 400)
    },

    createMeteor(all) {
      const interval2 = setInterval(function () {
        let m = new Meteor(all)
        m.init(all)
        // console.log('메테오 생성 인터벌', interval2)
        if (all.gameOver) {
          clearInterval(interval2)
        }
      }, 400)
    },

    createBullet(all) {
      let b = new Bullet(all)
      b.init(all)
    },

    update() {
      if ('s' in this.keysDown) {
        this.spaceshipY += 4
      } // move to right side
      if ('w' in this.keysDown) {
        this.spaceshipY -= 4
      } // move to left side
      if ('a' in this.keysDown) {
        this.spaceshipX -= 4
      } // move to left side
      if ('d' in this.keysDown) {
        this.spaceshipX += 4
      } // move to left side

      if (this.spaceshipY <= 0) {
        this.spaceshipY = 0
      }
      if (this.spaceshipY >= this.ctx.canvas.clientHeight - 48) {
        this.spaceshipY = this.ctx.canvas.clientHeight - 48
      }
      if (this.spaceshipX <= 0) {
        this.spaceshipX = 0
      }
      if (this.spaceshipX >= this.ctx.canvas.clientWidth - 48) {
        this.spaceshipX = this.ctx.canvas.clientWidth - 48
      }

      for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive) {
          bulletList[i].updateBullet()
          bulletList[i].checkHit(i)
        }
      }

      for (let i = 0; i < meteorList.length; i++) {
        if (meteorList[i].alive) {
          meteorList[i].updateMove()
          meteorList[i].checkHit2(i)
        }
      }

      for (let i = 0; i < meteor2List.length; i++) {
        if (meteor2List[i].alive) {
          meteor2List[i].updateMove2()
          meteor2List[i].checkHit2(i)
        }
      }
      for (let i = 0; i < enemyList.length; i++) {
        enemyList[i].update()
      }
    },

    update2() {
      if ('s' in this.keysDown) {
        this.spaceshipY += 6
      } // move to right side
      if ('w' in this.keysDown) {
        this.spaceshipY -= 6
      } // move to left side
      if ('a' in this.keysDown) {
        this.spaceshipX -= 6
      } // move to left side
      if ('d' in this.keysDown) {
        this.spaceshipX += 6
      } // move to left side

      if (this.spaceshipY <= 0) {
        this.spaceshipY = 0
      }
      if (this.spaceshipY >= this.ctx.canvas.clientHeight - 48) {
        this.spaceshipY = this.ctx.canvas.clientHeight - 48
      }
      if (this.spaceshipX <= 0) {
        this.spaceshipX = 0
      }
      if (this.spaceshipX >= this.ctx.canvas.clientWidth - 48) {
        this.spaceshipX = this.ctx.canvas.clientWidth - 48
      }

      for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive) {
          bulletList[i].updateBullet()
          bulletList[i].checkHit(i)
        }
      }

      for (let i = 0; i < meteorList.length; i++) {
        if (meteorList[i].alive) {
          meteorList[i].updateMove()
          meteorList[i].checkHit2(i)
        }
      }

      for (let i = 0; i < meteor2List.length; i++) {
        if (meteor2List[i].alive) {
          meteor2List[i].updateMove2()
          meteor2List[i].checkHit2(i)
        }
      }
      for (let i = 0; i < enemyList.length; i++) {
        enemyList[i].update()
        // console.log('적 숫자 체크', enemyList)
      }
    },

    update3() {
      if ('s' in this.keysDown) {
        this.spaceshipY += 8
      } // move to right side
      if ('w' in this.keysDown) {
        this.spaceshipY -= 8
      } // move to left side
      if ('a' in this.keysDown) {
        this.spaceshipX -= 8
      } // move to left side
      if ('d' in this.keysDown) {
        this.spaceshipX += 8
      } // move to left side

      if (this.spaceshipY <= 0) {
        this.spaceshipY = 0
      }
      if (this.spaceshipY >= this.ctx.canvas.clientHeight - 48) {
        this.spaceshipY = this.ctx.canvas.clientHeight - 48
      }
      if (this.spaceshipX <= 0) {
        this.spaceshipX = 0
      }
      if (this.spaceshipX >= this.ctx.canvas.clientWidth - 48) {
        this.spaceshipX = this.ctx.canvas.clientWidth - 48
      }

      for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive) {
          bulletList[i].updateBullet2()
          bulletList[i].checkHit2(i)
        }
      }

      for (let i = 0; i < meteorList.length; i++) {
        if (meteorList[i].alive) {
          meteorList[i].updateMove()
          meteorList[i].checkHit2(i)
        }
      }

      for (let i = 0; i < meteor2List.length; i++) {
        if (meteor2List[i].alive) {
          meteor2List[i].updateMove2()
          meteor2List[i].checkHit2(i)
        }
      }
      for (let i = 0; i < enemyList.length; i++) {
        enemyList[i].update()
        // console.log('적 숫자 체크', enemyList)
      }
    },
    main() {
      if (!this.gameOver && (this.inGameShip == 'rocket1.png' || this.inGameShip == 'rocket2.png')) {
        this.update()
        this.render()
        requestAnimationFrame(this.main)
      } else if (!this.gameOver && (this.inGameShip == 'rocket3.png' || this.inGameShip == 'rocket4.png')) {
        this.update2()
        this.render()
        requestAnimationFrame(this.main)
      } else if (
        !this.gameOver &&
        (this.inGameShip == 'rocket5.png' || this.inGameShip == 'rocket6.png' || this.inGameShip == 'rocket7.png')
      ) {
        this.update3()
        this.render2()
        requestAnimationFrame(this.main)
      } else {
        this.ctx.drawImage(
          this.gameOverImage,
          this.ctx.canvas.clientWidth / 2 - 200,
          this.ctx.canvas.clientHeight / 2 - 100,
          400,
          200
        )
      }
    },

    render() {
      this.ctx.drawImage(this.backgroundImage, 0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight)
      this.ctx.drawImage(this.spaceshipImage, this.spaceshipX, this.spaceshipY)
      this.ctx.fillText(`Score: ${this.score}`, 850, 30)
      this.ctx.fillStyle = 'Yellow'
      this.ctx.font = '25px gothic'
      this.ctx.fillText(`Gold: ${this.score / 10}`, 1050, 30)
      this.ctx.fillStyle = 'White'
      this.ctx.font = '25px gothic'

      for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive) {
          this.ctx.drawImage(this.bulletImage, bulletList[i].x + 48, bulletList[i].y + 12)
        }
      }

      for (let i = 0; i < meteorList.length; i++) {
        if (meteorList[i].alive) {
          this.ctx.drawImage(this.meteor1Image, meteorList[i].x, meteorList[i].y)
        }
      }

      for (let i = 0; i < meteor2List.length; i++) {
        if (meteor2List[i].alive) {
          this.ctx.drawImage(this.meteor2Image, meteor2List[i].x, meteor2List[i].y)
        }
      }

      for (let i = 0; i < enemyList.length; i++) {
        this.ctx.drawImage(this.enemyImage, enemyList[i].x, enemyList[i].y)
      }
    },

    render2() {
      this.ctx.drawImage(this.backgroundImage, 0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight)
      this.ctx.drawImage(this.spaceshipImage, this.spaceshipX, this.spaceshipY)
      this.ctx.fillText(`Score: ${this.score}`, 850, 30)
      this.ctx.fillStyle = 'Yellow'
      this.ctx.font = '25px gothic'
      this.ctx.fillText(`Gold: ${this.score / 10}`, 1050, 30)
      this.ctx.fillStyle = 'White'
      this.ctx.font = '25px gothic'

      for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive) {
          this.ctx.drawImage(this.bulletImage2, bulletList[i].x + 48, bulletList[i].y + 12)
        }
      }

      for (let i = 0; i < meteorList.length; i++) {
        if (meteorList[i].alive) {
          this.ctx.drawImage(this.meteor1Image, meteorList[i].x, meteorList[i].y)
        }
      }

      for (let i = 0; i < meteor2List.length; i++) {
        if (meteor2List[i].alive) {
          this.ctx.drawImage(this.meteor2Image, meteor2List[i].x, meteor2List[i].y)
        }
      }

      for (let i = 0; i < enemyList.length; i++) {
        this.ctx.drawImage(this.enemyImage, enemyList[i].x, enemyList[i].y)
      }
    },

    sendGameOver() {
      this.$emit('GettingGameScore', this.score)
      this.$emit('GettingGetGold', this.score / 10)
      console.log('GettingGameScore', this.score)
      console.log('GettingGetGold', this.score / 10)
      this.sendingResultData()
    },

    async sendingResultData() {
      const getScore = this.score
      const getGold = this.score / 10
      await axios
        .put(
          process.env.VUE_APP_API + '/game/update',
          { nick: this.nick },
          {
            headers: {
              Authorization: `${localStorage.getItem('token')}`,
              gold: getGold,
              score: getScore,
              usedShip: `${this.inGameShip}`
            }
          }
        )
        .then(response => {
          console.log('update: ', response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
.my-canvas {
  position: left;
  /* width: 100%;
  height: 100%; */
  border: 1px solid rgb(199, 198, 198);
}
</style>

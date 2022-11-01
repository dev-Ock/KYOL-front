<template>
  <div class="gamehome">
    <div class="my-canvas-wrapper">
      <canvas ref="myClass" class="my-canvas" width="1200" height="500">
        <img src="../../assets/images/space.jpg" />
      </canvas>
      <div v-if="gameOver == true">
        <div style="color: white">
          죽음 ? 한 판 더 ?
          <a href="/gear">
            <button class="pushable">
              <button class="front"></button>
            </button>
          </a>
        </div>
      </div>
      <figure>
        <audio v-if="gameOver == false" autoplay loop src="../../assets/videos/videoplayback5.mp3"></audio>
      </figure>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions, mapGetters } from 'vuex'

const bulletList = []
const enemyList = []
const enemyList2 = []
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
        } else if (this.x >= all.ctx.canvas.clientWidth) {
          this.alive = false
        }
      }
      for (let i = 0; i < enemyList2.length; i++) {
        if (
          all.spaceshipX < enemyList2[i].x &&
          this.x + 10 >= enemyList2[i].x &&
          this.y >= enemyList2[i].y - 20 &&
          this.y <= enemyList2[i].y + 35
        ) {
          all.score += 300
          this.alive = false
          enemyList2.splice(i, 1)
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
      for (let i = 0; i < enemyList2.length; i++) {
        if (
          all.spaceshipX < enemyList2[i].x &&
          this.x + 40 >= enemyList2[i].x &&
          this.y >= enemyList2[i].y - 20 &&
          this.y <= enemyList2[i].y + 35
        ) {
          all.score += 300
          this.alive = false
          enemyList2.splice(i, 1)
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
    this.checkHitMeteor = function (i) {
      if (
        ((all.spaceshipX <= this.x + 10 && this.x + 10 <= all.spaceshipX + 30) ||
          (this.x + 10 <= all.spaceshipX && all.spaceshipX + 30 <= this.x + 60) ||
          (this.x + 70 > all.spaceshipX && this.x + 70 <= all.spaceX + 30)) &&
        // this.x >= all.spaceshipX &&
        // this.x <= all.spaceshipX + 22
        this.y >= all.spaceshipY - 48 &&
        this.y <= all.spaceshipY + 33
      ) {
        all.gameOver = true
        all.sendGameOver(all)
      } else if (this.x <= -500 && all.score < 8000) {
        meteorList.splice(i, 1)
        console.log('메테오 1 삭제 : ', meteorList)
      }
    }

    this.checkHitMeteor2 = function (i) {
      if (
        ((all.spaceshipX <= this.x + 10 && this.x + 10 <= all.spaceshipX + 30) ||
          (this.x + 10 <= all.spaceshipX && all.spaceshipX + 30 <= this.x + 60) ||
          (this.x + 70 > all.spaceshipX && this.x + 70 <= all.spaceX + 30)) &&
        this.y >= all.spaceshipY - 48 &&
        this.y <= all.spaceshipY + 33
      ) {
        all.gameOver = true
        all.sendGameOver(all)
      } else if (this.x <= -500) {
        meteor2List.splice(i, 1)
      }
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
    this.init2 = function () {
      let generateRandomValue = function (min, max) {
        let randomNum = Math.floor(Math.random() * (max - min + 1)) + min
        return randomNum
      }

      if (all.score > 20000) {
        this.x = all.ctx.canvas.clientWidth
        this.y = generateRandomValue(0, all.ctx.canvas.clientHeight - 60)
        enemyList2.push(this)
      }
    }
    this.EnemyLocationUpdate = function () {
      this.x -= 3
      if (this.x <= 0) {
        all.gameOver = true
        all.sendGameOver(all)
        console.log('game Over')
      }
    }
    this.EnemyLocationUpdate2 = function () {
      this.x -= 6
      if (this.x <= 0) {
        all.gameOver = true
        all.sendGameOver(all)
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
    this.createEnemy2(this)
    this.createMeteor(this)
  },
  methods: {
    ...mapActions(['gear', 'gear2']),

    checkStartInformation() {
      console.log('로컬 스토리지 쉽정보 : ', localStorage.getItem('currentShipData'))
      console.log('게임 오버 정보 : ', this.gameOver)
      if (this.currentShipImage) {
        this.inGameShip = this.currentShipImage
      } else {
        this.inGameShip = localStorage.getItem('currentShipData')
      }

      this.gameOver = false
    },

    loadImage() {
      this.backgroundImage = new Image()
      this.spaceshipImage = new Image()
      this.bulletImage = new Image()
      this.bulletImage2 = new Image()
      this.bulletImage3 = new Image()
      this.enemyImage = new Image()
      this.enemyImage2 = new Image()
      this.gameOverImage = new Image()
      this.collisionImage = new Image()
      this.meteor1Image = new Image()
      this.meteor2Image = new Image()

      this.backgroundImage.src = require('../../assets/images/space.jpg')
      // this.backgroundImage.src = require('../../assets/videos/spaceBackGround15.mp4')
      this.collisionImage.src = require('../../assets/images/collision16.png')
      // this.spaceshipImage.src = require('../../assets/images/rocket1ingame.png')
      this.spaceshipImage.src = require(`../../assets/item/ingame${this.inGameShip}`)
      this.enemyImage.src = require('../../assets/images/enemy4.png')
      this.enemyImage2.src = require('../../assets/images/enemy2.png')
      this.bulletImage.src = require('../../assets/images/bulletHorizon.png')
      this.bulletImage2.src = require('../../assets/images/specialBullet.png')
      this.bulletImage3.src = require('../../assets/images/specialBullet3.png')
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
          (this.inGameShip == 'rocket5.png' ||
            this.inGameShip == 'rocket6.png' ||
            this.inGameShip == 'rocket7.png' ||
            this.inGameShip == 'rocket4.png' ||
            this.inGameShip == 'rocket8.png')
        ) {
          this.createBullet(this)
          this.playingSound(event)
        }
      })
      document.addEventListener('keyup', event => {
        delete this.keysDown[event.key]

        if (event.code == 'Space') {
          this.createBullet(this)
          this.playingSound(event)
        }
      })
    },

    createEnemy(all) {
      const interval = setInterval(function () {
        let e = new Enemy(all)
        e.init()
        if (all.gameOver) {
          clearInterval(interval)
        }
      }, 400)
    },

    createEnemy2(all) {
      const interval = setInterval(function () {
        let e = new Enemy(all)
        e.init2()
        if (all.gameOver) {
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
          meteorList[i].checkHitMeteor(i)
        }
      }

      for (let i = 0; i < meteor2List.length; i++) {
        if (meteor2List[i].alive) {
          meteor2List[i].updateMove2()
          meteor2List[i].checkHitMeteor2(i)
        }
      }
      for (let i = 0; i < enemyList.length; i++) {
        enemyList[i].EnemyLocationUpdate()
      }
      for (let i = 0; i < enemyList2.length; i++) {
        enemyList2[i].EnemyLocationUpdate2()
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
          meteorList[i].checkHitMeteor(i)
        }
      }

      for (let i = 0; i < meteor2List.length; i++) {
        if (meteor2List[i].alive) {
          meteor2List[i].updateMove2()
          meteor2List[i].checkHitMeteor2(i)
        }
      }
      for (let i = 0; i < enemyList.length; i++) {
        enemyList[i].EnemyLocationUpdate()
      }
      for (let i = 0; i < enemyList2.length; i++) {
        enemyList2[i].EnemyLocationUpdate2()
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
          meteorList[i].checkHitMeteor(i)
        }
      }

      for (let i = 0; i < meteor2List.length; i++) {
        if (meteor2List[i].alive) {
          meteor2List[i].updateMove2()
          meteor2List[i].checkHitMeteor2(i)
        }
      }
      for (let i = 0; i < enemyList.length; i++) {
        enemyList[i].EnemyLocationUpdate()
      }
      for (let i = 0; i < enemyList2.length; i++) {
        enemyList2[i].EnemyLocationUpdate2()
      }
    },
    main() {
      if (
        !this.gameOver &&
        (this.inGameShip == 'rocket0.png' || this.inGameShip == 'rocket1.png' || this.inGameShip == 'rocket2.png')
      ) {
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
      } else if (!this.gameOver && this.inGameShip == 'rocket8.png') {
        this.update3()
        this.render3chicken()
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

    playingSound(event) {
      if (event.key == ' ' && this.gameOver == false) {
        var spaceAudio = new Audio(require('../../assets/videos/Laser7.mp3'))
        setTimeout(function () {
          spaceAudio.play()
          setTimeout(function () {
            spaceAudio.pause()
            spaceAudio.currentTime = 0
          }, 600)
        }, 10)
      }
      if (event.gameOver == true) {
        console.log('game over sound :', event.gameOver)
        var endingAudio = new Audio(require('../../assets/videos/gameOver.mp3'))
        setTimeout(function () {
          endingAudio.play()
          setTimeout(function () {
            endingAudio.pause()
            endingAudio.currentTime = 0
          }, 10000)
        }, 10)
      }
    },

    checkingKeyEvent(event) {
      switch (event.key) {
        case 'space':
          this.playSound()
          break // 'a' key

        // case 66:
        //   this.playSound(sound2)
        //   break // 'b' key
      }
    },
    render() {
      this.ctx.drawImage(this.backgroundImage, 0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight)
      this.ctx.drawImage(this.spaceshipImage, this.spaceshipX, this.spaceshipY)
      this.ctx.fillText(`Score: ${this.score}`, 850, 30)
      this.ctx.fillStyle = 'Yellow'
      this.ctx.font = '25px gothic'
      this.ctx.fillText(`KYOL: ${this.score / 10}`, 1050, 30)
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

      for (let i = 0; i < enemyList2.length; i++) {
        this.ctx.drawImage(this.enemyImage2, enemyList2[i].x, enemyList2[i].y)
      }
    },

    render2() {
      this.ctx.drawImage(this.backgroundImage, 0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight)
      // this.ctx.drawImage(this.backgroundImage, 0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight)
      this.ctx.drawImage(this.spaceshipImage, this.spaceshipX, this.spaceshipY)
      this.ctx.fillText(`Score: ${this.score}`, 850, 30)
      this.ctx.fillStyle = 'Yellow'
      this.ctx.font = '25px gothic'
      this.ctx.fillText(`KYOL: ${this.score / 10}`, 1050, 30)
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

      for (let i = 0; i < enemyList2.length; i++) {
        this.ctx.drawImage(this.enemyImage2, enemyList2[i].x, enemyList2[i].y)
      }
    },

    render3chicken() {
      this.ctx.drawImage(this.backgroundImage, 0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight)
      // this.ctx.drawImage(this.backgroundImage, 0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight)
      this.ctx.drawImage(this.spaceshipImage, this.spaceshipX, this.spaceshipY)
      this.ctx.fillText(`Score: ${this.score}`, 850, 30)
      this.ctx.fillStyle = 'Yellow'
      this.ctx.font = '25px gothic'
      this.ctx.fillText(`KYOL: ${this.score / 10}`, 1050, 30)
      this.ctx.fillStyle = 'White'
      this.ctx.font = '25px gothic'

      for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive) {
          this.ctx.drawImage(this.bulletImage3, bulletList[i].x + 48, bulletList[i].y + 12)
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

      for (let i = 0; i < enemyList2.length; i++) {
        this.ctx.drawImage(this.enemyImage2, enemyList2[i].x, enemyList2[i].y)
      }
    },

    sendGameOver(all) {
      this.playingSound(all)
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

<style scoped>
.my-canvas {
  position: left;
  /* width: 100%;
  height: 100%; */
  /* border: 1px solid rgb(199, 198, 198); */
}
.my-canvas-wrapper {
  font-family: 'Hahmlet', serif;
  /* background: url('~@/assets/images/.gif') 100% 100% / cover no-repeat; */
  width: 100vw;
  height: 100vh;
  /* display: fixed; */
  position: fixed;
  background: url('~@/assets/item/1.png');
  /* #010101; */
}
.gamehome {
  height: 100vh;
  width: 100vw;
  /* position: fixed; */
  /* overflow: scroll; */
  font-family: 'Hahmlet', serif;
  /* display: flex; */
  background: url('~@/assets/item/1.png');
}
</style>

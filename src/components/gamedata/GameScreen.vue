<template>
  <div class="my-canvas-wrapper">
    <!-- ref="my-canvas" -->
    <canvas ref="myClass" class="my-canvas" width="1200" height="500">
      <img src="../../assets/images/space.jpg" />
    </canvas>

    <slot></slot>
  </div>
</template>

<script>
// class User {
//   constructor(name) {
//     this.name = name
//   }

//   sayHi() {
//     alert(this.name)
//   }
// }

const bulletList = []
const enemyList = []

class Bullet {
  constructor(all) {
    console.log('bullet 안쪽 인데?', all)
    // console.log('bullet 안쪽 인데?', this.bulletList)
    console.log('bullet 안쪽 인데?', bulletList)
    this.x = 0
    this.y = 0
    this.init = function (all) {
      this.x = all.spaceshipX
      this.y = all.spaceshipY
      this.alive = true
      bulletList.push(this)
    }
    this.update = function () {
      this.x += 7
    }
    this.checkHit = function () {
      console.log('check hit 안쪽 총알 리스트', bulletList)
      console.log('check hit 안쪽 점수판', this.score)
      for (let i = 0; i < enemyList.length; i++) {
        if (this.x >= enemyList[i].x - 10 && this.y >= enemyList[i].y - 20 && this.y <= enemyList[i].y + 35) {
          all.score += 100
          this.alive = false
          enemyList.splice(i, 1)
        }
        if (this.x >= all.ctx.canvas.clientWidth) this.alive = false
      }
    }
  }
}

// class generateRandomValue {
//   constructor(min, max) {
//     console.log('미니멈 값', min)
//     console.log('맥시멈 값', max)
//     let randomNum = Math.floor(Math.random() * (max - min + 1)) + min
//     console.log('랜덤숫자', randomNum)
//     return randomNum
//   }
// }

class Enemy {
  constructor(all) {
    this.x = 0
    this.y = 0
    this.init = function () {
      let generateRandomValue = function (min, max) {
        let randomNum = Math.floor(Math.random() * (max - min + 1)) + min
        console.log('랜덤숫자', randomNum)
        return randomNum
      }

      console.log('here ?', all.ctx.canvas.clientWidth)
      this.x = all.ctx.canvas.clientWidth
      this.y = generateRandomValue(0, all.ctx.canvas.clientHeight - 60)
      console.log('적 x 좌표', this.x)
      console.log('적 y 좌표', this.y)
      enemyList.push(this)
    }
    this.update = function () {
      this.x -= 3
      if (this.x <= 0) {
        all.gameOver = true
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

    spaceshipImage: '',
    bulletImage: '',
    enemyImage: '',
    gameOverImage: '',
    collisionImage: '',
    gameOver: false,
    score: 0,
    spaceshipX: 0,
    spaceshipY: 0,
    // canvas: document.createElement('canvas'),
    // bulletList: [],
    // enemyList: [],
    keysDown: {}
  }),

  async mounted() {
    // 사용법
    // let user = new User('John')
    // user.sayHi()

    console.log(this.keysDown)
    console.log('이것이 this 다 : ', this)
    this.ctx = this.$refs.myClass.getContext('2d')
    this.loadImage()
    this.setupKeyboardListener()
    this.main()
    this.createEnemy(this)
  },
  methods: {
    loadImage() {
      this.backgroundImage = new Image()
      this.spaceshipImage = new Image()
      this.bulletImage = new Image()
      this.enemyImage = new Image()
      this.gameOverImage = new Image()
      this.collisionImage = new Image()

      this.backgroundImage.src = require('../../assets/images/space.jpg')
      this.collisionImage.src = require('../../assets/images/collision16.png')
      this.spaceshipImage.src = require('../../assets/images/basicAircraftHorizon.png')
      this.enemyImage.src = require('../../assets/images/enemy4.png')
      this.bulletImage.src = require('../../assets/images/bulletHorizon.png')
      this.gameOverImage.src = require('../../assets/images/gameOver3.png')
    },

    setupKeyboardListener() {
      // function 도 스코핑영역을 가지기 때문에 function (event) 로 사용불가
      document.addEventListener('keydown', event => {
        console.log('여긴가', event.key)
        this.keysDown[event.key] = true
      })
      document.addEventListener('keyup', event => {
        console.log(event)
        delete this.keysDown[event.key]

        if (event.code == 'Space') {
          console.log('총알발사', event.code)
          this.createBullet(this)
        }
      })
    },

    createEnemy(all) {
      console.log('game over????', all.gameOver)

      const interval = setInterval(function () {
        let e = new Enemy(all)
        e.init()
      }, 400)
      console.log('적군생성')
    },

    createBullet(all) {
      let b = new Bullet(all)
      b.init(all)
      console.log('Bullet created')
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

      // 우주선의 이동 범위를 제한해서 update
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
          bulletList[i].update()
          bulletList[i].checkHit()
          console.log('hit !')
        }
      }

      for (let i = 0; i < enemyList.length; i++) {
        enemyList[i].update()
      }
    },

    main() {
      console.log('게임 상태는 : ', this.gameOver)
      if (!this.gameOver) {
        console.log('main - game is not over')

        this.update()
        this.render()
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
      this.ctx.fillStyle = 'white'
      this.ctx.font = '25px gothic'

      for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive) {
          console.log('총알 이미지', this.bulletImage)
          this.ctx.drawImage(this.bulletImage, bulletList[i].x + 48, bulletList[i].y + 12)
        }
      }

      for (let i = 0; i < enemyList.length; i++) {
        this.ctx.drawImage(this.enemyImage, enemyList[i].x, enemyList[i].y)
      }
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

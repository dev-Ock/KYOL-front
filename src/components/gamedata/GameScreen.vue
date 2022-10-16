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
// import Vue from 'vue'
// import Bullet from './Bullet.vue'
// const vmClass = Vue.extend(Bullet)
// const vm = new Bullet()

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
    bulletList: [],
    enemyList: [],
    keysDown: {}
  }),

  async mounted() {
    console.log(this.keysDown)
    this.ctx = this.$refs.myClass.getContext('2d')

    await this.loadImage()
    await this.setupKeyboardListener()
    // this.createEnemy()
    this.main()
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
          this.createBullet()
        }
      })
    },

    generateRandomValue(min, max) {
      let randomNum = Math.floor(Math.random() * (max - min + 1)) + min
      return randomNum
    },

    Bullet() {
      this.x = 0
      this.y = 0
      this.init = function () {
        this.x = this.spaceshipX
        this.y = this.spaceshipY
        this.alive = true
        this.bulletList.push(this)
      }
      this.update = function () {
        this.x += 7
      }
      this.checkHit = function () {
        for (let i = 0; i < this.enemyList.length; i++) {
          if (
            this.x >= this.enemyList[i].x - 10 &&
            this.y >= this.enemyList[i].y - 20 &&
            this.y <= this.enemyList[i].y + 35
          ) {
            this.score += 100
            this.alive = false
            this.enemyList.splice(i, 1)
          }
          if (this.x >= this.ctx.canvas.clientWidth) this.alive = false
        }
      }
    },

    Enemy() {
      this.x = 0
      this.y = 0
      this.init = function () {
        this.x = this.ctx.canvas.clientWidth
        this.y = this.generateRandomValue(0, this.canvas.height - 60)
        this.enemyList.push(this)
      }
      this.update = function () {
        this.x -= 3
        if (this.x <= 0) {
          this.gameOver = true
          console.log('game Over')
        }
      }
    },

    createEnemy() {
      const interval = setInterval(function () {
        let e = new this.Enemy()
        e.init()
      }, 400)
      console.log('적군생성')
    },

    createBullet() {
      let b = new this.Bullet()
      b.init()
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
        this.spaceshipX = this.ctx.canvas.clientWidths - 48
      }
      console.log()
      for (let i = 0; i < this.bulletList.length; i++) {
        if (this.bulletList[i].alive) {
          this.bulletList[i].update()
          this.bulletList[i].checkHit()
          console.log('hit !')
        }
      }

      for (let i = 0; i < this.enemyList.length; i++) {
        this.enemyList[i].update()
      }
    },

    main() {
      if (!this.gameOver) {
        console.log('main - game is not over')
        this.update()
        // this.render()
        // requestAnimationFrame(this.main)
      } else {
        this.ctx.drawImage(this.gameOverImage, 400, 200, 600, 300)
      }
    },

    render() {
      console.log('render')
      console.log('render draw background', this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight)
      this.ctx.drawImage(this.backgroundImage, 0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight)
      console.log('render draw ship', this.spaceshipX)
      this.ctx.drawImage(this.spaceshipImage, this.spaceshipX, this.spaceshipY)

      console.log('render draw score', this.score)
      this.ctx.fillText(`Score: ${this.score}`, 1100, 30)
      this.ctx.fillStyle = 'white'
      console.log('bulletList 렝쓰', this.bulletList)
      for (let i = 0; i < this.bulletList.length; i++) {
        if (this.bulletList[i].alive) {
          this.ctx.drawImage(this.bulletImage, this.bulletList[i].x + 48, this.bulletList[i].y + 12)
        }
      }

      for (let i = 0; i < this.enemyList.length; i++) {
        this.ctx.drawImage(this.enemyImage, this.enemyList[i].x, this.enemyList[i].y)
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

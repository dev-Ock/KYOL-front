// function Bullet() {
//   this.x = 0
//   this.y = 0
//   this.init = function () {
//     this.x = spaceshipX
//     this.y = spaceshipY
//     this.alive = true
//     bulletList.push(this)
//   }

//   this.update = function () {
//     this.x += 7
//   }

//   this.checkHit = function () {
//     for (let i = 0; i < enemyList.length; i++) {
//       if (this.x >= enemyList[i].x - 10 && this.y >= enemyList[i].y - 20 && this.y <= enemyList[i].y + 35) {
//         score += 100
//         this.alive = false
//         enemyList.splice(i, 1)
//       }
//       if (this.x >= 1475) this.alive = false
//     }
//   }
// }

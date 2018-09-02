import { Ball } from "./ball"

interface World {
  width: number
  height: number
  acceleration: number
  friction: number
}

export class Engine {
  private lastTime: number

  world: World = {
    width: window.innerWidth,
    height: window.innerHeight,
    acceleration: 0.0012,
    friction: 0.999
  }
  constructor(private ball: Ball) {
    console.log("init engine")

    this.lastTime = performance.now()

    this.ball.posX = this.world.width * 0.5
    this.ball.posY = this.world.height * 0.2

    this.update(this.lastTime)
  }

  private update(timestamp: number) {
    // console.log(`engine.update`)
    // console.log(`engine.update lastTime ${this.lastTime}`)

    let deltaTime = timestamp - this.lastTime
    this.lastTime = timestamp

    if (this.ball.isDragged) {
      return
    }

    this.ball.posY =
      this.ball.posY +
      deltaTime * (this.ball.velY + (deltaTime * this.world.acceleration) / 2)

    this.ball.posX = this.ball.posX + deltaTime * this.ball.velX

    this.ball.velX = this.ball.velX * this.world.friction
    this.ball.velY = this.ball.velY + deltaTime * this.world.acceleration

    // If ball would bleed out of screen
    if (this.ball.posY + this.ball.height >= this.world.height) {
      this.ball.posY = this.world.height - this.ball.height
      this.ball.velY = this.ball.velY * -0.7

      // If ball too slow, stop render loop
      if (Math.abs(this.ball.velY) < 0.05) {
        //world.acceleration = 0
        //this.ball.setVelocityY(0)
        console.log("killed")
        return
      }
    }

    if (this.ball.posY <= 0) {
      this.ball.posY = 0
      this.ball.velY = this.ball.velY * -0.7
    }

    if (this.ball.posX + this.ball.width > this.world.width) {
      this.ball.velX = this.ball.velX * -1
    }
    if (this.ball.posX <= 0) {
      this.ball.velX = this.ball.velX * -1
    }

    this.ball.render()

    window.requestAnimationFrame(this.update.bind(this))
  }

  throwBall() {
    this.lastTime = performance.now()
    this.update(this.lastTime)
  }
}

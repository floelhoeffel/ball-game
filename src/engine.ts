import { Ball } from "./ball"

interface World {
  width: number
  height: number
  acceleration: number
  friction: number
  velXThreshold: number
  velYThreshold: number
  bounceFriction: number
}

export class Engine {
  private lastTime: number
  deltaTime: number

  world: World = {
    width: window.innerWidth,
    height: window.innerHeight,
    acceleration: 0.0012,
    friction: 0.993,
    velXThreshold: 0.01,
    velYThreshold: 0.05,
    bounceFriction: 0.7
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

    this.deltaTime = timestamp - this.lastTime
    this.lastTime = timestamp

    // If dragged, end render loop
    if (this.ball.isDragged) {
      return
    }

    // If no velocity, end render loop
    if (this.ball.velX == 0 && this.ball.velY == 0) {
      console.log("render loop ended")

      return
    }

    // Only move if vel > 0
    if (Math.abs(this.ball.velY) > 0) {
      this.ball.posY =
        this.ball.posY +
        this.deltaTime *
          (this.ball.velY + (this.deltaTime * this.world.acceleration) / 2)
    }

    // Only move if vel > 0
    if (Math.abs(this.ball.velX) > 0) {
      this.ball.posX = this.ball.posX + this.deltaTime * this.ball.velX
    }

    // Friction
    this.ball.velX = this.ball.velX * this.world.friction
    if (
      Math.abs(this.ball.velX) < this.world.velXThreshold &&
      this.ball.velX != 0
    ) {
      this.ball.velX = 0
      console.log("ball.velX=0")
    }

    // Gravity, only if not laying on the ground
    if (this.ball.posY !== this.world.height - this.ball.height) {
      this.ball.velY = this.ball.velY + this.deltaTime * this.world.acceleration
    }

    // Bottom bounds
    if (
      this.ball.velY != 0 &&
      this.ball.posY + this.ball.height >= this.world.height
    ) {
      console.log("bottom")
      this.ball.posY = this.world.height - this.ball.height
      this.ball.velY = this.ball.velY * this.world.bounceFriction * -1

      // If ball too slow, stop render loop
      if (
        Math.abs(this.ball.velY) < this.world.velYThreshold &&
        Math.abs(this.ball.velY) > 0
      ) {
        //world.acceleration = 0
        console.log("ball.velY=0")
        this.ball.velY = 0
        //return
      }
    }
    // Top bounds
    if (this.ball.posY <= 0) {
      console.log("top")
      this.ball.posY = 0
      this.ball.velY = this.ball.velY * this.world.bounceFriction * -1
    }
    // Right bounds
    if (this.ball.posX + this.ball.width > this.world.width) {
      console.log("right")

      this.ball.velX = this.ball.velX * -1
    }
    // Left bounds
    if (this.ball.posX <= 0) {
      console.log("left")
      this.ball.velX = this.ball.velX * -1
    }

    this.ball.render()

    window.requestAnimationFrame(time => {
      this.update(time)
    })
  }

  resume() {
    this.lastTime = performance.now()
    this.update(this.lastTime)
  }
}

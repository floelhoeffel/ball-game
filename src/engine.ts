import * as ball from "./ball"

let lastTime = performance.now()

const world = {
  width: window.innerWidth,
  height: window.innerHeight,
  acceleration: 0.0012,
  friction: 0.999
}

function update(timestamp: number) {
  let deltaTime = timestamp - lastTime
  lastTime = timestamp

  if (ball.isDragged) return

  ball.setPositionY(
    ball.positionY +
      deltaTime * (ball.velocityY + deltaTime * world.acceleration / 2)
  )
  ball.setPositionX(ball.positionX + deltaTime * ball.velocityX)

  ball.setVelocityX(ball.velocityX * world.friction)
  ball.setVelocityY(ball.velocityY + deltaTime * world.acceleration)

  // If ball would bleed out of screen
  if (ball.positionY + ball.height >= world.height) {
    ball.setPositionY(world.height - ball.height)
    ball.setVelocityY(ball.velocityY * -0.7)

    // If ball too slow, stop render loop
    if (Math.abs(ball.velocityY) < 0.05) {
      //world.acceleration = 0
      //ball.setVelocityY(0)
      console.log("killed")
      return
    }
  }

  if (ball.positionX + ball.width > world.width) {
    ball.setVelocityX(ball.velocityX * -1)
  }
  if (ball.positionX <= 0) {
    ball.setVelocityX(ball.velocityX * -1)
  }

  ball.render()

  window.requestAnimationFrame(update)
}

function throwBall() {
  lastTime = performance.now()
  update(lastTime)
}

function init() {
  console.log("init")

  ball.setPositionX(world.width * 0.5)
  ball.setPositionY(world.height * 0.2)

  update(lastTime)
}

export { init, world, throwBall }

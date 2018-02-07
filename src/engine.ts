import * as ball from "./ball"

let lastTime = performance.now()

const world = {
  width: window.innerWidth,
  height: window.innerHeight,
  acceleration: 0.0012
}

function update(timestamp: number) {
  let deltaTime = timestamp - lastTime
  lastTime = timestamp

  if (ball.isDragged) return

  ball.setPosition(
    ball.position +
      deltaTime * (ball.velocity + deltaTime * world.acceleration / 2)
  )

  ball.setVelocity(ball.velocity + deltaTime * world.acceleration)

  // If ball would bleed out of screen
  if (ball.position + ball.height >= world.height) {
    ball.setPosition(world.height - ball.height)
    ball.setVelocity(ball.velocity * -0.7)

    // If ball too slow, stop render loop
    if (Math.abs(ball.velocity) < 0.05) {
      world.acceleration = 0
      ball.setVelocity(0)
      console.log("killed")
      return
    }
  }

  ball.render()

  window.requestAnimationFrame(update)
}

export function init() {
  console.log("init")

  update(lastTime)
}

import * as ball from "./ball.js"

let lastTime = performance.now()

const world = {
  w: window.innerWidth,
  h: window.innerHeight,
  acceleration: 0.0012
}

function update(timestamp) {
  let deltaTime = timestamp - lastTime
  lastTime = timestamp

  ball.setPosition(
    ball.position +
      deltaTime * (ball.velocity + deltaTime * world.acceleration / 2)
  )

  ball.setVelocity(ball.velocity + deltaTime * world.acceleration)

  // If ball would bleed out of screen
  if (ball.position + ball.height >= world.h) {
    ball.setPosition(world.h - ball.height)
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

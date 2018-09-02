import { Ball } from "./ball"
import { Engine } from "./engine"

export class Input {
  constructor(private engine: Engine, private ball: Ball) {
    let lastBallX = 0
    let lastBallY = 0

    document.body.addEventListener("mousemove", event => {
      if (ball.isDragged) {
        console.log("ballMove")

        console.log(`oldX ${ball.posX}, newX ${event.clientX - ball.width / 2}`)

        ball.posY = event.clientY - ball.height / 2
        ball.posX = event.clientX - ball.width / 2

        ball.render()
      }
    })

    ball.element.addEventListener("mousedown", event => {
      console.log("ball")
      ball.isDragged = true
    })
    document.body.addEventListener("mouseup", event => {
      ball.isDragged = false
      engine.throwBall()
    })
  }
}

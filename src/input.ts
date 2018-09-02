import { Ball } from "./ball"
import { Engine } from "./engine"

export class Input {
  deltaX: number
  deltaY: number
  constructor(private engine: Engine, private ball: Ball) {
    document.body.addEventListener("mousemove", event => {
      if (ball.isDragged) {
        let newX = event.clientX - ball.width / 2
        let newY = event.clientY - ball.height / 2
        this.deltaX = ball.posX - newX
        this.deltaY = ball.posY - newY

        //console.log("ballMove", deltaX, deltaY)

        ball.posX = newX
        ball.posY = newY

        ball.render()
      }
    })

    ball.element.addEventListener("mousedown", event => {
      console.log("ball")
      ball.isDragged = true
    })
    document.body.addEventListener("mouseup", event => {
      ball.isDragged = false
      console.log("throw", this.deltaX, this.deltaY, engine.deltaTime)
      ball.velX = -this.deltaX / engine.deltaTime
      ball.velY = -this.deltaY / engine.deltaTime
      engine.resume()
    })
  }
}

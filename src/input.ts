import * as ball from "./ball"
import * as engine from "./engine"

function activate() {
  document.body.addEventListener("mousemove", event => {
    //console.log(event)
    if (ball.isDragged) {
      console.log("ballMove")

      ball.setPositionY(event.clientY - ball.height / 2)
      ball.setPositionX(event.clientX - ball.width / 2)
      ball.render()
    }
  })

  ball.ballElement.addEventListener("mousedown", event => {
    console.log("ball")
    ball.setDragged(true)
  })
  document.body.addEventListener("mouseup", event => {
    ball.setDragged(false)
    engine.throwBall()
  })
}

export { activate }

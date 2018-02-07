import * as ball from "./ball"

export function activate() {
  document.body.addEventListener("mousemove", event => {
    //console.log(event)
    if (ball.isDragged) {
      console.log("ballMove")

      ball.setPosition(event.clientY)
      ball.render()
    }
  })

  ball.ballElement.addEventListener("mousedown", event => {
    console.log("ball")
    ball.setDragged(true)
  })
  document.body.addEventListener("mouseup", event => {
    ball.setDragged(false)
  })
}

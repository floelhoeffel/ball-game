var ball = document.querySelector("#ball")

const startTime = performance.now()
let lastTime = startTime
let deltaTime

let position = ball.getBoundingClientRect().top
const ballHeight = ball.getBoundingClientRect().height

let velocity = 0
const acceleration = 0.0009
const maxY = window.innerHeight

function drawPosition(timestamp) {
  deltaTime = timestamp - lastTime
  lastTime = timestamp

  position += deltaTime * (velocity + deltaTime * acceleration / 2)
  velocity += deltaTime * acceleration

  var deltaPos = position - ball.getBoundingClientRect().top

  console.log(position, deltaPos)

  // If ball would bleed out of screen
  if (position + ballHeight >= maxY) {
    position = maxY - ballHeight
    console.log("Bounce", velocity)
    velocity *= -1
    //velocity *= 0.9999
    //return
  }

  ball.style.transform = "translateY(" + position + "px)"

  window.requestAnimationFrame(drawPosition)
}
drawPosition(startTime)

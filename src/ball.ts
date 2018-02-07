const ballElement = document.body.appendChild(document.createElement("div"))
ballElement.setAttribute("id", "ball")

const height: number = ballElement.getBoundingClientRect().height

let velocity: number = 0
let position: number = ballElement.getBoundingClientRect().top
let isDragged: boolean = false

function setDragged(value: boolean) {
  isDragged = value
}

function setPosition(value: number) {
  position = value
}

function setVelocity(value: number) {
  velocity = value
}

function render() {
  ballElement.style.transform = "translateY(" + position + "px)"
}

export {
  ballElement,
  height,
  velocity,
  position,
  isDragged,
  setDragged,
  setPosition,
  setVelocity,
  render
}

const ballElement = document.body.appendChild(document.createElement("div"))
ballElement.setAttribute("id", "ball")

const height: number = ballElement.getBoundingClientRect().height
const width: number = ballElement.getBoundingClientRect().width

let velocityY: number = 0
let velocityX: number = 0.4
let positionY: number = ballElement.getBoundingClientRect().top
let positionX: number = ballElement.getBoundingClientRect().left
let isDragged: boolean = false

function setDragged(value: boolean) {
  isDragged = value
}
function setPositionX(value: number) {
  positionX = value
}
function setPositionY(value: number) {
  positionY = value
}

function setVelocityX(value: number) {
  velocityX = value
}
function setVelocityY(value: number) {
  velocityY = value
}

function render() {
  console.log("x", positionX, "y", positionY)

  ballElement.style.transform =
    "translateY(" + positionY + "px) translateX(" + positionX + "px)"
}

export {
  ballElement,
  width,
  height,
  velocityY,
  velocityX,
  positionY,
  positionX,
  isDragged,
  setDragged,
  setPositionY,
  setPositionX,
  setVelocityY,
  setVelocityX,
  render
}

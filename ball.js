const ballElement = document.body.appendChild(document.createElement("div"))
ballElement.setAttribute("id", "ball")

export const height = ballElement.getBoundingClientRect().height

export let position = ballElement.getBoundingClientRect().top
export function setPosition(value) {
  position = value
}
export let velocity = 0
export function setVelocity(value) {
  velocity = value
}

export function render() {
  ballElement.style.transform = "translateY(" + position + "px)"
}

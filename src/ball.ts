export class Ball {
  element: HTMLElement

  width: number
  height: number

  velX: number = -1 + Math.random() * 2
  velY: number = 0

  posX: number
  posY: number

  isDragged: boolean = false

  constructor(element: HTMLElement) {
    this.element = element
    let boundingRect = this.element.getBoundingClientRect()

    // ballElement.setAttribute("id", "ball")

    this.height = boundingRect.height
    this.width = boundingRect.width
    this.posX = boundingRect.top
    this.posY = boundingRect.left
  }
  render() {
    //console.log("x", positionX, "y", positionY)

    this.element.style.transform =
      "translateY(" + this.posY + "px) translateX(" + this.posX + "px)"
  }
}



//ballElement.style.transform = "translate(50%, 20%)"

// function setDragged(value: boolean) {
//   isDragged = value
// }
// function setPositionX(value: number) {
//   positionX = value
// }
// function setPositionY(value: number) {
//   positionY = value
// }

// function setVelocityX(value: number) {
//   velocityX = value
// }
// function setVelocityY(value: number) {
//   velocityY = value
// }

// function

// export {
//   ballElement,
//   width,
//   height,
//   velocityY,
//   velocityX,
//   positionY,
//   positionX,
//   isDragged,
//   setDragged,
//   setPositionY,
//   setPositionX,
//   setVelocityY,
//   setVelocityX,
//   render
// }

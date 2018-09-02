"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ball = /** @class */ (function () {
    function Ball(element) {
        this.velX = -1 + Math.random() * 2;
        this.velY = 0;
        this.isDragged = false;
        this.element = element;
        var boundingRect = this.element.getBoundingClientRect();
        // ballElement.setAttribute("id", "ball")
        this.height = boundingRect.height;
        this.width = boundingRect.width;
        this.posX = boundingRect.top;
        this.posY = boundingRect.left;
    }
    Ball.prototype.render = function () {
        //console.log("x", positionX, "y", positionY)
        this.element.style.transform =
            "translateY(" + this.posY + "px) translateX(" + this.posX + "px)";
    };
    return Ball;
}());
exports.Ball = Ball;
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
//# sourceMappingURL=ball.js.map
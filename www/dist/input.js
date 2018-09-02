"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Input = /** @class */ (function () {
    function Input(engine, ball) {
        this.engine = engine;
        this.ball = ball;
        var lastBallX = 0;
        var lastBallY = 0;
        document.body.addEventListener("mousemove", function (event) {
            if (ball.isDragged) {
                console.log("ballMove");
                ball.posY = event.clientY - ball.height / 2;
                ball.posX = event.clientX - ball.width / 2;
                ball.render();
            }
        });
        ball.element.addEventListener("mousedown", function (event) {
            console.log("ball");
            ball.isDragged = true;
        });
        document.body.addEventListener("mouseup", function (event) {
            ball.isDragged = false;
            engine.throwBall();
        });
    }
    return Input;
}());
exports.Input = Input;
//# sourceMappingURL=input.js.map
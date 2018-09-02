"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Engine = /** @class */ (function () {
    function Engine(ball) {
        this.ball = ball;
        this.lastTime = performance.now();
        this.world = {
            width: window.innerWidth,
            height: window.innerHeight,
            acceleration: 0.0012,
            friction: 0.999
        };
        console.log("init");
        this.ball.posX = this.world.width * 0.5;
        this.ball.posY = this.world.height * 0.2;
        this.update(this.lastTime);
    }
    Engine.prototype.update = function (timestamp) {
        var deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        if (this.ball.isDragged)
            return;
        this.ball.posY =
            this.ball.posY +
                deltaTime * (this.ball.velY + (deltaTime * this.world.acceleration) / 2);
        this.ball.posX = this.ball.posX + deltaTime * this.ball.velX;
        this.ball.velX = this.ball.velX * this.world.friction;
        this.ball.velY = this.ball.velY + deltaTime * this.world.acceleration;
        // If ball would bleed out of screen
        if (this.ball.posY + this.ball.height >= this.world.height) {
            this.ball.posY = this.world.height - this.ball.height;
            this.ball.velY = this.ball.velY * -0.7;
            // If ball too slow, stop render loop
            if (Math.abs(this.ball.velY) < 0.05) {
                //world.acceleration = 0
                //this.ball.setVelocityY(0)
                console.log("killed");
                return;
            }
        }
        if (this.ball.posX + this.ball.width > this.world.width) {
            this.ball.velX = this.ball.velX * -1;
        }
        if (this.ball.posX <= 0) {
            this.ball.velX = this.ball.velX * -1;
        }
        this.ball.render();
        window.requestAnimationFrame(this.update);
    };
    Engine.prototype.throwBall = function () {
        this.lastTime = performance.now();
        this.update(this.lastTime);
    };
    return Engine;
}());
exports.Engine = Engine;
//# sourceMappingURL=engine.js.map
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ball_1 = __webpack_require__(1);
var engine_1 = __webpack_require__(2);
var input_1 = __webpack_require__(3);
var ball = new ball_1.Ball(document.getElementById("ball"));
var engine = new engine_1.Engine(ball);
var input = new input_1.Input(engine, ball);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Engine = /** @class */ (function () {
    function Engine(ball) {
        this.ball = ball;
        this.world = {
            width: window.innerWidth,
            height: window.innerHeight,
            acceleration: 0.0012,
            friction: 0.999
        };
        console.log("init engine");
        this.lastTime = performance.now();
        this.ball.posX = this.world.width * 0.5;
        this.ball.posY = this.world.height * 0.2;
        this.update(this.lastTime);
    }
    Engine.prototype.update = function (timestamp) {
        // console.log(`engine.update`)
        // console.log(`engine.update lastTime ${this.lastTime}`)
        var deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        if (this.ball.isDragged) {
            return;
        }
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
        window.requestAnimationFrame(this.update.bind(this));
    };
    Engine.prototype.throwBall = function () {
        this.lastTime = performance.now();
        this.update(this.lastTime);
    };
    return Engine;
}());
exports.Engine = Engine;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

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
                console.log("oldX " + ball.posX + ", newX " + (event.clientX - ball.width / 2));
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
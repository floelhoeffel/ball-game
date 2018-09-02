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
        this.velY = -2 + Math.random() * 4;
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
            friction: 0.993,
            velXThreshold: 0.01,
            velYThreshold: 0.05,
            bounceFriction: 0.7
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
        var _this = this;
        this.deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        // If dragged, end render loop
        if (this.ball.isDragged) {
            return;
        }
        // If no velocity, end render loop
        if (this.ball.velX == 0 && this.ball.velY == 0) {
            console.log("render loop ended");
            return;
        }
        // Only move if vel > 0
        if (Math.abs(this.ball.velY) > 0) {
            this.ball.posY =
                this.ball.posY +
                    this.deltaTime *
                        (this.ball.velY + (this.deltaTime * this.world.acceleration) / 2);
        }
        // Only move if vel > 0
        if (Math.abs(this.ball.velX) > 0) {
            this.ball.posX = this.ball.posX + this.deltaTime * this.ball.velX;
        }
        // Friction
        this.ball.velX = this.ball.velX * this.world.friction;
        if (Math.abs(this.ball.velX) < this.world.velXThreshold &&
            this.ball.velX != 0) {
            this.ball.velX = 0;
            console.log("ball.velX=0");
        }
        // Gravity, only if not laying on the ground
        if (this.ball.posY !== this.world.height - this.ball.height) {
            this.ball.velY = this.ball.velY + this.deltaTime * this.world.acceleration;
        }
        // Bottom bounds
        if (this.ball.velY != 0 &&
            this.ball.posY + this.ball.height >= this.world.height) {
            console.log("bottom");
            this.ball.posY = this.world.height - this.ball.height;
            this.ball.velY = this.ball.velY * this.world.bounceFriction * -1;
            // If ball too slow, stop render loop
            if (Math.abs(this.ball.velY) < this.world.velYThreshold &&
                Math.abs(this.ball.velY) > 0) {
                //world.acceleration = 0
                console.log("ball.velY=0");
                this.ball.velY = 0;
                //return
            }
        }
        // Top bounds
        if (this.ball.posY <= 0) {
            console.log("top");
            this.ball.posY = 0;
            this.ball.velY = this.ball.velY * this.world.bounceFriction * -1;
        }
        // Right bounds
        if (this.ball.posX + this.ball.width > this.world.width) {
            console.log("right");
            this.ball.velX = this.ball.velX * -1;
        }
        // Left bounds
        if (this.ball.posX <= 0) {
            console.log("left");
            this.ball.velX = this.ball.velX * -1;
        }
        this.ball.render();
        window.requestAnimationFrame(function (time) {
            _this.update(time);
        });
    };
    Engine.prototype.resume = function () {
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
        var _this = this;
        this.engine = engine;
        this.ball = ball;
        document.body.addEventListener("mousemove", function (event) {
            if (ball.isDragged) {
                var newX = event.clientX - ball.width / 2;
                var newY = event.clientY - ball.height / 2;
                _this.deltaX = ball.posX - newX;
                _this.deltaY = ball.posY - newY;
                //console.log("ballMove", deltaX, deltaY)
                ball.posX = newX;
                ball.posY = newY;
                ball.render();
            }
        });
        ball.element.addEventListener("mousedown", function (event) {
            console.log("ball");
            ball.isDragged = true;
        });
        document.body.addEventListener("mouseup", function (event) {
            ball.isDragged = false;
            console.log("throw", _this.deltaX, _this.deltaY, engine.deltaTime);
            ball.velX = -_this.deltaX / engine.deltaTime;
            ball.velY = -_this.deltaY / engine.deltaTime;
            engine.resume();
        });
    }
    return Input;
}());
exports.Input = Input;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
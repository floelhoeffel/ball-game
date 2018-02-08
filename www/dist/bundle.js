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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ballElement = document.body.appendChild(document.createElement("div"));
exports.ballElement = ballElement;
ballElement.setAttribute("id", "ball");
var height = ballElement.getBoundingClientRect().height;
exports.height = height;
var width = ballElement.getBoundingClientRect().width;
exports.width = width;
var velocityY = 0;
exports.velocityY = velocityY;
var velocityX = 0.4;
exports.velocityX = velocityX;
var positionY = ballElement.getBoundingClientRect().top;
exports.positionY = positionY;
var positionX = ballElement.getBoundingClientRect().left;
exports.positionX = positionX;
var isDragged = false;
exports.isDragged = isDragged;
function setDragged(value) {
    exports.isDragged = isDragged = value;
}
exports.setDragged = setDragged;
function setPositionX(value) {
    exports.positionX = positionX = value;
}
exports.setPositionX = setPositionX;
function setPositionY(value) {
    exports.positionY = positionY = value;
}
exports.setPositionY = setPositionY;
function setVelocityX(value) {
    exports.velocityX = velocityX = value;
}
exports.setVelocityX = setVelocityX;
function setVelocityY(value) {
    exports.velocityY = velocityY = value;
}
exports.setVelocityY = setVelocityY;
function render() {
    console.log("x", positionX, "y", positionY);
    ballElement.style.transform =
        "translateY(" + positionY + "px) translateX(" + positionX + "px)";
}
exports.render = render;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var engine = __webpack_require__(2);
var input = __webpack_require__(3);
engine.init();
input.activate();
console.log("foo3");


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ball = __webpack_require__(0);
var lastTime = performance.now();
var world = {
    width: window.innerWidth,
    height: window.innerHeight,
    acceleration: 0.0012,
    friction: 0.999
};
function update(timestamp) {
    var deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    if (ball.isDragged)
        return;
    ball.setPositionY(ball.positionY +
        deltaTime * (ball.velocityY + deltaTime * world.acceleration / 2));
    ball.setPositionX(ball.positionX + deltaTime * ball.velocityX);
    ball.setVelocityX(ball.velocityX * world.friction);
    ball.setVelocityY(ball.velocityY + deltaTime * world.acceleration);
    // If ball would bleed out of screen
    if (ball.positionY + ball.height >= world.height) {
        ball.setPositionY(world.height - ball.height);
        ball.setVelocityY(ball.velocityY * -0.7);
        // If ball too slow, stop render loop
        if (Math.abs(ball.velocityY) < 0.05) {
            world.acceleration = 0;
            ball.setVelocityY(0);
            console.log("killed");
            return;
        }
    }
    if (ball.positionX + ball.width > world.width) {
        ball.setVelocityX(ball.velocityX * -1);
    }
    if (ball.positionX <= 0) {
        ball.setVelocityX(ball.velocityX * -1);
    }
    ball.render();
    window.requestAnimationFrame(update);
}
function init() {
    console.log("init");
    update(lastTime);
}
exports.init = init;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ball = __webpack_require__(0);
function activate() {
    document.body.addEventListener("mousemove", function (event) {
        //console.log(event)
        if (ball.isDragged) {
            console.log("ballMove");
            ball.setPositionY(event.clientY);
            ball.render();
        }
    });
    ball.ballElement.addEventListener("mousedown", function (event) {
        console.log("ball");
        ball.setDragged(true);
    });
    document.body.addEventListener("mouseup", function (event) {
        ball.setDragged(false);
    });
}
exports.activate = activate;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
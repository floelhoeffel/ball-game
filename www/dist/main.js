"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ball_1 = require("./ball");
var engine_1 = require("./engine");
var input_1 = require("./input");
var ball = new ball_1.Ball(document.getElementById("ball"));
var engine = new engine_1.Engine(ball);
var input = new input_1.Input(engine, ball);
//# sourceMappingURL=main.js.map
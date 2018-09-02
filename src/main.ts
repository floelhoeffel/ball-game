import { Ball } from "./ball"
import { Engine } from "./engine"
import { Input } from "./input"

let ball: Ball = new Ball(document.getElementById("ball"))
let engine: Engine = new Engine(ball)
let input: Input = new Input(engine, ball)

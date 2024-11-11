import GameObject from "./GameObject.js"
import Ball from "./Ball.js"
import input from "./Input.js"
import Player from "./Player.js"

export default class Game {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.input = new input(this)
        this.player = new Player(0, 0, 50, 50, "#ff0000", 0.3, this)
        this.player2 = new Player(0, 0, 30, 30, "#00ff00", 0.2, this)
        this.ball = new Ball(100, 200, 100, 100, "#00ff00")
        this.box = new GameObject(100, 200, 100, 100, "#0000ff")
    }

    update(deltaTime) {
        this.ball.update(deltaTime)
        this.box.update(deltaTime)
        this.player.update(deltaTime)
        this.player2.update(deltaTime)
    }

    draw(ctx) {
        this.ball.draw(ctx)
        this.box.draw(ctx)
        this.player.draw(ctx)
        this.player2.draw(ctx)
    }
}
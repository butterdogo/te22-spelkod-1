import GameObject from "./GameObject.js"
import input from "./Input.js"
import Player from "./Player.js"

export default class Game {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.input = new input(this)
        this.player = new Player(0, 0, 64, 64, "#ff0000", 0.3, this)
        this.box = new GameObject(100, 250, 100, 100, "#0000ff")
    }

    update(deltaTime) {
        if (this.checkCollision(this.player, this.box)) {
            this.player.x = this.box.x
        }

        this.box.update(deltaTime)
        this.player.update(deltaTime)
    }

    draw(ctx) {
        this.box.draw(ctx)
        this.player.draw(ctx)
    }

    checkOverlap(a, b) {
        return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
    }

    checkCollision(a, b) {
        if (a.y < b.y + b.height && a.x + a.width > b.x && a.x < b.x + b.width){
            a.y = b.y + b.height
            a.speedY = 0
        }

        if (a.x + a.width > b.x  && a.x < b.x + b.width && a.y + a.height > b.y  && a.y < b.y + b.height) {
            console.log("a")
            a.speedX = 0
            a.x = b.x + a.width
        }
    }
}